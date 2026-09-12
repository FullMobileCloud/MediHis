
export function Badge({
  label,
  color = "teal",
}: {
  label: string;
  color?: "teal" | "navy" | "muted";
}) {
  const styles = {
    teal: { bg: "var(--teal-light)", text: "var(--teal)" },
    navy: { bg: "#E8EDF4", text: "var(--navy)" },
    muted: { bg: "#F0F2F5", text: "var(--muted)" },
  };
  const s = styles[color];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        background: s.bg,
        color: s.text,
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </span>
  );
}

export function ErrorMsg({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div
      style={{
        padding: "10px 14px",
        background: "#FFF1F1",
        border: "1px solid #FAD4D4",
        borderRadius: 8,
        color: "var(--error)",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {msg}
    </div>
  );
}

export function SuccessMsg({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div
      style={{
        padding: "10px 14px",
        background: "#F0FBF5",
        border: "1px solid #B8E8CF",
        borderRadius: 8,
        color: "var(--success)",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {msg}
    </div>
  );
}
