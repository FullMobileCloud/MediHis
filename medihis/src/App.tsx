import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface VitalSigns {
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  weight: string;
  height: string;
}

interface ClinicalRecord {
  id: string;
  patientDocument: string;
  patientName: string;
  date: string;
  createdByName: string;
  createdByRole: string;
  chiefComplaint: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  vitalSigns: VitalSigns;
}

interface StaffUser {
  id: string;
  name: string;
  role: string;
  document: string;
  password: string;
}

type Screen =
  | "home"
  | "staff-auth"
  | "staff-dashboard"
  | "staff-new-record"
  | "staff-patient-id"
  | "staff-records"
  | "patient-search"
  | "patient-results"
  | "patient-record-detail";

// ─── Storage helpers ──────────────────────────────────────────────────────────

const getRecords = (): ClinicalRecord[] =>
  JSON.parse(localStorage.getItem("medihis_records") || "[]");

const saveRecord = (r: ClinicalRecord) => {
  const all = getRecords();
  all.push(r);
  localStorage.setItem("medihis_records", JSON.stringify(all));
};

const getStaff = (): StaffUser[] =>
  JSON.parse(localStorage.getItem("medihis_staff") || "[]");

const saveStaff = (u: StaffUser) => {
  const all = getStaff();
  all.push(u);
  localStorage.setItem("medihis_staff", JSON.stringify(all));
};

// ─── Seed demo data on first load ─────────────────────────────────────────────

const seedDemoData = () => {
  if (localStorage.getItem("medihis_seeded")) return;
  const demoStaff: StaffUser[] = [
    { id: "s1", name: "Dra. Laura Méndez", role: "Médico General", document: "12345678", password: "demo123" },
  ];
  const demoRecords: ClinicalRecord[] = [
    {
      id: "r1",
      patientDocument: "98765432",
      patientName: "Carlos Pérez Gómez",
      date: "2026-08-10T09:30:00.000Z",
      createdByName: "Dra. Laura Méndez",
      createdByRole: "Médico General",
      chiefComplaint: "Dolor de cabeza persistente y fiebre de 38.5 °C por tres días.",
      diagnosis: "Cefalea tensional con proceso infeccioso leve.",
      treatment: "Ibuprofeno 400 mg cada 8 horas por 5 días. Reposo relativo. Hidratación abundante.",
      notes: "Paciente refiere antecedente de migraña. Se recomienda control en 7 días si no mejora.",
      vitalSigns: { temperature: "38.5", bloodPressure: "118/76", heartRate: "88", weight: "72", height: "170" },
    },
    {
      id: "r2",
      patientDocument: "98765432",
      patientName: "Carlos Pérez Gómez",
      date: "2026-08-24T14:00:00.000Z",
      createdByName: "Dra. Laura Méndez",
      createdByRole: "Médico General",
      chiefComplaint: "Control post-tratamiento. Refiere mejoría completa.",
      diagnosis: "Resolución del cuadro. Estado general satisfactorio.",
      treatment: "No requiere medicación adicional.",
      notes: "Se indica retorno solo si hay nuevos síntomas.",
      vitalSigns: { temperature: "36.8", bloodPressure: "115/74", heartRate: "72", weight: "72", height: "170" },
    },
  ];
  localStorage.setItem("medihis_staff", JSON.stringify(demoStaff));
  localStorage.setItem("medihis_records", JSON.stringify(demoRecords));
  localStorage.setItem("medihis_seeded", "1");
};

