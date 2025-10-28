"use client";

import React, { useState } from "react";
import { getSession } from "@/core/analytics/localStorage";

interface ForcePasswordChangeModalProps {
  isOpen: boolean;
  onPasswordChanged: () => void;
}

export default function ForcePasswordChangeModal({ isOpen, onPasswordChanged }: ForcePasswordChangeModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const session = getSession();

  if (!isOpen || !session) return null;

  const handleSubmit = async () => {
    // Validate passwords
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Check password requirements
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.userId,
          newPassword,
          sessionToken: session.sessionToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      // Success!
      onPasswordChanged();
    } catch (err) {
      console.error("Failed to change password:", err);
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Password Change Required
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              You must change your temporary password
            </p>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
          Your password was reset by an administrator. Please create a new secure password to continue.
        </p>

        {/* Password Requirements */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
          <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">Password Requirements:</p>
          <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Minimum 8 characters</li>
            <li>• At least one uppercase letter</li>
            <li>• At least one lowercase letter</li>
            <li>• At least one number</li>
            <li>• At least one special character (!@#$%^&*, etc.)</li>
          </ul>
        </div>

        {/* New Password Field */}
        <div className="mb-4">
          <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-2 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
              placeholder="Enter new password"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              tabIndex={-1}
            >
              {showNewPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isSubmitting) {
                  handleSubmit();
                }
              }}
              disabled={isSubmitting}
              className="w-full px-4 py-2 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
              placeholder="Re-enter new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              tabIndex={-1}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !newPassword || !confirmPassword}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Changing Password..." : "Change Password & Continue"}
        </button>

        <p className="text-xs text-slate-500 dark:text-slate-500 text-center mt-4">
          You cannot access the application until you change your password
        </p>
      </div>
    </div>
  );
}
