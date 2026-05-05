# FASE 2 — MAPA DE LIMPIEZA ESTRUCTURAL

**Fecha de análisis:** 2026-05-05  
**Rama base analizada:** `claude/setup-libris-app-lpJiz` (Frappe Books v0.36.0 fork)  
**Rama de trabajo Fase 2:** `claude/phase2-structural-cleanup-EAXqe`  
**Estado:** SOLO LECTURA — sin modificaciones de código

---

## LISTA A — ELIMINAR

> Código exclusivo de Frappe/ERPNext que Libris no usará. Eliminación física segura una
> vez confirmada. Algunos archivos requieren *cirugía* en otros archivos que los referencian
> (marcados con ⚠️ en sus respectivas secciones).

---

### A1 — Sincronización ERPNext (clúster completo)

Este bloque es un subsistema auto-contenido: 4 modelos, 4 esquemas, 1 utilidad de ~1000 líneas,
1 job de worker thread, y 1 cliente HTTP que solo él usa. El motor de sincronización agrega
colas de envío/recepción y llama a la API `books_integration` de ERPNext.

#### A1.a — Modelos TypeScript

| Archivo | Depende de | Lo importan | Migración DB |
|---------|-----------|-------------|--------------|
| `models/baseModels/ERPNextSyncSettings/ERPNextSyncSettings.ts` | `src/utils/erpnextSync.ts` | `models/index.ts`, `fyo/model/types.ts`, `src/pages/Settings/Settings.vue`, `src/App.vue` | Sí — tabla `ERPNextSyncSettings` (isSingle) |
| `models/baseModels/ERPNextSyncQueue/ERPNextSyncQueue.ts` | Ninguna dep. externa | `models/index.ts`, `src/utils/erpnextSync.ts` | Sí — tabla `ERPNextSyncQueue` (naming=random) |
| `models/baseModels/FetchFromERPNextQueue/FetchFromERPNextQueue.ts` | Ninguna dep. externa | `models/index.ts`, `src/utils/erpnextSync.ts` | Sí — tabla `FetchFromERPNextQueue` (naming=random) |
| `models/baseModels/IntegrationErrorLog/IntegrationErrorLog.ts` | `fyo/model/doc.ts` (base) | `models/index.ts`, `src/utils/erpnextSync.ts` | Sí — tabla `IntegrationErrorLog` (naming=autoincrement) |

**Riesgo de eliminación:** BAJO — subsistema completamente aislado; solo es instanciado cuando `enableERPNextSync=true`.

#### A1.b — Esquemas JSON

| Archivo | Tabla DB que crea | Riesgo |
|---------|-------------------|--------|
| `schemas/app/ERPNextSyncSettings.json` | `ERPNextSyncSettings` | BAJO |
| `schemas/app/ERPNextSyncQueue.json` | `ERPNextSyncQueue` | BAJO |
| `schemas/app/FetchFromERPNextQueue.json` | `FetchFromERPNextQueue` | BAJO |
| `schemas/app/IntegrationErrorLog.json` | `IntegrationErrorLog` | BAJO |

#### A1.c — Utilidades y jobs

| Archivo | Qué hace | Lo importan | Riesgo |
|---------|----------|-------------|--------|
| `src/utils/erpnextSync.ts` | Lógica completa de sincronización (~1000 líneas) | `src/App.vue`, `ERPNextSyncSettings.ts`, `src/renderer/registerIpcRendererListeners.ts` | BAJO — una vez que se retiran las importaciones |
| `jobs/triggerErpNextSync.ts` | Worker thread que manda mensaje `trigger-erpnext-sync` | `main/initSheduler.ts` (Bree job) | BAJO |
| `main/api.ts` | Cliente HTTP (`node-fetch`) usado solo por `erpnextSync` vía IPC | `main/registerIpcMainActionListeners.ts` (1 uso) | BAJO — verificar que no lo use nada más |

#### A1.d — Campos ERPNext en esquemas de modelos base (⚠️ edición quirúrgica)

Estos campos están **incrustados** en esquemas de modelos que sí se conservan.
No se pueden borrar como archivo completo; hay que editar cada JSON/TS.

| Archivo | Campo a remover | Tabla afectada | Riesgo |
|---------|----------------|----------------|--------|
| `schemas/app/Invoice.json` L197 | `isSyncedWithErp` (Check) | `SalesInvoice`, `PurchaseInvoice` (herencia) | BAJO — campo solo usado por sync |
| `schemas/app/Item.json` L177 | `datafromErp` (Check) | `Item` | MEDIO — filtros en `InvoiceItem.ts` y `POS.vue` también lo referencian |
| `schemas/app/AccountingSettings.json` | `enableERPNextSync` (Check) | `SingleValue` (AccountingSettings) | BAJO — flag de feature |

> **Nota DB:** SQLite no soporta `DROP COLUMN` fácilmente. En BDs existentes, los campos
> `isSyncedWithErp` y `datafromErp` permanecerán en la tabla pero serán ignorados.
> En BDs nuevas no se crearán. Riesgo práctico: ninguno.

