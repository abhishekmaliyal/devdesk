"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signUp, signIn } from "@/lib/auth-client";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = React.useRef<HTMLFormElement>(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Name validation (at least 2 non-whitespace characters)
  const isNameValid = React.useMemo(() => {
    return name.trim().length >= 2;
  }, [name]);

  // Email format validation
  const isEmailValid = React.useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  // Dynamic password criteria validation
  const passwordRequirements = React.useMemo(() => {
    return [
      { label: "8+ chars", met: password.length >= 8 },
      { label: "1 uppercase", met: /[A-Z]/.test(password) },
      { label: "1 numeric", met: /[0-9]/.test(password) },
      { label: "1 symbol", met: /[^A-Za-z0-9]/.test(password) },
    ];
  }, [password]);

  const allRequirementsMet = passwordRequirements.every((req) => req.met);
  const metCount = passwordRequirements.filter((req) => req.met).length;

  const securityBadge = React.useMemo(() => {
    if (!password) {
      return {
        text: "[SECURITY: STRONG]",
        color: "text-zinc-400 border-zinc-800 bg-zinc-900/60",
      };
    }
    if (metCount <= 1) {
      return {
        text: "[SECURITY: WEAK]",
        color: "text-red-400 border-red-900/60 bg-red-950/40",
      };
    }
    if (metCount <= 3) {
      return {
        text: "[SECURITY: MEDIUM]",
        color: "text-amber-400 border-amber-900/60 bg-amber-950/40",
      };
    }
    return {
      text: "[SECURITY: STRONG]",
      color: "text-emerald-400 border-emerald-900/60 bg-emerald-950/40",
    };
  }, [password, metCount]);

  // Extract callback URL from query parameters
  const callbackURL =
    searchParams.get("callbackURL") ||
    searchParams.get("callbackUrl") ||
    searchParams.get("redirect") ||
    "/";

  const handleSocialSignIn = React.useCallback(
    async (provider: "github" | "google") => {
      setError(null);
      try {
        await signIn.social({
          provider,
          callbackURL,
        });
      } catch {
        setError(`Failed to authenticate with ${provider}.`);
      }
    },
    [callbackURL]
  );

  // Handle keyboard shortcuts (ESC to clear, ⌘G for GitHub, ⌘L for Google, ↵ Enter to submit)
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        formRef.current?.reset();
        setName("");
        setEmail("");
        setPassword("");
        setError(null);
        formRef.current?.querySelector<HTMLInputElement>("#name")?.focus();
      }

      // Cmd/Ctrl + G for GitHub SSO
      if ((e.metaKey || e.ctrlKey) && (e.key === "g" || e.key === "G" || e.code === "KeyG")) {
        e.preventDefault();
        handleSocialSignIn("github");
      }

      // Cmd/Ctrl + L for Google SSO
      if ((e.metaKey || e.ctrlKey) && (e.key === "l" || e.key === "L" || e.code === "KeyL")) {
        e.preventDefault();
        handleSocialSignIn("google");
      }

      // Cmd/Ctrl + Enter to submit form
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSocialSignIn]);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;
    const terms = formData.get("terms") === "on";

    if (!terms) {
      setError("Please accept the Terms of Service and Security DPA.");
      return;
    }

    if (!name || name.length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!email || !isEmailValid) {
      setError("Please enter a valid work email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (!allRequirementsMet) {
      setError(
        "Please ensure your password meets all requirements (8+ chars, 1 uppercase, 1 numeric, 1 symbol).",
      );
      return;
    }

    setLoading(true);
    try {
      const result = await signUp.email({
        name,
        email,
        password,
        callbackURL,
      });

      if (result.error) {
        setError(result.error.message ?? "Unable to create account.");
        return;
      }

      router.push(callbackURL);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Main Registration Card */}
      <div className="w-full max-w-[540px] border border-zinc-800 bg-[#0e0e10] text-zinc-100 shadow-2xl">
        {/* Top Status Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#00E599]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-zinc-200">
              DEVDESK IDP // REGISTER
            </span>
          </div>
          <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
            v1.4-rc2
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Step Indicator & Headings */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-semibold tracking-wider text-zinc-300">
                [STEP 01/02 : CREDENTIALS]
              </span>
              <span className="border border-zinc-800/80 bg-zinc-900/40 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                TLS_1.3 // 256-GCM
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white font-sans">
              Create organization account
            </h1>
            <p className="mt-1 font-sans text-xs text-zinc-400 leading-relaxed">
              Developer access to DevDesk task canvas and sprint orchestrator.
              <br />
              14-day zero-friction trial.
            </p>
          </div>

          {/* SSO Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
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
              onClick={() => handleSocialSignIn("google")}
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
              OR REGISTER WITH EMAIL
            </span>
          </div>

          {/* Registration Form */}
          <form ref={formRef} className="space-y-4" onSubmit={handleFormSubmit}>
            {error && (
              <div className="border border-red-900/60 bg-red-950/40 p-2.5 font-mono text-xs text-red-400">
                {error}
              </div>
            )}

            {/* Field 01: Full Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="name"
                  className="font-mono text-[11px] font-medium tracking-wider text-zinc-400 uppercase"
                >
                  01 // FULL NAME
                </label>
                <span
                  className={`border px-1.5 py-0.5 font-mono text-[10px] uppercase transition-colors ${
                    isNameValid
                      ? "text-emerald-400 border-emerald-900/60 bg-emerald-950/40 font-semibold"
                      : "text-zinc-400 border-zinc-800 bg-zinc-900/60"
                  }`}
                >
                  [REQUIRED]
                </span>
              </div>
              <div className="relative flex items-center bg-white border border-transparent focus-within:ring-2 focus-within:ring-zinc-400">
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  autoFocus
                  autoComplete="name"
                  disabled={loading}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-white py-2.5 px-3 font-mono text-xs text-zinc-950 placeholder:text-zinc-500 outline-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Field 02: Work Email */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="email"
                  className="font-mono text-[11px] font-medium tracking-wider text-zinc-400 uppercase"
                >
                  02 // WORK EMAIL
                </label>
                <span
                  className={`border px-1.5 py-0.5 font-mono text-[10px] transition-colors ${
                    isEmailValid
                      ? "text-emerald-400 border-emerald-900/60 bg-emerald-950/40 font-semibold"
                      : "text-zinc-400 border-zinc-800 bg-zinc-900/60"
                  }`}
                >
                  [WORK_DOMAIN]
                </span>
              </div>
              <div className="relative flex items-center bg-white border border-transparent focus-within:ring-2 focus-within:ring-zinc-400">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  autoComplete="email"
                  disabled={loading}
                  placeholder="sarah@corp-runtime.internal"
                  className="w-full bg-white py-2.5 pl-3 pr-8 font-mono text-xs text-zinc-950 placeholder:text-zinc-500 outline-none disabled:opacity-50"
                />
                <span
                  className={`absolute right-3 font-mono text-xs select-none transition-colors ${
                    isEmailValid
                      ? "text-emerald-600 font-bold"
                      : "text-zinc-500"
                  }`}
                >
                  @
                </span>
              </div>
            </div>

            {/* Field 03: Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="font-mono text-[11px] font-medium tracking-wider text-zinc-400 uppercase"
                >
                  03 // PASSWORD
                </label>
                <span
                  className={`border px-1.5 py-0.5 font-mono text-[10px] transition-colors ${securityBadge.color}`}
                >
                  {securityBadge.text}
                </span>
              </div>
              <div className="relative flex items-center bg-white border border-transparent focus-within:ring-2 focus-within:ring-zinc-400">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                  placeholder="••••••••••••••"
                  className="w-full bg-white py-2.5 pl-3 pr-10 font-mono text-xs tracking-wider text-zinc-950 placeholder:text-zinc-500 outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-zinc-600 hover:text-zinc-950"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {/* Dynamic Password Requirements Checklist */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1.5 text-[10px] font-mono transition-colors">
                {passwordRequirements.map((req) => (
                  <span
                    key={req.label}
                    className={`flex items-center gap-1 transition-colors ${
                      req.met
                        ? "text-emerald-400 font-semibold"
                        : "text-zinc-500"
                    }`}
                  >
                    <span>{req.met ? "✓" : "○"}</span>
                    <span>{req.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Terms of Service Checkbox */}
            <div className="flex items-start gap-2 pt-2 justify-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="mt-0.5 h-3.5 w-3.5 rounded-none border border-zinc-700 bg-zinc-900 text-white accent-white focus:ring-0"
              />
              <label
                htmlFor="terms"
                className="font-mono text-xs text-zinc-400 select-none leading-tight"
              >
                Accept DevDesk{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-2 text-zinc-200 hover:text-white"
                >
                  Terms of Service (v2.1)
                </Link>{" "}
                and{" "}
                <Link
                  href="/dpa"
                  className="underline underline-offset-2 text-zinc-200 hover:text-white"
                >
                  Security DPA
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-3 flex w-full items-center justify-between bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-2">
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>{loading ? "PROVISIONING..." : "CREATE DEVDESK ACCOUNT"}</span>
              </div>
              <span className="border border-zinc-300 bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-800 shadow-sm font-bold">
                [ ↵ ENTER ]
              </span>
            </button>
          </form>

          {/* Footer Card Link */}
          <div className="mt-8 border-t border-zinc-800/80 pt-6 text-center">
            <p className="font-sans text-xs text-zinc-400">
              Already provisioned?{" "}
              <Link
                href={
                  callbackURL !== "/"
                    ? `/login?callbackURL=${encodeURIComponent(callbackURL)}`
                    : "/login"
                }
                className="font-mono font-bold text-white hover:underline ml-1"
              >
                SIGN IN →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Keyboard Navigation Hints */}
      <div className="mt-4 flex w-full max-w-[540px] items-center justify-between font-mono text-[11px] text-zinc-600">
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

export default function RegisterPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center p-8 font-mono text-xs text-zinc-500">
          Loading registration...
        </div>
      }
    >
      <RegisterForm />
    </React.Suspense>
  );
}
