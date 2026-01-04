# Post-Deployment Guide for toolsherd.in

After deploying to Vercel with your new domain **toolsherd.in**, follow these steps to ensure optimal SEO and functionality.

## 📋 Pre-Deployment Checklist

### 1. **Environment Variables Setup**
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Update `NEXT_PUBLIC_SITE_URL=https://toolsherd.in`
- [ ] Add all required Supabase and API credentials
- [ ] Never commit `.env.local` to git

### 2. **Domain Registration Verification**
- [ ] Ensure domain is registered and active
- [ ] Verify domain registrar account access
- [ ] Have domain registrar login credentials ready

---

## 🚀 Deployment Steps (Vercel)

### Step 1: Connect Repository to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Connect your GitHub repository
4. Select the `toolsherd` repository
5. Configure project settings:
   - **Framework**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (default)
   - **Start Command**: `npm start` (default)

### Step 2: Set Environment Variables in Vercel
1. In Vercel dashboard, go to **Settings → Environment Variables**
2. Add all variables from `.env.local`:
   ```
   NEXT_PUBLIC_SITE_URL = https://toolsherd.in
   NEXT_PUBLIC_SUPABASE_URL = your_value
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_value
   SUPABASE_SERVICE_ROLE_KEY = your_value
   DATABASE_URL = your_value
   ```
3. Apply to all environments (Development, Preview, Production)
4. Click "Deploy"

### Step 3: Add Custom Domain to Vercel
1. In Vercel dashboard, go to **Settings → Domains**
2. Click "Add Domain"
3. Enter: `toolsherd.in`
4. Choose "Use Nameservers" or "Add DNS Record" option
5. Follow the instructions based on your choice

#### Option A: Using Vercel Nameservers (Recommended)
1. Copy the nameserver values Vercel provides
2. Go to your domain registrar (GoDaddy, Namecheap, Route53, etc.)
3. Update nameservers to Vercel's:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ```
4. Wait for DNS propagation (5 minutes - 48 hours)

#### Option B: Using CNAME Records
1. Copy the CNAME record Vercel provides
2. Go to your domain registrar's DNS settings
3. Add CNAME record:
   ```
   Type: CNAME
   Name: @  (or leave blank)
   Value: cname.vercel-dns.com
   ```
4. Also add for www:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Step 4: Configure www Subdomain
1. In Vercel → Domains
2. Add `www.toolsherd.in` as a domain
3. Set Primary Domain:
   - Click on `toolsherd.in`
   - Check "Set as primary domain"
4. Vercel will automatically redirect `www.toolsherd.in` → `toolsherd.in`

### Step 5: SSL Certificate
- Vercel automatically provisions SSL certificates
- Wait for "SSL Certificate Active" status
- This typically takes a few minutes

---

## 🔍 SEO & Search Console Setup

### Step 1: Google Search Console Registration

#### Method 1: Domain Owner Verification
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "URL prefix" and enter: `https://toolsherd.in`
3. Choose verification method:

**Best: DNS TXT Record**
1. Verify ownership via domain registrar DNS settings
2. Go to your domain registrar → DNS settings
3. Add TXT record:
   ```
   Type: TXT
   Name: @ (or blank)
   Value: google-site-verification=xxxxxxxxxxxx (provided by GSC)
   ```
4. Wait for DNS propagation and click "Verify" in GSC

**Alternative: HTML File**
1. Download the HTML verification file
2. Create `public/google[code].html` with the content
3. Once deployed, click verify in GSC

#### Method 2: Google Analytics Property
If you already have Analytics linked, GSC will auto-verify

### Step 2: Submit Sitemap
1. In Google Search Console → **Sitemaps**
2. Enter: `https://toolsherd.in/sitemap.xml`
3. Click "Submit"
4. Monitor for indexing status

### Step 3: Monitor Indexing
1. Go to **Pages → Indexed pages**
2. Check for indexing errors
3. Request indexing if needed via "Inspect URL" tool

### Step 4: Check Indexing Status
```
site:toolsherd.in
```
- Run this in Google Search in a few hours
- Should show indexed pages

---

## 📊 Analytics & Monitoring Setup

