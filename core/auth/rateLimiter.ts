/**
 * Rate Limiter
 *
 * Implements rate limiting for authentication attempts to prevent brute force attacks.
 * Rules: 5 failed attempts = 5 minute lockout
 */

import { getSupabaseServiceClient } from '@/core/analytics/supabaseClient';

// ============================================================================
// Configuration
// ============================================================================

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 5;

// ============================================================================
// Types
// ============================================================================

export interface RateLimitResult {
  allowed: boolean;
  attemptsRemaining: number;
  lockedUntil?: Date;
  isLocked: boolean;
}

export interface LoginAttemptInfo {
  failedAttempts: number;
  lockedUntil: Date | null;
  lastAttempt: Date | null;
}

// ============================================================================
// Check Rate Limit
// ============================================================================

/**
 * Check if a login attempt is allowed for a user
 * Returns rate limit information including attempts remaining
 */
export async function checkRateLimit(userId: string): Promise<RateLimitResult> {
  const supabase = getSupabaseServiceClient();

  // First, unlock any expired lockouts
  await unlockExpiredLockouts();

  // Get user's current failed attempts and lock status
  const { data: user, error } = await supabase
    .from('users')
    .select('failed_login_attempts, account_locked_until')
    .eq('id', userId)
    .single();

  if (error || !user) {
    // If user not found, allow the attempt (will fail at authentication anyway)
    return {
      allowed: true,
      attemptsRemaining: MAX_FAILED_ATTEMPTS,
      isLocked: false,
    };
  }

  const failedAttempts = user.failed_login_attempts || 0;
  const lockedUntil = user.account_locked_until
    ? new Date(user.account_locked_until)
    : null;

  // Check if account is currently locked
  if (lockedUntil && lockedUntil > new Date()) {
    return {
      allowed: false,
      attemptsRemaining: 0,
      lockedUntil,
      isLocked: true,
    };
  }

  // Check if max attempts reached
  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    return {
      allowed: false,
      attemptsRemaining: 0,
      isLocked: true,
    };
  }

  // Allow the attempt
  return {
    allowed: true,
    attemptsRemaining: MAX_FAILED_ATTEMPTS - failedAttempts,
    isLocked: false,
  };
}

// ============================================================================
// Record Failed Attempt
// ============================================================================

/**
 * Record a failed login attempt and potentially lock the account
 */
export async function recordFailedAttempt(userId: string): Promise<RateLimitResult> {
  const supabase = getSupabaseServiceClient();

  // Get current failed attempts
  const { data: user, error } = await supabase
    .from('users')
    .select('failed_login_attempts')
    .eq('id', userId)
    .single();

  if (error || !user) {
    throw new Error('Failed to record login attempt');
  }

  const failedAttempts = (user.failed_login_attempts || 0) + 1;
  const attemptsRemaining = MAX_FAILED_ATTEMPTS - failedAttempts;

  // Check if we need to lock the account
  let lockedUntil: Date | null = null;
  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    lockedUntil = new Date();
    lockedUntil.setMinutes(lockedUntil.getMinutes() + LOCKOUT_DURATION_MINUTES);
  }

  // Update user record
  const { error: updateError } = await supabase
    .from('users')
    .update({
      failed_login_attempts: failedAttempts,
      account_locked_until: lockedUntil?.toISOString() || null,
      last_login_attempt: new Date().toISOString(),
    })
    .eq('id', userId);

  if (updateError) {
    console.error('Failed to update login attempts:', updateError);
    throw new Error('Failed to record login attempt');
  }

  return {
    allowed: failedAttempts < MAX_FAILED_ATTEMPTS,
    attemptsRemaining: Math.max(0, attemptsRemaining),
    lockedUntil: lockedUntil || undefined,
    isLocked: failedAttempts >= MAX_FAILED_ATTEMPTS,
  };
}

// ============================================================================
// Reset Failed Attempts
// ============================================================================

/**
 * Reset failed login attempts after successful login
 */
export async function resetFailedAttempts(userId: string): Promise<void> {
  const supabase = getSupabaseServiceClient();

  const { error } = await supabase
    .from('users')
    .update({
      failed_login_attempts: 0,
      account_locked_until: null,
      last_successful_login: new Date().toISOString(),
      last_login_attempt: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('Failed to reset login attempts:', error);
    throw new Error('Failed to reset login attempts');
  }
}

// ============================================================================
// Unlock Account
// ============================================================================

/**
 * Manually unlock a locked account (Master Admin only)
 */
export async function unlockAccount(userId: string): Promise<void> {
  const supabase = getSupabaseServiceClient();

  const { error } = await supabase
    .from('users')
    .update({
      failed_login_attempts: 0,
      account_locked_until: null,
    })
    .eq('id', userId);

  if (error) {
    console.error('Failed to unlock account:', error);
    throw new Error('Failed to unlock account');
  }
}

// ============================================================================
// Unlock Expired Lockouts
// ============================================================================

/**
 * Unlock all accounts where the lockout period has expired
 */
export async function unlockExpiredLockouts(): Promise<number> {
  const supabase = getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('users')
    .update({
      failed_login_attempts: 0,
      account_locked_until: null,
    })
    .not('account_locked_until', 'is', null)
    .lt('account_locked_until', new Date().toISOString())
    .select();

  if (error) {
    console.error('Failed to unlock expired lockouts:', error);
    return 0;
  }

  return data?.length || 0;
}

// ============================================================================
// Get Login Attempt Info
// ============================================================================

/**
 * Get login attempt information for a user
 */
export async function getLoginAttemptInfo(userId: string): Promise<LoginAttemptInfo> {
  const supabase = getSupabaseServiceClient();

  const { data: user, error } = await supabase
    .from('users')
    .select('failed_login_attempts, account_locked_until, last_login_attempt')
    .eq('id', userId)
    .single();

  if (error || !user) {
    return {
      failedAttempts: 0,
      lockedUntil: null,
      lastAttempt: null,
    };
  }

  return {
    failedAttempts: user.failed_login_attempts || 0,
    lockedUntil: user.account_locked_until ? new Date(user.account_locked_until) : null,
    lastAttempt: user.last_login_attempt ? new Date(user.last_login_attempt) : null,
  };
}

// ============================================================================
// Format Time Remaining
// ============================================================================

/**
 * Format the time remaining in lockout as a human-readable string
 */
export function formatTimeRemaining(lockedUntil: Date): string {
  const now = new Date();
  const diff = lockedUntil.getTime() - now.getTime();

  if (diff <= 0) {
    return '0:00';
  }

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// ============================================================================
// Get Rate Limit Config
// ============================================================================

/**
 * Get the current rate limit configuration
 */
export function getRateLimitConfig() {
  return {
    maxAttempts: MAX_FAILED_ATTEMPTS,
    lockoutDurationMinutes: LOCKOUT_DURATION_MINUTES,
  };
}
