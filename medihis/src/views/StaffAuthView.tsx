import { useState, type FormEvent } from "react";
import { PageShell } from "../components/PageShell";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { PrimaryButton } from "../components/Button";
import { ErrorMsg } from "../components/Feedback";
import { useStaffAuthViewModel } from "../viewmodels/useStaffAuthViewModel";
import type { StaffUser } from "../models/StaffUser";

export function StaffAuthView({
  onSuccess,
  onBack,
}: {
  onSuccess: (user: StaffUser) => void;
  onBack: () => void;
}) {
  const { login, register, loading, error, setError } = useStaffAuthViewModel();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [docOrEmail, setDocOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Médico General");
  const [email, setEmail] = useState("");

  const handleLogin = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const user = await login(docOrEmail, password);
    if (user) {
      onSuccess(user);
    }
  };

  const handleRegister = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    const user = await register(name, role, docOrEmail, password, email);
    if (user) {
      onSuccess(user);
    }
  };

  const roles = [
    "Médico General",
    "Médico Especialista",
    "Enfermero/a",
    "Auxiliar de Enfermería",
    "Terapeuta",
    "Otro",
  ];

  return (
    <PageShell onBack={onBack}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "32px 16px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--teal)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Personal de Salud
          </p>
          <h2
            className="serif"
            style={{
              fontSize: 32,
              color: "var(--navy)",
              fontWeight: 400,
              marginBottom: 8,
            }}
          >
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: 14,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            {mode === "login"
              ? "Ingrese sus credenciales para acceder a la gestión clínica."
              : "Complete los datos para registrarse en el sistema con Firebase Auth."}
          </p>

          <Card>
            <form
              onSubmit={mode === "login" ? handleLogin : handleRegister}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {mode === "register" && (
                <>
                  <Input
                    label="Nombre completo"
                    value={name}
                    onChange={setName}
                    placeholder="Ej: Dra. Laura Méndez"
                    required
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--navy)",
                      }}
                    >
                      Rol profesional <span style={{ color: "var(--teal-accent)" }}>*</span>
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{
                        padding: "10px 14px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 15,
                        color: "var(--navy)",
                        background: "#fff",
                        outline: "none",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Correo electrónico (opcional)"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="ejemplo@hospital.com"
                    hint="Si se deja vacío, se generará un acceso ligado a su documento."
                  />
                </>
              )}

              <Input
                label={mode === "login" ? "Documento o Correo" : "Número de documento"}
                value={docOrEmail}
                onChange={setDocOrEmail}
                placeholder={mode === "login" ? "Ej: 12345678 o correo@hospital.com" : "Ej: 12345678"}
                required
              />

              <Input
                label="Contraseña"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                required
              />

              <ErrorMsg msg={error} />

              <PrimaryButton
                type="submit"
                fullWidth
                disabled={loading}
              >
                {loading
                  ? mode === "login"
                    ? "Verificando en Firebase..."
                    : "Registrando en Firebase..."
                  : mode === "login"
                  ? "Ingresar"
                  : "Crear cuenta"}
              </PrimaryButton>
            </form>
          </Card>

          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 14,
              color: "var(--muted)",
            }}
          >
            {mode === "login" ? "¿No tiene cuenta?" : "¿Ya tiene cuenta?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--teal)",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "inherit",
              }}
            >
              {mode === "login" ? "Registrarse" : "Iniciar sesión"}
            </button>
          </p>

          <div
            style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            Credencial demo sugerida: doc <code>12345678</code>, clave <code>demo123</code>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