#### A1.e — Código en archivos core que debe editarse (⚠️ cirugía)

| Archivo | Qué remover | Riesgo de edición |
|---------|------------|-------------------|
| `fyo/model/doc.ts` L255-268 | Getter `shouldDocSyncToERPNext` | MEDIO — archivo core del framework |
| `fyo/model/doc.ts` L928-941 | Método `_hasERPSyncableItems()` que filtra `datafromErp` | MEDIO |
| `fyo/model/doc.ts` L957-989 | Bloque `_addDocToSyncQueue` en método `sync()` | MEDIO |
| `fyo/model/doc.ts` L72 | Propiedad `_addDocToSyncQueue = true` | BAJO |
| `fyo/model/types.ts` L16 | Import `ERPNextSyncSettings` | BAJO |
| `models/index.ts` L56-59, L121-125 | 4 imports + 4 registros en el map `models{}` | BAJO |
| `models/types.ts` L38, L80-82 | `IntegrationErrorLog`, `ERPNextSyncSettings`, `ERPNextSyncQueue`, `FetchFromERPNextQueue` del enum `ModelNameEnum` | BAJO — pero impacto en todo el codebase si algo los referencia |
| `schemas/schemas.ts` L79-83, L193-196 | 4 imports + 4 entradas en `appSchemas[]` | BAJO |
| `src/App.vue` L79-83 | Imports `registerInstanceToERPNext`, `updateERPNSyncSettings`, `ERPNextSyncSettings` | BAJO |
| `src/App.vue` L246-265 | Bloque `if (enableERPNextSync && baseURL && token)` + `registerInstanceToERPNext` + `updateERPNSyncSettings` + `ipc.initScheduler(...)` | BAJO |
| `src/pages/Settings/Settings.vue` L132 | `ModelNameEnum.ERPNextSyncSettings` en `canSave` | BAJO |
| `src/pages/Settings/Settings.vue` L151-152 | `ERPNextSyncSettings: this.t\`ERPNext Sync\`` en `tabLabels` | BAJO |
| `src/pages/Settings/Settings.vue` L160-183 | `enableERPNextSync` check y `ModelNameEnum.ERPNextSyncSettings` en `schemas()` | BAJO |
| `src/renderer/registerIpcRendererListeners.ts` L3 | Import `syncDocumentsToERPNext` | BAJO |
| `src/renderer/registerIpcRendererListeners.ts` L29-31 | Listener `ipc.registerTriggerFrontendActionListener` → llama `syncDocumentsToERPNext` | BAJO |
| `main/initSheduler.ts` L18-27 | Job `triggerErpNextSync` en array de Bree | BAJO — dejar job `checkLoyaltyProgramExpiry` si LoyaltyProgram sobrevive |
| `main/initSheduler.ts` L42-44 | Listener `worker created` → `webContents.send('trigger-erpnext-sync')` | BAJO |
| `models/baseModels/AccountingSettings/AccountingSettings.ts` L27, L65-67 | Campo `enableERPNextSync` y su entrada en `readOnly` | BAJO |
| `models/baseModels/InvoiceItem/InvoiceItem.ts` L673-676 | Filtro `datafromErp` | BAJO |
| `src/pages/POS/POS.vue` L722, L725 | Filtros `datafromErp` | BAJO |

---

### A2 — Idiomas no aplicables (18 de 19 locales)

Libris soporta únicamente `es-MX` (pendiente crear) y `en` (idioma base del código, sin archivo CSV).
Los 18 archivos siguientes pueden eliminarse. Ver `translations/es.csv` en LISTA D.

| Archivo | Idioma | Riesgo |
|---------|--------|--------|
| `translations/ar.csv` | Árabe | BAJO |
| `translations/ca-ES.csv` | Catalán | BAJO |
| `translations/da.csv` | Danés | BAJO |
| `translations/de.csv` | Alemán | BAJO |
| `translations/fa.csv` | Persa/Farsi | BAJO |
| `translations/fr.csv` | Francés | BAJO |
| `translations/gu.csv` | Gujarati | BAJO |
| `translations/hi.csv` | Hindi | BAJO |
| `translations/id.csv` | Indonesio | BAJO |
| `translations/ko.csv` | Coreano | BAJO |
| `translations/nl.csv` | Holandés | BAJO |
| `translations/np.csv` | Nepalí | BAJO |
| `translations/pt.csv` | Portugués | BAJO |
| `translations/sq.csv` | Albanés | BAJO |
| `translations/sv.csv` | Sueco | BAJO |
| `translations/tr.csv` | Turco | BAJO |
| `translations/zh-CN.csv` | Chino Simplificado | BAJO |
| `translations/zh-Hant.csv` | Chino Tradicional | BAJO |

> **Dependencias:** `main/getLanguageMap.ts` usa `node-fetch` para descargar archivos de traducción
> desde el repo de Frappe. El mecanismo de carga de idiomas no depende de la presencia de archivos
> específicos; simplemente carga el que coincida con el código de idioma del sistema.

