# 🎨 TOOL IMAGE DIMENSIONS - QUICK REFERENCE

---

## 📐 CANVA SETUP (Copy These Values)

### Exact Dimensions to Use in Canva

```
Width:  600  px
Height: 600  px
Ratio:  1:1 (Square)
```

---

## 📍 HOW IT DISPLAYS ON WEBSITE

### DESKTOP (≥768px screens)
```
Left side of page:
┌──────────────────────────┐
│                          │
│      YOUR IMAGE          │
│      (448 × 448px)       │  ← Displayed size
│      ↑ from your         │
│      600 × 600px file    │
│                          │
└──────────────────────────┘

Right side: Tool info, buttons, description
```

### MOBILE (<768px screens)
```
Full width centered:
┌──────────────────────────┐
│      YOUR IMAGE          │
│   (Responsive width)     │
│   (1:1 aspect ratio)     │
│                          │
└──────────────────────────┘

Below: Tool info, buttons, description
```

---

## ✅ WHAT TO CREATE IN CANVA

**Size:** 600 × 600 pixels  
**Shape:** Square  
**Format:** PNG (transparent) or JPG  
**File Size:** Max 5MB (target: <500KB)

### Design Area (Safe Zone)

```
600px Total
├─ 20px Padding (Top)
├─ 560px Content Area ← Keep design here
├─ 20px Padding (Bottom)
└─ Total = 600px

560px × 560px = Safe area for your design
40px = Total padding (20px each side)
```

---

## 🎯 DESIGN TIPS

| DO ✅ | DON'T ❌ |
|-----|--------|
| Square format (1:1) | Rectangular shapes |
| High contrast colors | Light backgrounds |
| Dark or transparent BG | White or light colors |
| 20px padding margins | Content touching edges |
| Large, bold text | Small text |
| Centered composition | Off-center random placement |
| < 500KB file size | Files > 5MB |
| PNG with transparency | Blurry JPG images |

---

## 🎨 COLOR SUGGESTIONS

**Best Colors:**
- 🔵 Dark: #1a1a2e, #0f172a
- 🔵 Cyan/Accent: #06b6d4, #0ea5e9
- ⚪ Light Text: #e2e8f0, #f1f5f9

**Avoid:**
- ❌ Pure white (#ffffff)
- ❌ Yellow/orange
- ❌ Light pastels

---

## 📤 UPLOAD STEPS

1. **Design in Canva** (600×600px)
2. **Export as PNG** (transparent background)
3. **Optimize (optional):** Use tinypng.com to compress
4. **Upload to website:**
   - Go to `/admin/tools/manage`
   - Click tool image
   - Upload file
   - Done! ✅

---

## 📊 SIZE COMPARISON

```
Canva Design Size:     600px × 600px
Displayed on Desktop:  448px × 448px (74% of original)
Displayed on Mobile:   Full width - 32px padding
Quality Level:         High (no upscaling)
```

---

## 🎬 QUICK START

```
1. Open canva.com
2. Click "Create a design"
3. Select "Custom size"
   - Width: 600
   - Height: 600
   - Unit: px
4. Click "Create"
5. Design your tool banner
6. Export as PNG
7. Upload to website
✅ Done!
```

---

## 📁 CURRENT WEBSITE CONTAINER

The website now displays your image in:

```tsx
{/* Desktop & Mobile Container */}
<div className="relative w-full max-w-md aspect-square 
    bg-slate-800/40 
    border-2 border-cyan-500/30 
    rounded-2xl 
    overflow-hidden 
    shadow-glow-medium">
  {/* Your 600×600px image scales to fit */}
</div>

Sizes:
├─ Desktop: 448px × 448px
├─ Tablet: Responsive to screen
├─ Mobile: Full width - 32px
└─ All maintain 1:1 ratio ✅
```

---

**That's it! Use 600×600px in Canva** 🎉

For detailed guide, see: `TOOL_IMAGE_CANVA_DIMENSIONS.md`
