# QuickClick MediaTools - Local Desktop Migration Plan

## Executive Summary

**Goal:** Convert QuickClick MediaTools from a Vercel-hosted Next.js web application to a fully local, portable desktop application that eliminates all external data sharing concerns.

**Target Architecture:**
- **Platform:** Desktop application (Windows, macOS, Linux)
- **Framework:** Electron (React + Node.js)
- **Data Storage:** File-based only (no database)
- **Distribution:** Single portable executable
- **User Model:** Single-user per installation

**Timeline Estimate:** 6-8 weeks for full migration (see Phase breakdown below)

---

## Current State Analysis

### What We Have Now (Web App)
- **Frontend:** Next.js 16 + React 18 + TypeScript
- **Backend:** Next.js API routes (Node.js)
- **Database:** Supabase (cloud PostgreSQL)
- **Hosting:** Vercel
- **Core Features:**
  1. Traffic Sheet Automation (Excel processing)
  2. Accutics Taxonomy Generator
  3. Analytics Dashboard

### External Dependencies to Eliminate
- ✅ Supabase database (analytics, user tracking, file upload metadata)
- ✅ Vercel hosting
- ✅ Cloud-based authentication
- ✅ External analytics tracking

### Code Reusability Assessment
- **100% Reusable:** `/core/excel/`, `/core/taxonomy/` (pure business logic)
- **80% Reusable:** `/core/ui/` components (React components work in Electron)
- **50% Reusable:** Analytics logic (needs file-based replacement)
- **10% Reusable:** API routes (logic reusable, routing layer replaced)

---

## Target Architecture

### Technology Stack

```
┌─────────────────────────────────────────────┐
│         Electron Desktop App                │
├─────────────────────────────────────────────┤
│  Renderer Process (Frontend)                │
│  - React 18 + TypeScript                    │
│  - Tailwind CSS                              │
│  - Same UI components from /core/ui/        │
├─────────────────────────────────────────────┤
│  Main Process (Backend)                      │
│  - Node.js                                   │
│  - ExcelJS (Excel processing)                │
│  - File system operations                    │
│  - IPC handlers (inter-process comm)        │
├─────────────────────────────────────────────┤
│  Local Storage                               │
│  - config.json (user settings)               │
│  - logs/ (optional usage logs)               │
│  - templates/ (Excel templates)              │
└─────────────────────────────────────────────┘
```

### File Structure (Desktop App)

