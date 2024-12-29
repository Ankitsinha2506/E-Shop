const Category = require("../models/categoryModel");
const mongoose = require('mongoose')

const createCategory = async (req, res) => {
    try {
        const { name, icon, color } = req.body; // Destructure required fields

        // Create a new category using the request body data
        const newCategory = new Category({
            name,
            icon,
            color
        });

        // Save the new category to the database
        await newCategory.save();

        // Return success response
        res.status(201).json({
            message: "Category Created Successfully",
            data: newCategory
        });
    } catch (err) {
        console.log("Error Creating Category: ", err);
        res.status(500).json({
            message: "Error Creating Category.",
            err: err.message
        });
    }
};

// GetAllCategories.
const getAllCategories = async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find(); 

        // Return success response
        res.status(200).json({
            message: "Categories Retrieved Successfully",
            data: categories
        });
    } catch (err) {
        console.log("Error Fetching Categories: ", err);
        res.status(500).json({
            message: "Error Fetching Categories.",
            err: err.message
        });
    }
};

// Get Category By ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found."
            });
        }

        res.status(200).json({
            message: "Category Retrieved Successfully",
            data: category
        });
    } catch (err) {
        console.log("Error Fetching Category by ID: ", err);
        res.status(500).json({
            message: "Error Fetching Category by ID.",
            err: err.message
        });
    }
};

// Count Categories
const countCategories = async (req, res) => {
    try {
        const count = await Category.countDocuments(); // Count all categories in the database

        res.status(200).json({
            message: "Categories Count Retrieved Successfully",
            data: { count }
        });
    } catch (err) {
        console.log("Error Counting Categories: ", err);
        res.status(500).json({
            message: "Error Counting Categories.",
            err: err.message
        });
    }
};

// UpdateCategories
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, icon, color } = req.body;

        // Find the category by ID and update it
        const updatedCategory = await Category.findByIdAndUpdate(id, {
            name,
            icon,
            color
        }, { new: true }); // `new: true` returns the updated document

        if (!updatedCategory) {
            return res.status(404).json({
                message: "Category not found."
            });
        }

        res.status(200).json({
            message: "Category Updated Successfully",
            data: updatedCategory
        });
    } catch (err) {
        console.log("Error Updating Category: ", err);
        res.status(500).json({
            message: "Error Updating Category.",
            err: err.message
        });
    }
};

// Delete a Category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the category by ID and delete it
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({
                message: "Category not found."
            });
        }

        res.status(200).json({
            message: "Category Deleted Successfully",
            data: deletedCategory
        });
    } catch (err) {
        console.log("Error Deleting Category: ", err);
        res.status(500).json({
            message: "Error Deleting Category.",
            err: err.message
        });
    }
};



module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    countCategories,


}