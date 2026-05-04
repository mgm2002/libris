/**
 * c_FormaPago — Catálogo de formas de pago del SAT (CFDI 4.0).
 *
 * Fuente: Anexo 20 del SAT, catálogo c_FormaPago vigente 2024.
 * Se usa en el campo "FormaPago" del nodo Comprobante del CFDI.
 *
 * Cuando el método de pago es "PPD" (pago en parcialidades),
 * la forma de pago debe ser "99" (Por definir).
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export const FORMA_PAGO: SATCatalogEntry[] = [
  { clave: '01', descripcion: 'Efectivo' },
  { clave: '02', descripcion: 'Cheque nominativo' },
  { clave: '03', descripcion: 'Transferencia electrónica de fondos' },
  { clave: '04', descripcion: 'Tarjeta de crédito' },
  { clave: '05', descripcion: 'Monedero electrónico' },
  { clave: '06', descripcion: 'Dinero electrónico' },
  { clave: '08', descripcion: 'Vales de despensa' },
  { clave: '12', descripcion: 'Dación en pago' },
  { clave: '13', descripcion: 'Pago por subrogación' },
  { clave: '14', descripcion: 'Pago por consignación' },
  { clave: '15', descripcion: 'Condonación' },
  { clave: '17', descripcion: 'Compensación' },
  { clave: '23', descripcion: 'Novación' },
  { clave: '24', descripcion: 'Confusión' },
  { clave: '25', descripcion: 'Remisión de deuda' },
  { clave: '26', descripcion: 'Prescripción o caducidad' },
  { clave: '27', descripcion: 'A satisfacción del acreedor' },
  { clave: '28', descripcion: 'Tarjeta de débito' },
  { clave: '29', descripcion: 'Tarjeta de servicios' },
  { clave: '30', descripcion: 'Aplicación de anticipos' },
  { clave: '31', descripcion: 'Intermediario pagos' },
  { clave: '99', descripcion: 'Por definir' },
];

/** Mapa clave → descripción para lookups rápidos. */
export const FORMA_PAGO_MAP = catalogToMap(FORMA_PAGO);
