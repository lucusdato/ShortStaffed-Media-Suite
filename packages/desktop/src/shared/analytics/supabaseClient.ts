/**
 * Supabase Client
 *
 * Central client for connecting to Supabase database.
 * Handles both client-side (browser) and server-side (API routes) connections.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// ============================================================================
// Environment Variables
// ============================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ============================================================================
// Client-side Supabase Client
// Used in browser/React components
// ============================================================================

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase environment variables');
    console.error('   Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local');
    throw new Error('Supabase configuration missing');
  }

  if (!supabaseClient) {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  return supabaseClient;
}

// ============================================================================
// Server-side Supabase Client
// Used in API routes with service role key (full permissions)
// ============================================================================

let supabaseServiceClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseServiceClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase service role key');
    console.error('   Please add SUPABASE_SERVICE_ROLE_KEY to .env.local');
    throw new Error('Supabase service role key missing');
  }

  if (!supabaseServiceClient) {
    supabaseServiceClient = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }

  return supabaseServiceClient;
}

// ============================================================================
// Helper: Check if Supabase is configured
// ============================================================================

export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}
