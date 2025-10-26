"use client";

import React, { useState } from "react";
import { getAllClients, getAllRoles, getAllUserNames } from "@/core/analytics/userDirectory";

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
  currentUserName: string;
}

export default function UserManagementModal({
  isOpen,
  onClose,
  onUserAdded,
  currentUserName,
}: UserManagementModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [client, setClient] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      setName("");
      setRole("");
      setClient("");
      setIsAdmin(false);
      setError(null);
      setSuccess(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Add New User
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
            Add a new user to the ShortStaffed Media Suite directory
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white disabled:opacity-50"
            >
              <option value="">Select a role...</option>
              {roleOptions.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
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
              placeholder="e.g., Unilever"
              disabled={isSubmitting}
              list="existing-clients"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
            />
            <datalist id="existing-clients">
              {existingClients.map((clientOption) => (
                <option key={clientOption} value={clientOption} />
              ))}
            </datalist>
          </div>

          {/* Admin Checkbox */}
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
    </div>
  );
}
