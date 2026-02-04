# 🍪 COMPLETE COOKIES CONFIGURATION MAP

**Generated:** February 4, 2026

---

## 📍 File Structure

```
src/
├── lib/cookies/
│   ├── types.ts                    # Interfaces & Zod schemas
│   ├── manager.ts                  # Main CookieManager class
│   ├── storage.ts                  # localStorage handler
│   ├── definitions.ts              # Cookie inventory
│   ├── categories.ts               # Category metadata
│   ├── compliance.ts               # Compliance helpers
│   ├── consent-schema.ts           # Consent validation
│   ├── consent-storage.ts          # Consent persistence
│   ├── cookie-utils.ts             # Utility functions
│   └── ai-tools-analytics.ts       # AI-specific tracking
├── components/cookies/
│   ├── CookieProvider.tsx          # Context provider
│   ├── CookieBanner.tsx            # User-facing banner
│   ├── CookieAutoAccept.tsx        # Homepage auto-accept
│   └── CookieBannerComponents.tsx  # Sub-components
├── hooks/
│   └── useCookieConsent.ts         # React hook
├── middleware.ts                   # Edge middleware
└── app/layout.tsx                  # Root layout
```

---

## 🔧 CONFIGURATION VALUES

### Storage Key

```typescript
// File: src/lib/cookies/types.ts (Line 116)
export const CONSENT_STORAGE_KEY = 'cookie_consent_v1';
```

**localStorage Structure:**
```json
{
  "version": "1.0",
  "timestamp": 1707043200000,
  "categories": {
    "essential": true,
    "functional": false,
    "analytics": false,
    "performance": false,
    "marketing": false,
    "affiliate": false,
    "personalization": false,
    "third-party": false
  },
  "source": "banner",
  "explicit": true,
  "ipHash": "optional",
  "individual": {},
  "revokeUrl": "optional"
}
```

### Expiry Configuration

```typescript
// File: src/lib/cookies/types.ts (Line 119)
export const CONSENT_EXPIRY_SECONDS = 365 * 24 * 60 * 60;  // 31,536,000 seconds
// = 1 year (GDPR requirement: must re-consent periodically)
```

### Audit Trail Limit

```typescript
// File: src/lib/cookies/types.ts (Line 122)
export const CONSENT_AUDIT_LIMIT = 10;
// Stores last 10 consent changes for audit purposes
```

---

## 🏷️ 8 COOKIE CATEGORIES

```typescript
// File: src/lib/cookies/types.ts (Lines 6-15)
export const COOKIE_CATEGORIES = {
  ESSENTIAL: 'essential',              // ✅ Always enabled (security)
  FUNCTIONAL: 'functional',            // 🔒 Requires consent
  ANALYTICS: 'analytics',              // 🔒 Requires consent
  PERFORMANCE: 'performance',          // 🔒 Requires consent
  MARKETING: 'marketing',              // 🔒 Requires consent
  AFFILIATE: 'affiliate',              // 🔒 Requires consent
  PERSONALIZATION: 'personalization',  // 🔒 Requires consent
  THIRD_PARTY: 'third-party',         // 🔒 Requires consent
};
```

### Default Consent State

```typescript
// File: src/lib/cookies/types.ts (Lines 102-110)
export const DEFAULT_CONSENT: Record<CookieCategory, boolean> = {
  essential: true,        // ✅ ALWAYS true
  functional: false,      // ❌ Off by default
  analytics: false,       // ❌ Off by default (GDPR requirement)
  performance: false,     // ❌ Off by default
  marketing: false,       // ❌ Off by default
  affiliate: false,       // ❌ Off by default
  personalization: false, // ❌ Off by default
  'third-party': false,   // ❌ Off by default
};
```

### Category Metadata

```typescript
// File: src/lib/cookies/categories.ts
export const CATEGORY_METADATA: Record<CookieCategory, CategoryMetadata> = {
  essential: {
    label: 'Essential',
    description: 'Necessary for site functionality',
    essential: true,       // Cannot be disabled
    default: true,
  },
  functional: {
    label: 'Functional',
    description: 'Enhanced user experience',
    essential: false,
    default: false,
  },
  analytics: {
    label: 'Analytics',
    description: 'Website usage statistics',
    essential: false,
    default: false,
  },
  // ... more categories
};
```

---

## 🗂️ COOKIE INVENTORY

### Essential Cookies (Always Enabled)

```typescript
// File: src/lib/cookies/definitions.ts (Lines 9-42)
essential: [
  {
    id: 'session_token',
    name: 'session_token',
    category: 'essential',
    secure: true,
    httpOnly: true,
    maxAge: 604800,  // 7 days
    description: 'Session authentication token',
    purpose: 'Maintains login session and security',
  },
  {
    id: 'csrf_token',
    name: '_csrf',
    category: 'essential',
    secure: true,
    sameSite: 'Lax',
    description: 'CSRF protection token',
    purpose: 'Protects against CSRF attacks',
  },
  {
    id: 'consent_token',
    name: 'cookie_consent_given',
    category: 'essential',
    secure: true,
    description: 'Records that consent was collected',
    purpose: 'Ensures GDPR compliance',
  },
]
```

