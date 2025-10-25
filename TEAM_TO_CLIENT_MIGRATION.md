# Team → Client Migration Guide

This document outlines the changes made to rename the "team" column to "client" throughout the analytics system.

## Overview

All references to "team" have been changed to "client" to better reflect that this field represents the client that employees are working with, rather than an internal team.

## Database Migration

### Step 1: Run the SQL Migration

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor**
4. Open and run the migration file: `supabase_rename_team_to_client.sql`

The migration will:
- Rename the `team` column to `client` in the `users` table
- Update the index from `idx_users_team` to `idx_users_client`
- Update the `user_activity_summary` view to use `client` instead of `team`

### Step 2: Verify the Migration

After running the migration, verify it worked:

```sql
-- Check that the column was renamed
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
  AND column_name IN ('client', 'team');

-- You should see 'client' but NOT 'team'

-- Check existing data
SELECT name, role, client FROM users LIMIT 10;
```

## Code Changes Made

### 1. TypeScript Types (`core/analytics/types.ts`)
- `User.team` → `User.client`
- `UserIdentity.userTeam` → `UserIdentity.userClient`
- `IdentifyUserRequest.team` → `IdentifyUserRequest.client`
- `UserActivityStats.team` → `UserActivityStats.client`

### 2. User Directory (`core/analytics/userDirectory.ts`)
- `UserDirectoryEntry.team` → `UserDirectoryEntry.client`
- `getUsersByTeam()` → `getUsersByClient()`
- `getAllTeams()` → `getAllClients()`
- Updated sample users to use client names (Unilever, P&G, Nike) instead of team names

### 3. UI Components
- **UserIdentificationModal** (`core/ui/UserIdentificationModal.tsx`)
  - View mode: "By Team" → "By Client"
  - Props: `userTeam` → `userClient`
  - All references updated

- **UserBadge** (`core/ui/UserBadge.tsx`)
  - Props: `userTeam` → `userClient`
  - Display: Shows client name instead of "Team" label

- **AnalyticsProvider** (`core/ui/AnalyticsProvider.tsx`)
  - State: `userTeam` → `userClient`
  - All handlers updated

### 4. API Routes
- **identify route** (`app/api/analytics/identify/route.ts`)
  - Request validation updated
  - Database queries use `client` column
  - Inserts use `client` field

- **export route** (`app/api/analytics/export/route.ts`)
  - CSV header: "User Team" → "Client"
  - Database queries select `client` field
  - All references in CSV generation updated

## User Directory Updates

The sample users have been updated to reflect client assignments:

### Before (Teams):
- Digital Team
- Social Team
- Integrated Team

### After (Clients):
- Unilever
- P&G
- Nike

You can now add real users with their actual client assignments in `core/analytics/userDirectory.ts`.

## Testing Checklist

After completing the migration, test the following:

- [ ] User identification modal shows "By Client" instead of "By Team"
- [ ] User badge displays client name correctly
- [ ] New user identification creates records with `client` field
- [ ] Existing users can still be identified (migration preserved data)
- [ ] CSV export includes "Client" column with correct data
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] App builds successfully (`npm run build`)

## Rollback Plan

If you need to rollback the database changes:

```sql
-- Rollback: Rename client back to team
ALTER TABLE users RENAME COLUMN client TO team;

-- Recreate the old index
DROP INDEX IF EXISTS idx_users_client;
CREATE INDEX idx_users_team ON users(team);

-- Restore the old view
DROP VIEW IF EXISTS user_activity_summary;
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
```

**Note:** You would also need to revert all code changes via git if needed.

## Files Changed

1. `supabase_rename_team_to_client.sql` (NEW - migration script)
2. `core/analytics/types.ts`
3. `core/analytics/userDirectory.ts`
4. `core/ui/UserIdentificationModal.tsx`
5. `core/ui/UserBadge.tsx`
6. `core/ui/AnalyticsProvider.tsx`
7. `app/api/analytics/identify/route.ts`
8. `app/api/analytics/export/route.ts`

## Next Steps

1. **Run the database migration** in Supabase SQL Editor
2. **Update user directory** with real client names in `core/analytics/userDirectory.ts`
3. **Test the changes** using the checklist above
4. **Deploy to production** when ready
