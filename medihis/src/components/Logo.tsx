
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{
          width: 32,
          height: 32,
          background: light ? "#fff" : "var(--teal)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 2v14M2 9h14"
            stroke={light ? "var(--teal)" : "#fff"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span
        className="serif"
        style={{
          fontSize: 22,
          fontWeight: 400,
          color: light ? "#fff" : "var(--navy)",
          letterSpacing: "-0.02em",
        }}
      >
        MediHIS
      </span>
    </div>
  );
}
