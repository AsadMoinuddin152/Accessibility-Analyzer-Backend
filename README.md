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

<pre lang="markdown"> ### 📁 Backend Folder Structure ```plaintext backend/ ├── config/ # Configuration files │ ├── mongo.js # CosmosDB (MongoDB API) connection setup │ └── sql.js # Azure SQL connection setup ├── .env # Environment variables for secrets and config ├── server.js # Main entry point to start the Express app ├── app.js # Express app setup with middleware (helmet, cors, etc.) ├── routes/ # API route definitions for audit-related actions ├── controllers/ # Business logic, like triggering analysis ├── models/ # Data models/schemas (e.g., audit logs, user submissions) ``` </pre>

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

---

## ✅ Today's Progress (📅 14th May 2025)

### 🧑‍💻 Authentication & User Management

- ✅ User login and authentication APIs are fully implemented
- ✅ Token-based authentication system integrated using **JSON Web Token (JWT)**
- ✅ `argon2` used for secure password hashing
- ✅ JWT middleware (`jwtAuth`) added to protect private routes
- ✅ Forgot password feature implemented using password reset logic
- ✅ User CRUD routes implemented:
  - Create user (Signup)
  - Login user
  - Update user
  - Delete user
  - Get all users
  - Get user by ID

### 🧪 Testing & Validation

- ✅ All API test cases have been written and are passing
- ✅ End-to-end user creation and login flows tested manually
- ✅ Verified JWT token generation and route protection

### 📁 Database Integration

- ✅ Azure SQL Database connected and tested (`user-info-db`)
- ✅ Azure Cosmos DB (MongoDB API) connected and tested (`asad-mongo-db`)
- ✅ Created config files:
  - `config/sql.js` for SQL connection
  - `config/mongo.js` for Cosmos DB connection

### 👤 Example Test User (for manual login tests)

```json
{
  "name": "Asad Moinuddin",
  "email": "asad@example.com",
  "phone": "9876543210",
  "password": "Test@1234"
}
```

## 🎯 Frontend Setup and Libraries

### 🧑‍💻 Frontend Libraries and Dependencies

The frontend of the application uses the following key npm libraries to build the user interface and functionality:

- **Material UI (MUI)**: For building the UI components with a modern design system.

  - `@mui/material`: Core MUI components.
  - `@mui/icons-material`: MUI icons for use in the UI.

- **Ant Design (antd)**: For additional UI components like tables, modals, etc.

  - `antd`: Ant Design UI library.

- **Axios**: For making HTTP requests to interact with backend APIs.

  - `axios`: Promise-based HTTP client for the browser and Node.js.

- **Redux**: For managing the global state of the application.

  - `@reduxjs/toolkit`: A set of tools to simplify Redux development.
  - `react-redux`: React bindings for Redux.

- **React Hook Form**: For handling form state and validation.

  - `react-hook-form`: Simple, performant form handling.

- **React Router**: For routing between different pages of the app.

  - `react-router-dom`: DOM bindings for React Router.

- **React Toastify**: For showing toast notifications to the user.

  - `react-toastify`: React component for easy-to-use notifications.

- **Yup**: For form validation schema.

  - `yup`: JavaScript schema builder for value parsing and validation.

- **Redux Persist**: For persisting Redux state (e.g., user session data).

  - `redux-persist`: To persist parts of the Redux state across page reloads.

- **Dayjs**: For handling and formatting dates.

  - `dayjs`: A lightweight date library.

- **React Spinners**: For loading indicators.
  - `react-spinners`: Provides customizable spinners.

---

### ⚙️ Development Tools

- **ESLint**: For linting the JavaScript code to ensure code quality.

  - `eslint`: Linter for JavaScript and JSX.
  - `@eslint/js`: ESLint configuration.

- **Jest**: For testing the frontend components and ensuring functionality.
  - `jest`: JavaScript testing framework.
  - `@testing-library/react`: For testing React components in a user-centric way.
  - `@testing-library/jest-dom`: For custom DOM element matchers for Jest.
  - `@testing-library/user-event`: For simulating user events in tests.

---

### 🚀 Scripts

Here are the available scripts to run and build the frontend:

- **`dev`**: Starts the development server using Vite.
- **`build`**: Builds the app for production.
- **`lint`**: Runs ESLint on the project to check for code issues.
- **`preview`**: Previews the production build.
- **`test`**: Runs Jest tests to ensure the frontend works as expected.

## User Flow Diagram

```mermaid
graph TD
  A[Landing Page] -->|Scan Now| B(URL Input Modal)
  A -->|Sign Up| C[Auth: Signup Flow]
  A -->|Login| D[Auth: Login]
  B -->|Guest Mode| E[Dashboard]
  C --> E
  D --> E
  E -->|New Scan| F[Report View]
  F -->|Save| G[Project History]
  F -->|Export| H[Share Modal]
```