---

### A3 — Código regional India y Suiza

India tiene el subsistema más extenso: modelos alternativos de `Address` y `Party` con campos GSTIN,
impuestos GST/IGST precargados al setup, sidebar GST, y reportes GSTR. Suiza solo tiene
un campo `taxId` en AccountingSettings. Ninguno aplica a México.

#### A3.a — Modelos regionales India

| Archivo | Qué hace | Lo importa | Riesgo | Migración DB |
|---------|----------|-----------|--------|--------------|
| `models/regionalModels/in/Address.ts` | Agrega campos de dirección india (estado, código PIN) | `models/index.ts` (carga dinámica) | BAJO | No — override de schema |
| `models/regionalModels/in/Party.ts` | Agrega campo `gstin` a Party | `models/index.ts` (carga dinámica) | BAJO | No — override de schema |
| `models/regionalModels/in/types.ts` | Tipos TS para India | Arriba | BAJO | No |

#### A3.b — Esquemas regionales

| Archivo | Qué hace | Riesgo |
|---------|----------|--------|
| `schemas/regional/in/AccountingSettings.json` | Agrega campo `gstin` a AccountingSettings | BAJO |
| `schemas/regional/in/Address.json` | Agrega campos de dirección india | BAJO |
| `schemas/regional/in/Party.json` | Agrega campo GSTIN a Party | BAJO |
| `schemas/regional/in/index.ts` | Exporta los 3 schemas de India | BAJO |
| `schemas/regional/ch/AccountingSettings.json` | Agrega campo `taxId` (Suiza) | BAJO |
| `schemas/regional/ch/index.ts` | Exporta schema de Suiza | BAJO |

#### A3.c — Lógica regional (⚠️ edición quirúrgica en archivos que se conservan)

| Archivo | Qué hacer | Riesgo |
|---------|-----------|--------|
| `regional/in.ts` | **Eliminar** — mapa de estados de India (solo usado para GST) | BAJO |
| `src/regional/in/in.ts` | **Eliminar** — crea impuestos GST/IGST al setup de empresa India | BAJO |
| `src/regional/index.ts` | **Modificar** — quitar la rama `if (country === 'India')` | BAJO |
| `schemas/regional/index.ts` | **Modificar** — quitar `in: IndianSchemas, ch: SwissSchemas`, dejar objeto vacío `{}` | BAJO |
| `models/index.ts` L128-138 | **Modificar** `getRegionalModels()` — que devuelva `{}` para todo; eliminar imports dinámicos de `./regionalModels/in/` | BAJO |

#### A3.d — Sidebar GST (ya condicionado, pero reforzar)

| Archivo | Qué hace | Estado actual | Acción |
|---------|----------|---------------|--------|
| `src/utils/sidebarConfig.ts` L29-55 | Función `getRegionalSidebar()` muestra sección GST | Oculto si `!gstin` | Puede simplificarse o dejarse — no causa problemas en México porque `gstin` nunca se setea |

---

### A4 — Reportes GST (India)

| Archivo | Qué hace | Lo importan | Riesgo |
|---------|----------|-------------|--------|
| `reports/GoodsAndServiceTax/BaseGSTR.ts` | Clase base GSTR | GSTR1, GSTR2 | BAJO |
| `reports/GoodsAndServiceTax/GSTR1.ts` | Reporte GSTR-1 | `reports/index.ts` | BAJO |
| `reports/GoodsAndServiceTax/GSTR2.ts` | Reporte GSTR-2 | `reports/index.ts` | BAJO |
| `reports/GoodsAndServiceTax/gstExporter.ts` | Exportador GST | GSTR1, GSTR2 | BAJO |
| `reports/GoodsAndServiceTax/types.ts` | Tipos GST | Archivos GST | BAJO |
| `src/components/Icons/18/gst.vue` | Ícono GST del sidebar | `src/components/Icons/18/index.ts` | BAJO |

**⚠️ Edición quirúrgica:** `reports/index.ts` — remover imports y entradas `GSTR1`, `GSTR2` del objeto `reports`.

---

### A5 — Patch India-específico (⚠️ decidir junto con hsnCode)

| Archivo | Qué hace | Riesgo |
|---------|----------|--------|
| `backend/patches/fixItemHSNField.ts` | Altera tabla `Item` para cambiar tipo de `hsnCode` a TEXT | BAJO — `alterTable` es idempotente |

> Si se decide remover `hsnCode` del schema de `Item` (ver LISTA D punto 9), este patch
> puede eliminarse también. Si se deja `hsnCode`, el patch es inofensivo.

---

## LISTA B — OCULTAR

> Módulos que se **conservan íntegros en código** (son necesarios para el motor contable o
> pueden reactivarse en fases posteriores), pero se **eliminan del navegador de UI** para
> el perfil de usuario final de Libris.

### B1 — Chart of Accounts

El árbol de cuentas es necesario para que el motor contable funcione internamente, pero
no debe ser navegable por el usuario operativo de Libris.

