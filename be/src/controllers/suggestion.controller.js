const { queryStore } = require("../utils/rdfHelper");

const getProductRecommendations = async (req, res) => {
  try {
    const { type, productId, email } = req.query;
    let results = [];

    if (type === 'collaborative' && email) {
      // Collaborative Filtering: People also bought
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
    } else if (type === 'view-based' || (type === 'trending')) {
      // Trending: Most views or just general popular products (hot/sale)
      // If productId is provided, it's more "Similar Products"
      const sparql = productId ? `
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
            ` : `
                SELECT DISTINCT ?recommendedProduct
                WHERE {
                  ?recommendedProduct rdf:type ex:Product .
                  ?recommendedProduct ex:hot ?hot .
                  ?recommendedProduct ex:sale ?sale .
                  FILTER (?hot = true || ?sale = true)
                }
                ORDER BY DESC(?hot) DESC(?sale)
                LIMIT 4
            `;
      results = await queryStore(sparql);
    } else if (type === 'content-based' && productId) {
      // Content-based: Similar attributes (brand/category)
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

    // If still no results or unhandled type, fallback to any products
    if (results.length === 0) {
      const fallbackSparql = `
                SELECT DISTINCT ?recommendedProduct WHERE {
                  ?recommendedProduct rdf:type ex:Product .
                } LIMIT 4
            `;
      results = await queryStore(fallbackSparql);
    }

    const productIds = results.map(r => r.recommendedProduct.value.split('/').pop());
    res.status(200).json(productIds);
  } catch (error) {
    console.error("Error in getProductRecommendations:", error);
    res.status(500).json({ message: "Error getting recommendations", error: error.message });
  }
};

const getBlogRecommendations = async (req, res) => {
  try {
    const { type, email, productId } = req.query;
    let results = [];

    if (type === 'related-to-product') {
      // Blogs related to the specific product (match by brand or tags)
      const sparql = productId ? `
                SELECT DISTINCT ?blog
                WHERE {
                  product:${productId} ex:brand ?brand .
                  ?brand ex:name ?brandName .
                  ?blog rdf:type ex:Blog .
                  {
                    ?blog ex:tag ?tag .
                    FILTER(CONTAINS(LCASE(?tag), LCASE(?brandName)))
                  } UNION {
                    ?blog ex:title ?title .
                    FILTER(CONTAINS(LCASE(?title), LCASE(?brandName)))
                  }
                }
                LIMIT 3
            ` : `SELECT DISTINCT ?blog WHERE { ?blog rdf:type ex:Blog } LIMIT 3`;
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

    // Fallback to latest blogs if no targeted blogs found
    if (results.length === 0) {
      const fallbackSparql = `SELECT DISTINCT ?blog WHERE { ?blog rdf:type ex:Blog } LIMIT 3`;
      results = await queryStore(fallbackSparql);
    }

    const blogIds = results.map(r => r.blog.value.split('/').pop());
    res.status(200).json(blogIds);
  } catch (error) {
    console.error("Error in getBlogRecommendations:", error);
    res.status(500).json({ message: "Error getting blog recommendations", error: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(200).json([]);

    const sparql = `
            SELECT DISTINCT ?product
            WHERE {
              {
                ?product rdf:type ex:Product .
                ?product ex:name ?name .
                FILTER(CONTAINS(LCASE(?name), LCASE("${query}")))
              } UNION {
                ?product ex:category ?cat .
                ?cat rdfs:subClassOf* ?parentCat .
                ?parentCat ex:name ?catName .
                FILTER(CONTAINS(LCASE(?catName), LCASE("${query}")))
              } UNION {
                ?product ex:brand ?brand .
                ?brand ex:name ?brandName .
                FILTER(CONTAINS(LCASE(?brandName), LCASE("${query}")))
              }
            }
        `;
    const results = await queryStore(sparql);
    const productIds = results.map(r => r.product.value.split('/').pop());
    res.status(200).json(productIds);
  } catch (error) {
    console.error("Error in searchProducts:", error);
    res.status(500).json({ message: "Error in semantic search", error: error.message });
  }
};

module.exports = {
  getProductRecommendations,
  getBlogRecommendations,
  searchProducts
};
