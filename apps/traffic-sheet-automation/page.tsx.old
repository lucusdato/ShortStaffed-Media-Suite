"use client";

import { useState } from "react";
import Link from "next/link";
import FileUpload from "@/core/ui/FileUpload";
import Button from "@/core/ui/Button";

interface UploadState {
  blockingChart: File | null;
  template: File | null;
}

export default function TrafficSheetAutomation() {
  const [files, setFiles] = useState<UploadState>({
    blockingChart: null,
    template: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const handleGenerate = async () => {
    if (!files.blockingChart || !files.template) {
      setError("Please upload both files before generating");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("blockingChart", files.blockingChart);
      formData.append("template", files.template);

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
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePreview = async () => {
    if (!files.blockingChart) {
      setError("Please upload a blocking chart to preview");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("blockingChart", files.blockingChart);

      const response = await fetch("/api/traffic-sheet/preview", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to preview data");
      }

      const data = await response.json();
      setPreviewData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const canGenerate = files.blockingChart && files.template && !isProcessing;

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
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📖 How to Use
          </h2>
          <ol className="text-blue-800 dark:text-blue-200 space-y-1 text-sm list-decimal list-inside">
            <li>Upload your completed blocking chart (.xlsx)</li>
            <li>Upload the Unilever traffic sheet template (.xlsx)</li>
            <li>Click Preview (optional) to verify the data mapping</li>
            <li>Click Generate to create your formatted traffic sheet</li>
          </ol>
        </div>

        {/* File Upload Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 space-y-6">
          <FileUpload
            label="Blocking Chart"
            description="Upload your completed blocking chart Excel file"
            selectedFile={files.blockingChart}
            onFileSelect={(file) =>
              setFiles({ ...files, blockingChart: file })
            }
          />

          <FileUpload
            label="Traffic Sheet Template"
            description="Upload the Unilever traffic sheet template"
            selectedFile={files.template}
            onFileSelect={(file) => setFiles({ ...files, template: file })}
          />

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

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
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
                  <p className="font-medium text-green-900 dark:text-green-100">
                    Success!
                  </p>
                  <p className="text-green-700 dark:text-green-200 text-sm">
                    Your traffic sheet has been generated and downloaded.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handlePreview}
              disabled={!files.blockingChart || isProcessing}
              className="flex-1"
            >
              {isProcessing ? "Processing..." : "Preview Data"}
            </Button>
            <Button
              variant="primary"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="flex-1"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
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
                  Processing...
                </span>
              ) : (
                "Generate Traffic Sheet"
              )}
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        {previewData && (
          <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Data Preview
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead>
                  <tr>
                    {previewData.headers.map((header: string, idx: number) => (
                      <th
                        key={idx}
                        className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider bg-slate-50 dark:bg-slate-900"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {previewData.rows.slice(0, 5).map((row: any, rowIdx: number) => (
                    <tr key={rowIdx}>
                      {previewData.headers.map((header: string, colIdx: number) => (
                        <td
                          key={colIdx}
                          className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100"
                        >
                          {row[header.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_: any, chr: string) => chr.toUpperCase()).replace(/^[^a-z]+/, "")] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {previewData.rows.length > 5 && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 text-center">
                  Showing 5 of {previewData.rows.length} rows
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

