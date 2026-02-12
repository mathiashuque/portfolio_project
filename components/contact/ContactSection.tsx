import React, { useMemo } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import ContactLinks from "./ContactLinks";
import ContactForm from "./ContactForm";
import NetworkPattern from "./NetworkPattern";
import type { ContactLink } from "./types";

export default function ContactSection() {
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
    [],
  );

  return (
    <section
      id="contact"
      className="
        relative overflow-hidden scroll-mt-32
        max-w-7xl 2xl:max-w-360 mx-auto px-6
        pb-16
      "
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-bg via-bg to-bg-elev" />
      <NetworkPattern />

      <div className="w-full">
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
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:items-stretch">
          <ContactLinks links={links} />
          <ContactForm mailtoTo="mathiashuque2004@gmail.com" />
        </div>
      </div>
    </section>
  );
}
