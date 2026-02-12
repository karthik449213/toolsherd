# 📋 New AI Tool JSON Template - Usage Procedure (2026)

## Overview

This guide walks you through the **updated JSON template structure** for adding AI tools to the dashboard. The new template includes enhanced fields for **Featured**, **Verified**, and **Trending** status indicators, plus improved SEO and pricing information.

---

## 🎯 Quick Start (Copy-Paste Method)

### Step 1: Copy the Template
Go to `JSON_TEMPLATES.md` and copy the **TOOL JSON TEMPLATE (Updated - 2026)** section (just the JSON, not the markdown).

### Step 2: Fill in Your Tool Data
Replace the example values with your tool's information:

```json
{
  "name": "Your Tool Name",
  "slug": "your-tool-slug",
  "company_name": "Company Name",
  "website_url": "https://example.com",
  "affiliate_url": "https://affiliate-link.com",  // Optional
  
  "logo_url": "/logos/your-tool.png",
  
  "categories": ["ai_productivity", "ai_agents"],
  "tags": ["tag1", "tag2", "tag3"],
  
  "short_description": "One-line description of the tool",
  "detailed_description": "2-3 paragraph description explaining what the tool does...",
  
  // Continue with other fields...
}
```

### Step 3: Paste into Admin Dashboard
1. Go to **Admin Dashboard** → **Tools** → **Create New Tool**
2. Paste the entire JSON into the input field
3. Click **"Parse & Validate"**
4. If validation passes, upload logo/images
5. Click **"Publish"**

---

## 📝 Field Descriptions & How to Fill Them

### Basic Information

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | String | Official tool name | "ChatGPT" |
| `slug` | String | URL-friendly identifier (lowercase, no spaces) | "chatgpt" |
| `company_name` | String | Company that created the tool | "OpenAI" |
| `website_url` | String | Official website URL | "https://chatgpt.com" |
| `affiliate_url` | String | (Optional) Affiliate link for referrals | "https://affiliate.example.com" |
| `logo_url` | String | Path to logo (stored in `/public/logos/`) | "/logos/chatgpt.png" |

### Categorization

#### `categories` (Array)
Select **1-3 primary categories** for the tool:

```
"categories": ["ai_agents", "ai_productivity"]
```

**Available Categories:**
- `ai_agents` - AI Agents & Autonomous Systems
- `agentic_ai` - Agentic AI & Multi-Agent Workflows
- `no_code_ai` - No-Code & Low-Code AI Builders
- `ai_automation` - AI Automation & Workflow Tools
- `ai_seo` - AI SEO & Search Growth Tools
- `ai_content_engines` - AI Content Engines
- `ai_creative_tools` - AI Creative Tools (Video, Image, Audio)
- `ai_business_growth` - AI for Business, Sales & Lead Gen
- `ai_ecommerce` - AI for E-Commerce & Dropshipping
- `ai_productivity` - AI Productivity & Personal Assistants
- `ai_saas_builders` - AI SaaS Builders

#### `tags` (Array)
Add **5-10 relevant tags** for better discoverability:

```
"tags": [
  "conversational-ai",
  "content-generation",
  "coding-assistant",
  "research-tool",
  "productivity-booster"
]
```

### Descriptions

#### `short_description`
One-line summary (~60 characters):
```
"An AI-powered chatbot that answers questions and helps with various tasks."
```

#### `detailed_description`
2-3 paragraphs explaining the tool in detail:
```
"ChatGPT is a large language model developed by OpenAI that can engage in natural conversations..."
```

### Features & Use Cases

#### `key_features` (Array of Objects)
List **5-6 main features**:

```json
"key_features": [
  {
    "title": "Feature Name",
    "description": "What this feature does and its benefit"
  }
]
```

#### `use_cases` (Array)
List **5-6 real-world use cases**:

```json
"use_cases": [
  "Write professional emails and documents in minutes",
  "Debug code and get programming explanations instantly"
]
```

### Pricing Information

#### `pricing` (Object)
Overall pricing structure:

```json
"pricing": {
  "pricing_model": "freemium",  // or "free", "paid", "subscription"
  "starting_price": 0,
  "currency": "USD",
  "billing_cycle": "per-month"  // or "one-time", "per-seat/month"
}
```

#### `pricing_tiers` (Array)
Detailed pricing tiers:

```json
"pricing_tiers": [
  {
    "name": "Free",
    "price": 0,
    "price_label": "$0/month",
    "features": [
      "Basic access",
      "Limited requests"
    ]
  },
  {
    "name": "Pro",
    "price": 20,
    "price_label": "$20/month",
    "features": [
      "Unlimited access",
      "Priority support"
    ]
  }
]
```

### Pros & Cons

#### `pros` (Array)
List **3-4 main advantages**:

```json
"pros": [
  "Highly versatile and capable AI",
  "Excellent for writing and coding",
  "Large and supportive community"
]
```

#### `cons` (Array)
List **2-3 limitations**:

```json
"cons": [
  "Limited context window for very long conversations",
  "Occasional factual inaccuracies",
  "Requires internet connection"
]
```

### Target Audience

```json
"target_audience": "Students, professionals, developers, writers, and anyone who needs AI assistance"
```

### Ratings & User Count

```json
"rating": 4.8,                    // Scale: 0-5
"review_count": 500000,           // Number of reviews
"user_count_estimate": 180000000  // Estimated total users
```

### SEO Information

