"use client";

import React, { useState } from "react";
import Link from "next/link";
import FileUpload from "@/core/ui/FileUpload";
import Button from "@/core/ui/Button";
import { TaxonomyRow, UserMetadata } from "@/core/taxonomy/types";
import { generateTaxonomies } from "@/core/taxonomy/taxonomyGenerator";

type Step = "metadata" | "upload" | "preview";

export default function TaxonomyGenerator() {
  const [currentStep, setCurrentStep] = useState<Step>("metadata");
  const [userMetadata, setUserMetadata] = useState<UserMetadata>({
    cnCode: "",
    marketName: "",
    countryCode: "GB",
    brandName: "",
    campaignName: ""
  });

  const [blockingChartFile, setBlockingChartFile] = useState<File | null>(null);
  const [trafficSheetFile, setTrafficSheetFile] = useState<File | null>(null);

  // Wrapper functions for file selection
  const handleBlockingChartSelect = (file: File) => {
    setBlockingChartFile(file);
  };

  const handleTrafficSheetSelect = (file: File) => {
    setTrafficSheetFile(file);
  };
  const [taxonomyRows, setTaxonomyRows] = useState<TaxonomyRow[]>([]);
  const [platformBreakdown, setPlatformBreakdown] = useState<{ [platform: string]: number }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Submit metadata
  const handleMetadataSubmit = () => {
    // Validate metadata
    if (!userMetadata.cnCode || !userMetadata.marketName ||
        !userMetadata.countryCode || !userMetadata.brandName || !userMetadata.campaignName) {
      setError("All metadata fields are required");
      return;
    }
    setError(null);
    setCurrentStep("upload");
  };

  // Step 2: Upload files and generate taxonomies
  const handleFilesSubmit = async () => {
    if (!blockingChartFile && !trafficSheetFile) {
      setError("Please upload at least one file (Blocking Chart or Traffic Sheet)");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();

      // Add user metadata
      formData.append("cnCode", userMetadata.cnCode);
      formData.append("marketName", userMetadata.marketName);
      formData.append("countryCode", userMetadata.countryCode);
      formData.append("brandName", userMetadata.brandName);
      formData.append("campaignName", userMetadata.campaignName);

      // Add files
      if (blockingChartFile) {
        formData.append("blockingChart", blockingChartFile);
      }
      if (trafficSheetFile) {
        formData.append("trafficSheet", trafficSheetFile);
      }

      const response = await fetch("/api/taxonomy/parse", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to parse files");
      }

      const data = await response.json();
      setTaxonomyRows(data.rows);
      setPlatformBreakdown(data.platformBreakdown);
      setCurrentStep("preview");

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse files");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle field edit
  const handleFieldChange = (rowIndex: number, field: string, value: any) => {
    setTaxonomyRows(prev => {
      const updated = [...prev];
      const row = { ...updated[rowIndex] };

      // Update input field
      row.inputFields = {
        ...row.inputFields,
        [field]: value
      };

      // Regenerate taxonomies
      row.taxonomies = generateTaxonomies(row.inputFields);

      updated[rowIndex] = row;
      return updated;
    });
  };

  // Batch copy taxonomies
  const handleBatchCopy = () => {
    const lines: string[] = [];

    // Header
    const headers = ['Row #', 'Platform', 'Original Tactic'];
    if (taxonomyRows[0]) {
      taxonomyRows[0].taxonomies.forEach(tax => headers.push(tax.platformFieldName));
    }
    lines.push(headers.join('\t'));

    // Data
    taxonomyRows.forEach((row, idx) => {
      const cells = [String(idx + 1), row.platform, row.originalTactic];
      row.taxonomies.forEach(tax => cells.push(tax.taxonomyString));
      lines.push(cells.join('\t'));
    });

    const tsv = lines.join('\n');
    navigator.clipboard.writeText(tsv);
    alert('Taxonomies copied to clipboard!');
  };

  // Export to Excel
  const handleExport = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/taxonomy/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rows: taxonomyRows,
          exportFormat: "embedded"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to export");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `accutics-taxonomies-${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to export");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep("metadata");
    setBlockingChartFile(null);
    setTrafficSheetFile(null);
    setTaxonomyRows([]);
    setPlatformBreakdown({});
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
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Accutics Taxonomy Generator
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Generate UNCC-compliant taxonomies for 7 platforms
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Step Indicator */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-4">
            <StepIndicator step={1} label="Metadata" active={currentStep === "metadata"} completed={currentStep !== "metadata"} />
            <div className="w-16 h-1 bg-slate-300 dark:bg-slate-600"></div>
            <StepIndicator step={2} label="Upload Files" active={currentStep === "upload"} completed={currentStep === "preview"} />
            <div className="w-16 h-1 bg-slate-300 dark:bg-slate-600"></div>
            <StepIndicator step={3} label="Review & Export" active={currentStep === "preview"} completed={false} />
          </div>
        </div>

        {currentStep === "metadata" && (
          <MetadataStep
            metadata={userMetadata}
            onMetadataChange={setUserMetadata}
            onSubmit={handleMetadataSubmit}
            error={error}
          />
        )}

        {currentStep === "upload" && (
          <UploadStep
            blockingChartFile={blockingChartFile}
            trafficSheetFile={trafficSheetFile}
            onBlockingChartSelect={handleBlockingChartSelect}
            onTrafficSheetSelect={handleTrafficSheetSelect}
            onSubmit={handleFilesSubmit}
            onBack={() => setCurrentStep("metadata")}
            isProcessing={isProcessing}
            error={error}
          />
        )}

        {currentStep === "preview" && taxonomyRows.length > 0 && (
          <PreviewStep
            rows={taxonomyRows}
            platformBreakdown={platformBreakdown}
            onFieldChange={handleFieldChange}
            onBatchCopy={handleBatchCopy}
            onExport={handleExport}
            onStartOver={handleStartOver}
            isProcessing={isProcessing}
            error={error}
          />
        )}
      </main>
    </div>
  );
}

