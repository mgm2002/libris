/**
 * Tipos compartidos para los catálogos del SAT.
 *
 * Todos los catálogos siguen la estructura c_<NombreCatalogo> publicada por el SAT
 * en https://www.sat.gob.mx/consultas/21345/descarga-el-complemento-de-cfdi
 *
 * Se publican catálogos nuevos con cada versión del complemento. La versión base
 * aquí es CFDI 4.0 (publicada enero 2022, obligatoria julio 2023).
 */

/** Entrada genérica de cualquier catálogo SAT. */
export interface SATCatalogEntry {
  /** Clave del catálogo (ej. "601", "G03", "01"). */
  clave: string;
  /** Descripción en español. */
  descripcion: string;
  /** Si el registro está vigente (algunos se deprecan pero siguen aceptándose en timbrado). */
  vigente?: boolean;
}

/** Entrada de catálogo con fecha de vigencia (aplica a c_Moneda, c_Pais, etc.). */
export interface SATCatalogEntryFecha extends SATCatalogEntry {
  fechaInicioVigencia?: string; // ISO date
  fechaFinVigencia?: string;    // ISO date
}

/** Mapa de clave → descripción para búsquedas O(1). */
export type SATCatalogMap = Record<string, string>;

/** Función utilitaria: convierte un array de entradas a mapa clave→descripción. */
export function catalogToMap(entries: SATCatalogEntry[]): SATCatalogMap {
  return Object.fromEntries(entries.map((e) => [e.clave, e.descripcion]));
}