| Archivo | Ruta UI actual | Acción |
|---------|---------------|--------|
| `src/pages/ChartOfAccounts.vue` | `/chart-of-accounts` | Conservar código; quitar del sidebar |
| `src/utils/sidebarConfig.ts` L311-315 | Setup > Chart of Accounts | Remover entrada del sidebar |
| `models/baseModels/Account/Account.ts` | — | Conservar intacto (motor contable lo necesita) |
| `schemas/app/Account.json` | — | Conservar intacto |

**Riesgo de ocultación:** BAJO — el Account sigue siendo funcional internamente.

---

### B2 — Journal Entry (Asiento Manual)

Los asientos manuales son para contadores. Libris no los expone al usuario operativo,
pero `JournalEntry` sigue siendo usado como tipo de documento contable interno.

| Archivo | Ruta UI actual | Lo importan | Riesgo ocultación |
|---------|---------------|-------------|-------------------|
| `models/baseModels/JournalEntry/JournalEntry.ts` | `/list/JournalEntry` | `models/index.ts` | BAJO |
| `models/baseModels/JournalEntryAccount/JournalEntryAccount.ts` | (child de JournalEntry) | `models/index.ts` | BAJO |
| `schemas/app/JournalEntry.json` | — | `schemas/schemas.ts` | BAJO |
| `schemas/app/JournalEntryAccount.json` | — | `schemas/schemas.ts` | BAJO |

**Acción:** Remover `{ label: t\`Journal Entry\`, ... }` de `getCompleteSidebar()` en
`src/utils/sidebarConfig.ts` L272-278. El modelo permanece en `models/index.ts` para
que el motor contable pueda crear asientos de ajuste si los necesitara en el futuro.

**Migración DB:** Tabla `JournalEntry` y `JournalEntryAccount` siguen creándose — sin cambio.

---

### B3 — Reportes Financieros Contables

Los cuatro reportes del sidebar (`/report/...`) requieren conocimiento contable para interpretarse.
Se ocultan del sidebar pero el código de reporte permanece para uso administrativo eventual.

| Archivo | Ruta sidebar | Clase base | Riesgo ocultación |
|---------|-------------|-----------|-------------------|
| `reports/GeneralLedger/GeneralLedger.ts` | `/report/GeneralLedger` | `LedgerReport.ts` | BAJO |
| `reports/ProfitAndLoss/ProfitAndLoss.ts` | `/report/ProfitAndLoss` | `AccountReport.ts` | BAJO |
| `reports/BalanceSheet/BalanceSheet.ts` | `/report/BalanceSheet` | `AccountReport.ts` | BAJO |
| `reports/TrialBalance/TrialBalance.ts` | `/report/TrialBalance` | `AccountReport.ts` | BAJO |
| `reports/AccountReport.ts` | (base class) | BalanceSheet, ProfitAndLoss, TrialBalance | BAJO |
| `reports/LedgerReport.ts` | (base class) | GeneralLedger | BAJO |

**Acción:** Remover la función `getReportSidebar()` de `getCompleteSidebar()` en
`src/utils/sidebarConfig.ts` L301. Alternativamente, agregar `hidden: () => true` a la entrada.
El objeto `reports` en `reports/index.ts` puede conservar estas entradas (no hay costo).

---

### B4 — AccountingLedgerEntry (Motor Contable)

Este modelo es el núcleo del libro mayor. **Nunca debe ser visible al usuario** pero es
imprescindible para que todas las facturas, pagos y movimientos generen asientos correctamente.

| Archivo | Estado actual | Acción |
|---------|--------------|--------|
| `models/baseModels/AccountingLedgerEntry/AccountingLedgerEntry.ts` | Solo existe en code | **No tocar** — CONSERVAR código y schema completos |
| `schemas/app/AccountingLedgerEntry.json` | Schema registrado | **No tocar** |
| `models/Transactional/Transactional.ts` | Base para Invoice, Payment, JournalEntry | **No tocar** |
| `models/Transactional/LedgerPosting.ts` | Genera los ledger entries | **No tocar** |

**Riesgo de ocultación:** NINGUNO — nunca estuvo en el sidebar.

---

### B5 — Settings de AccountingSettings (Campos Avanzados)

La vista Settings tiene un tab "General" que muestra todos los campos de `AccountingSettings`.
Algunos son avanzados (discounting, pricing rules) y deberían ocultarse en el perfil inicial
de Libris. El mecanismo `hidden` ya existe en el schema — solo hay que activarlo.

| Campo | Archivo donde ocultar | Condición sugerida |
|-------|----------------------|-------------------|
| `enableDiscounting` | `schemas/app/AccountingSettings.json` | `"hidden": true` inicialmente |
| `discountAccount` | Ya tiene `hidden: () => !this.enableDiscounting` en `AccountingSettings.ts` | OK |
| `enablePricingRule` | Ya condicionado a `enableDiscounting` | OK |
| `enableCouponCode` | Ya condicionado a `enablePricingRule` | OK |
| `enableLead` | `schemas/app/AccountingSettings.json` | `"hidden": true` inicialmente |
| `enableFormCustomization` | `schemas/app/AccountingSettings.json` | Evaluar |

