# MERN Task Manager with Tailwind CSS

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

## Features

- Create, read, update, and delete tasks
- Mark tasks as pending or completed
- Responsive design with Tailwind CSS
- MongoDB database for data persistence
- RESTful API with Express

## Project Structure

```
09_MERN_TaskManager_Tailwind/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── context/        # Context API for state management
│       └── pages/          # Page components
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   └── routes/             # API routes
└── package.json            # Root package.json for scripts
```

## Installation

1. Install dependencies for the server, client, and root project:

```bash
npm run install-all
```

2. Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
```

3. Make sure MongoDB is running on your local machine or update the MONGODB_URI to point to your MongoDB instance.

## Running the Application

To run both the client and server concurrently:

```bash
npm run dev
```

To run just the server:

```bash
npm run server
```

To run just the client:

```bash
npm run client
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Technologies Used

- **Frontend**:
  - React
  - React Router
  - Axios
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

- **Development**:
  - Nodemon
  - Concurrently
