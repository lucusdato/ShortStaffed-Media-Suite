# Remaining UI Updates Guide

This document provides the exact code changes needed to complete the authentication system integration.

---

## 1. Update UserIdentificationModal.tsx

### Current Issues:
- Stores passwords in localStorage
- Uses hardcoded password
- No rate limiting display
- No attempt counter

### Required Changes:

#### A. Remove localStorage password logic (around line 86-88, 118, 241):
```tsx
// ❌ REMOVE THESE LINES:
localStorage.setItem(`admin_password_${selectedUser?.name}`, data.hashedPassword);
const storedHashedPassword = localStorage.getItem(`admin_password_${selectedUser.name}`);
```

#### B. Update password verification (handlePasswordSubmit function):
```tsx
// ✅ REPLACE with:
const handlePasswordSubmit = async () => {
  if (!password) {
    setError("Please enter your password");
    return;
  }

  setIsSubmitting(true);
  setError(null);

  try {
    const response = await fetch("/api/auth/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: selectedUser?.name,
        password: password,
        impersonatingUser: impersonatingUser, // For Master Admin
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle rate limiting
      if (data.isLocked) {
        setError(`🔒 ${data.message}`);
      } else if (data.attemptsRemaining !== undefined) {
        setError(`❌ ${data.message}`);
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

    // Import and use: import { saveSession } from '@/core/analytics/localStorage';
    saveSession(sessionData);

    setShowPasswordPrompt(false);
    setPassword("");
    setError(null);

    // Continue with user identification
    await proceedWithIdentification();
  } catch (err) {
    console.error("Failed to verify password:", err);
    setError("Incorrect password");
  } finally {
    setIsSubmitting(false);
  }
};
```

#### C. Update password setup to NOT return hashed password:
```tsx
// In handlePasswordSetupSubmit, around line 86:
// ❌ REMOVE:
localStorage.setItem(`admin_password_${selectedUser?.name}`, data.hashedPassword);

// The new API doesn't return hashedPassword, so nothing to store!
```

#### D. Check for existing session on mount:
```tsx
// Add this useEffect at the top of the component:
useEffect(() => {
  // Check if user already has a valid session
  const session = getSession();
  if (session && !isImpersonating()) {
    // Auto-fill with existing session
    const user = allUsers.find(u => u.name === session.userName);
    if (user) {
      setSelectedUser(user);
      setIsAdminAuthenticated(true);
    }
  }
}, []);
```

#### E. Add live lockout countdown:
```tsx
// Add state for countdown:
const [lockoutSecondsRemaining, setLockoutSecondsRemaining] = useState<number | null>(null);

// Add useEffect for countdown:
useEffect(() => {
  if (lockoutSecondsRemaining && lockoutSecondsRemaining > 0) {
    const timer = setTimeout(() => {
      setLockoutSecondsRemaining(lockoutSecondsRemaining - 1);
    }, 1000);
    return () => clearTimeout(timer);
  } else if (lockoutSecondsRemaining === 0) {
    setLockoutSecondsRemaining(null);
    setError(null);
  }
}, [lockoutSecondsRemaining]);

// In the error handling, calculate seconds:
if (data.isLocked && data.lockedUntil) {
  const lockedUntil = new Date(data.lockedUntil);
  const now = new Date();
  const secondsRemaining = Math.max(0, Math.floor((lockedUntil.getTime() - now.getTime()) / 1000));
  setLockoutSecondsRemaining(secondsRemaining);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  setError(`🔒 Account locked. Try again in ${minutes}:${seconds.toString().padStart(2, '0')}`);
}
```

---

## 2. Update UserManagementModal.tsx

### Add Password Reset Button for Master Admin

#### A. Find where you render the user list
Look for the section where you display each user (probably in a map function).

#### B. Add state for reset operation:
```tsx
const [resettingUserId, setResettingUserId] = useState<string | null>(null);
const [resetPasswordResult, setResetPasswordResult] = useState<{ userName: string; tempPassword: string } | null>(null);
```

#### C. Add reset password handler:
```tsx
const handleResetPassword = async (user: UserDirectoryEntry) => {
  if (!selectedUser?.isMasterAdmin) {
    setError("Only Master Admin can reset passwords");
    return;
  }

  if (!confirm(`Reset password for ${user.name}? They will need to change it on next login.`)) {
    return;
  }

  setResettingUserId(user.name);
  setError(null);

  try {
    const session = getSession(); // Import from localStorage
    if (!session) {
      throw new Error("No active session");
    }

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetUserName: user.name,
        adminUserName: selectedUser.name,
        sessionToken: session.sessionToken,
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
```

#### D. Add the reset button in your user list:
```tsx
{/* Next to each user in the list */}
{selectedUser?.isMasterAdmin && user.name !== selectedUser.name && (
  <button
    onClick={() => handleResetPassword(user)}
    disabled={resettingUserId === user.name}
    className="ml-3 px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded transition-colors disabled:opacity-50"
    title="Reset password"
  >
    {resettingUserId === user.name ? "Resetting..." : "Reset Password"}
  </button>
)}
```

