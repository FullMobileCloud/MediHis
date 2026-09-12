import { useState, useEffect } from "react";

import { PageShell } from "../components/PageShell";
import { Card } from "../components/Card";
import { RecordListItem } from "../components/RecordCard";
import { ErrorMsg } from "../components/Feedback";
import { useClinicalRecordViewModel } from "../viewmodels/useClinicalRecordViewModel";
import type { ClinicalRecord } from "../models/ClinicalRecord";

export function StaffRecordsView({
  onBack,
  onView,
}: {
  onBack: () => void;
  onView: (record: ClinicalRecord) => void;
}) {
  const { records, loadAll, loading, error } = useClinicalRecordViewModel();
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const filtered = query.trim()
    ? records.filter(
        (r) =>
          r.patientDocument.includes(query.trim()) ||
          r.patientName.toLowerCase().includes(query.trim().toLowerCase())
      )
    : records;

  return (
    <PageShell onBack={onBack}>
      <div
        className="page-content"
        style={{ flex: 1, maxWidth: 680, width: "100%", margin: "0 auto" }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--teal)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Consulta de registros
        </p>
        <h2
          className="serif"
          style={{
            fontSize: 30,
            color: "var(--navy)",
            fontWeight: 400,
            marginBottom: 6,
          }}
        >
          Historias clínicas
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>
          {records.length} historia{records.length !== 1 ? "s" : ""} registrada{records.length !== 1 ? "s" : ""} en la base de datos de Firestore.
        </p>

        {/* Buscador reactivo */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <svg
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <circle cx="8" cy="8" r="5.5" stroke="var(--muted)" strokeWidth="1.5" />
            <path d="M12.5 12.5l3 3" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por documento o nombre del paciente..."
            style={{
              width: "100%",
              padding: "12px 14px 12px 42px",
              border: "1.5px solid var(--border)",
              borderRadius: 10,
              fontSize: 15,
              color: "var(--navy)",
              background: "#fff",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>

        {error && <ErrorMsg msg={error} />}

        {loading ? (
          <Card style={{ textAlign: "center", padding: 48 }}>
            <p style={{ color: "var(--muted)", fontSize: 15 }}>
              Cargando historias clínicas desde Firestore...
            </p>
          </Card>
        ) : filtered.length === 0 ? (
          <Card style={{ textAlign: "center", padding: 48 }}>
            <p style={{ color: "var(--muted)", fontSize: 15 }}>
              {query
                ? "No se encontraron registros que coincidan con la búsqueda."
                : "No hay historias clínicas registradas en el sistema."}
            </p>
          </Card>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((r) => (
              <RecordListItem
                key={r.id || `${r.patientDocument}-${r.date}`}
                record={r}
                onClick={() => onView(r)}
              />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
