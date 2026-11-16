"use client";

import * as React from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const rememberDevice = formData.get("remember") === "on";
      console.log({ email, password, rememberDevice });
      setLoading(true);
    } catch {
      setError("error submitting form");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Main Auth Card */}
      <div className="w-full max-w-[440px] border border-zinc-800 bg-[#0e0e10] text-zinc-100 shadow-2xl">
        {/* Top Status Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#00E599]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-zinc-200">
              IDP
            </span>
          </div>
          <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
            v1.0
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Welcome Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
              Welcome back
            </h1>
            <p className="mt-1 font-sans text-xs text-zinc-400">
              Authenticate with SSO provider or workspace credentials.
            </p>
          </div>

          {/* SSO Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-between border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/90 px-3 py-2.5 text-xs text-zinc-200 transition-colors"
            >
              <div className="flex items-center gap-2 font-medium">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </div>
              <span className="border border-zinc-700/60 bg-zinc-800/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                ⌘G
              </span>
            </button>

            <button
              type="button"
              className="flex items-center justify-between border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/90 px-3 py-2.5 text-xs text-zinc-200 transition-colors"
            >
              <div className="flex items-center gap-2 font-medium">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Google</span>
              </div>
              <span className="border border-zinc-700/60 bg-zinc-800/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                ⌘L
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-zinc-800" />
            <span className="absolute bg-[#0e0e10] px-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {/* Credentials Form */}
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {error && (
              <div className="border border-red-900/60 bg-red-950/40 p-2.5 font-mono text-xs text-red-400">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="email"
                  className="font-mono text-[11px] font-medium tracking-wider text-zinc-400 uppercase"
                >
                  WORK EMAIL
                </label>
                <span className="font-mono text-[11px] text-zinc-600">
                  name@company.com
                </span>
              </div>
              <div className="relative flex items-center border border-zinc-800 bg-[#08080a] focus-within:border-zinc-600">
                <span className="pl-3 pr-2 font-mono text-sm text-zinc-500">
                  @
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="alex@acme.corp"
                  className="w-full bg-transparent py-2.5 pr-3 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="font-mono text-[11px] font-medium tracking-wider text-zinc-400 uppercase"
                >
                  PASSWORD
                </label>
                <Link
                  href="/reset-password"
                  className="font-mono text-[11px] text-zinc-400 hover:text-zinc-200 underline underline-offset-4"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative flex items-center border border-zinc-800 bg-[#08080a] focus-within:border-zinc-600">
                <Lock className="ml-3 mr-2 h-4 w-4 text-zinc-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••"
                  className="w-full bg-transparent py-2.5 pr-2 font-mono text-xs tracking-wider text-zinc-200 placeholder:text-zinc-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-3 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-3.5 w-3.5 rounded-none border border-zinc-700 bg-zinc-900 text-white accent-white focus:ring-0"
              />
              <label
                htmlFor="remember"
                className="font-mono text-xs text-zinc-400 select-none cursor-pointer"
              >
                Remember this device (30d)
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-between bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-2">
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>{loading ? "SIGNING IN..." : "SIGN IN TO DEVDESK"}</span>
              </div>
              <span className="flex items-center gap-1 border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-600 shadow-sm">
                ↵ Enter
              </span>
            </button>
          </form>

          {/* Footer Card Link */}
          <div className="mt-8 border-t border-zinc-800/80 pt-6 text-center">
            <p className="font-sans text-xs text-zinc-400">
              Don&apos;t have an organization workspace?{" "}
              <Link
                href="/register"
                className="font-mono font-bold text-white hover:underline"
              >
                Create account →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Keyboard Navigation Hints */}
      <div className="mt-4 flex w-full max-w-[440px] items-center justify-between font-mono text-[11px] text-zinc-600">
        <div className="flex items-center gap-1.5">
          <span className="border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 text-zinc-400">
            Tab
          </span>
          <span>to navigate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 text-zinc-400">
            ESC
          </span>
          <span>to clear</span>
        </div>
      </div>
    </div>
  );
}
