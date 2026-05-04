/**
 * Catálogo de Cuentas SAT — Anexo 24 de la RMF.
 *
 * Fuente: Regla 2.8.1.3 y Anexo 24 de la Resolución Miscelánea Fiscal.
 * Versión vigente 2024. El SAT publica actualizaciones anuales.
 *
 * Estructura del código: N.NN[.NN]
 *   - Primer nivel: tipo de cuenta (1=Activo, 2=Pasivo, 3=Capital, etc.)
 *   - Segundo nivel: grupo de cuentas
 *   - Tercer nivel (opcional): subcuenta
 *
 * ESTADO: Fase 2 — esqueleto con cuentas principales.
 * El catálogo completo tiene ~170 entradas; aquí están las más relevantes
 * para una PyME mexicana. Completar en Prompt 6.
 */

export interface CodigoAgrupadorEntry {
  /** Código numérico del Anexo 24 (ej. "102.01"). */
  codigo: string;
  /** Descripción oficial del SAT. */
  descripcion: string;
  /** Naturaleza de la cuenta para el reporte: 'D' = deudora, 'A' = acreedora. */
  naturaleza: 'D' | 'A';
  /** Tipo de cuenta según el SAT. */
  tipo: 'Activo' | 'Pasivo' | 'Capital' | 'Ingreso' | 'Costo' | 'Gasto' | 'Resultado';
}