```
quickclick-desktop/
├── src/
│   ├── main/                    # Electron main process
│   │   ├── index.ts            # Main entry point
│   │   ├── ipc/                # IPC handlers (replaces API routes)
│   │   │   ├── trafficSheet.ts
│   │   │   ├── taxonomy.ts
│   │   │   └── config.ts
│   │   ├── services/           # Business logic
│   │   │   ├── excelProcessor.ts
│   │   │   ├── configManager.ts
│   │   │   └── logger.ts
│   │   └── utils/
│   │       └── fileSystem.ts
│   ├── renderer/               # React frontend
│   │   ├── App.tsx
│   │   ├── pages/              # Feature pages
│   │   │   ├── TrafficSheet.tsx
│   │   │   ├── Taxonomy.tsx
│   │   │   └── Logs.tsx
│   │   ├── components/         # UI components (from /core/ui/)
│   │   └── hooks/
│   ├── shared/                 # Shared between main/renderer
│   │   ├── core/               # COPIED FROM CURRENT APP
│   │   │   ├── excel/          # 100% reused
│   │   │   ├── taxonomy/       # 100% reused
│   │   │   └── utils/
│   │   └── types/
│   └── preload/                # Electron preload scripts
│       └── index.ts            # Exposes safe APIs to renderer
├── resources/                  # App resources
│   └── templates/
│       └── unilever-traffic-sheet-template.xlsx
├── config/                     # User data (generated at runtime)
│   ├── config.json             # User settings
│   └── logs/                   # Optional usage logs
│       └── usage-YYYY-MM-DD.jsonl
├── electron-builder.yml        # Build configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## Migration Strategy

### Phase 1: Foundation Setup (Week 1)
**Goal:** Create basic Electron app shell with file operations

#### Tasks:
1. **Initialize Electron project**
   - Create new repo or branch: `quickclick-desktop`
   - Set up Electron with TypeScript
   - Configure electron-builder for packaging
   - Set up hot-reload development environment

2. **Set up IPC architecture**
   - Define IPC channels (replaces HTTP API routes)
   - Create main process handlers
   - Create renderer process invokers
   - Add TypeScript types for IPC contracts

3. **Implement file dialog system**
   - File selection (Excel uploads)
   - File save dialogs (downloads)
   - Directory selection (for logs, exports)

4. **Copy core business logic**
   - Copy `/core/excel/` → `src/shared/core/excel/`
   - Copy `/core/taxonomy/` → `src/shared/core/taxonomy/`
   - Copy `/core/utils/` → `src/shared/core/utils/`
   - Verify all imports resolve correctly

**Deliverable:** Basic Electron app that can open/save files

---

### Phase 2: Configuration & Settings (Week 2)
**Goal:** Replace database-backed user management with local config

#### Tasks:
1. **Config manager service**
   - Create `ConfigManager` class in main process
   - Read/write `config.json` file
   - Schema:
     ```json
     {
       "version": "1.0.0",
       "user": {
         "name": "Lucas Dato",
         "role": "Media Director",
         "client": "QuickClick Media",
         "isAdmin": false
       },
       "preferences": {
         "lastUsedFolder": "/Users/...",
         "theme": "light"
       },
       "adminPassword": null  // hashed, not plaintext
     }
     ```

2. **User identification flow**
   - First launch: Show modal (reuse `UserIdentificationModal`)
   - Save to config.json
   - Subsequent launches: Auto-load from config
   - Add "Change User" option in app menu

3. **Admin authentication**
   - Replace plaintext ADMIN_PASSWORD with hashed version
   - Store hashed password in config (if user is admin)
   - Admin verification dialog (reuse existing UI)

4. **User directory integration**
   - Copy `core/analytics/userDirectory.ts` → `src/shared/core/userDirectory.ts`
   - Use for role/client autocomplete
   - Use for admin flag lookup

**Deliverable:** Working user identification & config persistence

---

### Phase 3: Traffic Sheet Automation (Week 3-4)
**Goal:** Migrate core feature #1 completely

#### Tasks:
1. **Port API route logic to IPC handler**
   - Current: `app/api/traffic-sheet/generate/route.ts`
   - New: `src/main/ipc/trafficSheet.ts`
   - Replace `FormData` handling with file path
   - Replace `Response` with IPC return value

2. **File upload flow**
   - Renderer: Show "Select File" button
   - Trigger Electron file dialog
   - User selects blocking chart
   - Send file path to main process via IPC
   - Main process: Read file using `fs.readFile()`

3. **Preview functionality**
   - Port `/api/traffic-sheet/preview` → IPC handler
   - Parse blocking chart
   - Return structured data to renderer
   - Renderer: Show verification UI (reuse existing)

4. **Generation & download**
   - Port `/api/traffic-sheet/generate` → IPC handler
   - Process blocking chart + overrides
   - Generate traffic sheet (100% reused logic)
   - Show save dialog
   - Write buffer to selected file path

5. **Template handling**
   - Bundle template in `resources/templates/`
   - Main process: Read template from bundled resources
   - Handle both dev (unbundled) and production (ASAR archive)

6. **Migrate UI components**
   - Copy `/app/apps/traffic-sheet-automation/` → `src/renderer/pages/TrafficSheet.tsx`
   - Replace `fetch()` calls with IPC invocations
   - Replace file upload input with button → dialog
   - Update download flow to use save dialog

**Deliverable:** Fully working Traffic Sheet feature in desktop app

---

### Phase 4: Taxonomy Generator (Week 5)
**Goal:** Migrate core feature #2

#### Tasks:
1. **Port API routes to IPC**
   - `/api/taxonomy/parse` → `src/main/ipc/taxonomy.ts#parse`
   - `/api/taxonomy/export` → `src/main/ipc/taxonomy.ts#export`

2. **File upload/download**
   - Same pattern as Traffic Sheet
   - File dialog for blocking chart upload
   - Save dialog for CSV/TSV/Excel export

3. **Migrate UI**
   - Copy `/app/apps/taxonomy-generator/` → `src/renderer/pages/Taxonomy.tsx`
   - Replace fetch with IPC
   - Update file handling

4. **Platform configs**
   - Copy `/core/taxonomy/platforms/` → `src/shared/core/taxonomy/platforms/`
   - Ensure all platform configs load correctly

