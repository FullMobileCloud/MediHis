import type { ReactNode, CSSProperties } from "react";

export function Card({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {

  return (
    <div
      className={className}
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
