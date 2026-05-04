/**
 * c_ClaveUnidad — Las 25 claves de unidad más usadas en PyMEs mexicanas (CFDI 4.0).
 *
 * Fuente: Anexo 20, catálogo c_ClaveUnidad (basado en UNECE Rec 20).
 * El catálogo completo tiene >200 entradas; este subconjunto cubre ~95% de
 * los casos en comercio y servicios típicos de PyME.
 *
 * Para unidades especiales (farmacéuticas, agrícolas, etc.) usar el catálogo
 * completo vía SAT o cargarlo desde BD en Prompt 8.
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export interface ClaveUnidadEntry extends SATCatalogEntry {
  /** Símbolo normalizado (puede estar vacío si la unidad no tiene símbolo estándar). */
  simbolo: string;
}

export const CLAVE_UNIDAD: ReadonlyArray<ClaveUnidadEntry> = [
  // ── Conteo y piezas ──────────────────────────────────────────────────────
  { clave: 'H87', descripcion: 'Pieza',                 simbolo: 'pza',  vigenteDesde: '2022-01-01' },
  { clave: 'EA',  descripcion: 'Elemento',               simbolo: '',     vigenteDesde: '2022-01-01' },
  { clave: 'E48', descripcion: 'Unidad de servicio',     simbolo: '',     vigenteDesde: '2022-01-01' },
  { clave: 'ACT', descripcion: 'Actividad',              simbolo: 'act',  vigenteDesde: '2022-01-01' },
  // ── Masa ─────────────────────────────────────────────────────────────────
  { clave: 'KGM', descripcion: 'Kilogramo',              simbolo: 'kg',   vigenteDesde: '2022-01-01' },
  { clave: 'GRM', descripcion: 'Gramo',                  simbolo: 'g',    vigenteDesde: '2022-01-01' },
  // ── Longitud y área ───────────────────────────────────────────────────────
  { clave: 'MTR', descripcion: 'Metro',                  simbolo: 'm',    vigenteDesde: '2022-01-01' },
  { clave: 'CMT', descripcion: 'Centímetro',             simbolo: 'cm',   vigenteDesde: '2022-01-01' },
  { clave: 'MTK', descripcion: 'Metro cuadrado',         simbolo: 'm²',   vigenteDesde: '2022-01-01' },
  { clave: 'MTQ', descripcion: 'Metro cúbico',           simbolo: 'm³',   vigenteDesde: '2022-01-01' },
  // ── Volumen ───────────────────────────────────────────────────────────────
  { clave: 'LTR', descripcion: 'Litro',                  simbolo: 'l',    vigenteDesde: '2022-01-01' },
  { clave: 'MLT', descripcion: 'Mililitro',              simbolo: 'ml',   vigenteDesde: '2022-01-01' },
  // ── Tiempo ────────────────────────────────────────────────────────────────
  { clave: 'HUR', descripcion: 'Hora',                   simbolo: 'h',    vigenteDesde: '2022-01-01' },
  { clave: 'DAY', descripcion: 'Día',                    simbolo: 'día',  vigenteDesde: '2022-01-01' },
  { clave: 'MON', descripcion: 'Mes',                    simbolo: 'mes',  vigenteDesde: '2022-01-01' },
  { clave: 'ANN', descripcion: 'Año',                    simbolo: 'año',  vigenteDesde: '2022-01-01' },
  // ── Agrupaciones ─────────────────────────────────────────────────────────
  { clave: 'KT',  descripcion: 'Kit',                    simbolo: 'kit',  vigenteDesde: '2022-01-01' },
  { clave: 'SET', descripcion: 'Conjunto',               simbolo: 'set',  vigenteDesde: '2022-01-01' },
  { clave: 'XBX', descripcion: 'Caja',                   simbolo: 'caja', vigenteDesde: '2022-01-01' },
  { clave: 'XPK', descripcion: 'Paquete',                simbolo: 'paq',  vigenteDesde: '2022-01-01' },
  // ── Servicios / Tarifas ───────────────────────────────────────────────────
  { clave: 'E51', descripcion: 'Trabajo',                simbolo: '',     vigenteDesde: '2022-01-01' },
  { clave: 'A9',  descripcion: 'Tarifa',                 simbolo: '',     vigenteDesde: '2022-01-01' },
  // ── Granel y bases ────────────────────────────────────────────────────────
  { clave: 'AB',  descripcion: 'Paquete a granel',       simbolo: '',     vigenteDesde: '2022-01-01' },
  { clave: 'BB',  descripcion: 'Caja base',              simbolo: '',     vigenteDesde: '2022-01-01' },
  { clave: 'C81', descripcion: 'Bobina',                 simbolo: '',     vigenteDesde: '2022-01-01' },
] as const;

/** Mapa clave → descripción para lookups O(1). */
export const CLAVE_UNIDAD_MAP = catalogToMap(CLAVE_UNIDAD);

/** Devuelve la entrada por clave, o undefined si no existe. */
export function getByClave(clave: string): ClaveUnidadEntry | undefined {
  return CLAVE_UNIDAD.find((e) => e.clave === clave);
}

/** Devuelve todas las entradas. */
export function getAll(): ReadonlyArray<ClaveUnidadEntry> {
  return CLAVE_UNIDAD;
}