## Key Features

1. **One-Click Scanning**

   - Paste any URL for instant WCAG analysis
   - Real-time progress tracking

2. **Interactive Reports**

   - Filter violations by severity (Critical/Warning/Info)
   - Side-by-side "Before/After" fix previews

3. **Project Management**
   - Save scans to projects
   - Track accessibility improvements over time

Page Features & Implementation

## 1. Landing Page

**Goal:** Convert visitors in 10 seconds

| Feature         | Implementation Strategy                     |
| --------------- | ------------------------------------------- |
| URL Input Field | Use MUI TextField with URL validation regex |

## 2. Auth Pages

**Goal:** Minimize signup friction

| Feature        | Implementation Strategy                                |
| -------------- | ------------------------------------------------------ |
| 2-Step Signup  | Form wizard pattern with session storage between steps |
| Password Meter | Zxcvbn library integration for strength analysis       |
| SSO Options    | Firebase Auth or Auth0 social login integration        |
| Guest Mode     | LocalStorage for temporary session data                |

## 3. Dashboard

**Goal:** Centralized scan management

| Feature        | Implementation Strategy                                     |
| -------------- | ----------------------------------------------------------- |
| Project List   | Virtualized list for performance with expandable cards      |
| Scan Summary   | Radial progress chart for accessibility score visualization |
| Violation Tabs | WCAG-categorized tabs with expandable violation cards       |
| Quick Filters  | Redux-managed filter state with debounced updates           |

## 4. Report Page

**Goal:** Actionable insights

| Feature          | Implementation Strategy                                |
| ---------------- | ------------------------------------------------------ |
| Visual Overlay   | HTML2Canvas for screenshot with SVG violation markers  |
| Code Inspector   | Monaco Editor for syntax-highlighted code snippets     |
| Fix Demos        | Lottie animations for complex interaction guidance     |
| Timeline Compare | Overlaid Chart.js graphs for historical trend analysis |

## 5. Settings

**Goal:** Personalized configuration

| Feature            | Implementation Strategy                              |
| ------------------ | ---------------------------------------------------- |
| WCAG Presets       | Dropdown with version-specific rule sets             |
| Integration Setup  | OAuth flows with platform-specific API wrappers      |
| Notification Prefs | Toggle switches grouped by notification type         |
| Avatar Upload      | Cloudinary widget with auto-cropping and compression |

---

## Implementation Flow

```mermaid
graph LR
  A[Landing Page] -->|Convert| B[Auth]
  B -->|Authenticate| C[Dashboard]
  C -->|Scan| D[Report]
  D -->|Save| C
  C -->|Configure| E[Settings]
```

## ✅ Today's Progress (📅 15th May 2025)

### 🧑‍💻 Frontend Architecture & Routing

- ✅ React Router set up with the following pages:
  - `/` → Landing Page
  - `/auth` → Login/Signup Page
  - `/dashboard` → User Dashboard (protected)
  - `/report/:scanId` → Scan Report Viewer
  - `/settings` → User Preferences
- ✅ Protected route implemented using Redux state + session validation logic:
  - Redirects to `/auth` if token is missing, expired, or user is not authenticated
  - Shows notification modal before redirecting

### 🔐 Authentication & Redux State

- ✅ Created Redux slice `authSlice` with:
  - `token`, `user`, `isAuthenticated`, `isGuest`, and `lastLogin` fields
  - `loginSuccess`, `logout`, and `guestLogin` actions
- ✅ Integrated Redux Persist to store state in `localStorage`

### 🎨 Auth Pages & UI Components

- ✅ Built dynamic Auth Page:
  - Toggles between Login and Signup
  - Integrated password validation, instructions, and form control
  - Signup includes password strength feedback and T&C checkbox
- ✅ Created reusable Notification Modal:
  - Auto-close feature with progress bar animation
  - Used for alerts like session expiration and auth redirects

## ✅ Today's Progress (📅 17th May 2025)

### 🔐 Authentication API Integration

- ✅ Successfully connected to the backend **Signup API** and verified its response:
  - Received JWT token and user details: `{ id, name, email, phone }`
- ✅ Extracted and parsed the response structure correctly for frontend use

### 🧑‍💻 Redux Integration for Auth State

- ✅ Implemented `loginSuccess` dispatch with correct payload:
  - Parsed user fields from `result.data.user` and stored in Redux
- ✅ Fixed mismatch in accessing user fields:
  - Replaced `result.data.userId`, `name`, `email` with correct `result.data.user.id`, etc.
- ✅ Verified Redux state using `useSelector` and ensured placement inside component body

### 🧠 UX Handling After Auth

- ✅ Added redirect logic with `setTimeout` to simulate post-signup/login redirect delay
  - Set a `redirecting` state after 2 seconds of successful auth
- ✅ Verified `auth` state with `console.log(auth)` to ensure proper state update
