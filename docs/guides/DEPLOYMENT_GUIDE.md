# Deployment Guide

This guide walks you through deploying the ShortStaffed Media Suite to production.

## 🚀 Recommended Hosting: Vercel

Vercel is the recommended hosting platform because:
- Built by the creators of Next.js
- Zero configuration deployment
- Automatic HTTPS
- Global CDN
- Generous free tier
- Easy GitHub integration

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All features are working locally (`npm run dev`)
- [ ] No linter errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables are documented
- [ ] Code is committed to GitHub

## 🔧 Step-by-Step Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure Your Project**
   - **Project Name**: `shortstaffed-media-suite` (or your preference)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Environment Variables** (if needed)
   - Add any environment variables from your `.env.local`
   - Click "Add" for each variable
   - Example: `NEXT_PUBLIC_API_URL`

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd "/Users/lucusdato/Documents/Dev/ShortStaffed MediaTools"
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - What's your project's name? `shortstaffed-media-suite`
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🔄 Automatic Deployments

Once connected to GitHub:

- **Every push to `main`** → Deploys to production
- **Every pull request** → Creates a preview deployment
- **Every branch push** → Creates a development deployment

To configure:
1. Go to your Vercel project dashboard
2. Settings → Git
3. Configure branch deployments

## 🌍 Custom Domain

### Add Your Own Domain

1. **In Vercel Dashboard**
   - Go to your project
   - Settings → Domains
   - Add your domain (e.g., `media-suite.yourcompany.com`)

2. **Update DNS Records**
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel's nameservers for full DNS management

3. **SSL Certificate**
   - Automatically issued by Vercel
   - Renews automatically

## 📊 Environment Variables

### Production Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```bash
# API Configuration (if needed)
NEXT_PUBLIC_API_URL=https://your-api.com

# Analytics (if added)
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X

# Feature Flags (if needed)
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false
```

### Environment Types

Vercel supports three environment types:
- **Production**: Used for main branch deployments
- **Preview**: Used for PR and branch deployments
- **Development**: Used locally with `vercel dev`

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` to GitHub
- Use Vercel's environment variables for secrets
- Prefix public variables with `NEXT_PUBLIC_`

### 2. API Routes
- Add rate limiting if handling sensitive data
- Validate file uploads (size, type)
- Sanitize user inputs

### 3. File Uploads
The app currently processes files client-side and via API routes. Consider:
- Setting file size limits
- Validating file types strictly
- Adding virus scanning for production

### 4. CORS
If you add external API calls:
```typescript
// In your API route
res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
```

## 📈 Monitoring & Analytics

### Vercel Analytics

Enable Vercel Analytics for free:
1. Project Settings → Analytics
2. Enable Analytics
3. View metrics in dashboard

Metrics include:
- Page views
- Unique visitors
- Top pages
- Real User Monitoring (Web Vitals)

### Error Tracking

Consider adding Sentry:

1. Install Sentry:
   ```bash
   npm install @sentry/nextjs
   ```

2. Configure:
   ```bash
   npx @sentry/wizard -i nextjs
   ```

3. Add DSN to environment variables

## 🔧 Performance Optimization

### 1. Image Optimization
Next.js automatically optimizes images. Use the `Image` component:

```typescript
import Image from 'next/image';

<Image 
  src="/logo.png" 
  width={200} 
  height={100} 
  alt="Logo" 
/>
```

### 2. Code Splitting
Automatically handled by Next.js. For manual optimization:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

### 3. Caching
Vercel automatically caches static assets. Configure in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## 🐛 Debugging Production Issues

### View Logs

1. **Vercel Dashboard**
   - Project → Deployments
   - Click on a deployment
   - View "Runtime Logs"

2. **Real-time Logs**
   ```bash
   vercel logs [deployment-url]
   ```

### Common Issues

**Issue**: 404 on page refresh
**Solution**: Next.js handles this automatically with App Router

**Issue**: API route timeout
**Solution**: API routes have a 10s timeout on Hobby plan, 60s on Pro
- Optimize Excel processing
- Consider edge functions for faster response

**Issue**: Build fails
**Solution**: Check build logs
- Ensure all dependencies are in `package.json`
- Fix any TypeScript errors
- Check for missing environment variables

## 📱 Testing Production Build Locally

Before deploying, test the production build:

```bash
# Build for production
npm run build

# Start production server
npm start

# Test at http://localhost:3000
```

This helps catch issues before they reach production.

## 🔄 Rollback Strategy

### Instant Rollback

If something goes wrong:
1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

This instantly reverts to the previous version.

### Git Rollback

```bash
git revert HEAD
git push origin main
```

This triggers a new deployment with the reverted changes.

## 📊 Post-Deployment Checklist

After deploying:

- [ ] Test all tools (Traffic Sheet Automation)
- [ ] Verify file uploads work
- [ ] Test file downloads
- [ ] Check mobile responsiveness
- [ ] Test Bug Report submission
- [ ] Verify dark mode works
- [ ] Check performance metrics
- [ ] Test with real blocking chart and template
- [ ] Share with team for feedback

## 🎯 Production URL

Your production site will be available at:
- `https://your-project.vercel.app` (default)
- `https://your-custom-domain.com` (if configured)

Share this URL with your team and start automating media planning tasks!

## 🆘 Support

If you encounter issues during deployment:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Next.js Documentation](https://nextjs.org/docs)
- Use the Bug Report feature in the app
- Contact Vercel Support (Pro plan includes email support)

