const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnection');
const routes = require('./routers/routes');
// const authJwt = require('./helpers/jwt');
// const errorHandler = require('./helpers/error-handler');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Apply custom middlewares
// app.use(authJwt())
// app.use(errorHandler); // Ensure this is a valid middleware function

// Add routes
app.use("/", routes);

app.get("/", (req, res) => {
    res.send("My Backend Works");
});

// Connect to the database when the server starts
dbConnect();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
