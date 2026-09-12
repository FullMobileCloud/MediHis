import { useState } from "react";


export function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  hint,
  disabled,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", letterSpacing: "0.01em" }}>
        {label}
        {required && <span style={{ color: "var(--teal-accent)", marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "10px 14px",
          border: `1.5px solid ${focused ? "var(--teal)" : "var(--border)"}`,
          borderRadius: 8,
          fontSize: 15,
          color: "var(--navy)",
          background: disabled ? "#F5F7FA" : "#fff",
          outline: "none",
          transition: "border-color 0.15s",
          fontFamily: "inherit",
        }}
      />
      {hint && <span style={{ fontSize: 12, color: "var(--muted)" }}>{hint}</span>}
    </div>
  );
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", letterSpacing: "0.01em" }}>
        {label}
        {required && <span style={{ color: "var(--teal-accent)", marginLeft: 3 }}>*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "10px 14px",
          border: `1.5px solid ${focused ? "var(--teal)" : "var(--border)"}`,
          borderRadius: 8,
          fontSize: 15,
          color: "var(--navy)",
          background: "#fff",
          outline: "none",
          transition: "border-color 0.15s",
          fontFamily: "inherit",
          resize: "vertical",
          lineHeight: 1.6,
        }}
      />
    </div>
  );
}
