-- Migration: Rename "team" column to "client" in users table
-- Run this in your Supabase SQL Editor

-- Step 1: Rename the column
ALTER TABLE users RENAME COLUMN team TO client;

-- Step 2: Rename the index
DROP INDEX IF EXISTS idx_users_team;
CREATE INDEX idx_users_client ON users(client);

-- Step 3: Update the user_activity_summary view
DROP VIEW IF EXISTS user_activity_summary;
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

-- Step 4: Verify the change
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
  AND column_name IN ('client', 'team');

-- You should see 'client' but not 'team'
