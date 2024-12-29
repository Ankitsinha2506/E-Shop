const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnection');
const routes = require('./routers/routes')
// const userRoutes = require('./routes/user.route.js')

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());


 app.use("/", routes) 

// app.use("/api/v1/users", userRoutes)
app.get("/", (req, res) =>  {
    res.send("My Backend Works")
})


// Connect to the database when the server starts
dbConnect();

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});
