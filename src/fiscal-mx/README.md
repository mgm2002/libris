# fiscal-mx — Módulo fiscal mexicano para Libris

Todo lo relacionado con obligaciones fiscales mexicanas (SAT, CFDI, RFC, catálogos)
vive **exclusivamente** aquí. El resto del core de Libris no sabe de este módulo.

## Política de acoplamiento

```
PERMITIDO:   fiscal-mx → core (importar tipos, schemas, modelos del core)
PROHIBIDO:   core → fiscal-mx (el core NO debe importar nada de esta carpeta)
```

Esta regla garantiza que Libris pueda correr sin funcionalidad fiscal activa
y que el módulo sea reemplazable o desactivable sin tocar el core.

## Fases de implementación

| Fase | Contenido | Estado |
|------|-----------|--------|
| 2 | Esqueleto, catálogos SAT, validadores RFC/CURP/CP | Estructura creada |
| 3 | Motor CFDI 4.0, timbrado vía FacturAPI | **`cfdi/` — NO TOCAR hasta Fase 3** |
| 4 | Reportes fiscales (DIOT, declaraciones) | Pendiente |

## Estructura

```
fiscal-mx/
├── schemas/        Definiciones de campos fiscales MX (no tocar schemas/ del core)
│   └── extensions/ SchemaStubs que se inyectan vía schemas/regional/mx/
├── catalogs/       Catálogos del SAT en TypeScript (c_RegimenFiscal, c_UsoCFDI, etc.)
├── codigo-agrupador/ Catálogo del Anexo 24 SAT para Chart of Accounts
├── cfdi/           Motor de generación de CFDI 4.0 — Fase 3
└── utils/          Validadores y constantes fiscales MX
```

## Principios de diseño

- **Sin efectos secundarios en import**: ningún archivo de este módulo ejecuta
  código al ser importado; solo exporta tipos y constantes.
- **Sin dependencias externas nuevas** hasta Fase 3 (el timbrado requiere un PAC).
- Los catálogos son arrays/mapas de TypeScript puro — sin llamadas a red.
