/**
 * Constantes fiscales mexicanas.
 *
 * Tasas y valores definidos por ley; actualizar cuando el SAT publique cambios.
 * Última revisión: Ley del IVA y LISR vigente 2024.
 */

// ── IVA ─────────────────────────────────────────────────────────────────────

/** IVA general: 16% (Art. 1° LIVA) */
export const IVA_GENERAL = 0.16;

/** IVA en zona fronteriza norte: 8% (Decreto DOF 31/12/2018) */
export const IVA_FRONTERIZO = 0.08;

/** IVA tasa 0% (alimentos no procesados, medicinas, etc.) */
export const IVA_TASA_CERO = 0.0;

// ── ISR (Retenciones a personas físicas) ────────────────────────────────────

/** Retención ISR por honorarios (servicios profesionales): 10% (Art. 106 LISR) */
export const RETENCION_ISR_HONORARIOS = 0.10;

/** Retención ISR por arrendamiento de inmuebles: 10% (Art. 116 LISR) */
export const RETENCION_ISR_ARRENDAMIENTO = 0.10;

// ── IVA Retenciones ─────────────────────────────────────────────────────────

/**
 * Retención IVA por honorarios pagados a personas físicas: 2/3 del IVA cobrado.
 * En tasa general: 16% × 2/3 = 10.6667% sobre el subtotal.
 * (Art. 1-A, fracción II, inciso a) LIVA)
 */
export const RETENCION_IVA_HONORARIOS = (2 / 3) * IVA_GENERAL; // ~0.10667

/**
 * Retención IVA por arrendamiento de inmuebles: 10% sobre el subtotal.
 * (Art. 1-A, fracción II, inciso b) LIVA)
 */
export const RETENCION_IVA_ARRENDAMIENTO = 0.10;

// ── IEPS (Impuesto Especial sobre Producción y Servicios) ────────────────────

/** IEPS sobre cervezas y bebidas alcohólicas (≤6° GL): 26.5% */
export const IEPS_CERVEZA = 0.265;

/** IEPS sobre bebidas alcohólicas (>6° GL): 53% */
export const IEPS_BEBIDAS_ALCOHOLICAS = 0.53;

/** IEPS sobre tabacos: 160% */
export const IEPS_TABACOS = 1.60;

/** IEPS sobre bebidas saborizadas con azúcares: $1.46/litro (cuota fija, no porcentaje) */
export const IEPS_BEBIDAS_SABORIZADAS_POR_LITRO = 1.46;

// ── Límites y umbrales ───────────────────────────────────────────────────────

/** RFC de público general (ventas sin identificar al receptor). */
export const RFC_PUBLICO_GENERAL = 'XAXX010101000';

/** RFC de extranjero (receptor fuera de México). */
export const RFC_EXTRANJERO = 'XEXX010101000';

/** Longitud del RFC de persona moral: 12 caracteres. */
export const RFC_PM_LENGTH = 12;

/** Longitud del RFC de persona física: 13 caracteres. */
export const RFC_PF_LENGTH = 13;

/** Código postal con el que opera el SAT para público general (cualquier CP de 5 dígitos aplica). */
export const CP_GENERICO = '00000';

/** Versión del estándar CFDI soportado. */
export const CFDI_VERSION = '4.0';

/** Régimen fiscal para público general (cuando el receptor usa RFC_PUBLICO_GENERAL). */
export const REGIMEN_FISCAL_PUBLICO_GENERAL = '616'; // Sin obligaciones fiscales
