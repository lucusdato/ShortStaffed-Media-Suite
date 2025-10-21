"use client";

import React, { useState } from "react";
import Link from "next/link";
import FileUpload from "@/core/ui/FileUpload";
import Button from "@/core/ui/Button";
import { TaxonomyRow } from "@/core/taxonomy/types";
import { generateTradeDesk } from "@/core/taxonomy/taxonomyGenerator";
import { getAudienceTypeOptions } from "@/core/taxonomy/smartDefaults";

type Step = "upload" | "preview";

export default function TaxonomyGenerator() {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [trafficSheetFile, setTrafficSheetFile] = useState<File | null>(null);
  const [taxonomyRows, setTaxonomyRows] = useState<TaxonomyRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Upload and parse traffic sheet
  const handleFileSelect = async (file: File) => {
    setTrafficSheetFile(file);
    setError(null);
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("trafficSheet", file);

      const response = await fetch("/api/taxonomy/parse", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to parse traffic sheet");
      }

      const data = await response.json();
      setTaxonomyRows(data.tradeDeskRows);
      setCurrentStep("preview");

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse file");
      setTrafficSheetFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle field edit
  const handleFieldChange = (rowIndex: number, field: keyof TaxonomyRow, value: any) => {
    setTaxonomyRows(prev => {
      const updated = [...prev];
      const row = { ...updated[rowIndex], [field]: value };

      // Special handling for dependent fields
      if (field === 'audienceParty') {
        // Reset audience type when party changes
        const newOptions = getAudienceTypeOptions(value);
        row.audienceType = newOptions[0] || '';
      }

      if (field === 'landingPageType' && value !== 'Retailer') {
        // Clear retailer when landing page type is not Retailer
        row.retailer = '';
      }

      if (field === 'campaignName') {
        // Auto-fill CN Code would happen here (requires master data)
        // For now, user must enter manually
      }

      // Regenerate taxonomies
      row.taxonomies = generateTradeDesk(row);

      updated[rowIndex] = row;
      return updated;
    });
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
          sourceFileName: trafficSheetFile?.name
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to export taxonomies");
      }

      // Download file
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
    setCurrentStep("upload");
    setTrafficSheetFile(null);
    setTaxonomyRows([]);
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
                Import traffic sheets and generate UNCC-compliant TradeDesk taxonomies
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {currentStep === "upload" && (
          <UploadStep
            file={trafficSheetFile}
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
            error={error}
          />
        )}

        {currentStep === "preview" && taxonomyRows.length > 0 && (
          <PreviewStep
            rows={taxonomyRows}
            fileName={trafficSheetFile?.name || ""}
            onFieldChange={handleFieldChange}
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

// Upload Step Component
function UploadStep({
  file,
  onFileSelect,
  isProcessing,
  error
}: {
  file: File | null;
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  error: string | null;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          📖 How It Works
        </h2>
        <ol className="text-blue-800 dark:text-blue-200 space-y-1 text-sm list-decimal list-inside">
          <li>Upload your generated Traffic Sheet (from Traffic Sheet Automation tool)</li>
          <li>System detects TradeDesk tactics and applies smart defaults</li>
          <li>Review and edit taxonomy fields as needed</li>
          <li>Export to Excel with Campaign, Line Item, and Creative level taxonomies</li>
        </ol>
      </div>

      {/* File Upload */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-4">
        <FileUpload
          label="Upload Traffic Sheet"
          description="Upload your generated traffic sheet Excel file (.xlsx)"
          selectedFile={file}
          onFileSelect={onFileSelect}
        />

        {/* Processing State */}
        {isProcessing && (
          <div className="flex items-center justify-center gap-3 p-4">
            <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Parsing traffic sheet...
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-red-900 dark:text-red-100">Error</p>
                <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Preview/Edit Step Component
function PreviewStep({
  rows,
  fileName,
  onFieldChange,
  onExport,
  onStartOver,
  isProcessing,
  error
}: {
  rows: TaxonomyRow[];
  fileName: string;
  onFieldChange: (rowIndex: number, field: keyof TaxonomyRow, value: any) => void;
  onExport: () => void;
  onStartOver: () => void;
  isProcessing: boolean;
  error: string | null;
}) {
  const validCount = rows.filter(r => r.validationErrors.length === 0).length;

  return (
    <div className="w-full">
      {/* File Info */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              ✅ {fileName}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              {rows.length} TradeDesk tactics found • {validCount} ready to export
              {validCount < rows.length && ` • ${rows.length - validCount} need attention`}
            </p>
          </div>
        </div>
      </div>

      {/* Simplified Table View - Shows generated taxonomies with basic edits */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg mb-4 overflow-hidden">
        <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">#</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Original Tactic</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Brand</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Campaign</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">CN Code</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Audience Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Creative Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase min-w-[500px]">Generated Taxonomies</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {rows.map((row, idx) => (
                <tr key={idx} className={row.validationErrors.length > 0 ? 'bg-red-50 dark:bg-red-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'}>
                  <td className="px-3 py-2 text-xs">{idx + 1}</td>
                  <td className="px-3 py-2 text-xs">{row.originalTactic}</td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.brandName}
                      onChange={(e) => onFieldChange(idx, 'brandName', e.target.value)}
                      className="w-full px-2 py-1 text-xs border rounded dark:bg-slate-700"
                      placeholder="Brand"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.campaignName}
                      onChange={(e) => onFieldChange(idx, 'campaignName', e.target.value)}
                      className="w-full px-2 py-1 text-xs border rounded dark:bg-slate-700"
                      placeholder="Campaign"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.campaignCnCode}
                      onChange={(e) => onFieldChange(idx, 'campaignCnCode', e.target.value)}
                      className="w-full px-2 py-1 text-xs border rounded dark:bg-slate-700"
                      placeholder="CN Code"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.audienceName}
                      onChange={(e) => onFieldChange(idx, 'audienceName', e.target.value)}
                      className="w-full px-2 py-1 text-xs border rounded dark:bg-slate-700"
                      placeholder="Audience"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.creativeName}
                      onChange={(e) => onFieldChange(idx, 'creativeName', e.target.value)}
                      className="w-full px-2 py-1 text-xs border rounded dark:bg-slate-700"
                      placeholder="Creative"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="space-y-1 text-xs font-mono">
                      <div className="text-blue-600 dark:text-blue-400">
                        <strong>Campaign:</strong> {row.taxonomies.campaign || '(incomplete)'}
                      </div>
                      <div className="text-green-600 dark:text-green-400">
                        <strong>Line Item:</strong> {row.taxonomies.lineItem || '(incomplete)'}
                      </div>
                      <div className="text-purple-600 dark:text-purple-400">
                        <strong>Creative:</strong> {row.taxonomies.creative || '(incomplete)'}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    {row.validationErrors.length === 0 ? (
                      <span className="text-green-600" title="Ready to export">✓</span>
                    ) : (
                      <span className="text-red-600" title={row.validationErrors.join(', ')}>⚠</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex gap-3">
        <Button variant="outline" onClick={onStartOver} disabled={isProcessing}>
          ← Upload Different File
        </Button>
        <Button variant="primary" onClick={onExport} disabled={isProcessing || validCount === 0} className="flex-1">
          {isProcessing ? 'Exporting...' : `Export Taxonomies (${validCount} ready)`}
        </Button>
      </div>
    </div>
  );
}
