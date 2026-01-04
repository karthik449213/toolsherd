# Vercel Deployment & Pre-Launch Guide

Complete guide to deploy Tools Herd AI to Vercel and prepare for public launch.

---

## 📋 Pre-Launch Checklist (Do These First)

### Week 1: Setup & Configuration

- [ ] **Domain Registration**
  - [ ] Register domain (toolsherd.ai or similar)
  - [ ] Verify domain ownership
  - [ ] Get access to domain registrar

- [ ] **Project Preparation**
  - [ ] Review all code for secrets/API keys
  - [ ] Update all hardcoded URLs to use `NEXT_PUBLIC_SITE_URL`
  - [ ] Ensure `.env.local` is in `.gitignore`
  - [ ] Update SEO metadata
  - [ ] Check all links are relative (not hardcoded domains)

- [ ] **Performance Optimization**
  - [ ] Run lighthouse audit locally: `npm run build`
  - [ ] Optimize images for web
  - [ ] Test on slow 3G connection
  - [ ] Check Core Web Vitals

- [ ] **Content Review**
  - [ ] All blog posts are polished
  - [ ] Tool descriptions are accurate
  - [ ] Categories are properly set
  - [ ] No placeholder content

### Week 2: Service Setup

- [ ] **Google Services**
  - [ ] Create Google Search Console account
  - [ ] Create Google Analytics 4 property
  - [ ] Get verification codes for both services

- [ ] **Bing Services**
  - [ ] Create Bing Webmaster Tools account
  - [ ] Get verification code

- [ ] **Analytics & Monitoring**
  - [ ] Set up Vercel Analytics
  - [ ] Enable Vercel Speed Insights
  - [ ] Configure error monitoring (Sentry optional)

- [ ] **Email Service (Optional for Pre-launch)**
  - [ ] Create SendGrid or Resend account (for later)
  - [ ] Set up email templates

### Week 3: Final Testing & Security

- [ ] **Security Audit**
  - [ ] No secrets in code or git history
  - [ ] HTTPS enforced
  - [ ] Security headers configured
  - [ ] XSS protection enabled
  - [ ] CSRF protection in place

- [ ] **SEO Audit**
  - [ ] robots.txt is correct
  - [ ] sitemap.xml generates properly
  - [ ] Meta tags on all pages
  - [ ] Open Graph images optimized
  - [ ] Canonical URLs correct

- [ ] **Functionality Testing**
  - [ ] Blog post loading works
  - [ ] Tool filtering works
  - [ ] Search functionality works
  - [ ] All links navigate correctly
  - [ ] No console errors
  - [ ] Mobile responsive on all pages

---

## 🚀 Step-by-Step Vercel Deployment

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
cd d:\aitools\toolsherd
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Tools Herd AI"

# Create repository on GitHub
# Then add remote:
git remote add origin https://github.com/yourusername/toolsherd.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

**Option A: Using Vercel Website**

