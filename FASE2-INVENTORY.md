# FASE2-INVENTORY — Inventario Técnico para Mexicanización Estructural

> Generado: solo lectura, cero modificaciones al código.  
> Branch base: `claude/apply-es-mx-glossary-YvpL9` (que ya incluye Fase 1 + glosario es-MX).

---

## 1. Sistema de Schemas

### Definición

Los schemas se definen en dos capas:

| Capa | Ubicación | Propósito |
|---|---|---|
| Base JSON | `schemas/app/*.json` | Definición de campos, tipos, validaciones declarativas |
| Regional JSON | `schemas/regional/<cc>/*.json` | Sobreescritura/extensión por país |
| Core JSON | `schemas/core/*.json` | Internos del framework (SystemSettings, CustomField…) |

Cada archivo JSON describe un **Schema** con esta forma (de `schemas/types.ts`):

```ts
interface Schema {
  name: string;           // Nombre de tabla en SQLite
  label: string;          // Label traducible (UI)
  fields: Field[];        // Columnas de BD + metadatos UI
  isTree?: boolean;       // Árbol anidado (ej. Account)
  extends?: string;       // Hereda de schema abstracto
  isChild?: boolean;      // Tabla hija con FK "parent"
  isSingle?: boolean;     // Registro único en SingleValue (EAV)
  isAbstract?: boolean;   // No se crea en BD; sólo herencia
  isSubmittable?: boolean;// Tiene flujo Draft→Saved→Submitted
  tableFields?: string[]; // Columnas visibles en child-table inline
  quickEditFields?: string[];
  keywordFields?: string[];
  create?: boolean;       // Permitir crear desde ListView
  naming?: Naming;        // 'manual' | 'random' | 'numberSeries' | 'autoincrement'
  removeFields?: string[];// El stub regional puede eliminar campos del base
  linkDisplayField?: string;
}
```

### FieldTypes soportados

```
Data         → VARCHAR (texto libre)
Text         → TEXT (multilinea)
Int          → INTEGER
Float        → REAL
Currency     → REAL (con precisión monetaria)
Check        → INTEGER (0/1 booleano)
Date         → TEXT (ISO date)
Datetime     → TEXT (ISO datetime)
Select       → VARCHAR + opciones estáticas en JSON
AutoComplete → VARCHAR + opciones dinámicas o estáticas
Link         → VARCHAR (FK lógica, no enforced en SQLite)
Table        → (no columna propia; define child table)
AttachImage  → TEXT (path/URL)
Attachment   → TEXT (path/URL)
DynamicLink  → VARCHAR (tipo dinámico via campo `references`)
Color        → TEXT (valor hex o token)
Button       → (solo UI, sin columna)
```

### Naming Series

- Definidas en `NumberSeries` (schema propio).
- Formato: prefijo + número autoincremental (ej. `SINV-0001`).
- El campo `numberSeries` en SalesInvoice/PurchaseInvoice es un `Link → NumberSeries`.
- Prefijos por defecto (en `backend/patches/updateSchemas.ts`):
  - SalesInvoice: `SINV-`
  - PurchaseInvoice: `PINV-`
  - JournalEntry: `JV-`
  - Payment: `PAY-`
  - SalesQuote: `SQUOT-`

### Child Tables

- Un campo `"fieldtype": "Table"` + `"target": "ChildSchemaName"` referencia a un schema con `"isChild": true`.
- Las tablas hijas tienen columna implícita `parent` (FK al parent) y `parentSchemaName`/`parentFieldname`.
- `tableFields` define qué columnas se muestran inline en el formulario.

---

## 2. Punto de Entrada de Schemas en Runtime

```
backend/database/manager.ts → _connect(dbPath, countryCode)
    └── getSchemas(countryCode, rawCustomFields)   ← schemas/index.ts
            ├── getCoreSchemas()                   ← schemas/core/*.json
            ├── getAppSchemas(countryCode)
            │       ├── appSchemas (schemas/app/*.json)
            │       ├── getRegionalSchemaMap(countryCode)   ← schemas/regional/<cc>/
            │       ├── getRegionalCombinedSchemas()        ← merge aditivo
            │       └── getAbstractCombinedSchemas()        ← resuelve extends
            └── addCustomFields(schemaMap, rawCustomFields) ← tabla CustomField en BD
```

