import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase";
import type { ClinicalRecord } from "../models/ClinicalRecord";

const recordsCollection = collection(db, "clinicalRecords");

export async function createClinicalRecord(
  record: Omit<ClinicalRecord, "id">
): Promise<string> {
  const docRef = await addDoc(recordsCollection, {
    ...record,
    createdAt: new Date().toISOString(),
  });

  return docRef.id;
}

export async function findRecordsByPatientDocument(
  patientDocument: string
): Promise<ClinicalRecord[]> {
  const cleanDoc = patientDocument.trim();
  const recordsQuery = query(
    recordsCollection,
    where("patientDocument", "==", cleanDoc)
  );

  const snapshot = await getDocs(recordsQuery);

  const records = snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as ClinicalRecord[];

  // Ordenamiento seguro en memoria para evitar requerir índices compuestos en Firestore
  return records.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllRecords(): Promise<ClinicalRecord[]> {
  const snapshot = await getDocs(recordsCollection);

  const records = snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as ClinicalRecord[];

  return records.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function seedDemoRecordsIfEmpty(): Promise<void> {
  try {
    const existing = await getDocs(recordsCollection);
    if (!existing.empty) return;

    const demoRecords: Omit<ClinicalRecord, "id">[] = [
      {
        patientDocument: "98765432",
        patientName: "Carlos Pérez Gómez",
        date: "2026-08-10T09:30:00.000Z",
        createdByUid: "demo_dr_laura",
        createdByName: "Dra. Laura Méndez",
        createdByRole: "Médico General",
        chiefComplaint: "Dolor de cabeza persistente y fiebre de 38.5 °C por tres días.",
        diagnosis: "Cefalea tensional con proceso infeccioso leve.",
        treatment: "Ibuprofeno 400 mg cada 8 horas por 5 días. Reposo relativo. Hidratación abundante.",
        notes: "Paciente refiere antecedente de migraña. Se recomienda control en 7 días si no mejora.",
        vitalSigns: { temperature: "38.5", bloodPressure: "118/76", heartRate: "88", weight: "72", height: "170" },
      },
      {
        patientDocument: "98765432",
        patientName: "Carlos Pérez Gómez",
        date: "2026-08-24T14:00:00.000Z",
        createdByUid: "demo_dr_laura",
        createdByName: "Dra. Laura Méndez",
        createdByRole: "Médico General",
        chiefComplaint: "Control post-tratamiento. Refiere mejoría completa.",
        diagnosis: "Resolución del cuadro. Estado general satisfactorio.",
        treatment: "No requiere medicación adicional.",
        notes: "Se indica retorno solo si hay nuevos síntomas.",
        vitalSigns: { temperature: "36.8", bloodPressure: "115/74", heartRate: "72", weight: "72", height: "170" },
      },
    ];

    for (const r of demoRecords) {
      await addDoc(recordsCollection, {
        ...r,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn("No se pudieron sembrar los datos demo en Firestore automáticamente:", err);
  }
}