# ZUNO v2 - Quick Deployment Checklist

## ✅ Pre-Deployment Verification

- [x] Production build succeeds locally (`npm run build`)
- [x] All environment variables documented
- [x] Code pushed to GitHub (`main` branch)
- [x] `.env.local` in `.gitignore`
- [x] Supabase connection tested
- [x] OpenRouter API key valid

## 🚀 Vercel Deployment Steps

### 1. Import Project
```
URL: https://vercel.com/new
Repository: kavin1408/zuno-v2
Framework: Next.js
```

### 2. Add Environment Variables

Copy-paste these into Vercel dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=https://frmzwunvythvziqyfwxy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXp3dW52eXRodnppcXlmd3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NzQ1NzQsImV4cCI6MjA4MzQ1MDU3NH0.Y5wxa6nLZNh8q0Nu8pzc8N98XTZr9Uu4OGD_IqswM94
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXp3dW52eXRodnppcXlmd3h5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Nzg3NDU3NCwiZXhwIjoyMDgzNDUwNTc0fQ.q9bc104zKRYN-2uv2lvxx8v4GDt9_YEL0h7-JQezedc
OPENROUTER_API_KEY=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
```

### 3. Deploy
Click **Deploy** button

### 4. Post-Deployment

1. **Update Supabase Auth URLs**:
   - Go to: https://supabase.com/dashboard/project/frmzwunvythvziqyfwxy/auth/url-configuration
   - Add: `https://your-vercel-domain.vercel.app/auth/callback`

2. **Test the deployment**:
   - Visit your Vercel URL
   - Try signup/login
   - Complete onboarding flow
   - Check dashboard

## 🔍 Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify environment variables are set
- Test `npm run build` locally

### Auth Errors
- Confirm Supabase redirect URLs
- Check browser console
- Verify public keys are set

### API Errors
- Check Vercel function logs
- Verify service role key
- Test API routes directly

## 📊 Expected Build Time
~3-5 minutes

## 🎯 Success Criteria
- [ ] Build completes successfully
- [ ] Homepage loads
- [ ] Login/Signup works
- [ ] Onboarding flow completes
- [ ] Dashboard displays roadmap
- [ ] AI roadmap generation works
