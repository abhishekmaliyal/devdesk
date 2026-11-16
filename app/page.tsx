"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Database,
  Layers,
  Loader2,
  LogOut,
  Plus,
  Settings,
  ShieldCheck,
  Terminal,
  User,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

export default function HomePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleSignOut = React.useCallback(async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Failed to sign out:", err);
    } finally {
      setIsSigningOut(false);
    }
  }, [router]);

  // Handle keyboard shortcuts (ESC to sign out when menu open, ⌘P to toggle profile menu)
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Cmd/Ctrl + P to toggle profile menu
      if ((event.metaKey || event.ctrlKey) && (event.key === "p" || event.key === "P" || event.code === "KeyP")) {
        event.preventDefault();
        setDropdownOpen((prev) => !prev);
      }

      // When dropdown is open, ESC triggers Sign Out (as indicated by the [ESC] badge)
      if (event.key === "Escape" && dropdownOpen) {
        event.preventDefault();
        setDropdownOpen(false);
        handleSignOut();
      }

      // Cmd/Ctrl + Shift + Q to directly sign out from anywhere
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && (event.key === "q" || event.key === "Q" || event.code === "KeyQ")) {
        event.preventDefault();
        handleSignOut();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dropdownOpen, handleSignOut]);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [dropdownOpen]);

  const user = session?.user;

  return (
    <div className="min-h-screen w-full bg-[#050507] text-zinc-100 flex flex-col justify-between bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:32px_32px]">
      {/* Topbar */}
      <header className="sticky top-0 z-50 h-14 w-full border-b border-zinc-800/80 bg-[#070709]/95 backdrop-blur-md pl-4 sm:pl-6 pr-0 flex items-center justify-between">
        {/* Left: DevDesk Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          >
            <span className="h-2.5 w-2.5 bg-[#00E599] shadow-[0_0_8px_rgba(0,229,153,0.6)]" />
            <span className="font-mono text-sm font-bold tracking-wider text-zinc-100 uppercase">
              DevDesk
            </span>
          </Link>
          <span className="hidden sm:inline-block border-l border-zinc-800 pl-3 font-mono text-[11px] text-zinc-500 uppercase">
            {"// WORKSPACE"}
          </span>
          <span className="hidden md:inline-block border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
            v1.4-rc2
          </span>
        </div>

        {/* Right: Account Section (Full-Height Profile & Dropdown) */}
        <div className="h-full flex items-center">
          {isPending ? (
            <div className="h-full flex items-center gap-2 border-l border-zinc-800/80 px-4 font-mono text-xs text-zinc-500">
              <Loader2 className="h-3 w-3 animate-spin text-[#00E599]" />
              <span>SYNCING...</span>
            </div>
          ) : user ? (
            <div ref={dropdownRef} className="relative h-full flex items-center">
              {/* Full height Profile Trigger Button */}
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`h-full px-4 sm:px-5 flex items-center gap-3 border-l border-zinc-800/80 transition-colors cursor-pointer select-none text-left ${
                  dropdownOpen
                    ? "bg-zinc-900/90"
                    : "hover:bg-zinc-900/60"
                }`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                {/* User Initials Avatar */}
                <div className="flex h-7 w-7 items-center justify-center bg-zinc-800 text-xs font-bold text-white border border-zinc-700 shadow-sm flex-shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-3.5 w-3.5" />}
                </div>

                {/* Name & Email */}
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold leading-tight text-zinc-100 font-sans">
                    {user.name || "Developer"}
                  </span>
                  <span className="text-[10px] leading-tight text-zinc-400 font-mono truncate max-w-[150px]">
                    {user.email}
                  </span>
                </div>

                {/* Dropdown Chevron & Shortcut Hint */}
                <div className="flex items-center gap-1.5">
                  <span className="hidden md:inline-block border border-zinc-700/60 bg-zinc-800/60 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400">
                    ⌘P
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+1px)] w-68 border border-zinc-800 bg-[#0c0c0e] text-zinc-100 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-100 z-50">
                  {/* Account Header */}
                  <div className="p-3 border-b border-zinc-800/80 bg-zinc-950/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                        {"[IDENT_RECORD]"}
                      </span>
                      <span className="border border-emerald-900/60 bg-emerald-950/40 px-1.5 py-0.2 font-mono text-[9px] text-emerald-400 font-semibold">
                        ONLINE
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white font-sans truncate">
                      {user.name || "Developer"}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono truncate mt-0.5">
                      {user.email}
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="p-1.5 font-mono text-xs space-y-0.5">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(false)}
                      className="flex w-full items-center gap-2.5 px-3 py-2 text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors text-left"
                    >
                      <Settings className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Workspace Settings</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(false)}
                      className="flex w-full items-center gap-2.5 px-3 py-2 text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors text-left"
                    >
                      <Terminal className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Audit Logs</span>
                    </button>
                  </div>

                  {/* Sign Out Action */}
                  <div className="p-1.5 border-t border-zinc-800/80">
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        handleSignOut();
                      }}
                      disabled={isSigningOut}
                      className="flex w-full items-center justify-between px-3 py-2 font-mono text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors disabled:opacity-50 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {isSigningOut ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <LogOut className="h-3.5 w-3.5" />
                        )}
                        <span className="font-semibold">
                          {isSigningOut ? "EXITING..." : "SIGN OUT"}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono">[ESC]</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center pr-4 sm:pr-6">
              <Link
                href="/login"
                className="border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                SIGN IN →
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Workspace Dashboard Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Workspace Banner */}
        <div className="border border-zinc-800 bg-[#0e0e10] p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 border-b border-l border-zinc-800 bg-zinc-900/60 px-3 py-1 font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>IDP_SYNC_ONLINE</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <Terminal className="h-4 w-4 text-[#00E599]" />
              <span>[WORKSPACE_CLUSTER : PROD-01]</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Welcome back, {user?.name || "Developer"}
            </h1>
            <p className="font-sans text-sm text-zinc-400 max-w-2xl leading-relaxed">
              DevDesk task canvas and sprint orchestrator. Your development workspace
              is provisioned, secure, and synced with Neon Serverless Postgres.
            </p>
          </div>
        </div>

        {/* Telemetry & Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-zinc-800 bg-[#0e0e10] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {"01 // ACTIVE SPRINT"}
              </span>
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-base font-semibold text-white font-sans">
                Sprint 01: Core Platform
              </div>
              <div className="mt-1 font-mono text-xs text-zinc-500">
                8 of 12 tasks completed (67%)
              </div>
            </div>
          </div>

          <div className="border border-zinc-800 bg-[#0e0e10] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {"02 // DATABASE"}
              </span>
              <Database className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <div className="text-base font-semibold text-white font-sans">
                Neon Lakebase Postgres
              </div>
              <div className="mt-1 font-mono text-xs text-zinc-500">
                Connected &middot; Branch: production
              </div>
            </div>
          </div>

          <div className="border border-zinc-800 bg-[#0e0e10] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {"03 // IDENTITY & SECURITY"}
              </span>
              <ShieldCheck className="h-4 w-4 text-[#00E599]" />
            </div>
            <div>
              <div className="text-base font-semibold text-white font-sans">
                Better Auth v1.7
              </div>
              <div className="mt-1 font-mono text-xs text-zinc-500">
                TLS 1.3 &middot; Session Authenticated
              </div>
            </div>
          </div>
        </div>

        {/* Task Canvas & Orchestrator Placeholder */}
        <div className="border border-zinc-800 bg-[#0e0e10] shadow-xl">
          {/* Header */}
          <div className="border-b border-zinc-800 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-zinc-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200">
                Task Canvas &middot; Sprint Backlog
              </span>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <Plus className="h-3 w-3" />
              <span>NEW TASK</span>
            </button>
          </div>

          {/* Task List Items */}
          <div className="divide-y divide-zinc-800/80 font-mono text-xs">
            <div className="p-4 flex items-center justify-between hover:bg-zinc-900/40 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-zinc-500 font-medium">DD-101</span>
                <span className="text-zinc-200 font-sans">
                  Provision Neon PostgreSQL and configure Drizzle ORM schema
                </span>
              </div>
              <span className="border border-emerald-900/60 bg-emerald-950/40 px-2 py-0.5 text-[10px] text-emerald-400">
                COMPLETED
              </span>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-zinc-900/40 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-zinc-500 font-medium">DD-102</span>
                <span className="text-zinc-200 font-sans">
                  Implement Better Auth integration with Drizzle adapter
                </span>
              </div>
              <span className="border border-emerald-900/60 bg-emerald-950/40 px-2 py-0.5 text-[10px] text-emerald-400">
                COMPLETED
              </span>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-zinc-900/40 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-zinc-500 font-medium">DD-103</span>
                <span className="text-zinc-200 font-sans">
                  Design terminal-styled authentication flow with live validation
                </span>
              </div>
              <span className="border border-emerald-900/60 bg-emerald-950/40 px-2 py-0.5 text-[10px] text-emerald-400">
                COMPLETED
              </span>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-zinc-900/40 transition-colors">
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-none border border-amber-500/80 bg-amber-500/20 flex-shrink-0" />
                <span className="text-zinc-500 font-medium">DD-104</span>
                <span className="text-zinc-200 font-sans">
                  Build Kanban drag-and-drop task canvas with dnd-kit
                </span>
              </div>
              <span className="border border-amber-900/60 bg-amber-950/40 px-2 py-0.5 text-[10px] text-amber-400">
                IN PROGRESS
              </span>
            </div>
          </div>

          {/* Footer note */}
          <div className="border-t border-zinc-800/80 px-5 py-3 bg-zinc-950/40 flex items-center justify-between text-zinc-500 font-mono text-[11px]">
            <span>Showing 4 of 12 roadmap items</span>
            <span className="flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer">
              <span>View full sprint backlog</span>
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 w-full border-t border-zinc-800/80 bg-[#070709]/80 backdrop-blur-sm flex items-center justify-between px-4 sm:px-6 font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>{"DEVDESK_OS // READY"}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-500">
          <span>SHORTCUTS:</span>
          <span className="border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 text-zinc-400">⌘P</span>
          <span>PROFILE</span>
          <span className="mx-1 text-zinc-700">&middot;</span>
          <span className="border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 text-zinc-400">ESC</span>
          <span>SIGN OUT (IN MENU)</span>
        </div>
        <div>Made with ❤️</div>
      </footer>
    </div>
  );
}
