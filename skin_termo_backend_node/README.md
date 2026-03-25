# SkinTermo Backend (Node.js + Express + TypeScript)

This is the backend service for the SkinTermo application. It provides a RESTful API for user authentication, skin condition analysis, doctor portals, and AI-assisted chat functionality. 

This backend is built to run on **Node.js** with **Express** and **TypeScript**.

## 🚀 Technologies

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (via Sequelize ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **AI Integration:** ZhipuAI API (GLM-4 model)

---

## 📂 Project Structure

```text
skin_termo_backend/
├── src/
│   ├── config/          # Environment & Database Configuration
│   ├── controllers/     # Route Controllers (Logic)
│   ├── middlewares/     # Auth, Validation & Error Handling
│   ├── models/          # Database Models / Schemas
│   ├── routes/          # Express Routes Definitions
│   ├── services/        # External Services (ZhipuAI Integrations)
│   ├── utils/           # Utility Functions (Hashing, Token Gen)
│   └── index.ts         # Application Entry Point
├── uploads/             # Static Directory for Uploaded Images
├── .env                 # Environment Variables
├── package.json         # Project Dependencies
└── tsconfig.json        # TypeScript Configuration
```

---

## 🛠️ Setup & Installation

**1. Clone the repository**
```bash
git clone <repository_url>
cd skin_termo_backend
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure Environment Variables**
Create a `.env` file in the root directory based on `.env.example`:
```env
# SkinTermo Backend Environment Configuration
# PostgreSQL Database
DB_NAME=skintermo
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=5432

# JWT Secret
JWT_SECRET=skintermo_secret_key_change_in_production

# Zhipu AI Configuration
ZHIPU_API_KEY=your_actual_zhipu_api_key_here

# Server
PORT=3000
```

**4. Start the Application**

**Development mode:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### 🔐 Authentication (`/auth`)
* `POST /auth/register` - Create a new user (patient or doctor)
* `POST /auth/login` - Authenticate a user and receive a JWT access token
* `GET /auth/me` - Get profile details of the currently authenticated user
* `PATCH /auth/me` - Update current user profile (ex: email, name)

### 🩺 Skin Analysis (`/analysis`)
* `POST /analysis/scan` - Upload a base64 encoded image to receive AI-assisted skin assessment (ZhipuAI Integration)
* `GET /analysis/history` - Retrieve a history of past skin scans for the logged-in user

### 👨‍⚕️ Doctor Portal (`/doctor` & `/doctors`)
* `GET /doctors` - Fetch a list of verified doctors for patients
* `POST /doctor/onboarding` - Create or update a doctor's specialized profile directly after registration
* `GET /doctor/me/profile` - Get logged-in doctor's detailed profile
* `GET /doctor/profile/:userId` - View a specific doctor's profile by their user ID

### 💬 AI Chat & Consultations (`/chat`)
* `POST /chat/sessions` - Create a new chat session history instance
* `GET /chat/sessions` - Retrieve all user's historical chat sessions
* `GET /chat/sessions/:sessionId` - Get specific session details
* `POST /chat/sessions/:sessionId/messages` - Add a new message to an existing session
* `POST /chat/message` - Quick stateless chat response powered by SkinTermo AI (Cardiology & Dermatology specialist prompt)

### 👑 Admin Endpoints (`/admin`)
* `GET /admin/doctors` - Retrieve a list of all doctors for moderation
* `GET /admin/users` - Retrieve a list of all users
* `PATCH /admin/doctor/:doctorId/location` - Update geographic coordinates for a doctor
* `DELETE /admin/users/:userId` - Delete a user's account

---

## 📸 Static Files

The `uploads/` directory is mapped to `/uploads` on the server and is used for serving skin scan images saved by the `/analysis/scan` endpoint.

## 🤝 Contributing

When contributing to this Node.js repository, ensure all TypeScript typings are strictly enforced. Create interfaces for all request payload requirements and database schemas to ensure runtime safety.