El `schemaMap` resultante es un objeto inmutable (`deepFreeze`) con todos los schemas compilados, incluidos los regionales y los custom fields del usuario.

El `countryCode` se persiste en `SingleValue` con `fieldname='countryCode'`, `parent='SystemSettings'`. Al reconectar una BD existente, se lee de ahí.

---

## 3. Mecanismo de Migración (Patches)

### Dos capas

**Capa 1 — `DatabaseCore.migrate()` (`backend/database/core.ts`)**  
Migración automática de esquema de BD. Compara el `schemaMap` activo con las tablas/columnas existentes en SQLite y ejecuta:
- `CREATE TABLE` para tablas nuevas.
- `ALTER TABLE … ADD COLUMN` para columnas nuevas.
- Actualiza valores default en `SingleValue` para schemas `isSingle`.

No hace `DROP COLUMN` ni `DROP TABLE` — solo es aditivo.

**Capa 2 — Patches (`backend/patches/`)**  
Patches de datos/lógica con versionado:

```ts
// backend/patches/index.ts
[
  { name: 'testPatch',                   version: '0.5.0-beta.0', patch },
  { name: 'updateSchemas',               version: '0.5.0-beta.0', patch, priority: 100 },
  { name: 'addUOMs',                     version: '0.6.0-beta.0', patch },
  { name: 'fixRoundOffAccount',          version: '0.6.3-beta.0', patch },
  { name: 'createInventoryNumberSeries', version: '0.6.6-beta.0', patch },
  { name: 'setPaymentReferenceType',     version: '0.20.1',       patch },
  { name: 'fixLedgerDateTime',           version: '0.21.2',       patch },
  { name: 'fixItemHSNField',             version: '0.24.0',       patch },
  { name: 'createPaymentMethods',        version: '0.25.1',       patch },
]
```

Cada patch lleva una `version`: si la BD tiene una versión ≥ a la del patch, el patch se omite. El campo `version` vive en `SingleValue` (`SystemSettings.version`).

`updateSchemas` (priority: 100, corre primero) es el patch de migración mayor que recrea la BD cuando se viene de versiones pre-`0.5.0-beta.0`.

**Flujo al conectar una BD:**

```
DatabaseManager.connectToDatabase()
  → DatabaseManager._connect()        // carga schemaMap
  → DatabaseManager.#migrate()
        → runPatches(patches, dm)     // aplica patches pendientes por versión
        → db.migrate()                // ALTER TABLE / CREATE TABLE aditivo
```

---

## 4. Inventario de Schemas Relevantes para Fase 2

### 4.1 Party (Cliente / Proveedor)

**Archivo:** `schemas/app/Party.json`  
**Naming:** `manual` (el usuario pone el nombre)

| Fieldname | Fieldtype | Notas |
|---|---|---|
| `image` | AttachImage | Logo/foto |
| `name` | Data | **PK**, nombre completo |
| `role` | Select | `Both` / `Supplier` / `Customer` |
| `email` | Data | |
| `phone` | Data | |
| `address` | Link → Address | Con `create: true` |
| `defaultAccount` | Link → Account | |
| `currency` | Link → Currency | Moneda del tercero |
| `fromLead` | Link → Lead | Solo lectura |
| `loyaltyProgram` | Link → LoyaltyProgram | |
| `loyaltyPoints` | Int | Solo lectura |
| `taxId` | Data | RFC en contexto MX (campo genérico actualmente) |
| `outstandingAmount` | Currency | Calculado, oculto |

**quickEditFields:** email, phone, address, defaultAccount, loyaltyProgram, currency, role, taxId

**[DECISIÓN PENDIENTE: MX]** El campo `taxId` (RFC) es un `Data` libre sin validación de formato. Para Fase 2 se necesita: validación de formato RFC (persona moral: 12 chars, física: 13 chars), campo adicional para **Régimen Fiscal** (catálogo SAT), y campo **Uso CFDI** por defecto. ¿Se extiende via `schemas/regional/mx/Party.json` o via Custom Fields en UI?

