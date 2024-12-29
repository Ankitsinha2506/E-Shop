const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

// Register a new User.
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, street, apartment, zip, city, country } = req.body;
        // Check if user already exists.
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",

            })
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating a new User Instance.
        const newUser = new User({
            name,
            email,
            passwordHash: hashedPassword,
            phone,
            street,
            apartment,
            zip,
            city,
            country,
        })

        // Save the user to the database,
        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User Registered Successfully",
            data: savedUser
        });
    } catch (err) {
        console.error("Error Registering User", err);
        res.status(500).json({
            message: "Error Registering User",
            err: err.message,
        })
    }
}

// Login User
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        // check if user exists
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(404).json({
                message: "User not found with this email."
            })
        }
        // Validate the Password.
        const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);
        if(!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            })
        }

        // Generate a JWT Token.
        
    } catch (err) {
        console.error("Error Logging In: ", err);
        res.status(500).json({
            message: "Error Logging In",
            err: err.message,
        })   
    }
}


module.exports = {
    registerUser,
    loginUser,
}