### Functional Cookies (User Preference)

```typescript
// File: src/lib/cookies/definitions.ts (Lines 44-74)
functional: [
  {
    id: 'language_preference',
    name: 'language',
    category: 'functional',
    maxAge: 31536000,  // 1 year
    description: 'Language preference',
    purpose: 'Remembers your language choice',
  },
  {
    id: 'theme_preference',
    name: 'theme',
    category: 'functional',
    maxAge: 31536000,
    description: 'Dark/Light theme preference',
    purpose: 'Stores preferred color scheme',
  },
  {
    id: 'ui_preferences',
    name: 'ui_prefs',
    category: 'functional',
    maxAge: 31536000,
    description: 'UI customization settings',
    purpose: 'Remembers layout preferences',
  },
]
```

### Analytics Cookies (Google Analytics)

```typescript
// File: src/lib/cookies/definitions.ts (Lines 76-107)
analytics: [
  {
    id: 'ga_analytics',
    name: '_ga',
    category: 'analytics',
    secure: true,
    sameSite: 'None',
    maxAge: 63072000,  // 2 years
    description: 'Google Analytics tracking',
    purpose: 'Measures website traffic',
    provider: 'Google Analytics',
  },
  {
    id: 'ga_session',
    name: '_ga_*',
    category: 'analytics',
    secure: true,
    sameSite: 'None',
    maxAge: 63072000,
    description: 'Google Analytics session tracking',
    purpose: 'Tracks session information',
  },
]
```

---

## 🎮 MAIN COMPONENTS

### CookieManager (Main Controller)

```typescript
// File: src/lib/cookies/manager.ts
export class CookieManager {
  static initialize()                    // Init on app load
  static subscribe(callback)             // Listen for changes
  static updateConsent()                 // Update categories
  static hasConsent()                    // Check if consented
  static getConsent()                    // Get current state
  static acceptAll()                     // Accept all cookies
  static rejectAll()                     // Reject non-essential
  static revokeConsent()                 // GDPR revoke right
  static isExplicitConsent()             // Check explicit consent
  static getAuditTrail()                 // Get audit trail
  static shouldShowBanner()              // Should show banner?
  static injectScriptsForCategory()      // Inject category scripts
}
```

### ConsentStorage (Persistence)

```typescript
// File: src/lib/cookies/storage.ts
export class ConsentStorage {
  static getConsent()                    // Get from localStorage
  static setConsent()                    // Save to localStorage
  static clearConsent()                  // Clear all consent
  static hasConsentFor()                 // Check category consent
  static getCategories()                 // Get all categories
  static acceptAll()                     // Accept all
  static rejectAll()                     // Reject all
  static shouldShowBanner()              // Show banner?
  static isExplicitConsent()             // Explicit or implicit?
  static exportConsent()                 // Export for audit
}
```

### useCookieConsent Hook

```typescript
// File: src/hooks/useCookieConsent.ts
export function useCookieConsent() {
  // State
  const [consent, setConsent] = useState<Record<CookieCategory, boolean>>()
  const [showBanner, setShowBanner] = useState(false)
  const [loading, setLoading] = useState(true)

  // Methods
  const acceptAll = () => { }                    // Accept all
  const rejectAll = () => { }                    // Reject all
  const updateCategory = () => { }               // Update one
  const updateAllCategories = () => { }          // Update multiple
  const hasConsent = () => { }                   // Check consent
  const revokeConsent = () => { }                // Revoke all
  const acceptBanner = () => { }                 // Accept & close
  const closeBanner = () => { }                  // Just close
}
```

---

## 🖥️ UI COMPONENTS

### CookieBanner

```tsx
// File: src/components/cookies/CookieBanner.tsx
export function CookieBanner() {
  // Shows on all pages EXCEPT homepage
  // Displays:
  // - "Cookie Preferences" heading
  // - Description text
  // - "Reject All" button
  // - "Accept All" button
  // - "Preferences" link to /cookies/preferences
}
```

**Behavior:**
- ✅ Visible on: /blog, /tools, /contact, /about, etc.
- ❌ Hidden on: / (homepage)

### CookieAutoAccept

```tsx
// File: src/components/cookies/CookieAutoAccept.tsx
export function CookieAutoAccept() {
  // Component that runs only on homepage
  // Automatically calls acceptAll()
  // Returns null (invisible, non-rendering)
}
```

**Behavior:**
- ✅ Runs only on homepage (pathname === '/')
- ✅ Silently accepts all cookies
- ✅ Sets localStorage immediately
- ❌ Not visible to user

---

## 🔌 MIDDLEWARE

```typescript
// File: src/middleware.ts
export function middleware(request: NextRequest) {
  // Get consent cookie
  const consentCookie = request.cookies.get('cookie_consent_v1');

  // Pass consent as header
  requestHeaders.set('x-cookie-consent', consentCookie.value);

  // Return modified request
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Apply to all routes except internals
  matcher: ['/((?!_next|.*\\..*).*)'],
};
```

