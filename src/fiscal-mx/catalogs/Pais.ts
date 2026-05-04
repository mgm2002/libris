/**
 * c_Pais — Catálogo de países del SAT (CFDI 4.0).
 *
 * Fuente: Anexo 20 del SAT, catálogo c_Pais vigente 2024.
 * El catálogo completo tiene ~250 países (basado en ISO 3166-1 alpha-2).
 * Aquí se incluyen los 30 más frecuentes en comercio exterior mexicano.
 *
 * Se usa en:
 *   - DomicilioFiscalReceptor (cuando el receptor es extranjero)
 *   - ComplementoComercioExterior
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export const PAIS_SAT: SATCatalogEntry[] = [
  { clave: 'MEX', descripcion: 'México' },
  { clave: 'USA', descripcion: 'Estados Unidos de América' },
  { clave: 'CAN', descripcion: 'Canadá' },
  { clave: 'ESP', descripcion: 'España' },
  { clave: 'CHN', descripcion: 'China' },
  { clave: 'DEU', descripcion: 'Alemania' },
  { clave: 'JPN', descripcion: 'Japón' },
  { clave: 'GBR', descripcion: 'Reino Unido' },
  { clave: 'FRA', descripcion: 'Francia' },
  { clave: 'ITA', descripcion: 'Italia' },
  { clave: 'BRA', descripcion: 'Brasil' },
  { clave: 'ARG', descripcion: 'Argentina' },
  { clave: 'COL', descripcion: 'Colombia' },
  { clave: 'CHL', descripcion: 'Chile' },
  { clave: 'PER', descripcion: 'Perú' },
  { clave: 'GTM', descripcion: 'Guatemala' },
  { clave: 'HND', descripcion: 'Honduras' },
  { clave: 'CRI', descripcion: 'Costa Rica' },
  { clave: 'PAN', descripcion: 'Panamá' },
  { clave: 'CUB', descripcion: 'Cuba' },
  { clave: 'VEN', descripcion: 'Venezuela' },
  { clave: 'KOR', descripcion: 'República de Corea (Corea del Sur)' },
  { clave: 'IND', descripcion: 'India' },
  { clave: 'AUS', descripcion: 'Australia' },
  { clave: 'NLD', descripcion: 'Países Bajos' },
  { clave: 'BEL', descripcion: 'Bélgica' },
  { clave: 'CHE', descripcion: 'Suiza' },
  { clave: 'SWE', descripcion: 'Suecia' },
  { clave: 'RUS', descripcion: 'Rusia' },
  { clave: 'ZAF', descripcion: 'Sudáfrica' },
];

/** Mapa clave → descripción para lookups rápidos. */
export const PAIS_SAT_MAP = catalogToMap(PAIS_SAT);
