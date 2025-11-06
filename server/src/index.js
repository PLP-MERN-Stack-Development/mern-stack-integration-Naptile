// src/index.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();
const connectDB = require('./config/db');
const posts = require('./routes/posts');
const categories = require('./routes/categories');
const auth = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');


const app = express();
connectDB();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // parse JSON bodies


// serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


// API routes
app.use('/api/posts', posts);
app.use('/api/categories', categories);
app.use('/api/auth', auth);


// error handler (must be after routes)
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));