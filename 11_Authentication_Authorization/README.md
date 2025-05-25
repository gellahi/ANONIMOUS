# 🔐 Authentication & Authorization System

A complete full-stack authentication and authorization system built with the MUN stack (MongoDB, Express, Node.js) and React.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- **JWT-based Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-Based Access Control (RBAC)**: User and Admin roles
- **Protected Routes**: Middleware for authentication and authorization
- **RESTful API**: Clean API endpoints for all operations
- **Input Validation**: Comprehensive data validation
- **Error Handling**: Robust error handling and logging

### Frontend (React + Vite)
- **Modern React**: Functional components with hooks
- **React Router**: Client-side routing with protected routes
- **Context API**: Global state management for authentication
- **Responsive Design**: Mobile-friendly interface
- **Role-based UI**: Conditional rendering based on user roles
- **Form Validation**: Client-side validation with error handling

## 📁 Project Structure

```
AuthenticationAuthorization/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   └── authorize.js         # Authorization middleware
│   ├── models/
│   │   └── User.js              # User model with Mongoose
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── admin.js             # Admin-only routes
│   ├── .env                     # Environment variables
│   ├── package.json             # Backend dependencies
│   └── server.js                # Express server setup
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx         # Login form
    │   │   ├── Register.jsx      # Registration form
    │   │   ├── Homepage.jsx      # User dashboard
    │   │   ├── AdminPanel.jsx    # Admin control panel
    │   │   └── Navbar.jsx        # Navigation component
    │   ├── context/
    │   │   └── AuthContext.jsx   # Authentication context
    │   ├── services/
    │   │   └── api.js            # API service functions
    │   ├── App.jsx               # Main App component
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Styling
    ├── index.html                # HTML template
    ├── package.json              # Frontend dependencies
    └── vite.config.js            # Vite configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Update .env file with your settings
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth_system
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /profile` - Get current user profile (Protected)

### Admin Routes (`/api/admin`)
- `GET /dashboard` - Get admin dashboard data (Admin only)
- `GET /users` - Get all users (Admin only)
- `PUT /users/:id/role` - Update user role (Admin only)

### Health Check
- `GET /api/health` - Server health check

## 👤 User Model

```javascript
{
  username: String (required, unique, 3-30 chars)
  email: String (required, unique, valid email)
  password: String (required, min 6 chars, hashed)
  phoneNumber: String (required)
  dateOfBirth: Date (required)
  role: String (enum: ['user', 'admin'], default: 'user')
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## 🔐 Authentication Flow

1. **Registration**: User submits registration form with all required fields
2. **Password Hashing**: Password is hashed using bcrypt before storage
3. **JWT Generation**: Upon successful registration/login, JWT token is generated
4. **Token Storage**: Token is stored in localStorage on the frontend
5. **Protected Requests**: Token is sent in Authorization header for protected routes
6. **Token Verification**: Backend middleware verifies token and extracts user info
7. **Role Authorization**: Additional middleware checks user role for admin routes

## 🎯 Role-Based Access Control

### User Role
- Access to personal dashboard
- View own profile information
- Standard user functionality

### Admin Role
- All user permissions
- Access to admin panel
- View system statistics
- Manage all users
- Update user roles

## 🧪 Testing the Application

### Demo Credentials
Create these test accounts after starting the application:

**Admin Account:**
- Email: admin@demo.com
- Password: password123
- Role: admin

**User Account:**
- Email: user@demo.com
- Password: password123
- Role: user

### Testing Scenarios

1. **Registration**: Create new accounts with different roles
2. **Login**: Test authentication with valid/invalid credentials
3. **Protected Routes**: Try accessing admin routes as a regular user
4. **Role Management**: Use admin account to change user roles
5. **Token Expiration**: Test behavior when JWT token expires

## 🔧 Key Technologies

### Backend
- **Express.js**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT implementation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **React Router DOM**: Client-side routing
- **Context API**: State management

## 🚨 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Controlled cross-origin requests
- **Role-based Authorization**: Middleware for route protection
- **Error Handling**: Secure error messages without sensitive data exposure

## 📝 Notes for Exam Preparation

This system demonstrates:
- Complete authentication flow with JWT
- Role-based authorization implementation
- Secure password handling with bcrypt
- RESTful API design principles
- React state management with Context API
- Protected routing in React
- MongoDB integration with Mongoose
- Middleware implementation in Express
- Error handling and validation
- Modern JavaScript (ES6+) usage

The code is well-commented and structured for easy understanding and exam reference.
