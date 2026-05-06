# 🤖 AI Lead Generation & Client Closing Engine (CRM AutoPilot)

An **AI-powered CRM and sales automation platform** that automates the entire lead lifecycle — from **lead creation and AI cold outreach** to **reply intent detection, proposal generation, and payment tracking**.

The system is built as a **full-stack SaaS-style application** with a **FastAPI backend** and a **React frontend**, designed to simulate a real-world **AI sales agent + CRM autopilot**.

backend: https://ai-lead-generation-client-closing-engine-mqqd.onrender.com
frontend: https://ai-lead-generation-client-closing-e-gilt.vercel.app

---

## 🚀 Project Overview

**CRM AutoPilot** helps businesses and sales teams automate lead generation and client closing using AI.

### What this system does:
- Stores and manages leads
- Uses AI to generate cold emails
- Sends emails automatically via SMTP
- Classifies replies using AI intent detection
- Moves leads through a real sales pipeline
- Generates proposals
- Tracks payments via Stripe webhooks
- Supports multiple roles (Admin & Agent)

This project demonstrates **AI + backend engineering + frontend dashboards + real SaaS workflows**.

---

## 🧠 AI-Driven Sales Flow

Lead Created
↓
AI Cold Email Generated
↓
Email Sent (SMTP)
↓
Reply Received (Webhook)
↓
AI Intent Classification
↓
Lead Status Updated
↓
Proposal Generated
↓
Payment Link Sent
↓
Stripe Webhook → PAID


---

## ✨ Features

### 👤 Authentication & Roles
- JWT-based authentication
- Role-based access:
  - **ADMIN**
  - **AGENT**

---

### 🧲 Lead Management
- Create and assign leads
- Track lead lifecycle:
  - `NEW`
  - `CONTACTED`
  - `INTERESTED`
  - `PROPOSAL_SENT`
  - `PAID`
- Assign leads to agents
- Lead activity tracking

---

### 🤖 AI Capabilities
- AI-generated cold emails (Google Gemini)
- AI reply intent detection:
  - INTERESTED
  - NOT_INTERESTED
  - MAYBE
  - UNKNOWN
- Automatic lead status updates

---

### 📧 Email Automation
- SMTP email sending
- Email logs with delivery status
- Webhook-based reply processing
- Safe fallback email generation

---

### 💳 Payments & Closing
- Stripe payment integration
- Webhook-based payment confirmation
- Automatic lead status update on payment
- Payment records stored in DB

---

### 📊 Dashboards
- Admin dashboard:
  - View leads
  - Manage agents
  - View payments
- Agent dashboard:
  - Assigned leads
  - Email composer
  - Activity timeline
  - Settings & profile

---

## 🧱 Tech Stack

### Backend
- **Framework:** FastAPI
- **Auth:** JWT (python-jose)
- **ORM:** SQLAlchemy
- **Database:** SQLite
- **AI:** Google Gemini (Generative AI)
- **Payments:** Stripe
- **Email:** SMTP
- **Validation:** Pydantic
- **Webhooks:** Stripe + Email Replies

### Frontend
- **Framework:** React
- **Routing:** React Router
- **State Management:** Redux Toolkit
- **Context:** AuthContext
- **Styling:** Tailwind CSS
- **Auth Guards:** Role-based protected routes

---

## 📁 Project Structure
```bash
ai-lead-engine/
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── models.py
│ │ ├── schemas.py
│ │ ├── database.py
│ │ ├── services/
│ │ ├── routes/
│ │ ├── ai/
│ │ └── core/
│ ├── requirements.txt
│ └── crm.db
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── context/
│ │ ├── app/
│ │ └── auth/
│ ├── index.css
│ └── main.jsx
│
└── README.md

```
---

## ⚙️ Backend Setup

```bash
 1️⃣ Create Virtual Environment
cd backend
python -m venv venv
source venv/bin/activate

2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Environment Variables (.env)
# JWT Configuration
JWT_SECRET_KEY=9e2a933aab96fe66b030c9d6bfc899fb994dd7b1811c94f644e19ff3d41fd91c
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_password
FROM_EMAIL=your_email

# AI
GEMINI_API_KEY=your_api_key

# Payments
STRIPE_WEBHOOK_SECRET=your_webhook_secret

4️⃣ Run Backend
uvicorn app.main:app --reload
Backend runs at:

http://127.0.0.1:8000
```

## ⚙️ Frontend Setup
```bash
1️⃣ Install Dependencies
cd frontend
npm install

2️⃣ Run Frontend
npm run dev
Frontend runs at:

http://localhost:5173
```

## 🔐 Default Admin Account
Created via seed script:

- Email: admin@crm.com
- Password: admin123
- Role: ADMIN
 
## 🔌 API Highlights
### Auth
| Endpoint       | Method | Description                               |
| -------------- | ------ | ----------------------------------------- |
| `/auth/signup` | POST   | Register a new user account               |
| `/auth/login`  | POST   | Authenticate user and return access token |


### Leads
| Endpoint      | Method | Description                                |
| ------------- | ------ | ------------------------------------------ |
| `/leads`      | POST   | Create a new lead                          |
| `/leads`      | GET    | Fetch all leads for the authenticated user |
| `/leads/{id}` | PATCH  | Update lead status or details by lead ID   |


### AI
| Endpoint             | Method | Description                                      |
| -------------------- | ------ | ------------------------------------------------ |
| `/ai/generate-email` | POST   | Generate an AI-powered outreach email for a lead |
| `/replies/process`   | POST   | Analyze and process lead replies using AI        |


### Outreach
| Endpoint         | Method | Description                             |
| ---------------- | ------ | --------------------------------------- |
| `/outreach/send` | POST   | Send automated outreach emails to leads |


### Payments
| Endpoint          | Method | Description                                         |
| ----------------- | ------ | --------------------------------------------------- |
| `/stripe/webhook` | POST   | Handle Stripe payment & subscription webhook events |


## 📊 Business Logic Highlights
- AI decides lead intent

- Lead status auto-updates

- Payment confirmation auto-closes lead

- Secure role-based access everywhere

- Fully event-driven design

## 🎯 Learning Outcomes
- Designing AI-powered SaaS systems

- FastAPI production architecture

- JWT auth & RBAC

- Webhook-driven workflows

- AI integration in real products

- Stripe payment lifecycle

- React + Redux dashboard systems

- Full-stack system design thinking

## 📌 Future Enhancements
- Multi-tenant SaaS support

- Background jobs (Celery / Redis)

- CRM analytics charts

- Multi-channel outreach (WhatsApp, LinkedIn)

- Agent performance scoring

- Deployment (Docker + Cloud)

- Email inbox sync (Gmail / Outlook)
