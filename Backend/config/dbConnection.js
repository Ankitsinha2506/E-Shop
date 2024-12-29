const mongoose = require('mongoose');

// Function to connect to MongoDB
const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://Admin:Admin@cluster0.w5rkg.mongodb.net/E-Shop");
        console.log("Successfully connected to the E-Shop database.");
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
};

module.exports = dbConnect;
