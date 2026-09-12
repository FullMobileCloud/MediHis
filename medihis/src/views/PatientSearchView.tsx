import { useState, type FormEvent } from "react";
import { PageShell } from "../components/PageShell";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { PrimaryButton } from "../components/Button";
import { ErrorMsg } from "../components/Feedback";
import { usePatientSearchViewModel } from "../viewmodels/usePatientSearchViewModel";
import type { ClinicalRecord } from "../models/ClinicalRecord";

export function PatientSearchView({
  onResults,
  onBack,
}: {
  onResults: (doc: string, records: ClinicalRecord[]) => void;
  onBack: () => void;
}) {
  const { searchByDocument, loading, error, setError } = usePatientSearchViewModel();
  const [doc, setDoc] = useState("");

  const handleSearch = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (!doc.trim()) {
      setError("Por favor ingrese su número de documento.");
      return;
    }

    const records = await searchByDocument(doc);
    if (records.length > 0) {
      onResults(doc.trim(), records);
    }
  };

  return (
    <PageShell onBack={onBack}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "32px 16px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>
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
            Acceso de paciente
          </p>
          <h2
            className="serif"
            style={{
              fontSize: 32,
              color: "var(--navy)",
              fontWeight: 400,
              marginBottom: 8,
            }}
          >
            Consultar mis historias
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: 14,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Ingrese su número de documento de identidad para consultar sus historias clínicas registradas en el sistema.
          </p>

          <Card>
            <form
              onSubmit={handleSearch}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <Input
                label="Número de documento de identidad"
                value={doc}
                onChange={(v) => {
                  setDoc(v);
                  setError("");
                }}
                placeholder="Ej: 98765432"
                required
              />

              <ErrorMsg msg={error} />

              <PrimaryButton
                type="submit"
                fullWidth
                disabled={loading}
              >
                {loading ? "Consultando en Firestore..." : "Buscar historias"}
              </PrimaryButton>
            </form>
          </Card>

          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              marginTop: 20,
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Para pruebas académicas, puede consultar el documento demo: <strong>98765432</strong>.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
