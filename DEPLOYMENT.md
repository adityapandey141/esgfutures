# ESGFuture Deployment Guide

## Architecture Overview

Your app has two parts:
- **Frontend**: Next.js app (deploy to Vercel)
- **Backend**: Express.js API + MySQL database (deploy to Railway/Render)

---

## STEP 1: Switch from SQLite to MySQL

### 1.1 Get Your Hostinger MySQL Credentials

Login to Hostinger → Databases → MySQL → Note down:
- Host (e.g., `mysql123.hostinger.com`)
- Database name
- Username
- Password
- Port (usually 3306)

### 1.2 Install MySQL Package

```bash
cd server
npm install mysql2
```

### 1.3 Update Database Configuration

The database config will automatically use MySQL in production when you set environment variables.

---

## STEP 2: Deploy Backend (Choose ONE Option)

### Option A: Railway (Recommended - Free Tier)

1. **Sign up**: Go to https://railway.app
2. **New Project** → Deploy from GitHub repo
3. **Select your repo** → Choose `server` folder as root
4. **Add Environment Variables**:
   ```
   DB_HOST=your-hostinger-mysql-host
   DB_USER=your-mysql-username
   DB_PASSWORD=your-mysql-password
   DB_NAME=your-database-name
   DB_PORT=3306
   NODE_ENV=production
   JWT_SECRET=generate-random-string-here
   FRONTEND_URL=https://your-app.vercel.app
   PORT=5000
   ```
5. **Deploy** - Railway will give you a URL like `https://your-app.railway.app`

### Option B: Render (Free Tier)

1. **Sign up**: Go to https://render.com
2. **New** → Web Service → Connect GitHub
3. **Settings**:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add Environment Variables** (same as above)
5. **Create Web Service**

### Option C: Heroku (Paid)

1. Install Heroku CLI
2. ```bash
   cd server
   heroku create your-app-name
   heroku config:set DB_HOST=your-mysql-host
   # ... add all other env vars
   git push heroku main
   ```

---

## STEP 3: Update Backend for Production

### 3.1 Update `server/config/database.js`

Replace with:

```javascript
const { Sequelize } = require("sequelize");
const path = require("path");

let sequelize;

if (process.env.NODE_ENV === "production") {
  // Production: Use MySQL
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect: "mysql",
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
  console.log("Using MySQL database (Production)");
} else {
  // Development: Use SQLite
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../database.sqlite"),
    logging: false,
  });
  console.log("Using SQLite database (Development)");
}

module.exports = sequelize;
```

### 3.2 Update `server/package.json`

Add start script:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

---

## STEP 4: Deploy Frontend to Vercel

### 4.1 Push to GitHub

```bash
cd /path/to/esgfutures
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 4.2 Deploy to Vercel

1. **Go to**: https://vercel.com
2. **Import Project** → Select your GitHub repo
3. **Framework Preset**: Next.js (auto-detected)
4. **Root Directory**: Leave as root (not server folder)
5. **Environment Variables** → Add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```
6. **Deploy**

### 4.3 Update Backend CORS

After Vercel gives you a URL (e.g., `https://esgfuture.vercel.app`):

1. Go to your backend hosting (Railway/Render)
2. Update environment variable:
   ```
   FRONTEND_URL=https://esgfuture.vercel.app
   ```
3. Redeploy backend

---

## STEP 5: Create Environment Variable Helper

Create `app/config/api.js`:

```javascript
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
```

Then update all API calls from:
```javascript
axios.get('http://localhost:5000/api/...')
```

To:
```javascript
import { API_URL } from '@/config/api';
axios.get(`${API_URL}/api/...`)
```

---

## STEP 6: Database Migration

After backend is deployed, run migrations:

1. **Railway**: Use Railway CLI or web terminal
2. **Render**: Use Render shell

```bash
node -e "require('./models').sequelize.sync({ force: false })"
```

---

## STEP 7: Verify Deployment

1. ✅ Frontend loads: `https://your-app.vercel.app`
2. ✅ Backend health check: `https://your-backend.railway.app/api/health`
3. ✅ Database connected: Check backend logs
4. ✅ API calls work: Test login, reports, etc.
5. ✅ Images load: Upload test image

---

## Quick Deployment Checklist

- [ ] MySQL credentials from Hostinger
- [ ] Install mysql2 package
- [ ] Update database.js for production
- [ ] Deploy backend to Railway/Render
- [ ] Set all environment variables on backend
- [ ] Get backend URL
- [ ] Create API_URL config in frontend
- [ ] Update all axios calls to use API_URL
- [ ] Push to GitHub
- [ ] Deploy frontend to Vercel
- [ ] Set NEXT_PUBLIC_API_URL on Vercel
- [ ] Update FRONTEND_URL on backend
- [ ] Run database migrations
- [ ] Test everything!

---

## Troubleshooting

**CORS Errors**: Update FRONTEND_URL on backend to match Vercel URL

**Database Connection Failed**: Check MySQL credentials and whitelist backend IP in Hostinger

**Images Not Loading**: Update image URLs to use backend domain

**API 404**: Make sure NEXT_PUBLIC_API_URL is set correctly

---

## Cost Breakdown

- **Vercel**: Free (Hobby plan)
- **Railway**: Free tier (500 hours/month)
- **Hostinger MySQL**: Already have it
- **Total**: $0/month for development, ~$5-10/month for production

---

## Need Help?

1. Check backend logs on Railway/Render
2. Check Vercel deployment logs
3. Test API endpoints directly in browser
4. Verify environment variables are set
