-- Add password support for admin users
-- Run this migration to enable password-based authentication for admins

-- Add password_hash column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_set_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Add index for faster admin user lookups
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin) WHERE is_admin = TRUE;

-- Note: Passwords will be hashed using bcrypt on the application side
-- Default admin password for Lucus Dato will remain "Dato1234!" until changed
