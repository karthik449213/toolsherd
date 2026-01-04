# Environment Variables Configuration Guide

This document outlines all environment variables needed for the Tools Herd AI project.

## Local Development (.env.local)

Create a `.env.local` file in the root directory with these variables:

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://pkjgladwgxzyqamrwnds.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# ============================================
# SITE CONFIGURATION
# ============================================
# Your domain (without trailing slash)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ============================================
# SEO & VERIFICATION
# ============================================
# Google Search Console verification code
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code

# Bing Webmaster Tools verification code
NEXT_PUBLIC_BING_VERIFICATION=your_bing_verification_code

# ============================================
# ANALYTICS (Optional)
# ============================================
# Google Analytics ID (format: G-XXXXXXXXXX)
NEXT_PUBLIC_GA_ID=

# ============================================
# API KEYS (Future use)
# ============================================
# Stripe API Key (for payments)
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

# SendGrid API Key (for emails)
SENDGRID_API_KEY=

# ============================================
# FEATURE FLAGS
# ============================================
# Enable/disable features during development
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false
NEXT_PUBLIC_ENABLE_PREMIUM_FEATURES=true
```

## Production (Vercel Environment Variables)

When deploying to Vercel, set these variables in your Vercel project settings:

### 1. Go to Vercel Project Settings
- Navigate to your project in Vercel dashboard
- Click "Settings" → "Environment Variables"

### 2. Add Production Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://pkjgladwgxzyqamrwnds.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key>
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=<your-code>
NEXT_PUBLIC_BING_VERIFICATION=<your-code>
NEXT_PUBLIC_GA_ID=<your-ga-id>
STRIPE_PUBLIC_KEY=<your-stripe-public-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
SENDGRID_API_KEY=<your-sendgrid-key>
```

### 3. Environment-Specific Variables

For different environments (development, preview, production), set accordingly:

**Development:**
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- `NEXT_PUBLIC_ENABLE_BETA_FEATURES=true`

**Preview (Staging):**
- `NEXT_PUBLIC_SITE_URL=https://preview.yourdomain.com`
- `NEXT_PUBLIC_ENABLE_BETA_FEATURES=true`

**Production:**
- `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
- `NEXT_PUBLIC_ENABLE_BETA_FEATURES=false`

## How to Get Each Key

### Supabase Keys
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click "Settings" → "API"
4. Copy `ANON_KEY` and `PROJECT_URL`

### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain property
3. Copy the verification code shown

### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Copy the verification code

### Google Analytics
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property for your domain
3. Get your Measurement ID (format: G-XXXXXXXXXX)

### Stripe (For Payments)
1. Create account at [Stripe](https://stripe.com)
2. Go to Dashboard → API Keys
3. Copy your Publishable and Secret keys
4. **NEVER commit Secret Key to git**

### SendGrid (For Emails)
1. Create account at [SendGrid](https://sendgrid.com)
2. Go to Settings → API Keys
3. Create a new API key
4. Copy the key

## Security Best Practices

✅ **DO:**
- Keep `STRIPE_SECRET_KEY` and API keys secure
- Never commit `.env.local` to git
- Use Vercel's secure environment variable storage
- Rotate API keys regularly
- Use different keys for different environments

❌ **DON'T:**
- Commit `.env.local` or `.env` files to git
- Share API keys publicly
- Use the same keys across environments
- Log sensitive keys to console
- Hardcode keys in source code

## .gitignore

Ensure your `.gitignore` includes:

```
# Environment variables
.env
.env.local
.env.*.local

# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Build output
.next/
out/
build/

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
```

## Vercel Deployment Checklist

- [ ] All variables set in Vercel environment settings
- [ ] Different values for preview and production
- [ ] No secrets committed to git
- [ ] Domain configured in Vercel project settings
- [ ] Custom domain DNS records set (if using custom domain)
- [ ] Google Search Console verification added
- [ ] Bing Webmaster Tools verification added
- [ ] Google Analytics enabled
- [ ] Staging domain tested
- [ ] Production domain tested

## Testing Environment Variables

To verify your environment variables are loaded correctly:

1. **Locally:**
   ```bash
   npm run dev
   # Check browser console for any warnings
   ```

2. **In Vercel Preview:**
   - Deploy a preview build
   - Check that Supabase data loads
   - Check that analytics fires

3. **In Production:**
   - Verify all features work
   - Check Google Search Console for errors
   - Verify analytics are tracking

## Common Issues

### "Failed to fetch blog posts"
- Check `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` has read permissions
- Verify Supabase project is active

### "Google Analytics not tracking"
- Verify `NEXT_PUBLIC_GA_ID` is correct format (G-XXXXXXXXXX)
- Check Google Analytics property is configured
- Allow 24 hours for data to appear

### "Sitemap not updating"
- Check `NEXT_PUBLIC_SITE_URL` is correct
- Verify blog posts are marked as published
- Check Supabase connection

### "Vercel Deployment Failing"
- Ensure all required variables are set
- Check for typos in variable names
- Verify variables are set for correct environment
- Check build logs in Vercel dashboard

## Next Steps

1. Set up all environment variables locally
2. Test application works with your variables
3. Deploy to Vercel
4. Set environment variables in Vercel
5. Verify staging build works
6. Set custom domain
7. Verify production works
8. Submit to Google Search Console
9. Submit to Bing Webmaster Tools
10. Enable Google Analytics

For more help, see [Vercel Environment Variables Docs](https://vercel.com/docs/projects/environment-variables)