---

### 4.2 Item (Producto)

**Archivo:** `schemas/app/Item.json`  
**Naming:** `manual`

| Fieldname | Fieldtype | Notas |
|---|---|---|
| `image` | AttachImage | |
| `name` | Data | **PK**, nombre del producto |
| `itemCode` | Data | Código interno |
| `itemGroup` | Link → ItemGroup | |
| `for` | Select | `Purchases` / `Sales` / `Both` |
| `itemType` | Select | `Product` / `Service` |
| `unit` | Link → UOM | |
| `rate` | Currency | Precio base |
| `description` | Text | |
| `incomeAccount` | Link → Account | Cuenta de ventas (required) |
| `expenseAccount` | Link → Account | Cuenta de compras (required) |
| `tax` | Link → Tax | Plantilla de impuesto por defecto |
| `hsnCode` | Data | Código HSN/SAC (India) — en MX sería **clave ProdServ SAT** |
| `barcode` | Data | |
| `trackItem` | Check | Habilita inventario |
| `hasBatch` | Check | |
| `hasSerialNumber` | Check | |
| `serialNumberSeries` | Data | |
| `uomConversions` | Table → UOMConversionItem | |
| `datafromErp` | Check | Oculto, para sync ERPNext |

**[DECISIÓN PENDIENTE: MX]** `hsnCode` está pensado para India (HSN/SAC). Para MX se necesita **Clave de Producto/Servicio (ProdServ)** del SAT — campo distinto o renombramiento del existente. ¿Reutilizamos `hsnCode` con label diferente via regional schema, o agregamos `prodServCode` nuevo?

---

### 4.3 SalesInvoice y sus child tables

**Herencia:** `SalesInvoice extends Invoice`

#### Invoice (abstracto) — `schemas/app/Invoice.json`

| Fieldname | Fieldtype | Notas |
|---|---|---|
| `name` | Data | PK, número de factura |
| `numberSeries` | (abstract) | definido en subclase |
| `party` | (abstract) | definido en subclase |
| `account` | Link → Account | Cuenta contable |
| `date` | Datetime | Fecha de registro |
| `priceList` | Link → PriceList | |
| `items` | (abstract) | child table |
| `netTotal` | Currency | Calculado |
| `taxes` | Table → TaxSummary | Calculado, solo lectura |
| `baseGrandTotal` | Currency | En moneda base |
| `grandTotal` | Currency | |
| `setDiscountAmount` | Check | Oculto |
| `discountAmount` | Currency | Oculto |
| `discountPercent` | Float | Oculto |
| `entryCurrency` | Select | `Party` / `Company` |
| `currency` | Link → Currency | Moneda del cliente |
| `exchangeRate` | Float | default 1 |
| `discountAfterTax` | Check | Tab Settings |
| `makeAutoPayment` | Check | Tab Settings |
| `makeAutoStockTransfer` | (abstract) | Tab Settings |
| `outstandingAmount` | Currency | Calculado |
| `stockNotTransferred` | (abstract) | |
| `terms` | Text | Notas/términos |
| `attachment` | Attachment | |
| `isReturned` | Check | Oculto |
| `isFullyReturned` | Check | Oculto |
| `isSyncedWithErp` | Check | Oculto |
| `backReference` | (abstract) | |
| `returnAgainst` | (abstract) | |

#### SalesInvoice — `schemas/app/SalesInvoice.json`

Agrega sobre Invoice:

