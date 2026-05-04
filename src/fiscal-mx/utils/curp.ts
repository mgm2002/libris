/**
 * Validador de CURP (Clave Única de Registro de Población).
 *
 * La CURP tiene 18 caracteres con estructura definida por RENAPO.
 * Es opcional en CFDI pero necesaria para algunos complementos (nómina, etc.).
 *
 * ESTADO: Fase 2 — stub. Implementar en Prompt 5 si se requiere.
 */

/** Longitud fija del CURP. */
export const CURP_LENGTH = 18;

export interface CURPParseResult {
  valido: boolean;
  error?: string;
}

/**
 * Valida el formato de un CURP.
 * Stub — implementar regex completo en Prompt 5.
 *
 * @param curp CURP a validar (se normaliza a mayúsculas)
 */
export function validarCURP(curp: string): CURPParseResult {
  // TODO Prompt 5: implementar regex RENAPO
  const normalizado = curp.trim().toUpperCase();

  if (normalizado.length !== CURP_LENGTH) {
    return {
      valido: false,
      error: `El CURP debe tener ${CURP_LENGTH} caracteres (tiene ${normalizado.length})`,
    };
  }

  return { valido: true };
}
