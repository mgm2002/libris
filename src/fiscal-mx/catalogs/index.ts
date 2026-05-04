/**
 * Catálogos SAT — barrel export.
 *
 * Importa desde aquí para consumir cualquier catálogo.
 * Todos son constantes puras: sin efectos secundarios al importar.
 *
 * ProdServ NO se re-exporta aquí: sus funciones son async (van a BD) y
 * se importan directamente desde './ProdServ' donde se necesiten.
 */

export type { SATCatalogEntry, SATCatalogMap } from './types';
export { catalogToMap, esVigente } from './types';

export type { RegimenFiscalEntry } from './RegimenFiscal';
export {
  REGIMEN_FISCAL,
  REGIMEN_FISCAL_MAP,
  getByClave as getRegimenFiscalByClave,
  getAll as getAllRegimenFiscal,
  getParaPersonaFisica as getRegimenesFisica,
  getParaPersonaMoral as getRegimenesMoral,
} from './RegimenFiscal';

export type { UsoCFDIEntry } from './UsoCFDI';
export {
  USO_CFDI,
  USO_CFDI_MAP,
  getByClave as getUsoCFDIByClave,
  getAll as getAllUsoCFDI,
  getParaPersonaFisica as getUsoCFDIFisica,
  getParaPersonaMoral as getUsoCFDIMoral,
} from './UsoCFDI';

export {
  FORMA_PAGO,
  FORMA_PAGO_MAP,
  getByClave as getFormaPagoByClave,
  getAll as getAllFormaPago,
} from './FormaPago';

export {
  METODO_PAGO,
  METODO_PAGO_MAP,
  getByClave as getMetodoPagoByClave,
  getAll as getAllMetodoPago,
} from './MetodoPago';

export type { ClaveUnidadEntry } from './Unidad';
export {
  CLAVE_UNIDAD,
  CLAVE_UNIDAD_MAP,
  getByClave as getUnidadByClave,
  getAll as getAllUnidades,
} from './Unidad';

export type { MonedaEntry } from './Moneda';
export {
  MONEDA_SAT,
  MONEDA_SAT_MAP,
  getByClave as getMonedaByClave,
  getAll as getAllMonedas,
} from './Moneda';

export {
  PAIS_SAT,
  PAIS_SAT_MAP,
  getByClave as getPaisByClave,
  getAll as getAllPaises,
} from './Pais';

// ProdServ: importar directamente desde './ProdServ' — carga async desde BD
export type { ClaveProdServEntry } from './ProdServ';