// Step Indicator Component
function StepIndicator({ step, label, active, completed }: { step: number; label: string; active: boolean; completed: boolean; }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
        ${active ? 'bg-blue-600 text-white' : completed ? 'bg-green-600 text-white' : 'bg-slate-300 text-slate-600'}
      `}>
        {completed ? '✓' : step}
      </div>
      <span className={`text-xs ${active ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}`}>
        {label}
      </span>
    </div>
  );
}

// Metadata Step Component
function MetadataStep({
  metadata,
  onMetadataChange,
  onSubmit,
  error
}: {
  metadata: UserMetadata;
  onMetadataChange: (metadata: UserMetadata) => void;
  onSubmit: () => void;
  error: string | null;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Step 1: Campaign Metadata
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
          Enter campaign information that will be used across all taxonomies. These fields are required.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              CN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={metadata.cnCode}
              onChange={(e) => onMetadataChange({ ...metadata, cnCode: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
              placeholder="e.g., CN002366"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Market Name (PCat) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={metadata.marketName}
              onChange={(e) => onMetadataChange({ ...metadata, marketName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
              placeholder="e.g., SKNCLN"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Country Code <span className="text-red-500">*</span>
            </label>
            <select
              value={metadata.countryCode}
              onChange={(e) => onMetadataChange({ ...metadata, countryCode: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
            >
              <option value="GB">GB</option>
              <option value="US">US</option>
              <option value="CA">CA</option>
              <option value="AU">AU</option>
              <option value="DE">DE</option>
              <option value="FR">FR</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={metadata.brandName}
              onChange={(e) => onMetadataChange({ ...metadata, brandName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
              placeholder="e.g., Pond's"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Campaign Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={metadata.campaignName}
              onChange={(e) => onMetadataChange({ ...metadata, campaignName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
              placeholder="e.g., Panacea-(Ponds)"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button variant="primary" onClick={onSubmit}>
            Continue to File Upload →
          </Button>
        </div>
      </div>
    </div>
  );
}

// Upload Step Component
function UploadStep({
  blockingChartFile,
  trafficSheetFile,
  onBlockingChartSelect,
  onTrafficSheetSelect,
  onSubmit,
  onBack,
  isProcessing,
  error
}: {
  blockingChartFile: File | null;
  trafficSheetFile: File | null;
  onBlockingChartSelect: (file: File) => void;
  onTrafficSheetSelect: (file: File) => void;
  onSubmit: () => void;
  onBack: () => void;
  isProcessing: boolean;
  error: string | null;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Step 2: Upload Files
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
          Upload at least one file: blocking chart and/or traffic sheet. The system will detect platforms automatically.
        </p>

        <div className="space-y-4">
          <FileUpload
            label="Blocking Chart (Optional)"
            description="Upload blocking chart Excel file"
            selectedFile={blockingChartFile}
            onFileSelect={onBlockingChartSelect}
          />

          <FileUpload
            label="Traffic Sheet (Optional)"
            description="Upload traffic sheet from Traffic Sheet Generator"
            selectedFile={trafficSheetFile}
            onFileSelect={onTrafficSheetSelect}
          />
        </div>

        {isProcessing && (
          <div className="mt-4 flex items-center justify-center gap-3 p-4">
            <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Processing files...
            </span>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onBack} disabled={isProcessing}>
            ← Back
          </Button>
          <Button variant="primary" onClick={onSubmit} disabled={isProcessing || (!blockingChartFile && !trafficSheetFile)}>
            Generate Taxonomies →
          </Button>
        </div>
      </div>
    </div>
  );
}

// Preview Step Component
function PreviewStep({
  rows,
  platformBreakdown,
  onFieldChange,
  onBatchCopy,
  onExport,
  onStartOver,
  isProcessing,
  error
}: {
  rows: TaxonomyRow[];
  platformBreakdown: { [platform: string]: number };
  onFieldChange: (rowIndex: number, field: string, value: any) => void;
  onBatchCopy: () => void;
  onExport: () => void;
  onStartOver: () => void;
  isProcessing: boolean;
  error: string | null;
}) {
  const validCount = rows.filter(r => r.inputFields.validationErrors.length === 0).length;
  const platformColors: { [platform: string]: string } = {
    'TradeDesk': 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    'DV360': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    'Amazon DSP': 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    'Meta': 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    'Pinterest': 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    'TikTok': 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
    'Snapchat': 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Step 3: Review & Export
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(platformBreakdown).map(([platform, count]) => (
            <div key={platform} className={`px-3 py-1 rounded-full border ${platformColors[platform] || 'bg-gray-50'} text-xs font-medium`}>
              {platform}: {count}
            </div>
          ))}
          <div className="px-3 py-1 rounded-full border bg-slate-50 text-xs font-medium">
            Total: {rows.length} | ✓ Ready: {validCount}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onBatchCopy} disabled={isProcessing}>
            Copy All
          </Button>
          <Button variant="primary" onClick={onExport} disabled={isProcessing || validCount === 0}>
            {isProcessing ? 'Exporting...' : `Export to Excel (${validCount} ready)`}
          </Button>
          <Button variant="outline" onClick={onStartOver} disabled={isProcessing}>
            Start Over
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-900">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase">#</th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase">Platform</th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase">Original Tactic</th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase min-w-[600px]">Generated Taxonomies</th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {rows.map((row, idx) => (
                <tr key={idx} className={row.inputFields.validationErrors.length > 0 ? 'bg-red-50 dark:bg-red-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'}>
                  <td className="px-3 py-2 text-xs">{idx + 1}</td>
                  <td className="px-3 py-2 text-xs">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${platformColors[row.platform] || 'bg-gray-50'}`}>
                      {row.platform}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs">{row.originalTactic}</td>
                  <td className="px-3 py-2">
                    <div className="space-y-1 text-xs font-mono">
                      {row.taxonomies.map((tax, taxIdx) => (
                        <div key={taxIdx} className="truncate" title={tax.taxonomyString}>
                          <strong className="text-slate-600 dark:text-slate-400">{tax.platformFieldName}:</strong> {tax.taxonomyString || '(incomplete)'}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    {row.inputFields.validationErrors.length === 0 ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600" title={row.inputFields.validationErrors.join(', ')}>⚠</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
