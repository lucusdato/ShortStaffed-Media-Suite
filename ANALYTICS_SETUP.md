# Analytics Setup Guide

This guide will help you set up the usage tracking and analytics system for ShortStaffed Media Suite.

## Table of Contents
1. [Supabase Setup](#supabase-setup)
2. [Environment Variables](#environment-variables)
3. [User Directory Configuration](#user-directory-configuration)
4. [Testing the System](#testing-the-system)
5. [Exporting Analytics Data](#exporting-analytics-data)

---

## Supabase Setup

### Step 1: Create Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account (no credit card required)
3. Verify your email address

### Step 2: Create New Project
1. Click "New Project"
2. Choose your organization
3. Fill in project details:
   - **Name**: `shortstaffed-analytics` (or your preferred name)
   - **Database Password**: Generate a secure password (save this!)
   - **Region**: Choose closest to your location
4. Click "Create new project"
5. Wait 1-2 minutes for project to be created

### Step 3: Run Database Schema
1. In your Supabase project, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Open `supabase_schema.sql` from this repository
4. Copy the entire contents
5. Paste into the Supabase SQL Editor
6. Click "Run" (or press Ctrl+Enter / Cmd+Enter)
7. Verify you see success message: "✅ ShortStaffed Media Suite analytics database schema created successfully!"

### Step 4: Get API Keys
1. Click "Project Settings" (gear icon in bottom left)
2. Click "API" in the settings menu
3. You'll need three values:
   - **Project URL**: Found under "Project URL"
   - **Anon/Public Key**: Found under "Project API keys" → "anon public"
   - **Service Role Key**: Found under "Project API keys" → "service_role" (click "Reveal" to see)

---

## Environment Variables

### Step 1: Create .env.local File
1. Copy `.env.local.template` to `.env.local`:
   ```bash
   cp .env.local.template .env.local
   ```

### Step 2: Fill in Values
Open `.env.local` and replace the placeholder values:

```env
# From Supabase Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Choose a secure password for analytics dashboard access
ANALYTICS_ADMIN_PASSWORD=YourSecurePasswordHere123!
```

### Step 3: Restart Development Server
After adding environment variables, restart your dev server:
```bash
npm run dev
```

---

## User Directory Configuration

The user directory determines who can use the app and tracks their role/team.

### Add New Users
Edit `core/analytics/userDirectory.ts`:

```typescript
export const USERS: UserDirectoryEntry[] = [
  // Add your team members here
  { name: "John Smith", role: "Senior Media Planner", team: "Digital" },
  { name: "Jane Doe", role: "Media Planner", team: "Social" },
  { name: "Bob Johnson", role: "Associate Planner", team: "Digital" },
  // ... more users
];
```

### Available Roles
- Associate Planner
- Media Planner
- Senior Media Planner
- Supervisor
- Manager
- Senior Manager
- Director
- Senior Director
- VP

### Available Teams
- Digital
- Social
- Broadcast
- Print
- Integrated
- Strategy
- Analytics

You can add custom roles/teams as needed!

---

## Testing the System

### Test User Identification
1. Open the app in a new incognito/private window
2. You should see the "Welcome to ShortStaffed Media Suite" modal
3. Select your name from the dropdown
4. Click "Continue"
5. Modal should close and you should see a user badge in top-right corner

### Test Analytics Tracking
1. Use any tool (Traffic Sheet Automation or Taxonomy Generator)
2. Upload a file, generate output, etc.
3. Go to Supabase → Table Editor
4. Check these tables for data:
   - `users` - Your user record
   - `tool_usage_events` - Page views and actions
   - `file_uploads` - File upload records

### Test Analytics Export
1. Go to `/apps/analytics-dashboard`
2. Enter the password you set in `ANALYTICS_ADMIN_PASSWORD`
3. Click "Download CSV Export"
4. Open the CSV file - you should see your tracked events!

---

## Exporting Analytics Data

### Access the Dashboard
Navigate to: `http://localhost:3000/apps/analytics-dashboard` (or your production URL)

### Export Options
- **Start Date**: Filter data from this date onward (optional, defaults to 30 days ago)
- **End Date**: Filter data up to this date (optional, defaults to today)
- **Format**: CSV (compatible with Excel, PowerBI, Google Sheets)

### CSV Columns
The exported CSV includes:
- Timestamp
- Type (Event or File Upload)
- User Name
- User Role
- User Team
- Tool
- Action
- Filename
- File Size (KB)
- Campaign Name
- Brand Name
- CN Code
- Row Count

### Analysis Tips
**Tool Adoption Rate:**
- Create a pivot table with Tool × User Role
- Shows which roles use which tools most

**Power Users:**
- Sort by User Name, count actions
- Identify who are the most active users

**Campaign Coverage:**
- Filter by Campaign Name/Brand Name
- See how many unique campaigns benefit from automation

**Time Savings:**
- Count total file uploads
- Multiply by estimated manual time per file
- Calculate total hours saved

**Peak Usage Times:**
- Create a chart of Timestamp by hour/day
- Identify when training sessions might be most valuable

---

## Troubleshooting

### "Missing Supabase environment variables" error
- Check that `.env.local` exists and has all three Supabase keys
- Restart your development server after adding environment variables

### "Failed to identify user" error
- Check Supabase dashboard → Table Editor → RLS policies are enabled
- Verify your Supabase project is not paused (free tier projects pause after inactivity)

### Modal appears every time (doesn't remember user)
- Check browser's localStorage is not disabled
- Verify you're not in incognito/private mode
- Clear localStorage and try again

### Analytics export shows "Invalid password"
- Double-check `ANALYTICS_ADMIN_PASSWORD` in `.env.local`
- Make sure there are no extra spaces in the password

---

## Data Privacy Notes

- **No actual file contents are stored** - only metadata (filename, size, campaign info)
- **No passwords or sensitive data** - only names, roles, and usage statistics
- **Data stays in your Supabase project** - you have full control
- **Free tier limits**: 500MB database, 50k rows (sufficient for 6-12 months of data)
- **Can delete anytime**: Simply delete the Supabase project

---

## Production Deployment (Vercel)

When deploying to production, add environment variables to Vercel:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add these four variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ANALYTICS_ADMIN_PASSWORD`
4. Redeploy the project

**Security Note**: The `SUPABASE_SERVICE_ROLE_KEY` should ONLY be used on the server (in API routes). Never expose it to the client.

---

## Questions?

If you encounter issues:
1. Check the browser console for error messages
2. Check Supabase project logs (Project → Logs)
3. Verify all environment variables are set correctly
4. Ensure the database schema was created successfully
