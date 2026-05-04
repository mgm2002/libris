/**
 * c_ClaveUnidad — Catálogo de claves de unidad del SAT (CFDI 4.0).
 *
 * Fuente: Anexo 20 del SAT, catálogo c_ClaveUnidad vigente 2024.
 * Contiene más de 200 entradas; aquí se incluyen las ~30 más usadas en México.
 * El catálogo completo debe cargarse desde SQLite en Prompt 8.
 *
 * Las más comunes en facturación de servicios y mercancías:
 *   - E48: Unidad de servicio
 *   - H87: Pieza
 *   - KGM: Kilogramo
 *   - LTR: Litro
 *   - MTR: Metro
 *   - XBX: Caja
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export interface ClaveUnidadEntry extends SATCatalogEntry {
  /** Símbolo de la unidad (ej. "kg", "l", "m"). */
  simbolo?: string;
}

export const CLAVE_UNIDAD: ClaveUnidadEntry[] = [
  { clave: 'ACT', descripcion: 'Actividad',                  simbolo: 'act'  },
  { clave: 'E48', descripcion: 'Unidad de servicio',         simbolo: ''     },
  { clave: 'H87', descripcion: 'Pieza',                      simbolo: 'pza'  },
  { clave: 'EA',  descripcion: 'Elemento',                   simbolo: ''     },
  { clave: 'KGM', descripcion: 'Kilogramo',                  simbolo: 'kg'   },
  { clave: 'GRM', descripcion: 'Gramo',                      simbolo: 'g'    },
  { clave: 'TNE', descripcion: 'Tonelada métrica',           simbolo: 't'    },
  { clave: 'LTR', descripcion: 'Litro',                      simbolo: 'l'    },
  { clave: 'MLT', descripcion: 'Mililitro',                  simbolo: 'ml'   },
  { clave: 'MTR', descripcion: 'Metro',                      simbolo: 'm'    },
  { clave: 'CMT', descripcion: 'Centímetro',                 simbolo: 'cm'   },
  { clave: 'MTK', descripcion: 'Metro cuadrado',             simbolo: 'm²'   },
  { clave: 'MTQ', descripcion: 'Metro cúbico',               simbolo: 'm³'   },
  { clave: 'XBX', descripcion: 'Caja',                       simbolo: 'caja' },
  { clave: 'XPK', descripcion: 'Paquete',                    simbolo: 'paq'  },
  { clave: 'XKI', descripcion: 'Kit',                        simbolo: 'kit'  },
  { clave: 'SET', descripcion: 'Conjunto',                   simbolo: 'set'  },
  { clave: 'PR',  descripcion: 'Par',                        simbolo: 'par'  },
  { clave: 'DZN', descripcion: 'Docena',                     simbolo: 'doc'  },
  { clave: 'HUR', descripcion: 'Hora',                       simbolo: 'h'    },
  { clave: 'DAY', descripcion: 'Día',                        simbolo: 'día'  },
  { clave: 'MON', descripcion: 'Mes',                        simbolo: 'mes'  },
  { clave: 'ANN', descripcion: 'Año',                        simbolo: 'año'  },
  { clave: 'MIN', descripcion: 'Minuto',                     simbolo: 'min'  },
  { clave: 'MTS', descripcion: 'Metros',                     simbolo: 'm'    },
  { clave: 'XUN', descripcion: 'Unidad',                     simbolo: ''     },
  { clave: 'A9',  descripcion: 'Tarifa',                     simbolo: ''     },
  { clave: 'AB',  descripcion: 'Paquete a granel',           simbolo: ''     },
  { clave: 'BB',  descripcion: 'Caja base',                  simbolo: ''     },
  { clave: 'KT',  descripcion: 'Kit (equipos)',              simbolo: 'kit'  },
];

/** Mapa clave → descripción para lookups rápidos. */
export const CLAVE_UNIDAD_MAP = catalogToMap(CLAVE_UNIDAD);
