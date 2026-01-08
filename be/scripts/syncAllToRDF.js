const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const {
    Brand, Category, Product, Order, Cart, Blog, BlogCategory
} = require("../src/models/associations");
const { syncProduct, syncBrand, syncCategory, syncOrder, syncBlog, syncBlogCategory } = require('../src/utils/rdfHelper');

const syncAll = async () => {
    console.log('Starting full sync to RDF...');

    // Sync Brands
    const brands = await Brand.findAll();
    for (const b of brands) await syncBrand(b);
    console.log(`Synced ${brands.length} brands.`);

    // Sync Categories
    const categories = await Category.findAll();
    for (const c of categories) await syncCategory(c);
    console.log(`Synced ${categories.length} categories.`);

    // Sync Blog Categories
    const bCats = await BlogCategory.findAll();
    for (const bc of bCats) await syncBlogCategory(bc);
    console.log(`Synced ${bCats.length} blog categories.`);

    // Sync Products
    const products = await Product.findAll();
    for (const p of products) await syncProduct(p);
    console.log(`Synced ${products.length} products.`);

    // Sync Blogs
    const blogs = await Blog.findAll();
    for (const b of blogs) await syncBlog(b);
    console.log(`Synced ${blogs.length} blogs.`);

    // Sync Orders
    const orders = await Order.findAll({ include: [{ model: Cart, as: 'carts' }] });
    for (const o of orders) await syncOrder(o, o.carts);
    console.log(`Synced ${orders.length} orders.`);

    console.log('Full sync complete.');
    process.exit(0);
};

syncAll().catch(err => {
    console.error(err);
    process.exit(1);
});