**Riesgo:** BAJO — usar mecanismos `hidden` existentes no altera la DB.

---

### B6 — Dashboard Charts Contables

El Dashboard muestra `Cashflow`, `ProfitAndLoss` y `Expenses`, todos basados en ledger entries.
Son útiles a nivel administrativo pero pueden confundir a un usuario operativo de POS.

| Archivo | Componente | Riesgo ocultación |
|---------|-----------|-------------------|
| `src/pages/Dashboard/ProfitAndLoss.vue` | Widget P&L en Dashboard | BAJO |
| `src/pages/Dashboard/Cashflow.vue` | Widget de flujo de caja | BAJO |
| `src/pages/Dashboard/Expenses.vue` | Widget de gastos | BAJO |

**Acción sugerida:** Mover a LISTA D para decidir en Fase 3 UI; son útiles pero no críticos para MVP POS.

---

## LISTA C — CONSERVAR Y REFORZAR

> Base administrativa que el POS necesita. Código intacto, no tocar salvo para adaptar a México.

### C1 — Party (Clientes / Proveedores)

| Archivo | Función |
|---------|---------|
| `models/baseModels/Party/Party.ts` | Modelo base de clientes y proveedores |
| `schemas/app/Party.json` | Schema + campos de contacto, rol, RFC (agregar en Fase 3) |
| `models/baseModels/Address/Address.ts` | Dirección ligada a Party |
| `schemas/app/Address.json` | Schema de Address |

**Dependencias:** Payment, SalesInvoice, PurchaseInvoice, POS todos referencian `Party`.  
**Refuerzo Fase 3:** Agregar campo `rfc` (RFC mexicano) equivalente al `gstin` de India.

---

### C2 — Item (Productos y Servicios)

| Archivo | Función |
|---------|---------|
| `models/baseModels/Item/Item.ts` | Producto: precio, UOM, grupo, inventariable |
| `models/baseModels/ItemGroup/ItemGroup.ts` | Categorías de productos |
| `schemas/app/Item.json` | Schema con precio, UOM, impuesto default |
| `schemas/app/ItemGroup.json` | Schema de categorías |
| `schemas/app/UOM.json` | Unidades de medida |
| `schemas/app/inventory/UOMConversionItem.json` | Conversión de unidades |

**Dependencias:** Todo el inventario, facturas, POS dependen de Item.  
**Nota:** `hsnCode` (campo India) permanece hasta decisión en LISTA D.

---

### C3 — Stock / Inventario

| Archivo | Función |
|---------|---------|
| `models/inventory/InventorySettings.ts` | Configuración de inventario |
| `models/inventory/StockMovement.ts` / `StockMovementItem.ts` | Movimientos de stock |
| `models/inventory/StockLedgerEntry.ts` | Libro de stock (motor interno) |
| `models/inventory/Shipment.ts` / `ShipmentItem.ts` | Salidas de mercancía |
| `models/inventory/PurchaseReceipt.ts` / `PurchaseReceiptItem.ts` | Recepciones de compra |
| `models/inventory/Batch.ts` | Lotes de inventario |
| `models/inventory/SerialNumber.ts` | Números de serie |
| `models/inventory/Location.ts` | Ubicaciones de almacén |
| `models/inventory/stockQueue.ts` | Algoritmo FIFO/LIFO |
| `models/inventory/StockManager.ts` | Orquestador de movimientos |
| Todos los schemas en `schemas/app/inventory/` (excluye Point of Sale) | — |

**Riesgo de modificación:** ALTO — no tocar este bloque; es la base del POS.

---

### C4 — SalesInvoice / PurchaseInvoice

| Archivo | Función |
|---------|---------|
| `models/baseModels/Invoice/Invoice.ts` | Clase base abstracta |
| `models/baseModels/InvoiceItem/InvoiceItem.ts` | Ítem de factura (base) |
| `models/baseModels/SalesInvoice/SalesInvoice.ts` | Factura de venta |
| `models/baseModels/SalesInvoiceItem/SalesInvoiceItem.ts` | Ítem de venta |
| `models/baseModels/PurchaseInvoice/PurchaseInvoice.ts` | Factura de compra |
| `models/baseModels/PurchaseInvoiceItem/PurchaseInvoiceItem.ts` | Ítem de compra |
| `schemas/app/Invoice.json`, `InvoiceItem.json` | Schemas base |
| `schemas/app/SalesInvoice.json`, `SalesInvoiceItem.json` | Schemas extendidos |
| `schemas/app/PurchaseInvoice.json`, `PurchaseInvoiceItem.json` | Schemas extendidos |

**Nota:** `isSyncedWithErp` (campo ERPNext en `Invoice.json`) se debe remover en LISTA A (cirugía).  
**Refuerzo Fase 4:** Estos modelos serán la base del CFDI (timbrado SAT).

