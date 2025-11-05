# Database Setup Guide

## Overview

This directory contains all database-related files for the QuickClick Media Suite, including migration scripts for Supabase setup.

## Migration Files

The migrations should be run in order:

1. **001_initial_schema.sql** - Creates the initial database schema with usage_logs and file_metadata tables
2. **002_rename_team_to_client.sql** - Renames team_name to client_name across all tables
3. **003_fix_policies.sql** - Updates Row Level Security policies for proper access control
4. **004_setup_complete.sql** - Final setup and verification queries

## Running Migrations

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run each migration file in order
4. Verify successful execution

### Using Supabase CLI

```bash
# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Database Schema

### Tables

- **users** - User directory for analytics and identification
- **tool_usage_events** - Tracks all tool usage events (page views, actions, etc.)
- **file_uploads** - Stores metadata about uploaded files and campaigns

### Key Features

- Row Level Security (RLS) enabled for data protection
- Automatic timestamp tracking
- User identification and role-based access
- Comprehensive analytics tracking

## Environment Variables

No database environment variables are currently required as the app uses client-side Supabase access.

## Troubleshooting

If you encounter permission issues:
1. Check that RLS policies are properly configured (run 003_fix_policies.sql)
2. Verify your Supabase anon key has proper permissions
3. Check the Supabase dashboard for any error logs

## Future Improvements

- Create indexes for performance optimization on large datasets
- Add data retention policies for old usage logs
- Consider archiving strategy for historical data