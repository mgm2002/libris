/**
 * AccountMX — Extensión fiscal MX del schema Account.
 *
 * Agrega el campo requerido para la contabilidad electrónica SAT (Anexo 24):
 *
 *   - codigoAgrupadorSat  Código numérico del Anexo 24 SAT que se mapea a esta cuenta
 *                         (ej. "102.01" = Bancos nacionales)
 *
 * Este código es obligatorio para el reporte "Catálogo de Cuentas" que se envía
 * al SAT mensualmente via el buzón tributario.
 *
 * Implementación completa en Prompt 5.
 *
 * @see src/fiscal-mx/codigo-agrupador/catalogo-cuentas-sat.ts
 * @see FASE2-INVENTORY.md §4.5
 */

import type { SchemaStub } from 'schemas/types';

export const AccountMXExtension: SchemaStub = {
  name: 'Account',
  // fields: [] — se definen en Prompt 5
};
