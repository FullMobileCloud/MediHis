import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase";
import type { ClinicalRecord } from "../models/ClinicalRecord";

const recordsCollection = collection(db, "clinicalRecords");

export async function createClinicalRecord(
  record: ClinicalRecord
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
  const recordsQuery = query(
    recordsCollection,
    where("patientDocument", "==", patientDocument),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(recordsQuery);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as ClinicalRecord[];
}