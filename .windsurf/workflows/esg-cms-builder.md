---
auto_execution_mode: 3
---

You are a senior full-stack engineer with 10+ years experience in production systems.

Your task is to MODIFY an EXISTING project built with:

- NextJS (JSX only)
- Tailwind CSS

The project currently contains a fully designed **Home Page** with a **perfect color palette, typography system, layout spacing, and component structure.**

IMPORTANT RULE:
Before writing any code, you MUST:

1. Scan the entire project.
2. Analyze the existing Home page.
3. Extract and understand:
   - color palette
   - typography scale
   - spacing system
   - layout grid
   - component patterns
4. Reuse these EXACT design principles across the entire project.

DO NOT redesign the UI.
DO NOT change colors.
DO NOT introduce a new design system.

The current homepage design is the **design reference for the entire website**.

All new pages MUST follow the same visual language.

---

PROJECT GOAL

Convert the existing project into a **fully dynamic CMS-driven website** with:

Frontend:

- NextJS (JSX ONLY, NO TypeScript)
- Tailwind CSS
- Axios
- React Router DOM
- React Context API (NO Redux unless absolutely unavoidable)

Backend:

- Node.js + Express
- Sequelize ORM
- MySQL (managed via phpMyAdmin)
- JWT Authentication
- Multer (file uploads)

The system must include:

1. Public website
2. Admin CMS panel
3. Dynamic content management
4. Database driven content

---

FINAL WEBSITE STRUCTURE

Pages required:

1. Home
2. Reports
3. Impact
4. Team
5. Individual Report Page

Navigation must be persistent across pages.

---

CONTENT STRUCTURE

Create database models for all editable content.

---

DATABASE MODELS (SEQUELIZE)

Admin

- id
- name
- email
- password
- role
- createdAt
- updatedAt

Reports

- id
- title
- slug
- abstract
- content
- category
- author
- featured_image
- published_date
- createdAt
- updatedAt

Pages

- id
- page_name
- section_key
- title
- content
- order_index
- createdAt
- updatedAt

Team

- id
- name
- role
- bio
- profile_image
- linkedin
- createdAt
- updatedAt

ImpactMetrics

- id
- title
- description
- createdAt
- updatedAt

---

BACKEND REQUIREMENTS

Create a clean API architecture.

Folder structure:

/server
/config
/controllers
/middleware
/models
/routes
/services
/uploads
app.js

Required features:

Authentication

- JWT login
- Admin authentication middleware
- Password hashing

Reports API

- Create report
- Update report
- Delete report
- List reports
- Get report by slug
- Upload report image

Pages API

- Update homepage sections
- Update impact content
- Update team page content

Team API

- CRUD team members

File Uploads

- Multer
- Store images in /uploads

Security

- JWT protected routes
- input validation
- error handling

---

FRONTEND STRUCTURE

Maintain NextJS with JSX.

Structure:

/src
/components
/pages
/context
/services
/layouts
/admin

Use:

Axios for API calls.

React Context API for:

- auth state
- global content state

---

PUBLIC PAGES

HOME PAGE

Use the existing homepage layout.

Replace hardcoded text with dynamic content.

Sections:

Hero
Project intro
Problem statement
What we do
Who we serve
Core principles
Call to action
Featured report preview

Content to insert:

TITLE
ESGFuture
Turning ESG Intelligence into Strategic Advantage

SUBTITLE
Making sustainability simple, transparent, and actionable.

DESCRIPTION
ESGFuture is a sustainability advisory and research platform that transforms complex environmental, social, and governance (ESG) information into clear, structured insight for better decision-making.

PROBLEM SECTION
ESG information is everywhere. Clarity is not.

Key problems:

- complex ESG disclosures
- fragmented standards
- generic ratings
- greenwashing

WHAT WE DO

ESG Advisory
Sustainability Research
ESG Education

WHO WE SERVE

Retail Investors
Companies & Early-Stage Initiatives

CORE PRINCIPLES

Accessible Intelligence
Contextual Evaluation
Balanced Assessment
Impact Over Compliance
Action-Oriented Insight

CTA

Start with clarity. Act with confidence.
Begin your ESG journey with ESGFuture.

---

REPORTS PAGE

This page must be dynamic.

Display:

- report title
- publish date
- short abstract
- category

Add filtering by:

- climate
- governance
- sustainability
- finance
- research

Clicking a report opens:

/reports/[slug]

---

REPORT ARTICLE PAGE

Dynamic route.

Display:

Title
Author
Date
Full content
Featured image

Include related reports.

---

IMPACT PAGE

Dynamic CMS content.

Sections:

Turning Insight into Meaningful Progress

Impact metrics:

Performance Benchmarking
Risk Identification
Progress Tracking
Implementation of Recommendations

---

TEAM PAGE

Display:

Founder:

Ved Siddharth Kedia
Founder, ESGFuture

Include:

photo
bio
title

CMS editable.

---

ADMIN PANEL

Create admin dashboard.

Routes:

/admin/login
/admin/dashboard
/admin/reports
/admin/pages
/admin/team

Features:

Login
Create report
Edit report
Delete report
Upload report images
Edit homepage content
Edit impact page
Manage team members

---

CMS REQUIREMENTS

Admin must be able to:

Add new reports
Edit report content
Upload images
Edit homepage sections
Update team members
Update impact page content

All content must come from database.

NO HARDCODED TEXT.

---

SEO FEATURES

Reports should generate SEO friendly slugs.

Example:

/reports/double-materiality-explained

Add:

meta title
meta description

---

PERFORMANCE

Use:

lazy loading
clean API structure
minimal re-renders
component reuse

---

CODE QUALITY

Requirements:

- clean folder architecture
- reusable components
- consistent naming
- separation of concerns
- proper error handling

---

DELIVERABLES

1. Backend API (Express + Sequelize)
2. MySQL schema
3. CMS Admin panel
4. Dynamic frontend pages
5. API integration with Axios
6. Auth system with JWT
7. File uploads with Multer
8. Fully dynamic reports system

---

IMPORTANT

Do NOT redesign the homepage.

The homepage is the **visual design source of truth**.

All new pages must inherit its:

- layout
- spacing
- typography
- color palette
