# Beta Channel Workflow Guide

This guide explains how to use the beta channel system for developing and testing new features before releasing them to all users.

## Overview

You now have a **two-channel release system**:

- **Stable Channel** (default): Production releases for all users
- **Beta Channel** (opt-in): Pre-release versions for testing with employees

## Branch Structure

```
main (stable)    → Production releases only (v1.0.0, v1.1.0)
  ↑
  └─ develop     → Active development + beta releases (v1.1.0-beta.1, v1.1.0-beta.2)
```

## Daily Development Workflow

### 1. Working on New Features

```bash
# Always work on develop branch
git checkout develop
git pull origin develop

# Make your changes
# ... edit files, add features, fix bugs ...

# Commit frequently (doesn't create releases)
git add .
git commit -m "Add new analytics feature"
git push origin develop

# You can push 100 times - nothing releases automatically!
```

**Key Point:** Pushing commits to `develop` does NOT create any releases. Your code just goes to GitHub.

### 2. Ready for Beta Testing

When you want employees to test your changes:

```bash
# Make sure you're on develop with latest changes
git checkout develop
git pull origin develop

# Create a beta tag (this triggers beta release)
git tag v1.1.0-beta.1
git push origin v1.1.0-beta.1

# GitHub Action builds and publishes to beta channel
# Beta testers get update automatically
# Stable users see nothing
```

### 3. Beta Testing Finds Bugs

Fix bugs and release new beta versions:

```bash
# Fix the bugs on develop
git add .
git commit -m "Fix crash in analytics export"
git push origin develop

# Release new beta version
git tag v1.1.0-beta.2
git push origin v1.1.0-beta.2

# Beta testers get the fix automatically
```

### 4. Release to Production

After testing succeeds:

```bash
# Switch to main branch
git checkout main
git pull origin main

# Merge all develop work
git merge develop

# Create stable release tag (no -beta!)
git tag v1.1.0
git push origin main --tags

# GitHub Action builds and publishes to stable channel
# ALL users get the update
```

## Tag Naming Conventions

**Beta Releases:**
- `v1.1.0-beta.1`, `v1.1.0-beta.2`, `v1.1.0-beta.3`
- `v1.1.0-alpha.1` (also supported)

**Stable Releases:**
- `v1.0.0`, `v1.1.0`, `v2.0.0`
- Must be in format `v[major].[minor].[patch]`

## GitHub Workflows

Two workflows handle releases:

### Beta Release (`.github/workflows/beta-release.yml`)
- Triggers on: `v*-beta.*` or `v*-alpha.*` tags
- Creates: Pre-release (orange label in GitHub)
- Updates: Only users with beta channel enabled

### Stable Release (`.github/workflows/release.yml`)
- Triggers on: `v[0-9]+.[0-9]+.[0-9]+` tags (e.g., v1.2.3)
- Creates: Latest release (green label in GitHub)
- Updates: All users (beta + stable)

## Employee Setup (Beta Testers)

To receive beta updates:

1. Open QuickClick MediaTools
2. Go to Settings (or wherever UpdateChecker component is shown)
3. Toggle "Enable Beta Updates" to ON
4. The app will now check for both beta and stable releases

**Current Status:** Shows "Beta Channel" or "Stable Channel" badge next to version number

## Example Timeline

**Monday - Friday:**
```bash
# Daily work on develop
git checkout develop
git commit -m "Progress on feature"
git push origin develop
# Repeat all week - no releases created
```

**Friday Afternoon:**
```bash
# Ready for testing
git tag v1.1.0-beta.1
git push origin v1.1.0-beta.1
# 5 beta testers get update
```

**Monday:**
```bash
# Fix bugs found over weekend
git commit -m "Fix reported bugs"
git push origin develop

git tag v1.1.0-beta.2
git push origin v1.1.0-beta.2
# Beta testers get fixes
```

**Wednesday:**
```bash
# All testing passes!
git checkout main
git merge develop
git tag v1.1.0
git push origin main --tags
# All 50+ users get stable release
```

## Important Notes

1. **Commits ≠ Releases**
   - You can commit/push to `develop` as much as you want
   - Releases only happen when you create tags

2. **Tag Format Matters**
   - `v1.1.0-beta.1` → Beta release
   - `v1.1.0` → Stable release
   - `v1.1.0beta1` → Won't work (missing hyphen)

3. **Branch Protection**
   - Always work on `develop`
   - Only merge to `main` for production releases
   - Keep `main` stable and production-ready

4. **Beta Channel is Optional**
   - Default: Stable channel (safe for production)
   - Employees opt-in to beta testing
   - Can switch back to stable anytime

## Checking Current Branch

Always make sure you're on the right branch:

```bash
# Show current branch
git branch
# Output shows: * develop (the asterisk shows current branch)

# Or see it in your terminal prompt
~/Dev/ShortStaffed MediaTools (develop) $
                            ^^^^^^^^
```

## Quick Reference

| Action | Command | Result |
|--------|---------|--------|
| Start day | `git checkout develop && git pull` | Get latest code |
| Work on feature | `git commit && git push` | Save work (no release) |
| Beta release | `git tag v1.1.0-beta.1 && git push origin v1.1.0-beta.1` | Beta testers get update |
| Production release | `git checkout main && git merge develop && git tag v1.1.0 && git push origin main --tags` | Everyone gets update |
| Check branch | `git branch` | See where you are |

## Troubleshooting

**Q: I pushed code but nobody got an update**
- **A:** Commits don't create releases. You need to create a tag.

**Q: Beta testers aren't getting updates**
- **A:** Make sure they enabled beta channel in app settings

**Q: I created a tag but workflow didn't run**
- **A:** Check tag format. Beta tags need `-beta.` or `-alpha.`

**Q: Can I delete a tag if I made a mistake?**
- **A:** Yes:
  ```bash
  git tag -d v1.1.0-beta.1           # Delete locally
  git push origin :refs/tags/v1.1.0-beta.1  # Delete on GitHub
  ```

## Support

- View all releases: https://github.com/lucusdato/ShortStaffed-Media-Suite/releases
- View workflows: https://github.com/lucusdato/ShortStaffed-Media-Suite/actions
