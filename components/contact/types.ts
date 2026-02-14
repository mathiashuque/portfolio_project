import React from "react";

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
};

export type Status =
  | { state: "idle" }
  | { state: "success"; text: string }
  | { state: "error"; text: string };
