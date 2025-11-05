"use client";

import React, { useState } from "react";
import { getUsersSortedByName, getUsersByClient } from "@/core/analytics/userDirectory";
import type { UserDirectoryEntry } from "@/core/analytics/userDirectory";
import { saveUserIdentity } from "@/core/analytics/localStorage";
import type { IdentifyUserRequest, IdentifyUserResponse } from "@/core/analytics/types";

interface UserIdentificationModalProps {
  isOpen: boolean;
  onIdentified: (userId: string, userName: string, userRole: string, userClient: string) => void;
}

export default function UserIdentificationModal({
  isOpen,
  onIdentified,
}: UserIdentificationModalProps) {
  const [selectedUser, setSelectedUser] = useState<UserDirectoryEntry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "client">("list");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const allUsers = getUsersSortedByName();
  const usersByClient = getUsersByClient();

  if (!isOpen) return null;

  const handleUserSelect = (user: UserDirectoryEntry) => {
    setSelectedUser(user);
    setError(null);

    // Non-admin users: immediately identify
    if (!user.isAdmin) {
      proceedWithIdentification(user);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }

    if (!selectedUser) {
      setError("Please select a user first");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: selectedUser.name,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Incorrect password");
        return;
      }

      // Password correct, proceed with identification
      setShowPasswordPrompt(false);
      setPassword("");
      setError(null);

      await proceedWithIdentification(selectedUser);
    } catch (err) {
      console.error("Failed to verify password:", err);
      setError("Failed to verify password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const proceedWithIdentification = async (user: UserDirectoryEntry) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Call API to identify user
      const payload: IdentifyUserRequest = {
        name: user.name,
        role: user.role,
        client: user.client,
      };

      const response = await fetch("/api/analytics/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to identify user");
      }

      const data: IdentifyUserResponse = await response.json();

      // Save user identity to localStorage
      saveUserIdentity({
        userId: data.user.id,
        userName: data.user.name,
        userRole: data.user.role,
        userClient: data.user.client,
        identifiedAt: new Date().toISOString(),
      });

      // Notify parent
      onIdentified(data.user.id, data.user.name, data.user.role, data.user.client);
    } catch (err) {
      console.error("Failed to identify user:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      setError("Please select your name from the list");
      return;
    }

    // Admin users: show password prompt
    if (selectedUser.isAdmin) {
      setShowPasswordPrompt(true);
      return;
    }

    // Non-admin users: already identified on selection
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome to QuickClick Media Suite
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Please identify yourself to continue. Your browser will remember you for future visits.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => setViewMode("client")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "client"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              By Client
            </button>
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === "list" ? (
            <div className="space-y-2">
              {allUsers.map((user) => (
                <button
                  key={`${user.name}-${user.client}`}
                  onClick={() => handleUserSelect(user)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedUser?.name === user.name && selectedUser?.client === user.client
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                  }`}
                >
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {user.name}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {user.role} • {user.client}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(usersByClient).map(([client, users]) => (
                <div key={client}>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                    {client}
                  </h3>
                  <div className="space-y-2">
                    {users.map((user) => (
                      <button
                        key={`${user.name}-${user.client}`}
                        onClick={() => handleUserSelect(user)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedUser?.name === user.name && selectedUser?.client === user.client
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                        }`}
                      >
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {user.role}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {selectedUser ? (
                <span>
                  Selected: <strong>{selectedUser.name}</strong> ({selectedUser.role})
                </span>
              ) : (
                <span>No user selected</span>
              )}
            </div>
            {selectedUser?.isAdmin && (
              <button
                onClick={handleSubmit}
                disabled={!selectedUser || isSubmitting}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                {isSubmitting ? "Confirming..." : "Continue"}
              </button>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-3">
            Don't see your name? Contact the admin to add you to the user directory.
          </p>
        </div>
      </div>

      {/* Admin Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-10">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Admin Authentication Required
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Please enter your admin password to continue as {selectedUser?.name}.
            </p>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isSubmitting) {
                    handlePasswordSubmit();
                  }
                }}
                placeholder="Enter admin password"
                disabled={isSubmitting}
                className="w-full px-4 py-2 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                tabIndex={-1}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            {/* Error Message - Inside Password Prompt Modal */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordPrompt(false);
                  setPassword("");
                  setError(null);
                }}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePasswordSubmit}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Verifying..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
