"use client";

import React, { useState, useEffect } from "react";
import { getAllClients, getAllRoles, getAllUserNames, findUserByName, USERS } from "@/core/analytics/userDirectory";

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
  currentUserName: string;
}

type ViewMode = "list" | "add";

export default function UserManagementModal({
  isOpen,
  onClose,
  onUserAdded,
  currentUserName,
}: UserManagementModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [client, setClient] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [deletingUser, setDeletingUser] = useState<string | null>(null);

  const existingClients = getAllClients();
  const existingRoles = getAllRoles();
  const existingNames = getAllUserNames();

  const roleOptions = [
    "Associate Planner",
    "Media Planner",
    "Senior Media Planner",
    "Supervisor",
    "Manager",
    "Senior Manager",
    "Director",
    "Senior Director",
    "VP",
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim() || !role.trim() || !client.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/analytics/directory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          client: client.trim(),
          isAdmin,
          requestingUser: currentUserName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add user");
      }

      setSuccess(true);
      setName("");
      setRole("");
      setClient("");
      setIsAdmin(false);

      // Notify parent and close after a brief delay
      setTimeout(() => {
        onUserAdded();
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to add user:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setViewMode("list");
      setName("");
      setRole("");
      setClient("");
      setIsAdmin(false);
      setError(null);
      setSuccess(false);
      onClose();
    }
  };

  const handleDeleteUser = async (userName: string, userClient: string) => {
    if (!confirm(`Are you sure you want to delete ${userName}?`)) {
      return;
    }

    setDeletingUser(userName);
    setError(null);

    try {
      const currentUser = findUserByName(currentUserName);
      const response = await fetch("/api/analytics/directory", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          client: userClient,
          requestingUser: currentUserName,
          isMasterAdmin: currentUser?.isMasterAdmin || false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete user");
      }

      // Reload the page to refresh the user directory
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setDeletingUser(null);
    }
  };

  const currentUser = findUserByName(currentUserName);
  const isMasterAdmin = currentUser?.isMasterAdmin || false;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {viewMode === "list" ? "Manage Users" : "Add New User"}
            </h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {viewMode === "list"
              ? "View and manage all users in the directory"
              : "Add a new user to the QuickClick Media Suite directory"}
          </p>
        </div>

        {/* User List View */}
        {viewMode === "list" && (
          <div className="p-6">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {USERS.length} user{USERS.length !== 1 ? "s" : ""} in directory
              </p>
              <button
                onClick={() => setViewMode("add")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add User
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {USERS.map((user) => {
                const isCurrentUser = user.name === currentUserName;
                const canDelete = isMasterAdmin || (!user.isAdmin && !isCurrentUser);
                const isDeleting = deletingUser === user.name;

                return (
                  <div
                    key={`${user.name}-${user.client}`}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {user.name}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">(You)</span>
                          )}
                        </p>
                        {user.isMasterAdmin && (
                          <span className="px-2 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 rounded">
                            Master Admin
                          </span>
                        )}
                        {user.isAdmin && !user.isMasterAdmin && (
                          <span className="px-2 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {user.role} • {user.client}
                      </p>
                    </div>

                    {canDelete && (
                      <button
                        onClick={() => handleDeleteUser(user.name, user.client)}
                        disabled={isDeleting}
                        className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    )}
                    {!canDelete && !isCurrentUser && (
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        Protected
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add User Form */}
        {viewMode === "add" && (
          <div className="p-6">
            <button
              onClick={() => setViewMode("list")}
              className="mb-4 flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to user list
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., John Doe"
              disabled={isSubmitting}
              list="existing-names"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
            />
            <datalist id="existing-names">
              {existingNames.map((nameOption) => (
                <option key={nameOption} value={nameOption} />
              ))}
            </datalist>
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Type or select a role..."
              disabled={isSubmitting}
              list="existing-roles"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
            />
            <datalist id="existing-roles">
              {[...new Set([...roleOptions, ...existingRoles])].sort().map((roleOption) => (
                <option key={roleOption} value={roleOption} />
              ))}
            </datalist>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Select from list or type a custom role
            </p>
          </div>

          {/* Client */}
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Client
            </label>
            <input
              type="text"
              id="client"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Type or select a client..."
              disabled={isSubmitting}
              list="existing-clients"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
            />
            <datalist id="existing-clients">
              {existingClients.map((clientOption) => (
                <option key={clientOption} value={clientOption} />
              ))}
            </datalist>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Select from list or type a custom client
            </p>
          </div>

          {/* Admin Checkbox */}
          {findUserByName(currentUserName)?.isMasterAdmin && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                disabled={isSubmitting}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <label htmlFor="isAdmin" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                Grant admin privileges (can manage users and view analytics)
              </label>
            </div>
          )}
          {!findUserByName(currentUserName)?.isMasterAdmin && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Only the Master Admin can grant admin privileges to new users.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">User added successfully!</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
          </div>
        )}
      </div>
    </div>
  );
}
