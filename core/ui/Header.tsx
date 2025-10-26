"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "./AnalyticsProvider";
import UserBadge from "./UserBadge";
import UserManagementModal from "./UserManagementModal";

interface HeaderProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
}

export default function Header({ title, subtitle, showBackButton = false }: HeaderProps) {
  const userInfo = useUser();
  const [showUserManagement, setShowUserManagement] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
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
            )}
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {title}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Admin Controls and User Badge */}
          <div className="flex items-center gap-3">
            {userInfo?.isAdmin && (
              <>
                <button
                  onClick={() => setShowUserManagement(true)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2"
                  title="Manage Users"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add User
                </button>
                <Link
                  href="/apps/analytics-dashboard"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Analytics
                </Link>
              </>
            )}
            {userInfo && (
              <UserBadge
                userName={userInfo.userName}
                userRole={userInfo.userRole}
                userClient={userInfo.userClient}
                onChangeUser={userInfo.onChangeUser}
              />
            )}
          </div>
        </div>
      </div>

    </header>

      {/* User Management Modal */}
      {userInfo?.isAdmin && (
        <UserManagementModal
          isOpen={showUserManagement}
          onClose={() => setShowUserManagement(false)}
          onUserAdded={() => {
            // Reload the page to refresh the user directory
            window.location.reload();
          }}
          currentUserName={userInfo.userName}
        />
      )}
    </>
  );
}
