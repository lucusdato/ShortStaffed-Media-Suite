/**
 * Local Storage Utilities
 *
 * Manages user identity and session persistence in browser localStorage.
 * SECURITY NOTE: Passwords are NEVER stored in localStorage - only session tokens.
 */

import { UserIdentity } from './types';
import type { SessionData } from '@/core/auth/sessionManager';

const STORAGE_KEY = 'shortstaffed_user_identity';
const SESSION_KEY = 'shortstaffed_session';

// ============================================================================
// Save User Identity
// ============================================================================

export function saveUserIdentity(identity: UserIdentity): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
  } catch (error) {
    console.error('Failed to save user identity to localStorage:', error);
  }
}

// ============================================================================
// Get User Identity
// ============================================================================

export function getUserIdentity(): UserIdentity | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const identity = JSON.parse(stored) as UserIdentity;
    return identity;
  } catch (error) {
    console.error('Failed to read user identity from localStorage:', error);
    return null;
  }
}

// ============================================================================
// Clear User Identity
// ============================================================================

export function clearUserIdentity(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    // Also clear old authentication state (legacy cleanup)
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('currentAuthenticatedAdmin');
    // Remove any stored passwords (legacy cleanup - should never exist in new system)
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('admin_password_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Failed to clear user identity from localStorage:', error);
  }
}

// ============================================================================
// Session Token Management
// ============================================================================

/**
 * Save session data to localStorage
 * SECURITY: Only stores session token and metadata, NEVER passwords
 */
export function saveSession(sessionData: SessionData): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Failed to save session to localStorage:', error);
  }
}

/**
 * Get session data from localStorage
 */
export function getSession(): SessionData | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    const session = JSON.parse(stored) as SessionData;

    // Check if session has expired
    const expiresAt = new Date(session.expiresAt);
    if (expiresAt <= new Date()) {
      clearSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Failed to read session from localStorage:', error);
    return null;
  }
}

/**
 * Clear session data from localStorage
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session from localStorage:', error);
  }
}

/**
 * Check if user has an active session
 */
export function hasActiveSession(): boolean {
  const session = getSession();
  return session !== null;
}

/**
 * Get session token from localStorage
 */
export function getSessionToken(): string | null {
  const session = getSession();
  return session?.sessionToken || null;
}

/**
 * Check if current user is Master Admin
 */
export function isMasterAdmin(): boolean {
  const session = getSession();
  return session?.isMasterAdmin || false;
}

/**
 * Check if currently impersonating another user
 */
export function isImpersonating(): boolean {
  const session = getSession();
  return !!(session?.impersonatingUserId);
}

/**
 * Get impersonation info if impersonating
 */
export function getImpersonationInfo(): { userId: string; userName: string } | null {
  const session = getSession();
  if (!session?.impersonatingUserId || !session?.impersonatingUserName) {
    return null;
  }
  return {
    userId: session.impersonatingUserId,
    userName: session.impersonatingUserName,
  };
}

// ============================================================================
// Check if User is Identified
// ============================================================================

export function isUserIdentified(): boolean {
  return getUserIdentity() !== null;
}

// ============================================================================
// Session ID Management (for analytics tracking)
// ============================================================================

const SESSION_ID_KEY = 'shortstaffed_session_id';

/**
 * Generate a unique session ID
 * Session IDs are used to group events within a single browser session
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Get current session ID, or create one if it doesn't exist
 */
export function getSessionId(): string {
  try {
    let sessionId = sessionStorage.getItem(SESSION_ID_KEY);

    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem(SESSION_ID_KEY, sessionId);
    }

    return sessionId;
  } catch (error) {
    console.error('Failed to get/create session ID:', error);
    return generateSessionId();
  }
}

/**
 * Clear session ID (useful for testing)
 */
export function clearSessionId(): void {
  try {
    sessionStorage.removeItem(SESSION_ID_KEY);
  } catch (error) {
    console.error('Failed to clear session ID:', error);
  }
}
