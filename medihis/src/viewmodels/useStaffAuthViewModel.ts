import { useState, useEffect } from "react";
import type { StaffUser } from "../models/StaffUser";
import {
  loginStaff,
  registerStaff,
  logoutStaff,
  getCurrentStaffProfile,
  subscribeToAuthState,
} from "../services/authService";

export function useStaffAuthViewModel() {
  const [currentUser, setCurrentUser] = useState<StaffUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Suscribirse a cambios en Firebase Auth para mantener la sesión activa
    const unsubscribe = subscribeToAuthState(async (user) => {
      if (user) {
        try {
          const profile = await getCurrentStaffProfile();
          if (profile) {
            setCurrentUser(profile);
          } else {
            setCurrentUser({
              uid: user.uid,
              name: user.displayName || "Personal de Salud",
              role: "Médico General",
              document: "",
              email: user.email || "",
            });
          }
        } catch {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  async function login(documentOrEmail: string, password: string): Promise<StaffUser | null> {
    setLoading(true);
    setError("");

    try {
      if (!documentOrEmail.trim() || !password.trim()) {
        setError("Por favor ingrese su documento/correo y contraseña.");
        return null;
      }

      const staff = await loginStaff(documentOrEmail.trim(), password.trim());
      setCurrentUser(staff);
      return staff;
    } catch (err: unknown) {
      console.error("Login error:", err);
      const code = (err as { code?: string })?.code;
      if (
        code === "auth/invalid-credential" ||
        code === "auth/user-not-found" ||
        code === "auth/wrong-password"
      ) {
        setError("Credenciales incorrectas. Verifique su documento y contraseña.");
      } else if (code === "auth/too-many-requests") {
        setError("Demasiados intentos fallidos. Intente de nuevo más tarde.");
      } else {
        setError("No fue posible iniciar sesión. Verifique su conexión.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function register(
    name: string,
    role: string,
    document: string,
    password: string,
    email?: string
  ): Promise<StaffUser | null> {
    setLoading(true);
    setError("");

    try {
      if (!name.trim() || !document.trim() || !password.trim()) {
        setError("Todos los campos obligatorios deben ser diligenciados.");
        return null;
      }

      if (password.trim().length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        return null;
      }

      const staff = await registerStaff(name, role, document, password, email);
      setCurrentUser(staff);
      return staff;
    } catch (err: unknown) {
      console.error("Register error:", err);
      const code = (err as { code?: string })?.code;
      if (code === "auth/email-already-in-use") {
        setError("Ya existe un usuario registrado con este documento o correo.");
      } else if (code === "auth/weak-password") {
        setError("La contraseña es muy débil.");
      } else {
        setError("No fue posible completar el registro. Intente nuevamente.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function logout(): Promise<void> {
    try {
      await logoutStaff();
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  return {
    currentUser,
    loading,
    initializing,
    error,
    setError,
    login,
    register,
    logout,
  };
}
