# Desktop Application Release Guide

This guide explains how to build and release updates for the QuickClick MediaTools desktop application with automatic update support.

## Overview

The desktop app uses **electron-updater** to automatically download and install updates from GitHub Releases. Users don't need to manually download new versions - updates are delivered seamlessly in the background.

## How Auto-Updates Work

1. **On App Start**: The app checks GitHub Releases for new versions
2. **Background Download**: If an update is available, it downloads silently in the background
3. **Install on Quit**: The update is installed automatically when the user quits the app
4. **Manual Check**: Users can also manually check for updates using the "Check Updates" button in the app header

## Publishing a New Release

### Prerequisites

Before you can publish releases, ensure:
- Your repository is on GitHub
- You have push access to the repository
- The GitHub repo settings match your `package.json` publish configuration:
  - Owner: `lucusdato` (update in [packages/desktop/package.json](../../packages/desktop/package.json))
  - Repo: `shortstaffed-mediatools` (update in [packages/desktop/package.json](../../packages/desktop/package.json))

### Step-by-Step Release Process

1. **Make your changes** to the desktop app code
   ```bash
   # Work in the desktop package
   cd packages/desktop
   ```

2. **Test your changes** in development mode
   ```bash
   npm run dev --workspace=packages/desktop
   ```

3. **Update the version** in `packages/desktop/package.json`
   ```json
   {
     "version": "1.0.1"  // Increment from 1.0.0
   }
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Release v1.0.1: Your release description"
   ```

5. **Create and push a version tag**
   ```bash
   # Create tag matching the version in package.json
   git tag v1.0.1

   # Push commits and tags
   git push origin main
   git push origin v1.0.1
   ```

6. **GitHub Actions automatically builds and publishes**
   - The workflow (`.github/workflows/release.yml`) detects the version tag
   - Builds Windows (NSIS installer) and macOS (DMG) versions
   - Creates a GitHub Release with the installers
   - Generates release notes automatically

7. **Verify the release**
   - Go to your GitHub repository's Releases page
   - Confirm the new release is published with installers attached
   - Check that the `latest.yml` (Windows) and `latest-mac.yml` (macOS) files are included

## Update Distribution

### For Existing Users
- Users running the previous version will automatically receive the update on next app launch
- The update downloads in the background (no interruption)
- Installs on next quit/restart
- No manual action required from users

### For New Users
- Download the installer from the latest GitHub Release
- Run the installer (Windows: `.exe`, macOS: `.dmg`)
- App will check for updates automatically going forward

## Versioning Strategy

Follow [Semantic Versioning](https://semver.org/):

- **Major version** (v2.0.0): Breaking changes or major new features
- **Minor version** (v1.1.0): New features, backward-compatible
- **Patch version** (v1.0.1): Bug fixes and minor improvements

Examples:
- Bug fix: `1.0.0` → `1.0.1`
- New feature: `1.0.1` → `1.1.0`
- Breaking change: `1.1.0` → `2.0.0`

## Testing Updates Locally

To test the update mechanism without publishing:

1. **Build a release version**
   ```bash
   npm run build --workspace=packages/desktop
   ```

2. **Install the built version** from `packages/desktop/release/`

3. **Increment version** and build again

4. **Set up a local update server** (optional, advanced)
   - Use `electron-builder` dev server
   - Configure `dev-app-update.yml` for testing

## Build Configuration

The app uses NSIS installer (Windows) instead of portable .exe to enable auto-updates:

```json
// packages/desktop/package.json
{
  "build": {
    "win": {
      "target": [{"target": "nsis", "arch": ["x64"]}]
    }
  }
}
```

NSIS creates an installed app that can update itself, unlike portable executables.

## Troubleshooting

### 404 Error when checking for updates
If you get a 404 error when clicking "Check for Updates", this means:
- **No releases have been published yet** - This is the most common cause
- The repository doesn't have any GitHub Releases for the app to check against

**Solution**: Publish your first release following the steps above. Until you publish a release:
- The auto-updater will show an error in packaged builds
- Development builds (via `npm run dev`) will skip update checks entirely
- After publishing your first release (v1.0.0), subsequent updates will work normally

**Temporary workaround**: The error message now shows "No updates are currently available. The app is up to date." instead of exposing the technical 404 error.

### Updates not detected
- Check that the version tag matches the version in `package.json`
- Verify GitHub Actions workflow completed successfully
- Ensure `latest.yml` files are in the GitHub Release assets
- Check app logs in `%APPDATA%/QuickClick MediaTools/logs` (Windows) or `~/Library/Logs/QuickClick MediaTools` (macOS)

### Build failures in GitHub Actions
- Check the Actions tab in your GitHub repository
- Common issues:
  - Missing dependencies (fixed by `npm ci`)
  - TypeScript errors (run `tsc` locally first)
  - Build configuration errors (check `package.json`)

### Users not receiving updates
- Updates only work for users who installed via NSIS installer
- Portable .exe versions cannot auto-update
- Users must have internet connection to check/download updates
- Dev mode skips update checks (this is intentional)

## Code Signing (Optional but Recommended)

For production releases, code signing prevents security warnings:

### Windows
- Purchase an Authenticode certificate
- Configure in `electron-builder`:
  ```json
  {
    "win": {
      "certificateFile": "path/to/cert.pfx",
      "certificatePassword": "your-password"
    }
  }
  ```

### macOS
- Requires Apple Developer account ($99/year)
- Configure code signing identity
- Notarize the app for Gatekeeper

Without code signing, users will see security warnings when installing, but the app will still work.

## Monitoring Updates

Track update adoption by:
1. Checking GitHub Release download counts
2. Monitoring logs (if analytics are configured)
3. Watching the version numbers reported by users

## Related Files

- [packages/desktop/package.json](../../packages/desktop/package.json) - Version and build config
- [packages/desktop/src/main/services/updateManager.ts](../../packages/desktop/src/main/services/updateManager.ts) - Update logic
- [packages/desktop/src/renderer/components/UpdateChecker.tsx](../../packages/desktop/src/renderer/components/UpdateChecker.tsx) - Update UI
- [.github/workflows/release.yml](../../.github/workflows/release.yml) - CI/CD workflow

## Support

For questions or issues:
- Check electron-updater docs: https://www.electron.build/auto-update
- Review GitHub Actions logs for build issues
- Test locally before tagging releases