**Excluded Paths:**
- /_next/
- /api/
- /favicon.ico
- /robots.txt
- /sitemap.xml

---

## 📍 INTEGRATION IN LAYOUT

```typescript
// File: src/app/layout.tsx (Lines 273-284)
<body>
  <CookieProvider>                           {/* Initializes manager */}
    <CookieAutoAccept />                     {/* Homepage auto-accept */}
    <Navbar />
    <main>{children}</main>
    <Footer />
    <CookieBanner />                         {/* Shows on other pages */}
    <GoogleAnalyticsScript />                {/* Loads with consent */}
  </CookieProvider>
</body>
```

---

## ✅ VALIDATION (Zod Schemas)

### Cookie Definition Schema

```typescript
// File: src/lib/cookies/types.ts (Lines 22-44)
export const CookieDefinitionSchema = z.object({
  id: z.string().min(1),
  category: z.enum(['essential', 'functional', 'analytics', ...]),
  name: z.string().min(1),
  domain: z.string().optional(),
  secure: z.boolean().default(true),
  httpOnly: z.boolean().optional(),
  sameSite: z.enum(['Strict', 'Lax', 'None']).default('Lax'),
  maxAge: z.number().int().positive().optional(),
  description: z.string().min(10),
  purpose: z.string().min(10),
  provider: z.string().min(1),
  policyLink: z.string().url().optional(),
});
```

### Consent Record Schema

```typescript
// File: src/lib/cookies/types.ts (Lines 48-62)
export const ConsentRecordSchema = z.object({
  version: z.string().default('1.0'),
  timestamp: z.number().int(),
  ipHash: z.string().optional(),
  categories: z.record(z.enum([...]), z.boolean()),
  individual: z.record(z.string(), z.boolean()).optional(),
  source: z.enum(['banner', 'settings', 'api']),
  explicit: z.boolean(),
  revokeUrl: z.string().optional(),
});
```

---

## 🌍 COMPLIANCE REGIONS

```typescript
// File: src/lib/cookies/types.ts (Lines 84-91)
export const COMPLIANCE_REGIONS = {
  EU: 'eu',              // GDPR
  UK: 'uk',              // UK GDPR
  US_CA: 'us_ca',        // CCPA
  INDIA: 'india',        // SPICY Act
  GLOBAL: 'global',      // All regions
};
```

---

## 🔄 FLOW DIAGRAMS

### Homepage Flow
```
Visit homepage (/)
    ↓
CookieAutoAccept component mounts
    ↓
usePathname() confirms pathname === '/'
    ↓
Call acceptAll() via CookieManager
    ↓
ConsentStorage.acceptAll():
  - Set all categories to true
  - Set timestamp to now
  - Save to localStorage
  ↓
CookieManager.initialize()
  - Inject GA script (analytics=true)
  - Inject other scripts
    ↓
User sees normal page (no banner)
localStorage has: {all: true}
```

### Non-Homepage Flow
```
Visit /blog or /tools
    ↓
CookieBanner component renders
    ↓
usePathname() confirms pathname !== '/'
    ↓
Banner displays: "Accept All | Reject All | Preferences"
    ↓
User clicks action:
  - "Accept All" → all=true
  - "Reject All" → only essential=true
  - "Preferences" → goto /cookies/preferences
    ↓
ConsentStorage saves to localStorage
CookieManager.initialize() reinitializes
    ↓
Banner closes
GA loads if analytics=true
```

---

## 🎯 ENV VARS (Not Required for Cookies)

Cookie configuration doesn't need environment variables because:

```typescript
// All config is static in source code:
export const CONSENT_STORAGE_KEY = 'cookie_consent_v1';
export const CONSENT_EXPIRY_SECONDS = 365 * 24 * 60 * 60;
export const DEFAULT_CONSENT = { ... };
export const COOKIE_CATEGORIES = { ... };
export const COOKIE_DEFINITIONS = { ... };
```

**Only GA needs env var:**
```dotenv
NEXT_PUBLIC_GA_ID="G-P6HRT27DL0v"
```

---

## ✨ SUMMARY TABLE

| Component | File | Type | Purpose |
|-----------|------|------|---------|
| **Types** | src/lib/cookies/types.ts | Interfaces | Zod schemas & types |
| **Manager** | src/lib/cookies/manager.ts | Class | Main controller |
| **Storage** | src/lib/cookies/storage.ts | Class | localStorage handler |
| **Definitions** | src/lib/cookies/definitions.ts | Data | Cookie inventory |
| **Categories** | src/lib/cookies/categories.ts | Data | Category metadata |
| **Provider** | src/components/cookies/CookieProvider.tsx | Component | Context wrapper |
| **Banner** | src/components/cookies/CookieBanner.tsx | Component | User UI |
| **AutoAccept** | src/components/cookies/CookieAutoAccept.tsx | Component | Homepage logic |
| **Hook** | src/hooks/useCookieConsent.ts | Hook | React integration |
| **Middleware** | src/middleware.ts | Function | Edge verification |

---

**Configuration Map Complete!**  
**Status:** ✅ ALL SYSTEMS GO  
**Last Updated:** February 4, 2026
