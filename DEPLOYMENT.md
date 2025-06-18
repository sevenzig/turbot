# Deployment Guide

This guide covers the complete deployment process for the React + Vite business website template.

## Overview

The template is optimized for deployment on **Vercel** but can be deployed to any static hosting
platform. The configuration includes:

- Production build optimization
- Environment variable handling
- Security headers
- Caching strategies
- Performance monitoring

## Quick Deployment (Vercel)

### Prerequisites

- [Vercel account](https://vercel.com/signup)
- Project pushed to GitHub/GitLab/Bitbucket

### Steps

1. **Connect Repository**

   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel

   # Deploy from command line
   npm run deploy:preview  # Preview deployment
   npm run deploy          # Production deployment
   ```

2. **Or Deploy via Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

### Environment Variables on Vercel

1. Go to Project Settings → Environment Variables
2. Add your environment variables:
   ```
   VITE_APP_NAME=Your Business Name
   VITE_BUSINESS_EMAIL=contact@yourbusiness.com
   VITE_API_URL=https://api.yourbusiness.com
   ```

## Build Configuration

### Vite Build Settings

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          router: ["react-router-dom"],
          icons: ["@phosphor-icons/react"],
          motion: ["framer-motion"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    target: "esnext",
  },
});
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

## Environment Variables

### Setup

1. Copy `env.example` to `.env.local`
2. Update values for your project
3. Add to deployment platform

### Available Variables

| Variable                     | Purpose          | Example                        |
| ---------------------------- | ---------------- | ------------------------------ |
| `VITE_APP_NAME`              | Application name | `"My Business"`                |
| `VITE_API_URL`               | API endpoint     | `"https://api.example.com"`    |
| `VITE_CONTACT_FORM_ENDPOINT` | Form handler     | `"https://formspree.io/f/xyz"` |
| `VITE_GA_TRACKING_ID`        | Google Analytics | `"G-XXXXXXXXXX"`               |
| `VITE_ENABLE_DEBUG`          | Debug mode       | `"false"`                      |

### Environment-Specific Values

```bash
# Development (.env.local)
VITE_API_URL=http://localhost:3001
VITE_ENABLE_DEBUG=true

# Production (Vercel Dashboard)
VITE_API_URL=https://api.yourdomain.com
VITE_ENABLE_DEBUG=false
```

## Security Configuration

### Headers (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Caching Strategy

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Alternative Deployment Platforms

### Netlify

1. **netlify.toml**

   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### GitHub Pages

1. **Add to package.json**

   ```json
   {
     "scripts": {
       "deploy:gh": "gh-pages -d dist"
     },
     "devDependencies": {
       "gh-pages": "^4.0.0"
     }
   }
   ```

2. **Deploy**
   ```bash
   npm run build
   npm run deploy:gh
   ```

### Firebase Hosting

1. **firebase.json**

   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

2. **Deploy**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   npm run build
   firebase deploy
   ```

## Performance Optimization

### Build Output

After optimization, you should see:

```
dist/assets/react-vendor-xxx.js    ~11KB (gzipped ~4KB)
dist/assets/router-xxx.js          ~34KB (gzipped ~12KB)
dist/assets/index-xxx.js           ~188KB (gzipped ~59KB)
dist/assets/index-xxx.css          ~28KB (gzipped ~5KB)
```

### Performance Checklist

- ✅ Code splitting implemented
- ✅ Vendor chunks separated
- ✅ CSS extracted and minified
- ✅ Images optimized
- ✅ Gzip compression enabled
- ✅ Cache headers configured

## Monitoring & Analytics

### Core Web Vitals

Monitor these metrics post-deployment:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Tools

- [Vercel Analytics](https://vercel.com/analytics)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://lighthouse-ci.com/)

## Troubleshooting

### Common Issues

#### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### Environment Variables Not Working

- Ensure variables start with `VITE_`
- Check they're added to deployment platform
- Restart development server after changes

#### 404 on Refresh

- Verify SPA routing configuration
- Check `vercel.json` rewrites
- Ensure server supports client-side routing

#### Performance Issues

```bash
# Analyze bundle
npm run build
npx vite-bundle-analyzer dist

# Check for large dependencies
npx bundlephobia-cli check-packages package.json
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Post-Deployment Checklist

### Functional Testing

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Contact form submits
- [ ] Mobile responsiveness
- [ ] SEO meta tags present

### Performance Testing

- [ ] Page load speed < 3s
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals in green
- [ ] Images load properly

### Security Testing

- [ ] HTTPS enabled
- [ ] Security headers present
- [ ] No console errors
- [ ] XSS protection active

---

## Support

For deployment issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review build logs
3. Test locally with `npm run preview`
4. Open GitHub issue if needed

**Deploy with confidence! 🚀**