| Fieldname | Fieldtype | Notas |
|---|---|---|
| `numberSeries` | Link → NumberSeries | default `SINV-` |
| `party` | Link → Party | label: **"Customer"** |
| `coupons` | Table → AppliedCouponCodes | |
| `backReference` | Link → Shipment | |
| `quote` | Link → SalesQuote | |
| `makeAutoStockTransfer` | Check | "Make Shipment On Submit" |
| `items` | Table → SalesInvoiceItem | |
| `stockNotTransferred` | Float | "Stock Not Shipped" |
| `returnAgainst` | Link → SalesInvoice | |
| `loyaltyProgram` | Link → LoyaltyProgram | Solo lectura |
| `availableLoyaltyPoints` | Int | |
| `redeemLoyaltyPoints` | Check | |
| `loyaltyPoints` | Int | |
| `isPOS` | Check | Oculto |
| `isPricingRuleApplied` | Check | Oculto |
| `pricingRuleDetail` | Table → PricingRuleDetail | Solo lectura |

#### SalesInvoiceItem — `schemas/app/SalesInvoiceItem.json`

Extiende `InvoiceItem`. Agrega:
- `isFreeItem` (Check, oculto)
- `pricingRule` (Data, oculto)

#### InvoiceItem (abstracto) — `schemas/app/InvoiceItem.json`

| Fieldname | Fieldtype | Notas |
|---|---|---|
| `item` | Link → Item | |
| `itemCode` | Data | Oculto |
| `description` | Text | |
| `rate` | Currency | required |
| `transferUnit` | Link → UOM | |
| `transferQuantity` | Float | |
| `qty` | Float | computed |
| `unit` | Link → UOM | Solo lectura |
| `batch` | Link → Batch | |
| `quantity` | Float | required |
| `unitConversionFactor` | Float | |
| `account` | Link → Account | required |
| `tax` | Link → Tax | |
| `amount` | Currency | Calculado |
| `setItemDiscountAmount` | Check | |
| `itemDiscountAmount` | Currency | |
| `itemDiscountPercent` | Float | |
| `itemDiscountedTotal` | Currency | computed |
| `itemTaxedTotal` | Currency | computed |
| `hsnCode` | Int | |
| `stockNotTransferred` | Float | Solo lectura |

**[DECISIÓN PENDIENTE: MX]** Para CFDI se requieren campos por línea de factura: **Clave Unidad** (catálogo SAT c_ClaveUnidad), **Número de identificación** (opcionalmente). ¿Van en `SalesInvoiceItem` vía regional schema, o se tratan como campos de la exportación XML sin persistir?

#### TaxSummary — `schemas/app/TaxSummary.json`

Child table de las facturas (calculado, solo lectura):

| Fieldname | Fieldtype |
|---|---|
| `account` | Link → Account |
| `from_account` | Link → Account (oculto) |
| `rate` | Float |
| `amount` | Currency |

---

### 4.4 PurchaseInvoice y sus child tables

**Herencia:** `PurchaseInvoice extends Invoice`

Agrega sobre Invoice:

| Fieldname | Fieldtype | Notas |
|---|---|---|
| `numberSeries` | Link → NumberSeries | default `PINV-` |
| `party` | Link → Party | label: **"Supplier"** |
| `backReference` | Link → PurchaseReceipt | |
| `makeAutoStockTransfer` | Check | "Make Purchase Receipt On Submit" |
| `items` | Table → PurchaseInvoiceItem | |
| `stockNotTransferred` | Float | "Stock Not Received" |
| `returnAgainst` | Link → PurchaseInvoice | |

**PurchaseInvoiceItem** extiende `InvoiceItem` sin campos adicionales.

---

### 4.5 Account

**Archivo:** `schemas/app/Account.json`  
**Naming:** `manual` | `isTree: true` | `create: false` (no desde ListView)

| Fieldname | Fieldtype | Notas |
|---|---|---|
| `name` | Data | Nombre de la cuenta |
| `rootType` | Select | Asset / Liability / Equity / Income / Expense |
| `parentAccount` | Link → Account | |
| `accountType` | Select | 19 tipos (Bank, Cash, Receivable, Payable, Tax, Stock…) |
| `isGroup` | Check | ¿Es cuenta padre/grupo? |

---

### 4.6 AccountingSettings

**Archivo:** `schemas/app/AccountingSettings.json`  
**Tipo:** `isSingle: true` (un único registro por empresa, guardado en SingleValue)

