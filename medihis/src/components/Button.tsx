import { useState, type ReactNode } from "react";

export function PrimaryButton({
  children,
  onClick,
  disabled,
  fullWidth,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
}) {

  const [hovered, setHovered] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "12px 24px",
        background: disabled ? "var(--border)" : hovered ? "var(--teal-dark)" : "var(--teal)",
        color: disabled ? "var(--muted)" : "#fff",
        border: "none",
        borderRadius: 8,
        fontSize: 15,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s",
        width: fullWidth ? "100%" : undefined,
        letterSpacing: "0.01em",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  disabled,
  fullWidth,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}) {

  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "12px 24px",
        background: hovered ? "var(--teal-light)" : "transparent",
        color: "var(--teal)",
        border: "1.5px solid var(--teal)",
        borderRadius: 8,
        fontSize: 15,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s",
        letterSpacing: "0.01em",
        width: fullWidth ? "100%" : undefined,
      }}
    >
      {children}
    </button>
  );
}

export function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--muted)",
        fontSize: 14,
        fontFamily: "inherit",
        padding: "4px 0",
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Volver
    </button>
  );
}
