const express = require("express");
const router = express.Router();
const { getProductRecommendations, getBlogRecommendations } = require("../controllers/suggestion.controller");

/**
 * @openapi
 * /api/v1/suggestions/products:
 *   get:
 *     summary: Lấy gợi ý sản phẩm
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [collaborative, view-based, content-based]
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách ID sản phẩm gợi ý
 */
router.get("/products", getProductRecommendations);

/**
 * @openapi
 * /api/v1/suggestions/blogs:
 *   get:
 *     summary: Lấy gợi ý bài viết
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [related-to-product, purchase-pattern]
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách ID bài viết gợi ý
 */
router.get("/blogs", getBlogRecommendations);

module.exports = router;
