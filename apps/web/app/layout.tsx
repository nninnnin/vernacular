import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import { ControlPanel } from "@vernacular/control-panel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vernacular",
  description: "Get your UI Inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col overflow-hidden bg-zinc-100 text-zinc-900 font-sans">
        <Providers>
          <TopNav />

          <div className="flex flex-1 gap-3 p-3 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-white rounded-2xl border border-zinc-200 shadow-lg">{children}</main>
            <ControlPanel />
          </div>
        </Providers>
      </body>
    </html>
  );
}
