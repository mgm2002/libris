/**
 * Código Agrupador SAT — Catálogo para contabilidad electrónica.
 *
 * El Anexo 24 de la RMF define el "Código Agrupador" que mapea las cuentas
 * contables de la empresa a cuentas estándar del SAT. Es obligatorio para:
 *   - Catálogo de Cuentas (XML mensual al SAT)
 *   - Balanza de Comprobación (XML mensual al SAT)
 *   - Pólizas contables (XML bajo solicitud)
 *
 * @see src/fiscal-mx/schemas/extensions/AccountMX.ts — campo codigoAgrupadorSat
 */

export {
  CATALOGO_CUENTAS_SAT,
  CATALOGO_CUENTAS_SAT_MAP,
  type CodigoAgrupadorEntry,
} from './catalogo-cuentas-sat';
