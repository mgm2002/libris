/**
 * c_MetodoPago — Catálogo de métodos de pago del SAT (CFDI 4.0).
 *
 * Solo dos valores posibles (no confundir con c_FormaPago):
 *   - PUE: Pago en Una sola Exhibición (se paga al momento de emitir el CFDI)
 *   - PPD: Pago en Parcialidades o Diferido (requiere complemento de pago posterior)
 *
 * Fuente: Anexo 20 del SAT, catálogo c_MetodoPago vigente 2024.
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export const METODO_PAGO: SATCatalogEntry[] = [
  { clave: 'PUE', descripcion: 'Pago en una sola exhibición' },
  { clave: 'PPD', descripcion: 'Pago en parcialidades o diferido' },
];

/** Mapa clave → descripción para lookups rápidos. */
export const METODO_PAGO_MAP = catalogToMap(METODO_PAGO);
