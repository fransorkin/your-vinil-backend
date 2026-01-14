// Gets access to environment variables/settings
require("dotenv").config();

// Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");

const app = express();

// This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const vinylRoutes = require("./routes/vinyls.routes");
app.use("/api/vinyls", vinylRoutes);

// To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
