const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const mongoose = require('mongoose')

// Register User (Create)
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, street, apartment, zip, city, country } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
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
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User created successfully.",
            user: savedUser,
        });

    } catch (err) {
        console.error("Error Registering User", err);
        res.status(500).json({
            message: "Error Registering User",
            error: err.message,
        });
    }
};

// Login User (Authenticate and Generate User)
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        const secret = process.env.SECRET_KEY;
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." })
        }

        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign({
                userId: user.id,
                isAdmin: user.isAdmin
            },
                secret, { expiresIn: '1d' }
            )
            res.status(200).send({
                message: "User logged in successfully.",
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isAdmin: user.isAdmin,
                }
            })
        } else {
            return res.status(400).send("Password is Wrong!")
        }
    } catch (err) {
        console.error("Error Logging In User", err);
        res.status(500).json({
            message: "Error Logging In User",
            error: err.message,
        });
    }
}

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({
            message: "Error fetching users",
            err: err.message,
        });
    }
};

// Get Users by Id,
const getUeserById = async (req, res) => {
    const userId = req.params.id;  // Assuming user ID is passed as a route parameter
    try {
        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Fetch the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user by ID:", err);
        res.status(500).json({
            message: "Error fetching user by ID",
            error: err.message,
        });
    }
};

// Update Users.
const updateUser = async (req, res) => {
    try {
        const { name, email, phone, street, apartment, zip, city, country } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name, email, phone, street, apartment, zip, city, country
            }, { new: true },
        );

        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({
            message: "Error updating user",
            err: err.message,
        });
    }
}

// Delete User
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({
            message: "Error deleting user",
            err: err.message,
        });
    }
};

const getUserCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();  // Get count of all Users
        res.status(200).json({
            message: "User Count Fetched Successfully",
            count: userCount
        });
    } catch (err) {
        console.log("Error Fetching User Count: ", err);
        res.status(500).json({
            message: "Error Fetching User Count.",
            err: err.message
        });
    }
};

// Export the functions
module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUeserById,
    updateUser,
    deleteUser,
    getUserCount


};
