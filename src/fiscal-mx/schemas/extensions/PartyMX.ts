/**
 * PartyMX — Extensión fiscal MX del schema Party.
 *
 * Agrega al schema base Party los campos requeridos por el SAT para
 * identificar a clientes y proveedores en CFDI:
 *
 *   - rfc            RFC del tercero (12 chars PM / 13 chars PF / XAXX010101000 público general)
 *   - regimenFiscal  Clave c_RegimenFiscal del catálogo SAT (receptor)
 *   - usoCfdiDefault Uso CFDI predeterminado para este tercero (c_UsoCFDI)
 *   - codigoPostal   CP fiscal del receptor (requerido en CFDI 4.0)
 *
 * Implementación completa en Prompt 5.
 *
 * @see FASE2-INVENTORY.md §4.1 — Decisión Pendiente #1
 */

import type { SchemaStub } from 'schemas/types';

/** SchemaStub vacío; campos y validaciones se completan en Prompt 5. */
export const PartyMXExtension: SchemaStub = {
  name: 'Party',
  // fields: [], quickEditFields: [] — se definen en Prompt 5
};