| Fieldname | Fieldtype | Notas |
|---|---|---|
| `fullname` | Data | Nombre del usuario/propietario |
| `companyName` | Data | Solo lectura tras setup |
| `bankName` | Data | Solo lectura tras setup |
| `country` | AutoComplete | Solo lectura tras setup |
| `email` | Data | |
| `writeOffAccount` | Link → Account | |
| `roundOffAccount` | Link → Account | |
| `discountAccount` | Link → Account | |
| `enableDiscounting` | Check | Feature flag |
| `enableInventory` | Check | Feature flag |
| `enablePriceList` | Check | Feature flag |
| `enableInvoiceReturns` | Check | Feature flag |
| `enableFormCustomization` | Check | Feature flag |
| `enableERPNextSync` | Check | Feature flag |
| `enableLead` | Check | Feature flag |
| `enablePricingRule` | Check | Feature flag |
| `enableItemEnquiry` | Check | Feature flag |
| `enableLoyaltyProgram` | Check | Feature flag |
| `enableCouponCode` | Check | Feature flag |
| `enableitemGroup` | Check | Feature flag |
| `enablePointOfSaleWithOutInventory` | Check | Feature flag |
| `enablePartialPayment` | Check | Feature flag |
| `fiscalYearStart` | Date | required |
| `fiscalYearEnd` | Date | required |
| `setupComplete` | Check | Oculto |

**[DECISIÓN PENDIENTE: MX]** Para facturación CFDI se necesita en AccountingSettings (o un nuevo schema `MXSettings`): **RFC emisor**, **Régimen Fiscal**, **Certificado CSD** (ruta o contenido), **Llave CSD**, **Contraseña CSD**, **PAC** a usar. ¿Vas a extender `AccountingSettings` vía `schemas/regional/mx/AccountingSettings.json` (como hace India con `gstin`) o crear un schema `MXFiscalSettings` separado?

---

### 4.7 Address

**Archivo:** `schemas/app/Address.json`  
**Naming:** `manual`

| Fieldname | Fieldtype | Notas |
|---|---|---|
| `name` | Data | PK |
| `addressLine1` | Data | required |
| `addressLine2` | Data | |
| `city` | Data | required |
| `country` | AutoComplete | required |
| `state` | AutoComplete | |
| `postalCode` | Data | Código Postal (5 dígitos en MX) |
| `emailAddress` | Data | |
| `phone` | Data | |
| `fax` | Data | |
| `addressDisplay` | Text | Calculado, solo lectura |

**India extiende Address** con `schemas/regional/in/Address.json`:
- Agrega campo `pos` (Place of Supply) tipo `AutoComplete`.

**[DECISIÓN PENDIENTE: MX]** Para CFDI el domicilio fiscal requiere: **Colonia**, **Municipio/Delegación**, **Código Postal** (que en MX ya existe pero es crítico para validación SAT). ¿Extendemos Address con `schemas/regional/mx/Address.json` o lo incluimos como parte del flujo de emisión CFDI sin persisitir en el schema?

---

### 4.8 Tax y TaxDetail

**Tax** (`schemas/app/Tax.json`): Plantilla de impuesto, naming `manual`.

| Fieldname | Fieldtype |
|---|---|
| `name` | Data (PK) |
| `details` | Table → TaxDetail |

**TaxDetail** (`schemas/app/TaxDetail.json`): Child table de Tax.

| Fieldname | Fieldtype | Notas |
|---|---|---|
| `account` | Link → Account | Cuenta de impuesto en factura |
| `payment_account` | Link → Account | Cuenta de pago del impuesto |
| `rate` | Float | Tasa en % |

Un `Tax` puede tener múltiples `TaxDetail` (ej. IVA 16% → una línea; IVA + ISR retención → dos líneas).

**[DECISIÓN PENDIENTE: MX]** Para CFDI los impuestos tienen semántica específica: **tipo** (Traslado / Retención), **impuesto** (IVA/ISR/IEPS), **tasa o cuota**, **factor** (Tasa/Cuota/Exento). El schema actual no captura ninguno de estos atributos. ¿Extender `TaxDetail` con campos `taxType` (Traslado/Retención), `taxName` (IVA/ISR/IEPS), `factorType`? ¿O calcularlos en tiempo de emisión desde la tasa?

