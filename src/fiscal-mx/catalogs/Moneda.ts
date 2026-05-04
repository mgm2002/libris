/**
 * c_Moneda — Catálogo de monedas del SAT (CFDI 4.0).
 *
 * Fuente: Anexo 20, catálogo c_Moneda (basado en ISO 4217). Vigente 2024-2025.
 *
 * Se incluyen las monedas más usadas en comercio exterior mexicano.
 * La moneda base del sistema es MXN; cualquier otra requiere tipo de cambio
 * expresado en pesos mexicanos con hasta 4 decimales.
 *
 * "XXX" es la clave especial para operaciones donde no aplica moneda.
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export interface MonedaEntry extends SATCatalogEntry {
  /** Número de decimales permitidos por el SAT para esta moneda en el CFDI. */
  decimales: number;
  /** Símbolo tipográfico (referencial, no normativo). */
  simbolo: string;
}

export const MONEDA_SAT: ReadonlyArray<MonedaEntry> = [
  { clave: 'MXN', descripcion: 'Peso Mexicano',               decimales: 2, simbolo: '$',  vigenteDesde: '2022-01-01' },
  { clave: 'USD', descripcion: 'Dólar Estadounidense',         decimales: 2, simbolo: 'US$', vigenteDesde: '2022-01-01' },
  { clave: 'EUR', descripcion: 'Euro',                         decimales: 2, simbolo: '€',  vigenteDesde: '2022-01-01' },
  { clave: 'CAD', descripcion: 'Dólar Canadiense',            decimales: 2, simbolo: 'CA$', vigenteDesde: '2022-01-01' },
  { clave: 'GBP', descripcion: 'Libra Esterlina',             decimales: 2, simbolo: '£',  vigenteDesde: '2022-01-01' },
  { clave: 'JPY', descripcion: 'Yen',                         decimales: 0, simbolo: '¥',  vigenteDesde: '2022-01-01' },
  { clave: 'CNY', descripcion: 'Yuan',                        decimales: 2, simbolo: '¥',  vigenteDesde: '2022-01-01' },
  {
    clave: 'XXX',
    descripcion: 'Los códigos de moneda se utilizarán cuando proceda',
    decimales: 2,
    simbolo: '',
    vigenteDesde: '2022-01-01',
  },
] as const;

/** Mapa clave → descripción para lookups O(1). */
export const MONEDA_SAT_MAP = catalogToMap(MONEDA_SAT);

/** Devuelve la entrada por clave, o undefined si no existe. */
export function getByClave(clave: string): MonedaEntry | undefined {
  return MONEDA_SAT.find((e) => e.clave === clave);
}

/** Devuelve todas las entradas. */
export function getAll(): ReadonlyArray<MonedaEntry> {
  return MONEDA_SAT;
}
