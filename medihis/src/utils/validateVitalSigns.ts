export interface VitalSignsErrors {
  temp?: string;
  bp?: string;
  hr?: string;
  weight?: string;
  height?: string;
}

/**
 * Valida un valor numérico decimal completo.
 * Acepta números enteros o con punto decimal (ej: "36.8", "70", "168").
 * Rechaza cadenas con letras ("abc", "70abc"), formatos incompletos ("36..8", "36.", ".5"),
 * y conversiones no finitas.
 */
export function validateDecimal(val: string): boolean {
  const trimmed = val.trim();
  if (!trimmed) return true;
  return /^\d+(\.\d+)?$/.test(trimmed) && Number.isFinite(Number(trimmed));
}

/**
 * Valida un valor numérico entero (ej: "72").
 * Rechaza decimales, letras y formatos incompletos.
 */
export function validateInteger(val: string): boolean {
  const trimmed = val.trim();
  if (!trimmed) return true;
  return /^\d+$/.test(trimmed) && Number.isFinite(Number(trimmed));
}

/**
 * Valida un valor de presión arterial en formato compuesto de enteros (ej: "120/80").
 * Rechaza formatos no compuestos, letras y valores incompletos.
 */
export function validateBloodPressure(val: string): boolean {
  const trimmed = val.trim();
  if (!trimmed) return true;
  return /^\d+\/\d+$/.test(trimmed);
}

/**
 * Valida los signos vitales ingresados.
 * Los campos son opcionales: si están vacíos no generan error.
 *
 * @returns Objeto con los mensajes de error en español para los campos inválidos.
 */
export function validateVitalSigns(vitals: {
  temp?: string;
  bp?: string;
  hr?: string;
  weight?: string;
  height?: string;
}): VitalSignsErrors {
  const errors: VitalSignsErrors = {};

  if (vitals.temp && vitals.temp.trim() && !validateDecimal(vitals.temp)) {
    errors.temp = "Formato inválido. Ingrese un valor numérico decimal (ej: 36.8).";
  }

  if (vitals.bp && vitals.bp.trim() && !validateBloodPressure(vitals.bp)) {
    errors.bp = "Formato inválido. Ingrese la presión en formato sistólica/diastólica (ej: 120/80).";
  }

  if (vitals.hr && vitals.hr.trim() && !validateInteger(vitals.hr)) {
    errors.hr = "Formato inválido. Ingrese un número entero (ej: 72).";
  }

  if (vitals.weight && vitals.weight.trim() && !validateDecimal(vitals.weight)) {
    errors.weight = "Formato inválido. Ingrese un valor numérico decimal (ej: 70 o 70.5).";
  }

  if (vitals.height && vitals.height.trim() && !validateDecimal(vitals.height)) {
    errors.height = "Formato inválido. Ingrese un valor numérico decimal (ej: 168 o 1.68).";
  }

  return errors;
}
