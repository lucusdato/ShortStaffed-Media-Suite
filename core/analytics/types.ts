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

// ============================================================================
// Authentication Types
// ============================================================================

export type AuthEventType =
  | "login_success"
  | "login_failure"
  | "logout"
  | "password_setup"
  | "password_change"
  | "password_reset"
  | "account_switch"
  | "impersonation_start"
  | "impersonation_end"
  | "account_locked"
  | "account_unlocked";

export interface AuthAuditLog {
  id?: string;
  user_id?: string;
  user_name: string;
  event_type: AuthEventType;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
  created_at?: string;
}

export interface SessionToken {
  id?: string;
  user_id: string;
  session_token: string;
  expires_at: string;
  is_master_admin: boolean;
  impersonating_user_id?: string;
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
  last_activity?: string;
}

export interface PasswordResetToken {
  id?: string;
  user_id: string;
  reset_token: string;
  expires_at: string;
  used: boolean;
  created_by_admin_id?: string;
  created_at?: string;
}

// ============================================================================
// Authentication API Request/Response Types
// ============================================================================

export interface SetupPasswordRequest {
  userName: string;
  password: string;
}

export interface SetupPasswordResponse {
  success: boolean;
  message: string;
  requiresPasswordChange?: boolean;
}

export interface VerifyPasswordRequest {
  userName: string;
  password: string;
  impersonatingUser?: string; // For Master Admin impersonation
}

export interface VerifyPasswordResponse {
  success: boolean;
  message: string;
  sessionToken?: string;
  userId?: string;
  userName?: string;
  userRole?: string;
  userClient?: string;
  isMasterAdmin?: boolean;
  expiresAt?: string;
  attemptsRemaining?: number;
  isLocked?: boolean;
  lockedUntil?: string;
  impersonatingUserId?: string;
  impersonatingUserName?: string;
}

export interface LogoutRequest {
  sessionToken: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface ValidateSessionRequest {
  sessionToken: string;
}

export interface ValidateSessionResponse {
  valid: boolean;
  userId?: string;
  userName?: string;
  userRole?: string;
  userClient?: string;
  isMasterAdmin?: boolean;
  expiresAt?: string;
  impersonatingUserId?: string;
  impersonatingUserName?: string;
}

export interface ResetPasswordRequest {
  targetUserName: string;
  adminUserName: string;
  sessionToken: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  temporaryPassword?: string;
}

export interface ChangePasswordRequest {
  userId: string;
  currentPassword?: string; // Optional for forced password changes
  newPassword: string;
  sessionToken: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}
