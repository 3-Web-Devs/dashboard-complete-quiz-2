const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect db
connectToMongo();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/me', require('./routes/me'));
app.use('/api/dashboard', require('./routes/dashboard'));

// server start
app.listen(PORT, () => console.log('🚀 Server started on port ${PORT}'));
