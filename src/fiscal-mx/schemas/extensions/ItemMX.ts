/**
 * ItemMX — Extensión fiscal MX del schema Item.
 *
 * Agrega al schema base Item los campos requeridos por el SAT para
 * describir productos y servicios en CFDI:
 *
 *   - claveProdServ  Clave del catálogo c_ClaveProdServ del SAT (ej. "84111506")
 *   - claveUnidad    Clave del catálogo c_ClaveUnidad del SAT (ej. "E48" = Unidad de servicio)
 *   - noIdentificacion  Número de identificación / SKU (opcional en CFDI)
 *
 * Decisión de diseño: se agrega `claveProdServ` como campo nuevo en lugar de
 * reutilizar `hsnCode` (que es semántica india HSN/SAC). Ver FASE2-INVENTORY.md §4.2.
 *
 * Implementación completa en Prompt 5.
 */

import type { SchemaStub } from 'schemas/types';

export const ItemMXExtension: SchemaStub = {
  name: 'Item',
  // fields: [], quickEditFields: [] — se definen en Prompt 5
};
