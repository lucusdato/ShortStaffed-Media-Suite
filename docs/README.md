# QuickClick Media Suite

A comprehensive platform housing automated tools for media planning and execution.

## 🌟 Overview

The QuickClick Media Suite is a single platform that provides mini-tools to solve specific pain points in the media planning and execution process. Each tool is designed to automate repetitive tasks and ensure consistency across campaigns.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **UI**: React + Tailwind CSS
- **Excel Processing**: ExcelJS for reading and writing .xlsx files
- **File Downloads**: FileSaver.js
- **Backend**: Next.js API Routes (Node.js)
- **Hosting**: Vercel (recommended)

## 📋 Available Tools

### 1. Traffic Sheet Automation ✅ (MVP)
Upload your blocking chart and instantly generate a client-ready traffic sheet. The Unilever template is built-in - no need to upload it every time!

### Coming Soon:
- **RFP/DAB Form Importer** - Convert blocking charts into pre-filled RFP forms
- **Projection Calculator** - Automate campaign projection math
- **Adserving Actualization Tool** - Update blocking charts with real ad-serving CPMs
- **Post-Campaign Actualizer** - Produce spend reports comparing plan vs. delivery
- **Taxonomy and Tagging Checker** - Validate tracking and naming conventions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd "QuickClick MediaTools"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (tool grid)
│   ├── globals.css              # Global styles
│   └── api/                     # API routes
│       └── traffic-sheet/       # Traffic sheet endpoints
│           ├── generate/
│           └── preview/
├── apps/                         # Individual tool applications
│   └── traffic-sheet-automation/
│       └── page.tsx             # Traffic sheet UI
├── core/                         # Shared utilities and components
│   ├── excel/                   # Excel processing utilities
│   │   ├── types.ts
│   │   ├── parseBlockingChart.ts
│   │   └── generateTrafficSheet.ts
│   └── ui/                      # Shared UI components
│       ├── Button.tsx
│       ├── FileUpload.tsx
│       └── BugReportModal.tsx
└── package.json
```

## 🎯 Traffic Sheet Automation (MVP)

### How It Works

1. **Upload**: User uploads a blocking chart (.xlsx)
2. **Parse**: The system parses the blocking chart, extracting all data while handling merged cells
3. **Map**: Data is automatically mapped to the built-in Unilever traffic sheet template
4. **Generate**: A formatted Excel file is created with all original styling preserved
5. **Download**: User downloads the completed traffic sheet

**Note**: The Unilever template is built into the application. Users only need to upload their blocking chart!

### Key Features

- ✅ Handles merged cells correctly
- ✅ Preserves Excel formatting (fonts, colors, borders)
- ✅ Maintains template structure
- ✅ Preview data before generation
- ✅ Error handling and validation
- ✅ Client-side file processing

## 🧪 Development

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Linting
```bash
npm run lint
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

Alternatively, use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 🐛 Bug Reports & Feature Requests

Click the "Report Bug" button in the app header to submit issues or request new features.

## 📝 Adding New Tools

Each new tool should follow this structure:

1. Create a new directory in `/apps/[tool-name]/`
2. Add a `page.tsx` with the tool UI
3. Create API routes in `/app/api/[tool-name]/`
4. Add shared utilities to `/core/`
5. Update the home page tool grid in `/app/page.tsx`

## 🔧 Customization

### Adding Column Mappings

To customize how blocking chart columns map to traffic sheet columns, edit:
- `/core/excel/generateTrafficSheet.ts` - Update the `mapBlockingChartToTrafficSheet` function

### Styling

The app uses Tailwind CSS. Customize colors, fonts, and spacing in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles

## 📄 License

Private - QuickClick Media Suite

## 🙏 Support

For questions or support, please use the bug report feature in the application.

