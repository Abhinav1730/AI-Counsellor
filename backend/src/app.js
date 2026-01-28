const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const aiRouter = require('./routes/ai');
const profileRouter = require('./routes/profile');
const universitiesRouter = require('./routes/universities');

// Routes
app.use('/api/ai', aiRouter);
app.use('/api/profile', profileRouter);
app.use('/api/universities', universitiesRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Basic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
