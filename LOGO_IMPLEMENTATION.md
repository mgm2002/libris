<!-- Logo Reference Guide -->
# Libris - Logo Implementation Guide

## Overview
All logos are stored in `/src/assets/brand/` with specific variations for different backgrounds and use cases.

---

## 📁 Available Logo Files

| File | Purpose | Use Case |
|------|---------|----------|
| **logo.svg** | Full lockup (color) | Neutral/light backgrounds (DatabaseSelector) |
| **logo-light.svg** | Full lockup (white) | Dark/gradient backgrounds (Splash, Setup, Sidebar) |
| **logo-dark.svg** | Full lockup (dark) | White/light backgrounds (About dialog) |
| **logo-mark.svg** | Mark/icon only | Small spaces, inline usage (future use) |
| **splash-bg.svg** | Background pattern | Splash screen backdrop |

---

## ✅ Current Logo Implementation Status

### Active Logo Usage (All Correct)

#### 1. **Sidebar.vue** `src/components/`
- **Logo:** `../assets/brand/logo-light.svg`
- **Size:** `h-8` (32px)
- **Background:** Dark purple sidebar
- **Status:** ✓ Correct

#### 2. **Splash.vue** `src/pages/Splash/`
- **Logo:** `../../assets/brand/logo-light.svg`
- **Size:** `120px height`
- **Background:** Gradient (dark blue)
- **Status:** ✓ Correct

#### 3. **SetupWizard.vue** `src/pages/SetupWizard/`
- **Logo:** `../../assets/brand/logo-light.svg`
- **Size:** `80px height`
- **Background:** Gradient (dark blue)
- **Status:** ✓ Correct

#### 4. **DatabaseSelector.vue** `src/pages/`
- **Logo:** `../assets/brand/logo.svg`
- **Size:** `56px height`
- **Background:** Light neutral (libris-neutral-50)
- **Status:** ✓ Correct

#### 5. **AboutDialog.vue** `src/components/`
- **Logo:** `../assets/brand/logo-dark.svg`
- **Size:** `h-16` (64px)
- **Background:** White
- **Status:** ✓ Correct

#### 6. **Print Templates** `templates/*.template.html`
- **Logo:** `print.logo` (Attachment field)
- **Display:** Conditional via `v-if="print.displayLogo"`
- **Location:** Header section of all invoice/bill templates
- **Files:**
  - Basic.template.html
  - Business.template.html
  - Business-POS.template.html
  - Business.Payment.template.html
  - Business.Shipment.template.html
  - Minimal.template.html
- **Status:** ✓ Correct

---

## 🎨 Logo Selection Guidelines

### Choose Based on Background

| Background | Logo File | Why |
|-----------|-----------|-----|
| Dark/gradient (dark blue, purple) | `logo-light.svg` | White logotype is readable |
| Light/neutral (white, light gray) | `logo-dark.svg` or `logo.svg` | Dark contrast for readability |
| Light neutral backgrounds | `logo.svg` | Full color version looks best |

### Size Recommendations

| Context | Recommended Size | Examples |
|---------|------------------|----------|
| Main branding (splash) | 80px - 120px | Splash.vue, SetupWizard.vue |
| Sidebar/navigation | 24px - 32px | Sidebar.vue |
| Dialogs | 48px - 64px | AboutDialog.vue |
| Page headers | Not currently used (space constraint) | - |
| Inline/mark | 16px - 24px | logo-mark.svg (future) |

---

## 🚀 Future Enhancement Opportunities

### High Priority (Would Add Value)
- [ ] **PageHeader.vue** - Add subtle logo-mark in navigation group
- [ ] **PrintView.vue** - Add company logo to print preview headers
- [ ] **Dialog.vue** - Optional company branding in dialog headers

### Medium Priority (Nice to Have)
- [ ] Use `logo-mark.svg` for compact spaces
- [ ] Add logo to export/import wizard headers
- [ ] Display logo in POS mode headers

### Low Priority
- [ ] Modal headers (generic component, not company-specific)
- [ ] Form headers (would clutter compact layouts)

---

## ✨ Best Practices

1. **Always check background color** before choosing logo variant
2. **Use appropriate file paths**:
   - From `src/components/` → `../assets/brand/filename.svg`
   - From `src/pages/` → `../../assets/brand/filename.svg` (nested dirs may need more `../`)
3. **Set proper dimensions** to maintain aspect ratio:
   - Use CSS `height` or `style` attribute with `max-width` constraint
   - Add `object-contain` class for consistent scaling
4. **Use conditional rendering** for optional logos:
   - `v-if="print.displayLogo"` for dynamic settings
5. **Keep logo spacing** - don't crop or stretch, maintain margins

---

## 📋 Implementation Checklist

- [x] logo.svg - Deployed in DatabaseSelector
- [x] logo-light.svg - Deployed in Sidebar, Splash, SetupWizard  
- [x] logo-dark.svg - Deployed in AboutDialog
- [x] Print template logos - Using print.logo attachment field
- [x] All paths verified - No typos, correct relative paths
- [x] All backgrounds appropriate - Logo colors match backgrounds
- [x] Logo-mark.svg - Available for future use

---

## 🔗 Related Files
- Brand guidelines: `/src/assets/brand/README.md`
- Print settings schema: `/schemas/app/PrintSettings.json`
- Print templates: `/templates/*.template.html`
- Setup wizard: `/src/pages/SetupWizard/SetupWizard.vue`

---

**Last Updated:** 2026-05-03  
**Status:** All logos implemented correctly ✓
