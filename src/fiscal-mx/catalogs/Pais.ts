/**
 * c_Pais — Top 30 países más frecuentes en comercio exterior mexicano (CFDI 4.0).
 *
 * Fuente: Anexo 20, catálogo c_Pais (basado en ISO 3166-1 alpha-3). Vigente 2024-2025.
 * El catálogo completo tiene ~250 países; este subconjunto cubre el comercio
 * exterior típico de una PyME mexicana.
 *
 * Se usa en:
 *   - DomicilioFiscalReceptor (receptor extranjero)
 *   - Complemento de Comercio Exterior
 *
 * Orden: México primero, después Norteamérica, Europa principal, Latam principal,
 * Asia-Pacífico y otros.
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export const PAIS_SAT: ReadonlyArray<SATCatalogEntry> = [
  // ── México ────────────────────────────────────────────────────────────────
  { clave: 'MEX', descripcion: 'México',                       vigenteDesde: '2022-01-01' },
  // ── Norteamérica ──────────────────────────────────────────────────────────
  { clave: 'USA', descripcion: 'Estados Unidos de América',    vigenteDesde: '2022-01-01' },
  { clave: 'CAN', descripcion: 'Canadá',                       vigenteDesde: '2022-01-01' },
  // ── Europa principal ──────────────────────────────────────────────────────
  { clave: 'ESP', descripcion: 'España',                       vigenteDesde: '2022-01-01' },
  { clave: 'DEU', descripcion: 'Alemania',                     vigenteDesde: '2022-01-01' },
  { clave: 'FRA', descripcion: 'Francia',                      vigenteDesde: '2022-01-01' },
  { clave: 'ITA', descripcion: 'Italia',                       vigenteDesde: '2022-01-01' },
  { clave: 'GBR', descripcion: 'Reino Unido',                  vigenteDesde: '2022-01-01' },
  { clave: 'NLD', descripcion: 'Países Bajos',                 vigenteDesde: '2022-01-01' },
  { clave: 'BEL', descripcion: 'Bélgica',                      vigenteDesde: '2022-01-01' },
  { clave: 'CHE', descripcion: 'Suiza',                        vigenteDesde: '2022-01-01' },
  { clave: 'SWE', descripcion: 'Suecia',                       vigenteDesde: '2022-01-01' },
  // ── Latinoamérica principal ───────────────────────────────────────────────
  { clave: 'GTM', descripcion: 'Guatemala',                    vigenteDesde: '2022-01-01' },
  { clave: 'COL', descripcion: 'Colombia',                     vigenteDesde: '2022-01-01' },
  { clave: 'ARG', descripcion: 'Argentina',                    vigenteDesde: '2022-01-01' },
  { clave: 'BRA', descripcion: 'Brasil',                       vigenteDesde: '2022-01-01' },
  { clave: 'CHL', descripcion: 'Chile',                        vigenteDesde: '2022-01-01' },
  { clave: 'PER', descripcion: 'Perú',                         vigenteDesde: '2022-01-01' },
  { clave: 'CRI', descripcion: 'Costa Rica',                   vigenteDesde: '2022-01-01' },
  { clave: 'PAN', descripcion: 'Panamá',                       vigenteDesde: '2022-01-01' },
  { clave: 'HND', descripcion: 'Honduras',                     vigenteDesde: '2022-01-01' },
  { clave: 'SLV', descripcion: 'El Salvador',                  vigenteDesde: '2022-01-01' },
  { clave: 'VEN', descripcion: 'Venezuela',                    vigenteDesde: '2022-01-01' },
  { clave: 'CUB', descripcion: 'Cuba',                         vigenteDesde: '2022-01-01' },
  { clave: 'ECU', descripcion: 'Ecuador',                      vigenteDesde: '2022-01-01' },
  // ── Asia-Pacífico ─────────────────────────────────────────────────────────
  { clave: 'JPN', descripcion: 'Japón',                        vigenteDesde: '2022-01-01' },
  { clave: 'CHN', descripcion: 'China',                        vigenteDesde: '2022-01-01' },
  { clave: 'KOR', descripcion: 'Corea del Sur',                vigenteDesde: '2022-01-01' },
  { clave: 'IND', descripcion: 'India',                        vigenteDesde: '2022-01-01' },
  { clave: 'AUS', descripcion: 'Australia',                    vigenteDesde: '2022-01-01' },
] as const;

/** Mapa clave → descripción para lookups O(1). */
export const PAIS_SAT_MAP = catalogToMap(PAIS_SAT);

/** Devuelve la entrada por clave, o undefined si no existe. */
export function getByClave(clave: string): SATCatalogEntry | undefined {
  return PAIS_SAT.find((e) => e.clave === clave);
}

/** Devuelve todas las entradas. */
export function getAll(): ReadonlyArray<SATCatalogEntry> {
  return PAIS_SAT;
}
