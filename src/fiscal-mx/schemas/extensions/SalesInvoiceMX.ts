/**
 * SalesInvoiceMX — Extensión fiscal MX del schema SalesInvoice.
 *
 * Agrega los campos de cabecera CFDI 4.0 requeridos en facturas de venta:
 *
 *   - formaPago      Clave c_FormaPago (ej. "01" Efectivo, "03" Transferencia)
 *   - metodoPago     "PUE" (Pago en Una Exhibición) o "PPD" (Pago en Parcialidades)
 *   - usoCfdi        Clave c_UsoCFDI del receptor (ej. "G03" Gastos en general)
 *   - condicionesPago Texto libre de condiciones (opcional)
 *   - uuid           UUID del CFDI timbrado (solo lectura, lo llena el PAC)
 *   - xmlCfdi        XML timbrado completo (solo lectura, lo llena el PAC)
 *   - estadoCfdi     Estado: null | 'timbrado' | 'cancelado'
 *
 * Implementación completa en Prompt 5.
 *
 * @see FASE2-INVENTORY.md §4.3 — Decisión Pendiente #3
 */

import type { SchemaStub } from 'schemas/types';

export const SalesInvoiceMXExtension: SchemaStub = {
  name: 'SalesInvoice',
  // fields: [], quickEditFields: [] — se definen en Prompt 5
};
