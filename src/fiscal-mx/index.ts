/**
 * fiscal-mx — Barrel export del módulo fiscal mexicano.
 *
 * Importa desde aquí cuando necesitas algo de fiscal-mx.
 * El core de Libris NO debe importar de este archivo.
 */

export * from './catalogs';
export * from './utils';
// schemas y codigo-agrupador se consumen directamente por sus consumidores;
// no se re-exportan aquí para evitar importar JSON pesado en el renderer.
