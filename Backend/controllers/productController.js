const Product = require("../models/productModel");

// Create a Products
const createProduct = async (req, res) => {
    try {
        const newPrduct = new Product(req.body);
        await newPrduct.save();
        res.status(201).json({
            message: "Product Created Successfully",
            data: newPrduct
        })

    } catch (err) {
        console.log("Error Creating Products : ", err);
        res.status(500).json({
            message: "Error Creating Products.",
            err: err.message
        })
    }
}

// Get All filtered Products : http://localhost:5000/api/v1/products/?categories=676e7d68285fa383db09cd5e
const getAllProducts = async (req, res) => {
    try {
        const { categories } = req.query; // Extract categories from query parameters

        // Initialize filter object
        const filter = {};

        // Check if categories are provided
        if (categories) {
            // Split categories by comma and trim spaces, then convert to array
            const categoryArray = categories.split(',').map(category => category.trim());
            filter.category = { $in: categoryArray }; // MongoDB $in operator for filtering
        }

        // Fetch products based on filter
        const products = await Product.find(filter);

        res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });
    } catch (err) {
        console.log("Error Fetching Products: ", err);
        res.status(500).json({
            message: "Error Fetching Products.",
            err: err.message
        });
    }
};


// getProductById.
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({
                message: "Product not Found",
            })
        }

        res.status(200).json({
            message: "Product Fetched Successfully",
            data: product
        })

    } catch (err) {
        console.log("Error Fetching Products: ", err);
        res.status(500).json({
            message: "Error Fetching Products.",
            err: err.message
        });
    }
}

// Get Product Count for Statistics
const getProductCount = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();  // Get count of all products
        res.status(200).json({
            message: "Product Count Fetched Successfully",
            count: productCount
        });
    } catch (err) {
        console.log("Error Fetching Product Count: ", err);
        res.status(500).json({
            message: "Error Fetching Product Count.",
            err: err.message
        });
    }
};

// Update Product.
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
            new: true, // return the updated document
            runValidators: true // validate the new data
        });
        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product Updated Successfully",
            data: updatedProduct
        });
    } catch (err) {
        console.log("Error Updating Product: ", err);
        res.status(500).json({
            message: "Error Updating Product.",
            err: err.message
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product Deleted Successfully",
            data: deletedProduct
        });
    } catch (err) {
        console.log("Error Deleting Product: ", err);
        res.status(500).json({
            message: "Error Deleting Product.",
            err: err.message
        });
    }
};

// getFeaturedProducts
const getFeaturedProducts = async (req, res) => {
    try {
        // Fetch only the featured products from the database
        const count = req.params.count ? req.params.count : 0;
        const featuredProducts = await Product.find({ isFeatured: true }).limit(count);

        res.status(200).json({
            message: "Featured Products fetched successfully",
            data: featuredProducts
        });
    } catch (err) {
        console.log("Error Fetching Featured Products: ", err);
        res.status(500).json({
            message: "Error Fetching Featured Products.",
            err: err.message
        });
    }
};

module.exports = {
    getFeaturedProducts,
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductCount,
    getFeaturedProducts,

}