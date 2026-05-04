/**
 * c_RegimenFiscal — Catálogo de regímenes fiscales del SAT (CFDI 4.0).
 *
 * Fuente: Anexo 20, catálogo c_RegimenFiscal. Vigente 2024-2025.
 * Aplica en: Emisor y Receptor del CFDI.
 *
 * Notas:
 *  - 621 (Incorporación Fiscal) fue derogado para nuevas altas desde 2022;
 *    empresas ya inscritas siguen operando bajo él (vigenteHasta: null porque
 *    el SAT aún lo acepta en timbrado).
 *  - 609 (Consolidación) solo aplica a grupos empresariales controladores.
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export interface RegimenFiscalEntry extends SATCatalogEntry {
  /** Aplica a persona física. */
  aplicaFisica: boolean;
  /** Aplica a persona moral. */
  aplicaMoral: boolean;
}

export const REGIMEN_FISCAL: ReadonlyArray<RegimenFiscalEntry> = [
  {
    clave: '601',
    descripcion: 'General de Ley Personas Morales',
    aplicaFisica: false,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '603',
    descripcion: 'Personas Morales con Fines no Lucrativos',
    aplicaFisica: false,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '605',
    descripcion: 'Sueldos y Salarios e Ingresos Asimilados a Salarios',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '606',
    descripcion: 'Arrendamiento',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '607',
    descripcion: 'Régimen de Enajenación o Adquisición de Bienes',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '608',
    descripcion: 'Demás ingresos',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '609',
    descripcion: 'Consolidación',
    aplicaFisica: false,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '610',
    descripcion: 'Residentes en el Extranjero sin Establecimiento Permanente en México',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '611',
    descripcion: 'Ingresos por Dividendos (socios y accionistas)',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '612',
    descripcion: 'Personas Físicas con Actividades Empresariales y Profesionales',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '614',
    descripcion: 'Ingresos por intereses',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '615',
    descripcion: 'Régimen de los ingresos por obtención de premios',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '616',
    descripcion: 'Sin obligaciones fiscales',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '620',
    descripcion: 'Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
    aplicaFisica: false,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    // Derogado para nuevas altas desde 2022; existentes siguen tributando bajo este régimen.
    clave: '621',
    descripcion: 'Incorporación Fiscal',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2014-01-01',
    vigenteHasta: null, // SAT sigue aceptando en timbrado
  },
  {
    clave: '622',
    descripcion: 'Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
    aplicaFisica: false,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '623',
    descripcion: 'Opcional para Grupos de Sociedades',
    aplicaFisica: false,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '624',
    descripcion: 'Coordinados',
    aplicaFisica: false,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: '625',
    descripcion: 'Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2020-06-01',
  },
  {
    clave: '626',
    descripcion: 'Régimen Simplificado de Confianza (RESICO)',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
] as const;

/** Mapa clave → descripción para lookups O(1). */
export const REGIMEN_FISCAL_MAP = catalogToMap(REGIMEN_FISCAL);

/** Devuelve la entrada por clave, o undefined si no existe. */
export function getByClave(clave: string): RegimenFiscalEntry | undefined {
  return REGIMEN_FISCAL.find((e) => e.clave === clave);
}

/** Devuelve todas las entradas. */
export function getAll(): ReadonlyArray<RegimenFiscalEntry> {
  return REGIMEN_FISCAL;
}

/** Devuelve solo los regímenes aplicables a persona física. */
export function getParaPersonaFisica(): ReadonlyArray<RegimenFiscalEntry> {
  return REGIMEN_FISCAL.filter((e) => e.aplicaFisica);
}

/** Devuelve solo los regímenes aplicables a persona moral. */
export function getParaPersonaMoral(): ReadonlyArray<RegimenFiscalEntry> {
  return REGIMEN_FISCAL.filter((e) => e.aplicaMoral);
}
