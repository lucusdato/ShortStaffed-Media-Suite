// @ts-nocheck
/**
 * Supabase Auth Helper Functions
 *
 * Handles authentication using Supabase's built-in auth system
 */

import { getSupabaseClient } from '@/core/analytics/supabaseClient';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  client: string;
  isAdmin: boolean;
  isMasterAdmin: boolean;
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  // Fetch user profile from public.users
  const profile = await getUserProfile();

  return {
    session: data.session,
    user: profile,
  };
}

/**
 * Sign out current user
 */
export async function signOut() {
  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

/**
 * Get current session
 */
export async function getSession() {
  const supabase = getSupabaseClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/**
 * Get user profile from public.users
 */
export async function getUserProfile(): Promise<AuthUser | null> {
  const supabase = getSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch profile from public.users
  const { data: profile, error } = await supabase
    .from('users')
    .select('id, name, email, role, client, is_admin, is_master_admin')
    .eq('auth_user_id', user.id)
    .single();

  if (error || !profile) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }

  return {
    id: profile.id,
    email: profile.email || user.email || '',
    name: profile.name,
    role: profile.role,
    client: profile.client,
    isAdmin: profile.is_admin || false,
    isMasterAdmin: profile.is_master_admin || false,
  };
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  const supabase = getSupabaseClient();

  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const profile = await getUserProfile();
      callback(profile);
    } else {
      callback(null);
    }
  });

  return subscription;
}

/**
 * Change password
 */
export async function changePassword(newPassword: string) {
  const supabase = getSupabaseClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    throw error;
  }
}

/**
 * Request password reset email
 */
export async function requestPasswordReset(email: string) {
  const supabase = getSupabaseClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw error;
  }
}
