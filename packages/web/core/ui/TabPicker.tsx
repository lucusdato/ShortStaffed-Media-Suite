"use client";

import React, { useState } from "react";
import Button from "./Button";
import { TabInfo } from "@quickclick/shared/excel";

interface TabPickerProps {
  tabs: TabInfo[];
  onTabSelect: (tabIndex: number) => void;
  detectedTabIndex?: number;
  isProcessing?: boolean;
}

/**
 * TabPicker - UI component for selecting a worksheet tab from Excel file
 * Appears when automatic template detection fails
 */
export default function TabPicker({
  tabs,
  onTabSelect,
  detectedTabIndex,
  isProcessing = false,
}: TabPickerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    detectedTabIndex ?? (tabs.length > 0 ? tabs[0].index : 0)
  );

  const handleConfirm = () => {
    onTabSelect(selectedIndex);
  };

  if (tabs.length === 0) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-700 dark:text-red-200 text-sm">
          No worksheets found in the uploaded file.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <svg
          className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <div>
          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
            Select Worksheet Tab
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
            We couldn't automatically detect the blocking chart template. Please select the correct worksheet tab from your Excel file.
          </p>
        </div>
      </div>

      {/* Tab List */}
      <div className="space-y-2">
        {tabs.map((tab) => {
          const isSelected = selectedIndex === tab.index;
          const hasTemplate = tab.hasValidTemplate;

          return (
            <label
              key={tab.index}
              className={`
                flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800"
                }
              `}
            >
              {/* Radio Button */}
              <input
                type="radio"
                name="worksheet-tab"
                value={tab.index}
                checked={isSelected}
                onChange={() => setSelectedIndex(tab.index)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />

              {/* Tab Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900 dark:text-white">
                    {tab.name}
                  </span>
                  {hasTemplate && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded"
                      title="Valid template detected"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Template Detected
                    </span>
                  )}
                  {tab.isHidden && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded"
                      title="This worksheet is hidden in Excel"
                    >
                      Hidden
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-600 dark:text-slate-400">
                  <span>Tab {tab.index + 1}</span>
                  <span>•</span>
                  <span>{tab.rowCount.toLocaleString()} rows</span>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-2">
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={isProcessing}
          className="min-w-[180px]"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
            "Continue with Selected Tab →"
          )}
        </Button>
      </div>
    </div>
  );
}
