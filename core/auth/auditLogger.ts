/**
 * Auth Audit Logger
 *
 * Logs all authentication events for security monitoring and compliance.
 */

import { getSupabaseServiceClient } from '@/core/analytics/supabaseClient';
import type { AuthEventType, AuthAuditLog } from '@/core/analytics/types';

// ============================================================================
// Log Auth Event
// ============================================================================

export interface LogAuthEventOptions {
  userId?: string;
  userName: string;
  eventType: AuthEventType;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

/**
 * Log an authentication event to the audit log
 */
export async function logAuthEvent(options: LogAuthEventOptions): Promise<void> {
  const supabase = getSupabaseServiceClient();

  try {
    const { error } = await supabase.from('auth_audit_logs').insert({
      user_id: options.userId || null,
      user_name: options.userName,
      event_type: options.eventType,
      ip_address: options.ipAddress || null,
      user_agent: options.userAgent || null,
      metadata: options.metadata || {},
      timestamp: new Date().toISOString(),
    });

    if (error) {
      console.error('Failed to log auth event:', error);
    }
  } catch (error) {
    console.error('Failed to log auth event:', error);
  }
}

// ============================================================================
// Convenience Functions for Common Events
// ============================================================================

/**
 * Log successful login
 */
export async function logLoginSuccess(
  userId: string,
  userName: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userId,
    userName,
    eventType: 'login_success',
    ipAddress,
    userAgent,
  });
}

/**
 * Log failed login attempt
 */
export async function logLoginFailure(
  userName: string,
  reason: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userName,
    eventType: 'login_failure',
    ipAddress,
    userAgent,
    metadata: { reason },
  });
}

/**
 * Log logout
 */
export async function logLogout(
  userId: string,
  userName: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userId,
    userName,
    eventType: 'logout',
    ipAddress,
    userAgent,
  });
}

/**
 * Log password setup
 */
export async function logPasswordSetup(
  userId: string,
  userName: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userId,
    userName,
    eventType: 'password_setup',
    ipAddress,
    userAgent,
  });
}

/**
 * Log password change
 */
export async function logPasswordChange(
  userId: string,
  userName: string,
  forced: boolean,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userId,
    userName,
    eventType: 'password_change',
    ipAddress,
    userAgent,
    metadata: { forced },
  });
}

/**
 * Log password reset (admin-initiated)
 */
export async function logPasswordReset(
  targetUserId: string,
  targetUserName: string,
  adminUserId: string,
  adminUserName: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userId: targetUserId,
    userName: targetUserName,
    eventType: 'password_reset',
    ipAddress,
    userAgent,
    metadata: {
      reset_by_admin_id: adminUserId,
      reset_by_admin_name: adminUserName,
    },
  });
}

/**
 * Log account switch attempt
 */
export async function logAccountSwitch(
  fromUserName: string,
  toUserName: string,
  success: boolean,
  reason?: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userName: fromUserName,
    eventType: 'account_switch',
    ipAddress,
    userAgent,
    metadata: {
      target_user: toUserName,
      success,
      reason,
    },
  });
}

/**
 * Log impersonation start (Master Admin)
 */
export async function logImpersonationStart(
  adminUserId: string,
  adminUserName: string,
  targetUserId: string,
  targetUserName: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userId: adminUserId,
    userName: adminUserName,
    eventType: 'impersonation_start',
    ipAddress,
    userAgent,
    metadata: {
      target_user_id: targetUserId,
      target_user_name: targetUserName,
    },
  });
}

/**
 * Log impersonation end (Master Admin)
 */
export async function logImpersonationEnd(
  adminUserId: string,
  adminUserName: string,
  targetUserName: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userId: adminUserId,
    userName: adminUserName,
    eventType: 'impersonation_end',
    ipAddress,
    userAgent,
    metadata: {
      target_user_name: targetUserName,
    },
  });
}

/**
 * Log account locked (too many failed attempts)
 */
export async function logAccountLocked(
  userId: string,
  userName: string,
  lockedUntil: Date,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userId,
    userName,
    eventType: 'account_locked',
    ipAddress,
    userAgent,
    metadata: {
      locked_until: lockedUntil.toISOString(),
    },
  });
}

/**
 * Log account unlocked
 */
export async function logAccountUnlocked(
  userId: string,
  userName: string,
  unlockedBy?: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await logAuthEvent({
    userId,
    userName,
    eventType: 'account_unlocked',
    ipAddress,
    userAgent,
    metadata: {
      unlocked_by: unlockedBy || 'automatic',
    },
  });
}

// ============================================================================
// Query Audit Logs
// ============================================================================

/**
 * Get recent auth audit logs
 */
export async function getRecentAuditLogs(limit: number = 100): Promise<AuthAuditLog[]> {
  const supabase = getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('auth_audit_logs')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to fetch audit logs:', error);
    return [];
  }

  return data || [];
}

/**
 * Get audit logs for a specific user
 */
export async function getUserAuditLogs(
  userName: string,
  limit: number = 50
): Promise<AuthAuditLog[]> {
  const supabase = getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('auth_audit_logs')
    .select('*')
    .eq('user_name', userName)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to fetch user audit logs:', error);
    return [];
  }

  return data || [];
}

/**
 * Get failed login attempts for a user in the last X hours
 */
export async function getRecentFailedLogins(
  userName: string,
  hoursAgo: number = 24
): Promise<number> {
  const supabase = getSupabaseServiceClient();

  const since = new Date();
  since.setHours(since.getHours() - hoursAgo);

  const { data, error } = await supabase
    .from('auth_audit_logs')
    .select('id')
    .eq('user_name', userName)
    .eq('event_type', 'login_failure')
    .gte('timestamp', since.toISOString());

  if (error) {
    console.error('Failed to count failed logins:', error);
    return 0;
  }

  return data?.length || 0;
}