// ─── Shared UI primitives ─────────────────────────────────────────────────────

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{
          width: 32,
          height: 32,
          background: light ? "#fff" : "var(--teal)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 2v14M2 9h14"
            stroke={light ? "var(--teal)" : "#fff"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span
        className="serif"
        style={{
          fontSize: 22,
          fontWeight: 400,
          color: light ? "#fff" : "var(--navy)",
          letterSpacing: "-0.02em",
        }}
      >
        MediHIS
      </span>
    </div>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--muted)",
        fontSize: 14,
        fontFamily: "inherit",
        padding: "4px 0",
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Volver
    </button>
  );
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  hint,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", letterSpacing: "0.01em" }}>
        {label}
        {required && <span style={{ color: "var(--teal-accent)", marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "10px 14px",
          border: `1.5px solid ${focused ? "var(--teal)" : "var(--border)"}`,
          borderRadius: 8,
          fontSize: 15,
          color: "var(--navy)",
          background: "#fff",
          outline: "none",
          transition: "border-color 0.15s",
          fontFamily: "inherit",
        }}
      />
      {hint && <span style={{ fontSize: 12, color: "var(--muted)" }}>{hint}</span>}
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", letterSpacing: "0.01em" }}>
        {label}
        {required && <span style={{ color: "var(--teal-accent)", marginLeft: 3 }}>*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "10px 14px",
          border: `1.5px solid ${focused ? "var(--teal)" : "var(--border)"}`,
          borderRadius: 8,
          fontSize: 15,
          color: "var(--navy)",
          background: "#fff",
          outline: "none",
          transition: "border-color 0.15s",
          fontFamily: "inherit",
          resize: "vertical",
          lineHeight: 1.6,
        }}
      />
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  fullWidth,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "12px 24px",
        background: disabled ? "var(--border)" : hovered ? "var(--teal-dark)" : "var(--teal)",
        color: disabled ? "var(--muted)" : "#fff",
        border: "none",
        borderRadius: 8,
        fontSize: 15,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s",
        width: fullWidth ? "100%" : undefined,
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "12px 24px",
        background: hovered ? "var(--teal-light)" : "transparent",
        color: "var(--teal)",
        border: "1.5px solid var(--teal)",
        borderRadius: 8,
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Badge({ label, color = "teal" }: { label: string; color?: "teal" | "navy" | "muted" }) {
  const styles = {
    teal: { bg: "var(--teal-light)", text: "var(--teal)" },
    navy: { bg: "#E8EDF4", text: "var(--navy)" },
    muted: { bg: "#F0F2F5", text: "var(--muted)" },
  };
  const s = styles[color];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        background: s.bg,
        color: s.text,
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </span>
  );
}

