"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "@/core/ui/Button";

export default function AnalyticsDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setIsAuthenticated(true);
      setError(null);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);

    try {
      const response = await fetch("/api/analytics/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          start_date: startDate || undefined,
          end_date: endDate || undefined,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid password");
          setIsAuthenticated(false);
          return;
        }
        throw new Error("Export failed");
      }

      // Download CSV
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `shortstaffed-analytics-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Analytics Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Export usage data for analysis
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {!isAuthenticated ? (
          // Password Form
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <svg
                className="w-16 h-16 text-blue-600 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Admin Access Required
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
                Enter the admin password to access analytics
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
                </div>
              )}

              <Button variant="primary" type="submit" className="w-full">
                Unlock Dashboard
              </Button>
            </form>
          </div>
        ) : (
          // Export Interface
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                📊 Analytics Export
              </h2>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Export usage data as CSV for analysis in Excel, PowerBI, or other tools.
                The export includes user information, tool usage events, and file uploads.
              </p>
            </div>

            {/* Export Form */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Export Settings
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Start Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      Defaults to 30 days ago
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      End Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      Defaults to today
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    onClick={handleExport}
                    disabled={isExporting}
                    className="w-full"
                  >
                    {isExporting ? (
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
                        Exporting...
                      </span>
                    ) : (
                      "Download CSV Export"
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* CSV Format Info */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                CSV Format
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                The exported CSV includes the following columns:
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <code className="text-xs text-slate-700 dark:text-slate-300 block whitespace-pre-wrap">
                  Timestamp, Type, User Name, User Role, User Team, Tool, Action,
                  Filename, File Size (KB), Campaign Name, Brand Name, CN Code, Row Count
                </code>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