1. Go to [vercel.com](https://vercel.com)
2. Sign up / Log in with GitHub
3. Click "New Project"
4. Select your GitHub repository (toolsherd)
5. Click "Import"

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd d:\aitools\toolsherd
vercel

# Follow the prompts:
# - Set project name: toolsherd
# - Set directory: ./
# - Override settings: No
```

### Step 3: Configure Project Settings

In Vercel Dashboard:

1. Go to your project: `toolsherd`
2. Click "Settings"

**General:**
- [ ] Root Directory: `.` (current directory)
- [ ] Framework: `Next.js` (auto-detected)
- [ ] Node.js Version: `20.x` (or latest LTS)

**Environment Variables:**

```
NEXT_PUBLIC_SUPABASE_URL=https://pkjgladwgxzyqamrwnds.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=https://staging.yourdomain.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_code
NEXT_PUBLIC_BING_VERIFICATION=your_code
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Build & Development Settings:**
- Build Command: `next build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm ci` (recommended for production)

**Domains:**
- [ ] Add your primary domain (yourdomain.com)
- [ ] Add www subdomain (www.yourdomain.com)
- [ ] Set primary domain if not already

### Step 4: Configure Custom Domain

**Prerequisites:**
- Domain must be registered
- You must own the domain
- Domain registrar must support DNS management

**Process:**

1. In Vercel Project Settings → Domains
2. Click "Add Domain"
3. Enter: `yourdomain.com`
4. Choose one of these DNS options:

**Option A: Vercel Nameservers (Recommended)**
- Copy nameservers provided by Vercel
- Go to your domain registrar
- Update nameservers to Vercel's
- Wait 24-48 hours for DNS propagation

**Option B: CNAME Record (If using existing nameservers)**
- Go to your domain registrar's DNS settings
- Add CNAME record:
  - Name: `yourdomain.com`
  - Value: `cname.vercel-dns.com`
- Wait for propagation

**Option C: A Record**
- Add A record pointing to: `76.76.19.0`

**Verify Domain:**
- Vercel will show verification status
- Once verified, SSL certificate auto-generates
- Takes 5-15 minutes after DNS updates

### Step 5: Set Up Redirects (for both www and non-www)

In `next.config.ts`, add:

```typescript
redirects: async () => {
  return [
    {
      source: '/:path*',
      destination: '/:path*',
      permanent: true,
    },
  ];
};
```

Or set redirect in Vercel dashboard:
- Redirect `www.yourdomain.com` to `yourdomain.com` (or vice versa)

---

## 🌐 Domain Configuration

### GoDaddy Example

1. Login to GoDaddy
2. Go to "Domains" → Select your domain
3. Click "DNS" button
4. For Vercel nameservers:
   - Remove default nameservers
   - Add Vercel nameservers:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`
     - `ns3.vercel-dns.com`
     - `ns4.vercel-dns.com`

### Namecheap Example

1. Login to Namecheap
2. Go to "Domain List"
3. Click "Manage" next to your domain
4. Go to "Nameservers"
5. Change to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`

### CloudFlare (If using CloudFlare for DNS)

1. Add domain to CloudFlare
2. Update nameservers at your registrar to CloudFlare's
3. In CloudFlare dashboard:
   - Add CNAME record: `yourdomain.com` → `cname.vercel-dns.com`
   - Or use Vercel's nameservers in CloudFlare DNS

---

## 📊 Post-Deployment: Submit to Search Engines

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "URL Prefix" property
3. Enter: `https://yourdomain.com`
4. Verify using one of these methods:
   - [ ] Meta tag (copy from GSC, paste in HTML head)
   - [ ] HTML file upload
   - [ ] DNS record
   - [ ] Google Analytics
   - [ ] Google Tag Manager

5. Once verified:
   - [ ] Submit sitemap: `https://yourdomain.com/sitemap.xml`
   - [ ] Request indexing for homepage
   - [ ] Submit top 10 blog posts
   - [ ] Check "Coverage" for errors
   - [ ] Check "Enhancements" for issues

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add new site
3. Verify domain:
   - [ ] Upload XML file
   - [ ] Add meta tag
   - [ ] Use CNAME record

4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

---

## 📈 Setup Analytics & Monitoring

### Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com)
2. Create new property for your domain
3. Get Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

5. Verify tracking is working:
   - Deploy to Vercel
   - Visit your website
   - Go to "Realtime" in Google Analytics
   - Should show yourself as active user

### Vercel Analytics (Built-in)

1. In Vercel Dashboard → Analytics tab
2. Enable "Web Analytics"
3. Enable "Speed Insights"
4. These are automatically tracked

---

## 🔒 Security Checklist

- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] No API keys in code
- [ ] No secrets in git history
- [ ] Environment variables properly set
- [ ] robots.txt allows Google/Bing
- [ ] Sitemap is accessible
- [ ] Security headers are configured
- [ ] CORS is properly set (if needed)
- [ ] Rate limiting configured (if needed)
- [ ] SQL injection protection (Supabase handles this)

---

## 🧪 Pre-Launch Testing

### Test Checklist

**Functionality:**
- [ ] Homepage loads fast
- [ ] Blog page loads all posts
- [ ] Individual blog posts load
- [ ] Categories filter works
- [ ] Search works (if implemented)
- [ ] All links work
- [ ] Images load properly
- [ ] No 404 errors in console

