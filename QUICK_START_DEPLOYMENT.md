# 🚀 Quick Start - Deploy in 15 Minutes

## What You're Deploying

**Before**: Static Next.js site on Vercel  
**Now**: Full-stack app with:
- Frontend (Next.js) → Vercel
- Backend (Express API) → Railway
- Database (MySQL) → Hostinger

---

## 3 Simple Steps

### 1️⃣ Deploy Backend (5 min)

1. Go to **https://railway.app** → Sign up with GitHub
2. **New Project** → **Deploy from GitHub repo**
3. Select your repo → **Set Root Directory: `server`**
4. Add these **Environment Variables**:
   ```
   DB_HOST=your-hostinger-mysql-host
   DB_USER=your-mysql-username
   DB_PASSWORD=your-mysql-password
   DB_NAME=your-database-name
   DB_PORT=3306
   NODE_ENV=production
   JWT_SECRET=generate-random-32-char-string
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Click **Deploy** → Copy your Railway URL

---

### 2️⃣ Deploy Frontend (5 min)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. Go to **https://vercel.com** → Sign in with GitHub
3. **Import Project** → Select your repo
4. Add **Environment Variable**:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: Your Railway URL (from step 1)
5. Click **Deploy** → Copy your Vercel URL

---

### 3️⃣ Connect Them (5 min)

1. Go back to **Railway** → Update variable:
   - `FRONTEND_URL` = Your Vercel URL (from step 2)
   - Save (auto-redeploys)

2. **Hostinger** → Databases → Remote MySQL:
   - Allow remote connections (add `%` or Railway IP)

3. **Create Admin** (Railway terminal):
   ```bash
   node scripts/createAdmin.js
   ```

---

## ✅ Done! Test Your App

- Visit your Vercel URL
- Go to `/admin/login`
- Login: `admin@esgfuture.com` / `Admin@123`
- Upload a report or team member
- Check if images work

---

## Get Your Hostinger MySQL Info

1. Login to **Hostinger**
2. **Hosting** → **Databases** → **MySQL Databases**
3. Find your database → Click **Manage**
4. Copy: Host, Database name, Username, Password

---

## Troubleshooting

**CORS Error?**  
→ Make sure `FRONTEND_URL` on Railway = your Vercel URL exactly

**Can't connect to database?**  
→ Check Hostinger allows remote MySQL connections

**Images not loading?**  
→ They're stored on Railway, should work automatically

**Need help?**  
→ Check Railway logs or Vercel deployment logs

---

## Free Tier Limits

- **Vercel**: Unlimited (Hobby plan)
- **Railway**: 500 hours/month (≈20 days)
- **Upgrade Railway**: $5/month for 24/7 uptime

---

## Your URLs

**Frontend**: `https://________________.vercel.app`  
**Backend**: `https://________________.railway.app`  
**Admin Panel**: `https://________________.vercel.app/admin`

---

**That's it! Your full-stack app is live! 🎉**
