# 🎵 Raadhyam Music Portal

A full-stack music education platform with an admin dashboard, student portal, course management, music notes library, and OTP-based authentication.

---

## Tech Stack

| Layer    | Technology |
|----------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend  | Node.js, Express 5, MongoDB (Mongoose) |
| Auth     | JWT, Google OAuth (Passport.js) |
| Storage  | Cloudinary (images/videos) |
| Email    | Nodemailer (Gmail SMTP) |

---

## Project Structure

```
Raadhyam Portal/
├── Backend/
│   ├── config/          # DB, Cloudinary, Passport
│   ├── controllers/     # Auth, Admin, Course, User
│   ├── middlewares/     # JWT auth, isAdmin, upload
│   ├── models/          # User, Course, Enrollment, Progress, Notes
│   ├── routes/          # Auth, Admin, Course, User, Dashboard
│   ├── utils/           # sendEmail.js
│   ├── .env.example     # ← copy to .env and fill values
│   └── server.js
├── Frontend/
│   ├── src/
│   │   ├── AdminDashboard/   # Admin panel pages
│   │   ├── UserDashboard/    # Student portal pages
│   │   ├── Auth/             # Login, Register, ForgotPassword
│   │   └── WelcomePages/     # Public landing pages
│   ├── .env.example     # ← copy to .env if needed
│   └── vite.config.js
└── README.md
```

---

## Quick Start

### 1. Clone & Install

```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

### 2. Configure Environment

```bash
# Backend
cd Backend
cp .env.example .env
# Fill in your values (MongoDB URL, JWT secret, etc.)
```

**Minimum required to run:**
```env
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/raadhyam
JWT_SECRET=any_random_string_32_chars_min
SESSION_SECRET=another_random_string
CLIENT_URL=http://localhost:5173
```

### 3. Run

```bash
# Terminal 1 — Backend
cd Backend
npm run dev        # runs on http://localhost:5000

# Terminal 2 — Frontend
cd Frontend
npm run dev        # runs on http://localhost:5173
```

### 4. Default Admin Login

When the backend starts for the first time, it seeds an admin account:

| Field    | Value                  |
|----------|------------------------|
| Email    | `admin@raadhyam.com`   |
| Password | Check your .env file  |

---

## Features

### Public Pages
- Home, About Us, Courses, Music Notes, Contact

### Authentication
- Email + Password login with CAPTCHA
- Google OAuth sign-in
- OTP-based forgot password (email → 6-digit OTP → new password)
- JWT tokens stored in localStorage

### Admin Dashboard (`/dashboard/admin`)
- Overview stats (courses, enrollments, students, revenue)
- Course management — create, edit, publish, add modules & lessons
- Music Notes management — upload tabs, lyrics, notation
- Student management — view profiles, enrollment history, progress

### Student Portal (`/dashboard/home`)
- Dashboard with enrolled courses and notes preview
- Explore Courses — browse, view details, enroll
- My Courses — enrolled courses with progress tracking
- Course Viewer — module/lesson navigation, video playback
- Music Notes — view tabs, lyrics, download

---

## Environment Variables

### Backend (`Backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URL` | ✅ | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Secret for signing JWT tokens |
| `SESSION_SECRET` | ✅ | Secret for express-session |
| `CLIENT_URL` | ✅ | Frontend URL for CORS (`http://localhost:5173`) |
| `PORT` | ❌ | Server port (default: 5000) |
| `EMAIL_USER` | ❌ | Gmail address for OTP emails |
| `EMAIL_PASS` | ❌ | Gmail App Password (not login password) |
| `CLOUDINARY_CLOUD_NAME` | ❌ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ❌ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ❌ | Cloudinary API secret |
| `GOOGLE_CLIENT_ID` | ❌ | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ❌ | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | ❌ | OAuth callback URL |

### Frontend (`Frontend/.env`)

The frontend proxies all `/api` requests to the backend via `vite.config.js`. No `.env` is required for local development.

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Override backend URL (production only) |

---

## Email Setup (OTP)

To enable OTP emails for forgot password:

1. Enable 2-Step Verification on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Create an App Password for "Mail"
4. Add to `.env`:
   ```env
   EMAIL_USER=your@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   ```

> **Dev mode**: If email is not configured, the OTP is returned in the API response and auto-filled in the form for testing.

---

## Adding Course Content (Admin)

1. Admin → **Courses** → click **⚙ Manage** on a course
2. Click **"Add Module"** → enter title + description
3. Inside the module, click **+** → **Add Lesson**
4. Enter lesson title, choose type (Video / PDF / Text)
5. For video: paste a YouTube URL or direct video link
6. Save — content is immediately available to enrolled students

---

## API Routes

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/send-otp` | Send OTP to email |
| POST | `/api/auth/verify-otp` | Verify OTP |
| POST | `/api/auth/reset-password-otp` | Reset password with token |
| GET  | `/api/auth/check-auth` | Verify JWT token |

### Courses (Public)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/courses` | List published courses |
| GET | `/api/courses/:id` | Get course with modules/lessons |

### Admin (requires admin JWT)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/dashboard/stats` | Dashboard statistics |
| GET/POST | `/api/admin/courses` | List / create courses |
| PUT/DELETE | `/api/admin/courses/:id` | Update / delete course |
| GET/POST | `/api/admin/music-notes` | List / create notes |
| GET | `/api/admin/users` | List all users |
| GET | `/api/admin/users/:id` | User detail with enrollment stats |

### User Dashboard (requires user JWT)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/user/courses` | Get enrolled courses |
| POST | `/api/user/enroll` | Enroll in a course |
| GET | `/api/music-notes` | Get all music notes |

---

## Deployment

### Backend (e.g. Railway / Render)
1. Set all environment variables in the platform dashboard
2. Set `NODE_ENV=production`
3. Start command: `node server.js`

### Frontend (e.g. Vercel / Netlify)
1. Build: `npm run build`
2. Set `VITE_API_URL=https://your-backend-url.com`
3. Update `CLIENT_URL` in backend `.env` to your frontend domain

---

## License

MIT — built for Raadhyam Musical Classes.
