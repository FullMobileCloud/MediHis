import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase";
import type { StaffUser } from "../models/StaffUser";

export async function saveStaffUser(user: StaffUser): Promise<void> {
  await setDoc(doc(db, "staffUsers", user.uid), user);
}

export async function getStaffUser(uid: string): Promise<StaffUser | null> {
  const snapshot = await getDoc(doc(db, "staffUsers", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as StaffUser;
}

export async function findStaffByDocument(document: string): Promise<StaffUser | null> {
  const q = query(
    collection(db, "staffUsers"),
    where("document", "==", document.trim())
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }
  return snapshot.docs[0].data() as StaffUser;
}