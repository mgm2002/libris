/**
 * Validador de Código Postal mexicano.
 *
 * El CP mexicano tiene exactamente 5 dígitos numéricos (00001–99999).
 * En CFDI 4.0 es obligatorio en el DomicilioFiscalReceptor del receptor,
 * y en el Emisor ya viene del CSD.
 *
 * ESTADO: Fase 2 — implementación completa (es simple).
 */

/** Expresión regular para CP mexicano: exactamente 5 dígitos. */
const CP_REGEX = /^\d{5}$/;

export interface CPValidationResult {
  valido: boolean;
  error?: string;
}

/**
 * Valida que un código postal tenga el formato correcto para México.
 *
 * @param cp Código postal a validar
 */
export function validarCodigoPostal(cp: string): CPValidationResult {
  const normalizado = cp.trim();

  if (!CP_REGEX.test(normalizado)) {
    return {
      valido: false,
      error: 'El código postal debe tener exactamente 5 dígitos numéricos',
    };
  }

  return { valido: true };
}

/**
 * Normaliza un CP: elimina espacios y ceros a la izquierda opcionales
 * hasta devolver siempre 5 dígitos (padding con ceros a la izquierda).
 *
 * @example normalizarCP('1030') → '01030'
 */
export function normalizarCP(cp: string): string {
  return cp.trim().replace(/\D/g, '').padStart(5, '0').slice(-5);
}
