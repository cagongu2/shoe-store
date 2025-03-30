const express = require('express');
const {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} = require("../controllers/product.controller");
const upload = require('../middleware/upload');
const verifyAdminToken = require("../middleware/verifyAdminToken")

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", upload.array("images", 5), verifyAdminToken, createProduct);

router.put("/:id", verifyAdminToken, updateProduct);

router.delete("/:id", verifyAdminToken, deleteProduct);

module.exports = router;