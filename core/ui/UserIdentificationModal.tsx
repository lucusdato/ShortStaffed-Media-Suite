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

  const allUsers = getUsersSortedByName();
  const usersByClient = getUsersByClient();

  if (!isOpen) return null;

  const handleUserSelect = (user: UserDirectoryEntry) => {
    setSelectedUser(user);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      setError("Please select your name from the list");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Call API to identify user
      const payload: IdentifyUserRequest = {
        name: selectedUser.name,
        role: selectedUser.role,
        client: selectedUser.client,
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

      // Save to localStorage
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome to ShortStaffed Media Suite
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
            <button
              onClick={handleSubmit}
              disabled={!selectedUser || isSubmitting}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              {isSubmitting ? "Confirming..." : "Continue"}
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-3">
            Don't see your name? Contact the admin to add you to the user directory.
          </p>
        </div>
      </div>
    </div>
  );
}
