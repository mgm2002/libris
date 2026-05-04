# cfdi/ — Motor CFDI 4.0

> **FASE 3 — NO TOCAR hasta recibir instrucciones explícitas.**

Esta carpeta albergará el motor de generación y timbrado de CFDI 4.0,
que es la implementación central de la facturación electrónica mexicana.

## Alcance de Fase 3

- Construcción del XML CFDI 4.0 según el Anexo 20 del SAT
- Integración con FacturAPI (o PAC alternativo) para timbrado
- Cancelación de CFDI y complemento de pago (PPD)
- Descarga de acuse de recibo (PDF + XML timbrado)
- Complemento de Carta Porte (si se requiere transporte)

## Por qué está aislado aquí

El motor CFDI requiere dependencias externas (cliente HTTP para el PAC,
parser/builder de XML, posiblemente librerías de criptografía para CSD).
Mantenerlo aislado en `cfdi/` permite:

1. Agregar esas dependencias en Fase 3 sin contaminar el bundle de Fase 2.
2. Sustituir el PAC (FacturAPI → otro) sin cambiar nada fuera de esta carpeta.
3. Testear el resto del módulo `fiscal-mx` sin necesitar credenciales del PAC.

## Prerequisitos antes de implementar

- [ ] Decisiones pendientes §4 y §10 del FASE2-INVENTORY.md resueltas
- [ ] Credenciales CSD del emisor almacenadas en FiscalConfig (Prompt 5)
- [ ] Campos CFDI en SalesInvoice/Party/Item implementados (Prompt 5)
- [ ] Catálogo ProdServ cargado en BD (Prompt 8)
