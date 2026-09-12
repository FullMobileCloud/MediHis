import { useState, useEffect } from "react";

import { PageShell } from "../components/PageShell";
import { Card } from "../components/Card";
import { Badge } from "../components/Feedback";
import { useClinicalRecordViewModel } from "../viewmodels/useClinicalRecordViewModel";
import type { StaffUser } from "../models/StaffUser";

export function StaffDashboardView({
  staff,
  onNewRecord,
  onViewRecords,
  onLogout,
}: {
  staff: StaffUser;
  onNewRecord: () => void;
  onViewRecords: () => void;
  onLogout: () => void;
}) {
  const { records, loadAll, loading } = useClinicalRecordViewModel();

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const myRecordsCount = records.filter(
    (r) => r.createdByUid === staff.uid || r.createdByName === staff.name
  ).length;

  return (
    <PageShell>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "32px 16px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 560 }}>
          {/* Header de bienvenida y usuario */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>
                Sesión activa
              </p>
              <h2
                className="serif"
                style={{
                  fontSize: 30,
                  color: "var(--navy)",
                  fontWeight: 400,
                  margin: "0 0 6px",
                }}
              >
                {staff.name}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Badge label={staff.role} color="teal" />
                {staff.document && (
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    Doc: {staff.document}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              style={{
                background: "none",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--muted)",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--error)";
                e.currentTarget.style.borderColor = "var(--error)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              Cerrar sesión
            </button>
          </div>

          {/* Métricas en vivo desde Firestore */}
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <StatCard
              label="Historias registradas"
              value={loading ? "..." : myRecordsCount.toString()}
            />
            <StatCard
              label="Total en Firestore"
              value={loading ? "..." : records.length.toString()}
            />
          </div>

          {/* Acciones principales */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ActionCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }
              title="Nueva historia clínica"
              desc="Registrar atención médica y signos vitales en Firestore"
              onClick={onNewRecord}
              primary
            />
            <ActionCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="var(--teal)" strokeWidth="1.75" />
                  <path d="M16.5 16.5l4 4" stroke="var(--teal)" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              }
              title="Consultar historias"
              desc="Buscar y revisar historias registradas en la base de datos"
              onClick={onViewRecords}
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card style={{ padding: "20px 24px" }}>
      <div
        style={{
          fontSize: 13,
          color: "var(--muted)",
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        className="serif"
        style={{ fontSize: 36, color: "var(--navy)", fontWeight: 400 }}
      >
        {value}
      </div>
    </Card>
  );
}

function ActionCard({
  icon,
  title,
  desc,
  onClick,
  primary,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
  primary?: boolean;
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
        background: primary
          ? hovered
            ? "var(--teal-dark)"
            : "var(--teal)"
          : hovered
          ? "var(--teal-light)"
          : "#fff",
        border: primary ? "none" : `1.5px solid ${hovered ? "var(--teal)" : "var(--border)"}`,
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
          width: 48,
          height: 48,
          background: primary ? "rgba(255,255,255,0.15)" : "var(--teal-light)",
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
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: primary ? "#fff" : "var(--navy)",
            marginBottom: 3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: primary ? "rgba(255,255,255,0.75)" : "var(--muted)",
          }}
        >
          {desc}
        </div>
      </div>
      <svg
        style={{ marginLeft: "auto", flexShrink: 0 }}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M7 5l4 4-4 4"
          stroke={primary ? "rgba(255,255,255,0.6)" : "var(--muted)"}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
