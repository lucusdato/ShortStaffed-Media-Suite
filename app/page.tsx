"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import BugReportModal from "@/core/ui/BugReportModal";
import Header from "@/core/ui/Header";
import { getUserIdentity } from "@/core/analytics/localStorage";
import { findUserByName } from "@/core/analytics/userDirectory";

interface Tool {
  id: string;
  name: string;
  description: string;
  status: "available" | "coming-soon";
  href: string;
  icon: string;
  devOnly?: boolean; // Tools only available to developers
}

const tools: Tool[] = [
  {
    id: "traffic-sheet",
    name: "Traffic Sheet Automation",
    description: "Upload your blocking chart and instantly generate a client-ready traffic sheet using the built-in Unilever template",
    status: "available",
    href: "/apps/traffic-sheet-automation",
    icon: "📊",
  },
  {
    id: "rfp-importer",
    name: "RFP/DAB Form Importer",
    description: "Convert finalized blocking charts into pre-filled RFP forms for partners",
    status: "coming-soon",
    href: "#",
    icon: "📝",
  },
  {
    id: "projection-calc",
    name: "Projection Calculator",
    description: "Automate campaign projection math (CPMs, CPPs, GRPs, Impressions)",
    status: "coming-soon",
    href: "#",
    icon: "🧮",
  },
  {
    id: "actualization",
    name: "Adserving Actualization Tool",
    description: "Update blocking charts using real ad-serving CPMs from platforms",
    status: "coming-soon",
    href: "#",
    icon: "🎯",
  },
  {
    id: "post-campaign",
    name: "Post-Campaign Actualizer",
    description: "Produce true spend reports comparing plan vs. delivery",
    status: "coming-soon",
    href: "#",
    icon: "📈",
  },
  {
    id: "taxonomy",
    name: "Accutics Taxonomy Generator",
    description: "Generate UNCC-compliant taxonomies for 7 platforms (DV360, TradeDesk, Amazon DSP, Meta, Pinterest, TikTok, Snapchat)",
    status: "available",
    href: "/apps/taxonomy-generator",
    icon: "🏷️",
    devOnly: true, // Only available to developers for testing
  },
];

export default function Home() {
  const [showBugReport, setShowBugReport] = useState(false);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Get current user identity and admin status on mount
  useEffect(() => {
    const identity = getUserIdentity();
    setCurrentUserName(identity?.userName || null);

    // Check if user is admin
    if (identity?.userName) {
      const userInfo = findUserByName(identity.userName);
      console.log('User lookup:', identity.userName, 'Admin status:', userInfo?.isAdmin);
      setIsAdmin(userInfo?.isAdmin === true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  // Filter tools based on user permissions
  const visibleTools = tools
    .filter(tool => {
      console.log(`Filtering ${tool.name}: isAdmin=${isAdmin}, status=${tool.status}, devOnly=${tool.devOnly}`);
      // If user is not admin, hide all coming-soon tools
      if (!isAdmin && tool.status === "coming-soon") {
        console.log(`  -> Hiding ${tool.name} (coming-soon, non-admin)`);
        return false;
      }
      // If user is not admin, hide all devOnly tools (like Taxonomy Generator)
      if (!isAdmin && tool.devOnly) {
        console.log(`  -> Hiding ${tool.name} (devOnly, non-admin)`);
        return false;
      }
      console.log(`  -> Showing ${tool.name}`);
      return true;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <Header
        title="QuickClick Media Suite"
        subtitle="Everything's better when things click quicker."
        showBackButton={false}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Available Tools
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Select a tool to get started
          </p>
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </main>

      {/* Bug Report Modal */}
      <BugReportModal
        isOpen={showBugReport}
        onClose={() => setShowBugReport(false)}
      />
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const isAvailable = tool.status === "available";

  const cardContent = (
    <div
      className={`
        group relative h-full p-6 rounded-xl border-2 transition-all duration-200
        ${
          isAvailable
            ? "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 opacity-60 cursor-not-allowed"
        }
      `}
    >
      {/* Status Badge */}
      {!isAvailable && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">
            Coming Soon
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="text-4xl mb-4">{tool.icon}</div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        {tool.name}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {tool.description}
      </p>

      {/* Hover indicator for available tools */}
      {isAvailable && (
        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Open tool
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </div>
  );

  if (isAvailable) {
    return <Link href={tool.href}>{cardContent}</Link>;
  }

  return cardContent;
}

