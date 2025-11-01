import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/core/ui/AnalyticsProvider";
// Trigger deployment with env vars

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickClick Media Suite",
  description: "Automated tools for media planning and execution",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}

