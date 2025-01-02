const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductCount,
    getFeaturedProducts
} = require('../controllers/productController');
const authenticateToken = require('../helpers/jwt'); // Fixed import

const router = express.Router();

// Define product routes
router.post("/create", createProduct);
router.get("/", authenticateToken, getAllProducts); // Fixed middleware typo
router.get("/featured/:count", getFeaturedProducts);
router.get("/count", getProductCount);
router.get("/:id", getProductById);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router; // Properly export the router