---

### C5 — Payment (Pagos)

| Archivo | Función |
|---------|---------|
| `models/baseModels/Payment/Payment.ts` | Pago (liga factura con cuenta bancaria) |
| `models/baseModels/PaymentFor/PaymentFor.ts` | Detalle de pago por factura |
| `models/baseModels/PaymentMethod/PaymentMethod.ts` | Métodos de pago |
| `schemas/app/Payment.json`, `PaymentFor.json`, `PaymentMethod.json` | Schemas |

**Dependencias:** POS usa Payment para cierre de turnos y pagos múltiples.

---

### C6 — PriceList (Listas de Precios)

| Archivo | Función |
|---------|---------|
| `models/baseModels/PriceList/PriceList.ts` | Lista de precios con Items y precios |
| `models/baseModels/PriceList/PriceListItem.ts` | Ítem de lista de precios |
| `schemas/app/PriceList.json`, `PriceListItem.json` | Schemas |

**Dependencias:** `POS.vue` usa PriceList para mostrar precios del punto de venta.  
**Importancia:** CRÍTICA para el POS — habilitar mediante `enablePriceList`.

---

### C7 — Tax (Impuestos)

| Archivo | Función |
|---------|---------|
| `models/baseModels/Tax/Tax.ts` | Definición de impuesto (IVA 16%, etc.) |
| `models/baseModels/TaxSummary/TaxSummary.ts` | Resumen de impuestos en factura |
| `schemas/app/Tax.json`, `TaxDetail.json`, `TaxSummary.json` | Schemas |

**Refuerzo Fase 3:** Crear registros default de IVA 16%, IVA 8% (zona fronteriza), Exento.

---

### C8 — Settings Básicos de Empresa

| Archivo | Función |
|---------|---------|
| `models/baseModels/AccountingSettings/AccountingSettings.ts` | Nombre, país, email, moneda, ejercicio fiscal |
| `models/baseModels/Defaults/Defaults.ts` | Defaults de series, cuentas, moneda |
| `models/baseModels/PrintSettings/PrintSettings.ts` | Configuración de impresión |
| `fyo/models/SystemSettings.ts` | Idioma, dark mode, hideGetStarted |
| `models/baseModels/SetupWizard/SetupWizard.ts` | Wizard de setup inicial |
| Schemas correspondientes | — |

---

### C9 — POS Completo

| Archivo | Función |
|---------|---------|
| `models/inventory/Point of Sale/` (9 archivos) | Modelos de apertura/cierre de turno |
| `models/baseModels/POSProfile/PosProfile.ts` | Perfil de caja |
| `src/pages/POS/` (17 archivos Vue) | Interfaz completa del POS |
| `schemas/app/inventory/Point of Sale/` (8 JSON) | Schemas de POS |
| `schemas/app/POSProfile.json` | Schema de perfil |

**Riesgo de modificación:** ALTO — no tocar; es el producto principal de Libris.

---

### C10 — Motor Contable (INVISIBLE, ACTIVO)

| Archivo | Función |
|---------|---------|
| `models/Transactional/Transactional.ts` | Base de documentos que generan asientos |
| `models/Transactional/LedgerPosting.ts` | Genera `AccountingLedgerEntry` al submit |
| `models/Transactional/types.ts` | Tipos del motor transaccional |
| `models/baseModels/AccountingLedgerEntry/AccountingLedgerEntry.ts` | Registro contable individual |
| `models/baseModels/Account/Account.ts` | Cuenta contable (árbol COA) |
| `schemas/app/AccountingLedgerEntry.json` | Schema (tabla `AccountingLedgerEntry`) |
| `schemas/app/Account.json` | Schema (tabla `Account`) |

> **NUNCA exponer al usuario final.** El motor genera los asientos automáticamente al
> submit/cancel de facturas y pagos. Es la fuente de verdad financiera de la empresa.

---

### C11 — Core FYO Framework

| Archivo | Función |
|---------|---------|
| `fyo/core/` | Motor ORM, base de datos, eventos |
| `fyo/model/doc.ts` | Clase base de todos los documentos *(requiere edición A1.e)* |
| `fyo/models/NumberSeries.ts` | Series numéricas (SINV-, PINV-, etc.) |
| `fyo/models/CustomField.ts` / `CustomForm.ts` | Personalización de formularios |
| `fyo/telemetry/` | Telemetría (puede desactivarse para producción Libris) |

---

## LISTA D — DECISIONES PENDIENTES

> Archivos o features donde no está claro si van a ELIMINAR, OCULTAR o CONSERVAR.
> Requieren confirmación del equipo antes de actuar.

---

### D1 — `translations/es.csv` — Español España vs. es-MX

**Archivo:** `translations/es.csv`  
**Situación:** Único archivo de español en el repo. Es español de España, no mexicano. Hay
diferencias de vocabulario relevantes (ej. "factura" ≈ igual, "ordenador" vs "computadora").  
**Opciones:**
- A) Renombrar a `es-MX.csv` y ajustar el vocabulary manualmente.
- B) Eliminar y crear `es-MX.csv` desde cero.
- C) Conservar `es.csv` como fallback mientras se crea `es-MX.csv`.

