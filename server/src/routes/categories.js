const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { validationResult } = require('express-validator');
const validator = require('../validators/categoryValidator');


// GET /api/categories
router.get('/', async (req, res, next) => {
try {
const cats = await Category.find().sort('name');
res.json(cats);
} catch (err) { next(err); }
});


// POST /api/categories
router.post('/', validator, async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
try {
const cat = new Category({ name: req.body.name });
await cat.save();
res.status(201).json(cat);
} catch (err) { next(err); }
});


module.exports = router;