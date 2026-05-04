/**
 * Tipos compartidos para los catálogos del SAT (CFDI 4.0).
 *
 * Fuente: Anexo 20 del SAT — catálogos vigentes 2024-2025.
 * https://www.sat.gob.mx/consultas/21345/descarga-el-complemento-de-cfdi
 */

/** Entrada base de cualquier catálogo SAT. */
export interface SATCatalogEntry {
  /** Clave del catálogo (ej. "601", "G03", "01"). */
  clave: string;
  /** Descripción oficial en español. */
  descripcion: string;
  /** Fecha de inicio de vigencia (ISO date, ej. "2022-01-01"). */
  vigenteDesde?: string;
  /** Fecha de fin de vigencia (ISO date) o null si sigue vigente. */
  vigenteHasta?: string | null;
}

/** Mapa clave → descripción para búsquedas O(1). */
export type SATCatalogMap = Record<string, string>;

/** Convierte un array de entradas a mapa clave→descripción. */
export function catalogToMap(entries: readonly SATCatalogEntry[]): SATCatalogMap {
  return Object.fromEntries(entries.map((e) => [e.clave, e.descripcion]));
}

/** Devuelve true si la entrada está vigente a la fecha dada (default: hoy). */
export function esVigente(entry: SATCatalogEntry, fecha = new Date()): boolean {
  if (entry.vigenteHasta != null) {
    return new Date(entry.vigenteHasta) >= fecha;
  }
  return true;
}