### Google Analytics 4 (GA4)
1. Create GA4 property: [analytics.google.com](https://analytics.google.com)
2. Set measurement ID: `G-XXXXXXXXXX`
3. Add to your site (if not already configured)

### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: `https://toolsherd.in`
3. Verify and submit sitemap

### Performance Monitoring
- **Vercel Analytics**: Dashboard → Analytics tab
- **Web Vitals**: Monitor Core Web Vitals in Google Search Console
- **Speed**: Test at [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 🔗 DNS Configuration Summary

### If Using Vercel Nameservers (Simplest)
Change registrar nameservers to:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`
- `ns3.vercel-dns.com`
- `ns4.vercel-dns.com`

### If Using CNAME Records
```
@ (or toolsherd)    CNAME    cname.vercel-dns.com
www                  CNAME    cname.vercel-dns.com
```

### Add SSL
Vercel handles automatically with Let's Encrypt

---

## 📧 Email Configuration (Optional)

If you want `contact@toolsherd.in`:

### Using Vercel
- Vercel doesn't provide email hosting
- Use third-party providers

### Popular Email Hosting Options
- **Google Workspace**: Full Gmail with domain
- **Zoho Mail**: Free or paid plans
- **Office 365**: Microsoft email
- **FastMail**: Privacy-focused

#### Example: Zoho Mail Setup
1. Sign up at [zoho.com/mail](https://www.zoho.com/mail)
2. Add domain: `toolsherd.in`
3. Add MX records in your DNS:
   ```
   Priority: 5,  MX: mx.zoho.com
   Priority: 10, MX: mx2.zoho.com
   Priority: 20, MX: mx3.zoho.com
   ```
4. Add SPF record:
   ```
   TXT: v=spf1 include:zoho.com ~all
   ```
5. Add DKIM records (provided by Zoho)

---

## 🔒 Security Checklist

### Vercel Settings
- [ ] Enable "Vercel for GitHub" automatic deployments
- [ ] Set up branch protection rules
- [ ] Enable HSTS headers (already configured)
- [ ] Check X-Frame-Options, X-Content-Type-Options headers

### SSL/TLS
- [ ] SSL certificate is active
- [ ] HTTPS redirects enabled
- [ ] Security headers configured in `next.config.ts`

### Environment Variables
- [ ] All sensitive values in .env.local and Vercel
- [ ] No secrets in git repository
- [ ] Environment variable access logged

### Database
- [ ] Supabase credentials secured
- [ ] Row-level security (RLS) enabled
- [ ] Backup enabled

---

## 🧪 Post-Deployment Testing

### 1. **URL Accessibility**
```bash
# Test main domain
curl -I https://toolsherd.in
curl -I https://www.toolsherd.in

# Both should return 200 or 301 (redirect)
```

### 2. **Sitemap Accessibility**
```
https://toolsherd.in/sitemap.xml
https://toolsherd.in/robots.txt
```

### 3. **SEO Meta Tags**
View page source and verify:
- `<meta name="description">`
- `<meta name="keywords">`
- Open Graph tags
- Twitter Card tags

### 4. **Lighthouse Audit**
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

### 5. **Mobile Responsiveness**
- Test on mobile devices
- Use Chrome DevTools device emulation
- Check viewport settings

---

## 📈 Post-Launch Monitoring

### Week 1
- Monitor DNS propagation
- Check Google Search Console for crawl errors
- Monitor Vercel deployment logs for errors
- Test all main pages and features

### Week 2-4
- Check indexing progress in GSC
- Monitor Core Web Vitals
- Check for any 404 errors
- Review analytics data

### Ongoing
- Monthly DNS health check
- Monitor SSL certificate expiration (Vercel handles)
- Review Google Search Console reports
- Update sitemap when new content is added

---

## 🐛 Troubleshooting

### Domain Not Resolving
1. Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net/)
2. Verify nameservers or CNAME records are correctly set
3. Wait up to 48 hours for full propagation
4. Clear browser cache (Ctrl+Shift+Del)

### Pages Not Indexed
1. Check robots.txt allows indexing
2. Submit sitemap in Google Search Console
3. Use "Inspect URL" to request indexing
4. Check for noindex tags in meta

### SSL Certificate Issues
- Vercel auto-provisions - usually resolves itself
- Wait 24 hours and refresh
- Check Vercel dashboard for certificate status

### 404 on www.toolsherd.in
- Ensure www domain is added in Vercel
- Check primary domain is set to non-www (toolsherd.in)
- Verify DNS records for www subdomain

### Performance Issues
1. Run [PageSpeed Insights](https://pagespeed.web.dev/)
2. Check Vercel analytics for slow endpoints
3. Optimize images in `/public`
4. Review Next.js bundle analysis

---

## 📝 Quick Command Reference

```bash
# Check DNS records
nslookup toolsherd.in
dig toolsherd.in

# Check DNS propagation across globe
# Use: https://www.whatsmydns.net/

# Test SSL certificate
curl -v https://toolsherd.in

# Check robots.txt
curl https://toolsherd.in/robots.txt

# Check sitemap
curl https://toolsherd.in/sitemap.xml
```

---

## 📞 Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Google Search Console Help**: [support.google.com/webmasters](https://support.google.com/webmasters)
- **DNS Propagation Checker**: [whatsmydns.net](https://www.whatsmydns.net/)
- **SSL Checker**: [sslshopper.com](https://www.sslshopper.com/ssl-checker.html)

---

## ✅ Deployment Completion Checklist

### Before Going Live
- [ ] Test all pages locally
- [ ] Environment variables set in Vercel
- [ ] Domain configured in registrar
- [ ] SSL certificate active
- [ ] Sitemap verified
- [ ] robots.txt updated

### After Going Live
- [ ] DNS fully propagated (test with whatsmydns.net)
- [ ] Site accessible on https://toolsherd.in
- [ ] www redirects to main domain
- [ ] Verified in Google Search Console
- [ ] Sitemap submitted to GSC
- [ ] Analytics tracking working
- [ ] All pages accessible and responsive
- [ ] No console errors in DevTools
- [ ] Lighthouse score > 80

---

**Domain**: toolsherd.in  
**Created**: January 4, 2026  
**Last Updated**: January 4, 2026
