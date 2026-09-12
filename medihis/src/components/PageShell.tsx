import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { BackButton } from "./Button";

export function PageShell({
  children,
  onBack,
  rightAction,
}: {
  children: ReactNode;
  onBack?: () => void;
  rightAction?: ReactNode;
}) {

  return (
    <div style={{ minHeight: "100%", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      <header
        className="page-shell-header"
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {rightAction}
          {onBack && <BackButton onBack={onBack} />}
        </div>
      </header>
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</main>
    </div>
  );
}
