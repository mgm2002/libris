/**
 * c_FormaPago — Catálogo de formas de pago del SAT (CFDI 4.0).
 *
 * Fuente: Anexo 20, catálogo c_FormaPago. Vigente 2024-2025.
 *
 * Se usa en el atributo FormaPago del nodo Comprobante.
 * Regla: cuando MetodoPago = "PPD", FormaPago debe ser "99" (Por definir).
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export const FORMA_PAGO: ReadonlyArray<SATCatalogEntry> = [
  { clave: '01', descripcion: 'Efectivo',                          vigenteDesde: '2022-01-01' },
  { clave: '02', descripcion: 'Cheque nominativo',                 vigenteDesde: '2022-01-01' },
  { clave: '03', descripcion: 'Transferencia electrónica de fondos', vigenteDesde: '2022-01-01' },
  { clave: '04', descripcion: 'Tarjeta de crédito',                vigenteDesde: '2022-01-01' },
  { clave: '05', descripcion: 'Monedero electrónico',              vigenteDesde: '2022-01-01' },
  { clave: '06', descripcion: 'Dinero electrónico',                vigenteDesde: '2022-01-01' },
  { clave: '08', descripcion: 'Vales de despensa',                 vigenteDesde: '2022-01-01' },
  { clave: '12', descripcion: 'Dación en pago',                    vigenteDesde: '2022-01-01' },
  { clave: '13', descripcion: 'Pago por subrogación',              vigenteDesde: '2022-01-01' },
  { clave: '14', descripcion: 'Pago por consignación',             vigenteDesde: '2022-01-01' },
  { clave: '15', descripcion: 'Condonación',                       vigenteDesde: '2022-01-01' },
  { clave: '17', descripcion: 'Compensación',                      vigenteDesde: '2022-01-01' },
  { clave: '23', descripcion: 'Novación',                          vigenteDesde: '2022-01-01' },
  { clave: '24', descripcion: 'Confusión',                         vigenteDesde: '2022-01-01' },
  { clave: '25', descripcion: 'Remisión de deuda',                 vigenteDesde: '2022-01-01' },
  { clave: '26', descripcion: 'Prescripción o caducidad',          vigenteDesde: '2022-01-01' },
  { clave: '27', descripcion: 'A satisfacción del acreedor',       vigenteDesde: '2022-01-01' },
  { clave: '28', descripcion: 'Tarjeta de débito',                 vigenteDesde: '2022-01-01' },
  { clave: '29', descripcion: 'Tarjeta de servicios',              vigenteDesde: '2022-01-01' },
  { clave: '30', descripcion: 'Aplicación de anticipos',           vigenteDesde: '2022-01-01' },
  { clave: '31', descripcion: 'Intermediario pagos',               vigenteDesde: '2022-01-01' },
  { clave: '99', descripcion: 'Por definir',                       vigenteDesde: '2022-01-01' },
] as const;

/** Mapa clave → descripción para lookups O(1). */
export const FORMA_PAGO_MAP = catalogToMap(FORMA_PAGO);

/** Devuelve la entrada por clave, o undefined si no existe. */
export function getByClave(clave: string): SATCatalogEntry | undefined {
  return FORMA_PAGO.find((e) => e.clave === clave);
}

/** Devuelve todas las entradas. */
export function getAll(): ReadonlyArray<SATCatalogEntry> {
  return FORMA_PAGO;
}
