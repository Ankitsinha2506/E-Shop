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

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getAllProducts);
router.get("/featured/:count", getFeaturedProducts)
router.get("/count", getProductCount)
router.get("/:id", getProductById)
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);




module.exports = router;