import { PageShell } from "../components/PageShell";
import { Card } from "../components/Card";
import type { ClinicalRecord } from "../models/ClinicalRecord";

export function ClinicalRecordDetailView({
  record,
  onBack,
}: {
  record: ClinicalRecord;
  onBack: () => void;
}) {
  const dateObj = new Date(record.date);
  const formattedDate = isNaN(dateObj.getTime())
    ? record.date
    : dateObj.toLocaleDateString("es-CO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const vs = record.vitalSigns || {};
  const vitals = [
    { label: "Temperatura", value: vs.temperature ? `${vs.temperature} °C` : "" },
    { label: "T/A", value: vs.bloodPressure ? `${vs.bloodPressure} mmHg` : "" },
    { label: "Frec. cardíaca", value: vs.heartRate ? `${vs.heartRate} lpm` : "" },
    { label: "Peso", value: vs.weight ? `${vs.weight} kg` : "" },
    { label: "Talla", value: vs.height ? `${vs.height} cm` : "" },
  ].filter((v) => Boolean(v.value));

  return (
    <PageShell onBack={onBack}>
      <div
        className="page-content"
        style={{ flex: 1, maxWidth: 680, width: "100%", margin: "0 auto" }}
      >
        <div className="record-detail-header" style={{ marginBottom: 32 }}>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--teal)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Detalle de historia clínica
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
              {record.patientName}
            </h2>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
              Documento: {record.patientDocument} · {formattedDate}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: 13,
                color: "var(--navy)",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {record.createdByName}
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)", margin: "2px 0 0" }}>
              {record.createdByRole}
            </p>
          </div>
        </div>

        {vitals.length > 0 && (
          <Card style={{ marginBottom: 16 }}>
            <h3
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Signos vitales
            </h3>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {vitals.map((v) => (
                <div key={v.label}>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 2,
                    }}
                  >
                    {v.label}
                  </p>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--navy)",
                      margin: 0,
                    }}
                  >
                    {v.value}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <RecordSection title="Motivo de consulta" content={record.chiefComplaint} />
          <RecordSection title="Diagnóstico" content={record.diagnosis} />
          <RecordSection title="Tratamiento" content={record.treatment} />
          {record.notes && (
            <RecordSection title="Notas y observaciones" content={record.notes} />
          )}
        </div>
      </div>
    </PageShell>
  );
}

function RecordSection({ title, content }: { title: string; content: string }) {
  return (
    <Card>
      <h3
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "var(--muted)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 15,
          color: "var(--navy)",
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {content}
      </p>
    </Card>
  );
}
