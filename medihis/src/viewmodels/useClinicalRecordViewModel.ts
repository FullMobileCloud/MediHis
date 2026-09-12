import { useState, useCallback } from "react";
import type { ClinicalRecord } from "../models/ClinicalRecord";
import {
  createClinicalRecord,
  findRecordsByPatientDocument,
  getAllRecords,
  seedDemoRecordsIfEmpty,
} from "../repositories/clinicalRecordRepository";

export function useClinicalRecordViewModel() {
  const [records, setRecords] = useState<ClinicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const initData = useCallback(async () => {
    try {
      await seedDemoRecordsIfEmpty();
    } catch {
      // Ignorar si ya está inicializado
    }
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      await seedDemoRecordsIfEmpty();
      const all = await getAllRecords();
      setRecords(all);
      return all;
    } catch (err) {
      console.error("Error loading records:", err);
      setError("No fue posible cargar las historias clínicas.");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  async function saveRecord(record: Omit<ClinicalRecord, "id">): Promise<string | null> {
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const id = await createClinicalRecord(record);
      const newRecord: ClinicalRecord = { ...record, id };
      setRecords((current) => [newRecord, ...current]);
      setSuccess(true);
      return id;
    } catch (err) {
      console.error("Error saving record:", err);
      setError("No fue posible guardar la historia clínica en Firestore.");
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function searchByPatientDocument(document: string) {
    setLoading(true);
    setError("");

    try {
      const result = await findRecordsByPatientDocument(document);
      setRecords(result);
      return result;
    } catch (err) {
      console.error("Error searching records:", err);
      setError("No fue posible consultar las historias clínicas.");
      setRecords([]);
      return [];
    } finally {
      setLoading(false);
    }
  }

  return {
    records,
    loading,
    saving,
    error,
    success,
    setSuccess,
    setError,
    initData,
    loadAll,
    saveRecord,
    searchByPatientDocument,
  };
}