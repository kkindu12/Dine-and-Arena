// server.js  (CommonJS)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', name: 'Dine & Arena Backend' });
});

// (Later) you will mount routes like:
// const menuRoutes = require('./routes/menu');
// app.use('/api/menu', menuRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});
