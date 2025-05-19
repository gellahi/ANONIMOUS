# MongoDB Notes API

A RESTful API for notes management using Node.js, Express, and MongoDB with Mongoose.

## Setup

1. Install dependencies:
```
npm install
```

2. Make sure MongoDB is running on your system.

3. Configure the `.env` file with your MongoDB URI.

4. Start the server:
```
npm start
```

## API Endpoints

### Get all notes
```
GET /notes
```

### Get a specific note
```
GET /notes/:id
```

### Create a new note
```
POST /notes
```
Request body:
```json
{
  "title": "Meeting Notes",
  "content": "Discuss project timeline and requirements"
}
```

### Update a note
```
PUT /notes/:id
```
Request body:
```json
{
  "title": "Updated Meeting Notes",
  "content": "Revised project timeline and requirements"
}
```

### Delete a note
```
DELETE /notes/:id
```

## Testing with cURL

### Get all notes
```bash
curl -X GET http://localhost:3001/notes
```

### Get a specific note
```bash
curl -X GET http://localhost:3001/notes/60a1b2c3d4e5f6g7h8i9j0k
```

### Create a new note
```bash
curl -X POST http://localhost:3001/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Meeting Notes", "content":"Discuss project timeline and requirements"}'
```

### Update a note
```bash
curl -X PUT http://localhost:3001/notes/60a1b2c3d4e5f6g7h8i9j0k \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Meeting Notes", "content":"Revised project timeline and requirements"}'
```

### Delete a note
```bash
curl -X DELETE http://localhost:3001/notes/60a1b2c3d4e5f6g7h8i9j0k
```
