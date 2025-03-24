const express = require("express");
const {
    getAllProductStocks,
    getProductStockById,
    createProductStock,
    updateProductStock,
    deleteProductStock
} = require("../controllers/productStock.controller");

const router = express.Router();

router.get("/", getAllProductStocks);
router.get("/:id", getProductStockById);
router.post("/", createProductStock);
router.put("/:id", updateProductStock);
router.delete("/:id", deleteProductStock);

module.exports = router;
