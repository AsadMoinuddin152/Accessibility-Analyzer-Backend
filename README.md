# Accessibility Analyzer — Project Aims

This document defines the individual aims of the **Backend** and **Frontend** components of the Accessibility Analyzer project, the current tech stack, and completed milestones.

---

## ✅ Backend — Project Aim

### 🎯 Aim

The backend service is responsible for **automating web accessibility audits** using `Puppeteer` and `axe-core`. It accepts a public website URL, loads the page in a headless browser, injects the axe-core script, and returns a structured list of **WCAG violations** found on that page.

This service is stateless, lightweight, and designed to be consumed by any frontend or API client.

Its aim is to **abstract away the complexity of browser automation and accessibility scanning**, exposing a clean REST API for accessibility evaluation.

### 📌 Core Responsibilities

- Accept and validate user-submitted URLs
- Run accessibility analysis using `axe-core`
- Return WCAG 2.0/2.1 violation reports in JSON
- Ensure fast and secure performance with headless browser isolation
- ✅ **[Planned]** Store/report logs or audit results to **Azure SQL** and **CosmosDB** for analytics or history tracking

---

## ✅ Frontend — Project Aim

### 🎯 Aim

The frontend provides an intuitive and responsive **user interface** that allows users to submit URLs and view accessibility analysis reports. Built using **React**, its main goal is to offer a clean workflow where users can easily:

1. Input a website URL
2. Trigger an audit
3. View categorized and formatted accessibility issues

The frontend bridges non-technical users with the audit engine by providing **accessible summaries, filters, and UI-friendly results**.

### 📌 Core Responsibilities

- Provide a URL submission form with validation
- Communicate with the backend via REST API
- Display real-time analysis results in a readable format
- Ensure the frontend is itself WCAG-compliant
- ✅ **[Planned]** Display audit history and logs fetched from the connected databases

---

## 🧱 Current Tech Stack & Structure

### 📁 Backend Structure

backend/
├── config/
│ ├── mongo.js # CosmosDB (MongoDB API) connection
│ └── sql.js # Azure SQL connection
├── .env # Environment variables
├── server.js # Main Express app entry point
├── app.js # Middleware setup (helmet, cors, etc.)
├── routes/ # Placeholder for audit routes
├── controllers/ # Placeholder for logic (e.g., analyze)
├── models/ # Placeholder for DB schemas

### 💾 Database Stack

- **MongoDB (Cosmos DB - API for Mongo):**

  - Connected via `mongodb@3.6.10`
  - Auth via connection string in `.env`
  - Used for storing raw scan logs or JSON results

- **Azure SQL Database:**
  - Connected via `mssql` package
  - Used for structured audit metadata and analytics
  - Connection securely handled with environment variables

---

## ✅ Today's Progress (📅 13th May 2025)

### ✅ Database Integration Completed

- 🔌 Connected **Azure SQL Database** to the backend using the `mssql` package

  - SQL Server: `asad-sql-server-unique`
  - Database: `user-info-db`
  - IP firewall rule configured to allow development environment

- 🔗 Connected **Azure Cosmos DB (MongoDB API)** using `mongodb@3.6.10`

  - Cosmos DB Name: `asad-mongo-db`
  - Secure connection with SSL and retry logic

- ⚙️ Created modular connection files:

  - `config/sql.js` → Manages SQL connection
  - `config/mongo.js` → Manages Mongo connection

- ✅ All database connection tests completed successfully
