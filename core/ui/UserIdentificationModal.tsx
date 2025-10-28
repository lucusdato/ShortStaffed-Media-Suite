"use client";

import React, { useState, useEffect } from "react";
import { getUsersSortedByName, getUsersByClient } from "@/core/analytics/userDirectory";
import type { UserDirectoryEntry } from "@/core/analytics/userDirectory";
import { saveUserIdentity, getSession, saveSession, isImpersonating } from "@/core/analytics/localStorage";
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
  const [showPasswordSetup, setShowPasswordSetup] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserDirectoryEntry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [lockoutSecondsRemaining, setLockoutSecondsRemaining] = useState<number | null>(null);
  const [resettingUserId, setResettingUserId] = useState<string | null>(null);
  const [resetPasswordResult, setResetPasswordResult] = useState<{ userName: string; tempPassword: string } | null>(null);

  const allUsers = getUsersSortedByName();
  const usersByClient = getUsersByClient();

  // Check for existing session on mount
  useEffect(() => {
    const session = getSession();
    if (session && !isImpersonating()) {
      const user = allUsers.find(u => u.name === session.userName);
      if (user) {
        setSelectedUser(user);
        setIsAdminAuthenticated(true);
      }
    }
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSecondsRemaining && lockoutSecondsRemaining > 0) {
      const timer = setTimeout(() => {
        setLockoutSecondsRemaining(lockoutSecondsRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (lockoutSecondsRemaining === 0) {
      setLockoutSecondsRemaining(null);
      setAttemptsRemaining(null);
      setError(null);
    }
  }, [lockoutSecondsRemaining]);

  if (!isOpen) return null;

  const handleUserSelect = (user: UserDirectoryEntry) => {
    setSelectedUser(user);
    setError(null);
  };

  const handlePasswordSetupSubmit = async () => {
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

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/setup-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: selectedUser?.name,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to set up password");
      }

      // Password created successfully - now verify and get session
      const verifyResponse = await fetch("/api/auth/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: selectedUser?.name,
          password: newPassword,
        }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error("Failed to authenticate with new password");
      }

      // Store session data
      const sessionData = {
        userId: verifyData.userId,
        userName: verifyData.userName,
        userRole: verifyData.userRole,
        userClient: verifyData.userClient,
        isMasterAdmin: verifyData.isMasterAdmin,
        sessionToken: verifyData.sessionToken,
        expiresAt: verifyData.expiresAt,
        impersonatingUserId: verifyData.impersonatingUserId,
        impersonatingUserName: verifyData.impersonatingUserName,
      };

      saveSession(sessionData);

      setIsAdminAuthenticated(true);
      setShowPasswordSetup(false);
      setNewPassword("");
      setConfirmPassword("");
      setError(null);

      // Continue with user identification
      await proceedWithIdentification();
    } catch (err) {
      console.error("❌ Failed to set up password:", err);
      setError(err instanceof Error ? err.message : "Failed to set up password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Get impersonating user info if Master Admin is impersonating
      const currentSession = getSession();
      const impersonatingUser = currentSession?.isMasterAdmin && currentSession.userName !== selectedUser?.name
        ? currentSession.userName
        : undefined;

      const response = await fetch("/api/auth/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: selectedUser?.name,
          password: password,
          impersonatingUser,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if password is not set yet
        if (data.error === "Password not set for this user") {
          // Close password prompt and show password setup
          setShowPasswordPrompt(false);
          setPassword("");
          setShowPasswordSetup(true);
          return;
        }

        // Handle rate limiting
        if (data.isLocked) {
          const lockedUntil = new Date(data.lockedUntil);
          const now = new Date();
          const secondsRemaining = Math.max(0, Math.floor((lockedUntil.getTime() - now.getTime()) / 1000));
          setLockoutSecondsRemaining(secondsRemaining);

          const minutes = Math.floor(secondsRemaining / 60);
          const seconds = secondsRemaining % 60;
          setError(`🔒 Account locked. Try again in ${minutes}:${seconds.toString().padStart(2, '0')}`);
        } else if (data.attemptsRemaining !== undefined) {
          setAttemptsRemaining(data.attemptsRemaining);
          setError(data.message || `❌ Incorrect password. ${data.attemptsRemaining} attempt${data.attemptsRemaining === 1 ? '' : 's'} remaining.`);
        } else {
          setError("Incorrect password");
        }
        return;
      }

      // Store session data (NOT password!)
      const sessionData = {
        userId: data.userId,
        userName: data.userName,
        userRole: data.userRole,
        userClient: data.userClient,
        isMasterAdmin: data.isMasterAdmin,
        sessionToken: data.sessionToken,
        expiresAt: data.expiresAt,
        impersonatingUserId: data.impersonatingUserId,
        impersonatingUserName: data.impersonatingUserName,
      };

      saveSession(sessionData);

      setIsAdminAuthenticated(true);
      setShowPasswordPrompt(false);
      setPassword("");
      setError(null);
      setAttemptsRemaining(null);
      setLockoutSecondsRemaining(null);

      // Continue with user identification
      await proceedWithIdentification();
    } catch (err) {
      console.error("Failed to verify password:", err);
      setError("Failed to verify password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const proceedWithIdentification = async () => {
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

      // Save user identity to localStorage for analytics tracking
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

    // Security check: Prevent regular admins from accessing other admin accounts
    const currentSession = getSession();
    if (currentSession && currentSession.userName !== selectedUser.name) {
      // If trying to access a DIFFERENT admin account
      if (selectedUser.isAdmin) {
        // Regular admins cannot access other admin accounts
        if (!currentSession.isMasterAdmin) {
          setError(`Access Denied: Only the Master Admin can switch between admin accounts.\n\nYou are currently authenticated as: ${currentSession.userName}\nTo access a different account, please sign out first.`);
          return;
        }
        // Master admin can access any account, so continue
      }
    }

    // Check if user is admin and not yet authenticated
    if (selectedUser.isAdmin && !isAdminAuthenticated) {
      // Check if there's a valid session for this user
      if (currentSession && currentSession.userName === selectedUser.name) {
        // Validate session with backend
        const validateResponse = await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionToken: currentSession.sessionToken }),
        });

        if (validateResponse.ok) {
          setIsAdminAuthenticated(true);
          await proceedWithIdentification();
          return;
        }
      }

      // Check if user has a password set up
      // If not, go directly to password setup instead of showing login prompt
      const checkResponse = await fetch("/api/auth/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: selectedUser.name,
          password: "", // Empty password signals a check-only request
        }),
      });

      const checkData = await checkResponse.json();

      // If user doesn't have a password, show setup screen
      if (checkData.error === "Password not set for this user") {
        setShowPasswordSetup(true);
        return;
      }

      // Otherwise show password prompt (user has a password)
      setShowPasswordPrompt(true);
      return;
    }

    // For non-admin users or already authenticated admin
    await proceedWithIdentification();
  };

  const handleResetPassword = async (user: UserDirectoryEntry) => {
    const currentSession = getSession();
    if (!currentSession?.isMasterAdmin) {
      setError("Only Master Admin can reset passwords");
      return;
    }

    if (!confirm(`Reset password for ${user.name}? They will need to change it on next login.`)) {
      return;
    }

    setResettingUserId(user.name);
    setError(null);

    try {
      if (!currentSession) {
        throw new Error("No active session");
      }

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserName: user.name,
          adminUserName: currentSession.userName,
          sessionToken: currentSession.sessionToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      // Show the temporary password
      setResetPasswordResult({
        userName: user.name,
        tempPassword: data.temporaryPassword,
      });
    } catch (err) {
      console.error("Failed to reset password:", err);
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setResettingUserId(null);
    }
  };

  const handleDeleteUser = async (user: UserDirectoryEntry) => {
    // Get current user info
    const currentUser = allUsers.find(u => u.name === selectedUser?.name);

    // Only master admin can delete admin users
    if (user.isAdmin && !currentUser?.isMasterAdmin) {
      setError("Only the Master Admin can delete admin users");
      return;
    }

    // Prevent deleting yourself
    if (user.name === selectedUser?.name) {
      setError("You cannot delete your own account");
      return;
    }

    if (!confirm(`Are you sure you want to remove ${user.name} from the directory?`)) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch("/api/analytics/directory", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          client: user.client,
          requestingUser: selectedUser?.name,
          isMasterAdmin: currentUser?.isMasterAdmin || false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete user");
      }

      // Reload the page to refresh the user list
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setIsDeleting(false);
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

          {/* Show if an admin is currently authenticated */}
          {(() => {
            const currentSession = getSession();
            if (currentSession) {
              return (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Admin Session Active:</strong> {currentSession.userName}
                    {currentSession.isMasterAdmin && " (Master Admin - can access all accounts)"}
                    {!currentSession.isMasterAdmin && " (Regular Admin - can only access own account)"}
                  </p>
                  {currentSession.impersonatingUserId && (
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      ⚠️ Impersonating: {currentSession.impersonatingUserName}
                    </p>
                  )}
                </div>
              );
            }
            return null;
          })()}
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
                <div
                  key={`${user.name}-${user.client}`}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                    selectedUser?.name === user.name && selectedUser?.client === user.client
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                  }`}
                >
                  <button
                    onClick={() => handleUserSelect(user)}
                    className="flex-1 text-left"
                  >
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {user.role} • {user.client}
                    </div>
                  </button>
                  <div className="flex gap-2">
                    {/* Reset Password Button - Master Admin only, for admin users */}
                    {getSession()?.isMasterAdmin &&
                     user.isAdmin &&
                     user.name !== selectedUser?.name && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetPassword(user);
                        }}
                        disabled={resettingUserId === user.name}
                        className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded transition-colors disabled:opacity-50"
                        title="Reset password"
                      >
                        {resettingUserId === user.name ? "Resetting..." : "Reset Password"}
                      </button>
                    )}
                    {/* Delete Button */}
                    {isAdminAuthenticated &&
                     user.name !== selectedUser?.name &&
                     (!user.isAdmin || allUsers.find(u => u.name === selectedUser?.name)?.isMasterAdmin) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user);
                        }}
                        disabled={isDeleting}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                        title="Remove user"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
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
                      <div
                        key={`${user.name}-${user.client}`}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                          selectedUser?.name === user.name && selectedUser?.client === user.client
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                        }`}
                      >
                        <button
                          onClick={() => handleUserSelect(user)}
                          className="flex-1 text-left"
                        >
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {user.role}
                          </div>
                        </button>
                        <div className="flex gap-2">
                          {/* Reset Password Button - Master Admin only, for admin users */}
                          {getSession()?.isMasterAdmin &&
                           user.isAdmin &&
                           user.name !== selectedUser?.name && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResetPassword(user);
                              }}
                              disabled={resettingUserId === user.name}
                              className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded transition-colors disabled:opacity-50"
                              title="Reset password"
                            >
                              {resettingUserId === user.name ? "Resetting..." : "Reset Password"}
                            </button>
                          )}
                          {/* Delete Button */}
                          {isAdminAuthenticated &&
                           user.name !== selectedUser?.name &&
                           (!user.isAdmin || allUsers.find(u => u.name === selectedUser?.name)?.isMasterAdmin) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteUser(user);
                              }}
                              disabled={isDeleting}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                              title="Remove user"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
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
            {attemptsRemaining !== null && attemptsRemaining < 5 && !lockoutSecondsRemaining && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  ⚠️ <strong>{attemptsRemaining}</strong> attempt{attemptsRemaining === 1 ? '' : 's'} remaining before 5-minute lockout
                </p>
              </div>
            )}
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

      {/* Password Setup Modal for New Admins */}
      {showPasswordSetup && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-10">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Set Up Your Admin Password
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Welcome, {selectedUser?.name}! As a new admin, please create a password to secure your account.
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter password (min. 8 characters)"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
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
              <div>
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
                        handlePasswordSetupSubmit();
                      }
                    }}
                    placeholder="Re-enter password"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
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
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordSetup(false);
                  setNewPassword("");
                  setConfirmPassword("");
                  setError(null);
                }}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePasswordSetupSubmit}
                disabled={isSubmitting || !newPassword || !confirmPassword}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Setting Up..." : "Create Password"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Result Modal */}
      {resetPasswordResult && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-10">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Password Reset Successful
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Temporary password for <strong>{resetPasswordResult.userName}</strong>:
            </p>
            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-4 flex items-center justify-between">
              <code className="text-lg font-mono text-slate-900 dark:text-white">
                {resetPasswordResult.tempPassword}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(resetPasswordResult.tempPassword)}
                className="ml-3 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Share this password with the user. They will be required to change it upon next login.
            </p>
            <button
              onClick={() => setResetPasswordResult(null)}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
