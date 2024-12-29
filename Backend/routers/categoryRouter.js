const express = require('express');
const { createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    countCategories
} = require('../controllers/categoryController');
const { route } = require('./productRouter');
const router = express.Router()

router.post("/create", createCategory);
router.get("/", getAllCategories);
router.get("/count", countCategories);
router.get("/:id", getCategoryById);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);


module.exports = router