const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Post = require('../models/post');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const validator = require('../validators/postValidator');

// POST /api/posts (protected)
router.post('/', auth, upload.single('featuredImage'), validator, async (req, res, next) => {
  const errors = validationResult(req); // ✅ now inside the route handler
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category || null,
      author: req.user._id,
      featuredImage: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// PUT /api/posts/:id (protected)
router.put('/:id', auth, upload.single('featuredImage'), validator, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (!post.author.equals(req.user._id))
      return res.status(403).json({ message: 'Forbidden' });

    post.title = req.body.title;
    post.body = req.body.body;
    post.category = req.body.category || post.category;
    if (req.file) post.featuredImage = `/uploads/${req.file.filename}`;

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/posts/:id (protected)
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (!post.author.equals(req.user._id))
      return res.status(403).json({ message: 'Forbidden' });

    await post.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
