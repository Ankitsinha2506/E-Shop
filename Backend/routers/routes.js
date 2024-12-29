const express = require('express')
const router = express.Router()
const productRoutes = require("./productRouter")
const categoryRoutes = require("./categoryRouter");
const userRoutes = require('./userRouter');

const base = "/api/v1";

router.use(`${base}/products`, productRoutes);
router.use(`${base}/categories`, categoryRoutes);
router.use(`${base}/users`, userRoutes);



module.exports = router;