# QuickClick Media Suite

A Next.js 15 application providing automated tools for media planning and execution.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000
```

## Key Features

- **Traffic Sheet Automation** - Convert blocking charts to client-ready traffic sheets
- **Taxonomy Generator** - Multi-platform taxonomy generation (coming soon)
- **Analytics Dashboard** - Usage tracking and insights
- **Desktop Application** - Standalone Electron app with auto-update support
- More tools coming soon!

## Project Structure

```
QuickClick MediaTools/
├── app/                  # Next.js 15 app directory
│   ├── api/             # API routes
│   ├── apps/            # Application pages
│   └── layout.tsx       # Root layout
├── core/                 # Core business logic
│   ├── excel/           # Excel processing (config-driven)
│   ├── ui/              # Shared React components
│   └── utils/           # Utility functions
├── docs/                 # Documentation
│   ├── getting-started/ # Start here!
│   ├── guides/          # How-to guides
│   ├── architecture/    # Technical docs
│   ├── features/        # Feature documentation
│   └── updates/         # Changelogs
├── tests/               # Test files
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── debug/          # Debug scripts
├── database/            # Database files
│   └── migrations/     # SQL migrations
├── scripts/             # Utility scripts
└── public/              # Static assets
    └── templates/      # Excel templates
```

## Documentation

### Getting Started
- [Start Here Guide](docs/getting-started/START_HERE.md) - Complete setup instructions
- [Quick Start](docs/getting-started/QUICKSTART.md) - 5-minute setup
- [Claude Integration](docs/getting-started/CLAUDE.md) - AI assistant guidelines

### Development Guides
- [Deployment Guide](docs/guides/DEPLOYMENT_GUIDE.md) - Deploy to Vercel
- [Testing Guide](docs/guides/TESTING_GUIDE.md) - Testing instructions
- [Column Mapping](docs/guides/COLUMN_MAPPING_GUIDE.md) - Excel column configuration
- [Analytics Setup](docs/guides/ANALYTICS_SETUP.md) - Usage tracking setup

### Architecture
- [Project Overview](docs/architecture/PROJECT_OVERVIEW.md) - System architecture
- [Excel Processing](docs/excel/README.md) - Excel engine documentation

### Feature Documentation
- [Traffic Sheet Features](docs/features/traffic-sheet/) - All traffic sheet docs
- [Taxonomy Generator](docs/features/taxonomy/) - Taxonomy tool docs
- [Analytics](docs/features/analytics/) - Analytics documentation

## Tech Stack

- **Framework:** Next.js 15 with TypeScript (Web) / Electron (Desktop)
- **Styling:** Tailwind CSS
- **Excel Processing:** ExcelJS
- **Database:** Supabase (optional)
- **Deployment:** Vercel (Web) / GitHub Releases (Desktop)
- **Auto-Updates:** electron-updater

## Development

### Configuration-Driven Design

The system is configuration-driven. All business logic, dimensions, and validation rules are in `core/excel/config.ts`. Modify configuration instead of code when possible.

### Commands

#### Web Application
```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint validation
npx tsc --noEmit # Type checking
```

#### Desktop Application
```bash
# Development
npm run dev --workspace=packages/desktop

# Build for production
npm run build --workspace=packages/desktop

# Build for specific platform
npm run build:win --workspace=packages/desktop  # Windows
npm run build:mac --workspace=packages/desktop  # macOS
```

### Testing

Run tests from the `tests/` directory:

```bash
# Run a specific test
node tests/unit/parser/test-parser.js

# Type check tests
npx tsc tests/**/*.ts --noEmit
```

## Contributing

1. Check `docs/getting-started/CLAUDE.md` for AI-assisted development guidelines
2. Follow the configuration-driven approach
3. Add tests for new features
4. Update relevant documentation

## Support

- Bug reports: Create an issue or check existing documentation
- Feature requests: See `docs/updates/NEW_FEATURES.md`
- Questions: Check documentation in `docs/`

## License

© 2024 QuickClick Media. All rights reserved.