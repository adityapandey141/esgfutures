# ESG Futures CMS - Complete Setup Guide

## Overview

This project has been converted from a static website to a fully dynamic CMS-driven platform with:

- **Backend**: Node.js + Express + Sequelize + MySQL
- **Frontend**: Next.js with React Context API
- **Authentication**: JWT-based admin system
- **File Uploads**: Multer for images and documents
- **Database**: MySQL with comprehensive models

## 🚀 Quick Start

### 1. Database Setup

1. Create MySQL database named `esgfutures`
2. Copy environment variables:
   ```bash
   cp server/config/env.example.txt server/.env
   ```
3. Update `.env` with your database credentials
4. Run database setup:
   ```bash
   cd server
   node scripts/setupDatabase.js
   ```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
npm install
```

### 3. Start Development Servers

**Backend (Terminal 1):**
```bash
cd server
npm run dev
```
Server runs on: `http://localhost:3001`

**Frontend (Terminal 2):**
```bash
npm run dev
```
Frontend runs on: `http://localhost:3000`

## 📁 Project Structure

```
esgfutures/
├── app/                          # Next.js frontend
│   ├── admin/                   # Admin panel
│   │   ├── login/              # Admin login page
│   │   └── dashboard/           # Admin dashboard
│   ├── context/                  # React Context providers
│   │   ├── AuthContext.js        # Authentication state
│   │   └── SiteContext.js       # Site content state
│   ├── impact/                   # Impact page
│   ├── reports/                  # Reports pages
│   │   ├── page.js             # Reports listing
│   │   └── [slug]/page.js      # Individual report
│   ├── team/                     # Team page
│   ├── globals.css               # Global styles
│   ├── layout.js                # Root layout with providers
│   └── page.js                 # Original static homepage
├── server/                        # Express backend
│   ├── config/                   # Configuration
│   │   ├── database.js          # Sequelize config
│   │   └── env.example.txt     # Environment template
│   ├── middleware/               # Express middleware
│   │   ├── auth.js             # JWT authentication
│   │   └── upload.js          # File upload handling
│   ├── models/                   # Sequelize models
│   │   ├── Admin.js            # Admin users
│   │   ├── Report.js           # ESG reports
│   │   ├── Page.js             # Page content
│   │   ├── Team.js             # Team members
│   │   ├── ImpactMetric.js      # Impact metrics
│   │   └── index.js            # Model exports
│   ├── routes/                   # API routes
│   │   ├── auth.js             # Authentication endpoints
│   │   ├── reports.js          # Report CRUD
│   │   ├── pages.js            # Page content CRUD
│   │   ├── team.js             # Team member CRUD
│   │   └── upload.js           # File upload
│   ├── scripts/                  # Utility scripts
│   │   └── setupDatabase.js    # Database initialization
│   ├── uploads/                  # File upload directory
│   ├── index.js                 # Express server
│   └── package.json
└── package.json                   # Frontend dependencies
```

## 🔐 Default Admin Access

After running the database setup script:

- **Email**: `admin@esgfutures.com`
- **Password**: `admin123456`
- **URL**: `http://localhost:3000/admin/login`

⚠️ **Important**: Change the default password immediately after first login!

## 📊 Database Schema

### Admin Users
- `id`, `name`, `email`, `password` (hashed), `role`, `timestamps`

### Reports
- `id`, `title`, `slug`, `abstract`, `content`, `category`, `author`, `featured_image`, `published_date`, `meta_title`, `meta_description`, `status`, `timestamps`

### Pages (Dynamic Content)
- `id`, `page_name`, `section_key`, `title`, `content`, `order_index`, `type`, `timestamps`

### Team Members
- `id`, `name`, `role`, `bio`, `profile_image`, `linkedin`, `twitter`, `order_index`, `is_active`, `timestamps`

### Impact Metrics
- `id`, `title`, `description`, `metric_value`, `metric_unit`, `icon_name`, `order_index`, `is_active`, `timestamps`

## 🎨 Design System

The CMS maintains the original design system:

- **Primary Color**: `emerald-800` (#1a4d3e)
- **Typography**: Inter/Geist Sans family
- **Spacing**: Consistent padding/margins from original design
- **Layout**: `max-w-[1440px]` containers with `px-8 lg:px-20`

## 📱 Pages & Features

### Public Pages
1. **Home** (`/`) - Dynamic hero with latest reports preview
2. **Reports** (`/reports`) - Filterable report listing
3. **Report Detail** (`/reports/[slug]`) - Individual report pages
4. **Impact** (`/impact`) - Impact metrics and methodology
5. **Team** (`/team`) - Team member profiles

### Admin Panel
1. **Login** (`/admin/login`) - Secure admin authentication
2. **Dashboard** (`/admin/dashboard`) - Overview with stats
3. **Reports Management** - Create, edit, delete reports
4. **Pages Management** - Edit homepage and other page content
5. **Team Management** - Manage team members

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `POST /api/auth/register` - Create new admin (admin only)

### Reports
- `GET /api/reports` - List reports (with filtering)
- `GET /api/reports/:slug` - Get single report
- `POST /api/reports` - Create report (auth required)
- `PUT /api/reports/:id` - Update report (auth required)
- `DELETE /api/reports/:id` - Delete report (auth required)

### Pages
- `GET /api/pages/:pageName` - Get page content
- `PUT /api/pages/:pageName/:sectionKey` - Update section (auth required)
- `POST /api/pages/bulk` - Bulk update sections (auth required)

### Team
- `GET /api/team` - Get active team members
- `POST /api/team` - Create member (auth required)
- `PUT /api/team/:id` - Update member (auth required)
- `DELETE /api/team/:id` - Delete member (auth required)

### Upload
- `POST /api/upload/image` - Upload image (auth required)
- `POST /api/upload/document` - Upload document (auth required)
- `POST /api/upload/multiple` - Upload multiple files (auth required)

## 🚀 Deployment

### Environment Variables Required
```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=esgfutures
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Server
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Production Steps
1. Set up production MySQL database
2. Configure environment variables
3. Run `npm run build` for frontend
4. Start backend with `npm start`
5. Serve frontend build files with nginx/Apache

## 🎯 Next Steps

1. **Customize Design**: Modify colors, fonts, and layout in CSS
2. **Add Features**: Implement comments, search, notifications
3. **SEO Enhancement**: Add sitemap, robots.txt
4. **Performance**: Implement caching, CDN
5. **Security**: Rate limiting, input validation, HTTPS

## 🐛 Troubleshooting

### Common Issues
- **Database Connection**: Check `.env` credentials and MySQL service
- **CORS Errors**: Verify `FRONTEND_URL` in backend `.env`
- **Upload Issues**: Ensure `uploads` directory exists and is writable
- **Auth Problems**: Clear browser localStorage and check JWT secret

### Development Tips
- Use browser dev tools to monitor API calls
- Check console for React warnings/errors
- Test file uploads with various file types
- Verify database changes in MySQL workbench

## 📄 License

MIT License - Feel free to modify and distribute

---

**ESG Futures CMS** - Transforming ESG Intelligence into Strategic Advantage 🌱
