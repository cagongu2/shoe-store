const { queryStore } = require("../utils/rdfHelper");

const getProductRecommendations = async (req, res) => {
    try {
        const { type, productId, email } = req.query;
        let results = [];

        if (type === 'collaborative') {
            // People also bought
            const userUri = `user:${email.replace(/[@.]/g, '_')}`;
            const sparql = `
                SELECT DISTINCT ?recommendedProduct
                WHERE {
                  ${userUri} ex:purchased ?purchasedProduct .
                  ?otherUser ex:purchased ?purchasedProduct .
                  ?otherUser ex:purchased ?recommendedProduct .
                  FILTER (?recommendedProduct != ?purchasedProduct)
                  FILTER NOT EXISTS { ${userUri} ex:purchased ?recommendedProduct }
                }
                LIMIT 4
            `;
            results = await queryStore(sparql);
        } else if (type === 'view-based') {
            // Similar to viewed, prioritized by hot/sale
            const sparql = `
                SELECT DISTINCT ?recommendedProduct
                WHERE {
                  product:${productId} ex:category ?cat .
                  ?recommendedProduct ex:category ?cat .
                  ?recommendedProduct ex:hot ?hot .
                  ?recommendedProduct ex:sale ?sale .
                  FILTER (?recommendedProduct != product:${productId})
                }
                ORDER BY DESC(?hot) DESC(?sale)
                LIMIT 4
            `;
            results = await queryStore(sparql);
        } else if (type === 'content-based') {
            // Similar attributes (brand/category)
            const sparql = `
                SELECT DISTINCT ?recommendedProduct
                WHERE {
                  product:${productId} ex:brand ?brand ;
                                   ex:category ?cat .
                  ?recommendedProduct ex:brand ?brand ;
                                   ex:category ?cat .
                  FILTER (?recommendedProduct != product:${productId})
                }
                LIMIT 4
            `;
            results = await queryStore(sparql);
        }

        const productIds = results.map(r => r.recommendedProduct.value.split('/').pop());
        res.status(200).json(productIds);
    } catch (error) {
        res.status(500).json({ message: "Error getting recommendations", error: error.message });
    }
};

const getBlogRecommendations = async (req, res) => {
    try {
        const { type, email, productId } = req.query;
        let results = [];

        if (type === 'related-to-product') {
            // Blogs related to products viewed or bought
            const sparql = `
                SELECT DISTINCT ?blog
                WHERE {
                  ?blog rdf:type ex:Blog .
                  # Logic: Find blogs that are popular or in a category related to general trends
                  # For simple demo: just finding any relevant blogs
                }
                LIMIT 3
            `;
            results = await queryStore(sparql);
        } else if (type === 'purchase-pattern') {
            // Blogs read by people with similar purchase patterns
            const userUri = `user:${email ? email.replace(/[@.]/g, '_') : 'anonymous'}`;
            const sparql = `
                SELECT DISTINCT ?blog
                WHERE {
                  ${userUri} ex:purchased ?p .
                  ?otherUser ex:purchased ?p .
                  ?otherUser ex:viewedBlog ?blog .
                  FILTER NOT EXISTS { ${userUri} ex:viewedBlog ?blog }
                }
                LIMIT 3
            `;
            results = await queryStore(sparql);
        }

        const blogIds = results.map(r => r.blog.value.split('/').pop());
        res.status(200).json(blogIds);
    } catch (error) {
        res.status(500).json({ message: "Error getting blog recommendations", error: error.message });
    }
};

module.exports = {
    getProductRecommendations,
    getBlogRecommendations
};