**Pregunta:** ¿Se usa es-MX como código de idioma en el SetupWizard o se usa `es`?

---

### D2 — LoyaltyProgram + bree (Dependencia encadenada)

**Archivos:**
- `models/baseModels/LoyaltyProgram/LoyaltyProgram.ts`
- `models/baseModels/LoyaltyPointEntry/LoyaltyPointEntry.ts`
- `models/baseModels/CollectionRulesItems/CollectionRulesItems.ts`
- `schemas/app/LoyaltyProgram.json`, `LoyaltyPointEntry.json`, `CollectionRulesItems.json`
- `jobs/checkLoyaltyProgramExpiry.ts`
- `main/initSheduler.ts` (usa Bree para ejecutar el job de expiración)

**Situación:** LoyaltyProgram es una feature del POS (puntos de lealtad). El job de Bree
`checkLoyaltyProgramExpiry` es la **única razón** por la que `bree` permanece después de
eliminar ERPNext sync. Si se elimina LoyaltyProgram, se puede eliminar `bree` como dependencia.  
**Riesgo de eliminar bree:** BAJO — pero eliminar `main/initSheduler.ts` completo requeriría
también limpiar `main/registerIpcMainActionListeners.ts` y `main/preload.ts`.  
**Pregunta:** ¿Libris incluirá programas de lealtad en el POS?

---

### D3 — SalesQuote (Cotizaciones)

**Archivos:**
- `models/baseModels/SalesQuote/SalesQuote.ts`
- `models/baseModels/SalesQuoteItem/SalesQuoteItem.ts`
- `schemas/app/SalesQuote.json`, `SalesQuoteItem.json`

**Situación:** Aparece en sidebar (Sales > Sales Quotes). No tiene dependencia en POS.
¿Forma parte del flujo comercial de Libris en esta fase?

---

### D4 — Lead (CRM básico)

**Archivos:**
- `models/baseModels/Lead/Lead.ts`
- `schemas/app/Lead.json`

**Situación:** Feature de CRM mínimo. Oculto por default (`hidden: () => !enableLead`).
No tiene dependencias en POS ni en el motor contable. Bajo riesgo de cualquier decisión.  
**Pregunta:** ¿Se expone en Libris como módulo CRM o se elimina?

---

### D5 — CouponCode (Códigos de Descuento)

**Archivos:**
- `models/baseModels/CouponCode/CouponCode.ts`
- `models/baseModels/AppliedCouponCodes/AppliedCouponCodes.ts`
- `schemas/app/CouponCode.json`, `AppliedCouponCodes.json`

**Situación:** Funcionalidad de descuentos para POS y facturas. Depende de `PricingRule`
(ver D6). Oculto por default (`hidden: () => !enableCouponCode`).  
**Pregunta:** ¿POS de Libris manejará cupones de descuento?

---

### D6 — PricingRule (Reglas de Precios/Descuentos)

**Archivos:**
- `models/baseModels/PricingRule/PricingRule.ts`
- `models/baseModels/PricingRuleItem/PricingRuleItem.ts`
- `schemas/app/PricingRule.json`, `PricingRuleItem.json`, `PricingRuleDetail.json`

**Situación:** Sistema de promociones y descuentos automáticos. Tiene integración en el
ERPNext sync (los sincroniza), pero la feature en sí es útil independientemente.
Oculto por default (`hidden: () => !enablePricingRule`).  
**Nota:** Si se conserva, los filtros `datafromErp` en `InvoiceItem.ts` aún aplican pero
son innocuos sin el sync activo.  
**Pregunta:** ¿El POS usará reglas de precio automáticas (ej. "2x1", "10% off")?

---

### D7 — ItemEnquiry (Consulta de Artículos)

**Archivos:**
- `models/baseModels/ItemEnquiry/ItemEnquiry.ts`
- `schemas/app/ItemEnquiry.json`

**Situación:** Modelo para registrar consultas de clientes sobre artículos (campos: `item`,
`customer`, `contact`, `description`, `similarProduct`). No aparece en sidebar estándar.
El flag en AccountingSettings tiene un typo: `enaenableItemEnquiry` (doble prefijo).  
**Pregunta:** ¿Qué caso de uso tiene en Libris? ¿Es pre-venta, soporte, o se elimina?

---

### D8 — Dashboard Charts Contables

**Archivos:**
- `src/pages/Dashboard/ProfitAndLoss.vue`
- `src/pages/Dashboard/Cashflow.vue`
- `src/pages/Dashboard/Expenses.vue`

**Situación:** El Dashboard principal los muestra siempre. Son útiles para el dueño del negocio
pero requieren datos contables para ser significativos. Para un usuario de POS podrían ser
confusos o simplemente mostrar `$0` al inicio.  
**Opciones:** Ocultar del Dashboard inicial | Mantener | Reemplazar con KPIs de ventas POS.  
**Pregunta:** ¿Qué muestra el Dashboard de Libris en MVP?

