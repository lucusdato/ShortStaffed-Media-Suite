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
          is_admin: boolean
          is_master_admin: boolean
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
          is_admin?: boolean
          is_master_admin?: boolean
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
          is_admin?: boolean
          is_master_admin?: boolean
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
export type ToolUsageEvent = Database['public']['Tables']['tool_usage_events']['Row'];
export type FileUpload = Database['public']['Tables']['file_uploads']['Row'];
