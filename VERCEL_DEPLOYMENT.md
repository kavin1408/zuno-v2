# ZUNO v2 - Vercel Deployment Guide

## 🚀 Deployment Steps

### 1. Import Repository to Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `kavin1408/zuno-v2`
4. Click "Import"

### 2. Project Configuration

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)
- **Node.js Version**: 20.x (recommended)

### 3. Environment Variables

Add the following environment variables in Vercel dashboard:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://frmzwunvythvziqyfwxy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXp3dW52eXRodnppcXlmd3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NzQ1NzQsImV4cCI6MjA4MzQ1MDU3NH0.Y5wxa6nLZNh8q0Nu8pzc8N98XTZr9Uu4OGD_IqswM94
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXp3dW52eXRodnppcXlmd3h5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Nzg3NDU3NCwiZXhwIjoyMDgzNDUwNTc0fQ.q9bc104zKRYN-2uv2lvxx8v4GDt9_YEL0h7-JQezedc

# AI Configuration
OPENROUTER_API_KEY=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
OPENROUTER_MODEL=meta-llama/llama-3.1-70b-instruct

# Database (Optional - for direct connections)
DATABASE_URL=postgresql://postgres.frmzwunvythvziqyfwxy:Kwp6Co2r4OU5KCHV@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
```

### 4. Deploy

Click **"Deploy"** button. Vercel will:
- Install dependencies
- Run build (`npm run build`)
- Deploy to production

Expected build time: ~3-5 minutes

### 5. Post-Deployment Configuration

#### Update Supabase Auth Redirect URLs
1. Go to: https://supabase.com/dashboard/project/frmzwunvythvziqyfwxy/auth/url-configuration
2. Add your Vercel domain to **Redirect URLs**:
   ```
   https://your-project.vercel.app/auth/callback
   ```
3. Add to **Site URL**:
   ```
   https://your-project.vercel.app
   ```

#### Enable Automatic Deployments
- Already enabled by default
- Every push to `main` branch will trigger a new deployment

### 6. Verification Checklist

After deployment, test:
- [ ] Homepage loads (`/`)
- [ ] Login page works (`/login`)
- [ ] Signup page works (`/signup`)
- [ ] Onboarding flow (`/onboarding`)
- [ ] Dashboard displays (`/dashboard`)
- [ ] API routes respond (`/api/onboarding`)

## 🔧 Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify all environment variables are set
- Ensure `npm run build` works locally

### Auth Not Working
- Verify Supabase redirect URLs include your Vercel domain
- Check browser console for CORS errors
- Confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set

### AI Roadmap Generation Fails
- Verify `OPENROUTER_API_KEY` is set correctly
- Check OpenRouter API credits
- Review Vercel function logs

## 📊 Expected Deployment Output

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (11/11)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.34 kB        92.7 kB
├ ƒ /api/onboarding                      0 B                0 B
├ ƒ /api/tasks/[id]                      0 B                0 B
├ ƒ /dashboard                           6.73 kB        94.1 kB
├ ƒ /login                               5.6 kB         92.9 kB
├ ƒ /onboarding                          8.21 kB        95.6 kB
└ ƒ /signup                              5.6 kB         92.9 kB
```

## 🌐 Production URLs

After deployment, you'll receive:
- **Production**: `https://zuno-v2.vercel.app` (or custom domain)
- **Preview**: Automatic preview URLs for each PR
- **Dashboard**: https://vercel.com/kavin1408m-6209s-projects/zuno-v2

## 🔐 Security Notes

- All environment variables are encrypted by Vercel
- Service role key is only accessible server-side
- Public keys (`NEXT_PUBLIC_*`) are exposed to the browser
- Never commit `.env.local` to Git (already in `.gitignore`)

## 📝 Additional Configuration (Optional)

### Custom Domain
1. Go to Vercel project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update Supabase redirect URLs with new domain

### Performance Monitoring
- Vercel Analytics: Enable in project settings
- Vercel Speed Insights: Enable for Core Web Vitals

### Serverless Function Configuration
Default settings should work, but you can adjust:
- **Max Duration**: 10s (Hobby), 60s (Pro)
- **Memory**: 1024 MB (default)
- **Region**: Auto (recommended)
