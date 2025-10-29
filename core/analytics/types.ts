/**
 * TypeScript type definitions for analytics system
 */

// ============================================================================
// User Types
// ============================================================================

export interface User {
  id: string;
  name: string;
  role: string;
  client: string;
  first_seen: string;
  last_seen: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserIdentity {
  userId: string;
  userName: string;
  userRole: string;
  userClient: string;
  identifiedAt: string;
}

export interface UserInfo {
  name?: string;
  userName: string;
  role?: string;
  userRole: string;
  client?: string;
  userClient: string;
  isAdmin: boolean;
  isMasterAdmin: boolean;
}

// ============================================================================
// Event Tracking Types
// ============================================================================

export type ToolName =
  | "Traffic Sheet Automation"
  | "Taxonomy Generator"
  | "Home Page";

export type ActionType =
  | "page_view"
  | "file_upload"
  | "preview_data"
  | "generate"
  | "export"
  | "download"
  | "metadata_submit"
  | "copy_tsv"
  | "error";

export interface ToolUsageEvent {
  id?: string;
  user_id: string;
  session_id: string;
  tool_name: ToolName;
  action: ActionType;
  timestamp?: string;
  metadata?: Record<string, any>;
  created_at?: string;
}

// ============================================================================
// File Upload Types
// ============================================================================

export interface FileUpload {
  id?: string;
  user_id: string;
  tool_name: ToolName;
  filename: string;
  file_size?: number;
  file_type?: string;
  timestamp?: string;
  campaign_name?: string;
  brand_name?: string;
  cn_code?: string;
  row_count?: number;
  created_at?: string;
}

// ============================================================================
// Analytics API Request/Response Types
// ============================================================================

export interface IdentifyUserRequest {
  name: string;
  role: string;
  client: string;
}

export interface IdentifyUserResponse {
  success: boolean;
  user: User;
}

export interface TrackEventRequest {
  user_id: string;
  session_id: string;
  tool_name: ToolName;
  action: ActionType;
  metadata?: Record<string, any>;
}

export interface TrackEventResponse {
  success: boolean;
  event_id?: string;
}

export interface TrackFileUploadRequest {
  user_id: string;
  tool_name: ToolName;
  filename: string;
  file_size?: number;
  file_type?: string;
  campaign_name?: string;
  brand_name?: string;
  cn_code?: string;
  row_count?: number;
}

export interface TrackFileUploadResponse {
  success: boolean;
  upload_id?: string;
}

// ============================================================================
// Analytics Export Types
// ============================================================================

export interface AnalyticsExportRequest {
  password: string;
  start_date?: string;
  end_date?: string;
  format?: "csv" | "json";
}

export interface AnalyticsExportResponse {
  success: boolean;
  data?: string; // CSV or JSON string
  filename?: string;
  record_count?: number;
}

// ============================================================================
// Analytics Dashboard Types
// ============================================================================

export interface DashboardStats {
  total_users: number;
  total_events: number;
  total_file_uploads: number;
  active_users_today: number;
  active_users_this_week: number;
  most_popular_tool: string;
}

export interface ToolUsageStats {
  tool_name: string;
  total_uses: number;
  unique_users: number;
  percentage: number;
}

export interface UserActivityStats {
  name: string;
  role: string;
  client: string;
  total_actions: number;
  total_file_uploads: number;
  last_active: string;
}

export interface CampaignStats {
  campaign_name: string;
  brand_name: string;
  cn_code: string;
  times_processed: number;
  unique_users: number;
  total_rows_processed: number;
  first_processed: string;
  last_processed: string;
}

