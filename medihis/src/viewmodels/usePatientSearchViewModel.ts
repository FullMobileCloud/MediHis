import { useState } from "react";
import type { ClinicalRecord } from "../models/ClinicalRecord";
import { findRecordsByPatientDocument } from "../repositories/clinicalRecordRepository";

export function usePatientSearchViewModel() {
  const [patientDocument, setPatientDocument] = useState("");
  const [records, setRecords] = useState<ClinicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function searchByDocument(doc: string): Promise<ClinicalRecord[]> {
    const cleanDoc = doc.trim();
    setPatientDocument(cleanDoc);
    setError("");

    if (!cleanDoc) {
      setError("Por favor ingrese su número de documento.");
      return [];
    }

    setLoading(true);
    setSearched(true);

    try {
      const results = await findRecordsByPatientDocument(cleanDoc);
      setRecords(results);
      if (results.length === 0) {
        setError("No se encontraron historias clínicas para ese documento.");
      }
      return results;
    } catch (err) {
      console.error("Error buscando historias de paciente:", err);
      setError("No fue posible consultar los registros. Verifique su conexión.");
      setRecords([]);
      return [];
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setPatientDocument("");
    setRecords([]);
    setSearched(false);
    setError("");
  }

  return {
    patientDocument,
    records,
    loading,
    searched,
    error,
    setError,
    searchByDocument,
    clearSearch,
  };
}
