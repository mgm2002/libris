/**
 * Validador y parser de RFC mexicano.
 *
 * El RFC (Registro Federal de Contribuyentes) tiene dos formatos:
 *   - Persona Moral (PM): 12 chars — AAAA######XXX  (3 letras + 1 letra = 4, 6 dígitos fecha, 3 homoclave)
 *   - Persona Física (PF): 13 chars — AAAA######XXXX (4 letras, 6 dígitos fecha, 3 homoclave)
 *
 * RFC reservados:
 *   - XAXX010101000 — Público general (ventas al menudeo)
 *   - XEXX010101000 — Extranjero sin RFC
 *
 * ESTADO: Fase 2 — stub. Implementar regex y dígito verificador en Prompt 5.
 */

import { RFC_EXTRANJERO, RFC_PM_LENGTH, RFC_PF_LENGTH, RFC_PUBLICO_GENERAL } from './constants';

export type TipoPersona = 'fisica' | 'moral' | 'generico';

export interface RFCParseResult {
  valido: boolean;
  tipo: TipoPersona | null;
  /** Mensaje de error si no es válido. */
  error?: string;
}

/**
 * Valida el formato de un RFC.
 * Stub — implementar regex completo en Prompt 5.
 *
 * @param rfc RFC a validar (se normaliza a mayúsculas antes de validar)
 */
export function validarRFC(rfc: string): RFCParseResult {
  // TODO Prompt 5: implementar regex completo con homoclave
  const normalizado = rfc.trim().toUpperCase();

  if (normalizado === RFC_PUBLICO_GENERAL || normalizado === RFC_EXTRANJERO) {
    return { valido: true, tipo: 'generico' };
  }

  if (normalizado.length === RFC_PM_LENGTH) {
    return { valido: true, tipo: 'moral' };
  }

  if (normalizado.length === RFC_PF_LENGTH) {
    return { valido: true, tipo: 'fisica' };
  }

  return {
    valido: false,
    tipo: null,
    error: `El RFC no es válido (longitud incorrecta: ${normalizado.length} caracteres)`,
  };
}

/**
 * Normaliza un RFC a mayúsculas sin espacios.
 */
export function normalizarRFC(rfc: string): string {
  return rfc.trim().toUpperCase().replace(/\s/g, '');
}

/**
 * Determina si un RFC corresponde a público general o extranjero.
 */
export function esRFCGenerico(rfc: string): boolean {
  const n = normalizarRFC(rfc);
  return n === RFC_PUBLICO_GENERAL || n === RFC_EXTRANJERO;
}
