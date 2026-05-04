/**
 * PurchaseInvoiceMX — Extensión fiscal MX del schema PurchaseInvoice.
 *
 * Agrega los campos para registrar datos del CFDI recibido de proveedores:
 *
 *   - uuidProveedor  UUID del CFDI que emitió el proveedor (para complemento de pago)
 *   - formaPago      Forma de pago registrada en el CFDI del proveedor
 *   - metodoPago     PUE o PPD según el CFDI del proveedor
 *
 * Libris no emite CFDI de compra (eso lo hace el proveedor), pero sí
 * necesita registrar el UUID para efectos de deducibilidad y conciliación.
 *
 * Implementación completa en Prompt 5.
 */

import type { SchemaStub } from 'schemas/types';

export const PurchaseInvoiceMXExtension: SchemaStub = {
  name: 'PurchaseInvoice',
  // fields: [] — se definen en Prompt 5
};
