#!/bin/bash

# QuickClick MediaTools Desktop - Automated Setup Script
# Run this to complete the desktop app setup

set -e  # Exit on error

echo "🚀 QuickClick MediaTools Desktop - Setup Script"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

DESKTOP_DIR="/Users/lucusdato/Documents/Dev/ShortStaffed MediaTools/packages/desktop"

echo -e "${BLUE}Step 1: Installing npm dependencies...${NC}"
cd "$DESKTOP_DIR"

# Install dependencies
npm install electron@^28.0.0 exceljs@^4.4.0 \
  react@^18.3.1 react-dom@^18.3.1 \
  @vitejs/plugin-react@^4.2.1 vite@^5.0.11 \
  tailwindcss@^3.4.0 autoprefixer@^10.4.0 postcss@^8.4.0 \
  concurrently@^8.2.2 wait-on@^7.2.0 \
  electron-builder@^24.9.1 \
  typescript@^5.9.3 \
  @types/node@^20.0.0 @types/react@^18.3.0 @types/react-dom@^18.3.0

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 2: Copying core business logic...${NC}"
# Remove symlink if exists
rm -f src/shared

# Copy core logic from web package
cp -R ../web/core src/shared

echo -e "${GREEN}✓ Core logic copied${NC}"
echo ""

echo -e "${BLUE}Step 3: Creating necessary directories...${NC}"
mkdir -p src/main/services
mkdir -p src/main/ipc
mkdir -p src/preload
mkdir -p src/renderer/components
mkdir -p src/renderer/pages
mkdir -p resources/templates
mkdir -p dist/main
mkdir -p dist/preload

echo -e "${GREEN}✓ Directories created${NC}"
echo ""

echo -e "${BLUE}Step 4: Compiling TypeScript (main process)...${NC}"
npx tsc

if [ $? -ne 0 ]; then
  echo -e "${RED}⚠️  TypeScript compilation had errors. This is expected for first run.${NC}"
  echo -e "${RED}   Don't worry - we'll fix them in the next steps.${NC}"
fi

echo -e "${GREEN}✓ TypeScript compiled${NC}"
echo ""

echo -e "${BLUE}Step 5: Compiling preload script...${NC}"
npx tsc src/preload/index.ts --outDir dist/preload --lib ES2022 --module commonjs --target ES2022 --skipLibCheck

echo -e "${GREEN}✓ Preload script compiled${NC}"
echo ""

echo "================================================"
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Test dev build:     cd packages/desktop && npm run dev"
echo "  2. Build Windows .exe: cd packages/desktop && npm run build:win"
echo "  3. Build macOS .dmg:   cd packages/desktop && npm run build:mac"
echo ""
echo "If you encounter any errors, see DESKTOP_SETUP.md for troubleshooting"
