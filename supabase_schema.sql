-- ShortStaffed Media Suite - Usage Analytics Database Schema
-- Run this script in your Supabase SQL Editor to set up the analytics database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Table 1: Users
-- Stores user identity, role, and team information
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- "Associate Planner", "Senior Media Planner", "Manager", etc.
  team TEXT NOT NULL, -- "Digital", "Social", "Broadcast", etc.
  first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on name for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_team ON users(team);

-- ============================================================================
-- Table 2: Tool Usage Events
-- Tracks every interaction users have with tools
-- ============================================================================
CREATE TABLE IF NOT EXISTS tool_usage_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL, -- Browser session identifier
  tool_name TEXT NOT NULL, -- "Traffic Sheet Automation", "Taxonomy Generator"
  action TEXT NOT NULL, -- "file_upload", "generate", "export", "download", "page_view"
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}', -- Flexible field for additional context
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON tool_usage_events(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_name ON tool_usage_events(tool_name);
CREATE INDEX IF NOT EXISTS idx_tool_usage_action ON tool_usage_events(action);
CREATE INDEX IF NOT EXISTS idx_tool_usage_timestamp ON tool_usage_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_tool_usage_session ON tool_usage_events(session_id);

-- ============================================================================
-- Table 3: File Uploads
-- Tracks file metadata (not actual file contents)
-- ============================================================================
CREATE TABLE IF NOT EXISTS file_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL, -- Which tool was used
  filename TEXT NOT NULL, -- Original filename
  file_size INTEGER, -- File size in bytes
  file_type TEXT, -- "xlsx", "csv"
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Campaign metadata (extracted from files)
  campaign_name TEXT,
  brand_name TEXT,
  cn_code TEXT,
  row_count INTEGER, -- Number of rows processed

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_file_uploads_user_id ON file_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_file_uploads_tool_name ON file_uploads(tool_name);
CREATE INDEX IF NOT EXISTS idx_file_uploads_timestamp ON file_uploads(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_file_uploads_campaign ON file_uploads(campaign_name);
CREATE INDEX IF NOT EXISTS idx_file_uploads_brand ON file_uploads(brand_name);
CREATE INDEX IF NOT EXISTS idx_file_uploads_cn_code ON file_uploads(cn_code);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- These policies ensure data can only be accessed through the API
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to do anything (for API routes)
CREATE POLICY "Allow service role full access on users" ON users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on tool_usage_events" ON tool_usage_events
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on file_uploads" ON file_uploads
  FOR ALL USING (auth.role() = 'service_role');

-- Policy: Allow anon key to insert (for tracking)
CREATE POLICY "Allow anon insert on users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon insert on tool_usage_events" ON tool_usage_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon insert on file_uploads" ON file_uploads
  FOR INSERT WITH CHECK (true);

-- ============================================================================
-- Useful Views for Analytics
-- ============================================================================

-- View: Daily active users
CREATE OR REPLACE VIEW daily_active_users AS
SELECT
  DATE(timestamp) as date,
  COUNT(DISTINCT user_id) as active_users
FROM tool_usage_events
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- View: Tool popularity
CREATE OR REPLACE VIEW tool_popularity AS
SELECT
  tool_name,
  COUNT(*) as total_uses,
  COUNT(DISTINCT user_id) as unique_users
FROM tool_usage_events
GROUP BY tool_name
ORDER BY total_uses DESC;

-- View: User activity summary
CREATE OR REPLACE VIEW user_activity_summary AS
SELECT
  u.name,
  u.role,
  u.team,
  COUNT(DISTINCT tue.id) as total_actions,
  COUNT(DISTINCT fu.id) as total_file_uploads,
  MAX(tue.timestamp) as last_active
FROM users u
LEFT JOIN tool_usage_events tue ON u.id = tue.user_id
LEFT JOIN file_uploads fu ON u.id = fu.user_id
GROUP BY u.id, u.name, u.role, u.team
ORDER BY total_actions DESC;

-- View: Campaign tracking
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

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ ShortStaffed Media Suite analytics database schema created successfully!';
  RAISE NOTICE '📊 Tables: users, tool_usage_events, file_uploads';
  RAISE NOTICE '📈 Views: daily_active_users, tool_popularity, user_activity_summary, campaign_tracking';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Copy your Supabase project URL and API keys';
  RAISE NOTICE '2. Add them to your .env.local file';
  RAISE NOTICE '3. Test the connection from your Next.js app';
END $$;
