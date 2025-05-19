# CRUD API Examples with Node.js, PostgreSQL, and MongoDB

This project contains two complete REST API implementations using Node.js and Express:

1. **PostgreSQL Task Manager API** - A task management API using PostgreSQL
2. **MongoDB Notes API** - A notes management API using MongoDB with Mongoose

## Project Structure

```
06_CRUD_API_Node_Postgres_Mongo/
├── postgres-task-manager/     # PostgreSQL Task Manager API
│   ├── controllers/           # Request handlers
│   ├── db/                    # Database connection
│   ├── middleware/            # Custom middleware
│   ├── models/                # Data models
│   ├── routes/                # API routes
│   ├── utils/                 # Utility functions
│   ├── .env                   # Environment variables
│   ├── package.json           # Project dependencies
│   ├── README.md              # Project documentation
│   └── server.js              # Entry point
│
└── mongodb-notes-api/         # MongoDB Notes API
    ├── controllers/           # Request handlers
    ├── db/                    # Database connection
    ├── middleware/            # Custom middleware
    ├── models/                # Data models
    ├── routes/                # API routes
    ├── utils/                 # Utility functions
    ├── .env                   # Environment variables
    ├── package.json           # Project dependencies
    ├── README.md              # Project documentation
    └── server.js              # Entry point
```

## PostgreSQL Task Manager API

A RESTful API for task management with the following endpoints:

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

See the [PostgreSQL Task Manager README](./postgres-task-manager/README.md) for more details.

## MongoDB Notes API

A RESTful API for notes management with the following endpoints:

- `GET /notes` - Get all notes
- `GET /notes/:id` - Get a specific note
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

See the [MongoDB Notes API README](./mongodb-notes-api/README.md) for more details.

## Prerequisites

- Node.js and npm
- PostgreSQL
- MongoDB

## Getting Started

1. Clone the repository
2. Navigate to each project directory
3. Install dependencies: `npm install`
4. Configure the `.env` file
5. Start the server: `npm start`

## Features

- Complete CRUD operations
- Input validation
- Error handling
- Clean folder structure
- Environment variable configuration
- CORS support
- Body parsing middleware
