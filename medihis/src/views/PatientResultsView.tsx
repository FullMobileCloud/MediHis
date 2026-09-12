import { PageShell } from "../components/PageShell";
import { RecordListItem } from "../components/RecordCard";
import type { ClinicalRecord } from "../models/ClinicalRecord";

export function PatientResultsView({
  patientDoc,
  records,
  onView,
  onBack,
}: {
  patientDoc: string;
  records: ClinicalRecord[];
  onView: (record: ClinicalRecord) => void;
  onBack: () => void;
}) {
  const patientName = records[0]?.patientName || "Paciente";

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
          Mis historias clínicas
        </p>
        <h2
          className="serif"
          style={{
            fontSize: 30,
            color: "var(--navy)",
            fontWeight: 400,
            marginBottom: 4,
          }}
        >
          {patientName}
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>
          Documento: {patientDoc} · {records.length} registro
          {records.length !== 1 ? "s" : ""} encontrado
          {records.length !== 1 ? "s" : ""}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {records.map((r) => (
            <RecordListItem
              key={r.id || `${r.patientDocument}-${r.date}`}
              record={r}
              onClick={() => onView(r)}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
