"use client";

import React, { useState } from "react";
import Link from "next/link";
import FileUpload from "@/core/ui/FileUpload";
import Button from "@/core/ui/Button";

type Step = "upload" | "verify" | "generate";

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
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [blockingChart, setBlockingChart] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [manualOverrides, setManualOverrides] = useState<{ [key: number]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = async (file: File) => {
    setBlockingChart(file);
    setError(null);
    
    // Automatically parse and move to verification
    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append("blockingChart", file);

      const response = await fetch("/api/traffic-sheet/preview", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to parse blocking chart");
      }

      const data = await response.json();
      
      // Debug: Check if _mergeSpan data is present in the received data
      console.log('🔍 Frontend - Received data _mergeSpan check:');
      data.rows.forEach((row: any, index: number) => {
        if (row._mergeSpan) {
          console.log(`  Received Row ${index}: _mergeSpan = ${row._mergeSpan}`);
        }
      });
      
      setParsedData(data);
      setCurrentStep("verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse file");
      setBlockingChart(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerate = async () => {
    if (!blockingChart) {
      setError("No blocking chart selected");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(false);
    setCurrentStep("generate");

    try {
      const formData = new FormData();
      formData.append("blockingChart", blockingChart);
      formData.append("manualOverrides", JSON.stringify(manualOverrides));

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setCurrentStep("verify");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep("upload");
    setBlockingChart(null);
    setParsedData(null);
    setManualOverrides({});
    setError(null);
    setSuccess(false);
  };

  const handleBackToUpload = () => {
    setCurrentStep("upload");
    setBlockingChart(null);
    setParsedData(null);
    setManualOverrides({});
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Traffic Sheet Automation
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Generate client-ready traffic sheets from blocking charts
              </p>
            </div>
          </div>
        </div>
      </header>

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
                    : parsedData
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-slate-300 bg-white text-slate-600"
                }`}
              >
                {parsedData ? (
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
                parsedData ? "bg-green-500" : "bg-slate-300"
              }`}
            />

            {/* Step 2: Verify */}
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep === "verify"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : currentStep === "generate" || success
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-slate-300 bg-white text-slate-600"
                }`}
              >
                {success || currentStep === "generate" ? (
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
                  currentStep === "verify"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Verify Data
              </span>
            </div>

            {/* Connector */}
            <div
              className={`w-16 h-0.5 ${
                success || currentStep === "generate" ? "bg-green-500" : "bg-slate-300"
              }`}
            />

            {/* Step 3: Generate */}
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
                  "3"
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
          />
        )}

        {currentStep === "verify" && parsedData && (
          <VerifyStep
            data={parsedData}
            fileName={blockingChart?.name || ""}
            onGenerate={handleGenerate}
            onBackToUpload={handleBackToUpload}
            isProcessing={isProcessing}
            error={error}
            manualOverrides={manualOverrides}
            onManualOverrideChange={setManualOverrides}
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
}: {
  blockingChart: File | null;
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  error: string | null;
}) {
  return (
    <div className="max-w-4xl mx-auto">
        {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          📖 Step 1: Upload Your Blocking Chart
          </h2>
          <ol className="text-blue-800 dark:text-blue-200 space-y-1 text-sm list-decimal list-inside">
          <li>Select your completed blocking chart (.xlsx file)</li>
          <li>We&apos;ll automatically parse and verify the data</li>
          <li>You&apos;ll review the data before generating</li>
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
}: {
  data: ParsedData;
  fileName: string;
  onGenerate: () => void;
  onBackToUpload: () => void;
  isProcessing: boolean;
  error: string | null;
  manualOverrides: { [key: number]: string };
  onManualOverrideChange: (overrides: { [key: number]: string }) => void;
}) {
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

  // STEP 1: Filter columns first (show first 25 columns to include all financial data through Working Media Budget/Cost, and remove blank ones)
  const initialHeaders = data.headers.slice(0, 25);
  
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
  initialHeaders.forEach((header, colIndex) => {
    // Skip column 1 (always remove it)
    if (colIndex === 1) return;
    
    const normalizedKey = header
      .toLowerCase()
      .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[^a-z]+/, "");
    
    // Check if this column has any data in any row OR in the totals row
    const hasDataInRegularRows = rowsUpToVariance.some(row => {
      const value = row[normalizedKey];
      return value !== undefined && 
             value !== null && 
             value !== "" && 
             String(value).trim() !== "";
    });
    
    const hasDataInTotalsRow = totalsRow ? (() => {
      const value = totalsRow.row[normalizedKey];
      return value !== undefined && 
             value !== null && 
             value !== "" && 
             String(value).trim() !== "";
    })() : false;
    
    // Always include important columns even if they're empty
    const headerLower = header.toLowerCase();
    const isImportantColumn = headerLower.includes('dv cost') ||
                             headerLower.includes('media fee total') ||
                             headerLower.includes('media buffer') ||
                             headerLower.includes('working media budget') ||
                             headerLower.includes('working media') ||
                             headerLower.includes('ad serving') ||
                             headerLower.includes('media cost') ||
                             headerLower.includes('budget') ||
                             headerLower.includes('spend') ||
                             headerLower.includes('cost') ||
                             headerLower.includes('cpm') ||
                             headerLower.includes('grp') ||
                             headerLower.includes('impression');
    
    if (hasDataInRegularRows || hasDataInTotalsRow || isImportantColumn) {
      nonBlankColumns.push(colIndex);
    }
  });
  
  // Create filtered headers (only non-blank columns, excluding column 1)
  const filteredHeaders = nonBlankColumns.map(colIndex => initialHeaders[colIndex]);
  const columnIndices = nonBlankColumns; // Track which columns we're showing
  
  const isColumn1Empty = true; // Column 1 is always removed
  const hiddenColumnCount = initialHeaders.length - filteredHeaders.length;

  // totalsRow is already defined above

  // STEP 2: Filter out completely blank rows (reduces clutter)
  const rowsWithoutTotals = totalsRow 
    ? rowsUpToVariance.filter((_, idx) => idx !== totalsRow.index)
    : rowsUpToVariance;

  const filteredRows = rowsWithoutTotals.filter(row => {
    // First check if this is a summary/totals row (MPA Budget, Variance, etc.)
    const channelKey = data.headers[0]?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
    const channelValue = String((channelKey && row[channelKey]) || "").toLowerCase();
    
    // Exclude rows that are summary/totals rows
    if (channelValue.includes('mpa budget') || 
        channelValue.includes('variance') ||
        channelValue.includes('grand total') ||
        (channelValue.includes('total') && !channelValue.includes('working'))) {
      return false;
    }
    
    // Check if the row has a tactic value (required for all valid rows)
    const tacticHeader = data.headers.find(h => h.toLowerCase().includes('tactic'));
    if (tacticHeader) {
      const tacticKey = tacticHeader
        .toLowerCase()
        .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[^a-z]+/, "");
      const tacticValue = row[tacticKey];
      
      // Exclude rows without a tactic value
      if (!tacticValue || String(tacticValue).trim() === "") {
        return false;
      }
    }
    
    // A row is considered blank if all values (in displayed columns) are empty
    const hasData = filteredHeaders.some((header, idx) => {
      const colIndex = columnIndices[idx];
      const actualHeader = initialHeaders[colIndex];
      const normalizedKey = actualHeader
        .toLowerCase()
        .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[^a-z]+/, "");
      
      const value = row[normalizedKey];
      return value !== undefined && 
             value !== null && 
             value !== "" && 
             String(value).trim() !== "";
    });
    return hasData;
  });
  
  const hiddenRowCount = rowsUpToVariance.length - filteredRows.length - (totalsRow ? 1 : 0);

  // Categorize rows by tab
  const categorizeRow = (row: any) => {
    const channelKey = data.headers[0]?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
    const placementKey = data.headers.find(h => h.toLowerCase().includes('placement'))?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
    const tacticKey = data.headers.find(h => h.toLowerCase().includes('tactic'))?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
    
    const channel = String((channelKey && row[channelKey]) || "").toLowerCase();
    const placement = String((placementKey && row[placementKey]) || "").toLowerCase();
    const tactic = String((tacticKey && row[tacticKey]) || "").toLowerCase();

    // Check if it's a header row (visual cue like 'DIGITAL VIDEO', 'PAID SOCIAL')
    // These headers indicate what channel type the tactics below belong to
    const isHeaderRow = /^(digital video|digital display|digital audio|paid social|social|video|display|audio)$/i.test(channel);
    if (isHeaderRow) return { tab: 'section-header', type: channel, sectionName: channel.toUpperCase() };

    // Brand Say Digital: Digital Video, Digital Display, etc. (NOT social)
    if (channel.includes('digital video') || channel.includes('digital display') || 
        channel.includes('digital audio') || channel.includes('programmatic')) {
      return { tab: 'Brand Say Digital', type: 'media' };
    }

    // Check if it's a social platform (Meta, TikTok, Pinterest, etc.)
    // This must be checked BEFORE the default to catch platform-specific channels
    const socialPlatforms = [
      'meta', 'facebook', 'instagram', 'fb', 'ig',
      'tiktok', 'tik tok',
      'pinterest', 'pin',
      'reddit',
      'snapchat', 'snap',
      'twitter', 'x.com',
      'linkedin'
    ];
    const isSocialPlatform = socialPlatforms.some(platform => 
      channel.includes(platform) || placement.includes(platform) || tactic.includes(platform)
    );
    
    // Brand Say Social: Paid Social OR any social platform (Meta, TikTok, Pinterest, etc.)
    if (channel.includes('paid social') || channel.includes('social') || isSocialPlatform) {
      // Only categorize as Other Say Social if explicitly marked as Influencer
      const isInfluencer = placement.includes('influencer') || tactic.includes('influencer');
      
      if (isInfluencer) {
        return { tab: 'Other Say Social', type: 'media' };
      }
      
      // Default all social platforms to Brand Say Social
      return { tab: 'Brand Say Social', type: 'media' };
    }

    // Default to Brand Say Digital for other digital channels
    return { tab: 'Brand Say Digital', type: 'media' };
  };

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
    console.log(`  Row ${rowIndex} → Master ${masterIndex} ${rowIndex !== masterIndex ? '(MERGED)' : '(STANDALONE)'}`);
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
    // Apply manual override if exists
    const finalCategory = manualOverrides[index] 
      ? { ...autoCategory, tab: manualOverrides[index] }
      : autoCategory;
    
    return {
      ...row,
      _category: finalCategory,
      _index: index,
      _autoCategory: autoCategory,
      _masterIndex: rowToMasterMap[index] // Track which master row this belongs to
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
    onManualOverrideChange({
      ...manualOverrides,
      [rowIndex]: newTab
    });
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

      {/* Template Detection Indicator */}
      {data.metadata?.templateName && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-6 py-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">📋</span>
            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                Template: {data.metadata.templateName}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                {data.metadata.detectedTemplate === 'unilever-extended' 
                  ? 'Extended format with additional depth detected' 
                  : 'Standard format detected'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Totals Summary Bar */}
      {totalsRow && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-lg px-6 py-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <div>
                <h4 className="text-sm font-bold text-green-900 dark:text-green-100">
                  Campaign Totals (Gut Check)
                </h4>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Verify these totals match your blocking chart
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              {filteredHeaders.map((header, idx) => {
                const colIndex = columnIndices[idx];
                const actualHeader = initialHeaders[colIndex];
                const normalizedKey = actualHeader
                  .toLowerCase()
                  .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
                  .replace(/^[^a-z]+/, "");
                const value = totalsRow.row[normalizedKey];
                
                // Check if this is a column that should always be shown
                const headerLower = actualHeader.toLowerCase();
                
                // Skip CPM/CPP columns in the totals summary
                if (headerLower.includes('cpm') || headerLower.includes('cpp')) {
                  return null;
                }
                
                const alwaysShow = headerLower.includes('dv cost') ||
                                  headerLower.includes('media fee total') ||
                                  headerLower.includes('media buffer') ||
                                  headerLower.includes('working media budget') ||
                                  headerLower.includes('working media');
                
                // Only show columns that look like totals (have numeric values or "total" in header)
                const isNumeric = typeof value === 'number' || (!isNaN(Number(value)) && String(value).trim() !== "");
                const isTotalColumn = headerLower.includes('budget') || 
                                     headerLower.includes('total') ||
                                     headerLower.includes('impression') ||
                                     headerLower.includes('spend') ||
                                     headerLower.includes('cost') ||
                                     headerLower.includes('grp') ||
                                     headerLower.includes('dv cost') ||
                                     headerLower.includes('media fee total') ||
                                     headerLower.includes('working media budget');
                
                // Show if: is an always-show column, OR has value AND is a total column, OR is a total column (even if empty)
                if (alwaysShow || isTotalColumn || ((isNumeric || isTotalColumn) && value !== undefined && value !== null && value !== "")) {
                  // Determine format type
                  const isCurrency = headerLower.includes('cpm') ||
                                   headerLower.includes('cost') ||
                                   headerLower.includes('budget') ||
                                   headerLower.includes('spend') ||
                                   headerLower.includes('media cost') ||
                                   headerLower.includes('ad serving') ||
                                   headerLower.includes('dv cost') ||
                                   headerLower.includes('media fee total') ||
                                   headerLower.includes('media buffer') ||
                                   headerLower.includes('working media budget') ||
                                   headerLower.includes('working media');
                  
                  const isNumberWithCommas = headerLower.includes('impression') ||
                                           headerLower.includes('grp');
                  
                  // Format the value
                  let formattedValue = String(value || "—");
                  const numValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[,$]/g, ''));
                  
                  if (!isNaN(numValue) && value !== null && value !== undefined && value !== "") {
                    if (isCurrency) {
                      // Currency format: $1,234.56
                      formattedValue = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }).format(numValue);
                    } else if (isNumberWithCommas) {
                      // Number with commas: 1,234,567
                      formattedValue = numValue.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      });
                    } else {
                      // Default number formatting
                      formattedValue = numValue.toLocaleString();
                    }
                  } else if (alwaysShow || isTotalColumn) {
                    // For always-show or total columns without values, display as $0.00 or dash
                    formattedValue = isCurrency ? "$0.00" : "—";
                  }
                  
                  return (
                    <div key={idx} className="text-center">
                      <p className="text-xs text-green-600 dark:text-green-400 font-medium uppercase tracking-wide">
                        {actualHeader}
                      </p>
                      <p className={`text-lg font-bold ${
                        formattedValue === "—" || formattedValue === "$0.00"
                          ? 'text-green-700 dark:text-green-300 opacity-60'
                          : 'text-green-900 dark:text-green-100'
                      }`}>
                        {formattedValue}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}

      {/* Full Data Table - No Max Width */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg mb-4 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider bg-slate-50 dark:bg-slate-900 sticky left-0 z-20">
                  #
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap bg-slate-50 dark:bg-slate-900">
                  Tab Assignment
                </th>
                {filteredHeaders.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap"
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
                        : row._masterIndex !== row._index
                        ? 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-l-4 border-blue-300' // More prominent background for merged tactic rows
                        : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
                    }`}
                  >
                    <td className={`px-3 py-3 text-xs font-medium sticky left-0 ${
                      isHeader 
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                        : row._masterIndex !== row._index
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10'
                        : 'text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/50'
                    }`}>
                      {isHeader ? '▼' : (
                        <span className="flex items-center gap-1">
                          {rowIdx + 1}
                          {row._masterIndex !== row._index && (
                            <span className="text-xs text-blue-500" title="Part of merged tactic group">
                              📎
                            </span>
                          )}
                        </span>
                      )}
                    </td>
                    <td className={`px-3 py-3 text-xs sticky left-0 ${
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
                          <select
                            value={category.tab}
                            onChange={(e) => handleCategoryChange(row._index, e.target.value)}
                            className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${
                              category.tab === 'Brand Say Digital' 
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                                : category.tab === 'Brand Say Social'
                                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200'
                                : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                            }`}
                          >
                            <option value="Brand Say Digital">Brand Say Digital</option>
                            <option value="Brand Say Social">Brand Say Social</option>
                            <option value="Other Say Social">Other Say Social</option>
                          </select>
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
                      
                      // Check if this is a shared financial column or date column
                      const headerLower = actualHeader.toLowerCase().replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/\//g, ' ').trim();
                      const isSharedFinancialColumn = headerLower.includes('cpm') ||
                                                     headerLower.includes('impression') ||
                                                     headerLower.includes('grp') ||
                                                     headerLower.includes('gross media cost') ||
                                                     headerLower.includes('media cost') ||
                                                     headerLower.includes('ad serving') ||
                                                     headerLower.includes('dv cost') ||
                                                     headerLower.includes('media buffer') ||
                                                     headerLower.includes('working media budget') ||
                                                     headerLower.includes('working media cost') ||
                                                     headerLower.includes('working media') ||
                                                     headerLower.includes('media fee total') ||
                                                     headerLower.includes('start date') ||
                                                     headerLower.includes('end date') ||
                                                     headerLower.includes('flight start') ||
                                                     headerLower.includes('flight end');
                      
                      // Debug: Log shared financial column detection (only once per column)
                      if (isSharedFinancialColumn && rowIdx === 0) {
                        console.log(`💰 Detected shared financial column: "${actualHeader}" -> normalized: "${headerLower}"`);
                      }
                      
                      // If this is a shared financial column and the current row is part of a tactic group,
                      // use the value from the master row instead
                      let value = row[normalizedKey];
                      
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
                          // Try the normalized key first
                          value = masterRow[normalizedKey];
                          
                          // If no value found, try alternative key variations
                          if (value === undefined || value === null || value === "") {
                            const alternativeKeys = [];
                            
                            // For impressions/grps, try different variations
                            if (headerLower.includes('impression') || headerLower.includes('grp')) {
                              alternativeKeys.push('impressions', 'grps', 'impressionsGrps', 'grp');
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
                                              headerLower.includes('working media cost');
                      
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
                          className={`px-3 py-3 whitespace-nowrap ${
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
