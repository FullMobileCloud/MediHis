/**
 * Valida que una contraseña cumpla los requisitos mínimos de robustez
 * para el registro de personal de salud.
 *
 * Reglas:
 * - Al menos 8 caracteres.
 * - Al menos una letra (a-z o A-Z).
 * - Al menos un número (0-9).
 *
 * @returns `null` si la contraseña es válida, o un mensaje de error en español.
 */
export function validatePassword(password: string): string | null {
  if (
    password.length < 8 ||
    !/[a-zA-Z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return "La contraseña debe tener al menos 8 caracteres e incluir una letra y un número.";
  }
  return null;
}