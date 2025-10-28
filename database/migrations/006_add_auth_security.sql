-- Authentication Security Enhancement
-- Adds audit logging, rate limiting, and password reset functionality

-- ============================================================================
-- 1. Update Users Table with Auth Fields
-- ============================================================================

-- Add password reset fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_required BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS account_locked_until TIMESTAMP WITH TIME ZONE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_attempt TIMESTAMP WITH TIME ZONE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_successful_login TIMESTAMP WITH TIME ZONE;

-- Add index for locked accounts
CREATE INDEX IF NOT EXISTS idx_users_locked_until ON users(account_locked_until)
WHERE account_locked_until IS NOT NULL;

-- ============================================================================
-- 2. Auth Audit Logs Table
-- Tracks all authentication events for security monitoring
-- ============================================================================

CREATE TABLE IF NOT EXISTS auth_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'login_success', 'login_failure', 'logout', 'password_setup', 'password_change', 'password_reset', 'account_switch', 'impersonation_start', 'impersonation_end'
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}', -- Additional context (e.g., target_user for impersonation)
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common audit queries
CREATE INDEX IF NOT EXISTS idx_auth_audit_user_id ON auth_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_audit_event_type ON auth_audit_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_auth_audit_timestamp ON auth_audit_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_auth_audit_user_name ON auth_audit_logs(user_name);

-- ============================================================================
-- 3. Session Tokens Table
-- Manages active user sessions
-- ============================================================================

CREATE TABLE IF NOT EXISTS session_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_master_admin BOOLEAN DEFAULT FALSE,
  impersonating_user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- If master admin is impersonating
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for session lookups
CREATE INDEX IF NOT EXISTS idx_session_tokens_token ON session_tokens(session_token);
CREATE INDEX IF NOT EXISTS idx_session_tokens_user_id ON session_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_session_tokens_expires ON session_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_session_tokens_impersonating ON session_tokens(impersonating_user_id)
WHERE impersonating_user_id IS NOT NULL;

-- ============================================================================
-- 4. Password Reset Tokens Table
-- For future email-based password reset functionality
-- ============================================================================

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reset_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_by_admin_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Which admin initiated the reset
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_password_reset_token ON password_reset_tokens(reset_token);
CREATE INDEX IF NOT EXISTS idx_password_reset_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_expires ON password_reset_tokens(expires_at);

-- ============================================================================
-- 5. Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE auth_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access (for API routes)
CREATE POLICY "Allow service role full access on auth_audit_logs" ON auth_audit_logs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on session_tokens" ON session_tokens
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on password_reset_tokens" ON password_reset_tokens
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 6. Cleanup Functions
-- Automatically clean up expired sessions and tokens
-- ============================================================================

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM session_tokens WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired password reset tokens
CREATE OR REPLACE FUNCTION cleanup_expired_reset_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM password_reset_tokens WHERE expires_at < NOW() OR used = TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to unlock accounts after lockout period
CREATE OR REPLACE FUNCTION unlock_expired_lockouts()
RETURNS void AS $$
BEGIN
  UPDATE users
  SET failed_login_attempts = 0,
      account_locked_until = NULL
  WHERE account_locked_until IS NOT NULL
    AND account_locked_until < NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 7. Useful Views for Security Monitoring
-- ============================================================================

-- View: Recent failed login attempts
CREATE OR REPLACE VIEW recent_failed_logins AS
SELECT
  user_name,
  ip_address,
  timestamp,
  metadata
FROM auth_audit_logs
WHERE event_type = 'login_failure'
  AND timestamp > NOW() - INTERVAL '24 hours'
ORDER BY timestamp DESC;

-- View: Active sessions
CREATE OR REPLACE VIEW active_sessions AS
SELECT
  st.id,
  u.name as user_name,
  u.role,
  st.is_master_admin,
  impersonated.name as impersonating_user_name,
  st.created_at,
  st.last_activity,
  st.expires_at,
  st.ip_address
FROM session_tokens st
JOIN users u ON st.user_id = u.id
LEFT JOIN users impersonated ON st.impersonating_user_id = impersonated.id
WHERE st.expires_at > NOW()
ORDER BY st.last_activity DESC;

-- View: Suspicious activity (multiple failed logins)
CREATE OR REPLACE VIEW suspicious_login_activity AS
SELECT
  user_name,
  ip_address,
  COUNT(*) as failed_attempts,
  MIN(timestamp) as first_attempt,
  MAX(timestamp) as last_attempt
FROM auth_audit_logs
WHERE event_type = 'login_failure'
  AND timestamp > NOW() - INTERVAL '1 hour'
GROUP BY user_name, ip_address
HAVING COUNT(*) >= 3
ORDER BY failed_attempts DESC;

-- View: Account switch audit trail
CREATE OR REPLACE VIEW account_switch_history AS
SELECT
  user_name,
  event_type,
  metadata->>'target_user' as target_user,
  metadata->>'reason' as reason,
  ip_address,
  timestamp
FROM auth_audit_logs
WHERE event_type IN ('account_switch', 'impersonation_start', 'impersonation_end')
ORDER BY timestamp DESC;

-- ============================================================================
-- 8. Success Message
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Authentication security enhancement completed successfully!';
  RAISE NOTICE '📊 New Tables: auth_audit_logs, session_tokens, password_reset_tokens';
  RAISE NOTICE '🔒 New Fields: password_reset_required, failed_login_attempts, account_locked_until';
  RAISE NOTICE '📈 New Views: recent_failed_logins, active_sessions, suspicious_login_activity, account_switch_history';
  RAISE NOTICE '🔧 New Functions: cleanup_expired_sessions(), cleanup_expired_reset_tokens(), unlock_expired_lockouts()';
  RAISE NOTICE '';
  RAISE NOTICE 'Security Features:';
  RAISE NOTICE '  • Complete audit trail of all authentication events';
  RAISE NOTICE '  • Rate limiting support (5 attempts, 5 minute lockout)';
  RAISE NOTICE '  • Session management with expiry';
  RAISE NOTICE '  • Master Admin impersonation tracking';
  RAISE NOTICE '  • Password reset support';
END $$;
