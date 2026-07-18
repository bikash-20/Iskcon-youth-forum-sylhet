"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/admin";

  const [pw, setPw] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErr(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        setErr(j?.error?.message ?? "Login failed");
        setStatus("error");
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setErr("Network error");
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 rounded-2xl border border-maroon-700/10 bg-cream-50 p-6 shadow-soft"
    >
      <label className="block">
        <span className="block text-xs font-medium uppercase tracking-wider text-maroon-700/80">
          Password
        </span>
        <input
          autoFocus
          required
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="mt-2 w-full rounded-xl border border-maroon-700/15 bg-cream-100/40 px-4 py-3 text-base text-ink-900 outline-none focus:border-maroon-700/50 focus:bg-cream-50 transition-colors"
          placeholder="••••••••"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-maroon-700 px-6 py-3 text-sm font-medium text-cream-50 hover:bg-maroon-800 disabled:opacity-60"
      >
        {status === "submitting" ? "Signing in…" : "Sign in"}
      </button>

      {status === "error" && err && (
        <p className="mt-4 text-sm text-maroon-700">{err}</p>
      )}
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm">
      <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
        Admin
      </p>
      <h1 className="mt-2 font-serif text-4xl text-ink-900 tracking-tightish">
        Sign in
      </h1>
      <p className="mt-2 text-sm text-ink-800/70">
        Restricted area for the IYF coordinator.
      </p>

      <Suspense
        fallback={
          <div className="mt-8 h-44 rounded-2xl border border-maroon-700/10 bg-cream-50" />
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}