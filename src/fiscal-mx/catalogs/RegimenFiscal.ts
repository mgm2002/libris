/**
 * c_RegimenFiscal — Catálogo de regímenes fiscales del SAT (CFDI 4.0).
 *
 * Fuente: Anexo 20 del SAT, catálogo c_RegimenFiscal vigente 2024.
 * Aplica tanto al emisor (en FiscalConfig) como al receptor (en Party).
 *
 * Nota: algunos regímenes solo aplican a persona física (PF), otros solo
 * a persona moral (PM). El campo `tipo` indica la restricción.
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export interface RegimenFiscalEntry extends SATCatalogEntry {
  /** 'PF' = solo persona física, 'PM' = solo persona moral, 'ambos' = ambos. */
  tipo: 'PF' | 'PM' | 'ambos';
}

export const REGIMEN_FISCAL: RegimenFiscalEntry[] = [
  // Persona Moral
  { clave: '601', descripcion: 'General de Ley Personas Morales',                             tipo: 'PM' },
  { clave: '603', descripcion: 'Personas Morales con Fines no Lucrativos',                    tipo: 'PM' },
  { clave: '620', descripcion: 'Sociedades Cooperativas de Producción que optan por diferir', tipo: 'PM' },
  { clave: '622', descripcion: 'Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',    tipo: 'PM' },
  { clave: '623', descripcion: 'Opcional para Grupos de Sociedades',                          tipo: 'PM' },
  { clave: '624', descripcion: 'Coordinados',                                                  tipo: 'PM' },
  { clave: '628', descripcion: 'Hidrocarburos',                                               tipo: 'PM' },
  { clave: '630', descripcion: 'Enajenación de acciones en bolsa de valores',                 tipo: 'PM' },

  // Persona Física
  { clave: '605', descripcion: 'Sueldos y Salarios e Ingresos Asimilados a Salarios',        tipo: 'PF' },
  { clave: '606', descripcion: 'Arrendamiento',                                               tipo: 'PF' },
  { clave: '607', descripcion: 'Régimen de Enajenación o Adquisición de Bienes',             tipo: 'PF' },
  { clave: '608', descripcion: 'Demás ingresos',                                              tipo: 'PF' },
  { clave: '610', descripcion: 'Residentes en el Extranjero sin Establecimiento Permanente', tipo: 'PF' },
  { clave: '611', descripcion: 'Ingresos por Dividendos (socios y accionistas)',              tipo: 'PF' },
  { clave: '612', descripcion: 'Personas Físicas con Actividades Empresariales y Profesionales', tipo: 'PF' },
  { clave: '614', descripcion: 'Ingresos por intereses',                                      tipo: 'PF' },
  { clave: '615', descripcion: 'Régimen de los ingresos por obtención de premios',            tipo: 'PF' },
  { clave: '616', descripcion: 'Sin obligaciones fiscales',                                   tipo: 'PF' },
  { clave: '621', descripcion: 'Incorporación Fiscal',                                        tipo: 'PF' },
  { clave: '625', descripcion: 'Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas', tipo: 'PF' },
  { clave: '626', descripcion: 'Régimen Simplificado de Confianza (RESICO)',                  tipo: 'PF' },

  // Ambos
  { clave: '629', descripcion: 'De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales', tipo: 'ambos' },
];

/** Mapa clave → descripción para lookups rápidos. */
export const REGIMEN_FISCAL_MAP = catalogToMap(REGIMEN_FISCAL);
