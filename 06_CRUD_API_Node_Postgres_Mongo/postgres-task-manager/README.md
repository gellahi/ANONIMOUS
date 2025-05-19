# PostgreSQL Task Manager API

A RESTful API for task management using Node.js, Express, and PostgreSQL.

## Setup

1. Install dependencies:
```
npm install
```

2. Create a PostgreSQL database named `task_manager`.

3. Configure the `.env` file with your PostgreSQL credentials.

4. Start the server:
```
npm start
```

## API Endpoints

### Get all tasks
```
GET /tasks
```

### Get a specific task
```
GET /tasks/:id
```

### Create a new task
```
POST /tasks
```
Request body:
```json
{
  "title": "Complete assignment",
  "description": "Finish the Node.js and PostgreSQL task",
  "status": "pending"
}
```

### Update a task
```
PUT /tasks/:id
```
Request body:
```json
{
  "title": "Complete assignment",
  "description": "Finish the Node.js and PostgreSQL task",
  "status": "completed"
}
```

### Delete a task
```
DELETE /tasks/:id
```

## Testing with cURL

### Get all tasks
```bash
curl -X GET http://localhost:3000/tasks
```

### Get a specific task
```bash
curl -X GET http://localhost:3000/tasks/1
```

### Create a new task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Complete assignment", "description":"Finish the Node.js and PostgreSQL task", "status":"pending"}'
```

### Update a task
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Complete assignment", "description":"Finish the Node.js and PostgreSQL task", "status":"completed"}'
```

### Delete a task
```bash
curl -X DELETE http://localhost:3000/tasks/1
```
