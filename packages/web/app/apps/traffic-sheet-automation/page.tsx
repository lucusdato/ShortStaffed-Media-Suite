"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import FileUpload from "@/core/ui/FileUpload";
import Button from "@/core/ui/Button";
import Header from "@/core/ui/Header";
import TabPicker from "@/core/ui/TabPicker";
import { Analytics } from "@/core/analytics/tracker";
import { TabInfo, categorizeLine } from "@quickclick/shared/excel";
import { useUser } from "@/core/ui/AnalyticsProvider";

type Step = "upload" | "generate";

interface ParsedData {
  headers: string[];
  rows: any[];
  metadata?: {
    campaignName?: string;
    client?: string;
    dateRange?: string;
    detectedTemplate?: string;  // Template ID that was detected
    templateName?: string;       // Human-readable template name
  };
  rowCount: number;
}

export default function TrafficSheetAutomation() {
  const user = useUser();
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [blockingChart, setBlockingChart] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [manualOverrides, setManualOverrides] = useState<{ [key: number]: string }>({});
  const [deletedRows, setDeletedRows] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Tab selection state
  const [showTabPicker, setShowTabPicker] = useState(false);
  const [availableTabs, setAvailableTabs] = useState<TabInfo[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number | null>(null);

  // Track page view on mount
  useEffect(() => {
    Analytics.trackPageView("Traffic Sheet Automation");
  }, []);

  const handleFileSelect = async (file: File, tabIndex?: number) => {
    setBlockingChart(file);
    setError(null);
    setSuccess(false);

    // Track file upload (only on first upload, not on tab selection)
    if (tabIndex === undefined) {
      Analytics.trafficSheetFileUpload(file);
    }

    // Automatically parse and generate
    setIsProcessing(true);
    setCurrentStep("generate");

    try {
      const formData = new FormData();
      formData.append("blockingChart", file);

      // Include tab index if user selected a specific tab
      if (tabIndex !== undefined) {
        formData.append("tabIndex", tabIndex.toString());
      }

      // Check if we need tab selection first
      const previewResponse = await fetch("/api/traffic-sheet/preview", {
        method: "POST",
        body: formData,
      });

      if (!previewResponse.ok) {
        const errorData = await previewResponse.json();
        throw new Error(errorData.error || "Failed to parse blocking chart");
      }

      const previewData = await previewResponse.json();

      // Check if we need tab selection
      if (previewData.needsTabSelection && previewData.availableTabs) {
        console.log(`⚠️  Auto-detection failed. Showing tab picker with ${previewData.availableTabs.length} tabs.`);
        setAvailableTabs(previewData.availableTabs);
        setShowTabPicker(true);
        setIsProcessing(false);
        setCurrentStep("upload");
        return;
      }

      // Auto-detection succeeded or user selected a tab
      console.log(`✅ ${previewData.autoDetected ? 'Auto-detected' : 'User selected'} tab index: ${previewData.selectedTabIndex}`);
      setShowTabPicker(false);

      // Track successful preview
      Analytics.trafficSheetPreview();

      // Automatically generate the traffic sheet
      Analytics.trafficSheetGenerate();

      const generateFormData = new FormData();
      generateFormData.append("blockingChart", file);
      if (tabIndex !== undefined) {
        generateFormData.append("tabIndex", tabIndex.toString());
      }

      const generateResponse = await fetch("/api/traffic-sheet/generate", {
        method: "POST",
        body: generateFormData,
      });

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json();
        throw new Error(errorData.error || "Failed to generate traffic sheet");
      }

      // Download the generated file
      const blob = await generateResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `traffic-sheet-${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(true);

      // Track successful download
      Analytics.trafficSheetDownload();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate traffic sheet";
      setError(errorMessage);
      setBlockingChart(null);
      setCurrentStep("upload");

      // Track the error
      Analytics.trafficSheetError(
        errorMessage,
        file.name,
        'generation_error'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle tab selection from picker
  const handleTabSelect = (tabIndex: number) => {
    if (!blockingChart) {
      setError("No file selected");
      return;
    }

    console.log(`📋 User selected tab index: ${tabIndex}`);
    setSelectedTabIndex(tabIndex);

    // Re-parse with selected tab
    handleFileSelect(blockingChart, tabIndex);
  };

  const handleGenerate = async () => {
    if (!blockingChart) {
      setError("No blocking chart selected");
      return;
    }

    if (!parsedData) {
      setError("No parsed data available");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(false);
    setCurrentStep("generate");

    // Track generation action
    Analytics.trafficSheetGenerate();

    try {
      // Convert deleted row stable IDs to campaign line indices
      // The stable IDs correspond to indices in the rowsWithoutTotals array
      // We need to reconstruct that array to map stable IDs back to original rows
      const deletedCampaignLineIndices = new Set<number>();

      // Reconstruct rowsWithoutTotals (same logic as in the render section)
      const rowsWithoutTotals = parsedData.rows.filter((row: any) => row._mergeSpan && row._mergeSpan > 0);

      deletedRows.forEach(stableRowId => {
        // The stable ID is the index in rowsWithoutTotals
        const row = rowsWithoutTotals[stableRowId];

        // Get the campaign line index for this row
        if (row && (row as any)._campaignLineIndex !== undefined) {
          deletedCampaignLineIndices.add((row as any)._campaignLineIndex);
          console.log(`  🗑️  Stable ID ${stableRowId} → Campaign Line ${(row as any)._campaignLineIndex}`);
        } else {
          console.warn(`  ⚠️  Could not find campaign line index for stable ID ${stableRowId}`);
          if (row) {
            console.log(`     Row data:`, { _campaignLineIndex: (row as any)._campaignLineIndex, _campaignLineMasterRow: (row as any)._campaignLineMasterRow });
          }
        }
      });

      console.log(`🗑️  Sending ${deletedCampaignLineIndices.size} deleted campaign line indices to API`);
      console.log(`   Deleted row IDs: [${Array.from(deletedRows).join(', ')}]`);
      console.log(`   Deleted campaign line indices: [${Array.from(deletedCampaignLineIndices).join(', ')}]`);

      // Manual overrides are already stored by campaign line index (stable IDs)
      console.log(`✏️  Sending ${Object.keys(manualOverrides).length} manual overrides to API`);
      console.log(`   Manual overrides (campaign line indices): ${JSON.stringify(manualOverrides)}`);

      const formData = new FormData();
      formData.append("blockingChart", blockingChart);
      formData.append("manualOverrides", JSON.stringify(manualOverrides));
      formData.append("deletedRows", JSON.stringify(Array.from(deletedCampaignLineIndices)));

      const response = await fetch("/api/traffic-sheet/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate traffic sheet");
      }

      // Download the generated file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `traffic-sheet-${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(true);

      // Track successful download
      Analytics.trafficSheetDownload();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      setCurrentStep("verify");

      // Track the error
      Analytics.trafficSheetError(
        errorMessage,
        blockingChart?.name,
        'generation_error'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep("upload");
    setBlockingChart(null);
    setParsedData(null);
    setManualOverrides({});
    setDeletedRows(new Set());
    setError(null);
    setSuccess(false);
    // Reset tab picker state
    setShowTabPicker(false);
    setAvailableTabs([]);
    setSelectedTabIndex(null);
  };

  const handleBackToUpload = () => {
    setCurrentStep("upload");
    setBlockingChart(null);
    setParsedData(null);
    setManualOverrides({});
    setDeletedRows(new Set());
    setError(null);
    // Reset tab picker state
    setShowTabPicker(false);
    setAvailableTabs([]);
    setSelectedTabIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <Header
        title="Traffic Sheet Automation"
        subtitle="Generate client-ready traffic sheets from blocking charts"
        showBackButton={true}
      />

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {/* Step 1: Upload */}
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep === "upload"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : success
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-slate-300 bg-white text-slate-600"
                }`}
              >
                {success ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  "1"
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  currentStep === "upload"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Upload
              </span>
            </div>

            {/* Connector */}
            <div
              className={`w-16 h-0.5 ${
                success || currentStep === "generate" ? "bg-green-500" : "bg-slate-300"
              }`}
            />

            {/* Step 2: Generate */}
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep === "generate" || success
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-600"
                }`}
              >
                {success ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  "2"
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  currentStep === "generate" || success
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Generate
              </span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === "upload" && (
          <UploadStep
            blockingChart={blockingChart}
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
            error={error}
            showTabPicker={showTabPicker}
            availableTabs={availableTabs}
            onTabSelect={handleTabSelect}
          />
        )}

        {(currentStep === "generate" || success) && (
          <GenerateStep
            success={success}
            isProcessing={isProcessing}
            error={error}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
}

// Upload Step Component
function UploadStep({
  blockingChart,
  onFileSelect,
  isProcessing,
  error,
  showTabPicker,
  availableTabs,
  onTabSelect,
}: {
  blockingChart: File | null;
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  error: string | null;
  showTabPicker: boolean;
  availableTabs: TabInfo[];
  onTabSelect: (tabIndex: number) => void;
}) {
  return (
    <div className="max-w-4xl mx-auto">
        {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          📖 Upload Your Blocking Chart
          </h2>
          <ol className="text-blue-800 dark:text-blue-200 space-y-1 text-sm list-decimal list-inside">
          <li>Select your completed blocking chart (.xlsx file)</li>
          <li>We&apos;ll automatically parse and generate your traffic sheet</li>
          <li>Your file will download automatically when ready</li>
          </ol>
        </div>

      {/* File Upload */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-4">
          <FileUpload
          label="Upload Blocking Chart"
          description="Upload your completed blocking chart Excel file (.xlsx)"
          selectedFile={blockingChart}
          onFileSelect={onFileSelect}
        />

        {/* Tab Picker - Only show if auto-detection failed */}
        {showTabPicker && availableTabs.length > 0 && (
          <TabPicker
            tabs={availableTabs}
            onTabSelect={onTabSelect}
            isProcessing={isProcessing}
          />
        )}

        {/* Template Info */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-medium text-slate-900 dark:text-white text-sm">
                Unilever Template Built-In
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                The official Unilever traffic sheet template is pre-loaded. Just upload your blocking chart!
              </p>
            </div>
          </div>
        </div>

        {/* Processing State */}
        {isProcessing && (
          <div className="flex items-center justify-center gap-3 p-4">
            <svg
              className="animate-spin h-6 w-6 text-blue-600"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Parsing your blocking chart...
            </span>
          </div>
        )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-500 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-red-900 dark:text-red-100">
                    Error
                  </p>
                  <p className="text-red-700 dark:text-red-200 text-sm">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

// Verify Step Component
function VerifyStep({
  data,
  fileName,
  onGenerate,
  onBackToUpload,
  isProcessing,
  error,
  manualOverrides,
  onManualOverrideChange,
  deletedRows,
  onDeletedRowsChange,
  isAdmin = false,
}: {
  data: ParsedData;
  fileName: string;
  onGenerate: () => void;
  onBackToUpload: () => void;
  isProcessing: boolean;
  error: string | null;
  manualOverrides: { [key: number]: string };
  onManualOverrideChange: (overrides: { [key: number]: string }) => void;
  deletedRows: Set<number>;
  onDeletedRowsChange: (deletedRows: Set<number>) => void;
  isAdmin?: boolean;
}) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  // Debug: Check if _mergeSpan data is present in the original data
  console.log('🔍 Original data.rows _mergeSpan check:');
  data.rows.forEach((row, index) => {
    if ((row as any)._mergeSpan) {
      console.log(`  Original Row ${index}: _mergeSpan = ${(row as any)._mergeSpan}`);
    }
  });

  // Filter rows: Find "Variance" field and only show rows up to and including it
  const rowsUpToVariance = (() => {
    const varianceRowIndex = data.rows.findIndex(row => {
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes('variance')
      );
    });
    
    // If variance found, return rows up to and including that row
    // If not found, return all rows
    return varianceRowIndex >= 0 ? data.rows.slice(0, varianceRowIndex + 1) : data.rows;
  })();

  // STEP 1: Filter columns first (include all headers to ensure we can find Gross Budget and hide flight columns)
  const initialHeaders = data.headers;
  
  // Extract the totals row first to check for columns with data there
  const totalsRow = (() => {
    // Find the last row that looks like a totals row
    // Check from bottom up for a row with "total" in channel or multiple numeric values
    for (let i = rowsUpToVariance.length - 1; i >= 0; i--) {
      const row = rowsUpToVariance[i];
      const channelKey = data.headers[0]?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
      const channelValue = String((channelKey && row[channelKey]) || "").toLowerCase();
      
      // Check if this looks like a totals row
      if (channelValue.includes('total') || channelValue.includes('grand')) {
        return { row, index: i };
      }
      
      // Also check if row has many numeric values (likely a totals row)
      const numericCount = Object.values(row).filter(v => 
        typeof v === 'number' || (!isNaN(Number(v)) && String(v).trim() !== "")
      ).length;
      
      if (numericCount >= 3 && i > rowsUpToVariance.length - 5) {
        return { row, index: i };
      }
    }
    return null;
  })();

  // Check which columns are completely blank across all rows, BUT include columns that have data in totals row
  const nonBlankColumns: number[] = [];
  console.log('\n🔍 === PLACEMENTS COLUMN DEBUG: Checking Blank Columns ===');
  initialHeaders.forEach((header, colIndex) => {
    // Skip column 1 (always remove it)
    if (colIndex === 1) return;

    // Skip null/undefined/empty headers
    if (!header) return;

    const normalizedKey = header
      .toLowerCase()
      .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[^a-z]+/, "");

    // IMPORTANT: Also get the mapped field name from UNIFIED_TEMPLATE_CONFIG
    // This handles cases where "Campaign Details - Placements" is stored as "placements"
    const mappedKey = header === 'Campaign Details - Placements' ? 'placements' : normalizedKey;

    // Special debug for placements column
    const isPlacementsColumn = header.toLowerCase().includes('placement');
    if (isPlacementsColumn) {
      console.log(`📍 PLACEMENTS COLUMN FOUND at index ${colIndex}: "${header}"`);
      console.log(`   Normalized key: "${normalizedKey}"`);
      console.log(`   Mapped key: "${mappedKey}"`);
    }

    // Check if this column has any data in any row OR in the totals row
    // Try BOTH the normalized key AND the mapped key
    const hasDataInRegularRows = rowsUpToVariance.some(row => {
      const valueNormalized = row[normalizedKey];
      const valueMapped = row[mappedKey];
      const value = valueNormalized !== undefined ? valueNormalized : valueMapped;
      return value !== undefined &&
             value !== null &&
             value !== "" &&
             String(value).trim() !== "";
    });

    const hasDataInTotalsRow = totalsRow ? (() => {
      const valueNormalized = totalsRow.row[normalizedKey];
      const valueMapped = totalsRow.row[mappedKey];
      const value = valueNormalized !== undefined ? valueNormalized : valueMapped;
      return value !== undefined &&
             value !== null &&
             value !== "" &&
             String(value).trim() !== "";
    })() : false;

    // Always include important columns even if they're empty
    const headerLower = header.toLowerCase();
    const isImportantColumn = headerLower.includes('dv cost') ||
                             headerLower.includes('media fee total') ||
                             headerLower.includes('buffer') ||
                             headerLower.includes('working media budget') ||
                             headerLower.includes('working media') ||
                             headerLower.includes('ad serving') ||
                             headerLower.includes('media cost') ||
                             headerLower.includes('budget') ||
                             headerLower.includes('spend') ||
                             headerLower.includes('cost') ||
                             headerLower.includes('cpm') ||
                             headerLower.includes('grp') ||
                             headerLower.includes('impression') ||
                             headerLower.includes('placement'); // Add placements as important

    if (isPlacementsColumn) {
      console.log(`   Has data in regular rows? ${hasDataInRegularRows}`);
      console.log(`   Has data in totals row? ${hasDataInTotalsRow}`);
      console.log(`   Is important column? ${isImportantColumn}`);
      console.log(`   Sample values from first 3 rows (normalized):`, rowsUpToVariance.slice(0, 3).map(r => r[normalizedKey]));
      console.log(`   Sample values from first 3 rows (mapped):`, rowsUpToVariance.slice(0, 3).map(r => r[mappedKey]));
    }

    if (hasDataInRegularRows || hasDataInTotalsRow || isImportantColumn) {
      nonBlankColumns.push(colIndex);
      if (isPlacementsColumn) {
        console.log(`   ✅ KEEPING placements column (passed blank check)`);
      }
    } else {
      if (isPlacementsColumn) {
        console.log(`   ❌ FILTERING OUT placements column (blank check failed)`);
      }
    }
  });
  
  // Create filtered headers (only non-blank columns, excluding column 1)
  // Also exclude columns that aren't needed for traffic sheet verification
  const columnsToHideFromDisplay = [
    'Media type',
    'Media Type',
    'Accutics Campaign Name',
    'Tags Required',
    'Measurement',
    'KPI',
    'KPI Value',
    'Ad Serving',
    'DV Cost',
    'Buffer (+30%)',
  ];

  // Debug: Log all initial headers to see what we have
  console.log(`🔍 All initial headers:`, initialHeaders);
  console.log(`🔍 Total headers available:`, data.headers.length);

  // Debug: Check if Buffer column exists
  const bufferIndex = initialHeaders.findIndex(h => h && h.toLowerCase().includes('buffer'));
  console.log(`🔍 Buffer column index: ${bufferIndex} ("${initialHeaders[bufferIndex]}")`);

  // Find the index of "End Date" and "Gross Budget" to hide flight columns in between
  const endDateIndex = initialHeaders.findIndex(h =>
    h && h.toLowerCase().includes('end date')
  );
  const grossBudgetIndex = initialHeaders.findIndex(h =>
    h && h.toLowerCase().includes('gross')
  );

  console.log(`\n🔍 === PLACEMENTS COLUMN DEBUG: Checking Display Filters ===`);
  console.log(`  End Date index: ${endDateIndex} ("${initialHeaders[endDateIndex]}")`);
  console.log(`  Gross Budget index: ${grossBudgetIndex} ("${initialHeaders[grossBudgetIndex]}")`);
  console.log(`  Columns between: ${endDateIndex !== -1 && grossBudgetIndex !== -1 ? grossBudgetIndex - endDateIndex - 1 : 0}`);

  const displayColumns = nonBlankColumns.filter(colIndex => {
    const header = initialHeaders[colIndex];
    const isPlacementsColumn = header.toLowerCase().includes('placement');

    if (isPlacementsColumn) {
      console.log(`\n📍 CHECKING PLACEMENTS COLUMN (index ${colIndex}): "${header}"`);
    }

    // Hide explicitly named columns
    if (columnsToHideFromDisplay.includes(header)) {
      if (isPlacementsColumn) {
        console.log(`   ❌ HIDDEN by explicit hide list`);
      } else {
        console.log(`  🚫 Hiding column ${colIndex}: "${header}" (in hide list)`);
      }
      return false;
    }

    // Hide flight columns between End Date and Gross Budget
    if (endDateIndex !== -1 && grossBudgetIndex !== -1 &&
        colIndex > endDateIndex && colIndex < grossBudgetIndex) {
      if (isPlacementsColumn) {
        console.log(`   ❌ HIDDEN by flight column filter (between End Date and Gross Budget)`);
        console.log(`      colIndex (${colIndex}) > endDateIndex (${endDateIndex}) && colIndex < grossBudgetIndex (${grossBudgetIndex})`);
      } else {
        console.log(`  🚫 Hiding column ${colIndex}: "${header}" (flight column between End Date and Gross Budget)`);
      }
      return false;
    }

    if (isPlacementsColumn) {
      console.log(`   ✅ KEEPING placements column (passed all display filters)`);
    }

    return true;
  });

  const filteredHeaders = displayColumns.map(colIndex => initialHeaders[colIndex]);
  const columnIndices = displayColumns; // Track which columns we're showing
  
  const isColumn1Empty = true; // Column 1 is always removed
  const hiddenColumnCount = initialHeaders.length - filteredHeaders.length;

  // totalsRow is already defined above

  // STEP 2: Filter out completely blank rows (reduces clutter)
  const rowsWithoutTotals = totalsRow
    ? rowsUpToVariance.filter((_, idx) => idx !== totalsRow.index)
    : rowsUpToVariance;

  // Categorize rows by tab using unified categorization logic
  // MUST BE DEFINED BEFORE filteredRows
  const categorizeRow = (row: any) => {
    // Extract field values from row using normalized header keys
    const getNormalizedKey = (headerName: string) =>
      headerName?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";

    const channelKey = getNormalizedKey(data.headers[0]);
    const platformKey = getNormalizedKey(data.headers.find(h => h.toLowerCase().includes('platform')));
    const placementKey = getNormalizedKey(data.headers.find(h => h.toLowerCase().includes('placement')));
    const mediaTypeKey = getNormalizedKey(data.headers.find(h => h.toLowerCase().includes('media type')));
    const adFormatKey = getNormalizedKey(data.headers.find(h => h.toLowerCase().includes('ad format')));

    // Use unified categorization logic
    const result = categorizeLine({
      channel: String((channelKey && row[channelKey]) || ""),
      platform: String((platformKey && row[platformKey]) || ""),
      mediaType: String((mediaTypeKey && row[mediaTypeKey]) || ""),
      placements: String((placementKey && row[placementKey]) || ""),
      adFormat: String((adFormatKey && row[adFormatKey]) || ""),
      // Check the actual isExcluded flag from parsed data (for OOH, TV, Radio, Print)
      isExcluded: row.isExcluded || false,
      excludedReason: row.excludedReason
    });

    // Check if it's a header row (visual cue like 'DIGITAL VIDEO', 'PAID SOCIAL')
    const channel = String((channelKey && row[channelKey]) || "").toLowerCase();
    const isHeaderRow = /^(digital video|digital display|digital audio|paid social|social|video|display|audio)$/i.test(channel);
    if (isHeaderRow) {
      return { tab: 'section-header', type: channel, sectionName: channel.toUpperCase() };
    }

    return result;
  };

  // Filter to only show valid campaign lines (those with _mergeSpan from backend)
  // The backend already validated these using triple merge detection (budget + impressions + placements)
  const filteredRows = (() => {
    const result = rowsWithoutTotals
      .filter((row: any) => {
        // Only include rows that were identified as campaign lines by the backend
        return row._mergeSpan && row._mergeSpan > 0;
      })
      .map((row: any, originalIndex: number) => ({ ...row, _stableRowId: originalIndex }))
      .filter((row: any) => {
        // Filter out deleted rows using stable ID
        return !deletedRows.has(row._stableRowId);
      });

    console.log(`🔍 Frontend filtering: Starting with ${rowsWithoutTotals.length} rows`);
    console.log(`✅ Frontend filtering: Kept ${result.length} valid campaign lines (with _mergeSpan)`);
    console.log(`🗑️  Deleted rows count: ${deletedRows.size}`);

    return result;
  })();

  const hiddenRowCount = rowsUpToVariance.length - filteredRows.length - (totalsRow ? 1 : 0);

  // First, identify tactic groups based on _mergeSpan in FILTERED rows
  const tacticGroups: { [masterIndex: number]: number[] } = {};
  const rowToMasterMap: { [rowIndex: number]: number } = {};
  
  console.log('🔍 Building tactic groups from filtered rows:');
  filteredRows.forEach((row, filteredIndex) => {
    const mergeSpan = (row as any)._mergeSpan || 1;
    console.log(`  Filtered Row ${filteredIndex}: _mergeSpan = ${mergeSpan}`);
    
    // First, check if this row is already claimed by a previous master
    if (rowToMasterMap[filteredIndex] !== undefined) {
      console.log(`    → Already claimed by master row ${rowToMasterMap[filteredIndex]}, skipping`);
      return;
    }
    
    if (mergeSpan > 1) {
      // This is a master row - it claims the next (mergeSpan - 1) rows
      const groupMembers = [filteredIndex];
      rowToMasterMap[filteredIndex] = filteredIndex; // Master row maps to itself
      
      for (let i = 1; i < mergeSpan; i++) {
        if (filteredIndex + i < filteredRows.length) {
          groupMembers.push(filteredIndex + i);
          rowToMasterMap[filteredIndex + i] = filteredIndex; // Claimed rows map to master
          console.log(`    → Claims filtered row ${filteredIndex + i} (maps to master ${filteredIndex})`);
        }
      }
      tacticGroups[filteredIndex] = groupMembers;
      console.log(`    → Master row ${filteredIndex} claims group: [${groupMembers.join(', ')}]`);
    } else {
      // Standalone row - maps to itself
      rowToMasterMap[filteredIndex] = filteredIndex;
      console.log(`    → Standalone row ${filteredIndex}`);
    }
  });

  // Log tactic grouping for debugging
  console.log('🔗 Tactic Groups Identified:', Object.keys(tacticGroups).length > 0 ? tacticGroups : 'No merged tactics found');
  console.log('📍 Row to Master Mapping:', rowToMasterMap);
  
  // Debug: Show detailed mapping
  console.log('🔍 Detailed Row to Master Mapping:');
  Object.entries(rowToMasterMap).forEach(([rowIndex, masterIndex]) => {
    const rowNum = parseInt(rowIndex);
    console.log(`  Row ${rowIndex} → Master ${masterIndex} ${rowNum !== masterIndex ? '(MERGED)' : '(STANDALONE)'}`);
  });
  
  // Debug: Check if filteredRows still have _mergeSpan data
  console.log('🔍 Checking filteredRows for _mergeSpan data:');
  filteredRows.forEach((row, index) => {
    if ((row as any)._mergeSpan) {
      console.log(`  Filtered Row ${index}: _mergeSpan = ${(row as any)._mergeSpan}`);
    }
  });
  
  // Debug: Show the relationship between original indices and filtered indices
  console.log('🔍 Original vs Filtered Row Mapping:');
  filteredRows.forEach((row, filteredIndex) => {
    const originalIndex = data.rows.findIndex(originalRow => originalRow === row);
    if ((row as any)._mergeSpan) {
      console.log(`  Filtered[${filteredIndex}] = Original[${originalIndex}] with _mergeSpan = ${(row as any)._mergeSpan}`);
    }
  });

  const rowsWithCategories = filteredRows.map((row, index) => {
    const autoCategory = categorizeRow(row);
    const campaignLineIndex = (row as any)._campaignLineIndex;

    // Apply manual override using stable campaign line index (survives deletions)
    const finalCategory = campaignLineIndex !== undefined && manualOverrides[campaignLineIndex]
      ? { ...autoCategory, tab: manualOverrides[campaignLineIndex] }
      : autoCategory;

    return {
      ...row,
      _category: finalCategory,
      _index: index,
      _autoCategory: autoCategory,
      _masterIndex: rowToMasterMap[index], // Track which master row this belongs to
      _hasManualOverride: campaignLineIndex !== undefined && manualOverrides[campaignLineIndex] !== undefined
    };
  });

  const displayRowCount = filteredRows.length;

  // Debug: Summary of tactic grouping
  console.log('📊 FINAL TACTIC GROUPING SUMMARY:');
  console.log(`   Total filtered rows: ${filteredRows.length}`);
  console.log(`   Master rows identified: ${Object.keys(tacticGroups).length}`);
  Object.entries(tacticGroups).forEach(([masterIndex, groupMembers]) => {
    console.log(`   Master Row ${masterIndex} leads group: [${groupMembers.join(', ')}]`);
    groupMembers.forEach(memberIndex => {
      console.log(`     Row ${memberIndex} → Master ${rowToMasterMap[memberIndex]}`);
    });
  });

  const handleCategoryChange = (rowIndex: number, newTab: string) => {
    // Get the row to find its campaign line index
    const row = filteredRows[rowIndex];
    if (!row) {
      console.warn(`⚠️  Could not find row at index ${rowIndex}`);
      return;
    }

    const campaignLineIndex = (row as any)._campaignLineIndex;
    if (campaignLineIndex === undefined) {
      console.warn(`⚠️  Row at index ${rowIndex} missing _campaignLineIndex`);
      return;
    }

    // Find the master row for this tactic group
    const masterIndex = rowToMasterMap[rowIndex];
    const groupMembers = tacticGroups[masterIndex] || [rowIndex];

    // Use campaign line index as the key (stable across deletions)
    const newOverrides = { ...manualOverrides };
    newOverrides[campaignLineIndex] = newTab;

    console.log(`✏️  Tab assignment changed for Campaign Line #${campaignLineIndex} → ${newTab}`);
    console.log(`   Display row ${rowIndex} with ${groupMembers.length - 1} linked row(s)`);
    console.log(`   Override stored as: manualOverrides[${campaignLineIndex}] = "${newTab}"`);

    onManualOverrideChange(newOverrides);
  };

  const handleDeleteRow = (stableRowId: number) => {
    // Find the row index in filteredRows
    const rowIndex = filteredRows.findIndex((row: any) => row._stableRowId === stableRowId);
    if (rowIndex === -1) {
      console.warn(`⚠️  Could not find row with stable ID: ${stableRowId}`);
      return;
    }

    // Find the master row for this tactic group
    const masterIndex = rowToMasterMap[rowIndex];

    // Get all rows in this tactic group (including the master and all children)
    const groupMembers = tacticGroups[masterIndex] || [rowIndex];

    // Create new set with all group members deleted
    const newDeletedRows = new Set(deletedRows);
    groupMembers.forEach(memberIndex => {
      const memberRow = filteredRows[memberIndex];
      if (memberRow && (memberRow as any)._stableRowId !== undefined) {
        newDeletedRows.add((memberRow as any)._stableRowId);
      }
    });

    onDeletedRowsChange(newDeletedRows);
    console.log(`🗑️  Deleted row ${stableRowId} and ${groupMembers.length - 1} linked row(s), total deleted: ${newDeletedRows.size}`);
    console.log(`   Affected rows: [${groupMembers.join(', ')}]`);
  };

  return (
    <div className="w-full">
      {/* File Info Bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              ✅ {fileName}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              {displayRowCount} tactics • {filteredHeaders.length} columns
              {data.metadata?.campaignName && ` • ${data.metadata.campaignName}`}
              {deletedRows.size > 0 && (
                <span className="ml-2 text-red-600 dark:text-red-400 font-medium">
                  • {deletedRows.size} deleted
                </span>
              )}
              {Object.keys(manualOverrides).length > 0 && (
                <span className="ml-2 text-amber-600 dark:text-amber-400 font-medium">
                  • {Object.keys(manualOverrides).length} manual override{Object.keys(manualOverrides).length > 1 ? 's' : ''}
                </span>
              )}
              {(hiddenColumnCount > 0 || hiddenRowCount > 0) && (
                <span className="ml-2 text-slate-500 dark:text-slate-400 text-xs">
                  ({hiddenColumnCount > 0 && `${hiddenColumnCount} blank col${hiddenColumnCount > 1 ? 's' : ''}`}
                  {hiddenColumnCount > 0 && hiddenRowCount > 0 && ', '}
                  {hiddenRowCount > 0 && `${hiddenRowCount} blank row${hiddenRowCount > 1 ? 's' : ''}`} hidden)
                </span>
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review and adjust tab assignments • Blanks auto-hidden
            </p>
          </div>
        </div>
      </div>


      {/* Campaign Summary - Calculated from Valid Campaign Lines */}
      {(() => {
        // Use normalized field names from backend (see FIELD_MAPPINGS in config.ts)
        const grossBudgetKey = 'grossBudget';
        const netBudgetKey = 'netBudget';

        let totalGrossBudget = 0;
        let totalNetBudget = 0;

        // Only sum values from master rows (first row of each campaign line merge)
        // to avoid counting merged values multiple times
        console.log('\n📊 === CAMPAIGN SUMMARY CALCULATION ===');
        console.log(`Total rows to process: ${filteredRows.length}`);
        console.log(`Sample row keys:`, filteredRows[0] ? Object.keys(filteredRows[0]) : 'No rows');
        console.log('\n');

        const rowsProcessed: number[] = [];
        const campaignLinesSeen = new Set<number>();

        filteredRows.forEach((row: any, idx: number) => {
          // A row is a "master row" (first row of a campaign line merge group) if:
          // 1. It has NO _campaignLineMasterRow (standalone, span=1), OR
          // 2. Its _campaignLineMasterRow points to itself (first row of merged group)
          //
          // This ensures we only count each campaign line's budget/impressions ONCE,
          // even when budget is merged across multiple blocking chart rows (like Meta campaigns)
          const masterRowNumber = row._campaignLineMasterRow;
          const hasNoMasterRow = masterRowNumber === undefined;
          const isMasterRow = hasNoMasterRow || campaignLinesSeen.has(masterRowNumber) === false;

          if (!hasNoMasterRow && masterRowNumber !== undefined) {
            // This row is part of a merge group
            if (campaignLinesSeen.has(masterRowNumber)) {
              // We've already counted this campaign line
              console.log(`⏭️  Row ${idx}: Part of campaign line starting at row ${masterRowNumber} (already counted)`);
              return;
            } else {
              // First time seeing this campaign line
              campaignLinesSeen.add(masterRowNumber);
            }
          }

          // Only count master rows to avoid double-counting merged budget values
          if (isMasterRow) {
            const grossVal = row[grossBudgetKey];
            const netVal = row[netBudgetKey];

            const channel = (row.channel || '').trim();
            const platform = (row.platform || '').trim();
            const placements = (row.placements || '').trim();

            rowsProcessed.push(idx);

            console.log(`✓ Row ${idx}: Channel="${channel}", Platform="${platform}", Placements="${placements}"`);
            console.log(`    Master row: ${masterRowNumber || 'standalone'}, Merge span: ${row._mergeSpan || 1}`);
            console.log(`    Gross=${grossVal}, Net=${netVal}`);

            if (grossVal) {
              const value = typeof grossVal === 'number' ? grossVal : parseFloat(String(grossVal).replace(/[,$]/g, ''));
              if (!isNaN(value) && value > 0) {
                totalGrossBudget += value;
              }
            }
            if (netVal) {
              const value = typeof netVal === 'number' ? netVal : parseFloat(String(netVal).replace(/[,$]/g, ''));
              if (!isNaN(value) && value > 0) {
                totalNetBudget += value;
              }
            }
          }
        });

        console.log(`\n📊 Campaign lines counted: ${rowsProcessed.length}`);
        console.log(`📊 Total rows in blocking chart: ${filteredRows.length}`);
        console.log(`📊 Rows skipped (part of merged campaign lines): ${filteredRows.length - rowsProcessed.length}`);

        console.log(`📊 Final totals - Gross: $${totalGrossBudget.toLocaleString()}, Net: $${totalNetBudget.toLocaleString()}`);
        console.log(`📊 Will display? Gross: ${totalGrossBudget > 0}, Net: ${totalNetBudget > 0}`);

        return (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg px-6 py-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-100">
                    Campaign Summary ({filteredRows.length} Valid Campaign Lines)
                  </h4>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300">
                    Totals calculated from verified campaign lines only
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                {/* Debug: Always show if we have rows, even if totals are 0 */}
                {filteredRows.length > 0 && totalGrossBudget >= 0 && (
                  <div className="text-center">
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wide">
                      Gross Budget
                    </p>
                    <p className="text-lg font-bold text-indigo-900 dark:text-indigo-100">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }).format(totalGrossBudget)}
                    </p>
                  </div>
                )}
                {filteredRows.length > 0 && totalNetBudget >= 0 && (
                  <div className="text-center">
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wide">
                      Net Budget
                    </p>
                    <p className="text-lg font-bold text-indigo-900 dark:text-indigo-100">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }).format(totalNetBudget)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Debug Panel - Collapsible (Admin Only) */}
      {isAdmin && (
        <details className="bg-slate-100 dark:bg-slate-900 rounded-lg shadow-lg mb-4 overflow-hidden">
          <summary className="px-4 py-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
            🔍 Debug Info (Click to expand)
          </summary>
          <div className="px-4 py-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Index Mappings</h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 font-mono">
                  {rowsWithCategories.slice(0, 5).map((row, idx) => (
                    <li key={idx} className="bg-slate-50 dark:bg-slate-900 p-2 rounded">
                      <div><strong>Display Row:</strong> {idx}</div>
                      <div><strong>Campaign Line:</strong> {(row as any)._campaignLineIndex ?? 'N/A'}</div>
                      <div><strong>Stable ID:</strong> {(row as any)._stableRowId ?? 'N/A'}</div>
                    </li>
                  ))}
                  {rowsWithCategories.length > 5 && (
                    <li className="text-slate-500 dark:text-slate-500 italic">...and {rowsWithCategories.length - 5} more</li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Override Status</h4>
                {Object.keys(manualOverrides).length > 0 ? (
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400 font-mono">
                    {Object.entries(manualOverrides).map(([campaignLineIdx, tab]) => (
                      <li key={campaignLineIdx} className="bg-green-50 dark:bg-green-900/20 p-2 rounded border-l-2 border-green-500">
                        <div><strong>Campaign Line {campaignLineIdx}:</strong></div>
                        <div className="text-green-700 dark:text-green-400">→ Overridden to "{tab}"</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 dark:text-slate-500 italic">No manual overrides applied</p>
                )}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">How Indexing Works</h4>
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <p><strong>Display Row:</strong> Position in the table you see (changes when rows are deleted)</p>
                <p><strong>Campaign Line Index:</strong> Stable ID assigned during parsing (never changes, used for overrides)</p>
                <p><strong>Stable ID:</strong> Position in original parsed data (used for deletion tracking)</p>
              </div>
            </div>
          </div>
        </details>
      )}

      {/* Full Data Table - No Max Width */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg mb-4 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-2 py-1.5 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider bg-slate-50 dark:bg-slate-900 sticky left-0 z-20">
                  #
                </th>
                <th className="px-2 py-1.5 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap bg-slate-50 dark:bg-slate-900">
                  Tab Assignment
                </th>
                {filteredHeaders.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-2 py-1.5 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
              {rowsWithCategories.map((row, rowIdx) => {
                const category = row._category;
                const isHeader = category.tab === 'section-header';
                
                return (
                  <tr
                    key={rowIdx}
                    className={`${
                      isHeader
                        ? 'bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-indigo-900 dark:to-indigo-800 border-t-2 border-b-2 border-indigo-300 dark:border-indigo-600'
                        : category.tab === 'Excluded'
                        ? 'bg-gray-100 hover:bg-gray-150 dark:bg-gray-800/50 dark:hover:bg-gray-800/70 opacity-75' // Gray out excluded rows
                        : row._masterIndex !== row._index
                        ? 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-l-4 border-blue-300' // More prominent background for merged tactic rows
                        : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
                    }`}
                  >
                    <td
                      className={`px-2 py-2 text-xs font-medium sticky left-0 relative ${
                        isHeader
                          ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                          : row._masterIndex !== row._index
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10'
                          : 'text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/50'
                      }`}
                      onMouseEnter={() => !isHeader && setHoveredRow(rowIdx)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {isHeader ? '▼' : (
                        <span className="flex items-center gap-1 relative">
                          {hoveredRow === rowIdx ? (
                            <button
                              onClick={() => handleDeleteRow(row._stableRowId)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                              title="Delete this row"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          ) : (
                            <span>{rowIdx + 1}</span>
                          )}
                          {row._masterIndex !== row._index && (
                            <span className="text-xs text-blue-500" title="Part of merged tactic group">
                              📎
                            </span>
                          )}
                        </span>
                      )}
                    </td>
                    <td className={`px-2 py-2 text-xs sticky left-0 ${
                      isHeader
                        ? 'bg-indigo-100 dark:bg-indigo-900'
                        : 'bg-white dark:bg-slate-800'
                    }`}>
                      {isHeader ? (
                        <span className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-bold uppercase tracking-wide">
                          📂 {category.sectionName} Section
                        </span>
                      ) : (
                        <div className="flex items-center gap-1">
                          {row._hasManualOverride && (
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded font-medium" title="Manual override applied">
                              ✓
                            </span>
                          )}
                          <select
                            value={category.tab}
                            onChange={(e) => handleCategoryChange(row._index, e.target.value)}
                            className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${
                              category.tab === 'Brand Say Digital'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                                : category.tab === 'Brand Say Social'
                                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200'
                                : category.tab === 'Other Say Social'
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                                : category.tab === 'Excluded'
                                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <option value="Brand Say Digital">Brand Say Digital</option>
                            <option value="Brand Say Social">Brand Say Social</option>
                            <option value="Other Say Social">Other Say Social</option>
                            <option value="Excluded">Excluded (Non-Digital)</option>
                          </select>
                          {category.tab === 'Excluded' && category.reason && (
                            <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-1.5 py-0.5 rounded" title="Exclusion reason">
                              {category.reason}
                            </span>
                          )}
                          {manualOverrides[row._index] && (
                            <span className="text-xs text-amber-600 dark:text-amber-400" title="Manually changed">
                              ✏️
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    {filteredHeaders.map((header, colIdx) => {
                      // Get the actual header from the original column index
                      const actualHeader = header;

                      const normalizedKey = actualHeader
                        .toLowerCase()
                        .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
                        .replace(/^[^a-z]+/, "");

                      // IMPORTANT: Get the mapped key for special columns like "Campaign Details - Placements"
                      const mappedKey = actualHeader === 'Campaign Details - Placements' ? 'placements' : normalizedKey;

                      // Check if this is a shared financial column or date column
                      const headerLower = actualHeader.toLowerCase().replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/\//g, ' ').trim();
                      const isSharedFinancialColumn = headerLower.includes('cpm') ||
                                                     headerLower.includes('impression') ||
                                                     headerLower.includes('grp') ||
                                                     headerLower.includes('gross media cost') ||
                                                     headerLower.includes('gross budget') ||
                                                     headerLower.includes('net budget') ||
                                                     headerLower.includes('media cost') ||
                                                     headerLower.includes('ad serving') ||
                                                     headerLower.includes('dv cost') ||
                                                     headerLower.includes('buffer') ||
                                                     headerLower.includes('working media budget') ||
                                                     headerLower.includes('working media cost') ||
                                                     headerLower.includes('working media') ||
                                                     headerLower.includes('media fee total') ||
                                                     headerLower.includes('start date') ||
                                                     headerLower.includes('end date') ||
                                                     headerLower.includes('flight start') ||
                                                     headerLower.includes('flight end') ||
                                                     headerLower.includes('placement'); // Placements is also shared

                      // Debug: Log shared financial column detection (only once per column)
                      if (isSharedFinancialColumn && rowIdx === 0) {
                        console.log(`💰 Detected shared financial column: "${actualHeader}" -> normalized: "${headerLower}"`);
                      }

                      // If this is a shared financial column and the current row is part of a tactic group,
                      // use the value from the master row instead
                      // Try mapped key first, then fall back to normalized key
                      let value = row[mappedKey] !== undefined ? row[mappedKey] : row[normalizedKey];
                      
                      // Debug: Always log for shared financial columns to see what's happening (limit to first few rows)
                      if (isSharedFinancialColumn && rowIdx < 3) {
                        console.log(`💰 Shared Financial Column Debug (Row ${rowIdx}):`, {
                          rowIndex: row._index,
                          masterIndex: row._masterIndex,
                          isMerged: row._masterIndex !== row._index,
                          header: actualHeader,
                          normalizedKey: normalizedKey,
                          originalValue: row[normalizedKey],
                          isSharedColumn: isSharedFinancialColumn,
                          allRowKeys: Object.keys(row)
                        });
                      }
                      
                      let isValueFromMaster = false;
                      if (isSharedFinancialColumn && row._masterIndex !== row._index) {
                        const masterRow = filteredRows[row._masterIndex];
                        if (masterRow) {
                          // Try the mapped key first, then normalized key
                          value = masterRow[mappedKey] !== undefined ? masterRow[mappedKey] : masterRow[normalizedKey];

                          // If no value found, try alternative key variations
                          if (value === undefined || value === null || value === "") {
                            const alternativeKeys = [];

                            // For placements, try variations
                            if (headerLower.includes('placement')) {
                              alternativeKeys.push('placements', 'placement');
                            }

                            // For impressions/grps, try different variations
                            if (headerLower.includes('impression') || headerLower.includes('grp')) {
                              alternativeKeys.push('impressions', 'grps', 'impressionsGrps', 'grp', 'estImpressions');
                            }

                            // For gross media cost, try variations
                            if (headerLower.includes('gross media cost')) {
                              alternativeKeys.push('grossMediaCost', 'grossMedia', 'mediaCost');
                            }

                            // For ad serving, try variations
                            if (headerLower.includes('ad serving')) {
                              alternativeKeys.push('adServing', 'adServingCost');
                            }

                            // For dv cost, try variations
                            if (headerLower.includes('dv cost')) {
                              alternativeKeys.push('dvCost', 'dv');
                            }

                            // For media fee total, try variations
                            if (headerLower.includes('media fee total')) {
                              alternativeKeys.push('mediaFeeTotal', 'mediaFee');
                            }

                            // For working media budget/cost, try variations
                            if (headerLower.includes('working media budget') || headerLower.includes('working media cost')) {
                              alternativeKeys.push('workingMediaBudget', 'workingMediaCost', 'workingMedia');
                            }

                            // For gross budget, try variations
                            if (headerLower.includes('gross budget')) {
                              alternativeKeys.push('grossBudget', 'gross');
                            }

                            // For net budget, try variations
                            if (headerLower.includes('net budget')) {
                              alternativeKeys.push('netBudget', 'net');
                            }

                            // For buffer, try variations
                            if (headerLower.includes('buffer')) {
                              alternativeKeys.push('buffer', 'mediaBuffer');
                            }

                            // For date fields, try variations
                            if (headerLower.includes('start date') || headerLower.includes('flight start')) {
                              alternativeKeys.push('startDate', 'flightStart', 'flightStartDate', 'start');
                            }

                            if (headerLower.includes('end date') || headerLower.includes('flight end')) {
                              alternativeKeys.push('endDate', 'flightEnd', 'flightEndDate', 'end');
                            }

                            // Try each alternative key
                            for (const altKey of alternativeKeys) {
                              if (masterRow[altKey] !== undefined && masterRow[altKey] !== null && masterRow[altKey] !== "") {
                                value = masterRow[altKey];
                                console.log(`🔄 Using alternative key "${altKey}" for "${actualHeader}": ${value}`);
                                break;
                              }
                            }
                          }
                          
                          isValueFromMaster = true;
                          
                          console.log(`✅ USING MASTER VALUE:`, {
                            rowIndex: row._index,
                            masterIndex: row._masterIndex,
                            header: actualHeader,
                            normalizedKey: normalizedKey,
                            originalValue: row[normalizedKey],
                            masterValue: value,
                            masterRowExists: true,
                            masterRowKeys: Object.keys(masterRow)
                          });
                        } else {
                          console.log(`❌ MASTER ROW NOT FOUND:`, {
                            rowIndex: row._index,
                            masterIndex: row._masterIndex,
                            header: actualHeader,
                            filteredRowsLength: filteredRows.length
                          });
                        }
                      }
                      
                      // Check if this column should be formatted as currency, date, or number
                      const isCurrencyColumn = headerLower.includes('cpm') ||
                                              headerLower.includes('media cost') ||
                                              headerLower.includes('ad serving') ||
                                              headerLower.includes('dv cost') ||
                                              headerLower.includes('media fee total') ||
                                              headerLower.includes('working media budget') ||
                                              headerLower.includes('working media cost') ||
                                              headerLower.includes('gross budget') ||
                                              headerLower.includes('net budget') ||
                                              headerLower.includes('buffer') ||
                                              headerLower.includes('budget');
                      
                      const isDateColumn = headerLower.includes('start date') ||
                                          headerLower.includes('end date') ||
                                          headerLower.includes('date');
                      
                      const isNumberColumn = headerLower.includes('impression') ||
                                            headerLower.includes('grp');
                      
                      // Extract the actual value if it's an object (ExcelJS cell/formula object)
                      let extractedValue = value;
                      if (value && typeof value === 'object') {
                        console.log(`🔍 Object value detected for "${actualHeader}" (Row ${rowIdx}):`, {
                          value,
                          type: typeof value,
                          keys: Object.keys(value),
                          hasResult: 'result' in value,
                          hasValue: 'value' in value,
                          hasRichText: 'richText' in value,
                          hasText: 'text' in value
                        });
                        
                        // Check if it's an ExcelJS rich text object
                        if ((value as any).richText) {
                          extractedValue = (value as any).richText.map((rt: any) => rt.text).join('');
                          console.log(`  → Extracted from richText: ${extractedValue}`);
                        }
                        // Check if it's a formula cell with a result
                        else if ((value as any).result !== undefined) {
                          extractedValue = (value as any).result;
                          console.log(`  → Extracted from result: ${extractedValue}`);
                        }
                        // Check if it has a value property
                        else if ((value as any).value !== undefined) {
                          extractedValue = (value as any).value;
                          console.log(`  → Extracted from value: ${extractedValue}`);
                        }
                        // Check if it has a text property
                        else if ((value as any).text !== undefined) {
                          extractedValue = (value as any).text;
                          console.log(`  → Extracted from text: ${extractedValue}`);
                        }
                        else {
                          console.warn(`⚠️ Unexpected object format for "${actualHeader}":`, value);
                          extractedValue = String(value);
                        }
                      }
                      
                      // Format the value based on column type
                      let displayValue = extractedValue;
                      
                      if (isCurrencyColumn && extractedValue !== undefined && extractedValue !== null && extractedValue !== "") {
                        const numValue = typeof extractedValue === 'number' ? extractedValue : parseFloat(String(extractedValue).replace(/[,$]/g, ''));
                        if (!isNaN(numValue)) {
                          displayValue = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }).format(numValue);
                        }
                      } else if (isDateColumn && extractedValue !== undefined && extractedValue !== null && extractedValue !== "") {
                        // Parse date string (YYYY-MM-DD format from Excel in UTC)
                        const dateStr = String(extractedValue);
                        const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
                        if (dateMatch) {
                          const [, year, month, day] = dateMatch;
                          // Use UTC to avoid timezone shifts that cause off-by-one-day errors
                          const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
                          // Format as "Sept, 21, 2025" using UTC
                          displayValue = date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            timeZone: 'UTC'
                          });
                        }
                      } else if (isNumberColumn && extractedValue !== undefined && extractedValue !== null && extractedValue !== "") {
                        // Format impressions/GRPs as whole numbers with commas
                        const numValue = typeof extractedValue === 'number' ? extractedValue : parseFloat(String(extractedValue).replace(/[,$]/g, ''));
                        if (!isNaN(numValue)) {
                          displayValue = Math.round(numValue).toLocaleString('en-US');
                        }
                      }
                      
                      return (
                        <td
                          key={colIdx}
                          className={`px-2 py-2 whitespace-nowrap ${
                            isHeader
                              ? 'font-bold text-base text-indigo-900 dark:text-indigo-100 bg-indigo-50 dark:bg-indigo-800'
                              : isValueFromMaster
                              ? 'text-xs text-slate-900 dark:text-slate-100 bg-green-50 dark:bg-green-900/20 border-l-2 border-green-400'
                              : 'text-xs text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {isHeader && colIdx === 0 ? (
                            <span className="flex items-center gap-2">
                              <span className="text-lg">📺</span>
                              <span className="uppercase tracking-wider">{value}</span>
                            </span>
                          ) : (
                            displayValue !== undefined && displayValue !== null && displayValue !== "" ? (
                              <span className="flex items-center gap-1">
                                {String(displayValue)}
                                {isValueFromMaster && (
                                  <span className="text-xs text-green-600 dark:text-green-400" title="Shared from master row">
                                    🔗
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg
              className="w-5 h-5 text-red-500 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
              <p className="font-medium text-red-900 dark:text-red-100">
                Error
                  </p>
              <p className="text-red-700 dark:text-red-200 text-sm">
                {error}
                  </p>
                </div>
              </div>
            </div>
          )}

      {/* Actions - Fixed at Bottom */}
      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex gap-3 sticky bottom-0">
            <Button
              variant="outline"
          onClick={onBackToUpload}
          disabled={isProcessing}
          className="min-w-[200px]"
        >
          ← Upload Different File
            </Button>
            {isAdmin && (
              <Button
                variant="outline"
                onClick={() => {
                  // Create CSV content
                  const csvRows: string[] = [];

                  // Add headers
                  const headers = ['Row #', 'Campaign Line', ...initialHeaders, '_mergeSpan', '_campaignLineMasterRow'];
                  csvRows.push(headers.map(h => `"${h}"`).join(','));

                  // Add data rows
                  filteredRows.forEach((row: any, idx: number) => {
                    const rowNum = idx + 1;
                    const isMaster = !row._campaignLineMasterRow || row._campaignLineMasterRow === row._campaignLineMasterRow;
                    const campaignLineLabel = row._mergeSpan > 1
                      ? `Master (spans ${row._mergeSpan} rows)`
                      : row._campaignLineMasterRow
                        ? `Part of line starting at row ${row._campaignLineMasterRow}`
                        : 'Standalone';

                    const values = [
                      rowNum,
                      campaignLineLabel,
                      ...initialHeaders.map(header => {
                        const normalizedKey = header
                          .toLowerCase()
                          .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
                          .replace(/^[^a-z]+/, "");
                        // Use mapped key for special columns like "Campaign Details - Placements"
                        const mappedKey = header === 'Campaign Details - Placements' ? 'placements' : normalizedKey;
                        // Try mapped key first, fall back to normalized key
                        const value = row[mappedKey] !== undefined ? row[mappedKey] : row[normalizedKey];
                        // Escape quotes and wrap in quotes
                        if (value === null || value === undefined) return '';
                        return `"${String(value).replace(/"/g, '""')}"`;
                      }),
                      row._mergeSpan || '',
                      row._campaignLineMasterRow || ''
                    ];
                    csvRows.push(values.join(','));
                  });

                  // Create blob and download
                  const csv = csvRows.join('\n');
                  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `blocking-chart-parsed-${new Date().toISOString().slice(0,10)}.csv`;
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                disabled={isProcessing}
                className="min-w-[180px]"
              >
                📥 Download CSV
              </Button>
            )}
            <Button
              variant="primary"
          onClick={onGenerate}
          disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
              Generating...
                </span>
              ) : (
            `✓ Looks Good, Generate Traffic Sheet (${filteredRows.length} tactics) →`
              )}
            </Button>
          </div>
        </div>
  );
}

// Generate Step Component
function GenerateStep({
  success,
  isProcessing,
  error,
  onStartOver,
}: {
  success: boolean;
  isProcessing: boolean;
  error: string | null;
  onStartOver: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-12 text-center">
        {isProcessing && (
          <div>
            <svg
              className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Generating Your Traffic Sheet
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Please wait while we format your data...
            </p>
          </div>
        )}

        {success && (
          <div>
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Traffic Sheet Generated Successfully!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Your file has been downloaded. Check your Downloads folder.
            </p>
            <Button variant="primary" onClick={onStartOver}>
              Generate Another Traffic Sheet
            </Button>
            </div>
        )}

        {error && !isProcessing && (
          <div>
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
              Generation Failed
            </h3>
            <p className="text-red-700 dark:text-red-200 mb-8">
              {error}
            </p>
            <Button variant="primary" onClick={onStartOver}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
