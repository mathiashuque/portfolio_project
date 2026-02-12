import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import Field from "./Field";
import type { Status } from "./types";

type ContactFormProps = {
  mailtoTo: string; // e.g. "mathiashuque2004@gmail.com"
};

export default function ContactForm({ mailtoTo }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [status, setStatus] = useState<Status>({ state: "idle" });

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status.state !== "idle") setStatus({ state: "idle" });
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function openMailtoFallback(name: string, email: string, message: string) {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );

    window.location.href = `mailto:${mailtoTo}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus({ state: "error", text: "Please fill in all fields." });
      return;
    }
    if (!isValidEmail(email)) {
      setStatus({ state: "error", text: "Please enter a valid email address." });
      return;
    }

    try {
      // NOTE: your original code used "success" for "Sending…" as well.
      setStatus({ state: "success", text: "Sending…" });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({})) as Record<string, unknown>;
      if (!res.ok) throw new Error((data?.error as string) || "Failed to send");

      setForm({ name: "", email: "", message: "" });
      setStatus({ state: "success", text: "Message sent. Thanks!" });
    } catch {
      setStatus({
        state: "success",
        text: "Couldn’t send automatically — opening your email client…",
      });

      openMailtoFallback(name, email, message);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border/10 bg-input px-4 py-2.5 text-sm text-text shadow-sm outline-none transition " +
    "placeholder:text-faint/70 focus:border-accent/40 focus:ring-4 focus:ring-accent/20";

  return (
    <div className="rounded-2xl bg-panel p-5 shadow-sm ring-1 ring-border/10 sm:p-6">
      <h3 className="text-xl font-semibold text-text">Send a Message</h3>

      <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
        <Field
          label="Your Name"
          value={form.name}
          onChange={(v) => updateField("name", v)}
          placeholder="Your Name"
          autoComplete="name"
          className={inputClass}
        />

        <Field
          label="Your Email"
          value={form.email}
          onChange={(v) => updateField("email", v)}
          placeholder="Your Email"
          inputMode="email"
          autoComplete="email"
          className={inputClass}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted/90">
            Your Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Your Message"
            rows={3}
            className={inputClass.replace("w-full", "w-full resize-none")}
          />
        </div>

        {status.state !== "idle" && (
          <div
            className={[
              "flex items-start gap-2 rounded-xl border px-4 py-2.5 text-sm",
              status.state === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-rose-200 bg-rose-50 text-rose-800",
            ].join(" ")}
            role="status"
          >
            {status.state === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4" />
            )}
            <p>{status.text}</p>
          </div>
        )}

        <button
          type="submit"
          className="
            mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl
            bg-linear-to-r from-accent to-pink-500 px-5 py-3 text-sm font-semibold
            text-white shadow-sm transition hover:opacity-95
            focus:outline-none focus:ring-4 focus:ring-accent/25
          "
        >
          <Send className="h-4 w-4" />
          Send Message
        </button>

        <p className="text-center text-xs text-faint/90">
          By sending, your email client may open.
        </p>
      </form>
    </div>
  );
}