#### `seo` (Object)
SEO metadata for search engines:

```json
"seo": {
  "seo_title": "ChatGPT Review 2026: Features, Pricing & AI Capabilities",
  "seo_description": "Detailed ChatGPT review covering features, pricing tiers, AI capabilities, pros & cons...",
  "focus_keyword": "ChatGPT review"
}
```

**Tips:**
- Include main keyword in title and description
- Keep description under 160 characters
- Use natural, compelling language

### Status & Featured/Verified/Trending

#### `status` (Object)
Control which sections the tool appears in:

```json
"status": {
  "is_featured": true,    // Shows in Featured section
  "is_verified": true,    // Shows verified badge on card
  "is_trending": true     // Shows trending badge on card
}
```

**How They Work:**
- **`is_featured: true`** → Tool appears in the **Featured Tools** section at the top
- **`is_verified: true`** → Shows **"✓ Verified"** badge on the tool card
- **`is_trending: true`** → Shows **"🔥 Trending"** badge on the tool card

### Last Updated Date

```json
"last_updated": "2026-02-11"  // Format: YYYY-MM-DD
```

---

## 🎯 Dashboard Sections Explained

### 1. **Featured Tools Section** (Top of Page)
- Shows tools where `is_featured: true`
- Displays in a special highlighted section
- **Purpose:** Showcase premium/important tools
- **When to use:** New major tools, partnerships, high-value offerings

### 2. **Verified Badge** (On Every Tool Card)
- Shows where `is_verified: true`
- Appears with a checkmark (✓) on the card
- **Purpose:** Build trust with users
- **When to use:** Tools verified by your team, official partnerships, confirmed information

### 3. **Trending Badge** (On Every Tool Card)
- Shows where `is_trending: true`
- Appears with a fire emoji (🔥) on the card
- **Purpose:** Highlight popular/hot tools
- **When to use:** Tools gaining momentum, increased user adoption, viral tools

---

## ✅ Validation Checklist

Before publishing, verify:

- [ ] All required fields are filled (name, slug, website_url, etc.)
- [ ] `slug` is unique and URL-friendly (lowercase, hyphens only)
- [ ] At least 1 category is selected
- [ ] At least 5 tags provided
- [ ] Descriptions are clear and compelling
- [ ] All key_features have title and description
- [ ] At least 2 pricing tiers defined
- [ ] Ratings are between 0-5
- [ ] User count estimate is realistic
- [ ] SEO title < 60 characters
- [ ] SEO description < 160 characters
- [ ] Logo upload is complete (if applicable)
- [ ] Last_updated date is current

---

## 🔄 Updating Featured/Verified/Trending Status

To modify status for an existing tool:

1. Go to **Admin Dashboard** → **Tools** → **Edit Tool**
2. Scroll to the **Status** section
3. Toggle the checkboxes:
   - ☑️ **Featured** - Shows in featured section
   - ☑️ **Verified** - Shows verified badge
   - ☑️ **Trending** - Shows trending badge
4. Click **"Update"**

---

## 📊 Common Scenarios

### Scenario 1: Launching a New Partner Tool
```json
{
  "is_featured": true,   // Put it on homepage
  "is_verified": true,   // Mark as verified partnership
  "is_trending": false   // Wait for actual usage data
}
```

### Scenario 2: Tool Going Viral
```json
{
  "is_featured": false,  // Keep featured section for selected tools
  "is_verified": true,   // Already verified
  "is_trending": true    // Mark as trending
}
```

### Scenario 3: Regular Tool Addition
```json
{
  "is_featured": false,  // Not featured yet
  "is_verified": false,  // Verify once added
  "is_trending": false   // Monitor for trends
}
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| JSON won't parse | Check for missing commas, invalid quotes, trailing commas |
| Logo not showing | Ensure logo is uploaded to `/public/logos/` and path is correct |
| SEO not updating | Clear browser cache or wait for next reindex |
| Cards not showing status | Verify `status` object fields are boolean (`true`/`false`) |

---

## 📌 Key Differences from Old Template

| Old Field | New Field(s) | Change |
|-----------|--------------|--------|
| `category` | `categories[]` | Now supports multiple categories |
| `description` | `short_description` | Renamed for clarity |
| `seo_keywords[]` | `seo.focus_keyword` | Simplified SEO structure |
| `price: "string"` | `price: number, price_label: string` | Separated numeric price from display label |
| NA | `company_name` | New field for company info |
| NA | `affiliate_url` | New field for affiliate links |
| NA | `pros[]`, `cons[]` | New fields for advantages/disadvantages |
| NA | `status{}` | New object for featured/verified/trending |
| `user_count` | `user_count_estimate` | Renamed for clarity |
| NA | `review_count` | New field for review count |

---

## 🚀 Best Practices

1. **Be Consistent:** Use the same tone/style across all tool descriptions
2. **Be Honest:** Include real pros and cons, not just marketing speak
3. **Update Regularly:** Keep `last_updated` date current and accurate
4. **Use Tags Wisely:** Think about how users will search for this tool
5. **Pricing Clarity:** Always include a `price_label` that matches your `price` value
6. **Quality Images:** Use high-resolution logos (preferably PNG with transparency)
7. **Expert Review:** Have someone review before marking as `is_verified: true`

---

## 📞 Need Help?

- Check `JSON_TEMPLATES.md` for example templates
- Review the **Validation Checklist** above
- Compare with an existing tool's data in the database
- Check browser console for validation error messages

