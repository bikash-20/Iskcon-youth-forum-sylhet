"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    // Honeypot: must remain empty. Real users never see it.
    hp: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error?: { message?: string } }
        | null;
      if (!res.ok || !json || json.ok !== true) {
        const m =
          json && json.ok === false && json.error?.message
            ? json.error.message
            : "Could not send your message. Please try again.";
        setMessage(m);
        setStatus("error");
        return;
      }
      setStatus("success");
      setMessage("Thank you — we'll write back soon.");
      setForm({ name: "", email: "", phone: "", message: "", hp: "" });
    } catch {
      setMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-maroon-700/10 bg-cream-50 p-7 shadow-soft sm:p-8"
    >
      <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
        Send a message
      </p>

      {/* Honeypot — hidden from users and screen readers. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px" }}>
        <label>
          Leave this empty
          <input
            type="text"
            name="hp"
            tabIndex={-1}
            autoComplete="off"
            value={form.hp}
            onChange={onChange}
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name">
          <input
            required
            name="name"
            value={form.name}
            onChange={onChange}
            maxLength={120}
            className={inputCls}
            placeholder="Rohan Das"
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            maxLength={254}
            className={inputCls}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Phone (optional)" className="sm:col-span-2">
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            maxLength={40}
            className={inputCls}
            placeholder="+880 ..."
          />
        </Field>
        <Field label="Message" className="sm:col-span-2">
          <textarea
            required
            name="message"
            rows={5}
            value={form.message}
            onChange={onChange}
            maxLength={4000}
            className={`${inputCls} resize-y`}
            placeholder="Tell us a little about why you're writing..."
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="focus-saffron inline-flex items-center gap-2 rounded-full bg-maroon-700 px-6 py-3 text-sm font-medium text-cream-50 shadow-soft transition-all hover:bg-maroon-800 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === "submitting" ? (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 animate-spin"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
                <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
              </svg>
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>Send message</span>
              <span>→</span>
            </>
          )}
        </button>
        {message && (
          <p
            className={`text-sm ${status === "success" ? "text-maroon-700" : "text-maroon-700"}`}
            role={status === "error" ? "alert" : "status"}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

const inputCls =
  "focus-saffron w-full rounded-xl border border-maroon-700/15 bg-cream-100/40 px-4 py-3 text-base text-ink-900 outline-none placeholder:text-ink-800/40 focus:border-maroon-700/50 focus:bg-cream-50 transition-colors";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-medium uppercase tracking-wider text-maroon-700/80">
        {label}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}