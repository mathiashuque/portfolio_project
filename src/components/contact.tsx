// contact.tsx
import React, { useMemo, useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
};

export default function Contact() {
  const links: ContactLink[] = useMemo(
    () => [
      {
        label: "Email",
        value: "mathiashuque2004@gmail.com",
        href: "mailto:mathiashuque2004@gmail.com",
        icon: <Mail className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/mathias-huque",
        href: "https://linkedin.com/in/mathias-huque",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        label: "GitHub",
        value: "github.com/mhuque1",
        href: "https://github.com/mhuque1",
        icon: <Github className="h-5 w-5" />,
      },
    ],
    []
  );

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "success"; text: string }
    | { state: "error"; text: string }
  >({ state: "idle" });

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status.state !== "idle") setStatus({ state: "idle" });
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function handleSubmit(e: React.FormEvent) {
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

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:ignacioquevedo003@gmail.com?subject=${subject}&body=${body}`;
    setStatus({ state: "success", text: "Opening your email client…" });
  }

  const inputClass =
    "w-full rounded-xl border border-border/10 bg-input px-4 py-3 text-sm text-text shadow-sm outline-none transition " +
    "placeholder:text-faint/70 focus:border-accent/40 focus:ring-4 focus:ring-accent/20";

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg to-bg-elev" />
      <NetworkPattern />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
            CONTACT
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Get In Touch
          </h2>
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2 lg:items-stretch">
          {/* Left */}
          <div className="rounded-2xl bg-panel p-6 shadow-sm ring-1 ring-border/10 sm:p-8">
            <h3 className="text-xl font-semibold text-text">Let&apos;s Work Together</h3>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted/90">
              I&apos;m always interested in new opportunities and exciting projects.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="mt-8 space-y-4">
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="
                    group flex items-center gap-4 rounded-xl border border-border/10
                    bg-input px-4 py-3 transition
                    hover:border-border/20 hover:shadow-sm
                  "
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-pink-500 text-white shadow-sm">
                    {item.icon}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text">{item.label}</p>
                    <p className="truncate text-sm text-muted/90 group-hover:text-text">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Tip box: stands apart from the panel */}
            <div className="mt-8 rounded-xl border border-border/10 bg-bg px-4 py-4">
              <p className="text-xs text-muted/90">
                Tip: if you add a backend later (e.g., Next.js route handler + Resend),
                you can keep the same UI and swap out{" "}
                <span className="font-mono">mailto:</span>.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-2xl bg-panel p-6 shadow-sm ring-1 ring-border/10 sm:p-8">
            <h3 className="text-xl font-semibold text-text">Send a Message</h3>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted/90">
                  Your Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Your Message"
                  rows={6}
                  className={
                    inputClass.replace("w-full", "w-full resize-none")
                  }
                />
              </div>

              {/* Status */}
              {status.state !== "idle" && (
                <div
                  className={[
                    "flex items-start gap-2 rounded-xl border px-4 py-3 text-sm",
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
                  bg-gradient-to-r from-accent to-pink-500 px-5 py-3 text-sm font-semibold
                  text-white shadow-sm transition hover:opacity-95
                  focus:outline-none focus:ring-4 focus:ring-accent/25
                "
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>

              <p className="text-center text-xs text-faint/90">
                By sending, your email client may open (mailto fallback).
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted/90">{props.label}</label>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        inputMode={props.inputMode}
        autoComplete={props.autoComplete}
        className={
          props.className ??
          "w-full rounded-xl border border-border/10 bg-input px-4 py-3 text-sm text-text shadow-sm outline-none transition placeholder:text-faint/70 focus:border-accent/40 focus:ring-4 focus:ring-accent/20"
        }
      />
    </div>
  );
}

function NetworkPattern() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-25 dark:opacity-40"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="rgb(249 115 22)" stopOpacity="0.25" />
          <stop offset="1" stopColor="rgb(236 72 153)" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <g stroke="url(#g)" strokeWidth="1">
        <line x1="90" y1="120" x2="260" y2="70" />
        <line x1="260" y1="70" x2="390" y2="160" />
        <line x1="390" y1="160" x2="520" y2="110" />
        <line x1="520" y1="110" x2="690" y2="170" />
        <line x1="690" y1="170" x2="860" y2="95" />
        <line x1="860" y1="95" x2="1040" y2="140" />

        <line x1="140" y1="520" x2="300" y2="460" />
        <line x1="300" y1="460" x2="480" y2="520" />
        <line x1="480" y1="520" x2="650" y2="450" />
        <line x1="650" y1="450" x2="820" y2="520" />
        <line x1="820" y1="520" x2="1020" y2="470" />
      </g>

      <g fill="rgb(249 115 22)" fillOpacity="0.22">
        {[
          [90, 120],
          [260, 70],
          [390, 160],
          [520, 110],
          [690, 170],
          [860, 95],
          [1040, 140],
          [140, 520],
          [300, 460],
          [480, 520],
          [650, 450],
          [820, 520],
          [1020, 470],
        ].map(([cx, cy], idx) => (
          <circle key={idx} cx={cx} cy={cy} r="5" />
        ))}
      </g>
    </svg>
  );
}
