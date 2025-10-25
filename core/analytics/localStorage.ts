/**
 * Local Storage Utilities
 *
 * Manages user identity persistence in browser localStorage.
 * Users only need to identify themselves once per browser.
 */

import { UserIdentity } from './types';

const STORAGE_KEY = 'shortstaffed_user_identity';

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
  } catch (error) {
    console.error('Failed to clear user identity from localStorage:', error);
  }
}

// ============================================================================
// Check if User is Identified
// ============================================================================

export function isUserIdentified(): boolean {
  return getUserIdentity() !== null;
}

// ============================================================================
// Session ID Management
// ============================================================================

const SESSION_KEY = 'shortstaffed_session_id';

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
    let sessionId = sessionStorage.getItem(SESSION_KEY);

    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem(SESSION_KEY, sessionId);
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
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session ID:', error);
  }
}