**Deliverable:** Fully working Taxonomy Generator in desktop app

---

### Phase 5: Analytics & Logging (Week 6)
**Goal:** Replace Supabase analytics with local file-based logs

#### Tasks:
1. **Logger service**
   - Create `Logger` class in main process
   - Write logs to `config/logs/usage-YYYY-MM-DD.jsonl`
   - JSONL format (newline-delimited JSON)
   - Each line = one event:
     ```json
     {"timestamp":"2025-11-04T10:30:00Z","user":"Lucas Dato","tool":"traffic-sheet","action":"generate","metadata":{"filename":"blocking-chart.xlsx","rows":150}}
     ```

2. **Event tracking**
   - Replace `core/analytics/tracker.ts` Supabase calls with Logger calls
   - Track same events: page_view, file_upload, generate, export, error
   - Store locally, never send anywhere

3. **Logs viewer UI**
   - New page: `src/renderer/pages/Logs.tsx`
   - Read log files from `config/logs/`
   - Display in table (filterable by date, tool, action)
   - Export logs as CSV (for manual sharing if needed)
   - Admin-only access (check config.user.isAdmin)

4. **Optional: Remove analytics entirely**
   - If you prefer zero tracking, skip this phase
   - Remove all `track*()` calls from UI components

**Deliverable:** Local usage logs with viewer UI (or analytics removed)

---

### Phase 6: Polish & Testing (Week 7)
**Goal:** Make app production-ready

#### Tasks:
1. **Application menu**
   - File → Open Blocking Chart, Export Traffic Sheet, Quit
   - Edit → Change User, Preferences
   - Tools → Traffic Sheet, Taxonomy Generator, Logs
   - Help → Documentation, About

2. **Error handling**
   - Graceful error dialogs (use Electron dialog API)
   - Log errors to file
   - User-friendly error messages

3. **Loading states**
   - Show progress for long operations
   - Progress bars for file processing
   - Cancel button for long operations

4. **Icon & branding**
   - Create app icon (QuickClick logo)
   - Set window title, about dialog
   - Add version number from package.json

5. **Documentation**
   - User guide (how to use desktop app)
   - Installation instructions
   - FAQ (data privacy, file locations, etc.)

6. **Testing**
   - Test all features with real data
   - Test on multiple file sizes
   - Test error scenarios (invalid files, missing templates)
   - Cross-platform testing (Mac, Windows, Linux)

**Deliverable:** Polished, user-ready desktop app

---

### Phase 7: Packaging & Distribution (Week 8)
**Goal:** Create portable executable

#### Tasks:
1. **Configure electron-builder**
   - Target platforms: macOS, Windows, Linux
   - Create portable builds (no installer required)
   - macOS: `.app` bundle
   - Windows: `.exe` (portable, no admin required)
   - Linux: AppImage or .deb

2. **Code signing (optional but recommended)**
   - macOS: Apple Developer certificate
   - Windows: Code signing certificate
   - Prevents security warnings on launch

3. **Build automation**
   - GitHub Actions or local build script
   - Build for all platforms
   - Create release artifacts

4. **Testing builds**
   - Test on clean machines (not dev environment)
   - Verify no external dependencies required
   - Verify file paths work correctly
   - Test that bundled templates load

5. **Distribution plan**
   - Internal file server / shared drive
   - Email download links
   - USB drive distribution
   - Update mechanism (optional: electron-updater for auto-updates)

**Deliverable:** Distributable executables for Mac/Windows/Linux

---

## Data Privacy & Security Benefits

### Current Web App Risks
- ❌ User data stored in cloud (Supabase)
- ❌ File metadata uploaded to database
- ❌ Analytics tracked externally
- ❌ Admin passwords in environment variables
- ❌ Hosted on third-party infrastructure (Vercel)

### Desktop App Improvements
- ✅ **Zero cloud storage** - All data stays on user's machine
- ✅ **No external network calls** - App runs 100% offline
- ✅ **User controls data** - Can delete config/logs anytime
- ✅ **Portable** - Copy app to USB, it works
- ✅ **Auditable** - Users can inspect what data is stored (JSON files)
- ✅ **No telemetry** - Optional logs stay local, never uploaded

