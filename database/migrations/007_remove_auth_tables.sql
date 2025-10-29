-- Remove authentication tables and columns
-- This reverts the authentication system back to simple user identification

-- Drop authentication tables
DROP TABLE IF EXISTS auth_audit_logs;
DROP TABLE IF EXISTS session_tokens;
DROP TABLE IF EXISTS password_reset_tokens;

-- Remove auth-related columns from users table
ALTER TABLE users
  DROP COLUMN IF EXISTS password_hash,
  DROP COLUMN IF EXISTS password_set_at,
  DROP COLUMN IF EXISTS auth_user_id,
  DROP COLUMN IF EXISTS email,
  DROP COLUMN IF EXISTS password_reset_required,
  DROP COLUMN IF EXISTS failed_login_attempts,
  DROP COLUMN IF EXISTS account_locked_until,
  DROP COLUMN IF EXISTS last_login_attempt,
  DROP COLUMN IF EXISTS last_successful_login;

-- Keep is_admin and is_master_admin columns for reference
-- These are still needed for user permissions
