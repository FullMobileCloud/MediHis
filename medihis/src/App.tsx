import { useState, useEffect } from "react";
import type { ClinicalRecord } from "./models/ClinicalRecord";
import type { StaffUser } from "./models/StaffUser";
import { HomeView } from "./views/HomeView";
import { StaffAuthView } from "./views/StaffAuthView";
import { StaffDashboardView } from "./views/StaffDashboardView";
import { StaffPatientIdView } from "./views/StaffPatientIdView";
import { NewClinicalRecordView } from "./views/NewClinicalRecordView";
import { StaffRecordsView } from "./views/StaffRecordsView";
import { PatientSearchView } from "./views/PatientSearchView";
import { PatientResultsView } from "./views/PatientResultsView";
import { ClinicalRecordDetailView } from "./views/ClinicalRecordDetailView";
import { seedDemoRecordsIfEmpty } from "./repositories/clinicalRecordRepository";

export type Screen =
  | "home"
  | "staff-auth"
  | "staff-dashboard"
  | "staff-patient-id"
  | "staff-new-record"
  | "staff-records"
  | "patient-search"
  | "patient-results"
  | "patient-record-detail";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [staffUser, setStaffUser] = useState<StaffUser | null>(null);
  const [pendingPatientDoc, setPendingPatientDoc] = useState("");
  const [pendingPatientName, setPendingPatientName] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(null);
  const [patientSearchDoc, setPatientSearchDoc] = useState("");
  const [patientRecords, setPatientRecords] = useState<ClinicalRecord[]>([]);
  const [prevScreen, setPrevScreen] = useState<Screen>("home");

  useEffect(() => {
    seedDemoRecordsIfEmpty();
  }, []);

  const go = (next: Screen) => {
    setPrevScreen(screen);
    setScreen(next);
  };

  if (screen === "home") {
    return (
      <HomeView
        onStaff={() => go(staffUser ? "staff-dashboard" : "staff-auth")}
        onPatient={() => go("patient-search")}
      />
    );
  }

  if (screen === "staff-auth") {
    return (
      <StaffAuthView
        onSuccess={(u) => {
          setStaffUser(u);
          go("staff-dashboard");
        }}
        onBack={() => go("home")}
      />
    );
  }

  if (screen === "staff-dashboard" && staffUser) {
    return (
      <StaffDashboardView
        staff={staffUser}
        onNewRecord={() => go("staff-patient-id")}
        onViewRecords={() => go("staff-records")}
        onLogout={() => {
          setStaffUser(null);
          go("home");
        }}
      />
    );
  }

  if (screen === "staff-patient-id" && staffUser) {
    return (
      <StaffPatientIdView
        staff={staffUser}
        onContinue={(doc, name) => {
          setPendingPatientDoc(doc);
          setPendingPatientName(name);
          go("staff-new-record");
        }}
        onBack={() => go("staff-dashboard")}
      />
    );
  }

  if (screen === "staff-new-record" && staffUser) {
    return (
      <NewClinicalRecordView
        staff={staffUser}
        patientDocument={pendingPatientDoc}
        patientName={pendingPatientName}
        onSaved={() => go("staff-dashboard")}
        onBack={() => go("staff-patient-id")}
      />
    );
  }

  if (screen === "staff-records") {
    return (
      <StaffRecordsView
        onBack={() => go(staffUser ? "staff-dashboard" : "home")}
        onView={(r) => {
          setSelectedRecord(r);
          setPrevScreen("staff-records");
          go("patient-record-detail");
        }}
      />
    );
  }

  if (screen === "patient-search") {
    return (
      <PatientSearchView
        onResults={(doc, records) => {
          setPatientSearchDoc(doc);
          setPatientRecords(records);
          go("patient-results");
        }}
        onBack={() => go("home")}
      />
    );
  }

  if (screen === "patient-results") {
    return (
      <PatientResultsView
        patientDoc={patientSearchDoc}
        records={patientRecords}
        onView={(r) => {
          setSelectedRecord(r);
          setPrevScreen("patient-results");
          go("patient-record-detail");
        }}
        onBack={() => go("patient-search")}
      />
    );
  }

  if (screen === "patient-record-detail" && selectedRecord) {
    return (
      <ClinicalRecordDetailView
        record={selectedRecord}
        onBack={() => go(prevScreen)}
      />
    );
  }

  return (
    <HomeView
      onStaff={() => go(staffUser ? "staff-dashboard" : "staff-auth")}
      onPatient={() => go("patient-search")}
    />
  );
}

