// index.js
// import {run} from './config/scripts';
const scripts = require('./config/scripts');
const express = require('express');
const app = express();
const db = require('./config/db');
const userRoutes = require('./app/routes/userRoutes');

// Database connection
db.connect();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
scripts.run();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
