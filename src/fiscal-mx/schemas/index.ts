/**
 * Schemas fiscales MX.
 *
 * Exporta SchemaStub[] listos para ser registrados en schemas/regional/mx/
 * cuando se active el soporte MX. El core los consumirá a través del
 * mecanismo getRegionalCombinedSchemas() — fiscal-mx no los inyecta directamente.
 */

export { FiscalConfigSchema } from './FiscalConfig';
export {
  PartyMXExtension,
  ItemMXExtension,
  SalesInvoiceMXExtension,
  PurchaseInvoiceMXExtension,
  AccountMXExtension,
} from './extensions';
