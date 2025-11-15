(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/web/core/ui/FileUpload.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FileUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function FileUpload({ label, accept = ".xlsx,.xls", onFileSelect, selectedFile, description }) {
    _s();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleFileChange = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };
    const handleClick = ()=>{
        inputRef.current?.click();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-slate-700 dark:text-slate-300",
                children: label
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-slate-500 dark:text-slate-400",
                children: description
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleClick,
                className: "border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    selectedFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-8 h-8 text-green-500",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium text-slate-900 dark:text-white",
                                        children: selectedFile.name
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "mx-auto h-12 w-12 text-slate-400",
                                stroke: "currentColor",
                                fill: "none",
                                viewBox: "0 0 48 48",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-600 dark:text-slate-400",
                                children: "Click to upload or drag and drop"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/FileUpload.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_s(FileUpload, "iD9XNNsNOlNDckBemnvlLS+aHYk=");
_c = FileUpload;
var _c;
__turbopack_context__.k.register(_c, "FileUpload");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/core/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/web/core/ui/Button.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/core/ui/UserBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function UserBadge({ userName, userRole, userClient, onChangeUser }) {
    _s();
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsExpanded(!isExpanded),
                className: "flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors",
                "aria-label": "User information",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-5 h-5 text-slate-600 dark:text-slate-300",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-slate-700 dark:text-slate-200 hidden sm:inline",
                        children: userName.split(" ")[0]
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`,
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-40",
                        onClick: ()=>setIsExpanded(false)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b border-slate-200 dark:border-slate-700",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-slate-900 dark:text-white truncate",
                                                    children: userName
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-600 dark:text-slate-400 truncate",
                                                    children: userRole
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/core/ui/UserBadge.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setIsExpanded(false);
                                        onChangeUser();
                                    },
                                    className: "w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_s(UserBadge, "FPNvbbHVlWWR4LKxxNntSxiIS38=");
_c = UserBadge;
var _c;
__turbopack_context__.k.register(_c, "UserBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/core/ui/UserManagementModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserManagementModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/userDirectory.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function UserManagementModal({ isOpen, onClose, onUserAdded, currentUserName }) {
    _s();
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("list");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [client, setClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isAdmin, setIsAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deletingUser, setDeletingUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const existingClients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllClients"])();
    const existingRoles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllRoles"])();
    const existingNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllUserNames"])();
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
            const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findUserByName"])(currentUserName);
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
    const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findUserByName"])(currentUserName);
    const isMasterAdmin = currentUser?.isMasterAdmin || false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-slate-200 dark:border-slate-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-slate-900 dark:text-white",
                                    children: viewMode === "list" ? "Manage Users" : "Add New User"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleClose,
                                    disabled: isSubmitting,
                                    className: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors disabled:opacity-50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-6 h-6",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                viewMode === "list" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-600 dark:text-slate-400",
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USERS"].length,
                                        " user",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USERS"].length !== 1 ? "s" : "",
                                        " in directory"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setViewMode("add"),
                                    className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 max-h-96 overflow-y-auto",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USERS"].map((user)=>{
                                const isCurrentUser = user.name === currentUserName;
                                const canDelete = isMasterAdmin || !user.isAdmin && !isCurrentUser;
                                const isDeleting = deletingUser === user.name;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-slate-900 dark:text-white",
                                                            children: [
                                                                user.name,
                                                                isCurrentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                        user.isMasterAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 rounded",
                                                            children: "Master Admin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 27
                                                        }, this),
                                                        user.isAdmin && !user.isMasterAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                        canDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleDeleteUser(user.name, user.client),
                                            disabled: isDeleting,
                                            className: "px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: isDeleting ? "Deleting..." : "Delete"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 239,
                                            columnNumber: 23
                                        }, this),
                                        !canDelete && !isCurrentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                viewMode === "add" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setViewMode("list"),
                            className: "mb-4 flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "name",
                                            className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                            children: "Full Name"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 284,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                            id: "existing-names",
                                            children: existingNames.map((nameOption)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "role",
                                            className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                            children: "Role"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 306,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                            id: "existing-roles",
                                            children: [
                                                ...new Set([
                                                    ...roleOptions,
                                                    ...existingRoles
                                                ])
                                            ].sort().map((roleOption)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "client",
                                            className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2",
                                            children: "Client"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/core/ui/UserManagementModal.tsx",
                                            lineNumber: 331,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                            id: "existing-clients",
                                            children: existingClients.map((clientOption)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findUserByName"])(currentUserName)?.isMasterAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
                                !(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$userDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findUserByName"])(currentUserName)?.isMasterAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(UserManagementModal, "C5/6n11dq1EPiVMDKzLLvUET36g=");
_c = UserManagementModal;
var _c;
__turbopack_context__.k.register(_c, "UserManagementModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/core/ui/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$AnalyticsProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/AnalyticsProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$UserBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/UserBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$UserManagementModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/UserManagementModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/localStorage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Header({ title, subtitle, showBackButton = false }) {
    _s();
    const userInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$AnalyticsProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showUserManagement, setShowUserManagement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSwitchUser = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearUserIdentity"])();
        window.location.reload();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-6 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    showBackButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-6 h-6",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold text-slate-900 dark:text-white",
                                                children: title
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/core/ui/Header.tsx",
                                                lineNumber: 54,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    userInfo?.isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowUserManagement(true),
                                                className: "px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2",
                                                title: "Manage Users",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/apps/analytics-dashboard",
                                                className: "px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                    userInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$UserBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            userInfo?.isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$UserManagementModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(Header, "suYDxgsatYSqlp6WAnmLWvADIY4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$AnalyticsProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/core/ui/TabPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TabPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/Button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function TabPicker({ tabs, onTabSelect, detectedTabIndex, isProcessing = false }) {
    _s();
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(detectedTabIndex ?? (tabs.length > 0 ? tabs[0].index : 0));
    const handleConfirm = ()=>{
        onTabSelect(selectedIndex);
    };
    if (tabs.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-700 dark:text-red-200 text-sm",
                children: "No worksheets found in the uploaded file."
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-amber-900 dark:text-amber-100",
                                children: "Select Worksheet Tab"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-amber-700 dark:text-amber-300 mt-1",
                                children: "We couldn't automatically detect the blocking chart template. Please select the correct worksheet tab from your Excel file."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: tabs.map((tab)=>{
                    const isSelected = selectedIndex === tab.index;
                    const hasTemplate = tab.hasValidTemplate;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: `
                flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all
                ${isSelected ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800"}
              `,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "radio",
                                name: "worksheet-tab",
                                value: tab.index,
                                checked: isSelected,
                                onChange: ()=>setSelectedIndex(tab.index),
                                className: "w-4 h-4 text-blue-600 focus:ring-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-slate-900 dark:text-white",
                                                children: tab.name
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                                lineNumber: 100,
                                                columnNumber: 19
                                            }, this),
                                            hasTemplate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded",
                                                title: "Valid template detected",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-3 h-3",
                                                        fill: "currentColor",
                                                        viewBox: "0 0 20 20",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            fillRule: "evenodd",
                                                            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                                            clipRule: "evenodd"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Template Detected"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                                lineNumber: 104,
                                                columnNumber: 21
                                            }, this),
                                            tab.isHidden && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded",
                                                title: "This worksheet is hidden in Excel",
                                                children: "Hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                                lineNumber: 119,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 mt-1 text-xs text-slate-600 dark:text-slate-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Tab ",
                                                    tab.index + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                                lineNumber: 128,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                                lineNumber: 129,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    tab.rowCount.toLocaleString(),
                                                    " rows"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                                lineNumber: 130,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this)
                        ]
                    }, tab.index, true, {
                        fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                        lineNumber: 76,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end pt-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "primary",
                    onClick: handleConfirm,
                    disabled: isProcessing,
                    className: "min-w-[180px]",
                    children: isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "animate-spin h-4 w-4",
                                viewBox: "0 0 24 24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        className: "opacity-25",
                                        cx: "12",
                                        cy: "12",
                                        r: "10",
                                        stroke: "currentColor",
                                        strokeWidth: "4",
                                        fill: "none"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        className: "opacity-75",
                                        fill: "currentColor",
                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this),
                            "Processing..."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                        lineNumber: 147,
                        columnNumber: 13
                    }, this) : "Continue with Selected Tab →"
                }, void 0, false, {
                    fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/core/ui/TabPicker.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(TabPicker, "hnwHKNhv3THAHAsQoD1CtYzRUAY=");
_c = TabPicker;
var _c;
__turbopack_context__.k.register(_c, "TabPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/core/analytics/brandDirectory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/core/analytics/tracker.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/localStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$brandDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/brandDirectory.ts [app-client] (ecmascript)");
;
;
async function trackEvent(toolName, action, metadata) {
    try {
        const identity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserIdentity"])();
        if (!identity) {
            console.warn('Cannot track event: User not identified');
            return false;
        }
        const sessionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSessionId"])();
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
        const identity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserIdentity"])();
        if (!identity) {
            console.warn('Cannot track file upload: User not identified');
            return false;
        }
        // Auto-detect brand name from filename if not provided
        const detectedBrand = metadata?.brand_name || (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$brandDirectory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractBrandFromFilename"])(file.name);
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
        const identity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserIdentity"])();
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/excel/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared configuration constants for Excel processing
 * Centralizes all magic numbers, field mappings, and hardcoded values
 * Used by both desktop and web implementations
 */ /**
 * Row Expansion Configuration
 * Defines the hierarchical structure: Campaign Line → Ad Groups → Creative Lines
 *
 * IMPORTANT: Ad group count is now DYNAMIC based on unique audience values
 * in the blocking chart, not hardcoded by platform
 */ __turbopack_context__.s([
    "AD_GROUP_DETECTION_CONFIG",
    ()=>AD_GROUP_DETECTION_CONFIG,
    "CAMPAIGN_LINE_DETECTION_CONFIG",
    ()=>CAMPAIGN_LINE_DETECTION_CONFIG,
    "CATEGORIZATION_CONFIG",
    ()=>CATEGORIZATION_CONFIG,
    "DATE_CONFIG",
    ()=>DATE_CONFIG,
    "DEMOGRAPHIC_CONFIG",
    ()=>DEMOGRAPHIC_CONFIG,
    "PARSING_CONFIG",
    ()=>PARSING_CONFIG,
    "ROW_EXPANSION_CONFIG",
    ()=>ROW_EXPANSION_CONFIG,
    "STYLE_CONFIG",
    ()=>STYLE_CONFIG,
    "TEMPLATE_CONFIG",
    ()=>TEMPLATE_CONFIG,
    "TRAFFIC_SHEET_CONFIG",
    ()=>TRAFFIC_SHEET_CONFIG,
    "VALIDATION_CONFIG",
    ()=>VALIDATION_CONFIG
]);
const ROW_EXPANSION_CONFIG = {
    // Always 5 creative lines per ad group
    CREATIVES_PER_AD_GROUP: 5,
    // Merge level definitions (which fields merge at which level in TRAFFIC SHEET)
    MERGE_LEVELS: {
        // Campaign-level fields: span all rows in traffic sheet (varies by ad group count)
        CAMPAIGN: [
            'channel',
            'platform',
            'mediaType',
            'objective',
            'startDate',
            'endDate',
            'grossBudget',
            'netBudget',
            'language',
            'placements',
            'buyType'
        ],
        // Ad Group-level fields: span 5 rows each (merged across creative lines)
        AD_GROUP: [
            'audience',
            'accuticsCampaignName',
            'targeting',
            'target',
            'kpi'
        ],
        // Creative-level fields: no merging (unique per row)
        CREATIVE: [
            'creativeName',
            'creativeFormat',
            'adFormat'
        ]
    },
    // Traffic sheet merge spans (for generation)
    AD_GROUP_MERGE_SPAN: 5,
    CREATIVE_MERGE_SPAN: 1
};
const DEMOGRAPHIC_CONFIG = {
    // Regex pattern to extract demographic codes from Target field
    // Matches patterns like: W25-49, M18-44, A18-65, F21-35
    // Format: [Gender/Age Code][Lower Age]-[Upper Age]
    DEMO_PATTERN: /\b([MWFA])(\d{2})-(\d{2})\b/g,
    // Gender/Age code mappings
    GENDER_CODES: {
        M: 'Men',
        W: 'Women',
        F: 'Women',
        A: 'Adults'
    },
    // Fallback if no demographic pattern found
    DEFAULT_DEMO: 'A18+'
};
const TRAFFIC_SHEET_CONFIG = {
    // Row expansion
    CREATIVES_PER_AD_GROUP: ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP,
    // Row positions
    HEADER_LABEL_ROW: 8,
    FIRST_DATA_ROW: 9,
    TEMPLATE_START_ROW: 9,
    // Header area (rows without borders)
    HEADER_AREA_START_ROW: 1,
    HEADER_AREA_END_ROW: 7,
    // Border configuration by tab
    BORDER_CONFIG: {
        'Brand Say Digital': {
            start: 2,
            end: 21,
            exclude: []
        },
        'Brand Say Social': {
            start: 2,
            end: 26,
            exclude: []
        },
        'Other Say Social': {
            start: 2,
            end: 24,
            exclude: []
        }
    }
};
const PARSING_CONFIG = {
    // Header detection
    MIN_HEADER_CELLS: 3,
    MAX_METADATA_ROWS: 10,
    // Required header keywords for validation
    REQUIRED_HEADER_KEYWORDS: [
        'channel',
        'platform',
        'objective'
    ],
    // Budget column exact matches (strict matching to avoid false positives)
    BUDGET_COLUMN_NAMES: [
        'Gross Budget',
        'Net Budget',
        'Gross Media Cost',
        'Media Cost',
        'Working Media Budget',
        'Budget'
    ],
    // Impressions column names for campaign line detection
    IMPRESSIONS_COLUMN_NAMES: [
        'Est. Impressions',
        'Estimated Impressions',
        'Impressions',
        'Impressions/GRPs'
    ],
    // Placements column name variations (try in order)
    PLACEMENTS_COLUMN_NAMES: [
        'Campaign Details - Placements',
        'Placements',
        'Placement'
    ],
    // Audience column name variations (for ad group detection)
    AUDIENCE_COLUMN_NAMES: [
        'Targeting',
        'Target',
        'Audience',
        'Target Audience'
    ],
    // Minimum fields for valid campaign line
    MIN_CAMPAIGN_LINE_FIELDS: 4
};
const CAMPAIGN_LINE_DETECTION_CONFIG = {
    // These columns MUST have matching merge spans to identify a campaign line
    REQUIRED_MERGE_COLUMNS: [
        'Est. Impressions',
        'Gross Budget',
        'Campaign Details - Placements'
    ],
    // Alternative budget columns to check if primary not found
    BUDGET_ALTERNATIVES: [
        'Net Budget',
        'Gross Media Cost',
        'Working Media Budget'
    ],
    // Patterns to exclude from campaign line detection (summary/total rows)
    EXCLUSION_PATTERNS: [
        'total',
        'subtotal',
        'summary',
        'variance',
        'grand total',
        'mpa budget'
    ]
};
const AD_GROUP_DETECTION_CONFIG = {
    // Primary field to group by for ad group detection
    PRIMARY_GROUPING_FIELD: 'audience',
    // Fallback fields if primary is empty
    FALLBACK_GROUPING_FIELDS: [
        'targeting',
        'target'
    ],
    // Default ad group name if all grouping fields are empty
    DEFAULT_AD_GROUP_NAME: 'Unspecified',
    // Minimum rows per ad group (if blocking chart has fewer, pad with empty creatives)
    MIN_ROWS_PER_AD_GROUP: 5,
    // Maximum rows per ad group (if blocking chart has more, create additional ad groups)
    MAX_ROWS_PER_AD_GROUP: 5
};
const CATEGORIZATION_CONFIG = {
    // Channel keywords for Brand Say Digital
    BRAND_SAY_DIGITAL_KEYWORDS: [
        'digital video',
        'digital display',
        'digital audio',
        'programmatic',
        'ctv',
        'audio',
        'ooh'
    ],
    // Social platform identifiers for Brand Say Social
    SOCIAL_PLATFORMS: [
        'meta',
        'facebook',
        'instagram',
        'fb',
        'ig',
        'tiktok',
        'tik tok',
        'pinterest',
        'pin',
        'reddit',
        'snapchat',
        'snap',
        'twitter',
        'x.com',
        'linkedin'
    ],
    // Influencer detection keywords for Other Say Social
    INFLUENCER_KEYWORDS: [
        'influencer',
        'creator'
    ],
    // Section header patterns (excluded from output)
    SECTION_HEADER_PATTERNS: [
        'digital video',
        'digital display',
        'digital audio',
        'paid social',
        'social',
        'video',
        'display',
        'audio'
    ],
    // Summary row patterns (excluded from tactics)
    SUMMARY_ROW_PATTERNS: [
        'mpa budget',
        'variance',
        'grand total'
    ],
    // Non-digital channels excluded from traffic sheet generation
    // These appear in verification but don't generate traffic sheet rows
    EXCLUDED_CHANNEL_KEYWORDS: {
        OOH: [
            'pattison',
            'astral',
            'out of home',
            'ooh',
            'billboard',
            'transit',
            'outdoor'
        ],
        TV: [
            'linear tv',
            'television',
            'broadcast tv',
            'tv broadcast',
            'linear television'
        ],
        RADIO: [
            'radio',
            'am/fm',
            'am fm'
        ],
        PRINT: [
            'print',
            'magazine',
            'newspaper',
            'press'
        ]
    }
};
const STYLE_CONFIG = {
    // Header labels that should preserve blue styling
    HEADER_LABELS: [
        'OBJECTIVE',
        'TACTIC',
        'PLATFORM',
        'DEMO',
        'TARGETING DETAILS'
    ],
    // Template text that should be cleared before writing data
    TEMPLATE_TEXT_TO_CLEAR: [
        'Accutics Campaign Name',
        'Audience',
        'Accutics Ad Set Name',
        'CREATIVE TYPE',
        'DEVICE',
        'GEO',
        'LANGUAGE',
        'START DATE',
        'END DATE',
        'KPI Metric'
    ],
    // Columns that should be merged vertically in traffic sheet blocks
    MERGEABLE_COLUMN_HEADERS: [
        'CREATIVE TYPE',
        'DEVICE',
        'GEO',
        'BUY TYPE',
        'BID TYPE',
        'AD SET BUDGET',
        'TARGETING SUMMARY',
        'CREATIVETYPE'
    ]
};
const VALIDATION_CONFIG = {
    // Required fields for a valid campaign line
    REQUIRED_CAMPAIGN_FIELDS: [
        'channel',
        'platform'
    ],
    // Numeric fields that should be validated
    NUMERIC_FIELDS: [
        'budget',
        'grossBudget',
        'netBudget',
        'estImpressions',
        'estCpm',
        'adServing',
        'dvCost',
        'buffer'
    ],
    // Date fields that should be validated
    DATE_FIELDS: [
        'startDate',
        'endDate'
    ]
};
const DATE_CONFIG = {
    // Month abbreviations for traffic sheet format (D-MMM-YY)
    // Example: "5-Jan-25" for January 5, 2025
    MONTH_NAMES: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]
};
const TEMPLATE_CONFIG = {
    // Minimum extended columns to qualify as "Extended" template
    MIN_EXTENDED_COLUMNS: 2,
    // Detection priority (higher number = higher priority)
    TEMPLATE_PRIORITY: {
        'unilever-extended': 2,
        'unilever-standard': 1
    },
    // Maximum rows to scan for headers when detecting template
    MAX_ROWS_TO_SCAN: 20,
    // Prefer first visible tab if valid template found
    PREFER_FIRST_VISIBLE: true,
    // Only show visible tabs in picker UI
    SHOW_HIDDEN_TABS: false
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/excel/utils/PlatformClassifier.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Platform Classifier Utility
 * Centralizes all platform-specific logic that was previously scattered across
 * parseBlockingChart.ts, generateTrafficSheet.ts, and trafficSheetWriter.ts
 */ __turbopack_context__.s([
    "getDefaultPlacements",
    ()=>getDefaultPlacements,
    "getExclusionReason",
    ()=>getExclusionReason,
    "getPlatformCategory",
    ()=>getPlatformCategory,
    "getTrafficSheetTab",
    ()=>getTrafficSheetTab,
    "isExcludedChannel",
    ()=>isExcludedChannel,
    "isProgrammaticPlatform",
    ()=>isProgrammaticPlatform,
    "isSocialPlatform",
    ()=>isSocialPlatform
]);
function getTrafficSheetTab(platform, channel, adFormat) {
    const platformLower = (platform || '').toLowerCase();
    const channelLower = (channel || '').toLowerCase();
    const adFormatLower = (adFormat || '').toLowerCase();
    // Step 1: Check channel for explicit "Other Say Social" or influencer/creator keywords
    if (channelLower.includes('other say social') || channelLower.includes('influencer') || channelLower.includes('creator')) {
        return 'Other Say Social';
    }
    // Step 2: Check if it's a social platform
    const isSocialPlatform = platformLower.includes('meta') || platformLower.includes('facebook') || platformLower.includes('instagram') || platformLower.includes('tiktok') || platformLower.includes('pinterest') || platformLower.includes('snapchat') || platformLower.includes('twitter') || platformLower.includes('x.com') || platformLower.includes('linkedin') || platformLower.includes('reddit');
    // Step 3: For social platforms, check ad format for influencer content
    if (isSocialPlatform) {
        if (adFormatLower.includes('influencer') || adFormatLower.includes('creator')) {
            return 'Other Say Social';
        }
        return 'Brand Say Social';
    }
    // Step 4: Everything else → Brand Say Digital (programmatic, display, video, audio)
    return 'Brand Say Digital';
}
function getPlatformCategory(platform) {
    const platformLower = (platform || '').toLowerCase();
    // Social platforms
    if (platformLower.includes('meta') || platformLower.includes('facebook') || platformLower.includes('instagram') || platformLower.includes('tiktok') || platformLower.includes('pinterest') || platformLower.includes('snapchat') || platformLower.includes('twitter') || platformLower.includes('linkedin') || platformLower.includes('reddit')) {
        return 'social';
    }
    // Influencer
    if (platformLower.includes('influencer') || platformLower.includes('creator')) {
        return 'influencer';
    }
    // Digital (programmatic, display, video, audio)
    return 'digital';
}
function getDefaultPlacements(platform, defaultValue = '') {
    const platformLower = (platform || '').toLowerCase();
    if (platformLower.includes('tiktok')) {
        return 'In-Feed';
    }
    if (platformLower.includes('meta') || platformLower.includes('facebook') || platformLower.includes('instagram')) {
        return 'Feeds, Stories, Reels';
    }
    if (platformLower.includes('pinterest')) {
        return defaultValue; // Pinterest uses ad format from creative line
    }
    if (platformLower.includes('snapchat')) {
        return 'Snap Ads | Story Ads';
    }
    if (platformLower.includes('linkedin')) {
        return 'Feed | Sponsored Content';
    }
    if (platformLower.includes('twitter') || platformLower.includes('x.com')) {
        return 'Timeline | Trends';
    }
    // For programmatic/digital, use the provided value or default
    return defaultValue;
}
function isExcludedChannel(channel) {
    const channelLower = (channel || '').toLowerCase();
    return channelLower.includes('ooh') || channelLower.includes('out of home') || channelLower.includes('outdoor') || channelLower.includes('tv') || channelLower.includes('television') || channelLower.includes('radio') || channelLower.includes('print') || channelLower.includes('newspaper') || channelLower.includes('magazine');
}
function getExclusionReason(channel) {
    const channelLower = (channel || '').toLowerCase();
    if (channelLower.includes('ooh') || channelLower.includes('out of home') || channelLower.includes('outdoor')) {
        return 'OOH (Out of Home) - planning only';
    }
    if (channelLower.includes('tv') || channelLower.includes('television')) {
        return 'TV - planning only';
    }
    if (channelLower.includes('radio')) {
        return 'Radio - planning only';
    }
    if (channelLower.includes('print') || channelLower.includes('newspaper') || channelLower.includes('magazine')) {
        return 'Print - planning only';
    }
    return undefined;
}
function isSocialPlatform(platform) {
    return getPlatformCategory(platform) === 'social';
}
function isProgrammaticPlatform(platform) {
    const platformLower = (platform || '').toLowerCase();
    return platformLower.includes('trade desk') || platformLower.includes('tradedesk') || platformLower.includes('dv360') || platformLower.includes('display & video 360') || platformLower.includes('amazon') || platformLower.includes('programmatic');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/excel/utils/FieldNormalizer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Field Normalizer Utility
 * Consolidates all field name normalization logic into a single function
 * Replaces scattered normalization across parseBlockingChart, generateTrafficSheet, and trafficSheetWriter
 */ /**
 * Normalize a field name to lowercase alphanumeric (camelCase style)
 * Removes special characters, spaces, and converts to camelCase
 *
 * Examples:
 *   "Campaign Details - Placements" → "campaigndetailsplacements"
 *   "Start Date" → "startdate"
 *   "Gross Budget" → "grossbudget"
 *   "Est. Impressions" → "estimpressions"
 *
 * @param name - Field name to normalize
 * @returns Normalized field name
 */ __turbopack_context__.s([
    "createFieldNameMap",
    ()=>createFieldNameMap,
    "normalizeFieldName",
    ()=>normalizeFieldName,
    "normalizeFieldNameCamelCase",
    ()=>normalizeFieldNameCamelCase
]);
function normalizeFieldName(name) {
    if (!name) return '';
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '') // Remove all non-alphanumeric characters
    .trim();
}
function normalizeFieldNameCamelCase(name) {
    if (!name) return '';
    const words = name.split(/[^a-zA-Z0-9]+/).filter((word)=>word.length > 0);
    if (words.length === 0) return '';
    return words[0].toLowerCase() + words.slice(1).map((word)=>word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
}
function createFieldNameMap(fieldNames) {
    const map = new Map();
    for (const name of fieldNames){
        const normalized = normalizeFieldName(name);
        if (normalized) {
            map.set(normalized, name);
        }
    }
    return map;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/excel/utils/FieldMapper.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Field Mapper Utility
 * Centralizes all field mappings between blocking chart columns and traffic sheet columns
 * Replaces scattered mapping logic across parseBlockingChart, generateTrafficSheet, and trafficSheetWriter
 */ __turbopack_context__.s([
    "BLOCKING_CHART_COLUMNS",
    ()=>BLOCKING_CHART_COLUMNS,
    "BLOCKING_CHART_FIELD_MAPPINGS",
    ()=>BLOCKING_CHART_FIELD_MAPPINGS,
    "CAMPAIGN_LINE_INDICATORS",
    ()=>CAMPAIGN_LINE_INDICATORS,
    "TRAFFIC_SHEET_FIELD_MAPPINGS",
    ()=>TRAFFIC_SHEET_FIELD_MAPPINGS,
    "buildColumnIndexMap",
    ()=>buildColumnIndexMap,
    "getInternalFieldName",
    ()=>getInternalFieldName,
    "getTrafficSheetColumnName",
    ()=>getTrafficSheetColumnName,
    "mapBlockingChartRowToInternal",
    ()=>mapBlockingChartRowToInternal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldNormalizer.ts [app-client] (ecmascript)");
;
const BLOCKING_CHART_COLUMNS = {
    // Core tactical information
    CHANNEL: 'Channel',
    PLATFORM: 'Platform',
    MEDIA_TYPE: 'Media type',
    BUY_TYPE: 'Buy Type',
    OBJECTIVE: 'Objective',
    // Campaign details
    PLACEMENTS: 'Campaign Details - Placements',
    ACCUTICS_CAMPAIGN_NAME: 'Accutics Campaign Name',
    TAGS_REQUIRED: 'Tags Required',
    MEASUREMENT: 'Measurement',
    LANGUAGE: 'Language',
    AD_FORMAT: 'Ad Format',
    // KPI information
    KPI: 'KPI',
    KPI_VALUE: 'KPI Value',
    TARGET: 'Target',
    TARGETING: 'Targeting',
    // Budget and metrics (campaign line identifiers)
    EST_CPM: 'Est. CPM',
    EST_IMPRESSIONS: 'Est. Impressions',
    GROSS_BUDGET: 'Gross Budget',
    NET_BUDGET: 'Net Budget',
    AD_SERVING: 'Ad Serving',
    DV_COST: 'DV Cost',
    BUFFER: 'Buffer (+30%)',
    // Flight dates
    START_DATE: 'Start Date',
    END_DATE: 'End Date'
};
const CAMPAIGN_LINE_INDICATORS = [
    'Est. Impressions',
    'Gross Budget',
    'Campaign Details - Placements' // Primary indicator (added for triple-merge detection)
];
const BLOCKING_CHART_FIELD_MAPPINGS = {
    // Core fields
    'Channel': 'channel',
    'Platform': 'platform',
    'Media type': 'mediaType',
    'Media Type': 'mediaType',
    'Buy Type': 'buyType',
    'Objective': 'objective',
    // Placements/Tactic variations
    'Campaign Details - Placements': 'placements',
    'Placements': 'placements',
    'Placement': 'placements',
    // Accutics naming
    'Accutics Campaign Name': 'accuticsCampaignName',
    // Metadata
    'Tags Required': 'tagsRequired',
    'Measurement': 'measurement',
    'Language': 'language',
    // Creative format
    'Ad Format': 'adFormat',
    'Creative Format': 'creativeFormat',
    // Targeting/KPI
    'KPI': 'kpi',
    'KPI Metric': 'kpi',
    'KPI Value': 'kpiValue',
    'Target': 'target',
    'Targeting': 'targeting',
    // Budget fields
    'Est. CPM': 'estCpm',
    'Estimated CPM': 'estCpm',
    'Estimated\nCPM': 'estCpm',
    'Est. Impressions': 'estImpressions',
    'Impressions/GRPs': 'estImpressions',
    'Gross Budget': 'grossBudget',
    'Gross Media Cost': 'grossBudget',
    'Net Budget': 'netBudget',
    'Working Media Budget': 'netBudget',
    'Media Cost': 'grossBudget',
    'Ad Serving': 'adServing',
    'DV Cost': 'dvCost',
    'Media Fee Total': 'mediaFeeTotal',
    'Buffer (+30%)': 'buffer',
    // Dates
    'Start Date': 'startDate',
    'End Date': 'endDate',
    // Additional fields
    'Learning Agenda': 'learningAgenda',
    'Primary Reporting KPI': 'primaryReportingKpi',
    'Demo': 'demo',
    'Tactic': 'tactic'
};
const TRAFFIC_SHEET_FIELD_MAPPINGS = {
    'Brand Say Digital': {
        // Campaign-level fields
        'platform': 'Platform',
        'startDate': 'Start Date',
        'endDate': 'End Date',
        'objective': 'Objective',
        'language': 'Language',
        'buyType': 'Buy Type',
        'demo': 'Demo',
        'placements': 'Tactic',
        'accuticsCampaignName': 'Accutics Campaign Name',
        'creativetype': 'Creative Type',
        'device': 'Device',
        'geo': 'Geo',
        // Ad group-level fields
        'audience': 'Audience',
        'accuticsAdSetName': 'Accutics Ad Set Name',
        'kpi': 'KPI Metric',
        'bidType': 'Bid Type',
        'optimizationEvent': 'Optimization Event',
        // Creative-level fields (blank for creative agency)
        'creativeName': 'Creative Name',
        'linkToCreative': 'Link to Creative',
        'postCopy': 'Post Copy',
        'headline': 'Headline'
    },
    'Brand Say Social': {
        // Campaign-level fields
        'platform': 'Platform',
        'startDate': 'Start Date',
        'endDate': 'End Date',
        'objective': 'Objective',
        'language': 'Language',
        'buyType': 'Buy Type',
        'placements': 'Campaign Name (Taxonomy from Accuitics)',
        'traffickingNotes': 'Trafficking Notes',
        // Ad group-level fields
        'audience': 'Audience',
        'adSetName': 'Ad Set Name (Taxonomy from Accuitics)',
        'targetingSummary': 'Targeting Summary',
        'adGroupPlacements': 'Placements',
        'bidType': 'Bid Type',
        'optimizationEvent': 'Optimization Event',
        // Creative-level fields (blank for creative agency)
        'creativeName': 'Creative Name',
        'linkToCreative': 'Link to Creative',
        'postCopy': 'Post Copy',
        'headline': 'Headline',
        'primaryText': 'Primary Text'
    },
    'Other Say Social': {
        // Campaign-level fields
        'platform': 'Platform',
        'startDate': 'Start Date',
        'endDate': 'End Date',
        'objective': 'Objective',
        'language': 'Language',
        'buyType': 'Buy Type',
        'placements': 'Campaign Name (Taxonomy from Accuitics)',
        'traffickingNotes': 'Trafficking Notes',
        // Ad group-level fields
        'audience': 'Audience',
        'adSetName': 'Ad Set Name (Taxonomy from Accuitics)',
        'targetingSummary': 'Targeting Summary',
        'adGroupPlacements': 'Placements',
        'bidType': 'Bid Type',
        'optimizationEvent': 'Optimization Event',
        // Creative-level fields
        'creativeName': 'Creative Name',
        'linkToCreative': 'Link to Creative',
        'postCopy': 'Post Copy',
        'headline': 'Headline'
    }
};
function getInternalFieldName(blockingChartColumn) {
    // Try direct mapping first
    if (BLOCKING_CHART_FIELD_MAPPINGS[blockingChartColumn]) {
        return BLOCKING_CHART_FIELD_MAPPINGS[blockingChartColumn];
    }
    // Try normalized lookup
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFieldName"])(blockingChartColumn);
    for (const [key, value] of Object.entries(BLOCKING_CHART_FIELD_MAPPINGS)){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFieldName"])(key) === normalized) {
            return value;
        }
    }
    return undefined;
}
function getTrafficSheetColumnName(internalFieldName, tab) {
    return TRAFFIC_SHEET_FIELD_MAPPINGS[tab][internalFieldName];
}
function buildColumnIndexMap(headers) {
    const map = new Map();
    headers.forEach((header, index)=>{
        if (header) {
            // Store both normalized and original for flexible lookup
            map.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFieldName"])(header), index);
            map.set(header, index);
        }
    });
    return map;
}
function mapBlockingChartRowToInternal(blockingChartRow, headers) {
    const mapped = {};
    headers.forEach((header, index)=>{
        const internalField = getInternalFieldName(header);
        if (internalField && blockingChartRow[header] !== undefined) {
            mapped[internalField] = blockingChartRow[header];
        }
    });
    return mapped;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/excel/trafficSheetWriter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Traffic Sheet Generator
 * Generates Excel traffic sheets from parsed blocking chart data
 * Handles categorization, merging, and formatting for all three tabs
 */ __turbopack_context__.s([
    "TrafficSheetGenerator",
    ()=>TrafficSheetGenerator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exceljs$2f$dist$2f$exceljs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/exceljs/dist/exceljs.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/PlatformClassifier.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldMapper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldNormalizer.ts [app-client] (ecmascript)");
;
;
;
;
;
class TrafficSheetGenerator {
    /**
   * Generate traffic sheet Excel workbook from parsed blocking chart
   *
   * @param parsedChart - Parsed blocking chart data
   * @param templateBuffer - Optional template file as ArrayBuffer
   * @returns Excel workbook with traffic sheets
   */ async generate(parsedChart, templateBuffer) {
        // Create or load workbook
        let workbook;
        if (templateBuffer) {
            // Load template workbook
            console.log('📄 Loading template workbook...');
            workbook = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exceljs$2f$dist$2f$exceljs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Workbook"]();
            await workbook.xlsx.load(templateBuffer);
            console.log('✅ Template loaded successfully');
            // Clear existing data rows (keep headers and formatting)
            await this.clearTemplateData(workbook);
        } else {
            // Create workbook from scratch (fallback)
            console.log('📄 Creating workbook from scratch (no template provided)');
            workbook = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exceljs$2f$dist$2f$exceljs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Workbook"]();
            await this.createWorkbookFromScratch(workbook);
        }
        // Categorize campaign lines by tab
        const categorized = this.categorizeCampaignLines(parsedChart.campaignLines);
        console.log(`📊 Categorization Results:`);
        console.log(`  Brand Say Digital: ${categorized['Brand Say Digital'].length} lines`);
        console.log(`  Brand Say Social: ${categorized['Brand Say Social'].length} lines`);
        console.log(`  Other Say Social: ${categorized['Other Say Social'].length} lines`);
        // Write each tab
        await this.writeTab(workbook, 'Brand Say Digital', categorized['Brand Say Digital']);
        await this.writeTab(workbook, 'Brand Say Social', categorized['Brand Say Social']);
        await this.writeTab(workbook, 'Other Say Social', categorized['Other Say Social']);
        return workbook;
    }
    /**
   * Clear template data rows while preserving headers and formatting
   */ async clearTemplateData(workbook) {
        const tabs = [
            'Brand Say Digital',
            'Brand Say Social',
            'Other Say Social'
        ];
        for (const tabName of tabs){
            const worksheet = workbook.getWorksheet(tabName);
            if (!worksheet) {
                console.warn(`⚠️  Template missing worksheet: ${tabName}`);
                continue;
            }
            // Delete all rows after the header row (row 8)
            const firstDataRow = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW;
            const lastRow = worksheet.rowCount;
            if (lastRow >= firstDataRow) {
                // Delete rows in reverse order to avoid index shifting
                for(let rowNum = lastRow; rowNum >= firstDataRow; rowNum--){
                    worksheet.spliceRows(rowNum, 1);
                }
                console.log(`  🧹 Cleared ${lastRow - firstDataRow + 1} data rows from ${tabName}`);
            }
        }
    }
    /**
   * Create workbook structure from scratch
   * Creates three worksheets with basic headers
   */ async createWorkbookFromScratch(workbook) {
        // Create three worksheets
        const bsdSheet = workbook.addWorksheet('Brand Say Digital');
        const bssSheet = workbook.addWorksheet('Brand Say Social');
        const ossSheet = workbook.addWorksheet('Other Say Social');
        // Set up basic headers (row 8)
        this.setupWorksheetHeaders(bsdSheet, 'Brand Say Digital');
        this.setupWorksheetHeaders(bssSheet, 'Brand Say Social');
        this.setupWorksheetHeaders(ossSheet, 'Other Say Social');
    }
    /**
   * Set up worksheet headers
   */ setupWorksheetHeaders(worksheet, tab) {
        const headerRow = worksheet.getRow(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].HEADER_LABEL_ROW);
        // Get field mappings for this tab
        const fieldMappings = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_FIELD_MAPPINGS"][tab];
        // Write headers
        let col = 1;
        for (const [internalName, displayName] of Object.entries(fieldMappings)){
            headerRow.getCell(col).value = displayName;
            col++;
        }
        headerRow.commit();
    }
    /**
   * Categorize campaign lines by traffic sheet tab
   */ categorizeCampaignLines(campaignLines) {
        const categorized = {
            'Brand Say Digital': [],
            'Brand Say Social': [],
            'Other Say Social': []
        };
        for (const campaignLine of campaignLines){
            // Skip excluded channels (OOH, TV, Radio, Print)
            if (campaignLine.isExcluded) {
                console.log(`⏭️  Skipping excluded campaign line: ${campaignLine.platform} / ${campaignLine.channel}`);
                continue;
            }
            // Determine which tab this campaign line belongs to
            const tab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTrafficSheetTab"])(campaignLine.platform, campaignLine.channel, campaignLine.adFormat);
            console.log(`📂 Categorizing: Platform="${campaignLine.platform}" Channel="${campaignLine.channel}" AdFormat="${campaignLine.adFormat}" → Tab="${tab}"`);
            categorized[tab].push(campaignLine);
        }
        return categorized;
    }
    /**
   * Write campaign lines to a worksheet tab
   */ async writeTab(workbook, tabName, campaignLines) {
        const worksheet = workbook.getWorksheet(tabName);
        if (!worksheet) {
            throw new Error(`Worksheet ${tabName} not found`);
        }
        // Get headers from row 8
        const headerRow = worksheet.getRow(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].HEADER_LABEL_ROW);
        const headers = [];
        headerRow.eachCell((cell, colNumber)=>{
            headers[colNumber - 1] = String(cell.value || '');
        });
        // Build column index map for fast lookup
        const columnMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildColumnIndexMap"])(headers);
        // Track current row position
        let currentRow = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW;
        // Track all merges to apply at the end
        const allMerges = [];
        // Write each campaign line
        for (const campaignLine of campaignLines){
            const merges = this.writeCampaignLine(worksheet, campaignLine, currentRow, tabName, columnMap);
            allMerges.push(...merges);
            // Calculate total rows for this campaign line
            const totalRows = campaignLine.adGroups.length * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP;
            currentRow += totalRows;
        }
        // Apply all merges
        this.applyMerges(worksheet, allMerges);
        // Apply borders
        this.applyBorders(worksheet, tabName, currentRow - 1);
        // Apply cell alignment (center horizontal, middle vertical)
        this.applyCellAlignment(worksheet, currentRow - 1);
        // Auto-size columns and rows
        this.autoSizeColumnsAndRows(worksheet, currentRow - 1);
    }
    /**
   * Write a single campaign line to worksheet
   * Returns merge information for later application
   */ writeCampaignLine(worksheet, campaignLine, startRow, tab, columnMap) {
        const merges = [];
        const totalRows = campaignLine.adGroups.length * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP;
        const endRow = startRow + totalRows - 1;
        // Write campaign-level fields (merge across all rows)
        const campaignFields = this.getCampaignLevelFields(campaignLine, tab);
        for (const [fieldName, value] of Object.entries(campaignFields)){
            const colIndex = this.getColumnIndex(columnMap, fieldName, tab);
            if (colIndex !== undefined) {
                // Write to first row
                const firstRow = worksheet.getRow(startRow);
                firstRow.getCell(colIndex + 1).value = value;
                // Add merge if more than 1 row
                if (totalRows > 1) {
                    merges.push({
                        startRow,
                        endRow,
                        startCol: colIndex + 1,
                        endCol: colIndex + 1
                    });
                }
            }
        }
        // Write ad groups
        let currentRow = startRow;
        for (const adGroup of campaignLine.adGroups){
            const adGroupMerges = this.writeAdGroup(worksheet, adGroup, campaignLine, currentRow, tab, columnMap);
            merges.push(...adGroupMerges);
            currentRow += __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP;
        }
        return merges;
    }
    /**
   * Write a single ad group (5 creative lines)
   */ writeAdGroup(worksheet, adGroup, campaignLine, startRow, tab, columnMap) {
        const merges = [];
        const endRow = startRow + __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP - 1;
        // Write ad group-level fields (merge across 5 rows)
        const adGroupFields = this.getAdGroupLevelFields(adGroup, campaignLine, tab);
        for (const [fieldName, value] of Object.entries(adGroupFields)){
            const colIndex = this.getColumnIndex(columnMap, fieldName, tab);
            if (colIndex !== undefined) {
                // Write to first row
                const firstRow = worksheet.getRow(startRow);
                firstRow.getCell(colIndex + 1).value = value;
                // Add merge for 5 rows
                merges.push({
                    startRow,
                    endRow,
                    startCol: colIndex + 1,
                    endCol: colIndex + 1
                });
            }
        }
        // Write creative lines (no merging)
        for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP; i++){
            const creative = adGroup.creativeLines[i];
            const rowNumber = startRow + i;
            const creativeFields = this.getCreativeLevelFields(creative);
            for (const [fieldName, value] of Object.entries(creativeFields)){
                const colIndex = this.getColumnIndex(columnMap, fieldName, tab);
                if (colIndex !== undefined) {
                    const row = worksheet.getRow(rowNumber);
                    row.getCell(colIndex + 1).value = value;
                }
            }
        }
        return merges;
    }
    /**
   * Get campaign-level field values
   */ getCampaignLevelFields(campaignLine, tab) {
        // Determine buy type based on platform and placements
        // Default is 'Auction' for all tactics, merged at campaign level
        // Exception: 'Reach & Frequency' only for TikTok Pulse placements
        let buyType = 'Auction';
        // Check if this is a TikTok Pulse buy
        const isTikTok = campaignLine.platform?.toLowerCase().includes('tiktok') || campaignLine.platform?.toLowerCase().includes('tik tok');
        const isPulse = campaignLine.placements?.toLowerCase().includes('pulse') || campaignLine.adGroups.some((ag)=>ag.placements?.toLowerCase().includes('pulse'));
        if (isTikTok && isPulse) {
            buyType = 'Reach & Frequency';
        }
        // Note: Do not use buyType from blocking chart - always use 'Auction' except for TikTok Pulse
        const fields = {
            platform: campaignLine.platform,
            startDate: this.formatDateForTrafficSheet(campaignLine.startDate),
            endDate: this.formatDateForTrafficSheet(campaignLine.endDate),
            objective: campaignLine.objective,
            language: campaignLine.language,
            buyType: buyType
        };
        // Tab-specific fields
        if (tab === 'Brand Say Digital') {
            fields.demo = this.extractDemographic(campaignLine.target);
            fields.placements = campaignLine.placements; // Maps to "Tactic" column
            fields.accuticsCampaignName = campaignLine.accuticsCampaignName;
        } else {
            // Social tabs
            fields.placements = campaignLine.accuticsCampaignName; // Maps to "Campaign Name (Taxonomy from Accuitics)"
            // Platform-specific placements (campaign level - merged by platform across ad groups)
            fields.adGroupPlacements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultPlacements"])(campaignLine.platform, campaignLine.adGroups[0]?.placements || '');
            // Build trafficking notes
            const notes = [];
            if (campaignLine.tagsRequired) {
                notes.push(`Tags Required: ${campaignLine.tagsRequired}`);
            }
            if (campaignLine.adGroups[0]?.measurement) {
                notes.push(`Measurement: ${campaignLine.adGroups[0].measurement}`);
            }
            fields.traffickingNotes = notes.join('\n');
        }
        return fields;
    }
    /**
   * Get ad group-level field values
   */ getAdGroupLevelFields(adGroup, campaignLine, tab) {
        const fields = {
            audience: adGroup.audience,
            kpi: adGroup.kpi,
            bidType: 'Lowest Cost'
        };
        // Tab-specific fields
        if (tab === 'Brand Say Digital') {
            fields.accuticsAdSetName = adGroup.accuticsCampaignName;
        } else {
            // Social tabs
            fields.adSetName = adGroup.accuticsCampaignName;
        }
        return fields;
    }
    /**
   * Get creative-level field values
   */ getCreativeLevelFields(creative) {
        // Creative fields are typically left blank for creative agency to fill
        return {
            creativeName: creative.creativeName || '',
            linkToCreative: '',
            postCopy: '',
            headline: '',
            optimizationEvent: ''
        };
    }
    /**
   * Format date from blocking chart to traffic sheet format
   * Example: "2025-01-05" → "5-Jan-25"
   * Parses the date string directly to avoid timezone conversion issues
   */ formatDateForTrafficSheet(dateString) {
        if (!dateString) return '';
        try {
            // Parse YYYY-MM-DD format directly without creating a Date object
            const parts = dateString.split('-');
            if (parts.length !== 3) return dateString;
            const year = parts[0];
            const monthIndex = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const monthName = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DATE_CONFIG"].MONTH_NAMES[monthIndex] || '';
            const yearShort = year.slice(-2);
            return `${day}-${monthName}-${yearShort}`;
        } catch (error) {
            return dateString; // Return original if parsing fails
        }
    }
    /**
   * Extract demographic code from target field
   * Example: "W25-49" from "Women 25-49 years old"
   */ extractDemographic(target) {
        if (!target) return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEFAULT_DEMO;
        const match = target.match(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEMO_PATTERN);
        if (match) {
            return match[0]; // Return first match (e.g., "W25-49")
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEFAULT_DEMO;
    }
    /**
   * Get column index from map (try multiple variations)
   */ getColumnIndex(columnMap, fieldName, tab) {
        // First, map the internal field name to the traffic sheet column name
        const fieldMappings = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_FIELD_MAPPINGS"][tab];
        const targetColumnName = fieldMappings[fieldName] || fieldName;
        // Try exact match first
        if (columnMap.has(targetColumnName)) {
            return columnMap.get(targetColumnName);
        }
        // Try normalized match
        const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFieldName"])(targetColumnName);
        return columnMap.get(normalized);
    }
    /**
   * Apply all merge operations to worksheet
   */ applyMerges(worksheet, merges) {
        for (const merge of merges){
            try {
                worksheet.mergeCells(merge.startRow, merge.startCol, merge.endRow, merge.endCol);
            } catch (error) {
                // Merge may already exist or be invalid, skip
                console.warn(`Failed to merge cells: ${error.message}`);
            }
        }
    }
    /**
   * Apply borders to data region
   */ applyBorders(worksheet, tab, lastRow) {
        const borderConfig = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].BORDER_CONFIG[tab];
        if (!borderConfig) return;
        const borderStyle = {
            style: 'thin',
            color: {
                argb: 'FF000000'
            }
        };
        // Apply borders to data region
        for(let row = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW; row <= lastRow; row++){
            for(let col = borderConfig.start; col <= borderConfig.end; col++){
                const cell = worksheet.getRow(row).getCell(col);
                cell.border = {
                    top: borderStyle,
                    left: borderStyle,
                    bottom: borderStyle,
                    right: borderStyle
                };
            }
        }
    }
    /**
   * Apply center horizontal and middle vertical alignment to all cells
   */ applyCellAlignment(worksheet, lastRow) {
        // Apply alignment to all data rows (starting from first data row)
        for(let rowNum = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW; rowNum <= lastRow; rowNum++){
            const row = worksheet.getRow(rowNum);
            row.eachCell((cell)=>{
                cell.alignment = {
                    horizontal: 'center',
                    vertical: 'middle',
                    wrapText: true
                };
            });
        }
        // Also apply alignment to header row
        const headerRow = worksheet.getRow(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].HEADER_LABEL_ROW);
        headerRow.eachCell((cell)=>{
            cell.alignment = {
                horizontal: 'center',
                vertical: 'middle',
                wrapText: true
            };
        });
    }
    /**
   * Auto-size columns and rows to fit content
   */ autoSizeColumnsAndRows(worksheet, lastRow) {
        // Auto-size columns based on content
        worksheet.columns.forEach((column, index)=>{
            if (!column) return;
            let maxLength = 0;
            const columnNumber = index + 1;
            // Check header row
            const headerCell = worksheet.getRow(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].HEADER_LABEL_ROW).getCell(columnNumber);
            if (headerCell.value) {
                maxLength = String(headerCell.value).length;
            }
            // Check all data rows
            for(let rowNum = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW; rowNum <= lastRow; rowNum++){
                const cell = worksheet.getRow(rowNum).getCell(columnNumber);
                if (cell.value) {
                    const cellLength = String(cell.value).length;
                    if (cellLength > maxLength) {
                        maxLength = cellLength;
                    }
                }
            }
            // Set column width with some padding (minimum 10, maximum 50)
            column.width = Math.min(Math.max(maxLength + 2, 10), 50);
        });
        // Auto-size rows (set minimum height for better visibility)
        for(let rowNum = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW; rowNum <= lastRow; rowNum++){
            const row = worksheet.getRow(rowNum);
            // Set minimum row height to 20 for better visibility
            row.height = Math.max(row.height || 0, 20);
        }
        // Set header row height
        const headerRow = worksheet.getRow(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].HEADER_LABEL_ROW);
        headerRow.height = Math.max(headerRow.height || 0, 25);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/excel/parser/BlockingChartParser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Blocking Chart Parser
 * Parses Excel blocking charts and builds hierarchical campaign line structure
 * with dynamic ad group detection based on audience values
 */ __turbopack_context__.s([
    "BlockingChartParser",
    ()=>BlockingChartParser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exceljs$2f$dist$2f$exceljs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/exceljs/dist/exceljs.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldMapper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldNormalizer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/PlatformClassifier.ts [app-client] (ecmascript)");
;
;
;
;
;
class BlockingChartParser {
    validationWarnings = [];
    /**
   * Parse blocking chart Excel file into structured campaign lines
   *
   * @param fileBuffer - ArrayBuffer containing the Excel file data
   * @returns Parsed blocking chart with hierarchical campaign line structure
   */ async parse(fileBuffer) {
        this.validationWarnings = [];
        // Load workbook
        const workbook = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exceljs$2f$dist$2f$exceljs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Workbook"]();
        await workbook.xlsx.load(fileBuffer);
        // Get first worksheet
        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
            throw new Error('No worksheets found in blocking chart');
        }
        // Find header row and extract headers
        const { headerRow, headers } = this.findHeaderRow(worksheet);
        if (!headerRow || headers.length === 0) {
            throw new Error('Could not find header row in blocking chart');
        }
        // Extract metadata from rows above header
        const metadata = this.extractMetadata(worksheet, headerRow);
        // Detect campaign lines by finding merged cells
        const campaignLineRanges = this.detectCampaignLines(worksheet, headerRow, headers);
        if (campaignLineRanges.length === 0) {
            this.addWarning('warning', 'No campaign lines detected in blocking chart', undefined, undefined);
        }
        // Build campaign lines with audience-based ad group detection
        const campaignLines = this.buildCampaignLines(worksheet, headers, campaignLineRanges, headerRow);
        return {
            headers,
            campaignLines,
            validationWarnings: this.validationWarnings,
            metadata
        };
    }
    /**
   * Find header row in worksheet
   * Header row contains column names like "Channel", "Platform", etc.
   */ findHeaderRow(worksheet) {
        const maxRows = Math.min(worksheet.rowCount, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARSING_CONFIG"].MAX_METADATA_ROWS + 5);
        for(let rowNumber = 1; rowNumber <= maxRows; rowNumber++){
            const row = worksheet.getRow(rowNumber);
            const values = [];
            let nonEmptyCount = 0;
            row.eachCell({
                includeEmpty: false
            }, (cell, colNumber)=>{
                const value = String(cell.value || '').trim();
                values[colNumber - 1] = value;
                if (value) nonEmptyCount++;
            });
            // Check if this row has enough non-empty cells and contains required keywords
            if (nonEmptyCount >= __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARSING_CONFIG"].MIN_HEADER_CELLS) {
                const normalizedValues = values.map((v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFieldName"])(v));
                const hasRequiredKeywords = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARSING_CONFIG"].REQUIRED_HEADER_KEYWORDS.every((keyword)=>normalizedValues.some((v)=>v.includes(keyword)));
                if (hasRequiredKeywords) {
                    return {
                        headerRow: rowNumber,
                        headers: values
                    };
                }
            }
        }
        throw new Error('Header row not found in blocking chart');
    }
    /**
   * Extract metadata from rows above header (campaign name, client, etc.)
   */ extractMetadata(worksheet, headerRow) {
        const metadata = {};
        // Scan rows above header for metadata
        for(let rowNumber = 1; rowNumber < headerRow; rowNumber++){
            const row = worksheet.getRow(rowNumber);
            const firstCell = row.getCell(1).value;
            const secondCell = row.getCell(2).value;
            const label = String(firstCell || '').toLowerCase().trim();
            const value = String(secondCell || '').trim();
            if (label.includes('campaign') && value) {
                metadata.campaignName = value;
            } else if (label.includes('client') && value) {
                metadata.client = value;
            } else if (label.includes('brand') && value) {
                metadata.brand = value;
            } else if (label.includes('date') && value) {
                metadata.dateRange = value;
            }
        }
        return metadata;
    }
    /**
   * Detect campaign lines by finding merged cells across budget, impressions, and placements columns
   * A campaign line is identified when these three columns are merged together
   */ detectCampaignLines(worksheet, headerRow, headers) {
        // Find column indexes for the three required merge indicators
        const budgetColIndex = this.findColumnIndex(headers, [
            'Gross Budget',
            'Net Budget',
            'Media Cost',
            'Working Media Budget'
        ]);
        const impressionsColIndex = this.findColumnIndex(headers, [
            'Est. Impressions',
            'Impressions/GRPs',
            'Impressions'
        ]);
        const placementsColIndex = this.findColumnIndex(headers, [
            'Campaign Details - Placements',
            'Placements'
        ]);
        console.log('🔍 Column Detection:');
        console.log('  Budget column index:', budgetColIndex);
        console.log('  Impressions column index:', impressionsColIndex);
        console.log('  Placements column index:', placementsColIndex);
        console.log('  Available headers:', headers.filter((h)=>h));
        if (budgetColIndex === -1 || impressionsColIndex === -1 || placementsColIndex === -1) {
            this.addWarning('error', `Required columns not found - Budget: ${budgetColIndex}, Impressions: ${impressionsColIndex}, Placements: ${placementsColIndex}`, undefined, undefined);
            return [];
        }
        // Collect all merge ranges for these columns
        const budgetMerges = new Map(); // masterRow → span
        const impressionsMerges = new Map();
        const placementsMerges = new Map();
        // Helper function to get column letter from index
        const getColumnLetter = (index)=>{
            let letter = '';
            let temp = index;
            while(temp >= 0){
                letter = String.fromCharCode(65 + temp % 26) + letter;
                temp = Math.floor(temp / 26) - 1;
            }
            return letter;
        };
        // ExcelJS exposes merged cells through worksheet.model.merges
        // Merges are stored as strings like "A1:A5"
        const merges = worksheet.model?.merges || [];
        console.log(`📋 Total merge cells found: ${merges.length}`);
        for (const mergeRange of merges){
            // Parse merge range (e.g., "A1:A5")
            const match = mergeRange.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
            if (!match) continue;
            const startCol = match[1];
            const startRow = parseInt(match[2]);
            const endCol = match[3];
            const endRow = parseInt(match[4]);
            const span = endRow - startRow + 1;
            // Skip if merge is in header or only 1 row
            if (startRow <= headerRow || span <= 1) continue;
            // Check if this merge is in one of our target columns
            const budgetCol = getColumnLetter(budgetColIndex);
            const impressionsCol = getColumnLetter(impressionsColIndex);
            const placementsCol = getColumnLetter(placementsColIndex);
            if (startCol === budgetCol && endCol === budgetCol) {
                budgetMerges.set(startRow, span);
            }
            if (startCol === impressionsCol && endCol === impressionsCol) {
                impressionsMerges.set(startRow, span);
            }
            if (startCol === placementsCol && endCol === placementsCol) {
                placementsMerges.set(startRow, span);
            }
        }
        // Find matching merges (all three columns merged with same span at same master row)
        const campaignLineRanges = [];
        console.log(`🔗 Budget merges found: ${budgetMerges.size}`);
        console.log('   Budget merge rows:', Array.from(budgetMerges.keys()));
        console.log(`🔗 Impressions merges found: ${impressionsMerges.size}`);
        console.log('   Impressions merge rows:', Array.from(impressionsMerges.keys()));
        console.log(`🔗 Placements merges found: ${placementsMerges.size}`);
        console.log('   Placements merge rows:', Array.from(placementsMerges.keys()));
        // Strategy 1: Find triple-merged campaign lines (2+ ad groups)
        for (const [masterRow, budgetSpan] of budgetMerges.entries()){
            const impressionsSpan = impressionsMerges.get(masterRow);
            const placementsSpan = placementsMerges.get(masterRow);
            // All three must match to be a valid campaign line
            if (impressionsSpan === budgetSpan && placementsSpan === budgetSpan) {
                // Verify this is not a summary/total row
                if (!this.isSummaryRow(worksheet, masterRow, headers)) {
                    campaignLineRanges.push({
                        masterRow,
                        span: budgetSpan,
                        endRow: masterRow + budgetSpan - 1
                    });
                }
            }
        }
        // Strategy 2: Find single-row campaign lines (1 ad group - no merges)
        // Look for data rows that have budget, impressions, and placements filled but not merged
        const detectedRows = new Set(campaignLineRanges.flatMap((r)=>Array.from({
                length: r.span
            }, (_, i)=>r.masterRow + i)));
        const lastDataRow = Math.min(worksheet.rowCount, headerRow + 100);
        console.log(`🔍 Scanning rows ${headerRow + 1} to ${lastDataRow} for single-row campaign lines...`);
        for(let rowNum = headerRow + 1; rowNum <= lastDataRow; rowNum++){
            // Skip if already detected as part of a merged campaign line
            if (detectedRows.has(rowNum)) continue;
            const row = worksheet.getRow(rowNum);
            const budgetValue = row.getCell(budgetColIndex + 1).value;
            const impressionsValue = row.getCell(impressionsColIndex + 1).value;
            const placementsValue = row.getCell(placementsColIndex + 1).value;
            // Check if this row has all three key values filled
            if (budgetValue && impressionsValue && placementsValue) {
                // Skip rows that look like headers (values match header text)
                const budgetStr = String(budgetValue).trim().toLowerCase();
                const impressionsStr = String(impressionsValue).trim().toLowerCase();
                const placementsStr = String(placementsValue).trim().toLowerCase();
                const isHeaderRow = budgetStr.includes('budget') || budgetStr.includes('cost') || impressionsStr.includes('impression') || impressionsStr.includes('grp') || placementsStr.includes('placement');
                if (isHeaderRow) {
                    console.log(`  ⏭️  Skipping header-like row at ${rowNum}`);
                    continue;
                }
                // Verify this is not a summary/total row
                if (!this.isSummaryRow(worksheet, rowNum, headers)) {
                    console.log(`  ✅ Found single-row campaign line at row ${rowNum}`);
                    campaignLineRanges.push({
                        masterRow: rowNum,
                        span: 1,
                        endRow: rowNum
                    });
                    detectedRows.add(rowNum);
                }
            }
        }
        return campaignLineRanges.sort((a, b)=>a.masterRow - b.masterRow);
    }
    /**
   * Check if a row is a summary/total row (should be excluded)
   */ isSummaryRow(worksheet, rowNumber, headers) {
        const row = worksheet.getRow(rowNumber);
        const values = {};
        headers.forEach((header, index)=>{
            const cell = row.getCell(index + 1);
            values[header] = cell.value;
        });
        // Check for exclusion patterns in text fields
        const textFields = [
            values['Channel'],
            values['Platform'],
            values['Campaign Details - Placements']
        ];
        const textContent = textFields.filter((v)=>v).map((v)=>String(v).toLowerCase()).join(' ');
        for (const pattern of __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAMPAIGN_LINE_DETECTION_CONFIG"].EXCLUSION_PATTERNS){
            if (textContent.includes(pattern)) {
                return true;
            }
        }
        return false;
    }
    /**
   * Build campaign lines with audience-based ad group detection
   */ buildCampaignLines(worksheet, headers, campaignLineRanges, headerRow) {
        const campaignLines = [];
        for(let index = 0; index < campaignLineRanges.length; index++){
            const range = campaignLineRanges[index];
            try {
                const campaignLine = this.buildCampaignLine(worksheet, headers, range, index);
                campaignLines.push(campaignLine);
            } catch (error) {
                this.addWarning('error', `Failed to parse campaign line at row ${range.masterRow}: ${error.message}`, undefined, range.masterRow);
            }
        }
        return campaignLines;
    }
    /**
   * Build a single campaign line with dynamic ad group detection
   */ buildCampaignLine(worksheet, headers, range, campaignLineIndex) {
        // Extract all rows in this campaign line
        const rows = [];
        for(let rowNum = range.masterRow; rowNum <= range.endRow; rowNum++){
            const rowData = this.extractRowData(worksheet, rowNum, headers);
            rows.push(rowData);
        }
        // Get campaign-level data from first row
        const firstRow = rows[0];
        // Detect ad groups by grouping rows by audience
        const adGroups = this.detectAdGroupsByAudience(rows, headers);
        // Build campaign line
        const campaignLine = {
            // Campaign-level fields (from first row)
            channel: firstRow.channel || '',
            platform: firstRow.platform || '',
            mediaType: firstRow.mediaType,
            objective: firstRow.objective || '',
            language: firstRow.language,
            target: firstRow.target,
            startDate: firstRow.startDate || '',
            endDate: firstRow.endDate || '',
            // Budget information
            grossBudget: firstRow.grossBudget,
            netBudget: firstRow.netBudget,
            estImpressions: firstRow.estImpressions,
            estCpm: firstRow.estCpm,
            adServing: firstRow.adServing,
            dvCost: firstRow.dvCost,
            buffer: firstRow.buffer,
            // Campaign-level placements and naming
            placements: firstRow.placements,
            accuticsCampaignName: firstRow.accuticsCampaignName,
            // Additional metadata
            adFormat: firstRow.adFormat,
            buyType: firstRow.buyType,
            tagsRequired: firstRow.tagsRequired,
            // Exclusion check
            isExcluded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExcludedChannel"])(firstRow.channel || ''),
            excludedReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExclusionReason"])(firstRow.channel || ''),
            // Ad groups (dynamically detected)
            adGroups,
            // Validation warnings
            validationWarnings: [],
            // Tracking metadata
            _sourceRowNumbers: Array.from({
                length: range.span
            }, (_, i)=>range.masterRow + i),
            blockingChartRowCount: range.span,
            stableIndex: campaignLineIndex
        };
        // Validate campaign line
        this.validateCampaignLine(campaignLine);
        return campaignLine;
    }
    /**
   * Detect ad groups by grouping rows by audience field
   * Each unique audience value = 1 ad group with 5 creative lines
   */ detectAdGroupsByAudience(rows, headers) {
        // Find audience column
        const audienceField = this.findAudienceField(rows);
        // Group rows by audience value
        const rowsByAudience = new Map();
        for (const row of rows){
            const audienceValue = row[audienceField] || __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AD_GROUP_DETECTION_CONFIG"].DEFAULT_AD_GROUP_NAME;
            if (!rowsByAudience.has(audienceValue)) {
                rowsByAudience.set(audienceValue, []);
            }
            rowsByAudience.get(audienceValue).push(row);
        }
        // Build ad groups
        const adGroups = [];
        for (const [audienceName, audienceRows] of rowsByAudience.entries()){
            const adGroup = this.buildAdGroup(audienceName, audienceRows);
            adGroups.push(adGroup);
        }
        return adGroups;
    }
    /**
   * Find which field to use for audience grouping
   */ findAudienceField(rows) {
        // Try primary field first
        if (rows.some((r)=>r[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AD_GROUP_DETECTION_CONFIG"].PRIMARY_GROUPING_FIELD])) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AD_GROUP_DETECTION_CONFIG"].PRIMARY_GROUPING_FIELD;
        }
        // Try fallback fields
        for (const field of __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AD_GROUP_DETECTION_CONFIG"].FALLBACK_GROUPING_FIELDS){
            if (rows.some((r)=>r[field])) {
                return field;
            }
        }
        // Default to primary
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AD_GROUP_DETECTION_CONFIG"].PRIMARY_GROUPING_FIELD;
    }
    /**
   * Build a single ad group with exactly 5 creative lines
   */ buildAdGroup(audienceName, audienceRows) {
        // Get ad group-level data from first row
        const firstRow = audienceRows[0];
        // Always create exactly 5 creative lines
        const creativeLines = [];
        for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP; i++){
            const sourceRow = audienceRows[i] || {}; // Use empty object if fewer than 5 rows
            creativeLines.push({
                creativeName: sourceRow.creativeName,
                creativeFormat: sourceRow.creativeFormat,
                adFormat: sourceRow.adFormat
            });
        }
        return {
            // Ad group-level fields
            audience: audienceName,
            accuticsCampaignName: firstRow.accuticsCampaignName,
            targeting: firstRow.targeting,
            target: firstRow.target,
            kpi: firstRow.kpi,
            kpiValue: firstRow.kpiValue,
            placements: firstRow.placements,
            measurement: firstRow.measurement,
            // Creative lines (always 5)
            creativeLines
        };
    }
    /**
   * Extract row data and map to internal field names
   */ extractRowData(worksheet, rowNumber, headers) {
        const row = worksheet.getRow(rowNumber);
        const data = {};
        headers.forEach((header, index)=>{
            if (!header) return;
            const cell = row.getCell(index + 1);
            const internalField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalFieldName"])(header);
            if (internalField) {
                let value = cell.value;
                // Handle date formatting
                // Excel stores dates as serial numbers (days since 1900-01-01) with no timezone info
                // ExcelJS converts these to JavaScript Date objects
                // To avoid timezone boundary issues, we add 12 hours before extracting date components
                // This ensures we're safely in the middle of the calendar day regardless of timezone
                if (value instanceof Date) {
                    // Add 12 hours (43200000 ms) to avoid timezone boundary issues
                    // If date is at midnight (any timezone), adding 12 hours keeps us on the same calendar day
                    const safeDate = new Date(value.getTime() + 12 * 60 * 60 * 1000);
                    // Extract UTC date components from the safe date
                    const year = safeDate.getUTCFullYear();
                    const month = String(safeDate.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(safeDate.getUTCDate()).padStart(2, '0');
                    value = `${year}-${month}-${day}`;
                } else if (typeof value === 'object' && value !== null) {
                    // Handle Excel rich text
                    value = value.text || String(value);
                }
                data[internalField] = value;
            }
        });
        return data;
    }
    /**
   * Find column index by trying multiple possible names
   */ findColumnIndex(headers, possibleNames) {
        for (const name of possibleNames){
            const index = headers.findIndex((h)=>h === name);
            if (index !== -1) return index;
        }
        // Try normalized matching
        const normalizedPossibleNames = possibleNames.map((n)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFieldName"])(n));
        for(let i = 0; i < headers.length; i++){
            const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFieldName"])(headers[i]);
            if (normalizedPossibleNames.includes(normalized)) {
                return i;
            }
        }
        return -1;
    }
    /**
   * Validate campaign line and add warnings
   */ validateCampaignLine(campaignLine) {
        // Check required fields
        if (!campaignLine.channel) {
            campaignLine.validationWarnings = campaignLine.validationWarnings || [];
            campaignLine.validationWarnings.push({
                severity: 'warning',
                message: 'Missing channel',
                field: 'channel'
            });
        }
        if (!campaignLine.platform) {
            campaignLine.validationWarnings = campaignLine.validationWarnings || [];
            campaignLine.validationWarnings.push({
                severity: 'warning',
                message: 'Missing platform',
                field: 'platform'
            });
        }
        if (!campaignLine.startDate || !campaignLine.endDate) {
            campaignLine.validationWarnings = campaignLine.validationWarnings || [];
            campaignLine.validationWarnings.push({
                severity: 'warning',
                message: 'Missing start or end date',
                field: 'dates'
            });
        }
        if (campaignLine.adGroups.length === 0) {
            campaignLine.validationWarnings = campaignLine.validationWarnings || [];
            campaignLine.validationWarnings.push({
                severity: 'error',
                message: 'No ad groups detected'
            });
        }
    }
    /**
   * Add validation warning to global warnings list
   */ addWarning(severity, message, field, rowNumber) {
        this.validationWarnings.push({
            severity,
            message,
            field,
            rowNumber
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/excel/blockingChartTemplates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blockingChartTemplates",
    ()=>blockingChartTemplates,
    "detectBlockingChartTemplate",
    ()=>detectBlockingChartTemplate,
    "getMappedFieldName",
    ()=>getMappedFieldName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-client] (ecmascript)");
;
const blockingChartTemplates = [
    {
        id: "unilever-standard",
        name: "Unilever Standard",
        description: "Standard Unilever blocking chart format",
        columnMappings: {
            "Channel": "channel",
            "Tactic": "tactic",
            "Platform": "platform",
            "Objective": "objective",
            "Placements": "placements",
            "Optimization KPI": "optimizationKpi",
            "Demo": "demo",
            "Targeting": "targeting",
            "Language": "language",
            "Accutics Campaign Name": "accuticsCampaignName",
            "Accutics Ad Set Name": "accuticsAdSetName",
            "CPM/CPP": "cpmCpp",
            "Impressions/GRPs": "impressionsGrps",
            "Start Date": "startDate",
            "End Date": "endDate",
            "Media Cost": "mediaCost",
            "Ad Serving": "adServing",
            "DV Cost": "dvCost",
            "Media Fee Total": "mediaFeeTotal",
            "Working Media Budget": "workingMediaBudget"
        },
        detectionRules: {
            requiredColumns: [
                "Channel",
                "Tactic",
                "Platform"
            ],
            optionalColumns: [
                "Accutics Campaign Name",
                "Working Media Budget"
            ]
        }
    },
    {
        id: "unilever-extended",
        name: "Unilever Extended Format",
        description: "Extended blocking chart with additional depth",
        columnMappings: {
            // All standard mappings from above, PLUS extended fields:
            "Channel": "channel",
            "Tactic": "tactic",
            "Platform": "platform",
            "Objective": "objective",
            "Sub-Objective": "subObjective",
            "Placements": "placements",
            "Placement Details": "placementDetails",
            "Optimization KPI": "optimizationKpi",
            "KPI Target": "kpiTarget",
            "Demo": "demo",
            "Demo Details": "demoDetails",
            "Targeting": "targeting",
            "Targeting Strategy": "targetingStrategy",
            "Language": "language",
            "Market": "market",
            "Region": "region",
            "Accutics Campaign Name": "accuticsCampaignName",
            "Accutics Ad Set Name": "accuticsAdSetName",
            "Creative Strategy": "creativeStrategy",
            "Creative Format": "creativeFormat",
            "CPM/CPP": "cpmCpp",
            "Impressions/GRPs": "impressionsGrps",
            "Frequency Cap": "frequencyCap",
            "Start Date": "startDate",
            "End Date": "endDate",
            "Flight Pattern": "flightPattern",
            "Media Cost": "mediaCost",
            "Production Cost": "productionCost",
            "Ad Serving": "adServing",
            "DV Cost": "dvCost",
            "Media Fee Total": "mediaFeeTotal",
            "Working Media Budget": "workingMediaBudget",
            "Vendor": "vendor",
            "PO Number": "poNumber",
            "Budget Category": "budgetCategory",
            "Campaign Type": "campaignType"
        },
        detectionRules: {
            // If we see any of these "extended" columns, it's the extended format
            requiredColumns: [
                "Channel",
                "Tactic",
                "Platform"
            ],
            optionalColumns: [
                "Sub-Objective",
                "Creative Strategy",
                "Flight Pattern",
                "Vendor",
                "KPI Target",
                "Budget Category"
            ]
        }
    }
];
function detectBlockingChartTemplate(headers) {
    const normalizedHeaders = headers.map((h)=>h.trim().toLowerCase());
    console.log('🔍 Detecting blocking chart template...');
    console.log('Headers found:', headers);
    // Check extended template first (more specific)
    for(let i = blockingChartTemplates.length - 1; i >= 0; i--){
        const template = blockingChartTemplates[i];
        // Check required columns
        const hasAllRequired = template.detectionRules.requiredColumns.every((col)=>normalizedHeaders.some((h)=>h === col.toLowerCase()));
        if (!hasAllRequired) {
            continue;
        }
        // For extended template, check if it has at least minimum optional "extended" columns
        if (template.id === 'unilever-extended' && template.detectionRules.optionalColumns) {
            const extendedColumnsFound = template.detectionRules.optionalColumns.filter((col)=>normalizedHeaders.some((h)=>h === col.toLowerCase()));
            if (extendedColumnsFound.length >= __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEMPLATE_CONFIG"].MIN_EXTENDED_COLUMNS) {
                console.log(`✅ Detected template: ${template.name}`);
                console.log(`Extended columns found: ${extendedColumnsFound.join(', ')}`);
                return template;
            }
        }
        // For standard template, just check required columns
        if (template.id === 'unilever-standard') {
            console.log(`✅ Detected template: ${template.name}`);
            return template;
        }
    }
    console.log('⚠️ No template matched, will use auto-normalization');
    return null; // No template matched
}
function getMappedFieldName(header, template, fallbackNormalizer) {
    if (template && template.columnMappings[header]) {
        return template.columnMappings[header];
    }
    // Fall back to auto-normalization
    return fallbackNormalizer(header);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/excel/categorization.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categorizeLine",
    ()=>categorizeLine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-client] (ecmascript)");
;
function categorizeLine(input) {
    const channel = (input.channel || '').toLowerCase();
    const platform = (input.platform || '').toLowerCase();
    const mediaType = (input.mediaType || '').toLowerCase();
    const placements = (input.placements || '').toLowerCase();
    const adFormat = (input.adFormat || '').toLowerCase();
    // Check for excluded campaigns FIRST (highest priority)
    // Either check the isExcluded flag OR detect by keywords
    if (input.isExcluded) {
        return {
            tab: 'Excluded',
            type: 'non-digital',
            reason: input.excludedReason
        };
    }
    // Also check for excluded channel keywords directly (OOH, TV, Radio, Print)
    const excludedCategories = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIZATION_CONFIG"].EXCLUDED_CHANNEL_KEYWORDS;
    // Check OOH
    for (const keyword of excludedCategories.OOH){
        if (channel.includes(keyword) || platform.includes(keyword) || placements.includes(keyword) || adFormat.includes(keyword)) {
            return {
                tab: 'Excluded',
                type: 'non-digital',
                reason: 'OOH'
            };
        }
    }
    // Check TV (but exclude CTV/Connected TV which are digital)
    for (const keyword of excludedCategories.TV){
        if ((channel.includes(keyword) || platform.includes(keyword) || placements.includes(keyword) || adFormat.includes(keyword)) && !channel.includes('ctv') && !channel.includes('connected tv') && !platform.includes('ctv') && !platform.includes('connected tv')) {
            return {
                tab: 'Excluded',
                type: 'non-digital',
                reason: 'TV'
            };
        }
    }
    // Check Radio
    for (const keyword of excludedCategories.RADIO){
        if (channel.includes(keyword) || platform.includes(keyword) || placements.includes(keyword) || adFormat.includes(keyword)) {
            return {
                tab: 'Excluded',
                type: 'non-digital',
                reason: 'Radio'
            };
        }
    }
    // Check Print
    for (const keyword of excludedCategories.PRINT){
        if (channel.includes(keyword) || platform.includes(keyword) || placements.includes(keyword) || adFormat.includes(keyword)) {
            return {
                tab: 'Excluded',
                type: 'non-digital',
                reason: 'Print'
            };
        }
    }
    // Check for Brand Say Digital keywords (second priority)
    // This ensures audio, programmatic, digital video, digital display route correctly
    const isBrandSayDigital = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIZATION_CONFIG"].BRAND_SAY_DIGITAL_KEYWORDS.some((keyword)=>channel.includes(keyword) || mediaType.includes(keyword));
    if (isBrandSayDigital) {
        return {
            tab: 'Brand Say Digital',
            type: 'media'
        };
    }
    // Check for influencer keyword (third priority)
    // Check in placements, adFormat, channel, and platform
    const isInfluencer = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIZATION_CONFIG"].INFLUENCER_KEYWORDS.some((keyword)=>placements.includes(keyword.toLowerCase()) || adFormat.includes(keyword.toLowerCase()) || channel.includes(keyword.toLowerCase()) || platform.includes(keyword.toLowerCase()));
    // Check if it's a social platform (fourth priority)
    // Check platform, channel, placements, and adFormat to catch all cases
    const isSocialPlatform = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIZATION_CONFIG"].SOCIAL_PLATFORMS.some((socialPlatform)=>platform.includes(socialPlatform.toLowerCase()) || channel.includes(socialPlatform.toLowerCase()) || placements.includes(socialPlatform.toLowerCase()) || adFormat.includes(socialPlatform.toLowerCase()));
    // Special case: Pinterest only
    // Pinterest is the ONLY social platform where influencer content goes to Brand Say Social
    const isPinterest = platform.includes('pinterest') || platform.includes('pin') || channel.includes('pinterest') || channel.includes('pin') || placements.includes('pinterest') || placements.includes('pin') || adFormat.includes('pinterest') || adFormat.includes('pin');
    // Decision matrix for social platforms with influencer:
    // - Pinterest + Influencer → Brand Say Social (brand-created influencer content)
    // - Meta/TikTok/Other Social + Influencer → Other Say Social (actual influencers)
    // - Any Social Platform + NO Influencer → Brand Say Social (regular paid social)
    if (isSocialPlatform) {
        if (isInfluencer && !isPinterest) {
            // Meta, TikTok, etc. with influencer → Other Say Social
            return {
                tab: 'Other Say Social',
                type: 'media'
            };
        } else {
            // Pinterest (with or without influencer) OR any social without influencer → Brand Say Social
            return {
                tab: 'Brand Say Social',
                type: 'media'
            };
        }
    }
    // If it's influencer content on a NON-social platform, route to Other Say Social
    if (isInfluencer) {
        return {
            tab: 'Other Say Social',
            type: 'media'
        };
    }
    // Default to Brand Say Digital for non-social, non-influencer (programmatic, display, video, audio, etc.)
    return {
        tab: 'Brand Say Digital',
        type: 'media'
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/excel/demographicExtraction.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Demographic extraction utilities
 * Extracts demographic codes (W25-49, M18-44, A18-65) from Target field
 */ __turbopack_context__.s([
    "extractDemographic",
    ()=>extractDemographic,
    "getGenderDescription",
    ()=>getGenderDescription,
    "parseDemographic",
    ()=>parseDemographic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-client] (ecmascript)");
;
function extractDemographic(target) {
    if (!target) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEFAULT_DEMO;
    }
    const targetStr = String(target);
    // Reset regex state (important for global regex)
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEMO_PATTERN.lastIndex = 0;
    // Find all demographic patterns in the string
    const matches = targetStr.matchAll(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEMO_PATTERN);
    const matchArray = Array.from(matches);
    if (matchArray.length === 0) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEFAULT_DEMO;
    }
    // Return first match in format: W25-49
    const firstMatch = matchArray[0];
    const genderCode = firstMatch[1]; // W, M, A, F
    const lowerAge = firstMatch[2]; // 25, 18, etc.
    const upperAge = firstMatch[3]; // 49, 44, etc.
    return `${genderCode}${lowerAge}-${upperAge}`;
}
function getGenderDescription(genderCode) {
    const upperCode = genderCode.toUpperCase();
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].GENDER_CODES[upperCode] || 'Adults';
}
function parseDemographic(demographic) {
    // Handle "A18+" format
    const plusMatch = demographic.match(/^([MWFA])(\d+)\+$/);
    if (plusMatch) {
        const gender = plusMatch[1];
        return {
            gender,
            genderDesc: getGenderDescription(gender),
            lowerAge: parseInt(plusMatch[2], 10),
            upperAge: undefined
        };
    }
    // Handle "W25-49" format
    const rangeMatch = demographic.match(/^([MWFA])(\d+)-(\d+)$/);
    if (rangeMatch) {
        const gender = rangeMatch[1];
        return {
            gender,
            genderDesc: getGenderDescription(gender),
            lowerAge: parseInt(rangeMatch[2], 10),
            upperAge: parseInt(rangeMatch[3], 10)
        };
    }
    // Fallback
    return {
        gender: 'A',
        genderDesc: 'Adults',
        lowerAge: 18,
        upperAge: undefined
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/excel/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * Shared Excel Processing Module
 * Main entry point for blocking chart parsing and traffic sheet generation
 * Used by both desktop (Electron) and web implementations
 *
 * This is the SINGLE SOURCE OF TRUTH for all Excel processing logic.
 * Both desktop and web applications import from this shared package.
 */ // Main processing functions and classes
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$trafficSheetWriter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/trafficSheetWriter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$parser$2f$BlockingChartParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/parser/BlockingChartParser.ts [app-client] (ecmascript)");
// Template detection and management
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$blockingChartTemplates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/blockingChartTemplates.ts [app-client] (ecmascript)");
// Categorization logic
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$categorization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/categorization.ts [app-client] (ecmascript)");
// Demographic extraction
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$demographicExtraction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/demographicExtraction.ts [app-client] (ecmascript)");
// Utilities
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldNormalizer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/PlatformClassifier.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldMapper.ts [app-client] (ecmascript)");
// Configuration constants
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrafficSheetAutomation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$FileUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/FileUpload.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$TabPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/TabPicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/analytics/tracker.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/excel/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$categorization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/categorization.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$AnalyticsProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/core/ui/AnalyticsProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function TrafficSheetAutomation() {
    _s();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$AnalyticsProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("upload");
    const [blockingChart, setBlockingChart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [parsedData, setParsedData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [manualOverrides, setManualOverrides] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [deletedRows, setDeletedRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Tab selection state
    const [showTabPicker, setShowTabPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [availableTabs, setAvailableTabs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedTabIndex, setSelectedTabIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Track page view on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TrafficSheetAutomation.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Analytics"].trackPageView("Traffic Sheet Automation");
        }
    }["TrafficSheetAutomation.useEffect"], []);
    const handleFileSelect = async (file, tabIndex)=>{
        setBlockingChart(file);
        setError(null);
        setSuccess(false);
        // Track file upload (only on first upload, not on tab selection)
        if (tabIndex === undefined) {
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Analytics"].trafficSheetFileUpload(file);
        }
        // Automatically parse and generate
        setIsProcessing(true);
        setCurrentStep("generate");
        try {
            const formData = new FormData();
            formData.append("blockingChart", file);
            // Include tab index if user selected a specific tab
            if (tabIndex !== undefined) {
                formData.append("tabIndex", tabIndex.toString());
            }
            // Check if we need tab selection first
            const previewResponse = await fetch("/api/traffic-sheet/preview", {
                method: "POST",
                body: formData
            });
            if (!previewResponse.ok) {
                const errorData = await previewResponse.json();
                throw new Error(errorData.error || "Failed to parse blocking chart");
            }
            const previewData = await previewResponse.json();
            // Check if we need tab selection
            if (previewData.needsTabSelection && previewData.availableTabs) {
                console.log(`⚠️  Auto-detection failed. Showing tab picker with ${previewData.availableTabs.length} tabs.`);
                setAvailableTabs(previewData.availableTabs);
                setShowTabPicker(true);
                setIsProcessing(false);
                setCurrentStep("upload");
                return;
            }
            // Auto-detection succeeded or user selected a tab
            console.log(`✅ ${previewData.autoDetected ? 'Auto-detected' : 'User selected'} tab index: ${previewData.selectedTabIndex}`);
            setShowTabPicker(false);
            // Track successful preview
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Analytics"].trafficSheetPreview();
            // Automatically generate the traffic sheet
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Analytics"].trafficSheetGenerate();
            const generateFormData = new FormData();
            generateFormData.append("blockingChart", file);
            if (tabIndex !== undefined) {
                generateFormData.append("tabIndex", tabIndex.toString());
            }
            const generateResponse = await fetch("/api/traffic-sheet/generate", {
                method: "POST",
                body: generateFormData
            });
            if (!generateResponse.ok) {
                const errorData = await generateResponse.json();
                throw new Error(errorData.error || "Failed to generate traffic sheet");
            }
            // Download the generated file
            const blob = await generateResponse.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `traffic-sheet-${Date.now()}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            setSuccess(true);
            // Track successful download
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Analytics"].trafficSheetDownload();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to generate traffic sheet";
            setError(errorMessage);
            setBlockingChart(null);
            setCurrentStep("upload");
            // Track the error
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Analytics"].trafficSheetError(errorMessage, file.name, 'generation_error');
        } finally{
            setIsProcessing(false);
        }
    };
    // Handle tab selection from picker
    const handleTabSelect = (tabIndex)=>{
        if (!blockingChart) {
            setError("No file selected");
            return;
        }
        console.log(`📋 User selected tab index: ${tabIndex}`);
        setSelectedTabIndex(tabIndex);
        // Re-parse with selected tab
        handleFileSelect(blockingChart, tabIndex);
    };
    const handleGenerate = async ()=>{
        if (!blockingChart) {
            setError("No blocking chart selected");
            return;
        }
        if (!parsedData) {
            setError("No parsed data available");
            return;
        }
        setIsProcessing(true);
        setError(null);
        setSuccess(false);
        setCurrentStep("generate");
        // Track generation action
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Analytics"].trafficSheetGenerate();
        try {
            // Convert deleted row stable IDs to campaign line indices
            // The stable IDs correspond to indices in the rowsWithoutTotals array
            // We need to reconstruct that array to map stable IDs back to original rows
            const deletedCampaignLineIndices = new Set();
            // Reconstruct rowsWithoutTotals (same logic as in the render section)
            const rowsWithoutTotals = parsedData.rows.filter((row)=>row._mergeSpan && row._mergeSpan > 0);
            deletedRows.forEach((stableRowId)=>{
                // The stable ID is the index in rowsWithoutTotals
                const row = rowsWithoutTotals[stableRowId];
                // Get the campaign line index for this row
                if (row && row._campaignLineIndex !== undefined) {
                    deletedCampaignLineIndices.add(row._campaignLineIndex);
                    console.log(`  🗑️  Stable ID ${stableRowId} → Campaign Line ${row._campaignLineIndex}`);
                } else {
                    console.warn(`  ⚠️  Could not find campaign line index for stable ID ${stableRowId}`);
                    if (row) {
                        console.log(`     Row data:`, {
                            _campaignLineIndex: row._campaignLineIndex,
                            _campaignLineMasterRow: row._campaignLineMasterRow
                        });
                    }
                }
            });
            console.log(`🗑️  Sending ${deletedCampaignLineIndices.size} deleted campaign line indices to API`);
            console.log(`   Deleted row IDs: [${Array.from(deletedRows).join(', ')}]`);
            console.log(`   Deleted campaign line indices: [${Array.from(deletedCampaignLineIndices).join(', ')}]`);
            // Manual overrides are already stored by campaign line index (stable IDs)
            console.log(`✏️  Sending ${Object.keys(manualOverrides).length} manual overrides to API`);
            console.log(`   Manual overrides (campaign line indices): ${JSON.stringify(manualOverrides)}`);
            const formData = new FormData();
            formData.append("blockingChart", blockingChart);
            formData.append("manualOverrides", JSON.stringify(manualOverrides));
            formData.append("deletedRows", JSON.stringify(Array.from(deletedCampaignLineIndices)));
            const response = await fetch("/api/traffic-sheet/generate", {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to generate traffic sheet");
            }
            // Download the generated file
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `traffic-sheet-${Date.now()}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            setSuccess(true);
            // Track successful download
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Analytics"].trafficSheetDownload();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred";
            setError(errorMessage);
            setCurrentStep("verify");
            // Track the error
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Analytics"].trafficSheetError(errorMessage, blockingChart?.name, 'generation_error');
        } finally{
            setIsProcessing(false);
        }
    };
    const handleStartOver = ()=>{
        setCurrentStep("upload");
        setBlockingChart(null);
        setParsedData(null);
        setManualOverrides({});
        setDeletedRows(new Set());
        setError(null);
        setSuccess(false);
        // Reset tab picker state
        setShowTabPicker(false);
        setAvailableTabs([]);
        setSelectedTabIndex(null);
    };
    const handleBackToUpload = ()=>{
        setCurrentStep("upload");
        setBlockingChart(null);
        setParsedData(null);
        setManualOverrides({});
        setDeletedRows(new Set());
        setError(null);
        // Reset tab picker state
        setShowTabPicker(false);
        setAvailableTabs([]);
        setSelectedTabIndex(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Traffic Sheet Automation",
                subtitle: "Generate client-ready traffic sheets from blocking charts",
                showBackButton: true
            }, void 0, false, {
                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "px-6 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 max-w-4xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${currentStep === "upload" ? "border-blue-600 bg-blue-600 text-white" : success ? "border-green-500 bg-green-500 text-white" : "border-slate-300 bg-white text-slate-600"}`,
                                            children: success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5",
                                                fill: "currentColor",
                                                viewBox: "0 0 20 20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 19
                                            }, this) : "1"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 308,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `ml-2 text-sm font-medium ${currentStep === "upload" ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`,
                                            children: "Upload"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-16 h-0.5 ${success || currentStep === "generate" ? "bg-green-500" : "bg-slate-300"}`
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${currentStep === "generate" || success ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-slate-600"}`,
                                            children: success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5",
                                                fill: "currentColor",
                                                viewBox: "0 0 20 20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, this) : "2"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 349,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `ml-2 text-sm font-medium ${currentStep === "generate" || success ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`,
                                            children: "Generate"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 368,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 348,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this),
                    currentStep === "upload" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadStep, {
                        blockingChart: blockingChart,
                        onFileSelect: handleFileSelect,
                        isProcessing: isProcessing,
                        error: error,
                        showTabPicker: showTabPicker,
                        availableTabs: availableTabs,
                        onTabSelect: handleTabSelect
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this),
                    (currentStep === "generate" || success) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GenerateStep, {
                        success: success,
                        isProcessing: isProcessing,
                        error: error,
                        onStartOver: handleStartOver
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
        lineNumber: 293,
        columnNumber: 5
    }, this);
}
_s(TrafficSheetAutomation, "YzCE/jSO9ekiyGxjGyv2DtqHnlM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$AnalyticsProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"]
    ];
});
_c = TrafficSheetAutomation;
// Upload Step Component
function UploadStep({ blockingChart, onFileSelect, isProcessing, error, showTabPicker, availableTabs, onTabSelect }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2",
                        children: "📖 Upload Your Blocking Chart"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 429,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "text-blue-800 dark:text-blue-200 space-y-1 text-sm list-decimal list-inside",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Select your completed blocking chart (.xlsx file)"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "We'll automatically parse and generate your traffic sheet"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 434,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Your file will download automatically when ready"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 435,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 432,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                lineNumber: 428,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$FileUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        label: "Upload Blocking Chart",
                        description: "Upload your completed blocking chart Excel file (.xlsx)",
                        selectedFile: blockingChart,
                        onFileSelect: onFileSelect
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 441,
                        columnNumber: 11
                    }, this),
                    showTabPicker && availableTabs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$TabPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        tabs: availableTabs,
                        onTabSelect: onTabSelect,
                        isProcessing: isProcessing
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 450,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-green-500 mt-0.5 flex-shrink-0",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 466,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 460,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-slate-900 dark:text-white text-sm",
                                            children: "Unilever Template Built-In"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 474,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-600 dark:text-slate-400 text-sm mt-1",
                                            children: "The official Unilever traffic sheet template is pre-loaded. Just upload your blocking chart!"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 477,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 473,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 459,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 458,
                        columnNumber: 9
                    }, this),
                    isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center gap-3 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "animate-spin h-6 w-6 text-blue-600",
                                viewBox: "0 0 24 24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        className: "opacity-25",
                                        cx: "12",
                                        cy: "12",
                                        r: "10",
                                        stroke: "currentColor",
                                        strokeWidth: "4",
                                        fill: "none"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 491,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        className: "opacity-75",
                                        fill: "currentColor",
                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 500,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 487,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-700 dark:text-slate-300 font-medium",
                                children: "Parsing your blocking chart..."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 506,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 486,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-red-500 mt-0.5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 522,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 516,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-red-900 dark:text-red-100",
                                            children: "Error"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 530,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-700 dark:text-red-200 text-sm",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 533,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 529,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 515,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 514,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                lineNumber: 440,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
        lineNumber: 426,
        columnNumber: 5
    }, this);
}
_c1 = UploadStep;
// Verify Step Component
function VerifyStep({ data, fileName, onGenerate, onBackToUpload, isProcessing, error, manualOverrides, onManualOverrideChange, deletedRows, onDeletedRowsChange, isAdmin = false }) {
    _s1();
    const [hoveredRow, setHoveredRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Debug: Check if _mergeSpan data is present in the original data
    console.log('🔍 Original data.rows _mergeSpan check:');
    data.rows.forEach((row, index)=>{
        if (row._mergeSpan) {
            console.log(`  Original Row ${index}: _mergeSpan = ${row._mergeSpan}`);
        }
    });
    // Filter rows: Find "Variance" field and only show rows up to and including it
    const rowsUpToVariance = (()=>{
        const varianceRowIndex = data.rows.findIndex((row)=>{
            return Object.values(row).some((value)=>String(value).toLowerCase().includes('variance'));
        });
        // If variance found, return rows up to and including that row
        // If not found, return all rows
        return varianceRowIndex >= 0 ? data.rows.slice(0, varianceRowIndex + 1) : data.rows;
    })();
    // STEP 1: Filter columns first (include all headers to ensure we can find Gross Budget and hide flight columns)
    const initialHeaders = data.headers;
    // Extract the totals row first to check for columns with data there
    const totalsRow = (()=>{
        // Find the last row that looks like a totals row
        // Check from bottom up for a row with "total" in channel or multiple numeric values
        for(let i = rowsUpToVariance.length - 1; i >= 0; i--){
            const row = rowsUpToVariance[i];
            const channelKey = data.headers[0]?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr)=>chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
            const channelValue = String(channelKey && row[channelKey] || "").toLowerCase();
            // Check if this looks like a totals row
            if (channelValue.includes('total') || channelValue.includes('grand')) {
                return {
                    row,
                    index: i
                };
            }
            // Also check if row has many numeric values (likely a totals row)
            const numericCount = Object.values(row).filter((v)=>typeof v === 'number' || !isNaN(Number(v)) && String(v).trim() !== "").length;
            if (numericCount >= 3 && i > rowsUpToVariance.length - 5) {
                return {
                    row,
                    index: i
                };
            }
        }
        return null;
    })();
    // Check which columns are completely blank across all rows, BUT include columns that have data in totals row
    const nonBlankColumns = [];
    console.log('\n🔍 === PLACEMENTS COLUMN DEBUG: Checking Blank Columns ===');
    initialHeaders.forEach((header, colIndex)=>{
        // Skip column 1 (always remove it)
        if (colIndex === 1) return;
        // Skip null/undefined/empty headers
        if (!header) return;
        const normalizedKey = header.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr)=>chr.toUpperCase()).replace(/^[^a-z]+/, "");
        // IMPORTANT: Also get the mapped field name from UNIFIED_TEMPLATE_CONFIG
        // This handles cases where "Campaign Details - Placements" is stored as "placements"
        const mappedKey = header === 'Campaign Details - Placements' ? 'placements' : normalizedKey;
        // Special debug for placements column
        const isPlacementsColumn = header.toLowerCase().includes('placement');
        if (isPlacementsColumn) {
            console.log(`📍 PLACEMENTS COLUMN FOUND at index ${colIndex}: "${header}"`);
            console.log(`   Normalized key: "${normalizedKey}"`);
            console.log(`   Mapped key: "${mappedKey}"`);
        }
        // Check if this column has any data in any row OR in the totals row
        // Try BOTH the normalized key AND the mapped key
        const hasDataInRegularRows = rowsUpToVariance.some((row)=>{
            const valueNormalized = row[normalizedKey];
            const valueMapped = row[mappedKey];
            const value = valueNormalized !== undefined ? valueNormalized : valueMapped;
            return value !== undefined && value !== null && value !== "" && String(value).trim() !== "";
        });
        const hasDataInTotalsRow = totalsRow ? (()=>{
            const valueNormalized = totalsRow.row[normalizedKey];
            const valueMapped = totalsRow.row[mappedKey];
            const value = valueNormalized !== undefined ? valueNormalized : valueMapped;
            return value !== undefined && value !== null && value !== "" && String(value).trim() !== "";
        })() : false;
        // Always include important columns even if they're empty
        const headerLower = header.toLowerCase();
        const isImportantColumn = headerLower.includes('dv cost') || headerLower.includes('media fee total') || headerLower.includes('buffer') || headerLower.includes('working media budget') || headerLower.includes('working media') || headerLower.includes('ad serving') || headerLower.includes('media cost') || headerLower.includes('budget') || headerLower.includes('spend') || headerLower.includes('cost') || headerLower.includes('cpm') || headerLower.includes('grp') || headerLower.includes('impression') || headerLower.includes('placement'); // Add placements as important
        if (isPlacementsColumn) {
            console.log(`   Has data in regular rows? ${hasDataInRegularRows}`);
            console.log(`   Has data in totals row? ${hasDataInTotalsRow}`);
            console.log(`   Is important column? ${isImportantColumn}`);
            console.log(`   Sample values from first 3 rows (normalized):`, rowsUpToVariance.slice(0, 3).map((r)=>r[normalizedKey]));
            console.log(`   Sample values from first 3 rows (mapped):`, rowsUpToVariance.slice(0, 3).map((r)=>r[mappedKey]));
        }
        if (hasDataInRegularRows || hasDataInTotalsRow || isImportantColumn) {
            nonBlankColumns.push(colIndex);
            if (isPlacementsColumn) {
                console.log(`   ✅ KEEPING placements column (passed blank check)`);
            }
        } else {
            if (isPlacementsColumn) {
                console.log(`   ❌ FILTERING OUT placements column (blank check failed)`);
            }
        }
    });
    // Create filtered headers (only non-blank columns, excluding column 1)
    // Also exclude columns that aren't needed for traffic sheet verification
    const columnsToHideFromDisplay = [
        'Media type',
        'Media Type',
        'Accutics Campaign Name',
        'Tags Required',
        'Measurement',
        'KPI',
        'KPI Value',
        'Ad Serving',
        'DV Cost',
        'Buffer (+30%)'
    ];
    // Debug: Log all initial headers to see what we have
    console.log(`🔍 All initial headers:`, initialHeaders);
    console.log(`🔍 Total headers available:`, data.headers.length);
    // Debug: Check if Buffer column exists
    const bufferIndex = initialHeaders.findIndex((h)=>h && h.toLowerCase().includes('buffer'));
    console.log(`🔍 Buffer column index: ${bufferIndex} ("${initialHeaders[bufferIndex]}")`);
    // Find the index of "End Date" and "Gross Budget" to hide flight columns in between
    const endDateIndex = initialHeaders.findIndex((h)=>h && h.toLowerCase().includes('end date'));
    const grossBudgetIndex = initialHeaders.findIndex((h)=>h && h.toLowerCase().includes('gross'));
    console.log(`\n🔍 === PLACEMENTS COLUMN DEBUG: Checking Display Filters ===`);
    console.log(`  End Date index: ${endDateIndex} ("${initialHeaders[endDateIndex]}")`);
    console.log(`  Gross Budget index: ${grossBudgetIndex} ("${initialHeaders[grossBudgetIndex]}")`);
    console.log(`  Columns between: ${endDateIndex !== -1 && grossBudgetIndex !== -1 ? grossBudgetIndex - endDateIndex - 1 : 0}`);
    const displayColumns = nonBlankColumns.filter((colIndex)=>{
        const header = initialHeaders[colIndex];
        const isPlacementsColumn = header.toLowerCase().includes('placement');
        if (isPlacementsColumn) {
            console.log(`\n📍 CHECKING PLACEMENTS COLUMN (index ${colIndex}): "${header}"`);
        }
        // Hide explicitly named columns
        if (columnsToHideFromDisplay.includes(header)) {
            if (isPlacementsColumn) {
                console.log(`   ❌ HIDDEN by explicit hide list`);
            } else {
                console.log(`  🚫 Hiding column ${colIndex}: "${header}" (in hide list)`);
            }
            return false;
        }
        // Hide flight columns between End Date and Gross Budget
        if (endDateIndex !== -1 && grossBudgetIndex !== -1 && colIndex > endDateIndex && colIndex < grossBudgetIndex) {
            if (isPlacementsColumn) {
                console.log(`   ❌ HIDDEN by flight column filter (between End Date and Gross Budget)`);
                console.log(`      colIndex (${colIndex}) > endDateIndex (${endDateIndex}) && colIndex < grossBudgetIndex (${grossBudgetIndex})`);
            } else {
                console.log(`  🚫 Hiding column ${colIndex}: "${header}" (flight column between End Date and Gross Budget)`);
            }
            return false;
        }
        if (isPlacementsColumn) {
            console.log(`   ✅ KEEPING placements column (passed all display filters)`);
        }
        return true;
    });
    const filteredHeaders = displayColumns.map((colIndex)=>initialHeaders[colIndex]);
    const columnIndices = displayColumns; // Track which columns we're showing
    const isColumn1Empty = true; // Column 1 is always removed
    const hiddenColumnCount = initialHeaders.length - filteredHeaders.length;
    // totalsRow is already defined above
    // STEP 2: Filter out completely blank rows (reduces clutter)
    const rowsWithoutTotals = totalsRow ? rowsUpToVariance.filter((_, idx)=>idx !== totalsRow.index) : rowsUpToVariance;
    // Categorize rows by tab using unified categorization logic
    // MUST BE DEFINED BEFORE filteredRows
    const categorizeRow = (row)=>{
        // Extract field values from row using normalized header keys
        const getNormalizedKey = (headerName)=>headerName?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr)=>chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
        const channelKey = getNormalizedKey(data.headers[0]);
        const platformKey = getNormalizedKey(data.headers.find((h)=>h.toLowerCase().includes('platform')));
        const placementKey = getNormalizedKey(data.headers.find((h)=>h.toLowerCase().includes('placement')));
        const mediaTypeKey = getNormalizedKey(data.headers.find((h)=>h.toLowerCase().includes('media type')));
        const adFormatKey = getNormalizedKey(data.headers.find((h)=>h.toLowerCase().includes('ad format')));
        // Use unified categorization logic
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$categorization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["categorizeLine"])({
            channel: String(channelKey && row[channelKey] || ""),
            platform: String(platformKey && row[platformKey] || ""),
            mediaType: String(mediaTypeKey && row[mediaTypeKey] || ""),
            placements: String(placementKey && row[placementKey] || ""),
            adFormat: String(adFormatKey && row[adFormatKey] || ""),
            // Check the actual isExcluded flag from parsed data (for OOH, TV, Radio, Print)
            isExcluded: row.isExcluded || false,
            excludedReason: row.excludedReason
        });
        // Check if it's a header row (visual cue like 'DIGITAL VIDEO', 'PAID SOCIAL')
        const channel = String(channelKey && row[channelKey] || "").toLowerCase();
        const isHeaderRow = /^(digital video|digital display|digital audio|paid social|social|video|display|audio)$/i.test(channel);
        if (isHeaderRow) {
            return {
                tab: 'section-header',
                type: channel,
                sectionName: channel.toUpperCase()
            };
        }
        return result;
    };
    // Filter to only show valid campaign lines (those with _mergeSpan from backend)
    // The backend already validated these using triple merge detection (budget + impressions + placements)
    const filteredRows = (()=>{
        const result = rowsWithoutTotals.filter((row)=>{
            // Only include rows that were identified as campaign lines by the backend
            return row._mergeSpan && row._mergeSpan > 0;
        }).map((row, originalIndex)=>({
                ...row,
                _stableRowId: originalIndex
            })).filter((row)=>{
            // Filter out deleted rows using stable ID
            return !deletedRows.has(row._stableRowId);
        });
        console.log(`🔍 Frontend filtering: Starting with ${rowsWithoutTotals.length} rows`);
        console.log(`✅ Frontend filtering: Kept ${result.length} valid campaign lines (with _mergeSpan)`);
        console.log(`🗑️  Deleted rows count: ${deletedRows.size}`);
        return result;
    })();
    const hiddenRowCount = rowsUpToVariance.length - filteredRows.length - (totalsRow ? 1 : 0);
    // First, identify tactic groups based on _mergeSpan in FILTERED rows
    const tacticGroups = {};
    const rowToMasterMap = {};
    console.log('🔍 Building tactic groups from filtered rows:');
    filteredRows.forEach((row, filteredIndex)=>{
        const mergeSpan = row._mergeSpan || 1;
        console.log(`  Filtered Row ${filteredIndex}: _mergeSpan = ${mergeSpan}`);
        // First, check if this row is already claimed by a previous master
        if (rowToMasterMap[filteredIndex] !== undefined) {
            console.log(`    → Already claimed by master row ${rowToMasterMap[filteredIndex]}, skipping`);
            return;
        }
        if (mergeSpan > 1) {
            // This is a master row - it claims the next (mergeSpan - 1) rows
            const groupMembers = [
                filteredIndex
            ];
            rowToMasterMap[filteredIndex] = filteredIndex; // Master row maps to itself
            for(let i = 1; i < mergeSpan; i++){
                if (filteredIndex + i < filteredRows.length) {
                    groupMembers.push(filteredIndex + i);
                    rowToMasterMap[filteredIndex + i] = filteredIndex; // Claimed rows map to master
                    console.log(`    → Claims filtered row ${filteredIndex + i} (maps to master ${filteredIndex})`);
                }
            }
            tacticGroups[filteredIndex] = groupMembers;
            console.log(`    → Master row ${filteredIndex} claims group: [${groupMembers.join(', ')}]`);
        } else {
            // Standalone row - maps to itself
            rowToMasterMap[filteredIndex] = filteredIndex;
            console.log(`    → Standalone row ${filteredIndex}`);
        }
    });
    // Log tactic grouping for debugging
    console.log('🔗 Tactic Groups Identified:', Object.keys(tacticGroups).length > 0 ? tacticGroups : 'No merged tactics found');
    console.log('📍 Row to Master Mapping:', rowToMasterMap);
    // Debug: Show detailed mapping
    console.log('🔍 Detailed Row to Master Mapping:');
    Object.entries(rowToMasterMap).forEach(([rowIndex, masterIndex])=>{
        const rowNum = parseInt(rowIndex);
        console.log(`  Row ${rowIndex} → Master ${masterIndex} ${rowNum !== masterIndex ? '(MERGED)' : '(STANDALONE)'}`);
    });
    // Debug: Check if filteredRows still have _mergeSpan data
    console.log('🔍 Checking filteredRows for _mergeSpan data:');
    filteredRows.forEach((row, index)=>{
        if (row._mergeSpan) {
            console.log(`  Filtered Row ${index}: _mergeSpan = ${row._mergeSpan}`);
        }
    });
    // Debug: Show the relationship between original indices and filtered indices
    console.log('🔍 Original vs Filtered Row Mapping:');
    filteredRows.forEach((row, filteredIndex)=>{
        const originalIndex = data.rows.findIndex((originalRow)=>originalRow === row);
        if (row._mergeSpan) {
            console.log(`  Filtered[${filteredIndex}] = Original[${originalIndex}] with _mergeSpan = ${row._mergeSpan}`);
        }
    });
    const rowsWithCategories = filteredRows.map((row, index)=>{
        const autoCategory = categorizeRow(row);
        const campaignLineIndex = row._campaignLineIndex;
        // Apply manual override using stable campaign line index (survives deletions)
        const finalCategory = campaignLineIndex !== undefined && manualOverrides[campaignLineIndex] ? {
            ...autoCategory,
            tab: manualOverrides[campaignLineIndex]
        } : autoCategory;
        return {
            ...row,
            _category: finalCategory,
            _index: index,
            _autoCategory: autoCategory,
            _masterIndex: rowToMasterMap[index],
            _hasManualOverride: campaignLineIndex !== undefined && manualOverrides[campaignLineIndex] !== undefined
        };
    });
    const displayRowCount = filteredRows.length;
    // Debug: Summary of tactic grouping
    console.log('📊 FINAL TACTIC GROUPING SUMMARY:');
    console.log(`   Total filtered rows: ${filteredRows.length}`);
    console.log(`   Master rows identified: ${Object.keys(tacticGroups).length}`);
    Object.entries(tacticGroups).forEach(([masterIndex, groupMembers])=>{
        console.log(`   Master Row ${masterIndex} leads group: [${groupMembers.join(', ')}]`);
        groupMembers.forEach((memberIndex)=>{
            console.log(`     Row ${memberIndex} → Master ${rowToMasterMap[memberIndex]}`);
        });
    });
    const handleCategoryChange = (rowIndex, newTab)=>{
        // Get the row to find its campaign line index
        const row = filteredRows[rowIndex];
        if (!row) {
            console.warn(`⚠️  Could not find row at index ${rowIndex}`);
            return;
        }
        const campaignLineIndex = row._campaignLineIndex;
        if (campaignLineIndex === undefined) {
            console.warn(`⚠️  Row at index ${rowIndex} missing _campaignLineIndex`);
            return;
        }
        // Find the master row for this tactic group
        const masterIndex = rowToMasterMap[rowIndex];
        const groupMembers = tacticGroups[masterIndex] || [
            rowIndex
        ];
        // Use campaign line index as the key (stable across deletions)
        const newOverrides = {
            ...manualOverrides
        };
        newOverrides[campaignLineIndex] = newTab;
        console.log(`✏️  Tab assignment changed for Campaign Line #${campaignLineIndex} → ${newTab}`);
        console.log(`   Display row ${rowIndex} with ${groupMembers.length - 1} linked row(s)`);
        console.log(`   Override stored as: manualOverrides[${campaignLineIndex}] = "${newTab}"`);
        onManualOverrideChange(newOverrides);
    };
    const handleDeleteRow = (stableRowId)=>{
        // Find the row index in filteredRows
        const rowIndex = filteredRows.findIndex((row)=>row._stableRowId === stableRowId);
        if (rowIndex === -1) {
            console.warn(`⚠️  Could not find row with stable ID: ${stableRowId}`);
            return;
        }
        // Find the master row for this tactic group
        const masterIndex = rowToMasterMap[rowIndex];
        // Get all rows in this tactic group (including the master and all children)
        const groupMembers = tacticGroups[masterIndex] || [
            rowIndex
        ];
        // Create new set with all group members deleted
        const newDeletedRows = new Set(deletedRows);
        groupMembers.forEach((memberIndex)=>{
            const memberRow = filteredRows[memberIndex];
            if (memberRow && memberRow._stableRowId !== undefined) {
                newDeletedRows.add(memberRow._stableRowId);
            }
        });
        onDeletedRowsChange(newDeletedRows);
        console.log(`🗑️  Deleted row ${stableRowId} and ${groupMembers.length - 1} linked row(s), total deleted: ${newDeletedRows.size}`);
        console.log(`   Affected rows: [${groupMembers.join(', ')}]`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-semibold text-slate-900 dark:text-white",
                                    children: [
                                        "✅ ",
                                        fileName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 1011,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-600 dark:text-slate-400 text-xs",
                                    children: [
                                        displayRowCount,
                                        " tactics • ",
                                        filteredHeaders.length,
                                        " columns",
                                        data.metadata?.campaignName && ` • ${data.metadata.campaignName}`,
                                        deletedRows.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-red-600 dark:text-red-400 font-medium",
                                            children: [
                                                "• ",
                                                deletedRows.size,
                                                " deleted"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 1018,
                                            columnNumber: 17
                                        }, this),
                                        Object.keys(manualOverrides).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-amber-600 dark:text-amber-400 font-medium",
                                            children: [
                                                "• ",
                                                Object.keys(manualOverrides).length,
                                                " manual override",
                                                Object.keys(manualOverrides).length > 1 ? 's' : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 1023,
                                            columnNumber: 17
                                        }, this),
                                        (hiddenColumnCount > 0 || hiddenRowCount > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-slate-500 dark:text-slate-400 text-xs",
                                            children: [
                                                "(",
                                                hiddenColumnCount > 0 && `${hiddenColumnCount} blank col${hiddenColumnCount > 1 ? 's' : ''}`,
                                                hiddenColumnCount > 0 && hiddenRowCount > 0 && ', ',
                                                hiddenRowCount > 0 && `${hiddenRowCount} blank row${hiddenRowCount > 1 ? 's' : ''}`,
                                                " hidden)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 1028,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 1014,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1010,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-right",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 dark:text-slate-400",
                                children: "Review and adjust tab assignments • Blanks auto-hidden"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 1037,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1036,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                    lineNumber: 1009,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                lineNumber: 1008,
                columnNumber: 7
            }, this),
            (()=>{
                // Use normalized field names from backend (see FIELD_MAPPINGS in config.ts)
                const grossBudgetKey = 'grossBudget';
                const netBudgetKey = 'netBudget';
                let totalGrossBudget = 0;
                let totalNetBudget = 0;
                // Only sum values from master rows (first row of each campaign line merge)
                // to avoid counting merged values multiple times
                console.log('\n📊 === CAMPAIGN SUMMARY CALCULATION ===');
                console.log(`Total rows to process: ${filteredRows.length}`);
                console.log(`Sample row keys:`, filteredRows[0] ? Object.keys(filteredRows[0]) : 'No rows');
                console.log('\n');
                const rowsProcessed = [];
                const campaignLinesSeen = new Set();
                filteredRows.forEach((row, idx)=>{
                    // A row is a "master row" (first row of a campaign line merge group) if:
                    // 1. It has NO _campaignLineMasterRow (standalone, span=1), OR
                    // 2. Its _campaignLineMasterRow points to itself (first row of merged group)
                    //
                    // This ensures we only count each campaign line's budget/impressions ONCE,
                    // even when budget is merged across multiple blocking chart rows (like Meta campaigns)
                    const masterRowNumber = row._campaignLineMasterRow;
                    const hasNoMasterRow = masterRowNumber === undefined;
                    const isMasterRow = hasNoMasterRow || campaignLinesSeen.has(masterRowNumber) === false;
                    if (!hasNoMasterRow && masterRowNumber !== undefined) {
                        // This row is part of a merge group
                        if (campaignLinesSeen.has(masterRowNumber)) {
                            // We've already counted this campaign line
                            console.log(`⏭️  Row ${idx}: Part of campaign line starting at row ${masterRowNumber} (already counted)`);
                            return;
                        } else {
                            // First time seeing this campaign line
                            campaignLinesSeen.add(masterRowNumber);
                        }
                    }
                    // Only count master rows to avoid double-counting merged budget values
                    if (isMasterRow) {
                        const grossVal = row[grossBudgetKey];
                        const netVal = row[netBudgetKey];
                        const channel = (row.channel || '').trim();
                        const platform = (row.platform || '').trim();
                        const placements = (row.placements || '').trim();
                        rowsProcessed.push(idx);
                        console.log(`✓ Row ${idx}: Channel="${channel}", Platform="${platform}", Placements="${placements}"`);
                        console.log(`    Master row: ${masterRowNumber || 'standalone'}, Merge span: ${row._mergeSpan || 1}`);
                        console.log(`    Gross=${grossVal}, Net=${netVal}`);
                        if (grossVal) {
                            const value = typeof grossVal === 'number' ? grossVal : parseFloat(String(grossVal).replace(/[,$]/g, ''));
                            if (!isNaN(value) && value > 0) {
                                totalGrossBudget += value;
                            }
                        }
                        if (netVal) {
                            const value = typeof netVal === 'number' ? netVal : parseFloat(String(netVal).replace(/[,$]/g, ''));
                            if (!isNaN(value) && value > 0) {
                                totalNetBudget += value;
                            }
                        }
                    }
                });
                console.log(`\n📊 Campaign lines counted: ${rowsProcessed.length}`);
                console.log(`📊 Total rows in blocking chart: ${filteredRows.length}`);
                console.log(`📊 Rows skipped (part of merged campaign lines): ${filteredRows.length - rowsProcessed.length}`);
                console.log(`📊 Final totals - Gross: $${totalGrossBudget.toLocaleString()}, Net: $${totalNetBudget.toLocaleString()}`);
                console.log(`📊 Will display? Gross: ${totalGrossBudget > 0}, Net: ${totalNetBudget > 0}`);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg px-6 py-4 mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl",
                                        children: "💰"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 1128,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-sm font-bold text-indigo-900 dark:text-indigo-100",
                                                children: [
                                                    "Campaign Summary (",
                                                    filteredRows.length,
                                                    " Valid Campaign Lines)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1130,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-indigo-700 dark:text-indigo-300",
                                                children: "Totals calculated from verified campaign lines only"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1133,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 1129,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 1127,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-8",
                                children: [
                                    filteredRows.length > 0 && totalGrossBudget >= 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wide",
                                                children: "Gross Budget"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1142,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold text-indigo-900 dark:text-indigo-100",
                                                children: new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }).format(totalGrossBudget)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1145,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 1141,
                                        columnNumber: 19
                                    }, this),
                                    filteredRows.length > 0 && totalNetBudget >= 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wide",
                                                children: "Net Budget"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1157,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold text-indigo-900 dark:text-indigo-100",
                                                children: new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }).format(totalNetBudget)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1160,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 1156,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 1138,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 1126,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                    lineNumber: 1125,
                    columnNumber: 11
                }, this);
            })(),
            isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                className: "bg-slate-100 dark:bg-slate-900 rounded-lg shadow-lg mb-4 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                        className: "px-4 py-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300",
                        children: "🔍 Debug Info (Click to expand)"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 1179,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-slate-700 dark:text-slate-300 mb-2",
                                                children: "Index Mappings"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1185,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-1 text-slate-600 dark:text-slate-400 font-mono",
                                                children: [
                                                    rowsWithCategories.slice(0, 5).map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "bg-slate-50 dark:bg-slate-900 p-2 rounded",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            children: "Display Row:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                            lineNumber: 1189,
                                                                            columnNumber: 28
                                                                        }, this),
                                                                        " ",
                                                                        idx
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                    lineNumber: 1189,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            children: "Campaign Line:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                            lineNumber: 1190,
                                                                            columnNumber: 28
                                                                        }, this),
                                                                        " ",
                                                                        row._campaignLineIndex ?? 'N/A'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                    lineNumber: 1190,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            children: "Stable ID:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                            lineNumber: 1191,
                                                                            columnNumber: 28
                                                                        }, this),
                                                                        " ",
                                                                        row._stableRowId ?? 'N/A'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                    lineNumber: 1191,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                            lineNumber: 1188,
                                                            columnNumber: 21
                                                        }, this)),
                                                    rowsWithCategories.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "text-slate-500 dark:text-slate-500 italic",
                                                        children: [
                                                            "...and ",
                                                            rowsWithCategories.length - 5,
                                                            " more"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                        lineNumber: 1195,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1186,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 1184,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-slate-700 dark:text-slate-300 mb-2",
                                                children: "Override Status"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1200,
                                                columnNumber: 17
                                            }, this),
                                            Object.keys(manualOverrides).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-1 text-slate-600 dark:text-slate-400 font-mono",
                                                children: Object.entries(manualOverrides).map(([campaignLineIdx, tab])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "bg-green-50 dark:bg-green-900/20 p-2 rounded border-l-2 border-green-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: [
                                                                        "Campaign Line ",
                                                                        campaignLineIdx,
                                                                        ":"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                    lineNumber: 1205,
                                                                    columnNumber: 30
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                lineNumber: 1205,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-green-700 dark:text-green-400",
                                                                children: [
                                                                    '→ Overridden to "',
                                                                    tab,
                                                                    '"'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                lineNumber: 1206,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, campaignLineIdx, true, {
                                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                        lineNumber: 1204,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1202,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-500 dark:text-slate-500 italic",
                                                children: "No manual overrides applied"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1211,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 1199,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 1183,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 pt-3 border-t border-slate-200 dark:border-slate-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-slate-700 dark:text-slate-300 mb-2",
                                        children: "How Indexing Works"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 1216,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-600 dark:text-slate-400 space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Display Row:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                        lineNumber: 1218,
                                                        columnNumber: 20
                                                    }, this),
                                                    " Position in the table you see (changes when rows are deleted)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1218,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Campaign Line Index:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                        lineNumber: 1219,
                                                        columnNumber: 20
                                                    }, this),
                                                    " Stable ID assigned during parsing (never changes, used for overrides)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1219,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Stable ID:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                        lineNumber: 1220,
                                                        columnNumber: 20
                                                    }, this),
                                                    " Position in original parsed data (used for deletion tracking)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1220,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 1217,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 1215,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 1182,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                lineNumber: 1178,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-slate-800 rounded-lg shadow-lg mb-4 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto overflow-y-auto",
                    style: {
                        maxHeight: 'calc(100vh - 280px)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-full divide-y divide-slate-200 dark:divide-slate-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "sticky top-0 z-10 bg-slate-50 dark:bg-slate-900",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1.5 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider bg-slate-50 dark:bg-slate-900 sticky left-0 z-20",
                                            children: "#"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 1233,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1.5 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap bg-slate-50 dark:bg-slate-900",
                                            children: "Tab Assignment"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 1236,
                                            columnNumber: 17
                                        }, this),
                                        filteredHeaders.map((header, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-1.5 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap",
                                                children: header
                                            }, idx, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1240,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 1232,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 1231,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800",
                                children: rowsWithCategories.map((row, rowIdx)=>{
                                    const category = row._category;
                                    const isHeader = category.tab === 'section-header';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: `${isHeader ? 'bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-indigo-900 dark:to-indigo-800 border-t-2 border-b-2 border-indigo-300 dark:border-indigo-600' : category.tab === 'Excluded' ? 'bg-gray-100 hover:bg-gray-150 dark:bg-gray-800/50 dark:hover:bg-gray-800/70 opacity-75' // Gray out excluded rows
                                         : row._masterIndex !== row._index ? 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-l-4 border-blue-300' // More prominent background for merged tactic rows
                                         : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: `px-2 py-2 text-xs font-medium sticky left-0 relative ${isHeader ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200' : row._masterIndex !== row._index ? 'text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10' : 'text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/50'}`,
                                                onMouseEnter: ()=>!isHeader && setHoveredRow(rowIdx),
                                                onMouseLeave: ()=>setHoveredRow(null),
                                                children: isHeader ? '▼' : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-1 relative",
                                                    children: [
                                                        hoveredRow === rowIdx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDeleteRow(row._stableRowId),
                                                            className: "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors",
                                                            title: "Delete this row",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "h-4 w-4",
                                                                viewBox: "0 0 20 20",
                                                                fill: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fillRule: "evenodd",
                                                                    d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
                                                                    clipRule: "evenodd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                    lineNumber: 1292,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                lineNumber: 1286,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                            lineNumber: 1281,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: rowIdx + 1
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                            lineNumber: 1300,
                                                            columnNumber: 29
                                                        }, this),
                                                        row._masterIndex !== row._index && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-blue-500",
                                                            title: "Part of merged tactic group",
                                                            children: "📎"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                            lineNumber: 1303,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                    lineNumber: 1279,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1267,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: `px-2 py-2 text-xs sticky left-0 ${isHeader ? 'bg-indigo-100 dark:bg-indigo-900' : 'bg-white dark:bg-slate-800'}`,
                                                children: isHeader ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-3 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-bold uppercase tracking-wide",
                                                    children: [
                                                        "📂 ",
                                                        category.sectionName,
                                                        " Section"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                    lineNumber: 1316,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        row._hasManualOverride && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded font-medium",
                                                            title: "Manual override applied",
                                                            children: "✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                            lineNumber: 1322,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: category.tab,
                                                            onChange: (e)=>handleCategoryChange(row._index, e.target.value),
                                                            className: `px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${category.tab === 'Brand Say Digital' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : category.tab === 'Brand Say Social' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200' : category.tab === 'Other Say Social' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' : category.tab === 'Excluded' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Brand Say Digital",
                                                                    children: "Brand Say Digital"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                    lineNumber: 1341,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Brand Say Social",
                                                                    children: "Brand Say Social"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                    lineNumber: 1342,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Other Say Social",
                                                                    children: "Other Say Social"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                    lineNumber: 1343,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Excluded",
                                                                    children: "Excluded (Non-Digital)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                    lineNumber: 1344,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                            lineNumber: 1326,
                                                            columnNumber: 27
                                                        }, this),
                                                        category.tab === 'Excluded' && category.reason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-1.5 py-0.5 rounded",
                                                            title: "Exclusion reason",
                                                            children: category.reason
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                            lineNumber: 1347,
                                                            columnNumber: 29
                                                        }, this),
                                                        manualOverrides[row._index] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-amber-600 dark:text-amber-400",
                                                            title: "Manually changed",
                                                            children: "✏️"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                            lineNumber: 1352,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                lineNumber: 1310,
                                                columnNumber: 21
                                            }, this),
                                            filteredHeaders.map((header, colIdx)=>{
                                                // Get the actual header from the original column index
                                                const actualHeader = header;
                                                const normalizedKey = actualHeader.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr)=>chr.toUpperCase()).replace(/^[^a-z]+/, "");
                                                // IMPORTANT: Get the mapped key for special columns like "Campaign Details - Placements"
                                                const mappedKey = actualHeader === 'Campaign Details - Placements' ? 'placements' : normalizedKey;
                                                // Check if this is a shared financial column or date column
                                                const headerLower = actualHeader.toLowerCase().replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/\//g, ' ').trim();
                                                const isSharedFinancialColumn = headerLower.includes('cpm') || headerLower.includes('impression') || headerLower.includes('grp') || headerLower.includes('gross media cost') || headerLower.includes('gross budget') || headerLower.includes('net budget') || headerLower.includes('media cost') || headerLower.includes('ad serving') || headerLower.includes('dv cost') || headerLower.includes('buffer') || headerLower.includes('working media budget') || headerLower.includes('working media cost') || headerLower.includes('working media') || headerLower.includes('media fee total') || headerLower.includes('start date') || headerLower.includes('end date') || headerLower.includes('flight start') || headerLower.includes('flight end') || headerLower.includes('placement'); // Placements is also shared
                                                // Debug: Log shared financial column detection (only once per column)
                                                if (isSharedFinancialColumn && rowIdx === 0) {
                                                    console.log(`💰 Detected shared financial column: "${actualHeader}" -> normalized: "${headerLower}"`);
                                                }
                                                // If this is a shared financial column and the current row is part of a tactic group,
                                                // use the value from the master row instead
                                                // Try mapped key first, then fall back to normalized key
                                                let value = row[mappedKey] !== undefined ? row[mappedKey] : row[normalizedKey];
                                                // Debug: Always log for shared financial columns to see what's happening (limit to first few rows)
                                                if (isSharedFinancialColumn && rowIdx < 3) {
                                                    console.log(`💰 Shared Financial Column Debug (Row ${rowIdx}):`, {
                                                        rowIndex: row._index,
                                                        masterIndex: row._masterIndex,
                                                        isMerged: row._masterIndex !== row._index,
                                                        header: actualHeader,
                                                        normalizedKey: normalizedKey,
                                                        originalValue: row[normalizedKey],
                                                        isSharedColumn: isSharedFinancialColumn,
                                                        allRowKeys: Object.keys(row)
                                                    });
                                                }
                                                let isValueFromMaster = false;
                                                if (isSharedFinancialColumn && row._masterIndex !== row._index) {
                                                    const masterRow = filteredRows[row._masterIndex];
                                                    if (masterRow) {
                                                        // Try the mapped key first, then normalized key
                                                        value = masterRow[mappedKey] !== undefined ? masterRow[mappedKey] : masterRow[normalizedKey];
                                                        // If no value found, try alternative key variations
                                                        if (value === undefined || value === null || value === "") {
                                                            const alternativeKeys = [];
                                                            // For placements, try variations
                                                            if (headerLower.includes('placement')) {
                                                                alternativeKeys.push('placements', 'placement');
                                                            }
                                                            // For impressions/grps, try different variations
                                                            if (headerLower.includes('impression') || headerLower.includes('grp')) {
                                                                alternativeKeys.push('impressions', 'grps', 'impressionsGrps', 'grp', 'estImpressions');
                                                            }
                                                            // For gross media cost, try variations
                                                            if (headerLower.includes('gross media cost')) {
                                                                alternativeKeys.push('grossMediaCost', 'grossMedia', 'mediaCost');
                                                            }
                                                            // For ad serving, try variations
                                                            if (headerLower.includes('ad serving')) {
                                                                alternativeKeys.push('adServing', 'adServingCost');
                                                            }
                                                            // For dv cost, try variations
                                                            if (headerLower.includes('dv cost')) {
                                                                alternativeKeys.push('dvCost', 'dv');
                                                            }
                                                            // For media fee total, try variations
                                                            if (headerLower.includes('media fee total')) {
                                                                alternativeKeys.push('mediaFeeTotal', 'mediaFee');
                                                            }
                                                            // For working media budget/cost, try variations
                                                            if (headerLower.includes('working media budget') || headerLower.includes('working media cost')) {
                                                                alternativeKeys.push('workingMediaBudget', 'workingMediaCost', 'workingMedia');
                                                            }
                                                            // For gross budget, try variations
                                                            if (headerLower.includes('gross budget')) {
                                                                alternativeKeys.push('grossBudget', 'gross');
                                                            }
                                                            // For net budget, try variations
                                                            if (headerLower.includes('net budget')) {
                                                                alternativeKeys.push('netBudget', 'net');
                                                            }
                                                            // For buffer, try variations
                                                            if (headerLower.includes('buffer')) {
                                                                alternativeKeys.push('buffer', 'mediaBuffer');
                                                            }
                                                            // For date fields, try variations
                                                            if (headerLower.includes('start date') || headerLower.includes('flight start')) {
                                                                alternativeKeys.push('startDate', 'flightStart', 'flightStartDate', 'start');
                                                            }
                                                            if (headerLower.includes('end date') || headerLower.includes('flight end')) {
                                                                alternativeKeys.push('endDate', 'flightEnd', 'flightEndDate', 'end');
                                                            }
                                                            // Try each alternative key
                                                            for (const altKey of alternativeKeys){
                                                                if (masterRow[altKey] !== undefined && masterRow[altKey] !== null && masterRow[altKey] !== "") {
                                                                    value = masterRow[altKey];
                                                                    console.log(`🔄 Using alternative key "${altKey}" for "${actualHeader}": ${value}`);
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                        isValueFromMaster = true;
                                                        console.log(`✅ USING MASTER VALUE:`, {
                                                            rowIndex: row._index,
                                                            masterIndex: row._masterIndex,
                                                            header: actualHeader,
                                                            normalizedKey: normalizedKey,
                                                            originalValue: row[normalizedKey],
                                                            masterValue: value,
                                                            masterRowExists: true,
                                                            masterRowKeys: Object.keys(masterRow)
                                                        });
                                                    } else {
                                                        console.log(`❌ MASTER ROW NOT FOUND:`, {
                                                            rowIndex: row._index,
                                                            masterIndex: row._masterIndex,
                                                            header: actualHeader,
                                                            filteredRowsLength: filteredRows.length
                                                        });
                                                    }
                                                }
                                                // Check if this column should be formatted as currency, date, or number
                                                const isCurrencyColumn = headerLower.includes('cpm') || headerLower.includes('media cost') || headerLower.includes('ad serving') || headerLower.includes('dv cost') || headerLower.includes('media fee total') || headerLower.includes('working media budget') || headerLower.includes('working media cost') || headerLower.includes('gross budget') || headerLower.includes('net budget') || headerLower.includes('buffer') || headerLower.includes('budget');
                                                const isDateColumn = headerLower.includes('start date') || headerLower.includes('end date') || headerLower.includes('date');
                                                const isNumberColumn = headerLower.includes('impression') || headerLower.includes('grp');
                                                // Extract the actual value if it's an object (ExcelJS cell/formula object)
                                                let extractedValue = value;
                                                if (value && typeof value === 'object') {
                                                    console.log(`🔍 Object value detected for "${actualHeader}" (Row ${rowIdx}):`, {
                                                        value,
                                                        type: typeof value,
                                                        keys: Object.keys(value),
                                                        hasResult: 'result' in value,
                                                        hasValue: 'value' in value,
                                                        hasRichText: 'richText' in value,
                                                        hasText: 'text' in value
                                                    });
                                                    // Check if it's an ExcelJS rich text object
                                                    if (value.richText) {
                                                        extractedValue = value.richText.map((rt)=>rt.text).join('');
                                                        console.log(`  → Extracted from richText: ${extractedValue}`);
                                                    } else if (value.result !== undefined) {
                                                        extractedValue = value.result;
                                                        console.log(`  → Extracted from result: ${extractedValue}`);
                                                    } else if (value.value !== undefined) {
                                                        extractedValue = value.value;
                                                        console.log(`  → Extracted from value: ${extractedValue}`);
                                                    } else if (value.text !== undefined) {
                                                        extractedValue = value.text;
                                                        console.log(`  → Extracted from text: ${extractedValue}`);
                                                    } else {
                                                        console.warn(`⚠️ Unexpected object format for "${actualHeader}":`, value);
                                                        extractedValue = String(value);
                                                    }
                                                }
                                                // Format the value based on column type
                                                let displayValue = extractedValue;
                                                if (isCurrencyColumn && extractedValue !== undefined && extractedValue !== null && extractedValue !== "") {
                                                    const numValue = typeof extractedValue === 'number' ? extractedValue : parseFloat(String(extractedValue).replace(/[,$]/g, ''));
                                                    if (!isNaN(numValue)) {
                                                        displayValue = new Intl.NumberFormat('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        }).format(numValue);
                                                    }
                                                } else if (isDateColumn && extractedValue !== undefined && extractedValue !== null && extractedValue !== "") {
                                                    // Parse date string (YYYY-MM-DD format from Excel in UTC)
                                                    const dateStr = String(extractedValue);
                                                    const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
                                                    if (dateMatch) {
                                                        const [, year, month, day] = dateMatch;
                                                        // Use UTC to avoid timezone shifts that cause off-by-one-day errors
                                                        const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
                                                        // Format as "Sept, 21, 2025" using UTC
                                                        displayValue = date.toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                            timeZone: 'UTC'
                                                        });
                                                    }
                                                } else if (isNumberColumn && extractedValue !== undefined && extractedValue !== null && extractedValue !== "") {
                                                    // Format impressions/GRPs as whole numbers with commas
                                                    const numValue = typeof extractedValue === 'number' ? extractedValue : parseFloat(String(extractedValue).replace(/[,$]/g, ''));
                                                    if (!isNaN(numValue)) {
                                                        displayValue = Math.round(numValue).toLocaleString('en-US');
                                                    }
                                                }
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: `px-2 py-2 whitespace-nowrap ${isHeader ? 'font-bold text-base text-indigo-900 dark:text-indigo-100 bg-indigo-50 dark:bg-indigo-800' : isValueFromMaster ? 'text-xs text-slate-900 dark:text-slate-100 bg-green-50 dark:bg-green-900/20 border-l-2 border-green-400' : 'text-xs text-slate-900 dark:text-slate-100'}`,
                                                    children: isHeader && colIdx === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg",
                                                                children: "📺"
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                lineNumber: 1628,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "uppercase tracking-wider",
                                                                children: value
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                lineNumber: 1629,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                        lineNumber: 1627,
                                                        columnNumber: 29
                                                    }, this) : displayValue !== undefined && displayValue !== null && displayValue !== "" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            String(displayValue),
                                                            isValueFromMaster && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-green-600 dark:text-green-400",
                                                                title: "Shared from master row",
                                                                children: "🔗"
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                                lineNumber: 1636,
                                                                columnNumber: 35
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                        lineNumber: 1633,
                                                        columnNumber: 31
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-400",
                                                        children: "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                        lineNumber: 1642,
                                                        columnNumber: 31
                                                    }, this)
                                                }, colIdx, false, {
                                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                                    lineNumber: 1616,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        ]
                                    }, rowIdx, true, {
                                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                        lineNumber: 1255,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 1249,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 1230,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                    lineNumber: 1229,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                lineNumber: 1228,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-5 h-5 text-red-500 mt-0.5",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                lineNumber: 1666,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1660,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium text-red-900 dark:text-red-100",
                                    children: "Error"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 1674,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-700 dark:text-red-200 text-sm",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 1677,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1673,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                    lineNumber: 1659,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                lineNumber: 1658,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex gap-3 sticky bottom-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "outline",
                        onClick: onBackToUpload,
                        disabled: isProcessing,
                        className: "min-w-[200px]",
                        children: "← Upload Different File"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 1687,
                        columnNumber: 13
                    }, this),
                    isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "outline",
                        onClick: ()=>{
                            // Create CSV content
                            const csvRows = [];
                            // Add headers
                            const headers = [
                                'Row #',
                                'Campaign Line',
                                ...initialHeaders,
                                '_mergeSpan',
                                '_campaignLineMasterRow'
                            ];
                            csvRows.push(headers.map((h)=>`"${h}"`).join(','));
                            // Add data rows
                            filteredRows.forEach((row, idx)=>{
                                const rowNum = idx + 1;
                                const isMaster = !row._campaignLineMasterRow || row._campaignLineMasterRow === row._campaignLineMasterRow;
                                const campaignLineLabel = row._mergeSpan > 1 ? `Master (spans ${row._mergeSpan} rows)` : row._campaignLineMasterRow ? `Part of line starting at row ${row._campaignLineMasterRow}` : 'Standalone';
                                const values = [
                                    rowNum,
                                    campaignLineLabel,
                                    ...initialHeaders.map((header)=>{
                                        const normalizedKey = header.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr)=>chr.toUpperCase()).replace(/^[^a-z]+/, "");
                                        // Use mapped key for special columns like "Campaign Details - Placements"
                                        const mappedKey = header === 'Campaign Details - Placements' ? 'placements' : normalizedKey;
                                        // Try mapped key first, fall back to normalized key
                                        const value = row[mappedKey] !== undefined ? row[mappedKey] : row[normalizedKey];
                                        // Escape quotes and wrap in quotes
                                        if (value === null || value === undefined) return '';
                                        return `"${String(value).replace(/"/g, '""')}"`;
                                    }),
                                    row._mergeSpan || '',
                                    row._campaignLineMasterRow || ''
                                ];
                                csvRows.push(values.join(','));
                            });
                            // Create blob and download
                            const csv = csvRows.join('\n');
                            const blob = new Blob([
                                csv
                            ], {
                                type: 'text/csv;charset=utf-8;'
                            });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `blocking-chart-parsed-${new Date().toISOString().slice(0, 10)}.csv`;
                            link.click();
                            URL.revokeObjectURL(url);
                        },
                        disabled: isProcessing,
                        className: "min-w-[180px]",
                        children: "📥 Download CSV"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 1696,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "primary",
                        onClick: onGenerate,
                        disabled: isProcessing,
                        className: "flex-1",
                        children: isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center justify-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "animate-spin h-5 w-5",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            className: "opacity-25",
                                            cx: "12",
                                            cy: "12",
                                            r: "10",
                                            stroke: "currentColor",
                                            strokeWidth: "4",
                                            fill: "none"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 1766,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            className: "opacity-75",
                                            fill: "currentColor",
                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                            lineNumber: 1775,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 1762,
                                    columnNumber: 19
                                }, this),
                                "Generating..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1761,
                            columnNumber: 13
                        }, this) : `✓ Looks Good, Generate Traffic Sheet (${filteredRows.length} tactics) →`
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                        lineNumber: 1754,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                lineNumber: 1686,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
        lineNumber: 1006,
        columnNumber: 5
    }, this);
}
_s1(VerifyStep, "YCJ1gdf3V0Vg5fBUc0c9GZ4kP7w=");
_c2 = VerifyStep;
// Generate Step Component
function GenerateStep({ success, isProcessing, error, onStartOver }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl mx-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-slate-800 rounded-lg shadow-lg p-12 text-center",
            children: [
                isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "animate-spin h-16 w-16 text-blue-600 mx-auto mb-4",
                            viewBox: "0 0 24 24",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 1813,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                                    lineNumber: 1822,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1809,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-bold text-slate-900 dark:text-white mb-2",
                            children: "Generating Your Traffic Sheet"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1828,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-600 dark:text-slate-400",
                            children: "Please wait while we format your data..."
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1831,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                    lineNumber: 1808,
                    columnNumber: 11
                }, this),
                success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-6xl mb-4",
                            children: "✅"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1839,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-bold text-slate-900 dark:text-white mb-2",
                            children: "Traffic Sheet Generated Successfully!"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1840,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-600 dark:text-slate-400 mb-8",
                            children: "Your file has been downloaded. Check your Downloads folder."
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1843,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "primary",
                            onClick: onStartOver,
                            children: "Generate Another Traffic Sheet"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1846,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                    lineNumber: 1838,
                    columnNumber: 11
                }, this),
                error && !isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-6xl mb-4",
                            children: "❌"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1854,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-bold text-red-900 dark:text-red-100 mb-2",
                            children: "Generation Failed"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1855,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-700 dark:text-red-200 mb-8",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1858,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$core$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "primary",
                            onClick: onStartOver,
                            children: "Try Again"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                            lineNumber: 1861,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
                    lineNumber: 1853,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
            lineNumber: 1806,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/app/apps/traffic-sheet-automation/page.tsx",
        lineNumber: 1805,
        columnNumber: 5
    }, this);
}
_c3 = GenerateStep;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TrafficSheetAutomation");
__turbopack_context__.k.register(_c1, "UploadStep");
__turbopack_context__.k.register(_c2, "VerifyStep");
__turbopack_context__.k.register(_c3, "GenerateStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=packages_c061490d._.js.map