---

## 5. Extensión Regional de Schemas

### Mecanismo formal existente

Sí existe un mecanismo formal. Funciona con tres capas:

#### 5.1 Schemas regionales (declarativo)

```
schemas/regional/
  index.ts          ← Registra países: { in: IndianSchemas, ch: SwissSchemas }
  in/
    index.ts
    Party.json       ← Agrega campos GST al Party base
    Address.json     ← Agrega Place of Supply
    AccountingSettings.json  ← Agrega GSTIN
  ch/
    AccountingSettings.json  ← Agrega taxId con placeholder suizo
```

`getRegionalCombinedSchemas()` en `schemas/index.ts` hace un **merge aditivo**:
- Si el campo no existe en el base schema → se agrega.
- Si ya existe → el stub regional lo sobreescribe (merge de propiedades).
- `removeFields: ["taxId"]` en India elimina el campo genérico del base.
- `quickEditFields` del stub regional reemplaza al del base.

#### 5.2 Modelos regionales (runtime lógica)

```
models/
  index.ts → getRegionalModels(countryCode)
  regionalModels/
    in/
      Address.ts    ← Overrides del modelo Doc para India
      Party.ts
```

Si `countryCode !== 'in'`, devuelve `{}` — no hay lógica regional para otros países.

#### 5.3 Records regionales (datos iniciales)

```
src/regional/
  index.ts → createRegionalRecords(country, fyo)
  in/in.ts  ← Crea plantillas Tax GST/IGST para India
```

Solo India tiene records regionales. Se llama en `setupInstance()` tras crear el COA.

### Para agregar MX

Para agregar México al sistema regional habría que:

1. **`schemas/regional/mx/`**: Stubs JSON para Party (RFC, Régimen Fiscal), Address (Colonia, Municipio), AccountingSettings (RFC emisor, Régimen Fiscal), TaxDetail (atributos SAT).
2. **`schemas/regional/index.ts`**: Añadir `mx: MXSchemas`.
3. **`models/regionalModels/mx/`**: Modelos con validaciones (RFC format, lookup catálogos SAT).
4. **`models/index.ts → getRegionalModels()`**: Añadir rama `mx`.
5. **`src/regional/mx.ts`**: Crear plantillas Tax (IVA 16%, IVA 0%, Exento, retenciones ISR/IVA).
6. **`src/regional/index.ts`**: Añadir rama `Mexico`.

---

## 6. Fixtures y Seeds

| Archivo | Contenido | Cuándo se usa |
|---|---|---|
| `fixtures/countryInfo.json` | Por país: código, moneda, símbolo, fracción, timezones, locale | Setup: selección automática de moneda y locale al elegir país |
| `fixtures/standardCOA.json` | COA estándar genérico (inglés) | Setup: cuando no hay COA específico del país |
| `fixtures/verified/mx.json` | COA México — "Plan de Cuentas" completo en español | Setup: usuario elige "Mexico - Plan de Cuentas" |
| `fixtures/verified/in.json` | COA India | Setup |
| `fixtures/verified/ca.json` | COA Canadá (FR) | Setup |
| … otros 9 países | | |

### Flujo de carga de fixtures en setup

```
setupInstance()
  → createAccountRecords(bankName, country, chartOfAccounts, fyo)
      → new CreateCOA(chartOfAccounts, fyo).run()
          → getCOA(chartOfAccountsName)         ← lee fixtures/verified/<cc>.json
          → createCOAAccounts(tree, ...)         ← crea Account docs recursivamente
  → createCurrencyRecords(fyo)
      ← lee fixtures/countryInfo.json            ← crea Currency para TODOS los países
  → createRegionalRecords(country, fyo)
      ← src/regional/index.ts                   ← solo India actualmente
```

### El COA de México (`fixtures/verified/mx.json`)