### Compliance Advantages
- GDPR: No personal data leaves the device
- SOC 2: No third-party data processors
- Client NDAs: File contents never touch external servers
- Data residency: Data physically stays on corporate machines

---

## Technical Decisions & Trade-offs

### Why Electron over Tauri?
**Electron:**
- ✅ Mature ecosystem (Slack, VS Code, Discord use it)
- ✅ Excellent React integration
- ✅ Easy to package cross-platform
- ✅ Large community, lots of examples
- ✅ Node.js backend (reuse 100% of current Excel logic)
- ❌ Larger bundle size (~150-200 MB)

**Tauri:**
- ✅ Smaller bundle (~20-30 MB)
- ✅ Lower memory usage
- ❌ Rust backend (would require rewriting all Excel logic)
- ❌ Less mature ecosystem
- ❌ Steeper learning curve

**Decision:** Electron wins due to code reusability and faster development.

---

### Why File-Based over Embedded SQLite?
**File-Based:**
- ✅ Simpler (no SQL, no ORM)
- ✅ Human-readable (JSON/JSONL)
- ✅ Easy to inspect/debug
- ✅ Portable (copy files to new machine)
- ✅ No database migrations needed
- ❌ No complex queries (but we don't need them)

**SQLite:**
- ✅ Better for complex queries
- ✅ Atomic transactions
- ❌ Requires database management
- ❌ Less transparent to users
- ❌ Migration overhead

**Decision:** File-based is sufficient for single-user, simple data model.

---

### Why Config JSON over OS Settings?
**Config JSON:**
- ✅ Portable with app
- ✅ User-editable (power users)
- ✅ Easy to reset (delete file)
- ✅ Cross-platform consistency
- ❌ Slightly less "native"

**OS Settings:**
- ✅ More "native" feel
- ❌ Not portable
- ❌ Harder to inspect
- ❌ Platform-specific code

**Decision:** Config JSON for portability and transparency.

---

## Migration Risks & Mitigations

### Risk 1: Template File Loading
**Problem:** Currently templates load from `/public/`. In Electron ASAR archive, path changes.

**Mitigation:**
- Use `app.getAppPath()` to get correct path in both dev and production
- Bundle templates in `resources/` (outside ASAR)
- Test in production build early

---

### Risk 2: File Path Handling
**Problem:** Windows uses backslashes, macOS/Linux use forward slashes.

**Mitigation:**
- Use Node.js `path` module everywhere (handles cross-platform)
- Never hardcode path separators
- Test on all three platforms

---

### Risk 3: Large File Processing
**Problem:** Current app processes files in-memory. Very large files (>100MB) could crash.

**Mitigation:**
- Add file size check before processing
- Show warning for large files
- Consider streaming for huge files (future optimization)
- Test with realistic large files

---

### Risk 4: User Adoption
**Problem:** Users might resist switching from familiar web app to desktop app.

**Mitigation:**
- Make UI identical to current web app
- Provide clear migration guide
- Run both in parallel during transition
- Emphasize privacy/security benefits

---

### Risk 5: Updates & Maintenance
**Problem:** Updating desktop apps is harder than deploying web apps.

**Mitigation:**
- Implement auto-update mechanism (electron-updater)
- Users get notification when new version available
- One-click update (downloads and installs)
- OR: Simple "Download new version" button that opens browser

---

## Cost Analysis

### Current Costs (Web App)
- Vercel hosting: $20-50/month (depends on usage)
- Supabase: $25/month (Pro plan for team)
- **Total: ~$45-75/month = $540-900/year**

### Desktop App Costs
- Development time: One-time cost (6-8 weeks)
- Code signing certificates: $99/year (Apple) + $200-400/year (Windows, optional)
- Hosting for downloads: $0 (internal file server) or $5/month (S3 bucket)
- **Total: $0-500/year (after initial development)**

**Savings:** ~$500-900/year + elimination of data sharing concerns (priceless)

---

## Success Criteria

### Must-Have (Phase 1-4)
- ✅ Traffic Sheet Automation works identically to web version
- ✅ Taxonomy Generator works identically to web version
- ✅ Zero external network calls (fully offline)
- ✅ Portable executable (no installation required)
- ✅ User settings persist between sessions

### Should-Have (Phase 5-6)
- ✅ Local usage logs (optional, privacy-focused)
- ✅ Polished UI (matches current branding)
- ✅ Comprehensive error handling
- ✅ User documentation

### Nice-to-Have (Phase 7+)
- ✅ Auto-update mechanism
- ✅ Code signing (avoids security warnings)
- ✅ Cross-platform builds (Mac + Windows + Linux)

---

## Alternative Approaches (Considered but Rejected)

### Alternative 1: Self-Hosted Web App
**Idea:** Keep Next.js app, host on internal server instead of Vercel

**Pros:**
- Minimal code changes
- Familiar web interface
- Accessible from any device on network

**Cons:**
- Still requires server maintenance
- Data still on network (not truly local)
- Requires IT infrastructure
- Doesn't meet "runs on machines locally" requirement

**Verdict:** Rejected - doesn't solve data locality concerns

---

### Alternative 2: Progressive Web App (PWA)
**Idea:** Make web app installable as PWA, works offline

**Pros:**
- Can work offline
- No app store approval needed
- Cross-platform automatically

**Cons:**
- Still requires initial web hosting
- File system access limited (Web File API restrictions)
- Can't bundle templates reliably
- Users need to "install" from browser (confusing)

**Verdict:** Rejected - insufficient file system access for Excel processing

---

### Alternative 3: CLI Tool (Node.js script)
**Idea:** Pure command-line tool, no GUI

**Pros:**
- Simplest implementation
- Lightest weight
- Easy to automate

**Cons:**
- No UI (huge loss of usability)
- Loses verification step (critical for Traffic Sheet)
- Not user-friendly for non-technical users

**Verdict:** Rejected - UI is essential for this workflow

---

## Implementation Roadmap Summary

| Phase | Duration | Deliverable | Priority |
|-------|----------|-------------|----------|
| 1. Foundation | Week 1 | Basic Electron app with file dialogs | Critical |
| 2. Configuration | Week 2 | User settings & config management | Critical |
| 3. Traffic Sheet | Week 3-4 | Core feature #1 working | Critical |
| 4. Taxonomy | Week 5 | Core feature #2 working | Critical |
| 5. Analytics | Week 6 | Local logs (or removed) | Medium |
| 6. Polish | Week 7 | Production-ready app | High |
| 7. Distribution | Week 8 | Portable executables | High |

**Total Timeline:** 6-8 weeks (full-time development)

**Minimum Viable Product:** Phases 1-4 only = 4-5 weeks

---

## Next Steps

### Immediate Actions:
1. **Decision:** Approve this plan or request modifications
2. **Setup:** Create new repository or branch `quickclick-desktop`
3. **Environment:** Set up Electron development environment
4. **Kickoff:** Begin Phase 1 (Foundation Setup)

### Questions to Answer Before Starting:
1. Do you want to keep analytics (as local logs) or remove entirely?
2. Do you need auto-update functionality?
3. What platforms to prioritize? (macOS first, then Windows, then Linux?)
4. Any specific branding/design changes for desktop version?
5. Timeline constraints? (Need it by a certain date?)

---

## Appendix: Key Technologies

### Core Stack:
- **Electron:** v28+ (latest stable)
- **React:** 18.3.1 (same as current)
- **TypeScript:** 5.9.3 (same as current)
- **ExcelJS:** 4.4.0 (same as current)
- **Tailwind CSS:** 3.4.0 (same as current)

### New Dependencies:
- **electron:** Desktop app framework
- **electron-builder:** Packaging and distribution
- **electron-store:** Simple config storage (alternative to custom JSON)
- **electron-log:** File-based logging

### Build Tools:
- **Vite:** Fast build tool for Electron + React
- **electron-forge:** Alternative to electron-builder (if preferred)

### Optional:
- **electron-updater:** Auto-update functionality
- **electron-notarize:** macOS code signing
- **electron-winstaller:** Windows installer

---

## Conclusion

This migration plan provides a comprehensive path to transform QuickClick MediaTools into a fully local, privacy-focused desktop application. By leveraging Electron and reusing 80%+ of your existing business logic, we can achieve this transformation in 6-8 weeks while maintaining feature parity and significantly improving data privacy.

The desktop app will:
- Eliminate all external data sharing
- Run 100% offline
- Maintain identical functionality
- Provide a portable, single-executable experience
- Save ongoing hosting costs

**Recommendation:** Proceed with phased approach, starting with Phases 1-4 for MVP (4-5 weeks), then expand based on user feedback.
