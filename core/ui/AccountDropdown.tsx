"use client";

import React, { useState, useRef, useEffect } from "react";
import { getSession, clearSession, clearUserIdentity, isImpersonating } from "@/core/analytics/localStorage";
import type { UserInfo } from "@/core/analytics/types";

interface AccountDropdownProps {
  onSwitchUser: () => void;
  onSignOut: () => void;
  userInfo?: UserInfo;
}

export default function AccountDropdown({ onSwitchUser, onSignOut, userInfo }: AccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const session = getSession();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Use session data if available (for admins), otherwise use userInfo (for non-admins)
  const displayName = session?.userName || userInfo?.userName || "";
  const displayRole = session?.userRole || userInfo?.userRole || "";
  const displayClient = session?.userClient || userInfo?.userClient || "";
  const isMasterAdmin = session?.isMasterAdmin || userInfo?.isMasterAdmin || false;

  if (!displayName) {
    return null;
  }

  const handleSwitchUser = () => {
    setIsOpen(false);
    onSwitchUser();
  };

  const handleSignOut = async () => {
    setIsOpen(false);

    // Call logout API if we have a session token
    const sessionToken = session?.sessionToken;
    if (sessionToken) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionToken }),
        });
      } catch (error) {
        console.error("Failed to log out:", error);
      }
    }

    // Clear local storage
    clearSession();
    clearUserIdentity();

    // Notify parent
    onSignOut();
  };

  // Calculate session expiry info (only for users with sessions)
  let hoursRemaining = 0;
  if (session?.expiresAt) {
    const expiresAt = new Date(session.expiresAt);
    const now = new Date();
    hoursRemaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60)));
  }

  const isImpersonatingUser = isImpersonating();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Account Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isImpersonatingUser
            ? "bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 border-2 border-yellow-400 dark:border-yellow-600"
            : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
        }`}
        title="Account Menu"
      >
        {/* User Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
          isImpersonatingUser
            ? "bg-yellow-500 text-white"
            : "bg-blue-500 text-white"
        }`}>
          {displayName.charAt(0).toUpperCase()}
        </div>

        {/* User Name */}
        <div className="text-left hidden sm:block">
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            {displayName}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {displayRole}
          </div>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 text-slate-600 dark:text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 z-50">
          {/* User Info Section */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                isImpersonatingUser
                  ? "bg-yellow-500 text-white"
                  : "bg-blue-500 text-white"
              }`}>
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {displayName}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {displayRole}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500">
                  {displayClient}
                </div>
              </div>
            </div>

            {/* Master Admin Badge */}
            {isMasterAdmin && (
              <div className="mt-2 inline-flex items-center px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-900/30 text-xs font-medium text-purple-700 dark:text-purple-300">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
                Master Admin
              </div>
            )}

            {/* Session Expiry Info - Only show if user has a session */}
            {session?.expiresAt && (
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Session expires in {hoursRemaining}h
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Switch User */}
            <button
              onClick={handleSwitchUser}
              className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Switch User
            </button>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
