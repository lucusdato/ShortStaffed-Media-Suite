/**
 * Database Types
 *
 * TypeScript type definitions for Supabase database schema.
 * Generated from database migrations.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          role: string
          client: string
          first_seen: string
          last_seen: string
          created_at: string
          updated_at: string
          password_hash: string | null
          password_set_at: string | null
          is_admin: boolean
          is_master_admin: boolean
          auth_user_id: string | null
          email: string | null
          password_reset_required: boolean
          failed_login_attempts: number
          account_locked_until: string | null
          last_login_attempt: string | null
          last_successful_login: string | null
        }
        Insert: {
          id?: string
          name: string
          role: string
          client: string
          first_seen?: string
          last_seen?: string
          created_at?: string
          updated_at?: string
          password_hash?: string | null
          password_set_at?: string | null
          is_admin?: boolean
          is_master_admin?: boolean
          auth_user_id?: string | null
          email?: string | null
          password_reset_required?: boolean
          failed_login_attempts?: number
          account_locked_until?: string | null
          last_login_attempt?: string | null
          last_successful_login?: string | null
        }
        Update: {
          id?: string
          name?: string
          role?: string
          client?: string
          first_seen?: string
          last_seen?: string
          created_at?: string
          updated_at?: string
          password_hash?: string | null
          password_set_at?: string | null
          is_admin?: boolean
          is_master_admin?: boolean
          auth_user_id?: string | null
          email?: string | null
          password_reset_required?: boolean
          failed_login_attempts?: number
          account_locked_until?: string | null
          last_login_attempt?: string | null
          last_successful_login?: string | null
        }
      }
      tool_usage_events: {
        Row: {
          id: string
          user_id: string
          session_id: string
          tool_name: string
          action: string
          timestamp: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id: string
          tool_name: string
          action: string
          timestamp?: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_id?: string
          tool_name?: string
          action?: string
          timestamp?: string
          metadata?: Json
          created_at?: string
        }
      }
      file_uploads: {
        Row: {
          id: string
          user_id: string
          tool_name: string
          filename: string
          file_size: number | null
          file_type: string | null
          timestamp: string
          campaign_name: string | null
          brand_name: string | null
          cn_code: string | null
          row_count: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_name: string
          filename: string
          file_size?: number | null
          file_type?: string | null
          timestamp?: string
          campaign_name?: string | null
          brand_name?: string | null
          cn_code?: string | null
          row_count?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_name?: string
          filename?: string
          file_size?: number | null
          file_type?: string | null
          timestamp?: string
          campaign_name?: string | null
          brand_name?: string | null
          cn_code?: string | null
          row_count?: number | null
          created_at?: string
        }
      }
      auth_audit_logs: {
        Row: {
          id: string
          user_id: string | null
          user_name: string
          event_type: string
          ip_address: string | null
          user_agent: string | null
          metadata: Json
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          user_name: string
          event_type: string
          ip_address?: string | null
          user_agent?: string | null
          metadata?: Json
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          user_name?: string
          event_type?: string
          ip_address?: string | null
          user_agent?: string | null
          metadata?: Json
          timestamp?: string
          created_at?: string
        }
      }
      session_tokens: {
        Row: {
          id: string
          user_id: string
          session_token: string
          expires_at: string
          is_master_admin: boolean
          impersonating_user_id: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
          last_activity: string
        }
        Insert: {
          id?: string
          user_id: string
          session_token: string
          expires_at: string
          is_master_admin?: boolean
          impersonating_user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          last_activity?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_token?: string
          expires_at?: string
          is_master_admin?: boolean
          impersonating_user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          last_activity?: string
        }
      }
      password_reset_tokens: {
        Row: {
          id: string
          user_id: string
          reset_token: string
          expires_at: string
          used: boolean
          created_by_admin_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          reset_token: string
          expires_at: string
          used?: boolean
          created_by_admin_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          reset_token?: string
          expires_at?: string
          used?: boolean
          created_by_admin_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for easier access to database rows
export type User = Database['public']['Tables']['users']['Row'];
export type SessionToken = Database['public']['Tables']['session_tokens']['Row'];
export type AuthAuditLog = Database['public']['Tables']['auth_audit_logs']['Row'];
export type PasswordResetToken = Database['public']['Tables']['password_reset_tokens']['Row'];
export type ToolUsageEvent = Database['public']['Tables']['tool_usage_events']['Row'];
export type FileUpload = Database['public']['Tables']['file_uploads']['Row'];