- Estructura: árbol ACTIVO / PASIVO / CAPITAL / INGRESOS / COSTOS Y GASTOS / CUENTAS DE ORDEN.
- En español, todo en mayúsculas.
- Tiene `accountType` en nodos hoja (Receivable, Payable, Bank, Cash…).
- Incluye `rootType` en nodos raíz (Asset, Liability, Equity, Income, Expense).
- **Calidad actual**: Es un COA genérico; le faltan cuentas específicas de IVA acreditable/trasladado, ISR por pagar, IEPS, retenciones. Será necesario enriquecerlo para facturación CFDI.

---

## 7. Moneda y País — Determinación y Almacenamiento

### En el Setup Wizard

`SetupWizard.ts` (modelo) tiene fórmulas automáticas:

| Campo | Fórmula | Depende de |
|---|---|---|
| `currency` | Busca en `countryInfo[country].currency` | `country` |
| `chartOfAccounts` | Busca en `getCOAList()` el que coincide con el `code` del país | `country` |
| `fiscalYearStart` | Calcula desde `countryInfo[country].fiscal_year_start` | `country` |
| `fiscalYearEnd` | Ídem | `country` |

Para México (`"Mexico"`):
- Moneda: `MXN` (Peso Mexicano)
- Locale: `es-MX`
- COA: `"Mexico - Plan de Cuentas"` (`fixtures/verified/mx.json`)
- Año fiscal: los campos `fiscal_year_start`/`fiscal_year_end` **no están definidos** en `countryInfo.json` para MX — el wizard los deja vacíos y el usuario los pone manualmente.

### Almacenamiento tras Setup

| Dato | Dónde se guarda |
|---|---|
| `countryCode` | `SingleValue` (parent=`SystemSettings`, fieldname=`countryCode`) |
| `currency` (MXN) | `SingleValue` (parent=`SystemSettings`, fieldname=`currency`) |
| `locale` (es-MX) | `SingleValue` (parent=`SystemSettings`, fieldname=`locale`) |
| `country` (nombre) | `SingleValue` (parent=`AccountingSettings`, fieldname=`country`) |
| `companyName` | `SingleValue` (parent=`AccountingSettings`, fieldname=`companyName`) |

El `countryCode` es la clave que determina qué regional schemas y modelos se activan en cada conexión. Se lee en `DatabaseCore.getCountryCode(dbPath)` antes de construir el `schemaMap`.

**[DECISIÓN PENDIENTE: MX]** `fiscal_year_start` y `fiscal_year_end` no están en `countryInfo.json` para México. El año fiscal estándar MX es 1 enero – 31 diciembre (calendario). ¿Agregamos estos datos a `fixtures/countryInfo.json` para que el wizard los precomplete automáticamente?

---

## Resumen de Decisiones Pendientes

| # | Área | Pregunta |
|---|---|---|
| 1 | Party | ¿Campo RFC con validación + Régimen Fiscal como regional schema o como Custom Fields? |
| 2 | Item | ¿Reutilizar `hsnCode` para ProdServ SAT o agregar campo `prodServCode`? |
| 3 | SalesInvoiceItem | ¿Clave Unidad SAT (c_ClaveUnidad) se persiste en schema o solo va al XML de exportación? |
| 4 | AccountingSettings | ¿Datos de CSD/FIEL y PAC en `AccountingSettings` extendido o schema `MXFiscalSettings` nuevo? |
| 5 | Address | ¿Agregar Colonia + Municipio vía `schemas/regional/mx/Address.json`? |
| 6 | TaxDetail | ¿Atributos SAT (tipo, impuesto, factor) en schema o calculados en tiempo de emisión CFDI? |
| 7 | COA MX | ¿Enriquecer `fixtures/verified/mx.json` con cuentas IVA/ISR/IEPS o crear COA alternativo? |
| 8 | countryInfo | ¿Agregar `fiscal_year_start`/`fiscal_year_end` para Mexico en `fixtures/countryInfo.json`? |
| 9 | Regional records | ¿Qué plantillas Tax (IVA 16%, IVA 0%, Exento, retención ISR 10%, retención IVA 10.67%) crear automáticamente para MX en setup? |
| 10 | CFDI emisión | ¿Integración con FacturAPI (API externa) o librería local? ¿Dónde vive ese código? |
