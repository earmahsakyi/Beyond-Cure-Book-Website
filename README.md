## Beyond the Cure Book - Official Website

This repository contains the source code for **BeyondTheCurebook.com**, the official website for *Beyond the Cure*, a medical nonfiction book by **Henry Anyimadu, MD**.

The site is designed as a **modern, performant, and easy-to-manage CMS-style web application**, allowing the author to update key website content without touching code.

---
## Home page

<img width="1920" height="974" alt="Hero" src="https://github.com/user-attachments/assets/a2ccc400-ead3-4407-8b3f-2d7192656e53" />

<img width="1920" height="968" alt="Chap" src="https://github.com/user-attachments/assets/1d1ffdb1-40a6-451b-a1cb-1fc6ed7aa411" />

## Login Page 
<img width="1920" height="969" alt="Screenshot 2026-01-09 184407" src="https://github.com/user-attachments/assets/e4ccbcdb-b16d-4ae2-8e26-2c1389b2a298" />

## Admin Dashboard
<img width="1920" height="974" alt="Screenshot 2026-01-09 184301" src="https://github.com/user-attachments/assets/63124272-5345-4a5b-a958-cc1d994b95fa" />





## 🌐 Project Overview

**Primary goals of the website:**
- Make it easy to **buy the book**
- Make it easy to **download free resources**
- Make it easy to **book the author for speaking or media**
- Provide a clean, trustworthy, medical-but-warm online presence

The site consists of:
- A **public-facing website** (landing page, resources, media & speaking, contact, legal pages)
- A **secure admin dashboard** for managing content

---

## 🧱 Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Redux Toolkit** (state management)

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **JWT Authentication**

### Cloud & Storage
- **AWS S3** – resource & media file storage
- **Railway** – application hosting
- **Custom Domain** – BeyondTheCurebook.com

---

## 🗂️ Core Features

### Public Website
- Book landing page
- About the book & author
- Resources download page
- Speaking & media information
- Contact form
- Privacy Policy

### Admin Dashboard (CMS)
Admins can:
- Edit **home page content** (hero, book info, chapters, endorsements, CTAs)
- Manage **email subscribers**
- Upload & manage **resources (PDFs, guides)**
- Read **contact form submissions**
- Update content without redeploying the site

> ⚠️ The admin dashboard is intentionally lightweight (no complex CMS UI) to keep the system simple, secure, and maintainable.

---

## 🧠 CMS Design Philosophy

Instead of a heavy CMS (like WordPress), this site uses:
- A **single HomeContent model**
- Controlled admin endpoints
- Structured content editing via the dashboard

This ensures:
- Faster performance
- Better security
- Easier long-term maintenance
- No accidental layout breaking by editors

---

## 🔐 Authentication

- Admin authentication via JWT
- Password reset with secure token hashing
- Progressive account lockout protection
- Admin-only routes protected at API and UI level

---

## 📁 Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000
DATABASE_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your resend api key
EMAIL_FROM=noreply@domain
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name
```
## Running the Project Locally
## Root Folder
npm run dev

## Seeding Initial Content

The database is designed to start with seeded content for:
-Home page sections
-Default CTA text
-This ensures the site renders correctly even before the first admin update.

## Email & Forms

-Email signups are stored in the database
-Contact form submissions are centralized
-Admin can respond via mailto: links directly from the dashboard

📜 Legal Pages

-Privacy Policy (static page)
-Content provided by the client
-Designed for compliance and clarity

##  Collaboration & Deployment

-GitHub used for version control
-Client has repository access
-Deployment handled via Railway
-Domain managed externally and connected to hosting

## 🛠️ Maintenance Notes

-Content updates do not require developer intervention
-New resources can be uploaded by admin
-System designed for scalability if future features are needed

📄 License

This project is proprietary and owned by Beyond the Cure / Sporelight Press.
Unauthorized reuse or redistribution is not permitted.




