const axios = require('axios');

const FUSEKI_URL = process.env.FUSEKI_URL || 'http://localhost:3030/shoeStore';
const PREFIXES = `
PREFIX ex: <http://shoestore.com/>
PREFIX product: <http://shoestore.com/product/>
PREFIX user: <http://shoestore.com/user/>
PREFIX brand: <http://shoestore.com/brand/>
PREFIX category: <http://shoestore.com/category/>
PREFIX order: <http://shoestore.com/order/>
PREFIX blog: <http://shoestore.com/blog/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
`;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const auth = {
    username: 'admin',
    password: ADMIN_PASSWORD
};

const updateStore = async (sparqlUpdate) => {
    try {
        await axios.post(`${FUSEKI_URL}/update`, `update=${encodeURIComponent(sparqlUpdate)}`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            auth
        });
    } catch (error) {
        console.error('Error updating RDF store:', error.message);
    }
};

const queryStore = async (sparqlQuery) => {
    try {
        const response = await axios.get(`${FUSEKI_URL}/query`, {
            params: { query: PREFIXES + sparqlQuery },
            auth
        });
        return response.data.results.bindings;
    } catch (error) {
        console.error('Error querying RDF store:', error.message);
        return [];
    }
};

const syncProduct = async (product) => {
    const turtle = `
        product:${product.id} rdf:type ex:Product ;
            ex:name "${product.name.replace(/"/g, '\\"')}" ;
            ex:price ${product.price} ;
            ex:hot ${product.hot ? 'true' : 'false'} ;
            ex:sale ${product.sale ? 'true' : 'false'} ;
            ex:brand brand:${product.brandId} ;
            ex:category category:${product.categoryId} .
    `;
    const deleteOld = `${PREFIXES} DELETE WHERE { product:${product.id} ?p ?o }`;
    const insertNew = `${PREFIXES} INSERT DATA { ${turtle} }`;

    await updateStore(deleteOld);
    await updateStore(insertNew);
};

const deleteProductRDF = async (productId) => {
    await updateStore(`${PREFIXES} DELETE WHERE { product:${productId} ?p ?o }`);
};

const syncOrder = async (order, carts) => {
    const userUri = `user:${order.email.replace(/[@.]/g, '_')}`;
    let purchases = '';
    carts.forEach(cart => {
        purchases += `${userUri} ex:purchased product:${cart.productId} . \n`;
    });

    const insertNew = `${PREFIXES} INSERT DATA { ${purchases} }`;
    await updateStore(insertNew);
};

const logView = async (userEmail, productId) => {
    const userUri = userEmail ? `user:${userEmail.replace(/[@.]/g, '_')}` : 'user:anonymous';
    const insertNew = `${PREFIXES} INSERT DATA { ${userUri} ex:viewed product:${productId} . }`;
    await updateStore(insertNew);
};

const syncBrand = async (brand) => {
    const turtle = `brand:${brand.id} rdf:type ex:Brand ; ex:name "${brand.name.replace(/"/g, '\\"')}" .`;
    await updateStore(`${PREFIXES} DELETE WHERE { brand:${brand.id} ?p ?o }`);
    await updateStore(`${PREFIXES} INSERT DATA { ${turtle} }`);
};

const syncCategory = async (category) => {
    const turtle = `category:${category.id} rdf:type ex:Category ; ex:name "${category.name.replace(/"/g, '\\"')}" .`;
    await updateStore(`${PREFIXES} DELETE WHERE { category:${category.id} ?p ?o }`);
    await updateStore(`${PREFIXES} INSERT DATA { ${turtle} }`);
};

const syncBlog = async (blog) => {
    let tagsTurtle = '';
    if (blog.tags) {
        const tagsArray = typeof blog.tags === 'string' ? JSON.parse(blog.tags) : blog.tags;
        if (Array.isArray(tagsArray)) {
            tagsArray.forEach(tag => {
                tagsTurtle += `ex:tag "${tag.replace(/"/g, '\\"')}" ; `;
            });
        }
    }

    const turtle = `
        blog:${blog.id} rdf:type ex:Blog ;
            ex:title "${blog.title.replace(/"/g, '\\"')}" ;
            ${tagsTurtle}
            ex:category category:blog_${blog.categoryId} .
    `;
    const deleteOld = `${PREFIXES} DELETE WHERE { blog:${blog.id} ?p ?o }`;
    const insertNew = `${PREFIXES} INSERT DATA { ${turtle} }`;
    await updateStore(deleteOld);
    await updateStore(insertNew);
};

const syncBlogCategory = async (cat) => {
    const turtle = `category:blog_${cat.id} rdf:type ex:BlogCategory ; ex:name "${cat.name.replace(/"/g, '\\"')}" .`;
    await updateStore(`${PREFIXES} DELETE WHERE { category:blog_${cat.id} ?p ?o }`);
    await updateStore(`${PREFIXES} INSERT DATA { ${turtle} }`);
};

const logBlogView = async (userEmail, blogId) => {
    const userUri = userEmail ? `user:${userEmail.replace(/[@.]/g, '_')}` : 'user:anonymous';
    const insertNew = `${PREFIXES} INSERT DATA { ${userUri} ex:viewedBlog blog:${blogId} . }`;
    await updateStore(insertNew);
};

module.exports = {
    syncProduct,
    deleteProductRDF,
    syncOrder,
    logView,
    syncBrand,
    syncCategory,
    syncBlog,
    syncBlogCategory,
    logBlogView,
    queryStore,
    PREFIXES
};