**Performance:**
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images are optimized (WebP format)

**SEO:**
- [ ] Google sees sitemap
- [ ] Meta tags are correct
- [ ] Open Graph images show in social shares
- [ ] Canonical URLs are set
- [ ] robots.txt is correct

**Mobile:**
- [ ] Site works on mobile
- [ ] Touch targets are large enough
- [ ] Text is readable without zoom
- [ ] No horizontal scroll

**Browser Compatibility:**
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge

### Quick Performance Test

```bash
# Build locally to test
npm run build

# Start production server
npm start

# Open http://localhost:3000
# Run Lighthouse in DevTools
```

---

## 📅 Launch Timeline

### T-minus 2 weeks
- [ ] All content finalized
- [ ] All features working
- [ ] Performance optimized
- [ ] Security audit complete

### T-minus 1 week
- [ ] Domain registered
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Custom domain connected
- [ ] DNS propagation verified
- [ ] SSL certificate installed

### T-minus 1 day
- [ ] Final testing on production
- [ ] All links work
- [ ] Forms work (if any)
- [ ] Analytics tracking confirmed
- [ ] Google Search Console verification
- [ ] Bing Webmaster Tools verification

### Launch Day
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Request indexing of homepage
- [ ] Verify Google Analytics working
- [ ] Monitor for errors
- [ ] Share on social media (optional)

### T-plus 1 week
- [ ] Check Google Search Console for errors
- [ ] Check Bing Webmaster Tools for errors
- [ ] Monitor Core Web Vitals
- [ ] Review analytics data
- [ ] Fix any issues found

### T-plus 1 month
- [ ] Review search console data
- [ ] Check for new errors
- [ ] Plan content updates
- [ ] Plan next phase features

---

## 🚨 Troubleshooting

### Domain not connecting

**Problem:** Domain shows "Not configured" in Vercel
**Solution:**
1. Check nameservers are updated at registrar
2. Wait 24-48 hours for DNS propagation
3. Try adding a CNAME record instead
4. Check DNS settings at: `mxtoolbox.com` → DNS lookup

### Deployment fails

**Problem:** Build fails on Vercel
**Solution:**
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Run `npm run build` locally to reproduce error
4. Check for missing dependencies: `npm install`

### Blog posts not showing

**Problem:** Blog posts don't load on production
**Solution:**
1. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` has read access
3. Check Supabase project is active
4. Check blog_post table has published posts
5. Check browser console for errors

### Analytics not tracking

**Problem:** Google Analytics shows no data
**Solution:**
1. Verify `NEXT_PUBLIC_GA_ID` is correct (format: `G-XXXXXXXXXX`)
2. Check Google Analytics property exists
3. Allow 24 hours for data to appear
4. Verify tag is firing: DevTools → Network → filter "google"

### Sitemap errors in Google Search Console

**Problem:** Sitemap has errors
**Solution:**
1. Visit `yourdomain.com/sitemap.xml`
2. Verify it returns valid XML
3. Check that blog posts are in sitemap
4. Resubmit sitemap to Google Search Console

---

## 📞 Getting Help

**Vercel Support:** [vercel.com/support](https://vercel.com/support)  
**Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)  
**Supabase Support:** [supabase.com/support](https://supabase.com/support)  
**Google Search Console Help:** [support.google.com/webmasters](https://support.google.com/webmasters)

---

## ✅ Post-Launch Checklist

- [ ] Domain is live
- [ ] HTTPS is working
- [ ] All pages load
- [ ] Analytics are tracking
- [ ] Search engines can crawl
- [ ] Sitemap is indexed
- [ ] No critical errors
- [ ] Performance is good
- [ ] Mobile works well
- [ ] Team trained on deployment process

---

**Congratulations! Your site is live! 🎉**

Now focus on:
1. Content creation (blog posts, tool updates)
2. SEO optimization (target high-intent keywords)
3. User acquisition (email list, social media)
4. Analyzing data (what's working, what's not)

For Phase 2 features (authentication, payments, premium features), see `IMPLEMENTATION_ROADMAP.md`