export const CATALOGO_CUENTAS_SAT: CodigoAgrupadorEntry[] = [
  // ── ACTIVO ──────────────────────────────────────────────────────────────────
  { codigo: '100',    descripcion: 'ACTIVO',                                                naturaleza: 'D', tipo: 'Activo' },
  { codigo: '101',    descripcion: 'ACTIVO CIRCULANTE',                                     naturaleza: 'D', tipo: 'Activo' },
  { codigo: '102',    descripcion: 'BANCOS Y CAJAS',                                        naturaleza: 'D', tipo: 'Activo' },
  { codigo: '102.01', descripcion: 'Bancos nacionales',                                     naturaleza: 'D', tipo: 'Activo' },
  { codigo: '102.02', descripcion: 'Bancos extranjeros',                                    naturaleza: 'D', tipo: 'Activo' },
  { codigo: '102.03', descripcion: 'Caja',                                                  naturaleza: 'D', tipo: 'Activo' },
  { codigo: '102.04', descripcion: 'Fondo fijo de caja chica',                              naturaleza: 'D', tipo: 'Activo' },
  { codigo: '105',    descripcion: 'CLIENTES',                                              naturaleza: 'D', tipo: 'Activo' },
  { codigo: '105.01', descripcion: 'Clientes nacionales',                                   naturaleza: 'D', tipo: 'Activo' },
  { codigo: '105.02', descripcion: 'Clientes extranjeros',                                  naturaleza: 'D', tipo: 'Activo' },
  { codigo: '106',    descripcion: 'DOCUMENTOS POR COBRAR',                                 naturaleza: 'D', tipo: 'Activo' },
  { codigo: '108',    descripcion: 'DEUDORES DIVERSOS',                                     naturaleza: 'D', tipo: 'Activo' },
  { codigo: '115',    descripcion: 'IVA ACREDITABLE',                                       naturaleza: 'D', tipo: 'Activo' },
  { codigo: '115.01', descripcion: 'IVA acreditable pagado',                                naturaleza: 'D', tipo: 'Activo' },
  { codigo: '115.02', descripcion: 'IVA acreditable pendiente de acreditar',                naturaleza: 'D', tipo: 'Activo' },
  { codigo: '116',    descripcion: 'IVA PENDIENTE DE ACREDITAR',                            naturaleza: 'D', tipo: 'Activo' },
  { codigo: '118',    descripcion: 'INVENTARIOS',                                           naturaleza: 'D', tipo: 'Activo' },
  { codigo: '118.01', descripcion: 'Mercancías',                                            naturaleza: 'D', tipo: 'Activo' },
  { codigo: '119',    descripcion: 'ANTICIPO A PROVEEDORES',                                naturaleza: 'D', tipo: 'Activo' },
  { codigo: '120',    descripcion: 'OTROS ACTIVOS CIRCULANTES',                             naturaleza: 'D', tipo: 'Activo' },
  { codigo: '150',    descripcion: 'ACTIVO NO CIRCULANTE',                                  naturaleza: 'D', tipo: 'Activo' },
  { codigo: '151',    descripcion: 'INMUEBLES, PLANTA Y EQUIPO',                            naturaleza: 'D', tipo: 'Activo' },
  { codigo: '151.01', descripcion: 'Terrenos',                                              naturaleza: 'D', tipo: 'Activo' },
  { codigo: '151.02', descripcion: 'Edificios',                                             naturaleza: 'D', tipo: 'Activo' },
  { codigo: '151.03', descripcion: 'Maquinaria y equipo',                                   naturaleza: 'D', tipo: 'Activo' },
  { codigo: '151.04', descripcion: 'Equipo de transporte',                                  naturaleza: 'D', tipo: 'Activo' },
  { codigo: '151.05', descripcion: 'Equipo de cómputo',                                    naturaleza: 'D', tipo: 'Activo' },
  { codigo: '152',    descripcion: 'DEPRECIACIÓN ACUMULADA',                                naturaleza: 'A', tipo: 'Activo' },

  // ── PASIVO ──────────────────────────────────────────────────────────────────
  { codigo: '200',    descripcion: 'PASIVO',                                                naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '201',    descripcion: 'PASIVO CIRCULANTE',                                     naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '202',    descripcion: 'PROVEEDORES',                                           naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '202.01', descripcion: 'Proveedores nacionales',                                naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '202.02', descripcion: 'Proveedores extranjeros',                               naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '203',    descripcion: 'DOCUMENTOS POR PAGAR',                                  naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '205',    descripcion: 'ACREEDORES DIVERSOS',                                   naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '206',    descripcion: 'ANTICIPO DE CLIENTES',                                  naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '208',    descripcion: 'IVA TRASLADADO',                                        naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '208.01', descripcion: 'IVA trasladado cobrado',                                naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '208.02', descripcion: 'IVA trasladado no cobrado',                             naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '209',    descripcion: 'ISR POR PAGAR',                                         naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '210',    descripcion: 'RETENCIONES DE ISR',                                    naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '210.01', descripcion: 'Retenciones de ISR por salarios',                       naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '210.02', descripcion: 'Retenciones de ISR por honorarios',                     naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '211',    descripcion: 'RETENCIONES DE IVA',                                    naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '216',    descripcion: 'PRÉSTAMOS BANCARIOS A CORTO PLAZO',                    naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '250',    descripcion: 'PASIVO NO CIRCULANTE',                                  naturaleza: 'A', tipo: 'Pasivo' },
  { codigo: '251',    descripcion: 'PRÉSTAMOS BANCARIOS A LARGO PLAZO',                    naturaleza: 'A', tipo: 'Pasivo' },

  // ── CAPITAL ─────────────────────────────────────────────────────────────────
  { codigo: '300',    descripcion: 'CAPITAL CONTABLE',                                      naturaleza: 'A', tipo: 'Capital' },
  { codigo: '301',    descripcion: 'CAPITAL SOCIAL',                                        naturaleza: 'A', tipo: 'Capital' },
  { codigo: '305',    descripcion: 'RESERVA LEGAL',                                         naturaleza: 'A', tipo: 'Capital' },
  { codigo: '306',    descripcion: 'UTILIDADES RETENIDAS',                                  naturaleza: 'A', tipo: 'Capital' },
  { codigo: '307',    descripcion: 'RESULTADO DEL EJERCICIO',                               naturaleza: 'A', tipo: 'Capital' },

  // ── INGRESOS ────────────────────────────────────────────────────────────────
  { codigo: '400',    descripcion: 'INGRESOS',                                              naturaleza: 'A', tipo: 'Ingreso' },
  { codigo: '401',    descripcion: 'VENTAS',                                                naturaleza: 'A', tipo: 'Ingreso' },
  { codigo: '401.01', descripcion: 'Ventas de productos',                                   naturaleza: 'A', tipo: 'Ingreso' },
  { codigo: '401.02', descripcion: 'Ventas de servicios',                                   naturaleza: 'A', tipo: 'Ingreso' },
  { codigo: '402',    descripcion: 'DEVOLUCIONES Y DESCUENTOS SOBRE VENTAS',               naturaleza: 'D', tipo: 'Ingreso' },
  { codigo: '410',    descripcion: 'OTROS INGRESOS',                                        naturaleza: 'A', tipo: 'Ingreso' },

  // ── COSTOS ──────────────────────────────────────────────────────────────────
  { codigo: '500',    descripcion: 'COSTO DE VENTAS',                                       naturaleza: 'D', tipo: 'Costo' },
  { codigo: '501',    descripcion: 'COSTO DE VENTAS DE MERCANCÍAS',                        naturaleza: 'D', tipo: 'Costo' },
  { codigo: '502',    descripcion: 'COSTO DE VENTAS DE SERVICIOS',                         naturaleza: 'D', tipo: 'Costo' },

  // ── GASTOS ──────────────────────────────────────────────────────────────────
  { codigo: '600',    descripcion: 'GASTOS GENERALES',                                      naturaleza: 'D', tipo: 'Gasto' },
  { codigo: '601',    descripcion: 'GASTOS DE ADMINISTRACIÓN',                              naturaleza: 'D', tipo: 'Gasto' },
  { codigo: '602',    descripcion: 'GASTOS DE VENTA',                                       naturaleza: 'D', tipo: 'Gasto' },
  { codigo: '603',    descripcion: 'GASTOS FINANCIEROS',                                    naturaleza: 'D', tipo: 'Gasto' },
  { codigo: '604',    descripcion: 'OTROS GASTOS',                                          naturaleza: 'D', tipo: 'Gasto' },

  // ── CUENTAS DE ORDEN (no afectan balance) ───────────────────────────────────
  { codigo: '800',    descripcion: 'CUENTAS DE ORDEN DEUDORAS',                             naturaleza: 'D', tipo: 'Resultado' },
  { codigo: '900',    descripcion: 'CUENTAS DE ORDEN ACREEDORAS',                           naturaleza: 'A', tipo: 'Resultado' },
];

/** Mapa código → descripción para lookups O(1). */
export const CATALOGO_CUENTAS_SAT_MAP: Record<string, string> = Object.fromEntries(
  CATALOGO_CUENTAS_SAT.map((e) => [e.codigo, e.descripcion])
);
