// index.js
// import {run} from './config/scripts';
const scripts = require("./config/scripts");
const express = require("express");
const app = express();
const db = require("./config/db");
const userRoutes = require("./app/routes/userRoutes");
const communityRoutes = require("./app/routes/communityRoutes");
const cors = require("cors");
// Database connection
db.connect();

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/community", communityRoutes);

// Start the server
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  scripts.run();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
startServer();
