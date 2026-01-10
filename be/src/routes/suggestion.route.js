const express = require("express");
const router = express.Router();
const { getProductRecommendations, getBlogRecommendations, searchProducts } = require("../controllers/suggestion.controller");

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
 *           enum: [collaborative, view-based, content-based, trending]
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
/**
 * @openapi
 * /api/v1/suggestions/search:
 *   get:
 *     summary: Tìm kiếm ngữ nghĩa (Semantic Search)
 *     description: Tìm kiếm sản phẩm dựa trên tên, danh mục (bao gồm danh mục cha) và thương hiệu sử dụng truy vấn SPARQL/RDF.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm
 *     responses:
 *       200:
 *         description: Danh sách ID sản phẩm tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/search", searchProducts);

module.exports = router;
