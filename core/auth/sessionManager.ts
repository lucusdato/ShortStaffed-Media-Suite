/**
 * Session Manager
 *
 * Handles session token creation, validation, and management.
 * Sessions are stored in both database (Supabase) and localStorage (client-side).
 */

import { getSupabaseServiceClient } from '@/core/analytics/supabaseClient';
import crypto from 'crypto';

// ============================================================================
// Types
// ============================================================================

export interface SessionData {
  userId: string;
  userName: string;
  userRole: string;
  userClient: string;
  isMasterAdmin: boolean;
  sessionToken: string;
  expiresAt: string;
  impersonatingUserId?: string;
  impersonatingUserName?: string;
}

export interface CreateSessionOptions {
  userId: string;
  userName: string;
  userRole: string;
  userClient: string;
  isMasterAdmin: boolean;
  impersonatingUserId?: string;
  ipAddress?: string;
  userAgent?: string;
  expiryHours?: number; // Default: 24 hours
}

// ============================================================================
// Session Token Generation
// ============================================================================

/**
 * Generate a cryptographically secure session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// ============================================================================
// Create Session
// ============================================================================

/**
 * Create a new session in the database and return session data
 */
export async function createSession(
  options: CreateSessionOptions
): Promise<SessionData> {
  const supabase = getSupabaseServiceClient();

  const sessionToken = generateSessionToken();
  const expiryHours = options.expiryHours || 24;
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + expiryHours);

  // Insert session token into database
  const { data, error } = await supabase
    .from('session_tokens')
    .insert({
      user_id: options.userId,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString(),
      is_master_admin: options.isMasterAdmin,
      impersonating_user_id: options.impersonatingUserId || null,
      ip_address: options.ipAddress || null,
      user_agent: options.userAgent || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create session:', error);
    throw new Error('Failed to create session');
  }

  // Get impersonating user name if applicable
  let impersonatingUserName: string | undefined;
  if (options.impersonatingUserId) {
    const { data: impersonatedUser } = await supabase
      .from('users')
      .select('name')
      .eq('id', options.impersonatingUserId)
      .single();

    impersonatingUserName = impersonatedUser?.name;
  }

  return {
    userId: options.userId,
    userName: options.userName,
    userRole: options.userRole,
    userClient: options.userClient,
    isMasterAdmin: options.isMasterAdmin,
    sessionToken,
    expiresAt: expiresAt.toISOString(),
    impersonatingUserId: options.impersonatingUserId,
    impersonatingUserName,
  };
}

// ============================================================================
// Validate Session
// ============================================================================

/**
 * Validate a session token and return session data if valid
 */
export async function validateSession(
  sessionToken: string
): Promise<SessionData | null> {
  const supabase = getSupabaseServiceClient();

  // Find session in database
  const { data: session, error } = await supabase
    .from('session_tokens')
    .select(`
      *,
      user:users!session_tokens_user_id_fkey(id, name, role, client, is_admin, is_master_admin),
      impersonated_user:users!session_tokens_impersonating_user_id_fkey(id, name)
    `)
    .eq('session_token', sessionToken)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !session) {
    return null;
  }

  // Update last activity
  await supabase
    .from('session_tokens')
    .update({ last_activity: new Date().toISOString() })
    .eq('session_token', sessionToken);

  const user = Array.isArray(session.user) ? session.user[0] : session.user;
  const impersonatedUser = session.impersonated_user
    ? (Array.isArray(session.impersonated_user) ? session.impersonated_user[0] : session.impersonated_user)
    : null;

  return {
    userId: user.id,
    userName: user.name,
    userRole: user.role,
    userClient: user.client,
    isMasterAdmin: user.is_master_admin || false,
    sessionToken,
    expiresAt: session.expires_at,
    impersonatingUserId: impersonatedUser?.id,
    impersonatingUserName: impersonatedUser?.name,
  };
}

// ============================================================================
// Invalidate Session
// ============================================================================

/**
 * Invalidate (delete) a session token
 */
export async function invalidateSession(sessionToken: string): Promise<void> {
  const supabase = getSupabaseServiceClient();

  const { error } = await supabase
    .from('session_tokens')
    .delete()
    .eq('session_token', sessionToken);

  if (error) {
    console.error('Failed to invalidate session:', error);
    throw new Error('Failed to invalidate session');
  }
}

// ============================================================================
// Invalidate All User Sessions
// ============================================================================

/**
 * Invalidate all sessions for a specific user
 */
export async function invalidateAllUserSessions(userId: string): Promise<void> {
  const supabase = getSupabaseServiceClient();

  const { error } = await supabase
    .from('session_tokens')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Failed to invalidate user sessions:', error);
    throw new Error('Failed to invalidate user sessions');
  }
}

// ============================================================================
// Cleanup Expired Sessions
// ============================================================================

/**
 * Clean up all expired sessions from the database
 */
export async function cleanupExpiredSessions(): Promise<number> {
  const supabase = getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('session_tokens')
    .delete()
    .lt('expires_at', new Date().toISOString())
    .select();

  if (error) {
    console.error('Failed to cleanup expired sessions:', error);
    return 0;
  }

  return data?.length || 0;
}

// ============================================================================
// Get Active Sessions
// ============================================================================

/**
 * Get all active sessions for a user
 */
export async function getActiveSessions(userId: string) {
  const supabase = getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('session_tokens')
    .select('*')
    .eq('user_id', userId)
    .gt('expires_at', new Date().toISOString())
    .order('last_activity', { ascending: false });

  if (error) {
    console.error('Failed to get active sessions:', error);
    return [];
  }

  return data || [];
}

// ============================================================================
// Extend Session
// ============================================================================

/**
 * Extend a session's expiry time
 */
export async function extendSession(
  sessionToken: string,
  additionalHours: number = 24
): Promise<boolean> {
  const supabase = getSupabaseServiceClient();

  const newExpiresAt = new Date();
  newExpiresAt.setHours(newExpiresAt.getHours() + additionalHours);

  const { error } = await supabase
    .from('session_tokens')
    .update({
      expires_at: newExpiresAt.toISOString(),
      last_activity: new Date().toISOString()
    })
    .eq('session_token', sessionToken);

  if (error) {
    console.error('Failed to extend session:', error);
    return false;
  }

  return true;
}
