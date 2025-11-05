-- QuickClick Media Suite - Complete Database Setup
-- Run this script once in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Table 1: Users (with 'client' field instead of 'team')
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  client TEXT NOT NULL,
  first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_client ON users(client);

-- ============================================================================
-- Table 2: Tool Usage Events
-- ============================================================================
CREATE TABLE IF NOT EXISTS tool_usage_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  action TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON tool_usage_events(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_name ON tool_usage_events(tool_name);
CREATE INDEX IF NOT EXISTS idx_tool_usage_action ON tool_usage_events(action);
CREATE INDEX IF NOT EXISTS idx_tool_usage_timestamp ON tool_usage_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_tool_usage_session ON tool_usage_events(session_id);

-- ============================================================================
-- Table 3: File Uploads
-- ============================================================================
CREATE TABLE IF NOT EXISTS file_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  campaign_name TEXT,
  brand_name TEXT,
  cn_code TEXT,
  row_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_file_uploads_user_id ON file_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_file_uploads_tool_name ON file_uploads(tool_name);
CREATE INDEX IF NOT EXISTS idx_file_uploads_timestamp ON file_uploads(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_file_uploads_campaign ON file_uploads(campaign_name);
CREATE INDEX IF NOT EXISTS idx_file_uploads_brand ON file_uploads(brand_name);
CREATE INDEX IF NOT EXISTS idx_file_uploads_cn_code ON file_uploads(cn_code);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Allow anon key to select, insert, and update
CREATE POLICY "Allow anon access on users" ON users
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon access on tool_usage_events" ON tool_usage_events
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon access on file_uploads" ON file_uploads
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- Views for Analytics
-- ============================================================================

CREATE OR REPLACE VIEW daily_active_users AS
SELECT
  DATE(timestamp) as date,
  COUNT(DISTINCT user_id) as active_users
FROM tool_usage_events
GROUP BY DATE(timestamp)
ORDER BY date DESC;

CREATE OR REPLACE VIEW tool_popularity AS
SELECT
  tool_name,
  COUNT(*) as total_uses,
  COUNT(DISTINCT user_id) as unique_users
FROM tool_usage_events
GROUP BY tool_name
ORDER BY total_uses DESC;

CREATE OR REPLACE VIEW user_activity_summary AS
SELECT
  u.name,
  u.role,
  u.client,
  COUNT(DISTINCT tue.id) as total_actions,
  COUNT(DISTINCT fu.id) as total_file_uploads,
  MAX(tue.timestamp) as last_active
FROM users u
LEFT JOIN tool_usage_events tue ON u.id = tue.user_id
LEFT JOIN file_uploads fu ON u.id = fu.user_id
GROUP BY u.id, u.name, u.role, u.client
ORDER BY total_actions DESC;

CREATE OR REPLACE VIEW campaign_tracking AS
SELECT
  campaign_name,
  brand_name,
  cn_code,
  COUNT(*) as times_processed,
  COUNT(DISTINCT user_id) as unique_users,
  SUM(row_count) as total_rows_processed,
  MIN(timestamp) as first_processed,
  MAX(timestamp) as last_processed
FROM file_uploads
WHERE campaign_name IS NOT NULL
GROUP BY campaign_name, brand_name, cn_code
ORDER BY times_processed DESC;