---

### D9 — Campo `hsnCode` en Item (India GST)

**Archivo:** `schemas/app/Item.json` L129-132, L195  
**Patch asociado:** `backend/patches/fixItemHSNField.ts`  
**Situación:** `hsnCode` es el código HSN/SAC del sistema tributario indio. No aplica a México.
Sin embargo, es un campo `Data` simple que no rompe nada si queda vacío.  
**Opciones:** Eliminar campo del schema + remover patch | Reutilizar como campo custom mexicano (ej. ClaveProdServ SAT) | Dejar vacío por ahora.  
**Pregunta:** ¿Se reutiliza `hsnCode` para la clave de producto SAT del CFDI?

---

### D10 — Print Templates (6 plantillas)

**Archivos en `templates/`:**
- `Basic.template.html`
- `Business.template.html`
- `Business.Shipment.template.html`
- `Business.Payment.template.html`
- `Business-POS.template.html`
- `Minimal.template.html`

**Situación:** Plantillas de impresión para facturas, pagos y POS. Están en inglés y no tienen
formato CFDI ni adaptación a México. Necesitarán redesign para Fase 4 (CFDI).  
**Pregunta:** ¿Cuáles se conservan para el MVP (pre-CFDI) y cuáles se redeseñan?

---

### D11 — `main/api.ts` y `node-fetch` (Alcance de eliminación)

**Archivos:**
- `main/api.ts` — Wrapper de `node-fetch` usado solo por `erpnextSync` vía IPC
- `node-fetch` en `package.json`

**Situación:**
- `main/api.ts` — Solo usado por `registerIpcMainActionListeners.ts` para el endpoint ERPNext.
  Si se elimina ese endpoint IPC, `main/api.ts` puede eliminarse.
- `node-fetch` — También usado por `main/contactMothership.ts` (telemetría) y
  `main/getLanguageMap.ts` (descarga de traducciones). **No se puede eliminar.**

**Conclusión pendiente:** ¿Se desactiva la telemetría de Frappe en Libris?
Si sí, `contactMothership.ts` desaparece y `node-fetch` solo sería necesario para `getLanguageMap`.

---

## RESUMEN DE DEPENDENCIAS ENTRE LISTAS

```
LISTA A (Eliminar ERPNext)
  └─ Requiere cirugía en:
       fyo/model/doc.ts           ← core framework, cuidado MEDIO
       models/index.ts            ← registro de modelos
       models/types.ts            ← enum ModelNameEnum
       schemas/schemas.ts         ← registro de schemas
       src/App.vue                ← inicialización de la app
       src/pages/Settings/        ← tab ERPNext en Settings
       src/renderer/ipcListeners  ← listener de sync
       main/initSheduler.ts       ← job Bree (conservar si D2=conservar)
       AccountingSettings.ts      ← flag enableERPNextSync
       Invoice.json               ← campo isSyncedWithErp
       Item.json                  ← campo datafromErp
       InvoiceItem.ts             ← filtros datafromErp
       POS.vue                    ← filtros datafromErp

LISTA A (Eliminar India/CH)
  └─ Requiere cirugía en:
       src/regional/index.ts      ← quitar rama India
       schemas/regional/index.ts  ← quitar in y ch
       models/index.ts            ← quitar getRegionalModels dinamismo

LISTA B (Ocultar contabilidad)
  └─ Solo toca: sidebarConfig.ts (remover entradas del sidebar)
     No rompe ningún modelo ni schema.

LISTA C (Conservar POS base)
  └─ Dependencias internas bien establecidas. No modificar.

LISTA D (Pendientes)
  ├─ D2 (LoyaltyProgram) ─── afecta: bree, main/initSheduler
  ├─ D6 (PricingRule) ─────── afecta: CouponCode (D5)
  └─ D9 (hsnCode) ─────────── afecta: fixItemHSNField patch
```

---

## ORDEN DE EJECUCIÓN SUGERIDO (POST-CONFIRMACIÓN)

1. **Confirmar LISTA D** (especialmente D2, D6, D9) antes de comenzar.
2. **Eliminar traducciones** (A2) — cambio aislado, riesgo cero.
3. **Eliminar regional India/CH** (A3) + edición quirúrgica de 3 archivos.
4. **Eliminar reportes GST** (A4) — 5 archivos + 1 línea en `reports/index.ts`.
5. **Cirugía ERPNext** (A1.e) — editar 15+ archivos; hacer en rama aislada con tests.
6. **Eliminar modelos/schemas ERPNext** (A1.a-d) — después de que las referencias estén limpias.
7. **Ocultar sidebar** (B1-B3) — 1 archivo `sidebarConfig.ts`, cambio reversible.
8. **Crear `translations/es-MX.csv`** — según decisión D1.

---

*Generado el 2026-05-05 — solo lectura, sin modificaciones de código.*