#### E. Add modal to show temporary password:
```tsx
{/* Add this at the end of your component, before closing div */}
{resetPasswordResult && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
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
```

---

## 3. Add Components to Page Headers

### For each page (e.g., traffic-sheet-automation/page.tsx):

#### A. Add imports at the top:
```tsx
import AccountDropdown from "@/core/ui/AccountDropdown";
import ImpersonationBanner from "@/core/ui/ImpersonationBanner";
import ForcePasswordChangeModal from "@/core/ui/ForcePasswordChangeModal";
import { getSession, clearSession, clearUserIdentity } from "@/core/analytics/localStorage";
import { useRouter } from "next/navigation";
```

#### B. Add state and handlers:
```tsx
const router = useRouter();
const [needsPasswordChange, setNeedsPasswordChange] = useState(false);

// Check if password change is required
useEffect(() => {
  const checkPasswordReset = async () => {
    const session = getSession();
    if (session) {
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken: session.sessionToken }),
      });

      if (response.ok) {
        const data = await response.json();
        // Check database for password_reset_required flag
        // You may need to add this to the session response
      }
    }
  };

  checkPasswordReset();
}, []);

const handleSwitchUser = () => {
  // Clear session and show user selection modal
  clearSession();
  clearUserIdentity();
  window.location.reload();
};

const handleSignOut = () => {
  // Session already cleared by AccountDropdown
  router.push("/");
};

const handleReturnToAccount = () => {
  // End impersonation
  clearSession();
  window.location.reload();
};
```

#### C. Add components to JSX (near the top of your page):
```tsx
return (
  <div>
    {/* Impersonation Banner - Shows at very top if impersonating */}
    <ImpersonationBanner onReturnToAccount={handleReturnToAccount} />

    {/* Force Password Change Modal - Blocks access if needed */}
    <ForcePasswordChangeModal
      isOpen={needsPasswordChange}
      onPasswordChanged={() => {
        setNeedsPasswordChange(false);
        window.location.reload();
      }}
    />

    {/* Your existing header/nav */}
    <header className="...">
      <div className="...">
        {/* Your existing header content */}
        <h1>Your App Name</h1>

        {/* Add Account Dropdown on the right side */}
        <AccountDropdown
          onSwitchUser={handleSwitchUser}
          onSignOut={handleSignOut}
        />
      </div>
    </header>

    {/* Rest of your page */}
  </div>
);
```

---

## 4. Testing Each Update

### After UserIdentificationModal updates:
1. Try logging in with wrong password 5 times
2. Verify you see "4 attempts remaining", "3 attempts remaining", etc.
3. Verify lockout shows countdown: "Try again in 4:59"
4. Wait 5 minutes or manually unlock in Supabase
5. Verify successful login stores session (check localStorage)

### After UserManagementModal updates:
1. Log in as Master Admin
2. Open user management
3. Click "Reset Password" on another user
4. Verify temporary password is generated
5. Copy password and log out
6. Log in as that user with temp password
7. Verify forced password change modal appears

### After adding components to pages:
1. Verify Account Dropdown appears in header
2. Click it and verify dropdown opens
3. Click "Switch User" - should reload to login
4. Click "Sign Out" - should clear session
5. Verify impersonation banner appears when impersonating
6. Click "Return to My Account" - should end impersonation

---

## 5. Common Issues & Solutions

### Issue: "Session not found"
**Solution:** Check that you're calling `saveSession()` after successful login

### Issue: Attempt counter not showing
**Solution:** Verify the API response includes `attemptsRemaining` field

### Issue: Password reset button not visible
**Solution:** Check that `selectedUser?.isMasterAdmin` is true

### Issue: Impersonation banner not showing
**Solution:** Verify `impersonatingUserId` is set in session data

### Issue: Force password change not triggering
**Solution:** Need to add `password_reset_required` check to session validation

---

## 6. Quick Reference: Import Statements

```tsx
// For session management:
import {
  getSession,
  saveSession,
  clearSession,
  clearUserIdentity,
  isImpersonating,
  getImpersonationInfo,
  isMasterAdmin,
} from '@/core/analytics/localStorage';

// For UI components:
import AccountDropdown from '@/core/ui/AccountDropdown';
import ImpersonationBanner from '@/core/ui/ImpersonationBanner';
import ForcePasswordChangeModal from '@/core/ui/ForcePasswordChangeModal';

// For types:
import type {
  VerifyPasswordRequest,
  VerifyPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/core/analytics/types';
```

---

## 7. Database Setup (Don't Forget!)

Before testing, you MUST run the migration:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Open `database/migrations/006_add_auth_security.sql`
4. Copy and paste the entire contents
5. Click "Run"
6. Verify success message appears

Without this, the API endpoints will fail because the tables don't exist!

---

That's it! Follow these steps and you'll have a fully functional, secure authentication system. 🔐🚀
