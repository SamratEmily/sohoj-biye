# সহজ বিয়ে — Sohoj Biye

A trusted Bangladeshi matrimonial platform built with Laravel 12, React (Inertia.js), and Tailwind CSS. Users can create verified biodatas, browse matches, send proposals, and chat — all in one place.

---

## Features

### User Registration & Verification
- Users register with their **name, email, phone, and password**
- Required document uploads: **profile photo** and **NID (National ID)**
- Optional documents: testimonial, birth certificate, transcript
- All new accounts start with `pending` status and await **admin approval**
- Users receive an email notification once approved or rejected

### Admin Panel
- Admins can review pending registrations along with all submitted documents
- Approve or reject users with an optional rejection reason
- View all registered users with search and status filters
- Monitor all proposals on the platform (read-only overview)

### Biodata
- Approved users can create and edit their own biodata
- Fields include: type (bride/groom), date of birth, marital status, religion, height, weight, complexion, blood group, address (division/district/upazila), education, profession, income, family info, partner preferences, and a personal note
- Biodata is published and visible to other approved users

### Biodata Feed
- Browse all published biodatas in a card grid
- **Advanced filters:**
  - Type (bride / groom)
  - Age range
  - Marital status
  - Religion
  - Division → District → Upazila (cascading dropdowns)
- Text search by name, profession, education, or location
- Paginated results (12 per page)
- Feed is accessible to **both approved users and admins**

### Proposal System
- Any approved user can send a proposal to another user's biodata
- Proposal includes: reason for interest, kabin-nama expectations, gold jewelry expectations
- **The proposal goes directly to the intended person** — no admin involvement
- The receiver sees incoming proposals in their "Received Proposals" section
- Receiver can **Accept** or **Reject** the proposal
- Accepting automatically **opens a chat room** between both users

### Chat
- Chat rooms are created automatically when a proposal is accepted
- Both the sender and receiver can message each other
- Unread message count shown on the chat list
- Chat access is restricted to the two parties involved

### Session-Based Authentication
- Secure login with email and password
- "Remember me" support for persistent sessions
- Sessions stored in the database with 120-minute lifetime
- CSRF protection on all forms
- Role-based access: `admin` vs `user`
- Status-based access: `pending`, `approved`, `rejected`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 12 (PHP) |
| Frontend | React 19 + Inertia.js |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Database | MySQL (via Laravel Eloquent) |
| Session Storage | Database |
| Auth | Laravel Session Guard (no JWT) |
| Email | Laravel Mail (SMTP) |

---

## User Flow

```
Register (with documents)
        ↓
Wait for admin approval
        ↓
Login → Dashboard
        ↓
Create Biodata → Published to Feed
        ↓
Browse Feed → View someone's Biodata
        ↓
Send Proposal (reason + expectations)
        ↓
Receiver sees proposal → Accepts or Rejects
        ↓
If Accepted → Chat Room opens for both
        ↓
Both can now message each other
```

---

## Installation

### Requirements
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd sohoj-biye

# Install PHP dependencies
composer install

# Install JS dependencies
npm install

# Copy environment file and configure
cp .env.example .env
php artisan key:generate
```

Configure your `.env` file:

```env
DB_DATABASE=sohoj_biye
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@sohojbiye.com
MAIL_FROM_NAME="সহজ বিয়ে"
```

```bash
# Run migrations
php artisan migrate

# Create storage symlink for uploaded files
php artisan storage:link

# Build frontend assets
npm run build

# Start the development server
php artisan serve
```

### Create the first admin user

```bash
php artisan tinker
```

```php
App\Models\User::create([
    'name'     => 'Admin',
    'email'    => 'admin@sohojbiye.com',
    'phone'    => '01700000000',
    'password' => bcrypt('your-password'),
    'role'     => 'admin',
    'status'   => 'approved',
]);
```

### Development (with hot reload)

```bash
# Terminal 1 — Laravel
php artisan serve

# Terminal 2 — Vite
npm run dev
```

---

## Route Overview

| Method | Path | Access | Description |
|---|---|---|---|
| GET | `/` | Public | Landing page |
| GET/POST | `/register` | Guest | User registration |
| GET/POST | `/login` | Guest | Login |
| POST | `/logout` | Auth | Logout |
| GET | `/feed` | Auth | Browse biodatas |
| GET | `/feed/{biodata}` | Auth | View single biodata |
| GET | `/dashboard` | Approved | User dashboard |
| GET/POST | `/biodata/create` | Approved | Create biodata |
| GET/PUT | `/biodata/{biodata}/edit` | Approved | Edit biodata |
| GET/POST | `/proposals` | Approved | View / send proposals |
| POST | `/proposals/{proposal}/accept` | Approved | Accept a proposal |
| POST | `/proposals/{proposal}/reject` | Approved | Reject a proposal |
| GET | `/chat` | Approved | Chat list |
| GET | `/chat/{chatRoom}` | Approved | Open a chat |
| POST | `/chat/{chatRoom}/message` | Approved | Send a message |
| GET | `/admin/dashboard` | Admin | Admin overview |
| GET | `/admin/pending-users` | Admin | Pending registrations |
| GET | `/admin/users` | Admin | All users |
| POST | `/admin/users/{user}/approve` | Admin | Approve a user |
| POST | `/admin/users/{user}/reject` | Admin | Reject a user |
| GET | `/admin/proposals` | Admin | View all proposals |

---

## Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── AuthController.php       # Register, login, logout
│   │   ├── BiodataController.php    # Biodata CRUD + feed
│   │   ├── ProposalController.php   # Send, accept, reject proposals
│   │   ├── ChatController.php       # Chat rooms and messages
│   │   ├── DashboardController.php  # User dashboard
│   │   └── AdminController.php      # Admin panel
│   └── Middleware/
│       ├── AdminMiddleware.php       # role === 'admin'
│       └── ApprovedUser.php          # status === 'approved'
├── Models/
│   ├── User.php
│   ├── Biodata.php
│   ├── Proposal.php
│   ├── ChatRoom.php
│   └── Message.php

resources/js/
├── Pages/
│   ├── Auth/          # Login, Register
│   ├── Feed/          # Index (list), Show (detail)
│   ├── Biodata/       # Create/Edit form
│   ├── Proposals/     # Sent & received proposals
│   ├── Chat/          # Chat list and chat room
│   └── Admin/         # Dashboard, Users, Proposals
└── Layouts/
    └── Layout.jsx     # Main nav layout (role-aware)
```

---

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
