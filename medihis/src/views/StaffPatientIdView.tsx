import { useState, type FormEvent } from "react";
import { PageShell } from "../components/PageShell";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { PrimaryButton } from "../components/Button";
import { ErrorMsg } from "../components/Feedback";
import type { StaffUser } from "../models/StaffUser";

export function StaffPatientIdView({
  staff,
  onContinue,
  onBack,
}: {
  staff: StaffUser;
  onContinue: (patientDoc: string, patientName: string) => void;
  onBack: () => void;
}) {
  const [patientDoc, setPatientDoc] = useState("");
  const [patientName, setPatientName] = useState("");
  const [error, setError] = useState("");

  const handleContinue = (e?: FormEvent) => {
    if (e) e.preventDefault();

    setError("");
    if (!patientDoc.trim() || !patientName.trim()) {
      setError("Complete todos los campos requeridos para identificar al paciente.");
      return;
    }
    onContinue(patientDoc.trim(), patientName.trim());
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
            Nueva historia clínica
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
            Identificar al paciente
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 32 }}>
            Ingrese el documento y nombre del paciente atendido por <strong>{staff.name}</strong>.
          </p>
          <Card>
            <form
              onSubmit={handleContinue}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <Input
                label="Documento del paciente"
                value={patientDoc}
                onChange={setPatientDoc}
                placeholder="Número de cédula o documento"
                required
              />
              <Input
                label="Nombre completo del paciente"
                value={patientName}
                onChange={setPatientName}
                placeholder="Nombres y apellidos completos"
                required
              />
              <ErrorMsg msg={error} />
              <PrimaryButton type="submit" fullWidth>
                Continuar a historia clínica →
              </PrimaryButton>
            </form>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
