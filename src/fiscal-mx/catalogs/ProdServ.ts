/**
 * c_ClaveProdServ — Catálogo de claves de productos y servicios del SAT.
 *
 * ESTRATEGIA DE CARGA: Este catálogo tiene +70,000 entradas y NO se incluye
 * como constante TypeScript. Se carga bajo demanda desde SQLite.
 *
 * Plan de implementación (Prompt 8):
 *   1. El archivo CSV del catálogo se descarga del SAT y se importa una vez
 *      a una tabla `SATClaveProdServ` en la BD de Libris.
 *   2. Las búsquedas usan `fyo.db.getAllRaw('SATClaveProdServ', { filters, limit })`
 *      con búsqueda por descripción o clave.
 *   3. El campo `claveProdServ` en Item usa un widget de búsqueda especial
 *      (no un Select estático).
 *
 * Este archivo solo exporta los tipos y la función de búsqueda stub.
 */

import type { SATCatalogEntry } from './types';

export interface ClaveProdServEntry extends SATCatalogEntry {
  /** Segmento del catálogo (ej. "84" = Tecnología de la información). */
  segmento: string;
  /** Familia dentro del segmento. */
  familia: string;
  /** Clase dentro de la familia. */
  clase: string;
}

/**
 * Busca claves ProdServ por texto.
 * Stub — implementar en Prompt 8 contra la tabla SQLite.
 *
 * @param query Texto de búsqueda (clave o descripción parcial)
 * @param limit Número máximo de resultados (default 20)
 * @returns Array de entradas del catálogo
 */
export async function searchProdServ(
  _query: string,
  _limit = 20
): Promise<ClaveProdServEntry[]> {
  // TODO Prompt 8: implementar búsqueda en BD SQLite
  return [];
}

/**
 * Claves ProdServ más comunes para México, incluidas como fallback
 * hasta que se cargue el catálogo completo.
 */
export const PROD_SERV_COMUNES: ClaveProdServEntry[] = [
  { clave: '01010101', descripcion: 'No existe en el catálogo',                     segmento: '01', familia: '01', clase: '01' },
  { clave: '43232408', descripcion: 'Software como servicio (SaaS)',                segmento: '43', familia: '23', clase: '24' },
  { clave: '84111506', descripcion: 'Servicios de contabilidad',                    segmento: '84', familia: '11', clase: '15' },
  { clave: '84111507', descripcion: 'Servicios de auditoría',                       segmento: '84', familia: '11', clase: '15' },
  { clave: '84121500', descripcion: 'Servicios de consultoría de gestión empresarial', segmento: '84', familia: '12', clase: '15' },
  { clave: '81112100', descripcion: 'Servicios de tecnología de la información',    segmento: '81', familia: '11', clase: '21' },
  { clave: '78101803', descripcion: 'Servicios de transporte de carga terrestre',   segmento: '78', familia: '10', clase: '18' },
  { clave: '80141600', descripcion: 'Servicios de publicidad',                      segmento: '80', familia: '14', clase: '16' },
  { clave: '72101500', descripcion: 'Servicios de restaurante',                     segmento: '72', familia: '10', clase: '15' },
  { clave: '80101500', descripcion: 'Servicios de arrendamiento de bienes inmuebles', segmento: '80', familia: '10', clase: '15' },
];
