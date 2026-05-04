/**
 * c_UsoCFDI — Catálogo de usos del CFDI (CFDI 4.0).
 *
 * Fuente: Anexo 20, catálogo c_UsoCFDI. Vigente 2024-2025.
 * El uso CFDI lo elige el receptor; el emisor lo plasma en el XML.
 *
 * Notas:
 *  - Los usos D01–D10 son deducciones personales; solo aplican a persona física.
 *  - "S01" (Sin efectos fiscales) es el default para público general
 *    (RFC XAXX010101000).
 *  - "CP01" (Pagos) se usa en el complemento de pago (PPD).
 *  - "CN01" (Nómina) solo aplica en el complemento de nómina.
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export interface UsoCFDIEntry extends SATCatalogEntry {
  /** Aplica a persona física. */
  aplicaFisica: boolean;
  /** Aplica a persona moral. */
  aplicaMoral: boolean;
}

export const USO_CFDI: ReadonlyArray<UsoCFDIEntry> = [
  // ── Adquisiciones e inversiones ──────────────────────────────────────────
  {
    clave: 'G01',
    descripcion: 'Adquisición de mercancías',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'G02',
    descripcion: 'Devoluciones, descuentos o bonificaciones',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'G03',
    descripcion: 'Gastos en general',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'I01',
    descripcion: 'Construcciones',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'I02',
    descripcion: 'Mobiliario y equipo de oficina por inversiones',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'I03',
    descripcion: 'Equipo de transporte',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'I04',
    descripcion: 'Equipo de cómputo y accesorios',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'I05',
    descripcion: 'Dados, troqueles, moldes, matrices y herramental',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'I06',
    descripcion: 'Comunicaciones telefónicas',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'I07',
    descripcion: 'Comunicaciones satelitales',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'I08',
    descripcion: 'Otra maquinaria y equipo',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  // ── Deducciones personales (solo persona física) ──────────────────────────
  {
    clave: 'D01',
    descripcion: 'Honorarios médicos, dentales y gastos hospitalarios',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'D02',
    descripcion: 'Gastos médicos por incapacidad o discapacidad',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'D03',
    descripcion: 'Gastos funerales',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'D04',
    descripcion: 'Donativos',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'D05',
    descripcion: 'Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'D06',
    descripcion: 'Aportaciones voluntarias al SAR',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'D07',
    descripcion: 'Primas por seguros de gastos médicos',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'D08',
    descripcion: 'Gastos de transportación escolar obligatoria',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'D09',
    descripcion: 'Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'D10',
    descripcion: 'Pagos por servicios educativos (colegiaturas)',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
  // ── Usos especiales ───────────────────────────────────────────────────────
  {
    clave: 'S01',
    descripcion: 'Sin efectos fiscales',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'CP01',
    descripcion: 'Pagos',
    aplicaFisica: true,
    aplicaMoral: true,
    vigenteDesde: '2022-01-01',
  },
  {
    clave: 'CN01',
    descripcion: 'Nómina',
    aplicaFisica: true,
    aplicaMoral: false,
    vigenteDesde: '2022-01-01',
  },
] as const;

/** Mapa clave → descripción para lookups O(1). */
export const USO_CFDI_MAP = catalogToMap(USO_CFDI);

/** Devuelve la entrada por clave, o undefined si no existe. */
export function getByClave(clave: string): UsoCFDIEntry | undefined {
  return USO_CFDI.find((e) => e.clave === clave);
}

/** Devuelve todas las entradas. */
export function getAll(): ReadonlyArray<UsoCFDIEntry> {
  return USO_CFDI;
}

/** Devuelve solo los usos aplicables a persona física. */
export function getParaPersonaFisica(): ReadonlyArray<UsoCFDIEntry> {
  return USO_CFDI.filter((e) => e.aplicaFisica);
}

/** Devuelve solo los usos aplicables a persona moral. */
export function getParaPersonaMoral(): ReadonlyArray<UsoCFDIEntry> {
  return USO_CFDI.filter((e) => e.aplicaMoral);
}
