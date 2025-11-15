module.exports = [
"[project]/packages/web/core/ui/FileUpload.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FileUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function FileUpload({ label, accept = ".xlsx,.xls", onFileSelect, selectedFile, description }) {
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleFileChange = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };
    const handleClick = ()=>{
        inputRef.current?.click();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-slate-700 dark:text-slate-300",
                children: label
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-slate-500 dark:text-slate-400",
                children: description
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleClick,
                className: "border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "file",
                        accept: accept,
                        onChange: handleFileChange,
                        className: "hidden"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    selectedFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-8 h-8 text-green-500",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium text-slate-900 dark:text-white",
                                        children: selectedFile.name
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-500 dark:text-slate-400",
                                        children: [
                                            (selectedFile.size / 1024).toFixed(2),
                                            " KB"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "mx-auto h-12 w-12 text-slate-400",
                                stroke: "currentColor",
                                fill: "none",
                                viewBox: "0 0 48 48",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02",
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-600 dark:text-slate-400",
                                children: "Click to upload or drag and drop"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 dark:text-slate-500",
                                children: "Excel files (.xlsx, .xls)"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/web/core/ui/Button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Button({ variant = "primary", size = "md", children, className = "", ...props }) {
    const baseStyles = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
        secondary: "bg-slate-600 hover:bg-slate-700 text-white focus:ring-slate-500",
        outline: "border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-slate-500"
    };
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/web/core/ui/Button.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/packages/web/core/ui/UserBadge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function UserBadge({ userName, userRole, userClient, onChangeUser }) {
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsExpanded(!isExpanded),
                className: "flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors",
                "aria-label": "User information",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-5 h-5 text-slate-600 dark:text-slate-300",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-slate-700 dark:text-slate-200 hidden sm:inline",
                        children: userName.split(" ")[0]
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`,
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19 9l-7 7-7-7"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-40",
                        onClick: ()=>setIsExpanded(false)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b border-slate-200 dark:border-slate-700",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-blue-600 dark:text-blue-300 font-bold text-lg",
                                                children: userName.split(" ").map((n)=>n[0]).join("").toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                                lineNumber: 76,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-slate-900 dark:text-white truncate",
                                                    children: userName
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-600 dark:text-slate-400 truncate",
                                                    children: userRole
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-500 dark:text-slate-500 mt-1",
                                                    children: userClient
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setIsExpanded(false);
                                        onChangeUser();
                                    },
                                    className: "w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                                lineNumber: 113,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                            lineNumber: 107,
                                            columnNumber: 17
                                        }, this),
                                        "Switch User"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-500 dark:text-slate-500",
                                    children: "Your usage is being tracked for analytics purposes."
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/web/core/ui/UserManagementModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserManagementModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/userDirectory.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function UserManagementModal({ isOpen, onClose, onUserAdded, currentUserName }) {
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("list");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [client, setClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isAdmin, setIsAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deletingUser, setDeletingUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const existingClients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllClients"])();
    const existingRoles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllRoles"])();
    const existingNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllUserNames"])();
    const roleOptions = [
        "Associate Planner",
        "Media Planner",
        "Senior Media Planner",
        "Supervisor",
        "Manager",
        "Senior Manager",
        "Director",
        "Senior Director",
        "VP"
    ];
    if (!isOpen) return null;
    const handleSubmit = async (e)=>{
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
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.trim(),
                    role: role.trim(),
                    client: client.trim(),
                    isAdmin,
                    requestingUser: currentUserName
                })
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
            setTimeout(()=>{
                onUserAdded();
                onClose();
                setSuccess(false);
            }, 1500);
        } catch (err) {
            console.error("Failed to add user:", err);
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleClose = ()=>{
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
    const handleDeleteUser = async (userName, userClient)=>{
        if (!confirm(`Are you sure you want to delete ${userName}?`)) {
            return;
        }
        setDeletingUser(userName);
        setError(null);
        try {
            const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findUserByName"])(currentUserName);
            const response = await fetch("/api/analytics/directory", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: userName,
                    client: userClient,
                    requestingUser: currentUserName,
                    isMasterAdmin: currentUser?.isMasterAdmin || false
                })
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
        } finally{
            setDeletingUser(null);
        }
    };
    const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findUserByName"])(currentUserName);
    const isMasterAdmin = currentUser?.isMasterAdmin || false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-slate-200 dark:border-slate-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-slate-900 dark:text-white",
                                    children: viewMode === "list" ? "Manage Users" : "Add New User"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleClose,
                                    disabled: isSubmitting,
                                    className: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors disabled:opacity-50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-6 h-6",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-600 dark:text-slate-400 mt-2",
                            children: viewMode === "list" ? "View and manage all users in the directory" : "Add a new user to the QuickClick Media Suite directory"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this),
                viewMode === "list" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-600 dark:text-slate-400",
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USERS"].length,
                                        " user",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USERS"].length !== 1 ? "s" : "",
                                        " in directory"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setViewMode("add"),
                                    className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M12 4v16m8-8H4"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                lineNumber: 191,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 190,
                                            columnNumber: 17
                                        }, this),
                                        "Add User"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-600 dark:text-red-400",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                lineNumber: 199,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                            lineNumber: 198,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 max-h-96 overflow-y-auto",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USERS"].map((user)=>{
                                const isCurrentUser = user.name === currentUserName;
                                const canDelete = isMasterAdmin || !user.isAdmin && !isCurrentUser;
                                const isDeleting = deletingUser === user.name;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-slate-900 dark:text-white",
                                                            children: [
                                                                user.name,
                                                                isCurrentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-2 text-xs text-blue-600 dark:text-blue-400",
                                                                    children: "(You)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                                    lineNumber: 219,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 25
                                                        }, this),
                                                        user.isMasterAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 rounded",
                                                            children: "Master Admin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 27
                                                        }, this),
                                                        user.isAdmin && !user.isMasterAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded",
                                                            children: "Admin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-600 dark:text-slate-400",
                                                    children: [
                                                        user.role,
                                                        " • ",
                                                        user.client
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 214,
                                            columnNumber: 21
                                        }, this),
                                        canDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleDeleteUser(user.name, user.client),
                                            disabled: isDeleting,
                                            className: "px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: isDeleting ? "Deleting..." : "Delete"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 239,
                                            columnNumber: 23
                                        }, this),
                                        !canDelete && !isCurrentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-slate-400 dark:text-slate-500",
                                            children: "Protected"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 248,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, `${user.name}-${user.client}`, true, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 210,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                            lineNumber: 203,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClose,
                                className: "px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                            lineNumber: 257,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this),
                viewMode === "add" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setViewMode("list"),
                            className: "mb-4 flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                        lineNumber: 276,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this),
                                "Back to user list"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                            lineNumber: 271,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "name",
                                            className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                            children: "Full Name"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 284,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: "name",
                                            value: name,
                                            onChange: (e)=>setName(e.target.value),
                                            placeholder: "e.g., John Doe",
                                            disabled: isSubmitting,
                                            list: "existing-names",
                                            className: "w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 287,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                            id: "existing-names",
                                            children: existingNames.map((nameOption)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: nameOption
                                                }, nameOption, false, {
                                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 17
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 297,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 283,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "role",
                                            className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                            children: "Role"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 306,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: "role",
                                            value: role,
                                            onChange: (e)=>setRole(e.target.value),
                                            placeholder: "Type or select a role...",
                                            disabled: isSubmitting,
                                            list: "existing-roles",
                                            className: "w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 309,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                            id: "existing-roles",
                                            children: [
                                                ...new Set([
                                                    ...roleOptions,
                                                    ...existingRoles
                                                ])
                                            ].sort().map((roleOption)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: roleOption
                                                }, roleOption, false, {
                                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 17
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 319,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-slate-500 dark:text-slate-400",
                                            children: "Select from list or type a custom role"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 324,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 305,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "client",
                                            className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                            children: "Client"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 331,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: "client",
                                            value: client,
                                            onChange: (e)=>setClient(e.target.value),
                                            placeholder: "Type or select a client...",
                                            disabled: isSubmitting,
                                            list: "existing-clients",
                                            className: "w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 334,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                            id: "existing-clients",
                                            children: existingClients.map((clientOption)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: clientOption
                                                }, clientOption, false, {
                                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 17
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 344,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-slate-500 dark:text-slate-400",
                                            children: "Select from list or type a custom client"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 349,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 330,
                                    columnNumber: 11
                                }, this),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findUserByName"])(currentUserName)?.isMasterAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            id: "isAdmin",
                                            checked: isAdmin,
                                            onChange: (e)=>setIsAdmin(e.target.checked),
                                            disabled: isSubmitting,
                                            className: "w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 357,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "isAdmin",
                                            className: "ml-2 text-sm text-slate-700 dark:text-slate-300",
                                            children: "Grant admin privileges (can manage users and view analytics)"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 365,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 356,
                                    columnNumber: 13
                                }, this),
                                !(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findUserByName"])(currentUserName)?.isMasterAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-blue-700 dark:text-blue-300",
                                        children: "Only the Master Admin can grant admin privileges to new users."
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                        lineNumber: 372,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 371,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-red-600 dark:text-red-400",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 380,
                                    columnNumber: 13
                                }, this),
                                success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-green-600 dark:text-green-400",
                                        children: "User added successfully!"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                        lineNumber: 388,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 387,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleClose,
                                            disabled: isSubmitting,
                                            className: "flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 394,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: isSubmitting,
                                            className: "flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: isSubmitting ? "Adding..." : "Add User"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 402,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 393,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                    lineNumber: 270,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
            lineNumber: 155,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/web/core/ui/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$AnalyticsProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/AnalyticsProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$UserBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/UserBadge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$UserManagementModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/UserManagementModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/localStorage.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function Header({ title, subtitle, showBackButton = false }) {
    const userInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$AnalyticsProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showUserManagement, setShowUserManagement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSwitchUser = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearUserIdentity"])();
        window.location.reload();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-6 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    showBackButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-6 h-6",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/core/ui/Header.tsx",
                                                lineNumber: 44,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/Header.tsx",
                                            lineNumber: 38,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/Header.tsx",
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold text-slate-900 dark:text-white",
                                                children: title
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/core/ui/Header.tsx",
                                                lineNumber: 54,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-600 dark:text-slate-400 text-sm",
                                                children: subtitle
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/core/ui/Header.tsx",
                                                lineNumber: 57,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/core/ui/Header.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/core/ui/Header.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    userInfo?.isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowUserManagement(true),
                                                className: "px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2",
                                                title: "Manage Users",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/core/ui/Header.tsx",
                                                            lineNumber: 78,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/core/ui/Header.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Manage Users"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/core/ui/Header.tsx",
                                                lineNumber: 67,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/apps/analytics-dashboard",
                                                className: "px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/core/ui/Header.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/core/ui/Header.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Analytics"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/core/ui/Header.tsx",
                                                lineNumber: 87,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    userInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$UserBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        userName: userInfo.userName,
                                        userRole: userInfo.userRole,
                                        userClient: userInfo.userClient,
                                        onChangeUser: handleSwitchUser
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/Header.tsx",
                                        lineNumber: 109,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/core/ui/Header.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/core/ui/Header.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/core/ui/Header.tsx",
                    lineNumber: 30,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/Header.tsx",
                lineNumber: 29,
                columnNumber: 5
            }, this),
            userInfo?.isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$UserManagementModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showUserManagement,
                onClose: ()=>setShowUserManagement(false),
                onUserAdded: ()=>{
                    // Reload the page to refresh the user directory
                    window.location.reload();
                },
                currentUserName: userInfo.userName
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/Header.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/packages/web/core/taxonomy/platforms/dv360.config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * DV360 (YouTube TrueView) Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */ __turbopack_context__.s([
    "DV360_CONFIG",
    ()=>DV360_CONFIG
]);
const DV360_CONFIG = {
    platformName: 'DV360',
    displayName: 'DV360 (YouTube TrueView Auction Action Reach)',
    taxonomyLevels: {
        'Partner': {
            structure: 'Free text',
            separator: '_',
            isRequired: false
        },
        'Advertiser': {
            structure: [
                'Country-Code',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'GB'
        },
        'Campaign': {
            structure: [
                'Brand-Name',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'Pond\'s'
        },
        'Insertion Order': {
            structure: [
                'Market-Short-Name-(PCat)',
                'Brand-Name',
                'Campaign-Name-Campaign-CN-Code',
                'Campaign-Type',
                'Buy-Model',
                'Objective',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_TrVAuc_awa'
        },
        'Line Item': {
            structure: [
                'Placement-Type',
                'Audience-Name',
                'Gender',
                'Age-(lower-upper)',
                'Device-Type',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'InStr_AdvSk_Ad_18+_MobTab'
        },
        'Ad group': {
            structure: [
                'Placement-Type',
                'Audience-Party',
                'Audience-Type',
                'Audience-Name',
                'Gender',
                'Age-(lower-upper)',
                'Device-Type',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'InStr_12pd-did_Demog_AdvSk_Ad_18+_MobTab'
        },
        'Creative/Ad': {
            structure: [
                'Creative-Name',
                'Landing-Page-Type',
                'Retailer',
                'Format-Size',
                'Influencer',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'Creative-Name_Retail_Costco_30s_IHAMP'
        },
        'Audience': {
            structure: 'Free text',
            separator: '_',
            isRequired: false
        }
    },
    fieldDefaults: {
        campaignType: 'BrdPrecPerf',
        buyModel: 'TrVAuc',
        objective: 'awa',
        placementType: 'InStr',
        audienceParty: '12pd-did',
        audienceType: 'Demog',
        audienceName: 'AdvSk',
        gender: 'Ad',
        ageLower: 18,
        ageUpper: 100,
        deviceType: 'MobTab',
        formatSize: '30s',
        landingPageType: 'Retail',
        isDefaulted: {},
        validationErrors: []
    }
};
}),
"[project]/packages/web/core/taxonomy/platforms/tradedesk.config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TradeDesk Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */ __turbopack_context__.s([
    "TRADEDESK_CONFIG",
    ()=>TRADEDESK_CONFIG
]);
const TRADEDESK_CONFIG = {
    platformName: 'TradeDesk',
    displayName: 'TradeDesk',
    taxonomyLevels: {
        'Partner': {
            structure: 'Free text',
            separator: '_',
            isRequired: false
        },
        'Advertiser': {
            structure: [
                'Unilever',
                'Country-Code',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'Unilever_GB'
        },
        'Campaign': {
            structure: [
                'Market-Short-Name-(PCat)',
                'Brand-Name',
                'Campaign-Name-Campaign-CN-Code',
                'Campaign-Type',
                'Format-Type',
                'Objective',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_Disp_cons'
        },
        'Adgroup': {
            structure: [
                'Buy-Model',
                'Targeting-Strategy',
                'Placement-Type',
                'Audience-Party',
                'Audience-Type',
                'Audience-Name',
                'Gender',
                'Age-(lower-upper)',
                'Device-Type',
                'Trusted-Publisher',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'OMPPMP_CNT_InStream_3pd_None_AdvSk_Ad_18+_MobDesk_hrt'
        },
        'Creative': {
            structure: [
                'Campaign-Name-Campaign-CN-Code',
                'Placement-Type',
                'Format-Type',
                'Format-Size',
                'Creative-Name',
                'Landing-Page-Type',
                'Retailer',
                'Trusted-Publisher',
                'Influencer',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'Panacea-(Ponds)-CN002366_InStream_NatVid_30s_Creative-Name_Retail_Costco_prog_IHAMP'
        },
        'Audience': {
            structure: 'Free Text',
            separator: '_',
            isRequired: false
        }
    },
    fieldDefaults: {
        campaignType: 'BrdPrecPerf',
        buyModel: 'OMPPMP',
        targetingStrategy: 'CNT',
        objective: 'cons',
        formatType: 'Disp',
        placementType: 'InStream',
        audienceParty: '3pd',
        audienceType: 'None',
        audienceName: 'AdvSk',
        gender: 'Ad',
        ageLower: 18,
        ageUpper: 65,
        deviceType: 'MobDesk',
        formatSize: '30s',
        landingPageType: 'Retail',
        isDefaulted: {},
        validationErrors: []
    }
};
}),
"[project]/packages/web/core/taxonomy/platforms/amazonDsp.config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Amazon DSP Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */ __turbopack_context__.s([
    "AMAZON_DSP_CONFIG",
    ()=>AMAZON_DSP_CONFIG
]);
const AMAZON_DSP_CONFIG = {
    platformName: 'Amazon DSP',
    displayName: 'Amazon DSP',
    taxonomyLevels: {
        'Entity': {
            structure: 'Free Text',
            separator: '_',
            isRequired: false
        },
        'Advertiser': {
            structure: [
                'Country-Code',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'GB'
        },
        'Order': {
            structure: [
                'Market-Short-Name-(PCat)',
                'Brand-Name',
                'Campaign-Name-Campaign-CN-Code',
                'Campaign-Type',
                'Format-Type',
                'Objective',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_Disp_conv'
        },
        'Line Item': {
            structure: [
                'Buy-Model',
                'Targeting-Strategy',
                'Placement-Type',
                'Audience-Party',
                'Audience-Type',
                'Audience-Name',
                'Gender',
                'Age-(lower-upper)',
                'Device-Type',
                'Trusted-Publisher',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'PMP_AUD_DCODisp_1pd-diddad_Behav_AdvSk_Ad_18-44_Mob_cdn'
        },
        'Creative': {
            structure: [
                'Campaign-Name-Campaign-CN-Code',
                'Placement-Type',
                'Format-Type',
                'Format-Size',
                'Creative-Name',
                'Landing-Page-Type',
                'Retailer',
                'Trusted-Publisher',
                'Influencer',
                'Product-Format',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'Panacea-(Ponds)-CN002366_InStream_NatVid_30s_Creative-Name_Retail_Costco_prog_IHAMP_privid'
        },
        'Audience': {
            structure: 'Free Text',
            separator: '_',
            isRequired: false
        }
    },
    fieldDefaults: {
        campaignType: 'BrdPrecPerf',
        buyModel: 'PMP',
        targetingStrategy: 'AUD',
        objective: 'conv',
        formatType: 'Disp',
        placementType: 'DCODisp',
        audienceParty: '1pd-diddad',
        audienceType: 'Behav',
        audienceName: 'AdvSk',
        gender: 'Ad',
        ageLower: 18,
        ageUpper: 44,
        deviceType: 'Mob',
        formatSize: '30s',
        landingPageType: 'Retail',
        productFormat: 'privid',
        isDefaulted: {},
        validationErrors: []
    }
};
}),
"[project]/packages/web/core/taxonomy/platforms/meta.config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Meta Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */ __turbopack_context__.s([
    "META_CONFIG",
    ()=>META_CONFIG
]);
const META_CONFIG = {
    platformName: 'Meta',
    displayName: 'Meta (Facebook/Instagram)',
    taxonomyLevels: {
        'Business Manager': {
            structure: 'Free text',
            separator: '_',
            isRequired: false,
            example: 'GB_UL'
        },
        'Account': {
            structure: [
                'Country-Code',
                'Brand-Name',
                'Collaborative-Account-Type',
                'Retailer-Name',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'GB_Pond\'s_Collab_Spar'
        },
        'Campaign': {
            structure: [
                'Market-Short-Name-(PCat)',
                'Brand-Name',
                'Campaign-Name-Campaign-CN-Code',
                'Campaign-Type',
                'Buy-Model',
                'Collaborative-Ad',
                'Objective',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_ReaFreq_collab_awa'
        },
        'Ad Set': {
            structure: [
                'Audience-Party',
                'Audience-Type',
                'Audience-Name',
                'Gender',
                'Age-(lower-upper)',
                'Placement-Type',
                'Device-Type',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: '12pd-diddad_LLike_AdvSk_Ad_13+_FeedStory_Mob'
        },
        'Ad': {
            structure: [
                'Creative-Name',
                'Format-Type',
                'Landing-Page-Type',
                'Retailer',
                'Format-Size',
                'Influencer-Post-Type',
                'Influencer',
                '[Influencer-Handle]',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'Creative-Name_Carousel_Retail_Costco_20s_DARK_BSAY_[hygge_for_home]'
        }
    },
    fieldDefaults: {
        campaignType: 'BrdPrecPerf',
        buyModel: 'ReaFreq',
        objective: 'awa',
        audienceParty: '12pd-diddad',
        audienceType: 'LLike',
        audienceName: 'AdvSk',
        gender: 'Ad',
        ageLower: 13,
        ageUpper: 100,
        placementType: 'FeedStory',
        deviceType: 'Mob',
        formatType: 'Carousel',
        formatSize: '20s',
        landingPageType: 'Retail',
        collaborativeAd: 'collab',
        isDefaulted: {},
        validationErrors: []
    }
};
}),
"[project]/packages/web/core/taxonomy/platforms/pinterest.config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Pinterest Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */ __turbopack_context__.s([
    "PINTEREST_CONFIG",
    ()=>PINTEREST_CONFIG
]);
const PINTEREST_CONFIG = {
    platformName: 'Pinterest',
    displayName: 'Pinterest',
    taxonomyLevels: {
        'Account': {
            structure: [
                'Country-Code',
                'Brand-Name',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'GB_Pond\'s'
        },
        'Campaign': {
            structure: [
                'Market-Short-Name-(PCat)',
                'Brand-Name',
                'Campaign-Name-Campaign-CN-Code',
                'Campaign-Type',
                'Buy-Model',
                'Objective',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_ReaFreq_awa'
        },
        'AdGroup': {
            structure: [
                'Audience-Party',
                'Audience-Type',
                'Audience-Name',
                'Gender',
                'Age-(lower-upper)',
                'Placement-Type',
                'Device-Type',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: '12pd-diddad_LLike_AdvSk_Ad_13+_FeedStory_Mob'
        },
        'Ad': {
            structure: [
                'Creative-Name',
                'Format-Type',
                'Landing-Page-Type',
                'Retailer',
                'Format-Size',
                'Influencer-Post-Type',
                'Influencer',
                '[Influencer-Handle]',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'Creative-Name_Carousel_Retail_Costco_20s_DARK_BSAY_[hygge_for_home]'
        }
    },
    fieldDefaults: {
        campaignType: 'BrdPrecPerf',
        buyModel: 'ReaFreq',
        objective: 'awa',
        audienceParty: '12pd-diddad',
        audienceType: 'LLike',
        audienceName: 'AdvSk',
        gender: 'Ad',
        ageLower: 13,
        ageUpper: 100,
        placementType: 'FeedStory',
        deviceType: 'Mob',
        formatType: 'Carousel',
        formatSize: '20s',
        landingPageType: 'Retail',
        isDefaulted: {},
        validationErrors: []
    }
};
}),
"[project]/packages/web/core/taxonomy/platforms/tiktok.config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TikTok Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */ __turbopack_context__.s([
    "TIKTOK_CONFIG",
    ()=>TIKTOK_CONFIG
]);
const TIKTOK_CONFIG = {
    platformName: 'TikTok',
    displayName: 'TikTok',
    taxonomyLevels: {
        'Business Manager': {
            structure: [
                'Country-Code',
                'UL',
                'Free text'
            ],
            separator: '_',
            isRequired: false,
            example: 'GB_UL'
        },
        'Account': {
            structure: [
                'Country-Code',
                'Brand-Name',
                'Buy-Model',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'GB_Pond\'s_Auc'
        },
        'Campaign': {
            structure: [
                'Market-Short-Name-(PCat)',
                'Brand-Name',
                'Campaign-Name-Campaign-CN-Code',
                'Campaign-Type',
                'Buy-Model',
                'Objective',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_ReaFreq_awa'
        },
        'AdGroup': {
            structure: [
                'Audience-Party',
                'Audience-Type',
                'Audience-Name',
                'Gender',
                'Age-(lower-upper)',
                'Placement-Type',
                'Device-Type',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: '12pd-diddad_LLike_AdvSk_Ad_13+_FeedStory_Mob'
        },
        'Ad': {
            structure: [
                'Creative-Name',
                'Format-Type',
                'Landing-Page-Type',
                'Retailer',
                'Format-Size',
                'Add-On',
                'Influencer-Post-Type',
                'Influencer',
                '[Influencer-Handle]',
                'Creative-Exchange',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'Creative-Name_Carousel_Retail_Costco_20s_DARK_BSAY_[hygge_for_home]_CE'
        }
    },
    fieldDefaults: {
        campaignType: 'BrdPrecPerf',
        buyModel: 'Auc',
        objective: 'awa',
        audienceParty: '12pd-diddad',
        audienceType: 'LLike',
        audienceName: 'AdvSk',
        gender: 'Ad',
        ageLower: 13,
        ageUpper: 100,
        placementType: 'FeedStory',
        deviceType: 'Mob',
        formatType: 'Carousel',
        formatSize: '20s',
        landingPageType: 'Retail',
        creativeExchange: 'CE',
        isDefaulted: {},
        validationErrors: []
    }
};
}),
"[project]/packages/web/core/taxonomy/platforms/snapchat.config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Snapchat Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */ __turbopack_context__.s([
    "SNAPCHAT_CONFIG",
    ()=>SNAPCHAT_CONFIG
]);
const SNAPCHAT_CONFIG = {
    platformName: 'Snapchat',
    displayName: 'Snapchat',
    taxonomyLevels: {
        'Account': {
            structure: [
                'Country-Code',
                'Brand-Name',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'GB_Pond\'s'
        },
        'Campaign': {
            structure: [
                'Market-Short-Name-(PCat)',
                'Brand-Name',
                'Campaign-Name-Campaign-CN-Code',
                'Campaign-Type',
                'Buy-Model',
                'Objective',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_ReaFreq_awa'
        },
        'AdGroup': {
            structure: [
                'Audience-Party',
                'Audience-Type',
                'Audience-Name',
                'Gender',
                'Age-(lower-upper)',
                'Placement-Type',
                'Device-Type',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: '12pd-diddad_LLike_AdvSk_Ad_13+_FeedStory_Mob'
        },
        'Ad': {
            structure: [
                'Creative-Name',
                'Format-Type',
                'Landing-Page-Type',
                'Retailer',
                'Format-Size',
                'Influencer-Post-Type',
                'Influencer',
                '[Influencer-Handle]',
                'Free text'
            ],
            separator: '_',
            isRequired: true,
            example: 'Creative-Name_Carousel_Retail_Costco_20s_DARK_BSAY_[hygge_for_home]'
        }
    },
    fieldDefaults: {
        campaignType: 'BrdPrecPerf',
        buyModel: 'ReaFreq',
        objective: 'awa',
        audienceParty: '12pd-diddad',
        audienceType: 'LLike',
        audienceName: 'AdvSk',
        gender: 'Ad',
        ageLower: 13,
        ageUpper: 100,
        placementType: 'FeedStory',
        deviceType: 'Mob',
        formatType: 'Carousel',
        formatSize: '20s',
        landingPageType: 'Retail',
        isDefaulted: {},
        validationErrors: []
    }
};
}),
"[project]/packages/web/core/taxonomy/platforms/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * Platform Registry
 * Centralized access to all platform configurations
 */ __turbopack_context__.s([
    "PLATFORM_CONFIGS",
    ()=>PLATFORM_CONFIGS,
    "getPlatformConfig",
    ()=>getPlatformConfig,
    "getSupportedPlatforms",
    ()=>getSupportedPlatforms,
    "normalizePlatformName",
    ()=>normalizePlatformName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$dv360$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/taxonomy/platforms/dv360.config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$tradedesk$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/taxonomy/platforms/tradedesk.config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$amazonDsp$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/taxonomy/platforms/amazonDsp.config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$meta$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/taxonomy/platforms/meta.config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$pinterest$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/taxonomy/platforms/pinterest.config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$tiktok$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/taxonomy/platforms/tiktok.config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$snapchat$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/taxonomy/platforms/snapchat.config.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const PLATFORM_CONFIGS = {
    'DV360': __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$dv360$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DV360_CONFIG"],
    'TradeDesk': __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$tradedesk$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TRADEDESK_CONFIG"],
    'Amazon DSP': __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$amazonDsp$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AMAZON_DSP_CONFIG"],
    'Meta': __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$meta$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["META_CONFIG"],
    'Pinterest': __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$pinterest$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PINTEREST_CONFIG"],
    'TikTok': __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$tiktok$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIKTOK_CONFIG"],
    'Snapchat': __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$snapchat$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SNAPCHAT_CONFIG"]
};
function getPlatformConfig(platformName) {
    return PLATFORM_CONFIGS[platformName] || null;
}
function getSupportedPlatforms() {
    return Object.keys(PLATFORM_CONFIGS);
}
function normalizePlatformName(rawPlatformName) {
    const normalized = rawPlatformName.toLowerCase().trim();
    // Platform name mappings
    const platformMappings = {
        'tradedesk': 'TradeDesk',
        'the trade desk': 'TradeDesk',
        'ttd': 'TradeDesk',
        'dv360': 'DV360',
        'displayvideo': 'DV360',
        'display & video 360': 'DV360',
        'youtube': 'DV360',
        'trueview': 'DV360',
        'amazon dsp': 'Amazon DSP',
        'amazon': 'Amazon DSP',
        'amazondsp': 'Amazon DSP',
        'meta': 'Meta',
        'facebook': 'Meta',
        'fb': 'Meta',
        'instagram': 'Meta',
        'ig': 'Meta',
        'pinterest': 'Pinterest',
        'pin': 'Pinterest',
        'tiktok': 'TikTok',
        'tik tok': 'TikTok',
        'snapchat': 'Snapchat',
        'snap': 'Snapchat'
    };
    return platformMappings[normalized] || null;
}
;
}),
"[project]/packages/web/core/taxonomy/taxonomyGenerator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Taxonomy Generator - Creates UNCC-compliant taxonomy strings
 * for all supported platforms
 */ __turbopack_context__.s([
    "buildTaxonomyString",
    ()=>buildTaxonomyString,
    "generateTaxonomies",
    ()=>generateTaxonomies,
    "resolveFieldToken",
    ()=>resolveFieldToken,
    "validateInputData",
    ()=>validateInputData,
    "validateTaxonomyLevel",
    ()=>validateTaxonomyLevel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/core/taxonomy/platforms/index.ts [app-ssr] (ecmascript) <locals>");
;
function generateTaxonomies(inputData) {
    const platformConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$platforms$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getPlatformConfig"])(inputData.platform);
    if (!platformConfig) {
        return [
            {
                platform: inputData.platform,
                platformFieldName: 'Unknown',
                taxonomyString: '',
                validationErrors: [
                    `Unknown platform: ${inputData.platform}`
                ]
            }
        ];
    }
    const taxonomies = [];
    for (const [levelName, levelConfig] of Object.entries(platformConfig.taxonomyLevels)){
        const taxonomyString = buildTaxonomyString(inputData, levelConfig);
        const validationErrors = validateTaxonomyLevel(taxonomyString, levelConfig, levelName);
        taxonomies.push({
            platform: inputData.platform,
            platformFieldName: levelName,
            taxonomyString,
            validationErrors
        });
    }
    return taxonomies;
}
function buildTaxonomyString(inputData, levelConfig) {
    // Handle free text levels
    if (levelConfig.structure === 'Free text' || levelConfig.structure === 'Free Text') {
        return inputData.freeText || '';
    }
    // Handle structured levels
    if (Array.isArray(levelConfig.structure)) {
        const parts = [];
        const separator = levelConfig.separator || '_';
        for (const fieldToken of levelConfig.structure){
            const value = resolveFieldToken(fieldToken, inputData);
            // Only add non-empty values
            if (value && value !== '') {
                parts.push(value);
            }
        }
        return parts.join(separator);
    }
    return '';
}
function resolveFieldToken(token, inputData) {
    // Hardcoded value: "Unilever"
    if (token === 'Unilever') {
        return 'Unilever';
    }
    // Hardcoded value: "UL"
    if (token === 'UL') {
        return 'UL';
    }
    // Simple field mappings
    const tokenMap = {
        'Market-Short-Name-(PCat)': inputData.marketName,
        'Brand-Name': inputData.brandName,
        'Campaign-Name': inputData.campaignName,
        'Campaign-CN-Code': inputData.cnCode,
        'Country-Code': inputData.countryCode,
        // Campaign Level
        'Campaign-Type': inputData.campaignType,
        'Format-Type': inputData.formatType,
        'Objective': inputData.objective,
        // Line Item/Ad Group Level
        'Buy-Model': inputData.buyModel,
        'Targeting-Strategy': inputData.targetingStrategy,
        'Placement-Type': inputData.placementType,
        'Audience-Party': inputData.audienceParty,
        'Audience-Type': inputData.audienceType,
        'Audience-Name': inputData.audienceName,
        'Gender': inputData.gender,
        'Device-Type': inputData.deviceType,
        'Trusted-Publisher': inputData.trustedPublisher,
        // Creative Level
        'Format-Size': inputData.formatSize,
        'Creative-Name': inputData.creativeName,
        'Landing-Page-Type': inputData.landingPageType,
        'Retailer': inputData.retailer,
        'Retailer-Name': inputData.retailer,
        'Influencer': inputData.influencer,
        '[Influencer-Handle]': inputData.influencerHandle,
        'Influencer-Post-Type': inputData.influencerPostType,
        // Platform-Specific
        'Collaborative-Account-Type': inputData.collaborativeAccountType,
        'Collaborative-Ad': inputData.collaborativeAd,
        'Product-Format': inputData.productFormat,
        'Creative-Exchange': inputData.creativeExchange,
        'Add-On': inputData.addOn,
        // Free text
        'Free text': inputData.freeText,
        'Free Text': inputData.freeText
    };
    // Compound tokens
    if (token === 'Campaign-Name-Campaign-CN-Code') {
        if (inputData.campaignName && inputData.cnCode) {
            return `${inputData.campaignName}-${inputData.cnCode}`;
        }
        return '';
    }
    if (token === 'Age-(lower-upper)') {
        if (inputData.ageLower !== undefined && inputData.ageUpper !== undefined) {
            // Format as "18-65" or "18+" if upper is 100
            if (inputData.ageUpper === 100 || inputData.ageUpper >= 100) {
                return `${inputData.ageLower}+`;
            }
            return `${inputData.ageLower}-${inputData.ageUpper}`;
        }
        return '';
    }
    // Return mapped value or empty string
    return tokenMap[token] || '';
}
function validateTaxonomyLevel(taxonomyString, levelConfig, levelName) {
    const errors = [];
    // Check if required level is empty
    if (levelConfig.isRequired && (!taxonomyString || taxonomyString.trim() === '')) {
        errors.push(`${levelName} is required but generated empty taxonomy`);
    }
    // Check for placeholder values that weren't filled
    if (taxonomyString.includes('undefined') || taxonomyString.includes('null')) {
        errors.push(`${levelName} contains undefined/null values`);
    }
    // Check for consecutive separators (indicates missing fields)
    if (taxonomyString.includes('__')) {
        errors.push(`${levelName} has missing fields (consecutive separators)`);
    }
    // Check for leading/trailing separators
    if (taxonomyString.startsWith('_') || taxonomyString.endsWith('_')) {
        errors.push(`${levelName} has leading or trailing separators`);
    }
    return errors;
}
function validateInputData(inputData) {
    const errors = [];
    // Required user metadata
    if (!inputData.cnCode || inputData.cnCode.trim() === '') {
        errors.push('CN Code is required');
    }
    if (!inputData.marketName || inputData.marketName.trim() === '') {
        errors.push('Market Name (PCat) is required');
    }
    if (!inputData.countryCode || inputData.countryCode.trim() === '') {
        errors.push('Country Code is required');
    }
    if (!inputData.brandName || inputData.brandName.trim() === '') {
        errors.push('Brand Name is required');
    }
    if (!inputData.campaignName || inputData.campaignName.trim() === '') {
        errors.push('Campaign Name is required');
    }
    // Platform detection
    if (!inputData.platform || inputData.platform.trim() === '') {
        errors.push('Platform must be detected or specified');
    }
    // Campaign level required fields
    if (!inputData.campaignType || inputData.campaignType.trim() === '') {
        errors.push('Campaign Type is required');
    }
    if (!inputData.formatType || inputData.formatType.trim() === '') {
        errors.push('Format Type is required');
    }
    if (!inputData.objective || inputData.objective.trim() === '') {
        errors.push('Objective is required');
    }
    // Line item level required fields
    if (!inputData.buyModel || inputData.buyModel.trim() === '') {
        errors.push('Buy Model is required');
    }
    if (!inputData.placementType || inputData.placementType.trim() === '') {
        errors.push('Placement Type is required');
    }
    if (!inputData.audienceParty || inputData.audienceParty.trim() === '') {
        errors.push('Audience Party is required');
    }
    if (!inputData.audienceType || inputData.audienceType.trim() === '') {
        errors.push('Audience Type is required');
    }
    if (!inputData.audienceName || inputData.audienceName.trim() === '') {
        errors.push('Audience Name is required');
    }
    if (!inputData.gender || inputData.gender.trim() === '') {
        errors.push('Gender is required');
    }
    if (inputData.ageLower === undefined || inputData.ageLower === null) {
        errors.push('Age Lower Bound is required');
    } else if (inputData.ageLower < 13) {
        errors.push('Age Lower Bound must be at least 13');
    }
    if (inputData.ageUpper === undefined || inputData.ageUpper === null) {
        errors.push('Age Upper Bound is required');
    } else if (inputData.ageUpper > 100) {
        errors.push('Age Upper Bound cannot exceed 100');
    }
    if (inputData.ageLower !== undefined && inputData.ageUpper !== undefined && inputData.ageLower >= inputData.ageUpper) {
        errors.push('Age Upper Bound must be greater than Age Lower Bound');
    }
    if (!inputData.deviceType || inputData.deviceType.trim() === '') {
        errors.push('Device Type is required');
    }
    // Creative level required fields
    if (!inputData.formatSize || inputData.formatSize.trim() === '') {
        errors.push('Format Size is required');
    }
    if (!inputData.creativeName || inputData.creativeName.trim() === '') {
        errors.push('Creative Name is required');
    }
    if (!inputData.landingPageType || inputData.landingPageType.trim() === '') {
        errors.push('Landing Page Type is required');
    }
    // Conditional: Retailer required if Landing Page Type is "Retail"
    if (inputData.landingPageType === 'Retail' && (!inputData.retailer || inputData.retailer.trim() === '')) {
        errors.push('Retailer is required when Landing Page Type is "Retail"');
    }
    return errors;
}
}),
"[project]/packages/web/core/analytics/brandDirectory.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Brand Directory
 *
 * Centralized list of brand names for automatic detection from filenames.
 * This makes it easy to identify which brand a file belongs to without manual input.
 *
 * To add new brands:
 * 1. Add the brand name to the BRANDS array
 * 2. Save the file - changes take effect immediately
 *
 * Brand detection is case-insensitive and works by searching filenames
 * for any of these brand names.
 */ __turbopack_context__.s([
    "BRANDS",
    ()=>BRANDS,
    "containsBrand",
    ()=>containsBrand,
    "extractBrandFromFilename",
    ()=>extractBrandFromFilename,
    "getAllBrands",
    ()=>getAllBrands,
    "searchBrands",
    ()=>searchBrands
]);
const BRANDS = [
    // ============================================================================
    // UNILEVER BRANDS
    // ============================================================================
    // Food & Wellbeing
    "Knorr",
    "Hellmann's",
    "UFS",
    "Ben & Jerry's",
    "Breyers",
    "Magnum",
    "Liquid IV",
    "OLLY",
    // Personal Care
    "Dove Deo",
    "Axe Deo",
    "DMC Deo",
    "Degree",
    "Vaseline",
    "TRESemmé",
    "OLLY Skin Cleansing",
    // Beauty
    "TRESemmé",
    "Dove Hair",
    "Shea Hair",
    "Nexxus",
    "DMC Hair"
];
function extractBrandFromFilename(filename) {
    const filenameLower = filename.toLowerCase();
    // Search for each brand name in the filename
    for (const brand of BRANDS){
        const brandLower = brand.toLowerCase();
        // Check if the brand name appears in the filename
        if (filenameLower.includes(brandLower)) {
            return brand; // Return the brand with original casing
        }
    }
    return null; // No brand detected
}
function containsBrand(filename, brandName) {
    return filename.toLowerCase().includes(brandName.toLowerCase());
}
function getAllBrands() {
    return [
        ...BRANDS
    ].sort();
}
function searchBrands(query) {
    const queryLower = query.toLowerCase();
    return BRANDS.filter((brand)=>brand.toLowerCase().includes(queryLower));
}
}),
"[project]/packages/web/core/analytics/tracker.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Analytics Tracker
 *
 * Client-side utilities for tracking user actions and file uploads.
 * All tracking is done asynchronously and won't block the UI.
 */ __turbopack_context__.s([
    "Analytics",
    ()=>Analytics,
    "trackError",
    ()=>trackError,
    "trackEvent",
    ()=>trackEvent,
    "trackFileUpload",
    ()=>trackFileUpload,
    "trackPageView",
    ()=>trackPageView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/localStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$brandDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/brandDirectory.ts [app-ssr] (ecmascript)");
;
;
async function trackEvent(toolName, action, metadata) {
    try {
        const identity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserIdentity"])();
        if (!identity) {
            console.warn('Cannot track event: User not identified');
            return false;
        }
        const sessionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSessionId"])();
        const payload = {
            user_id: identity.userId,
            session_id: sessionId,
            tool_name: toolName,
            action,
            metadata
        };
        const response = await fetch('/api/analytics/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`Tracking failed: ${response.statusText}`);
        }
        return true;
    } catch (error) {
        console.error('Failed to track event:', error);
        return false;
    }
}
async function trackFileUpload(toolName, file, metadata) {
    try {
        const identity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserIdentity"])();
        if (!identity) {
            console.warn('Cannot track file upload: User not identified');
            return false;
        }
        // Auto-detect brand name from filename if not provided
        const detectedBrand = metadata?.brand_name || (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$brandDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractBrandFromFilename"])(file.name);
        if (detectedBrand) {
            console.log(`🏷️  Brand detected from filename: ${detectedBrand}`);
        }
        const payload = {
            user_id: identity.userId,
            tool_name: toolName,
            filename: file.name,
            file_size: file.size,
            file_type: file.name.split('.').pop() || 'unknown',
            ...metadata,
            brand_name: detectedBrand || metadata?.brand_name
        };
        const response = await fetch('/api/analytics/track-upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`File upload tracking failed: ${response.statusText}`);
        }
        return true;
    } catch (error) {
        console.error('Failed to track file upload:', error);
        return false;
    }
}
async function trackPageView(toolName) {
    return trackEvent(toolName, 'page_view');
}
async function trackError(toolName, errorMessage, errorContext) {
    try {
        const identity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserIdentity"])();
        if (!identity) {
            console.warn('Cannot track error: User not identified');
            return false;
        }
        const metadata = {
            error_message: errorMessage,
            error_type: errorContext?.errorType || 'unknown_error',
            filename: errorContext?.filename,
            step: errorContext?.step,
            stack_trace: errorContext?.stackTrace,
            timestamp: new Date().toISOString()
        };
        console.error(`❌ Error tracked: ${errorMessage}`, metadata);
        return trackEvent(toolName, 'error', metadata);
    } catch (error) {
        console.error('Failed to track error:', error);
        return false;
    }
}
const Analytics = {
    // Traffic Sheet Automation
    trafficSheetFileUpload: (file)=>trackFileUpload('Traffic Sheet Automation', file),
    trafficSheetPreview: ()=>trackEvent('Traffic Sheet Automation', 'preview_data'),
    trafficSheetGenerate: ()=>trackEvent('Traffic Sheet Automation', 'generate'),
    trafficSheetDownload: ()=>trackEvent('Traffic Sheet Automation', 'download'),
    trafficSheetError: (errorMessage, filename, errorType)=>trackError('Traffic Sheet Automation', errorMessage, {
            filename,
            errorType
        }),
    // Taxonomy Generator
    taxonomyMetadataSubmit: (metadata)=>trackEvent('Taxonomy Generator', 'metadata_submit', metadata),
    taxonomyFileUpload: (file, metadata)=>trackFileUpload('Taxonomy Generator', file, metadata),
    taxonomyGenerate: (rowCount)=>trackEvent('Taxonomy Generator', 'generate', {
            row_count: rowCount
        }),
    taxonomyExport: (format)=>trackEvent('Taxonomy Generator', 'export', {
            format
        }),
    taxonomyCopyTSV: ()=>trackEvent('Taxonomy Generator', 'copy_tsv'),
    taxonomyError: (errorMessage, filename, errorType)=>trackError('Taxonomy Generator', errorMessage, {
            filename,
            errorType
        }),
    // Home Page
    homePageView: ()=>trackPageView('Home Page'),
    // Generic
    trackEvent,
    trackFileUpload,
    trackPageView,
    trackError
};
}),
"[project]/packages/web/app/apps/taxonomy-generator/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TaxonomyGenerator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$FileUpload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/FileUpload.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/Button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/Header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$taxonomyGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/taxonomy/taxonomyGenerator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/tracker.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$brandDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/brandDirectory.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function TaxonomyGenerator() {
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("metadata");
    const [userMetadata, setUserMetadata] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        cnCode: "",
        marketName: "",
        countryCode: "GB",
        brandName: "",
        campaignName: ""
    });
    const [blockingChartFile, setBlockingChartFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [trafficSheetFile, setTrafficSheetFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Wrapper functions for file selection
    const handleBlockingChartSelect = (file)=>{
        setBlockingChartFile(file);
        // Auto-detect brand from filename if not already set
        if (!userMetadata.brandName) {
            const detectedBrand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$brandDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractBrandFromFilename"])(file.name);
            if (detectedBrand) {
                console.log(`🏷️  Auto-populated brand: ${detectedBrand}`);
                setUserMetadata((prev)=>({
                        ...prev,
                        brandName: detectedBrand
                    }));
            }
        }
    };
    const handleTrafficSheetSelect = (file)=>{
        setTrafficSheetFile(file);
        // Auto-detect brand from filename if not already set
        if (!userMetadata.brandName) {
            const detectedBrand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$brandDirectory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractBrandFromFilename"])(file.name);
            if (detectedBrand) {
                console.log(`🏷️  Auto-populated brand: ${detectedBrand}`);
                setUserMetadata((prev)=>({
                        ...prev,
                        brandName: detectedBrand
                    }));
            }
        }
    };
    const [taxonomyRows, setTaxonomyRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [platformBreakdown, setPlatformBreakdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Track page view on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Analytics"].trackPageView("Taxonomy Generator");
    }, []);
    // Step 1: Submit metadata
    const handleMetadataSubmit = ()=>{
        // Validate metadata
        if (!userMetadata.cnCode || !userMetadata.marketName || !userMetadata.countryCode || !userMetadata.brandName || !userMetadata.campaignName) {
            setError("All metadata fields are required");
            return;
        }
        setError(null);
        // Track metadata submission
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Analytics"].taxonomyMetadataSubmit({
            campaign_name: userMetadata.campaignName,
            brand_name: userMetadata.brandName,
            cn_code: userMetadata.cnCode
        });
        setCurrentStep("upload");
    };
    // Step 2: Upload files and generate taxonomies
    const handleFilesSubmit = async ()=>{
        if (!blockingChartFile && !trafficSheetFile) {
            setError("Please upload at least one file (Blocking Chart or Traffic Sheet)");
            return;
        }
        setIsProcessing(true);
        setError(null);
        // Track file uploads
        if (blockingChartFile) {
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Analytics"].taxonomyFileUpload(blockingChartFile, {
                campaign_name: userMetadata.campaignName,
                brand_name: userMetadata.brandName,
                cn_code: userMetadata.cnCode
            });
        }
        if (trafficSheetFile) {
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Analytics"].taxonomyFileUpload(trafficSheetFile, {
                campaign_name: userMetadata.campaignName,
                brand_name: userMetadata.brandName,
                cn_code: userMetadata.cnCode
            });
        }
        try {
            const formData = new FormData();
            // Add user metadata
            formData.append("cnCode", userMetadata.cnCode);
            formData.append("marketName", userMetadata.marketName);
            formData.append("countryCode", userMetadata.countryCode);
            formData.append("brandName", userMetadata.brandName);
            formData.append("campaignName", userMetadata.campaignName);
            // Add files
            if (blockingChartFile) {
                formData.append("blockingChart", blockingChartFile);
            }
            if (trafficSheetFile) {
                formData.append("trafficSheet", trafficSheetFile);
            }
            const response = await fetch("/api/taxonomy/parse", {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to parse files");
            }
            const data = await response.json();
            setTaxonomyRows(data.rows);
            setPlatformBreakdown(data.platformBreakdown);
            setCurrentStep("preview");
            // Track successful generation
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Analytics"].taxonomyGenerate(data.rows.length);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to parse files";
            setError(errorMessage);
            // Track the error
            const filename = blockingChartFile?.name || trafficSheetFile?.name;
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Analytics"].taxonomyError(errorMessage, filename, 'parse_error');
        } finally{
            setIsProcessing(false);
        }
    };
    // Handle field edit
    const handleFieldChange = (rowIndex, field, value)=>{
        setTaxonomyRows((prev)=>{
            const updated = [
                ...prev
            ];
            const row = {
                ...updated[rowIndex]
            };
            // Update input field
            row.inputFields = {
                ...row.inputFields,
                [field]: value
            };
            // Regenerate taxonomies
            row.taxonomies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$taxonomy$2f$taxonomyGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateTaxonomies"])(row.inputFields);
            updated[rowIndex] = row;
            return updated;
        });
    };
    // Batch copy taxonomies
    const handleBatchCopy = ()=>{
        const lines = [];
        // Header
        const headers = [
            'Row #',
            'Platform',
            'Original Tactic'
        ];
        if (taxonomyRows[0]) {
            taxonomyRows[0].taxonomies.forEach((tax)=>headers.push(tax.platformFieldName));
        }
        lines.push(headers.join('\t'));
        // Data
        taxonomyRows.forEach((row, idx)=>{
            const cells = [
                String(idx + 1),
                row.platform,
                row.originalTactic
            ];
            row.taxonomies.forEach((tax)=>cells.push(tax.taxonomyString));
            lines.push(cells.join('\t'));
        });
        const tsv = lines.join('\n');
        navigator.clipboard.writeText(tsv);
        alert('Taxonomies copied to clipboard!');
        // Track copy action
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Analytics"].taxonomyCopyTSV();
    };
    // Export to Excel
    const handleExport = async ()=>{
        setIsProcessing(true);
        setError(null);
        try {
            const response = await fetch("/api/taxonomy/export", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    rows: taxonomyRows,
                    exportFormat: "embedded"
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to export");
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `accutics-taxonomies-${Date.now()}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            // Track successful export
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Analytics"].taxonomyExport("embedded");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to export");
        } finally{
            setIsProcessing(false);
        }
    };
    const handleStartOver = ()=>{
        setCurrentStep("metadata");
        setBlockingChartFile(null);
        setTrafficSheetFile(null);
        setTaxonomyRows([]);
        setPlatformBreakdown({});
        setError(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                title: "Accutics Taxonomy Generator",
                subtitle: "Generate UNCC-compliant taxonomies for 7 platforms",
                showBackButton: true
            }, void 0, false, {
                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "px-6 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIndicator, {
                                    step: 1,
                                    label: "Metadata",
                                    active: currentStep === "metadata",
                                    completed: currentStep !== "metadata"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-1 bg-slate-300 dark:bg-slate-600"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 272,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIndicator, {
                                    step: 2,
                                    label: "Upload Files",
                                    active: currentStep === "upload",
                                    completed: currentStep === "preview"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-1 bg-slate-300 dark:bg-slate-600"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 274,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIndicator, {
                                    step: 3,
                                    label: "Review & Export",
                                    active: currentStep === "preview",
                                    completed: false
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    currentStep === "metadata" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetadataStep, {
                        metadata: userMetadata,
                        onMetadataChange: setUserMetadata,
                        onSubmit: handleMetadataSubmit,
                        error: error
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 280,
                        columnNumber: 11
                    }, this),
                    currentStep === "upload" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadStep, {
                        blockingChartFile: blockingChartFile,
                        trafficSheetFile: trafficSheetFile,
                        onBlockingChartSelect: handleBlockingChartSelect,
                        onTrafficSheetSelect: handleTrafficSheetSelect,
                        onSubmit: handleFilesSubmit,
                        onBack: ()=>setCurrentStep("metadata"),
                        isProcessing: isProcessing,
                        error: error
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 289,
                        columnNumber: 11
                    }, this),
                    currentStep === "preview" && taxonomyRows.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewStep, {
                        rows: taxonomyRows,
                        platformBreakdown: platformBreakdown,
                        onFieldChange: handleFieldChange,
                        onBatchCopy: handleBatchCopy,
                        onExport: handleExport,
                        onStartOver: handleStartOver,
                        isProcessing: isProcessing,
                        error: error
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 302,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
        lineNumber: 258,
        columnNumber: 5
    }, this);
}
// Step Indicator Component
function StepIndicator({ step, label, active, completed }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
        w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
        ${active ? 'bg-blue-600 text-white' : completed ? 'bg-green-600 text-white' : 'bg-slate-300 text-slate-600'}
      `,
                children: completed ? '✓' : step
            }, void 0, false, {
                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-xs ${active ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}`,
                children: label
            }, void 0, false, {
                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
        lineNumber: 321,
        columnNumber: 5
    }, this);
}
// Metadata Step Component
function MetadataStep({ metadata, onMetadataChange, onSubmit, error }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl mx-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-semibold text-slate-900 dark:text-white mb-4",
                    children: "Step 1: Campaign Metadata"
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 350,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-600 dark:text-slate-400 text-sm mb-6",
                    children: "Enter campaign information that will be used across all taxonomies. These fields are required."
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 353,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                    children: [
                                        "CN Code ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 360,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 359,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: metadata.cnCode,
                                    onChange: (e)=>onMetadataChange({
                                            ...metadata,
                                            cnCode: e.target.value
                                        }),
                                    className: "w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600",
                                    placeholder: "e.g., CN002366"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 358,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                    children: [
                                        "Market Name (PCat) ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 373,
                                            columnNumber: 34
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 372,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: metadata.marketName,
                                    onChange: (e)=>onMetadataChange({
                                            ...metadata,
                                            marketName: e.target.value
                                        }),
                                    className: "w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600",
                                    placeholder: "e.g., SKNCLN"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 371,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                    children: [
                                        "Country Code ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 386,
                                            columnNumber: 28
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: metadata.countryCode,
                                    onChange: (e)=>onMetadataChange({
                                            ...metadata,
                                            countryCode: e.target.value
                                        }),
                                    className: "w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "GB",
                                            children: "GB"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 393,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "US",
                                            children: "US"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 394,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "CA",
                                            children: "CA"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 395,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "AU",
                                            children: "AU"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 396,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "DE",
                                            children: "DE"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 397,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "FR",
                                            children: "FR"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 398,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 384,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                    children: [
                                        "Brand Name ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 404,
                                            columnNumber: 26
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: metadata.brandName,
                                    onChange: (e)=>onMetadataChange({
                                            ...metadata,
                                            brandName: e.target.value
                                        }),
                                    className: "w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600",
                                    placeholder: "e.g., Pond's"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 406,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 402,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                    children: [
                                        "Campaign Name ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 417,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 416,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: metadata.campaignName,
                                    onChange: (e)=>onMetadataChange({
                                            ...metadata,
                                            campaignName: e.target.value
                                        }),
                                    className: "w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600",
                                    placeholder: "e.g., Panacea-(Ponds)"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 419,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 415,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 357,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-700 dark:text-red-200 text-sm",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 431,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 430,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex justify-end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "primary",
                        onClick: onSubmit,
                        children: "Continue to File Upload →"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 436,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 435,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
            lineNumber: 349,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
        lineNumber: 348,
        columnNumber: 5
    }, this);
}
// Upload Step Component
function UploadStep({ blockingChartFile, trafficSheetFile, onBlockingChartSelect, onTrafficSheetSelect, onSubmit, onBack, isProcessing, error }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl mx-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-semibold text-slate-900 dark:text-white mb-4",
                    children: "Step 2: Upload Files"
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 468,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-600 dark:text-slate-400 text-sm mb-6",
                    children: "Upload at least one file: blocking chart and/or traffic sheet. The system will detect platforms automatically."
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 471,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$FileUpload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Blocking Chart (Optional)",
                            description: "Upload blocking chart Excel file",
                            selectedFile: blockingChartFile,
                            onFileSelect: onBlockingChartSelect
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 476,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$FileUpload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Traffic Sheet (Optional)",
                            description: "Upload traffic sheet from Traffic Sheet Generator",
                            selectedFile: trafficSheetFile,
                            onFileSelect: onTrafficSheetSelect
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 483,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 475,
                    columnNumber: 9
                }, this),
                isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex items-center justify-center gap-3 p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "animate-spin h-6 w-6 text-blue-600",
                            viewBox: "0 0 24 24",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 494,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 495,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 493,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-slate-700 dark:text-slate-300 font-medium",
                            children: "Processing files..."
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 497,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 492,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-700 dark:text-red-200 text-sm",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 505,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 504,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            variant: "outline",
                            onClick: onBack,
                            disabled: isProcessing,
                            children: "← Back"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 510,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            variant: "primary",
                            onClick: onSubmit,
                            disabled: isProcessing || !blockingChartFile && !trafficSheetFile,
                            children: "Generate Taxonomies →"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                            lineNumber: 513,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 509,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
            lineNumber: 467,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
        lineNumber: 466,
        columnNumber: 5
    }, this);
}
// Preview Step Component
function PreviewStep({ rows, platformBreakdown, onFieldChange, onBatchCopy, onExport, onStartOver, isProcessing, error }) {
    const validCount = rows.filter((r)=>r.inputFields.validationErrors.length === 0).length;
    const platformColors = {
        'TradeDesk': 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
        'DV360': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
        'Amazon DSP': 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
        'Meta': 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
        'Pinterest': 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
        'TikTok': 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
        'Snapchat': 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-slate-900 dark:text-white mb-4",
                        children: "Step 3: Review & Export"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 557,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 mb-4",
                        children: [
                            Object.entries(platformBreakdown).map(([platform, count])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `px-3 py-1 rounded-full border ${platformColors[platform] || 'bg-gray-50'} text-xs font-medium`,
                                    children: [
                                        platform,
                                        ": ",
                                        count
                                    ]
                                }, platform, true, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 562,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-1 rounded-full border bg-slate-50 text-xs font-medium",
                                children: [
                                    "Total: ",
                                    rows.length,
                                    " | ✓ Ready: ",
                                    validCount
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                lineNumber: 566,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 560,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                variant: "outline",
                                onClick: onBatchCopy,
                                disabled: isProcessing,
                                children: "Copy All"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                lineNumber: 572,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                variant: "primary",
                                onClick: onExport,
                                disabled: isProcessing || validCount === 0,
                                children: isProcessing ? 'Exporting...' : `Export to Excel (${validCount} ready)`
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                lineNumber: 575,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                variant: "outline",
                                onClick: onStartOver,
                                disabled: isProcessing,
                                children: "Start Over"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                lineNumber: 578,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 571,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                lineNumber: 556,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    style: {
                        maxHeight: 'calc(100vh - 400px)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-full divide-y divide-slate-200 dark:divide-slate-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "sticky top-0 z-10 bg-slate-100 dark:bg-slate-900",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 text-left text-xs font-medium uppercase",
                                            children: "#"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 590,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 text-left text-xs font-medium uppercase",
                                            children: "Platform"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 591,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 text-left text-xs font-medium uppercase",
                                            children: "Original Tactic"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 592,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 text-left text-xs font-medium uppercase min-w-[600px]",
                                            children: "Generated Taxonomies"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 593,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 text-left text-xs font-medium uppercase",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                            lineNumber: 594,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                    lineNumber: 589,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                lineNumber: 588,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-slate-200 dark:divide-slate-700",
                                children: rows.map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: row.inputFields.validationErrors.length > 0 ? 'bg-red-50 dark:bg-red-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-900/50',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-3 py-2 text-xs",
                                                children: idx + 1
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                lineNumber: 600,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-3 py-2 text-xs",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `px-2 py-1 rounded text-xs font-medium ${platformColors[row.platform] || 'bg-gray-50'}`,
                                                    children: row.platform
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                    lineNumber: 602,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                lineNumber: 601,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-3 py-2 text-xs",
                                                children: row.originalTactic
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                lineNumber: 606,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-3 py-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1 text-xs font-mono",
                                                    children: row.taxonomies.map((tax, taxIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "truncate",
                                                            title: tax.taxonomyString,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "text-slate-600 dark:text-slate-400",
                                                                    children: [
                                                                        tax.platformFieldName,
                                                                        ":"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                                    lineNumber: 611,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " ",
                                                                tax.taxonomyString || '(incomplete)'
                                                            ]
                                                        }, taxIdx, true, {
                                                            fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                            lineNumber: 610,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                    lineNumber: 608,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                lineNumber: 607,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-3 py-2 text-center",
                                                children: row.inputFields.validationErrors.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-green-600",
                                                    children: "✓"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                    lineNumber: 618,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-600",
                                                    title: row.inputFields.validationErrors.join(', '),
                                                    children: "⚠"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                    lineNumber: 620,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                        lineNumber: 599,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                                lineNumber: 597,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                        lineNumber: 587,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 586,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                lineNumber: 585,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-red-700 dark:text-red-200 text-sm",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                    lineNumber: 632,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
                lineNumber: 631,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/apps/taxonomy-generator/page.tsx",
        lineNumber: 554,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6f286ccf._.js.map