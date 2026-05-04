/**
 * c_ClaveProdServ — Catálogo de claves de productos y servicios del SAT.
 *
 * Catálogo c_ClaveProdServ del SAT (~54,000 registros).
 * NO embeber en TS. Se carga desde SQLite en Prompt 8.
 * Esta tabla se distribuye con la app como prodserv.db.
 *
 * Estrategia de implementación (Prompt 8):
 *   1. El CSV del catálogo (~54k filas) se pre-procesa al build y se incluye
 *      como `prodserv.db` (SQLite) en los recursos de la app Electron.
 *   2. En runtime, las búsquedas van a esa BD vía `better-sqlite3` con índice
 *      en `descripcion` (FTS5) y `clave`.
 *   3. El componente de selección de ProdServ usa debounce + límite de 20
 *      resultados para no bloquear el hilo principal.
 *
 * Este archivo solo exporta los tipos y la interfaz de búsqueda.
 */

export interface ClaveProdServEntry {
  /** Clave del catálogo SAT (8 dígitos, ej. "84111506"). */
  clave: string;
  /** Descripción oficial en español. */
  descripcion: string;
  /** Segmento (2 dígitos): categoría de nivel superior. */
  segmento: string;
  /** Familia (2 dígitos): subcategoría. */
  familia: string;
  /** Clase (2 dígitos): agrupación específica. */
  clase: string;
  /** Fracción (2 dígitos): elemento específico dentro de la clase. */
  fraccion: string;
}

/**
 * Busca claves ProdServ en la BD SQLite distribuida con la app.
 * Stub — implementar en Prompt 8.
 *
 * @param query  Texto de búsqueda (clave exacta o descripción parcial, mín. 3 chars)
 * @param limit  Número máximo de resultados (default 20)
 */
export async function searchProdServ(
  _query: string,
  _limit = 20
): Promise<ClaveProdServEntry[]> {
  // TODO Prompt 8: abrir prodserv.db con better-sqlite3 y ejecutar FTS5 query
  return [];
}

/**
 * Obtiene una entrada por clave exacta.
 * Stub — implementar en Prompt 8.
 */
export async function getProdServByClave(
  _clave: string
): Promise<ClaveProdServEntry | undefined> {
  // TODO Prompt 8: SELECT * FROM prodserv WHERE clave = ?
  return undefined;
}
