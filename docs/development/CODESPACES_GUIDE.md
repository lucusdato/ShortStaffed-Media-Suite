# GitHub Codespaces Setup Guide

This guide will help you develop, build, and test the QuickClick Media Tools desktop app using GitHub Codespaces.

## Getting Started

### 1. Launch Codespaces

1. Go to your GitHub repository: https://github.com/lucusdato/ShortStaffed-Media-Suite
2. Click the green "Code" button
3. Select the "Codespaces" tab
4. Click "Create codespace on main"

The environment will automatically install all dependencies (this takes 2-3 minutes on first launch).

### 2. Development Workflow

Once your Codespace is ready:

```bash
# Navigate to the desktop package
cd packages/desktop

# Start development mode (hot reload)
npm run dev
```

The dev server will start on port 5173, which is automatically forwarded.

### 3. Build the Desktop App

To create distributable executables:

```bash
cd packages/desktop

# Build for Windows
npm run build

# The executables will be in:
# packages/desktop/release/QuickClick MediaTools 1.0.0.exe
```

### 4. Download Built Files

After building:

1. Open the Explorer sidebar (folder icon)
2. Navigate to `packages/desktop/release/`
3. Right-click the `.exe` file
4. Select "Download"

### 5. Test on Your Work Computer

1. Transfer the downloaded `.exe` to your work computer
2. Run the installer
3. Test the application

## Building for Different Platforms

The Windows build will work in Codespaces by default. For other platforms:

```bash
# Mac (requires macOS - won't work in Codespaces)
npm run build:mac

# Linux
npm run build:linux
```

## Tips for Efficient Development

### Quick Commands

```bash
# Clean build (if things get weird)
cd packages/desktop
rm -rf dist release
npm run build

# Install new dependencies
cd packages/desktop
npm install <package-name>

# Type checking
npm run type-check
```

### Debugging

1. Check the Electron console:
   - When running `npm run dev`, the Electron dev tools will open
   - Check both the main process logs (terminal) and renderer logs (dev tools)

2. Check build logs:
   ```bash
   # View detailed build output
   cat packages/desktop/release/builder-debug.yml
   ```

### Storage Limits

Codespaces free tier includes:
- 120 core-hours/month
- 15 GB storage per codespace

To save space:
- Delete old codespaces after building
- Don't commit `node_modules` or `release` folders (already in `.gitignore`)

## Workflow Summary

1. Make code changes in Codespaces
2. Test with `npm run dev`
3. Build with `npm run build`
4. Download the executable
5. Test on work computer
6. Commit changes when done
7. Delete the codespace to free up resources

## Troubleshooting

### "Cannot find module" errors
```bash
cd packages/desktop
npm install
```

### Build fails
```bash
# Clear cache and rebuild
cd packages/desktop
rm -rf node_modules package-lock.json dist release
npm install
npm run build
```

### Port 5173 not accessible
The port should forward automatically. If not:
1. Go to the "Ports" tab in VS Code
2. Find port 5173
3. Click to make it public if needed

## Need Help?

- Check the main README.md for app features
- See DESKTOP_SETUP.md for local development
- GitHub Codespaces docs: https://docs.github.com/codespaces
