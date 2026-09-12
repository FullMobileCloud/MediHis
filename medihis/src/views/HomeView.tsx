import { useState, type ReactNode } from "react";

import { Logo } from "../components/Logo";

export function HomeView({
  onStaff,
  onPatient,
}: {
  onStaff: () => void;
  onPatient: () => void;
}) {
  return (
    <div className="home-layout">
      {/* Panel informativo */}
      <div className="home-panel-left">
        <Logo light />
        <div>
          <p
            className="serif"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 13,
              marginBottom: 14,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Sistema de historias clínicas
          </p>
          <h1
            className="serif"
            style={{
              color: "#fff",
              fontSize: 38,
              lineHeight: 1.15,
              fontWeight: 400,
              margin: "0 0 20px",
            }}
          >
            Registros médicos digitales, simples y seguros.
          </h1>
          <p
            className="desc"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 320,
            }}
          >
            MediHIS permite al personal de salud crear y consultar historias clínicas en tiempo real, y a los pacientes acceder a sus propios registros con su documento de identidad.
          </p>
        </div>
        <p
          className="copyright"
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            marginTop: 32,
          }}
        >
          © 2026 MediHIS · Cloud Computing & Mobile
        </p>
      </div>

      {/* Panel de selección de rol */}
      <div className="home-panel-right">
        <div style={{ maxWidth: 400, width: "100%" }}>
          <h2
            className="serif"
            style={{
              fontSize: 28,
              color: "var(--navy)",
              marginBottom: 6,
              fontWeight: 400,
            }}
          >
            ¿Cómo desea ingresar?
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: 14,
              marginBottom: 28,
              lineHeight: 1.6,
            }}
          >
            Seleccione su perfil para continuar.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <RoleCard
              icon={
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="4" y="4" width="20" height="20" rx="4" stroke="var(--teal)" strokeWidth="1.75" />
                  <path d="M14 8v12M8 14h12" stroke="var(--teal)" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              }
              title="Personal de Salud"
              desc="Médicos, enfermeros y profesionales clínicos"
              onClick={onStaff}
            />
            <RoleCard
              icon={
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="10" r="5" stroke="var(--teal)" strokeWidth="1.75" />
                  <path d="M6 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="var(--teal)" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              }
              title="Paciente"
              desc="Consulta tus historias clínicas con tu documento"
              onClick={onPatient}
            />
          </div>

          <div
            style={{
              marginTop: 28,
              padding: "12px 14px",
              background: "var(--teal-light)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--teal)",
              lineHeight: 1.6,
            }}
          >
            <strong>Acceso de prueba:</strong> Personal de salud: doc <code>12345678</code>, clave <code>demo123</code>. Paciente: doc <code>98765432</code>.
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 24px",
        background: hovered ? "var(--teal-light)" : "#fff",
        border: `1.5px solid ${hovered ? "var(--teal)" : "var(--border)"}`,
        borderRadius: 12,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s",
        fontFamily: "inherit",
        width: "100%",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          background: "var(--teal-light)",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: "var(--navy)", marginBottom: 3 }}>
          {title}
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
      </div>
      <svg
        style={{ marginLeft: "auto", flexShrink: 0 }}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path d="M7 5l4 4-4 4" stroke="var(--muted)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
