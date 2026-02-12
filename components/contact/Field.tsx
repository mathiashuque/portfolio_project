import React from "react";

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  className?: string;
};

export default function Field(props: FieldProps) {
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
          "w-full rounded-xl border border-border/10 bg-input px-4 py-2.5 text-sm text-text shadow-sm outline-none transition placeholder:text-faint/70 focus:border-accent/40 focus:ring-4 focus:ring-accent/20"
        }
      />
    </div>
  );
}
