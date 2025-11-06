const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
title: { type: String, required: true },
body: { type: String, required: true },
featuredImage: { type: String }, // path to /uploads
category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Post', PostSchema);