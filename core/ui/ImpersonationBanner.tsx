"use client";

import React, { useState, useEffect } from "react";
import { getSession, getImpersonationInfo } from "@/core/analytics/localStorage";
import type { SessionData } from "@/core/analytics/types";

interface ImpersonationBannerProps {
  onReturnToAccount: () => void;
}

export default function ImpersonationBanner({ onReturnToAccount }: ImpersonationBannerProps) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [impersonationInfo, setImpersonationInfo] = useState<{ userId: string; userName: string } | null>(null);

  useEffect(() => {
    // Only access localStorage on client side
    setSession(getSession());
    setImpersonationInfo(getImpersonationInfo());
  }, []);

  // Don't show banner if not impersonating
  if (!session || !impersonationInfo) {
    return null;
  }

  return (
    <div className="bg-yellow-400 dark:bg-yellow-600 border-b-2 border-yellow-500 dark:border-yellow-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Warning Icon & Message */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-900 dark:text-yellow-100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                ⚠️ Master Admin Impersonation Mode
              </p>
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                Currently acting as <strong>{impersonationInfo.userName}</strong> • Originally authenticated as <strong>{session.userName}</strong>
              </p>
            </div>
          </div>

          {/* Return Button */}
          <button
            onClick={onReturnToAccount}
            className="flex-shrink-0 px-4 py-2 bg-yellow-900 dark:bg-yellow-100 text-yellow-100 dark:text-yellow-900 rounded-lg font-medium text-sm hover:bg-yellow-800 dark:hover:bg-yellow-200 transition-colors shadow-md flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Return to My Account
          </button>
        </div>
      </div>
    </div>
  );
}
