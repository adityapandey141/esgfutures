# 🚀 ESGFuture Deployment Checklist

## Pre-Deployment Setup

### ✅ Step 1: Get Hostinger MySQL Credentials
- [ ] Login to Hostinger control panel
- [ ] Go to Databases → MySQL Databases
- [ ] Note down:
  - **Host**: `_____________________`
  - **Database Name**: `_____________________`
  - **Username**: `_____________________`
  - **Password**: `_____________________`
  - **Port**: `3306` (default)

---

## Backend Deployment (Railway - Recommended)

### ✅ Step 2: Sign Up for Railway
- [ ] Go to https://railway.app
- [ ] Sign up with GitHub account
- [ ] Verify email

### ✅ Step 3: Create New Project on Railway
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Authorize Railway to access your GitHub
- [ ] Select your `esgfutures` repository
- [ ] **Important**: Set Root Directory to `server`

### ✅ Step 4: Configure Environment Variables on Railway
Click "Variables" tab and add these:

```
DB_HOST=your-hostinger-mysql-host
DB_USER=your-mysql-username
DB_PASSWORD=your-mysql-password
DB_NAME=your-database-name
DB_PORT=3306
NODE_ENV=production
JWT_SECRET=your-random-secret-key-here
FRONTEND_URL=https://your-app.vercel.app
PORT=5000
```

**Generate JWT Secret**: Use this command or online generator:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- [ ] All environment variables added
- [ ] JWT_SECRET is a random string (not "your-random-secret-key-here")

### ✅ Step 5: Deploy Backend
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete (2-5 minutes)
- [ ] Copy your Railway URL (e.g., `https://esgfutures-production.up.railway.app`)
- [ ] Test health endpoint: `https://your-railway-url/api/health`

**Your Backend URL**: `_____________________`

---

## Frontend Deployment (Vercel)

### ✅ Step 6: Push Code to GitHub
```bash
cd "c:\Users\Aditya\Desktop\Client Convert\ESGfutures\esgfutures"
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

- [ ] Code pushed to GitHub
- [ ] Verify on GitHub that all files are there

### ✅ Step 7: Deploy to Vercel
- [ ] Go to https://vercel.com
- [ ] Sign up/Login with GitHub
- [ ] Click "Add New..." → "Project"
- [ ] Import your `esgfutures` repository
- [ ] **Framework Preset**: Next.js (auto-detected)
- [ ] **Root Directory**: Leave blank (use root)
- [ ] Click "Environment Variables"

### ✅ Step 8: Add Environment Variable on Vercel
Add this variable:

**Name**: `NEXT_PUBLIC_API_URL`  
**Value**: Your Railway backend URL (e.g., `https://esgfutures-production.up.railway.app`)

- [ ] Environment variable added
- [ ] Click "Deploy"
- [ ] Wait for deployment (3-5 minutes)

**Your Vercel URL**: `_____________________`

---

## Post-Deployment Configuration

### ✅ Step 9: Update Backend CORS
- [ ] Go back to Railway
- [ ] Update `FRONTEND_URL` variable to your Vercel URL
- [ ] Example: `FRONTEND_URL=https://esgfuture.vercel.app`
- [ ] Redeploy backend (Railway will auto-redeploy)

### ✅ Step 10: Whitelist Railway IP in Hostinger (if needed)
- [ ] Go to Hostinger → Databases → Remote MySQL
- [ ] Add Railway's IP or use `%` for all IPs (less secure but easier)
- [ ] Save changes

### ✅ Step 11: Initialize Database Tables
Railway will automatically run migrations on first start. Verify by:
- [ ] Check Railway logs for "Database synced successfully"
- [ ] Or manually trigger: Use Railway's terminal to run:
  ```bash
  node -e "require('./models').sequelize.sync()"
  ```

---

## Testing Deployment

### ✅ Step 12: Test Everything
- [ ] **Frontend loads**: Visit your Vercel URL
- [ ] **Backend health**: Visit `https://your-railway-url/api/health`
- [ ] **Login works**: Go to `/admin/login` and try logging in
- [ ] **Create admin**: If no admin exists, create one via Railway terminal:
  ```bash
  node scripts/createAdmin.js
  ```
- [ ] **Reports load**: Check `/reports` page
- [ ] **Team page loads**: Check `/team` page
- [ ] **Contact form works**: Submit a test message
- [ ] **Images upload**: Try uploading a team member photo or report image
- [ ] **Images display**: Verify uploaded images show correctly

---

## Troubleshooting

### Issue: CORS Error
**Solution**: Make sure `FRONTEND_URL` on Railway matches your Vercel URL exactly (including https://)

### Issue: Database Connection Failed
**Solutions**:
1. Check MySQL credentials are correct
2. Verify Hostinger allows remote connections
3. Check Railway logs for specific error
4. Whitelist Railway IP in Hostinger

### Issue: Images Not Loading
**Solution**: Images are stored on Railway. Make sure `getImageUrl()` helper is used in frontend.

### Issue: API 404 Errors
**Solution**: Verify `NEXT_PUBLIC_API_URL` is set correctly on Vercel

### Issue: Admin Can't Login
**Solution**: Create admin account:
```bash
# In Railway terminal
node scripts/createAdmin.js
```

---

## Optional: Custom Domain

### Add Custom Domain to Vercel
- [ ] Go to Vercel project → Settings → Domains
- [ ] Add your domain (e.g., `esgfuture.com`)
- [ ] Update DNS records as instructed
- [ ] Update `FRONTEND_URL` on Railway to your custom domain

### Add Custom Domain to Railway (Backend)
- [ ] Go to Railway project → Settings → Domains
- [ ] Add custom domain (e.g., `api.esgfuture.com`)
- [ ] Update DNS records
- [ ] Update `NEXT_PUBLIC_API_URL` on Vercel

---

## Cost Summary

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby | **Free** |
| Railway | Free Tier | **Free** (500 hrs/month) |
| Hostinger MySQL | Existing | **$0** (already have) |
| **Total** | | **$0/month** |

**Note**: Railway free tier = 500 hours/month = ~20 days. For 24/7 uptime, upgrade to $5/month.

---

## Deployment Complete! 🎉

Your app is now live:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-app.railway.app
- **Database**: Hostinger MySQL

### Next Steps:
1. Share your live URL
2. Monitor Railway usage
3. Set up automatic backups for MySQL
4. Consider upgrading Railway for 24/7 uptime
5. Add custom domain (optional)

---

## Support

**Railway Docs**: https://docs.railway.app  
**Vercel Docs**: https://vercel.com/docs  
**Need Help?**: Check Railway/Vercel logs for errors
