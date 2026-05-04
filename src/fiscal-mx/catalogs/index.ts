/**
 * Catálogos SAT — barrel export.
 *
 * Importa catálogos individuales desde aquí para evitar referencias circulares.
 * Los catálogos son constantes puras: sin efectos secundarios al importar.
 */

export type { SATCatalogEntry, SATCatalogEntryFecha, SATCatalogMap } from './types';
export { catalogToMap } from './types';

export { REGIMEN_FISCAL, REGIMEN_FISCAL_MAP } from './RegimenFiscal';
export { USO_CFDI, USO_CFDI_MAP } from './UsoCFDI';
export { FORMA_PAGO, FORMA_PAGO_MAP } from './FormaPago';
export { METODO_PAGO, METODO_PAGO_MAP } from './MetodoPago';
export { CLAVE_UNIDAD, CLAVE_UNIDAD_MAP } from './Unidad';
export { MONEDA_SAT, MONEDA_SAT_MAP } from './Moneda';
export { PAIS_SAT, PAIS_SAT_MAP } from './Pais';
// ProdServ no se re-exporta aquí: es un catálogo de +70k entradas que se carga
// bajo demanda desde SQLite. Ver ProdServ.ts para la estrategia de carga.
