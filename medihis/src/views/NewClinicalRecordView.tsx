import { useState } from "react";

import { PageShell } from "../components/PageShell";
import { Card } from "../components/Card";
import { Input, Textarea } from "../components/Input";
import { PrimaryButton, GhostButton } from "../components/Button";
import { ErrorMsg, SuccessMsg } from "../components/Feedback";
import { useClinicalRecordViewModel } from "../viewmodels/useClinicalRecordViewModel";
import type { StaffUser } from "../models/StaffUser";

export function NewClinicalRecordView({
  staff,
  patientDocument,
  patientName,
  onSaved,
  onBack,
}: {
  staff: StaffUser;
  patientDocument: string;
  patientName: string;
  onSaved: () => void;
  onBack: () => void;
}) {
  const { saveRecord, saving, error, success, setError } = useClinicalRecordViewModel();

  const [chiefComplaint, setChiefComplaint] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");

  // Signos vitales
  const [temp, setTemp] = useState("");
  const [bp, setBp] = useState("");
  const [hr, setHr] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleSave = async () => {
    setError("");
    if (!chiefComplaint.trim() || !diagnosis.trim() || !treatment.trim()) {
      setError("Complete al menos el motivo de consulta, diagnóstico y tratamiento.");
      return;
    }

    const id = await saveRecord({
      patientDocument,
      patientName,
      date: new Date().toISOString(),
      createdByUid: staff.uid,
      createdByName: staff.name,
      createdByRole: staff.role,
      chiefComplaint: chiefComplaint.trim(),
      diagnosis: diagnosis.trim(),
      treatment: treatment.trim(),
      notes: notes.trim(),
      vitalSigns: {
        temperature: temp.trim(),
        bloodPressure: bp.trim(),
        heartRate: hr.trim(),
        weight: weight.trim(),
        height: height.trim(),
      },
    });

    if (id) {
      setTimeout(() => onSaved(), 1500);
    }
  };

  return (
    <PageShell onBack={onBack}>
      <div
        className="page-content"
        style={{ flex: 1, maxWidth: 680, width: "100%", margin: "0 auto" }}
      >
        <div className="record-header-row">
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
              Registro de historia clínica
            </p>
            <h2
              className="serif"
              style={{
                fontSize: 28,
                color: "var(--navy)",
                fontWeight: 400,
                margin: "0 0 4px",
              }}
            >
              {patientName}
            </h2>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>
              Doc: {patientDocument} ·{" "}
              {new Date().toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 13, color: "var(--navy)", fontWeight: 600 }}>
              {staff.name}
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>{staff.role}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Signos vitales */}
          <Card>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--navy)",
                marginBottom: 16,
                letterSpacing: "0.02em",
              }}
            >
              Signos vitales
            </h3>
            <div className="vital-grid">
              <Input
                label="Temperatura (°C)"
                value={temp}
                onChange={setTemp}
                placeholder="36.8"
              />
              <Input
                label="T/A (mmHg)"
                value={bp}
                onChange={setBp}
                placeholder="120/80"
              />
              <Input
                label="Frec. cardíaca (lpm)"
                value={hr}
                onChange={setHr}
                placeholder="72"
              />
              <Input
                label="Peso (kg)"
                value={weight}
                onChange={setWeight}
                placeholder="70"
              />
              <Input
                label="Talla (cm)"
                value={height}
                onChange={setHeight}
                placeholder="168"
              />
            </div>
          </Card>

          {/* Información clínica principal */}
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Textarea
                label="Motivo de consulta"
                value={chiefComplaint}
                onChange={setChiefComplaint}
                placeholder="Descripción del motivo principal de la consulta médica..."
                required
                rows={3}
              />
              <Textarea
                label="Diagnóstico"
                value={diagnosis}
                onChange={setDiagnosis}
                placeholder="Impresión diagnóstica o CIE-10..."
                required
                rows={3}
              />
              <Textarea
                label="Plan de tratamiento"
                value={treatment}
                onChange={setTreatment}
                placeholder="Medicamentos, dosis, recomendaciones y órdenes médicas..."
                required
                rows={3}
              />
              <Textarea
                label="Notas y observaciones"
                value={notes}
                onChange={setNotes}
                placeholder="Antecedentes relevantes u observaciones adicionales..."
                rows={2}
              />
            </div>
          </Card>

          {error && <ErrorMsg msg={error} />}
          {success && (
            <SuccessMsg msg="Historia clínica guardada exitosamente en Firestore. Redirigiendo..." />
          )}

          <div
            className="form-actions"
            style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}
          >
            <GhostButton onClick={onBack} disabled={saving}>
              Cancelar
            </GhostButton>
            <PrimaryButton onClick={handleSave} disabled={saving || success}>
              {saving
                ? "Guardando en Firestore..."
                : success
                ? "Guardado ✓"
                : "Guardar historia clínica"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
