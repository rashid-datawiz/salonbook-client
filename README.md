# SalonBook — Client Application

> **Assignment 9 — Category: 002**  
> Luxury Salon & Concierge Grooming Appointment Booking Platform.

---

## 📌 Project Overview

**SalonBook** is a modern, responsive, full-stack appointment booking web application built with **Next.js 16 (App Router & React 19)**, **TypeScript**, and **Tailwind CSS**. It connects discerning clients with certified master artisans for bespoke salon rituals and grooming services.

The platform provides a dual role-based experience:
- **Clients (Customers)**: Explore curated services, filter by category, sort by price, reserve specific time slots, manage appointments, and complete payments securely via **Stripe**.
- **Administrators**: Control the salon catalog, upload service visuals, confirm or cancel incoming client requests, manage registered users (with block/unblock controls), and monitor an immutable, cryptographically verified **Stripe Financial Ledger**.

---

## ✨ Key Features

### 1. Public Experience & Discovery
- **Hero & Curated Showcase**: Luxury editorial landing page with quick appointment call-to-actions.
- **Dynamic Categories Grid**: Explore services across 8 disciplines (*Haircut & Styling, Beard & Hot Shave, Hair Coloring, Facial & Skincare, Spa & Massage, etc.*).
- **Featured Rituals**: Showcase of the most popular active services directly from the database.
- **Browse Services Catalog (`/services`)**:
  - Live client-side and URL-synced search by service name.
  - Category pill filter with dynamic counts.
  - Challenge Requirement: **Sorting by price (ascending/descending)** and duration.
  - Zero-state reset controls.
- **Dynamic Service Details & Booking (`/services/[id]`)**:
  - Full ritual breakdown, duration, price, and sterilization guarantee.
  - Role-aware booking widget (Guests guided to sign in, Admins warned against client booking, Inactive rituals locked).
  - Predefined time-slot picker (*09:30 AM to 07:00 PM*) and optional stylist notes.

### 2. Role-Based Authentication & Route Protection
- **Better Auth Integration**: Email/password registration and Google OAuth sign-in.
- **Password Strength Policy**: Minimum 6 characters, at least one uppercase and one lowercase letter.
- **Automatic Role-Based Redirection**: Users are routed to their designated dashboard after authentication.
- **Strict Route Guards**: Prevents cross-dashboard privilege escalation; blocked users are instantly denied access.

### 3. Customer Dashboard (`/dashboard/customer`)
- **Overview**: 4 live KPI counters (*Total Requests, Pending, Confirmed, Cancelled*) + upcoming appointment preview.
- **My Appointments Ledger**:
  - Status tracking (*Pending, Confirmed, Cancelled*) & Payment status (*Unpaid, Paid*).
  - Cancel pending requests with confirmation dialog.
  - **Pay Now**: Direct checkout session creation with hosted Stripe checkout redirection.
  - View full appointment receipts.
- **Customer Profile**: Manage contact phone, address, and preferred master stylist.

### 4. Admin Dashboard (`/dashboard/admin`)
- **Overview**: 6 operational KPI counters (*Registered Customers, Active Services, Total Appointments, Pending, Confirmed, Successful Payments*).
- **Manage Services**: Searchable service table with live Active/Inactive visibility toggle, edit dialog, and delete confirmation.
- **Add / Update Service**: Comprehensive ritual creator with file-based image upload and live preview.
- **Manage Appointments**: Review customer requests, confirm pending appointments, or cancel conflicting slots.
- **Manage Users**: Audit registered customer directory, lifetime booking volume, and toggle Block/Unblock permissions.
- **Transactions (Read-Only)**:
  - Strict compliance enforcement: Read-only ledger preventing manual financial modifications.
  - 4 financial KPIs (*Gross Volume, Paid Transactions, Avg. Ticket, Webhook Sync Status*).
  - Searchable table with customer avatar, service name, slot, bold price, shortened Stripe session pill with copy button, and official receipt inspection dialog.
- **Admin Profile**: Superuser credentials and administrative audit status.

### 5. Stripe Payment Gateway Flow
- Secure hosted Stripe Checkout sessions created on the backend.
- **Payment Success Page (`/payment/success`)**: Verifies cryptographic session return and displays verified receipt.
- **Payment Cancel Page (`/payment/cancel`)**: Informs the client their confirmed slot is held unpaid for future completion.

---

## 🛠 Technology Stack

- **Framework**: [Next.js 16.4.6](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19.3.0](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/) & JWT
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: Toast system & accessible dialogs

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v20.x` or higher
- npm or yarn

### 1. Clone the Repository
```bash
git clone <client-repo-url>
cd salonbook-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000
DB_URI=your_mongodb_connection_string
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Required Environment Variables (Names Only)

- `NEXT_PUBLIC_API_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `DB_URI`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

---

## 🔗 Project Links

- **Live Application**: *https://salonbook-client-rose.vercel.app/*
