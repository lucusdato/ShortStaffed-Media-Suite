# ShortStaffed Media Suite - Comprehensive Codebase Overview

## Table of Contents
1. [Application Overview](#application-overview)
2. [Project Architecture](#project-architecture)
3. [Analytics System](#analytics-system)
4. [Windows Desktop App](#windows-desktop-app)
5. [Data Storage & Logging](#data-storage--logging)
6. [IPC Architecture](#ipc-architecture)
7. [Build Configuration](#build-configuration)

---

## Application Overview

### Project Name
**QuickClick MediaTools** (formerly ShortStaffed Media Suite)

### Version
1.0.5

### Tech Stack
- **Web**: Next.js 15 with TypeScript, Tailwind CSS, Supabase
- **Desktop**: Electron 28.3.3 with React, Vite
- **Build Tool**: electron-builder (for Windows NSIS installer)
- **Database**: Supabase (PostgreSQL)
- **Auto-Update**: electron-updater

### Core Features
1. **Traffic Sheet Automation** - Convert blocking charts to traffic sheets
2. **Taxonomy Generator** - Multi-platform taxonomy generation
3. **Analytics Dashboard** - Usage tracking and insights
4. **Desktop Application** - Standalone Electron app with auto-updates

---

## Project Architecture

### Directory Structure

```
ShortStaffed-Media-Suite/
├── packages/
│   ├── desktop/                    # Electron application
│   │   ├── src/
│   │   │   ├── main/              # Main process (Node.js backend)
│   │   │   │   ├── index.ts       # Entry point, window creation
│   │   │   │   ├── ipc/           # IPC handlers (6 modules)
│   │   │   │   └── services/      # Logger, Config, UpdateManager
│   │   │   ├── preload/           # Preload script (security bridge)
│   │   │   ├── renderer/          # React frontend (UI)
│   │   │   └── shared/            # Shared code (analytics, Excel, etc.)
│   │   ├── package.json
│   │   ├── vite.config.ts         # Vite config for renderer build
│   │   └── electron-builder config (in package.json)
│   │
│   └── web/                        # Next.js web application
│       ├── app/
│       │   ├── api/               # API routes
│       │   │   └── analytics/     # Analytics endpoints
│       │   └── apps/              # Feature pages
│       ├── core/                  # Shared business logic
│       │   ├── analytics/         # Analytics client & types
│       │   ├── excel/             # Excel processing
│       │   └── ui/                # React components
│       └── package.json
│
├── .github/workflows/
│   └── release.yml                # CI/CD for Windows builds
│
└── docs/                          # Documentation
```

### Shared Code Between Web and Desktop

The desktop app and web app share significant code:
- **Analytics types and functions** - Same tracking implementation
- **Excel processing** - Traffic sheet generation logic
- **User directories** - User and brand management
- **Taxonomy engine** - Multi-platform taxonomy generation

**Key Files in `/packages/desktop/src/shared/`:**
- `analytics/` - Tracking client (6 files)
- `excel/` - Excel processing (11 files)
- `taxonomy/` - Platform configs and generators
- `ui/` - React components (AnalyticsProvider, modals, etc.)

---

## Analytics System

### Overview
The application has a comprehensive analytics system tracking user actions, file uploads, and system events.

### Client-Side (Renderer Process)

**Location**: `/packages/desktop/src/shared/analytics/`

#### Key Files:

**1. tracker.ts** - Main tracking client
```typescript
Functions:
- trackEvent(toolName, action, metadata?)
- trackFileUpload(toolName, file, metadata?)
- trackPageView(toolName)
- trackError(toolName, errorMessage, errorContext?)

Convenience methods:
- Analytics.trafficSheetFileUpload()
- Analytics.trafficSheetGenerate()
- Analytics.taxonomyFileUpload()
- etc.
```

**2. types.ts** - TypeScript definitions
```typescript
Key Types:
- User - User database record
- UserIdentity - Current session identity
- ToolName - "Traffic Sheet Automation" | "Taxonomy Generator" | "Home Page"
- ActionType - page_view, file_upload, generate, export, error, etc.
- ToolUsageEvent - Tracks user actions
- FileUpload - Tracks file uploads with metadata
```

**3. localStorage.ts** - Client-side persistence
```typescript
Functions:
- saveUserIdentity(identity) - Saves to browser localStorage
- getUserIdentity() - Retrieves user from localStorage
- clearUserIdentity() - Clears user session
- getSessionId() / generateSessionId() - Session tracking
```

**4. supabaseClient.ts** - Database connection
```typescript
- getSupabaseClient() - Browser client (anonymous key)
- getSupabaseServiceClient() - Server client (service role key)
- isSupabaseConfigured() - Configuration check
```

**5. userDirectory.ts** - User management
```typescript
Hardcoded user list with:
- name, role, client
- isAdmin, isMasterAdmin flags

Functions:
- getUsersSortedByName()
- getUsersByClient()
- getUsersByRole()
- findUserByName()
- getAllClients()
- getAllRoles()

Current Users:
- Lucus Dato (Unilever, Manager, MasterAdmin)
- Robbie Starkman (Unilever, Project Manager, Admin)
- Test User (Unilever, Media Planner)
```

**6. brandDirectory.ts** - Brand auto-detection
```typescript
Hardcoded brand list:
- Knorr, Hellmann's, Ben & Jerry's, etc. (Unilever brands)

Functions:
- extractBrandFromFilename(filename) - Auto-detects brand from filename
- containsBrand(filename, brandName)
- searchBrands(query)
```

### Server-Side API Routes

**Location**: `/packages/web/app/api/analytics/`

**1. `/api/analytics/track` - POST**
Stores tool usage events
```typescript
Request: { user_id, session_id, tool_name, action, metadata? }
Response: { success, event_id }
Database: tool_usage_events table
```

**2. `/api/analytics/track-upload` - POST**
Stores file upload records
```typescript
Request: { 
  user_id, tool_name, filename, file_size, file_type,
  campaign_name?, brand_name?, cn_code?, row_count?
}
Response: { success, upload_id }
Database: file_uploads table
```

**3. `/api/analytics/identify` - POST**
Creates/updates user records
```typescript
Request: { name, role, client }
Response: { success, user }
Database: users table
Logic: Creates new user or updates last_seen timestamp
```

**4. Other Analytics Routes**
- `/api/analytics/directory` - User directory
- `/api/analytics/clients` - Client list
- `/api/analytics/roles` - Role list
- `/api/analytics/export` - Export analytics data
- (Password-protected routes)

### Data Flow

```
User Action (Renderer)
        ↓
trackEvent() / trackFileUpload()
        ↓
localStorage.getSessionId() + getUserIdentity()
        ↓
fetch('/api/analytics/track' or '/api/analytics/track-upload')
        ↓
Server API Route (Next.js)
        ↓
Supabase (PostgreSQL)
        ↓
Analytics Dashboard (read-only)
```

### Tracked Data

**Events Table (tool_usage_events)**
- user_id, session_id, tool_name, action
- timestamp, metadata (JSON)
- created_at

**File Uploads Table (file_uploads)**
- user_id, tool_name, filename
- file_size, file_type
- campaign_name, brand_name, cn_code
- row_count, timestamp, created_at

**Users Table**
- name, role, client
- first_seen, last_seen
- created_at, updated_at

---

## Windows Desktop App

### Architecture

**Technology Stack**
- Electron 28.3.3 (main + renderer)
- React 18.3.1 (UI framework)
- Vite 5.4.21 (build tool)
- electron-builder 24.13.3 (installer creation)
- electron-updater 6.6.2 (auto-update mechanism)
- ExcelJS 4.4.0 (Excel file processing)

### Main Process Structure

**Location**: `/packages/desktop/src/main/`

**1. index.ts - Entry Point**
```typescript
- Creates BrowserWindow (1400x900)
- Loads http://localhost:5173 in dev
- Loads dist/renderer/index.html in production
- Sets up UpdateManager on startup
- Handles window lifecycle
```

**2. services/ Directory**

**configManager.ts** - Application configuration
```typescript
Storage: app.getPath('userData')/config.json
Interface:
{
  version: "1.0.5",
  user: { name, role, client, isAdmin },
  preferences: { lastUsedFolder, theme }
}
Methods:
- load(), save(), get(), set()
- getUser(), setUser()
```

**logger.ts** - Local file logging
```typescript
Storage: app.getPath('userData')/logs/usage-YYYY-MM-DD.jsonl
Functionality:
- Logs all user actions locally (JSONL format)
- One file per day
- Can filter by date range, tool, user
- Provides access to logs directory
```

**updateManager.ts** - Auto-update system
```typescript
Uses electron-updater with GitHub releases
Configuration:
- autoDownload: true
- autoInstallOnAppQuit: true
- Checks on startup (3 second delay)
Updates:
- Listens for checking-for-update, update-available, download-progress
- Communicates with renderer via IPC
- Provides status, progress, error handling
```

### IPC Handlers

**Location**: `/packages/desktop/src/main/ipc/`

**IPC Modules:**

1. **config.ts** - Configuration management
   - `config:get` - Get app config
   - `config:set` - Update config
   - `config:getUser` - Get current user
   - `config:setUser` - Set current user

2. **logger.ts** - Local logging
   - `logger:track` - Log an event
   - `logger:getLogs` - Retrieve logs with filtering

3. **dialog.ts** - File operations
   - `dialog:selectFile` - Open file picker
   - `dialog:saveFile` - Open save dialog
   - `dialog:writeFile` - Write file to disk

4. **update.ts** - Update checking
   - `check-for-updates` - Check for new version
   - `get-app-version` - Get current version
   - `get-update-status` - Get update status
   - `quit-and-install` - Install update and restart

5. **trafficSheet.ts** - Excel generation
   - `trafficSheet:preview` - Preview blocking chart
   - `trafficSheet:generate` - Generate traffic sheet

6. **taxonomy.ts** - Taxonomy generation
   - `taxonomy:parse` - Parse taxonomy input
   - `taxonomy:export` - Export taxonomy

### Preload Script

**Location**: `/packages/desktop/src/preload/index.ts`

Exposes safe IPC methods to renderer via `window.electron`:

```typescript
window.electron = {
  // File operations
  selectFile(filters?)
  saveFile(defaultPath?)
  writeFile(filePath, buffer)
  
  // Traffic Sheet
  trafficSheet: { preview(), generate() }
  
  // Taxonomy
  taxonomy: { parse(), export() }
  
  // Config
  config: { get(), set(), getUser(), setUser() }
  
  // Logger
  logger: { track(), getLogs() }
  
  // Updates
  update: {
    checkForUpdates()
    getAppVersion()
    getUpdateStatus()
    quitAndInstall()
    onStatusChanged(callback)
    onProgress(callback)
  }
}
```

### Build Output

**Package.json Build Config**
```json
{
  "appId": "com.quickclick.mediatools",
  "productName": "QuickClick MediaTools",
  "files": ["dist/**/*", "resources/**/*"],
  "win": {
    "target": ["nsis"],
    "icon": "resources/icons/win/icon.ico"
  },
  "publish": {
    "provider": "github",
    "owner": "lucusdato",
    "repo": "ShortStaffed-Media-Suite"
  }
}
```

**Output**: `packages/desktop/release/QuickClick-MediaTools-Setup-${version}.exe`

---

## Data Storage & Logging

### Local Storage (Renderer)

**Browser localStorage** (persists across sessions)
```javascript
// User identification
localStorage.getItem('shortstaffed_user_identity')
// Returns: { userId, userName, userRole, userClient, identifiedAt }

// Session tracking
sessionStorage.getItem('shortstaffed_session_id')
// Returns: session_${timestamp}_${randomId}
```

### Local File Storage (Main Process)

**1. Configuration File**
- Location: `app.getPath('userData')/config.json`
- User settings, app preferences, admin password hash
- Managed by ConfigManager

**2. Local Logs**
- Location: `app.getPath('userData')/logs/usage-YYYY-MM-DD.jsonl`
- JSONL format (one event per line)
- Contains all local application usage
- Managed by Logger service

**3. Resources**
- Location: `resources/templates/`
- Excel templates for traffic sheets
- Bundled with app

### Supabase (Cloud Database)

**Tables:**
1. `users` - User directory
2. `tool_usage_events` - User actions tracking
3. `file_uploads` - File upload records

**Access:**
- Client (browser): Anonymous key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- Server (API routes): Service role key (`SUPABASE_SERVICE_ROLE_KEY`)

---

## IPC Architecture

### Context Isolation Security

**BrowserWindow Config**
```typescript
{
  preload: path/to/preload.js,
  contextIsolation: true,      // Isolates renderer process
  nodeIntegration: false,       // Prevents direct Node access
}
```

**Data Flow**
```
Renderer Process (Sandboxed React)
    ↓ (ipcRenderer.invoke)
Preload Script (Bridge)
    ↓ (calls exposed methods)
Main Process (Full Node access)
    ↓
File system, IPC, Electron APIs
```

### IPC Communication Pattern

```typescript
// Renderer (React component)
const result = await window.electron.config.get();

// Preload script
selectFile: (filters) => ipcRenderer.invoke('dialog:selectFile', filters)

// Main process
ipcMain.handle('dialog:selectFile', async (_event, filters) => {
  // Implementation
})
```

---

## Build Configuration

### Windows Build

**GitHub Workflow** (`.github/workflows/release.yml`)

Triggered on: Git tag push (v*.*.*)

Steps:
1. Checkout code
2. Install Node 20
3. npm install in packages/desktop
4. npm run compile:shared (compile TypeScript)
5. npx tsc (main + preload)
6. npx vite build (renderer)
7. electron-builder --win --x64 --publish always
8. Upload artifacts to GitHub Release

**Build Command**
```bash
npm run build:win

# Or manual steps:
npm run compile:shared
npx tsc
npx vite build
npx electron-builder --win --x64
```

**Output Files**
- `packages/desktop/release/QuickClick-MediaTools-Setup-${version}.exe` - Installer
- `packages/desktop/release/latest.yml` - Auto-update metadata

### Development Setup

**Dev Scripts** (package.json)
```bash
npm run dev              # Concurrent Vite + Electron
npm run dev:vite        # Vite dev server only
npm run dev:electron    # Electron dev server only
npm run compile:shared  # Compile shared TypeScript
npm run build           # Full production build
npm run build:win       # Windows-specific build
npm run build:mac       # macOS-specific build
```

### Vite Configuration

**vite.config.ts**
```typescript
- Root: src/renderer
- Output: dist/renderer
- Base: ./ (for packaged app)
- Alias: @shared → ../web/core, @ → src/renderer
- Port: 5173
```

### TypeScript Configuration

**tsconfig.json** (Main + Preload)
```json
- Target: ES2022
- Module: commonjs
- Include: src/main/**, src/preload/**
- Exclude: src/renderer, src/shared
- Output: dist/
```

**tsconfig.shared.json**
```json
- Compiles shared code (analytics, excel, etc.)
- Output used by both renderer and main
```

---

## Environment Configuration

**Template**: `.env.local.template`

**Required Variables**
```bash
# Supabase (Optional, for cloud analytics)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Admin authentication
ADMIN_PASSWORD=...

# Analytics dashboard
ANALYTICS_ADMIN_PASSWORD=...
```

---

## Key Dependencies

### Desktop (Electron)
- electron-log 5.1.0 - Logging
- electron-store 8.1.0 - Persistent storage (alternative to config.json)
- electron-updater 6.6.2 - Auto-updates
- exceljs 4.4.0 - Excel processing

### Web (Next.js)
- @supabase/supabase-js - Database client
- exceljs 4.4.0 - Excel processing
- React 18.3.1 - UI framework
- Tailwind CSS 3.4.18 - Styling

---

## Development Notes

### Code Organization
- **Configuration-driven**: Most business logic is config-based (not hardcoded)
- **Shared code**: Analytics, Excel processing, UI components are reused
- **Security**: Context isolation, preload bridge for IPC
- **Type-safe**: Full TypeScript across the app

### Build Process
1. Compile shared TypeScript
2. Compile main + preload with tsc
3. Build renderer with Vite
4. Package with electron-builder

### Desktop App Lifecycle
1. Main process starts
2. Creates BrowserWindow
3. Loads renderer (dev: localhost:5173, prod: dist/renderer/index.html)
4. Renderer loads AnalyticsProvider (user identification)
5. User selects identity from directory
6. App ready for use

### Analytics Flow
1. User performs action (file upload, button click, etc.)
2. Renderer calls trackEvent/trackFileUpload
3. Data sent to `/api/analytics/track` or `/api/analytics/track-upload`
4. Server stores in Supabase
5. Analytics dashboard displays trends

---

## Summary

**What's Implemented:**
✓ Complete Electron app structure with IPC
✓ Analytics tracking (client + server)
✓ Local logging system
✓ Configuration management
✓ Auto-update system via GitHub releases
✓ User identification system
✓ Windows build (NSIS installer)
✓ Brand auto-detection from filenames
✓ Session tracking
✓ File operations via safe IPC
✓ TypeScript throughout

**Current Status:**
- Version 1.0.5
- Windows build working (tested)
- Analytics fully functional
- Desktop app production-ready
- CI/CD pipeline configured

