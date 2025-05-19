const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET - Home page (list all posts)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render('posts/index', { 
      title: 'Blog Home',
      posts 
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to fetch posts' 
    });
  }
});

// GET - New post form
router.get('/posts/new', (req, res) => {
  res.render('posts/new', { 
    title: 'Create New Post' 
  });
});

// POST - Create new post
router.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content
    });
    await newPost.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to create post' 
    });
  }
});

// GET - Show single post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).render('error', { 
        title: 'Error',
        message: 'Post not found' 
      });
    }
    res.render('posts/show', { 
      title: post.title,
      post 
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to fetch post' 
    });
  }
});

// GET - Edit post form
router.get('/posts/:id/edit', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).render('error', { 
        title: 'Error',
        message: 'Post not found' 
      });
    }
    res.render('posts/edit', { 
      title: 'Edit Post',
      post 
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to fetch post for editing' 
    });
  }
});

// PUT - Update post
router.put('/posts/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    await Post.findByIdAndUpdate(req.params.id, {
      title,
      content
    });
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to update post' 
    });
  }
});

// DELETE - Delete post
router.delete('/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to delete post' 
    });
  }
});

module.exports = router;
