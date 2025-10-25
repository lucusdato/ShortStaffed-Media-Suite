-- Fix Row Level Security Policies for Analytics Tables
-- Run this in your Supabase SQL Editor to allow inserts from the app

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow anon insert on users" ON users;
DROP POLICY IF EXISTS "Allow anon insert on tool_usage_events" ON tool_usage_events;
DROP POLICY IF EXISTS "Allow anon insert on file_uploads" ON file_uploads;

-- Create permissive policies that allow all operations
-- (data is not sensitive - just usage tracking)

-- Users table: Allow all operations
CREATE POLICY "Allow all operations on users" ON users
  FOR ALL USING (true) WITH CHECK (true);

-- Tool usage events: Allow all operations
CREATE POLICY "Allow all operations on tool_usage_events" ON tool_usage_events
  FOR ALL USING (true) WITH CHECK (true);

-- File uploads: Allow all operations
CREATE POLICY "Allow all operations on file_uploads" ON file_uploads
  FOR ALL USING (true) WITH CHECK (true);

-- Verify policies are working
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('users', 'tool_usage_events', 'file_uploads');
