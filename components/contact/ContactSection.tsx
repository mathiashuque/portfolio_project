"use client";

import React from "react";
import { Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";
import ContactLinks from "./ContactLinks";
import ContactForm from "./ContactForm";
import NetworkPattern from "./NetworkPattern";
import type { ContactLink } from "./types";

export default function ContactSection() {
  const t = useTranslations("Contact");

  const links: ContactLink[] = [
    {
      label: t("links.linkedin"),
      value: "linkedin.com/in/mathias-huque",
      href: SITE.linkedInUrl,
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      label: t("links.github"),
      value: "github.com/mathiashuque",
      href: SITE.githubUrl,
      icon: <Github className="h-5 w-5" />,
    },
  ];

  return (
    <section
      id="contact"
      className="
        relative min-h-dvh snap-start snap-always overflow-hidden scroll-mt-32
        max-w-7xl 2xl:max-w-360 mx-auto px-6
        pb-16
      "
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-bg via-bg to-bg-elev" />
      <NetworkPattern />

      <div className="w-full">
        <Reveal className="text-center" duration={0.9} offset={50}>
          <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
            {t("kicker")}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:items-stretch"
        >
          <ContactLinks links={links} />
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
