/**
 * FiscalConfig — Schema de configuración fiscal de la empresa.
 *
 * Almacena los datos necesarios para emitir CFDI:
 *   - RFC del emisor
 *   - Régimen Fiscal
 *   - Credenciales CSD (ruta al certificado y llave privada)
 *   - Configuración del PAC (FacturAPI u otro)
 *
 * Es un schema isSingle (un registro por empresa, como AccountingSettings).
 * Se registrará en la BD cuando el módulo fiscal-mx esté activo.
 *
 * ESTADO: Fase 2 — esqueleto. Implementar campos en Prompt 5.
 */

import type { SchemaStub } from 'schemas/types';

/** Schema stub vacío; los campos se definen en Prompt 5. */
export const FiscalConfigSchema: SchemaStub = {
  name: 'FiscalConfig',
  // fields, isSingle, label, etc. se completan en Prompt 5
};
