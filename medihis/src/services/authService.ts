import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";
import {
  saveStaffUser,
  getStaffUser,
  findStaffByDocument,
} from "../repositories/staffRepository";
import type { StaffUser } from "../models/StaffUser";

export function formatStaffEmail(identifier: string): string {
  if (identifier.includes("@")) {
    return identifier.trim().toLowerCase();
  }
  return `${identifier.trim()}@medihis.app`;
}

export async function registerStaff(
  name: string,
  role: string,
  document: string,
  password: string,
  email?: string
): Promise<StaffUser> {
  const staffEmail = email && email.includes("@") ? email.trim() : formatStaffEmail(document);

  const credentials = await createUserWithEmailAndPassword(
    auth,
    staffEmail,
    password
  );

  const newStaff: StaffUser = {
    uid: credentials.user.uid,
    name: name.trim(),
    role: role.trim(),
    document: document.trim(),
    email: staffEmail,
  };

  await saveStaffUser(newStaff);
  return newStaff;
}

export async function loginStaff(
  identifier: string,
  password: string
): Promise<StaffUser> {
  let emailToUse = identifier.trim();

  if (!emailToUse.includes("@")) {
    const existing = await findStaffByDocument(emailToUse);
    if (existing && existing.email) {
      emailToUse = existing.email;
    } else {
      emailToUse = formatStaffEmail(emailToUse);
    }
  }

  const credentials = await signInWithEmailAndPassword(
    auth,
    emailToUse,
    password
  );

  const staffProfile = await getStaffUser(credentials.user.uid);
  if (staffProfile) {
    return staffProfile;
  }

  return {
    uid: credentials.user.uid,
    name: credentials.user.displayName || "Personal de Salud",
    role: "Médico General",
    document: identifier,
    email: credentials.user.email || emailToUse,
  };
}

export async function logoutStaff(): Promise<void> {
  await signOut(auth);
}

export async function getCurrentStaffProfile(): Promise<StaffUser | null> {
  const current = auth.currentUser;
  if (!current) return null;
  return await getStaffUser(current.uid);
}

export function subscribeToAuthState(
  callback: (user: User | null) => void
): () => void {
  return onAuthStateChanged(auth, callback);
}