function PageShell({ children, onBack }: { children: React.ReactNode; onBack?: () => void }) {
  return (
    <div style={{ minHeight: "100%", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      <header
        className="page-shell-header"
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        {onBack && <BackButton onBack={onBack} />}
      </header>
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</main>
    </div>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <div
      style={{
        padding: "10px 14px",
        background: "#FFF1F1",
        border: "1px solid #FAD4D4",
        borderRadius: 8,
        color: "var(--error)",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {msg}
    </div>
  );
}

function SuccessMsg({ msg }: { msg: string }) {
  return (
    <div
      style={{
        padding: "10px 14px",
        background: "#F0FBF5",
        border: "1px solid #B8E8CF",
        borderRadius: 8,
        color: "var(--success)",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {msg}
    </div>
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

// Home
function HomeScreen({ onStaff, onPatient }: { onStaff: () => void; onPatient: () => void }) {
  return (
    <div className="home-layout">
      {/* Left panel */}
      <div className="home-panel-left">
        <Logo light />
        <div>
          <p
            className="serif"
            style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Sistema de historias clínicas
          </p>
          <h1
            className="serif"
            style={{ color: "#fff", fontSize: 38, lineHeight: 1.15, fontWeight: 400, margin: "0 0 20px" }}
          >
            Registros médicos digitales, simples y seguros.
          </h1>
          <p className="desc" style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.7, maxWidth: 320 }}>
            MediHIS permite al personal de salud crear y consultar historias clínicas, y a los pacientes acceder a sus
            propios registros con su número de documento.
          </p>
        </div>
        <p className="copyright" style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 32 }}>© 2026 MediHIS · v1.0</p>
      </div>

      {/* Right panel */}
      <div className="home-panel-right">
        <div style={{ maxWidth: 400, width: "100%" }}>
          <h2
            className="serif"
            style={{ fontSize: 28, color: "var(--navy)", marginBottom: 6, fontWeight: 400 }}
          >
            ¿Cómo desea ingresar?
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
            Seleccione su rol para continuar.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <RoleCard
              icon={
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="4" y="4" width="20" height="20" rx="4" stroke="var(--teal)" strokeWidth="1.75" />
                  <path d="M14 8v12M8 14h12" stroke="var(--teal)" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              }
              title="Personal de Salud"
              desc="Médicos, enfermeros y profesionales clínicos"
              onClick={onStaff}
            />
            <RoleCard
              icon={
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="10" r="5" stroke="var(--teal)" strokeWidth="1.75" />
                  <path d="M6 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="var(--teal)" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              }
              title="Paciente"
              desc="Consulta tus historias clínicas con tu documento"
              onClick={onPatient}
            />
          </div>

          <div
            style={{
              marginTop: 28,
              padding: "12px 14px",
              background: "var(--teal-light)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--teal)",
              lineHeight: 1.6,
            }}
          >
            <strong>Demo:</strong> Personal de salud: doc <code>12345678</code>, clave <code>demo123</code>. Paciente: doc <code>98765432</code>.
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 24px",
        background: hovered ? "var(--teal-light)" : "#fff",
        border: `1.5px solid ${hovered ? "var(--teal)" : "var(--border)"}`,
        borderRadius: 12,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          background: "var(--teal-light)",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 16, color: "var(--navy)", marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
      </div>
      <svg
        style={{ marginLeft: "auto", flexShrink: 0 }}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path d="M7 5l4 4-4 4" stroke="var(--muted)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// Staff Auth
function StaffAuthScreen({
  onSuccess,
  onBack,
}: {
  onSuccess: (user: StaffUser) => void;
  onBack: () => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [doc, setDoc] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Médico General");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    const all = getStaff();
    const found = all.find((u) => u.document === doc && u.password === password);
    if (!found) {
      setError("Documento o contraseña incorrectos.");
      return;
    }
    onSuccess(found);
  };

  const handleRegister = () => {
    setError("");
    if (!name.trim() || !doc.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    const all = getStaff();
    if (all.find((u) => u.document === doc)) {
      setError("Ya existe un usuario con ese número de documento.");
      return;
    }
    const newUser: StaffUser = {
      id: `s${Date.now()}`,
      name: name.trim(),
      role,
      document: doc.trim(),
      password: password.trim(),
    };
    saveStaff(newUser);
    onSuccess(newUser);
  };

  const roles = ["Médico General", "Médico Especialista", "Enfermero/a", "Auxiliar de Enfermería", "Terapeuta", "Otro"];

  return (
    <PageShell onBack={onBack}>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
            Personal de Salud
          </p>
          <h2 className="serif" style={{ fontSize: 32, color: "var(--navy)", fontWeight: 400, marginBottom: 8 }}>
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
            {mode === "login"
              ? "Ingrese sus credenciales para continuar."
              : "Complete los datos para registrarse como profesional de salud."}
          </p>

          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {mode === "register" && (
                <>
                  <Input label="Nombre completo" value={name} onChange={setName} placeholder="Ej: Dr. Juan García" required />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>Rol <span style={{ color: "var(--teal-accent)" }}>*</span></label>
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
                      {roles.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </>
              )}
              <Input
                label="Número de documento"
                value={doc}
                onChange={setDoc}
                placeholder="Ej: 12345678"
                required
                type="text"
              />
              <Input
                label="Contraseña"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                required
              />
              {error && <ErrorMsg msg={error} />}
              <PrimaryButton
                fullWidth
                onClick={mode === "login" ? handleLogin : handleRegister}
              >
                {mode === "login" ? "Ingresar" : "Crear cuenta"}
              </PrimaryButton>
            </div>
          </Card>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--muted)" }}>
            {mode === "login" ? "¿No tiene cuenta?" : "¿Ya tiene cuenta?"}
            {" "}
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              style={{ background: "none", border: "none", color: "var(--teal)", fontWeight: 600, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}
            >
              {mode === "login" ? "Registrarse" : "Iniciar sesión"}
            </button>
          </p>
        </div>
      </div>
    </PageShell>
  );
}

// Staff Dashboard
function StaffDashboard({
  staff,
  onNewRecord,
  onViewRecords,
  onLogout,
}: {
  staff: StaffUser;
  onNewRecord: () => void;
  onViewRecords: () => void;
  onLogout: () => void;
}) {
  const recordCount = getRecords().filter((r) => r.createdByName === staff.name).length;
  return (
    <PageShell>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px" }}>
        <div style={{ width: "100%", maxWidth: 560 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 40 }}>
            <div>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>Bienvenido/a,</p>
              <h2 className="serif" style={{ fontSize: 30, color: "var(--navy)", fontWeight: 400, margin: 0 }}>
                {staff.name}
              </h2>
              <Badge label={staff.role} color="teal" />
            </div>
            <button
              onClick={onLogout}
              style={{
                background: "none",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--muted)",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--error)";
                e.currentTarget.style.borderColor = "var(--error)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              Cerrar sesión
            </button>
          </div>

          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <StatCard label="Historias creadas" value={recordCount.toString()} />
            <StatCard label="Total en sistema" value={getRecords().length.toString()} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ActionCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }
              title="Nueva historia clínica"
              desc="Registrar una historia para un paciente"
              onClick={onNewRecord}
              primary
            />
            <ActionCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="var(--teal)" strokeWidth="1.75" />
                  <path d="M16.5 16.5l4 4" stroke="var(--teal)" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              }
              title="Consultar historias"
              desc="Buscar registros existentes por documento"
              onClick={onViewRecords}
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card style={{ padding: "20px 24px" }}>
      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6, fontWeight: 500 }}>{label}</div>
      <div className="serif" style={{ fontSize: 36, color: "var(--navy)", fontWeight: 400 }}>{value}</div>
    </Card>
  );
}

function ActionCard({
  icon,
  title,
  desc,
  onClick,
  primary,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
  primary?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 24px",
        background: primary ? (hovered ? "var(--teal-dark)" : "var(--teal)") : hovered ? "var(--teal-light)" : "#fff",
        border: primary ? "none" : `1.5px solid ${hovered ? "var(--teal)" : "var(--border)"}`,
        borderRadius: 12,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          background: primary ? "rgba(255,255,255,0.15)" : "var(--teal-light)",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {primary ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 16, color: primary ? "#fff" : "var(--navy)", marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 13, color: primary ? "rgba(255,255,255,0.75)" : "var(--muted)" }}>{desc}</div>
      </div>
      <svg style={{ marginLeft: "auto" }} width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M7 5l4 4-4 4"
          stroke={primary ? "rgba(255,255,255,0.6)" : "var(--muted)"}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// Staff Patient ID (enter patient document to create record)
function StaffPatientIdScreen({
  staff,
  onContinue,
  onBack,
}: {
  staff: StaffUser;
  onContinue: (patientDoc: string, patientName: string) => void;
  onBack: () => void;
}) {
  const [patientDoc, setPatientDoc] = useState("");
  const [patientName, setPatientName] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    setError("");
    if (!patientDoc.trim() || !patientName.trim()) {
      setError("Complete todos los campos requeridos.");
      return;
    }
    onContinue(patientDoc.trim(), patientName.trim());
  };

  return (
    <PageShell onBack={onBack}>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
            Nueva historia clínica
          </p>
          <h2 className="serif" style={{ fontSize: 32, color: "var(--navy)", fontWeight: 400, marginBottom: 8 }}>
            Identificar al paciente
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 32 }}>
            Ingrese el documento y nombre del paciente antes de continuar.
          </p>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Input
                label="Documento del paciente"
                value={patientDoc}
                onChange={setPatientDoc}
                placeholder="Número de cédula o identificación"
                required
              />
              <Input
                label="Nombre completo del paciente"
                value={patientName}
                onChange={setPatientName}
                placeholder="Nombre y apellidos"
                required
              />
              {error && <ErrorMsg msg={error} />}
              <PrimaryButton fullWidth onClick={handleContinue}>
                Continuar →
              </PrimaryButton>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

// Staff New Record Form
function StaffNewRecordScreen({
  staff,
  patientDocument,
  patientName,
  onSaved,
  onBack,
}: {
  staff: StaffUser;
  patientDocument: string;
  patientName: string;
  onSaved: () => void;
  onBack: () => void;
}) {
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [temp, setTemp] = useState("");
  const [bp, setBp] = useState("");
  const [hr, setHr] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setError("");
    if (!chiefComplaint.trim() || !diagnosis.trim() || !treatment.trim()) {
      setError("Complete el motivo de consulta, diagnóstico y tratamiento.");
      return;
    }
    const record: ClinicalRecord = {
      id: `r${Date.now()}`,
      patientDocument,
      patientName,
      date: new Date().toISOString(),
      createdByName: staff.name,
      createdByRole: staff.role,
      chiefComplaint: chiefComplaint.trim(),
      diagnosis: diagnosis.trim(),
      treatment: treatment.trim(),
      notes: notes.trim(),
      vitalSigns: { temperature: temp, bloodPressure: bp, heartRate: hr, weight, height },
    };
    saveRecord(record);
    setSaved(true);
    setTimeout(() => onSaved(), 1800);
  };

  return (
    <PageShell onBack={onBack}>
      <div className="page-content" style={{ flex: 1, maxWidth: 680, width: "100%", margin: "0 auto" }}>
        <div className="record-header-row">
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
              Historia clínica
            </p>
            <h2 className="serif" style={{ fontSize: 28, color: "var(--navy)", fontWeight: 400, margin: "0 0 4px" }}>
              {patientName}
            </h2>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>Doc: {patientDocument} · {new Date().toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 13, color: "var(--navy)", fontWeight: 600 }}>{staff.name}</p>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>{staff.role}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Vital signs */}
          <Card>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 16, letterSpacing: "0.02em" }}>
              Signos vitales
            </h3>
            <div className="vital-grid">
              <Input label="Temperatura (°C)" value={temp} onChange={setTemp} placeholder="36.8" />
              <Input label="T/A (mmHg)" value={bp} onChange={setBp} placeholder="120/80" />
              <Input label="Frec. cardíaca (lpm)" value={hr} onChange={setHr} placeholder="72" />
              <Input label="Peso (kg)" value={weight} onChange={setWeight} placeholder="70" />
              <Input label="Talla (cm)" value={height} onChange={setHeight} placeholder="168" />
            </div>
          </Card>

          {/* Clinical info */}
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Textarea
                label="Motivo de consulta"
                value={chiefComplaint}
                onChange={setChiefComplaint}
                placeholder="Descripción del motivo principal de la visita..."
                required
                rows={3}
              />
              <Textarea
                label="Diagnóstico"
                value={diagnosis}
                onChange={setDiagnosis}
                placeholder="Diagnóstico o impresión diagnóstica..."
                required
                rows={3}
              />
              <Textarea
                label="Plan de tratamiento"
                value={treatment}
                onChange={setTreatment}
                placeholder="Medicamentos, indicaciones, órdenes..."
                required
                rows={3}
              />
              <Textarea
                label="Notas y observaciones"
                value={notes}
                onChange={setNotes}
                placeholder="Antecedentes relevantes, observaciones adicionales..."
                rows={2}
              />
            </div>
          </Card>

          {error && <ErrorMsg msg={error} />}
          {saved && <SuccessMsg msg="Historia clínica guardada correctamente. Redirigiendo..." />}

          <div className="form-actions" style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <GhostButton onClick={onBack}>Cancelar</GhostButton>
            <PrimaryButton onClick={handleSave} disabled={saved}>
              {saved ? "Guardado ✓" : "Guardar historia clínica"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

// Staff View Records
function StaffRecordsScreen({ onBack, onView }: { onBack: () => void; onView: (r: ClinicalRecord) => void }) {
  const [query, setQuery] = useState("");
  const all = getRecords();
  const filtered = query.trim()
    ? all.filter(
        (r) =>
          r.patientDocument.includes(query.trim()) ||
          r.patientName.toLowerCase().includes(query.trim().toLowerCase())
      )
    : all;

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <PageShell onBack={onBack}>
      <div className="page-content" style={{ flex: 1, maxWidth: 680, width: "100%", margin: "0 auto" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Consulta de registros
        </p>
        <h2 className="serif" style={{ fontSize: 30, color: "var(--navy)", fontWeight: 400, marginBottom: 24 }}>
          Historias clínicas
        </h2>

        <div style={{ marginBottom: 24, position: "relative" }}>
          <svg
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            width="18" height="18" viewBox="0 0 18 18" fill="none"
          >
            <circle cx="8" cy="8" r="5.5" stroke="var(--muted)" strokeWidth="1.5" />
            <path d="M12.5 12.5l3 3" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por documento o nombre..."
            style={{
              width: "100%",
              padding: "12px 14px 12px 42px",
              border: "1.5px solid var(--border)",
              borderRadius: 10,
              fontSize: 15,
              color: "var(--navy)",
              background: "#fff",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>

        {sorted.length === 0 ? (
          <Card style={{ textAlign: "center", padding: 48 }}>
            <p style={{ color: "var(--muted)", fontSize: 15 }}>
              {query ? "No se encontraron registros para esa búsqueda." : "No hay historias clínicas registradas."}
            </p>
          </Card>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sorted.map((r) => (
              <RecordListItem key={r.id} record={r} onClick={() => onView(r)} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

function RecordListItem({ record, onClick }: { record: ClinicalRecord; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const date = new Date(record.date);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        background: hovered ? "var(--teal-light)" : "#fff",
        border: `1.5px solid ${hovered ? "var(--teal)" : "var(--border)"}`,
        borderRadius: 10,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s",
        fontFamily: "inherit",
        width: "100%",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          background: "var(--teal-light)",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 700, color: "var(--teal)", lineHeight: 1 }}>{date.getDate()}</span>
        <span style={{ fontSize: 10, color: "var(--teal)", fontWeight: 600 }}>
          {date.toLocaleString("es-CO", { month: "short" }).toUpperCase()}
        </span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 2 }}>{record.patientName}</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>Doc: {record.patientDocument}</div>
        <div style={{ fontSize: 13, color: "var(--navy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>
          {record.chiefComplaint}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>{record.createdByName}</div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}

// Record Detail
function RecordDetailScreen({ record, onBack }: { record: ClinicalRecord; onBack: () => void }) {
  const date = new Date(record.date);
  const fmt = (d: Date) =>
    d.toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const vitals = [
    { label: "Temperatura", value: record.vitalSigns.temperature ? `${record.vitalSigns.temperature} °C` : null },
    { label: "T/A", value: record.vitalSigns.bloodPressure ? `${record.vitalSigns.bloodPressure} mmHg` : null },
    { label: "F.C.", value: record.vitalSigns.heartRate ? `${record.vitalSigns.heartRate} lpm` : null },
    { label: "Peso", value: record.vitalSigns.weight ? `${record.vitalSigns.weight} kg` : null },
    { label: "Talla", value: record.vitalSigns.height ? `${record.vitalSigns.height} cm` : null },
  ].filter((v) => v.value);

  return (
    <PageShell onBack={onBack}>
      <div className="page-content" style={{ flex: 1, maxWidth: 680, width: "100%", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "var(--teal)",
            borderRadius: 12,
            padding: "24px",
            marginBottom: 20,
          }}
        >
        <div className="record-detail-header">
          <div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
              Historia clínica
            </p>
            <h2 className="serif" style={{ color: "#fff", fontSize: 26, fontWeight: 400, margin: "0 0 6px" }}>
              {record.patientName}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>Documento: {record.patientDocument}</p>
          </div>
          <div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginBottom: 2 }}>{fmt(date)}</p>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 600 }}>{record.createdByName}</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{record.createdByRole}</p>
          </div>
        </div>
        </div>

        {vitals.length > 0 && (
          <Card style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
              Signos vitales
            </h3>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {vitals.map((v) => (
                <div key={v.label}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{v.label}</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>{v.value}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <RecordSection title="Motivo de consulta" content={record.chiefComplaint} />
          <RecordSection title="Diagnóstico" content={record.diagnosis} />
          <RecordSection title="Tratamiento" content={record.treatment} />
          {record.notes && <RecordSection title="Notas y observaciones" content={record.notes} />}
        </div>
      </div>
    </PageShell>
  );
}

function RecordSection({ title, content }: { title: string; content: string }) {
  return (
    <Card>
      <h3 style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
        {title}
      </h3>
      <p style={{ fontSize: 15, color: "var(--navy)", lineHeight: 1.75, margin: 0 }}>{content}</p>
    </Card>
  );
}

// Patient Search
function PatientSearchScreen({ onResults, onBack }: { onResults: (doc: string, records: ClinicalRecord[]) => void; onBack: () => void }) {
  const [doc, setDoc] = useState("");
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setError("");
    if (!doc.trim()) {
      setError("Ingrese su número de documento.");
      return;
    }
    const found = getRecords().filter((r) => r.patientDocument === doc.trim());
    setSearched(true);
    if (found.length === 0) {
      setError("No se encontraron historias clínicas para ese documento.");
      return;
    }
    onResults(doc.trim(), found);
  };

  return (
    <PageShell onBack={onBack}>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
            Acceso de paciente
          </p>
          <h2 className="serif" style={{ fontSize: 32, color: "var(--navy)", fontWeight: 400, marginBottom: 8 }}>
            Consultar mis historias
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
            Ingrese su número de documento de identidad para ver sus historias clínicas registradas.
          </p>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Input
                label="Número de documento"
                value={doc}
                onChange={(v) => { setDoc(v); setSearched(false); setError(""); }}
                placeholder="Ej: 98765432"
                required
              />
              {error && <ErrorMsg msg={error} />}
              <PrimaryButton fullWidth onClick={handleSearch}>
                Buscar historias
              </PrimaryButton>
            </div>
          </Card>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 20, lineHeight: 1.6, textAlign: "center" }}>
            Solo puede consultar sus propios registros. Para consultar el documento <strong>98765432</strong> en la demo.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

// Patient Results
function PatientResultsScreen({
  patientDoc,
  records,
  onView,
  onBack,
}: {
  patientDoc: string;
  records: ClinicalRecord[];
  onView: (r: ClinicalRecord) => void;
  onBack: () => void;
}) {
  const sorted = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <PageShell onBack={onBack}>
      <div className="page-content" style={{ flex: 1, maxWidth: 680, width: "100%", margin: "0 auto" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Mis historias clínicas
        </p>
        <h2 className="serif" style={{ fontSize: 30, color: "var(--navy)", fontWeight: 400, marginBottom: 4 }}>
          {sorted[0]?.patientName}
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>
          Documento: {patientDoc} · {sorted.length} registro{sorted.length !== 1 ? "s" : ""} encontrado{sorted.length !== 1 ? "s" : ""}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sorted.map((r) => (
            <RecordListItem key={r.id} record={r} onClick={() => onView(r)} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [staffUser, setStaffUser] = useState<StaffUser | null>(null);
  const [pendingPatientDoc, setPendingPatientDoc] = useState("");
  const [pendingPatientName, setPendingPatientName] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(null);
  const [patientSearchDoc, setPatientSearchDoc] = useState("");
  const [patientRecords, setPatientRecords] = useState<ClinicalRecord[]>([]);
  const [prevScreen, setPrevScreen] = useState<Screen>("home");

  useEffect(() => { seedDemoData(); }, []);

  const go = (next: Screen) => {
    setPrevScreen(screen);
    setScreen(next);
  };

  if (screen === "home") {
    return <HomeScreen onStaff={() => go("staff-auth")} onPatient={() => go("patient-search")} />;
  }

  if (screen === "staff-auth") {
    return (
      <StaffAuthScreen
        onSuccess={(u) => { setStaffUser(u); go("staff-dashboard"); }}
        onBack={() => go("home")}
      />
    );
  }

  if (screen === "staff-dashboard" && staffUser) {
    return (
      <StaffDashboard
        staff={staffUser}
        onNewRecord={() => go("staff-patient-id")}
        onViewRecords={() => go("staff-records")}
        onLogout={() => { setStaffUser(null); go("home"); }}
      />
    );
  }

  if (screen === "staff-patient-id" && staffUser) {
    return (
      <StaffPatientIdScreen
        staff={staffUser}
        onContinue={(d, n) => { setPendingPatientDoc(d); setPendingPatientName(n); go("staff-new-record"); }}
        onBack={() => go("staff-dashboard")}
      />
    );
  }

  if (screen === "staff-new-record" && staffUser) {
    return (
      <StaffNewRecordScreen
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
      <StaffRecordsScreen
        onBack={() => go("staff-dashboard")}
        onView={(r) => { setSelectedRecord(r); setPrevScreen("staff-records"); go("patient-record-detail"); }}
      />
    );
  }

  if (screen === "patient-search") {
    return (
      <PatientSearchScreen
        onResults={(d, records) => { setPatientSearchDoc(d); setPatientRecords(records); go("patient-results"); }}
        onBack={() => go("home")}
      />
    );
  }

  if (screen === "patient-results") {
    return (
      <PatientResultsScreen
        patientDoc={patientSearchDoc}
        records={patientRecords}
        onView={(r) => { setSelectedRecord(r); setPrevScreen("patient-results"); go("patient-record-detail"); }}
        onBack={() => go("patient-search")}
      />
    );
  }

  if (screen === "patient-record-detail" && selectedRecord) {
    return (
      <RecordDetailScreen
        record={selectedRecord}
        onBack={() => go(prevScreen)}
      />
    );
  }

  return <HomeScreen onStaff={() => go("staff-auth")} onPatient={() => go("patient-search")} />;
}
