"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import Field from "./Field";
import type { Status } from "./types";

type ContactFormProps = {
  mailtoTo: string;
};

export default function ContactForm({ mailtoTo }: ContactFormProps) {
  const t = useTranslations("Contact.form");

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
    const subject = encodeURIComponent(t("mailto.subject", { name }));
    const body = encodeURIComponent(t("mailto.body", { name, email, message }));

    window.location.href = `mailto:${mailtoTo}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus({ state: "error", text: t("errors.missingFields") });
      return;
    }
    if (!isValidEmail(email)) {
      setStatus({ state: "error", text: t("errors.invalidEmail") });
      return;
    }

    try {
      setStatus({ state: "success", text: t("status.sending") });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await res.json().catch(() => ({}))) as Record<
        string,
        unknown
      >;
      if (!res.ok)
        throw new Error((data?.error as string) || t("errors.sendFailed"));

      setForm({ name: "", email: "", message: "" });
      setStatus({ state: "success", text: t("status.sent") });
    } catch {
      setStatus({
        state: "success",
        text: t("status.fallback"),
      });

      openMailtoFallback(name, email, message);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border/10 bg-input px-4 py-2.5 text-sm text-text shadow-sm outline-none transition " +
    "placeholder:text-faint/70 focus:border-accent/40 focus:ring-4 focus:ring-accent/20";

  return (
    <div className="rounded-2xl bg-panel p-5 shadow-sm ring-1 ring-border/10 sm:p-6">
      <h3 className="text-xl font-semibold text-text">{t("title")}</h3>

      <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
        <Field
          label={t("nameLabel")}
          value={form.name}
          onChange={(v) => updateField("name", v)}
          placeholder={t("namePlaceholder")}
          autoComplete="name"
          className={inputClass}
        />

        <Field
          label={t("emailLabel")}
          value={form.email}
          onChange={(v) => updateField("email", v)}
          placeholder={t("emailPlaceholder")}
          inputMode="email"
          autoComplete="email"
          className={inputClass}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted/90">
            {t("messageLabel")}
          </label>
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder={t("messagePlaceholder")}
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
          {t("sendButton")}
        </button>

        <p className="text-center text-xs text-faint/90">{t("note")}</p>
      </form>
    </div>
  );
}
