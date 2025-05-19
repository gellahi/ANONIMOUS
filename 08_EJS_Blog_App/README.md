# EJS Blog Application

A complete blog management application built with Node.js, Express, EJS templating engine, and MongoDB.

## Features

1. **Home Page**
   - List of all blog posts with title and short description
   - Posts fetched from MongoDB database using EJS templates

2. **Create Post**
   - Form to add a new blog post (title, content)
   - POST route to save data to the database
   - Redirect to home after successful creation

3. **View Single Post**
   - Dynamic route `/posts/:id` to view a full post

4. **Edit/Delete**
   - Buttons on each post to edit or delete
   - Editing loads post data into a form using EJS
   - Deletion removes the post and redirects to home

5. **Layout**
   - Base layout file (`layout.ejs`) for consistent header/footer
   - Includes partials for navbar and footer

## Project Structure

```
08_EJS_Blog_App/
├── config/
│   └── db.js                # Database configuration
├── models/
│   └── Post.js              # Post model schema
├── public/
│   ├── css/
│   │   └── style.css        # Custom CSS
│   └── js/
│       └── main.js          # Client-side JavaScript
├── routes/
│   └── posts.js             # Routes for blog posts
├── views/
│   ├── layouts/
│   │   └── layout.ejs       # Base layout template
│   ├── partials/
│   │   ├── navbar.ejs       # Navigation bar
│   │   └── footer.ejs       # Footer
│   ├── posts/
│   │   ├── index.ejs        # Home page (list posts)
│   │   ├── show.ejs         # View single post
│   │   ├── new.ejs          # Create new post form
│   │   └── edit.ejs         # Edit post form
│   └── error.ejs            # Error page
├── app.js                   # Main application file
└── package.json             # Project dependencies
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Make sure MongoDB is running on your system
4. Start the application:
   ```
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Dependencies

- express: Web framework for Node.js
- ejs: Templating engine
- mongoose: MongoDB object modeling
- method-override: For PUT/DELETE requests in forms
- body-parser: Parse incoming request bodies

## License

ISC
