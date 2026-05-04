/**
 * c_UsoCFDI — Catálogo de usos del CFDI (CFDI 4.0).
 *
 * Fuente: Anexo 20 del SAT, catálogo c_UsoCFDI vigente 2024.
 * El uso CFDI lo elige el receptor; el emisor lo plasma en el XML.
 *
 * Nota: algunos usos solo aplican a persona física (PF) o moral (PM).
 * "S01" (Sin efectos fiscales) es el default para público general (XAXX010101000).
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export interface UsoCFDIEntry extends SATCatalogEntry {
  /** Persona física puede usar este código. */
  pf: boolean;
  /** Persona moral puede usar este código. */
  pm: boolean;
}

export const USO_CFDI: UsoCFDIEntry[] = [
  { clave: 'G01', descripcion: 'Adquisición de mercancias',                         pf: true,  pm: true  },
  { clave: 'G02', descripcion: 'Devoluciones, descuentos o bonificaciones',          pf: true,  pm: true  },
  { clave: 'G03', descripcion: 'Gastos en general',                                  pf: true,  pm: true  },
  { clave: 'I01', descripcion: 'Construcciones',                                     pf: true,  pm: true  },
  { clave: 'I02', descripcion: 'Mobilario y equipo de oficina por inversiones',      pf: true,  pm: true  },
  { clave: 'I03', descripcion: 'Equipo de transporte',                               pf: true,  pm: true  },
  { clave: 'I04', descripcion: 'Equipo de computo y accesorios',                     pf: true,  pm: true  },
  { clave: 'I05', descripcion: 'Dados, troqueles, moldes, matrices y herramental',   pf: true,  pm: true  },
  { clave: 'I06', descripcion: 'Comunicaciones telefónicas',                         pf: true,  pm: true  },
  { clave: 'I07', descripcion: 'Comunicaciones satelitales',                         pf: true,  pm: true  },
  { clave: 'I08', descripcion: 'Otra maquinaria y equipo',                           pf: true,  pm: true  },
  { clave: 'D01', descripcion: 'Honorarios médicos, dentales y gastos hospitalarios',pf: true,  pm: false },
  { clave: 'D02', descripcion: 'Gastos médicos por incapacidad o discapacidad',      pf: true,  pm: false },
  { clave: 'D03', descripcion: 'Gastos funerales',                                   pf: true,  pm: false },
  { clave: 'D04', descripcion: 'Donativos',                                          pf: true,  pm: false },
  { clave: 'D05', descripcion: 'Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)', pf: true, pm: false },
  { clave: 'D06', descripcion: 'Aportaciones voluntarias al SAR',                   pf: true,  pm: false },
  { clave: 'D07', descripcion: 'Primas por seguros de gastos médicos',               pf: true,  pm: false },
  { clave: 'D08', descripcion: 'Gastos de transportación escolar obligatoria',       pf: true,  pm: false },
  { clave: 'D09', descripcion: 'Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones', pf: true, pm: false },
  { clave: 'D10', descripcion: 'Pagos por servicios educativos (colegiaturas)',      pf: true,  pm: false },
  { clave: 'S01', descripcion: 'Sin efectos fiscales',                               pf: true,  pm: true  },
  { clave: 'CP01', descripcion: 'Pagos',                                             pf: true,  pm: true  },
  { clave: 'CN01', descripcion: 'Nómina',                                            pf: true,  pm: false },
];

/** Mapa clave → descripción para lookups rápidos. */
export const USO_CFDI_MAP = catalogToMap(USO_CFDI);
