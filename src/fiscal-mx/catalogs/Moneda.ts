/**
 * c_Moneda — Catálogo de monedas del SAT (CFDI 4.0).
 *
 * Fuente: Anexo 20 del SAT, catálogo c_Moneda vigente 2024.
 * Contiene ~170 monedas; aquí se incluyen las 30 más usadas en transacciones MX.
 *
 * Nota: "XXX" es la clave para operaciones donde no aplica moneda.
 * La moneda base del sistema es MXN; cualquier otra requiere tipo de cambio.
 */

import type { SATCatalogEntry } from './types';
import { catalogToMap } from './types';

export interface MonedaEntry extends SATCatalogEntry {
  /** Número de decimales permitidos para esta moneda en el CFDI. */
  decimales: number;
}

export const MONEDA_SAT: MonedaEntry[] = [
  { clave: 'MXN', descripcion: 'Peso Mexicano',          decimales: 2 },
  { clave: 'USD', descripcion: 'Dólar americano',         decimales: 2 },
  { clave: 'EUR', descripcion: 'Euro',                    decimales: 2 },
  { clave: 'GBP', descripcion: 'Libra esterlina',         decimales: 2 },
  { clave: 'JPY', descripcion: 'Yen japonés',             decimales: 0 },
  { clave: 'CAD', descripcion: 'Dólar canadiense',        decimales: 2 },
  { clave: 'CHF', descripcion: 'Franco suizo',            decimales: 2 },
  { clave: 'AUD', descripcion: 'Dólar australiano',       decimales: 2 },
  { clave: 'CNY', descripcion: 'Yuan renminbi chino',     decimales: 2 },
  { clave: 'BRL', descripcion: 'Real brasileño',          decimales: 2 },
  { clave: 'ARS', descripcion: 'Peso argentino',          decimales: 2 },
  { clave: 'COP', descripcion: 'Peso colombiano',         decimales: 2 },
  { clave: 'CLP', descripcion: 'Peso chileno',            decimales: 0 },
  { clave: 'PEN', descripcion: 'Sol peruano',             decimales: 2 },
  { clave: 'VES', descripcion: 'Bolívar soberano',        decimales: 2 },
  { clave: 'GTQ', descripcion: 'Quetzal guatemalteco',    decimales: 2 },
  { clave: 'HNL', descripcion: 'Lempira hondureño',      decimales: 2 },
  { clave: 'KRW', descripcion: 'Won surcoreano',          decimales: 0 },
  { clave: 'INR', descripcion: 'Rupia india',             decimales: 2 },
  { clave: 'SEK', descripcion: 'Corona sueca',            decimales: 2 },
  { clave: 'NOK', descripcion: 'Corona noruega',          decimales: 2 },
  { clave: 'DKK', descripcion: 'Corona danesa',           decimales: 2 },
  { clave: 'NZD', descripcion: 'Dólar neozelandés',       decimales: 2 },
  { clave: 'SGD', descripcion: 'Dólar de Singapur',      decimales: 2 },
  { clave: 'HKD', descripcion: 'Dólar de Hong Kong',     decimales: 2 },
  { clave: 'MYR', descripcion: 'Ringgit malayo',          decimales: 2 },
  { clave: 'THB', descripcion: 'Baht tailandés',          decimales: 2 },
  { clave: 'RUB', descripcion: 'Rublo ruso',              decimales: 2 },
  { clave: 'ZAR', descripcion: 'Rand sudafricano',        decimales: 2 },
  { clave: 'XXX', descripcion: 'Sin moneda específica',   decimales: 2 },
];

/** Mapa clave → descripción para lookups rápidos. */
export const MONEDA_SAT_MAP = catalogToMap(MONEDA_SAT);
