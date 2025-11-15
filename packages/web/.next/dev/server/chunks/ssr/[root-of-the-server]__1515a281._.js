module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/packages/web/core/analytics/localStorage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Local Storage Utilities
 *
 * Manages user identity persistence in browser localStorage.
 */ __turbopack_context__.s([
    "clearSessionId",
    ()=>clearSessionId,
    "clearUserIdentity",
    ()=>clearUserIdentity,
    "generateSessionId",
    ()=>generateSessionId,
    "getSessionId",
    ()=>getSessionId,
    "getUserIdentity",
    ()=>getUserIdentity,
    "isUserIdentified",
    ()=>isUserIdentified,
    "saveUserIdentity",
    ()=>saveUserIdentity
]);
const STORAGE_KEY = 'shortstaffed_user_identity';
function saveUserIdentity(identity) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
    } catch (error) {
        console.error('Failed to save user identity to localStorage:', error);
    }
}
function getUserIdentity() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        const identity = JSON.parse(stored);
        return identity;
    } catch (error) {
        console.error('Failed to read user identity from localStorage:', error);
        return null;
    }
}
function clearUserIdentity() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear user identity from localStorage:', error);
    }
}
function isUserIdentified() {
    return getUserIdentity() !== null;
}
// ============================================================================
// Session ID Management (for analytics tracking)
// ============================================================================
const SESSION_ID_KEY = 'shortstaffed_session_id';
function generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}
function getSessionId() {
    try {
        let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
        if (!sessionId) {
            sessionId = generateSessionId();
            sessionStorage.setItem(SESSION_ID_KEY, sessionId);
        }
        return sessionId;
    } catch (error) {
        console.error('Failed to get/create session ID:', error);
        return generateSessionId();
    }
}
function clearSessionId() {
    try {
        sessionStorage.removeItem(SESSION_ID_KEY);
    } catch (error) {
        console.error('Failed to clear session ID:', error);
    }
}
}),
"[project]/packages/web/core/analytics/userDirectory.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * User Directory
 *
 * Central directory of employees who use the QuickClick Media Suite.
 * This makes it easy for users to identify themselves with a simple dropdown.
 *
 * To add new users:
 * 1. Add a new entry to the USERS array
 * 2. Specify their name, role, and client
 * 3. Save the file - changes take effect immediately
 *
 * Role options (in order of seniority):
 * - "Associate Planner"
 * - "Media Planner"
 * - "Senior Media Planner"
 * - "Supervisor"
 * - "Manager"
 * - "Senior Manager"
 * - "Project Manager"
 * - "Director"
 * - "Senior Director"
 * - "VP"
 *
 * Client options (examples):
 * - "Unilever"
 * - "P&G"
 * - "Nike"
 * - "Coca-Cola"
 * - etc.
 */ __turbopack_context__.s([
    "USERS",
    ()=>USERS,
    "findUserByName",
    ()=>findUserByName,
    "getAllClients",
    ()=>getAllClients,
    "getAllRoles",
    ()=>getAllRoles,
    "getAllUserNames",
    ()=>getAllUserNames,
    "getUsersByClient",
    ()=>getUsersByClient,
    "getUsersByRole",
    ()=>getUsersByRole,
    "getUsersSortedByName",
    ()=>getUsersSortedByName,
    "isValidUser",
    ()=>isValidUser
]);
const USERS = [
    // ============================================================================
    // UNILEVER
    // ============================================================================
    {
        name: "Lucus Dato",
        role: "Manager",
        client: "Unilever",
        isAdmin: true,
        isMasterAdmin: true
    },
    // ============================================================================
    // ADD NEW USERS BELOW THIS LINE
    // ============================================================================
    // Example format:
    {
        name: "Robbie Starkman",
        role: "Project Manager",
        client: "Unilever",
        isAdmin: true
    },
    //{ name: "Dana Olivier", role: "Planner", client: "Unilever", isAdmin: false },
    //{ name: "Sarah Lee", role: "Senior Planner", client: "Unilever", isAdmin: false },
    //{ name: "John McClellan", role: "Senior Planner", client: "Unilever", isAdmin: false },
    //{ name: "Elizabeth Varghis", role: "Supervisor", client: "Unilever", isAdmin: false },
    //{ name: "Ksenia Kussner", role: "Supervisor", client: "Unilever", isAdmin: false },
    //{ name: "Danielle Cheung", role: "Planner", client: "Unilever", isAdmin: false },
    //{ name: "Gabriel Amentrano", role: "Associate Planner", client: "Unilever", isAdmin: false },
    //{ name: "Nicole Willick", role: "Associate Planner", client: "Unilever", isAdmin: false },
    //{ name: "Madeleine DePaoli", role: "Associate Planner", client: "Unilever", isAdmin: false },
    //{ name: "Richard Beriault", role: "Manager", client: "Unilever", isAdmin: false },
    {
        name: "Test User",
        role: "Media Planner",
        client: "Unilever"
    }
];
function getUsersSortedByName() {
    return [
        ...USERS
    ].sort((a, b)=>a.name.localeCompare(b.name));
}
function getUsersByClient() {
    const grouped = {};
    for (const user of USERS){
        if (!grouped[user.client]) {
            grouped[user.client] = [];
        }
        grouped[user.client].push(user);
    }
    // Sort users within each client
    for(const client in grouped){
        grouped[client].sort((a, b)=>a.name.localeCompare(b.name));
    }
    return grouped;
}
function getUsersByRole() {
    const grouped = {};
    for (const user of USERS){
        if (!grouped[user.role]) {
            grouped[user.role] = [];
        }
        grouped[user.role].push(user);
    }
    // Sort users within each role
    for(const role in grouped){
        grouped[role].sort((a, b)=>a.name.localeCompare(b.name));
    }
    return grouped;
}
function findUserByName(name) {
    return USERS.find((user)=>user.name === name);
}
function getAllClients() {
    const clients = new Set(USERS.map((user)=>user.client));
    return Array.from(clients).sort();
}
function getAllRoles() {
    const roles = new Set(USERS.map((user)=>user.role));
    return Array.from(roles).sort();
}
function isValidUser(name) {
    return USERS.some((user)=>user.name === name);
}
function getAllUserNames() {
    const names = USERS.map((user)=>user.name);
    return Array.from(new Set(names)).sort();
}
}),
"[project]/packages/web/core/ui/UserIdentificationModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserIdentificationModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/userDirectory.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/localStorage.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function UserIdentificationModal({ isOpen, onIdentified }) {
    const [selectedUser, setSelectedUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("list");
    const [showPasswordPrompt, setShowPasswordPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const allUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUsersSortedByName"])();
    const usersByClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUsersByClient"])();
    if (!isOpen) return null;
    const handleUserSelect = (user)=>{
        setSelectedUser(user);
        setError(null);
        // Non-admin users: immediately identify
        if (!user.isAdmin) {
            proceedWithIdentification(user);
        }
    };
    const handlePasswordSubmit = async ()=>{
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
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: selectedUser.name,
                    password: password
                })
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
        } finally{
            setIsSubmitting(false);
        }
    };
    const proceedWithIdentification = async (user)=>{
        setIsSubmitting(true);
        setError(null);
        try {
            // Call API to identify user
            const payload = {
                name: user.name,
                role: user.role,
                client: user.client
            };
            const response = await fetch("/api/analytics/identify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error("Failed to identify user");
            }
            const data = await response.json();
            // Save user identity to localStorage
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveUserIdentity"])({
                userId: data.user.id,
                userName: data.user.name,
                userRole: data.user.role,
                userClient: data.user.client,
                identifiedAt: new Date().toISOString()
            });
            // Notify parent
            onIdentified(data.user.id, data.user.name, data.user.role, data.user.client);
        } catch (err) {
            console.error("Failed to identify user:", err);
            setError("Something went wrong. Please try again.");
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleSubmit = async ()=>{
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-b border-slate-200 dark:border-slate-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-slate-900 dark:text-white mb-2",
                                children: "Welcome to QuickClick Media Suite"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-600 dark:text-slate-400",
                                children: "Please identify yourself to continue. Your browser will remember you for future visits."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-slate-200 dark:border-slate-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setViewMode("list"),
                                    className: `px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`,
                                    children: "All Users"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setViewMode("client"),
                                    className: `px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === "client" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`,
                                    children: "By Client"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-6",
                        children: viewMode === "list" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: allUsers.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleUserSelect(user),
                                    className: `w-full text-left p-4 rounded-lg border-2 transition-all ${selectedUser?.name === user.name && selectedUser?.client === user.client ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold text-slate-900 dark:text-white",
                                            children: user.name
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                            lineNumber: 197,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-slate-600 dark:text-slate-400 mt-1",
                                            children: [
                                                user.role,
                                                " • ",
                                                user.client
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                            lineNumber: 200,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, `${user.name}-${user.client}`, true, {
                                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                    lineNumber: 188,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                            lineNumber: 186,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: Object.entries(usersByClient).map(([client, users])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3",
                                            children: client
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                            lineNumber: 210,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleUserSelect(user),
                                                    className: `w-full text-left p-4 rounded-lg border-2 transition-all ${selectedUser?.name === user.name && selectedUser?.client === user.client ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold text-slate-900 dark:text-white",
                                                            children: user.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-slate-600 dark:text-slate-400 mt-1",
                                                            children: user.role
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, `${user.name}-${user.client}`, true, {
                                                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                            lineNumber: 213,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, client, true, {
                                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                    lineNumber: 209,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                            lineNumber: 207,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-6 mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-700 dark:text-red-200 text-sm",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-slate-600 dark:text-slate-400",
                                        children: selectedUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Selected: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: selectedUser.name
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 29
                                                }, this),
                                                " (",
                                                selectedUser.role,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "No user selected"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                            lineNumber: 255,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this),
                                    selectedUser?.isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSubmit,
                                        disabled: !selectedUser || isSubmitting,
                                        className: "px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors",
                                        children: isSubmitting ? "Confirming..." : "Continue"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 dark:text-slate-500 mt-3",
                                children: "Don't see your name? Contact the admin to add you to the user directory."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            showPasswordPrompt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold text-slate-900 dark:text-white mb-4",
                            children: "Admin Authentication Required"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-600 dark:text-slate-400 mb-4",
                            children: [
                                "Please enter your admin password to continue as ",
                                selectedUser?.name,
                                "."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: showPassword ? "text" : "password",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter" && !isSubmitting) {
                                            handlePasswordSubmit();
                                        }
                                    },
                                    placeholder: "Enter admin password",
                                    disabled: isSubmitting,
                                    className: "w-full px-4 py-2 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50",
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                    lineNumber: 285,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowPassword(!showPassword),
                                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
                                    tabIndex: -1,
                                    children: showPassword ? "👁️" : "👁️‍🗨️"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                            lineNumber: 284,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-600 dark:text-red-400",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                lineNumber: 312,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                            lineNumber: 311,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setShowPasswordPrompt(false);
                                        setPassword("");
                                        setError(null);
                                    },
                                    disabled: isSubmitting,
                                    className: "flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                    lineNumber: 317,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handlePasswordSubmit,
                                    disabled: isSubmitting,
                                    className: "flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: isSubmitting ? "Verifying..." : "Submit"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                                    lineNumber: 329,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                            lineNumber: 316,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                    lineNumber: 277,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
                lineNumber: 276,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/core/ui/UserIdentificationModal.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/web/core/ui/AnalyticsProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsProvider,
    "useUser",
    ()=>useUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/localStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/userDirectory.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$UserIdentificationModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/UserIdentificationModal.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const UserContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function useUser() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(UserContext);
}
function AnalyticsProvider({ children }) {
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userName, setUserName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [userRole, setUserRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [userClient, setUserClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
        // Check if user is already identified
        const identity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserIdentity"])();
        if (identity) {
            setUserName(identity.userName);
            setUserRole(identity.userRole);
            setUserClient(identity.userClient);
        } else {
            // Show modal after a brief delay for better UX
            setTimeout(()=>setShowModal(true), 500);
        }
    }, []);
    const handleUserIdentified = (userId, name, role, client)=>{
        setUserName(name);
        setUserRole(role);
        setUserClient(client);
        setShowModal(false);
    };
    const handleChangeUser = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearUserIdentity"])();
        setUserName("");
        setUserRole("");
        setUserClient("");
        setShowModal(true);
    };
    // Only render on client to avoid hydration issues
    if (!isClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    const userContextValue = userName ? {
        userName,
        userRole,
        userClient,
        isAdmin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findUserByName"])(userName)?.isAdmin || false,
        isMasterAdmin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findUserByName"])(userName)?.isMasterAdmin || false,
        onChangeUser: handleChangeUser
    } : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UserContext.Provider, {
        value: userContextValue,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$UserIdentificationModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showModal,
                onIdentified: handleUserIdentified
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/AnalyticsProvider.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/core/ui/AnalyticsProvider.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1515a281._.js.map