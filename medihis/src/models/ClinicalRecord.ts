export interface VitalSigns {
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  weight: string;
  height: string;
}

export interface ClinicalRecord {
  id?: string;
  patientDocument: string;
  patientName: string;
  date: string;
  createdByUid: string;
  createdByName: string;
  createdByRole: string;
  chiefComplaint: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  vitalSigns: VitalSigns;
}