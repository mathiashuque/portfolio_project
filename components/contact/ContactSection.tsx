"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import ContactLinks from "./ContactLinks";
import ContactForm from "./ContactForm";
import NetworkPattern from "./NetworkPattern";
import type { ContactLink } from "./types";

export default function ContactSection() {
  const [inView, setInView] = useState(false);

  const links: ContactLink[] = useMemo(
    () => [
      {
        label: "Email",
        value: "contact@mathiashuque.dev",
        href: `mailto:${atob("Y29udGFjdEBtYXRoaWFzaHVxdWUuZGV2")}`,
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
        value: "github.com/mathiashuque",
        href: "https://github.com/mathiashuque",
        icon: <Github className="h-5 w-5" />,
      },
    ],
    [],
  );

  return (
    <motion.section
      id="contact"
      className="
        relative overflow-hidden scroll-mt-32
        max-w-7xl 2xl:max-w-360 mx-auto px-6
        pb-16
      "
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ amount: 0.3 }}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-bg via-bg to-bg-elev" />
      <NetworkPattern />

      <div className="w-full">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
            CONTACT
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Get In Touch
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div
          className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:items-stretch"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1,
            delay: inView ? 0.15 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ContactLinks links={links} />
          <ContactForm mailtoTo={atob("Y29udGFjdEBtYXRoaWFzaHVxdWUuZGV2")} />
        </motion.div>
      </div>
    </motion.section>
  );
}
