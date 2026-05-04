/**
 * c_MetodoPago — Catálogo de métodos de pago del SAT (CFDI 4.0).
 *
 * Fuente: Anexo 20, catálogo c_MetodoPago. Vigente 2024-2025.
 *
 * Solo dos valores (no confundir con c_FormaPago):
 *   PUE — Pago en Una sola Exhibición: el pago ocurre al emitir el CFDI.
 *   PPD — Pago en Parcialidades o Diferido: requiere Complemento de Pago posterior.
 *
 * Cuando se usa PPD, FormaPago debe ser "99" y se emite un CFDI de egreso
 * (complemento de pago) por cada pago parcial recibido.
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export const METODO_PAGO: ReadonlyArray<SATCatalogEntry> = [
  {
    clave: 'PUE',
    descripcion: 'Pago en una sola exhibición',
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'PPD',
    descripcion: 'Pago en parcialidades o diferido',
    vigenteDesde: '2022-01-01',
  },
] as const;

/** Mapa clave → descripción para lookups O(1). */
export const METODO_PAGO_MAP = catalogToMap(METODO_PAGO);

/** Devuelve la entrada por clave, o undefined si no existe. */
export function getByClave(clave: string): SATCatalogEntry | undefined {
  return METODO_PAGO.find((e) => e.clave === clave);
}

/** Devuelve todas las entradas. */
export function getAll(): ReadonlyArray<SATCatalogEntry> {
  return METODO_PAGO;
}
