const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const {
    Product, Brand, Category, Color, Size, ProductStock,
    User, Order, Cart, Address, Image, Blog, BlogCategory
} = require('../src/models/associations');
const sequelize = require('../src/utils/database');

const seedData = async () => {
    try {
        // Sync and clear DB
        await sequelize.sync({ force: true });
        console.log('--- Database Synced (Force True) ---');

        // 1. Create Brands
        const nike = await Brand.create({ name: 'Nike' });
        const adidas = await Brand.create({ name: 'Adidas' });
        const jordan = await Brand.create({ name: 'Jordan' });
        const puma = await Brand.create({ name: 'Puma' });
        const reebok = await Brand.create({ name: 'Reebok' });
        console.log('Brands created.');

        // 2. Create Categories (Hierarchical)
        const sportsShoes = await Category.create({ name: 'Sneakers' });
        const running = await Category.create({ name: 'Running Shoes', parentId: sportsShoes.id });
        const basketball = await Category.create({ name: 'Basketball Shoes', parentId: sportsShoes.id });
        const accessories = await Category.create({ name: 'Accessories' });
        console.log('Categories created.');

        // 3. Create Colors
        const black = await Color.create({ name: 'Black', hex: '#000000' });
        const white = await Color.create({ name: 'White', hex: '#FFFFFF' });
        const red = await Color.create({ name: 'Red', hex: '#FF0000' });
        const blue = await Color.create({ name: 'Blue', hex: '#0000FF' });
        console.log('Colors created.');

        // 4. Create Sizes
        const s39 = await Size.create({ name: '39' });
        const s40 = await Size.create({ name: '40' });
        const s41 = await Size.create({ name: '41' });
        const s42 = await Size.create({ name: '42' });
        const s43 = await Size.create({ name: '43' });
        console.log('Sizes created.');

        // 5. Create Users
        const admin = await User.create({
            email: 'admin@gmail.com',
            password: 'admin123',
            username: 'Administrator',
            role: 'admin'
        });

        const user1 = await User.create({
            email: 'user1@gmail.com',
            password: 'user123',
            username: 'The Sneakerhead',
            role: 'user'
        });

        const user2 = await User.create({
            email: 'user2@gmail.com',
            password: 'user123',
            username: 'Running Fan',
            role: 'user'
        });
        console.log('Users created.');

        // 6. Create Products
        const p1 = await Product.create({
            name: 'Jordan 1 Retro High OG Chicago',
            price: 12500000,
            hot: true,
            sale: false,
            description: 'The legendary "Lost & Found" colorway. A must-have for collectors.',
            brandId: jordan.id,
            categoryId: basketball.id
        });

        const p2 = await Product.create({
            name: 'Adidas Ultraboost 5.0 DNA',
            price: 4500000,
            hot: false,
            sale: true,
            description: 'Feel the energy return with every step. Iconic comfort.',
            brandId: adidas.id,
            categoryId: running.id
        });

        const p3 = await Product.create({
            name: 'Puma RS-X Efekt PRM',
            price: 3200000,
            hot: true,
            sale: false,
            description: 'Retro-future design with tech-inspired details.',
            brandId: puma.id,
            categoryId: sportsShoes.id
        });

        const p4 = await Product.create({
            name: 'Nike Air Max 270',
            price: 3800000,
            hot: false,
            sale: false,
            description: 'Nike Big Air unit meets modern styling for comfort.',
            brandId: nike.id,
            categoryId: sportsShoes.id
        });

        const p5 = await Product.create({
            name: 'Reebok Club C 85 Vintage',
            price: 2400000,
            hot: false,
            sale: true,
            description: 'Clean, classic look with a soft leather upper.',
            brandId: reebok.id,
            categoryId: sportsShoes.id
        });
        console.log('Products created.');

        // 7. Product Images
        await Image.create({ link: 'uploads/demo/jordan-chicago.jpg', productId: p1.id });
        await Image.create({ link: 'uploads/demo/adidas-ub.jpg', productId: p2.id });
        await Image.create({ link: 'uploads/demo/puma-rsx.jpg', productId: p3.id });
        await Image.create({ link: 'uploads/demo/nike-am270.jpg', productId: p4.id });
        await Image.create({ link: 'uploads/demo/reebok-clubc.jpg', productId: p5.id });
        console.log('Images created.');

        // 8. Product Stocks
        await ProductStock.create({ productId: p1.id, colorId: red.id, sizeId: s42.id, quantity: 5 });
        await ProductStock.create({ productId: p1.id, colorId: red.id, sizeId: s41.id, quantity: 2 });
        await ProductStock.create({ productId: p2.id, colorId: black.id, sizeId: s40.id, quantity: 10 });
        await ProductStock.create({ productId: p3.id, colorId: white.id, sizeId: s41.id, quantity: 8 });
        await ProductStock.create({ productId: p4.id, colorId: blue.id, sizeId: s43.id, quantity: 4 });
        await ProductStock.create({ productId: p5.id, colorId: white.id, sizeId: s40.id, quantity: 15 });
        console.log('Stocks created.');

        // 9. Blog Categories & Blogs
        const bCat1 = await BlogCategory.create({ name: 'News', slug: 'news' });
        const bCat2 = await BlogCategory.create({ name: 'Guides', slug: 'guides' });

        await Blog.create({
            title: 'How to Clean your Basketball Shoes',
            description: 'Keep your kicks fresh on and off the court.',
            content: 'Cleaning basketball shoes requires specific steps to maintain grip...',
            categoryId: bCat2.id,
            author: 'Admin',
            image: 'uploads/demo/blog-cleaning.jpg'
        });

        await Blog.create({
            title: 'Top 5 Sneakers of 2026',
            description: 'The year is half over, here are the leaders.',
            content: 'From tech innovations to classic revivals, 2026 has been wild...',
            categoryId: bCat1.id,
            author: 'SneakerHead101',
            image: 'uploads/demo/blog-top5.jpg'
        });
        console.log('Blogs created.');

        // 10. Orders & Carts (For Recommendation Patterns)
        const addr1 = await Address.create({
            city: 'Ho Chi Minh',
            state: 'HCM',
            country: 'Vietnam',
            zipcode: '70000'
        });

        // User 1 buys p1 (Jordan) and p4 (Nike)
        const order1 = await Order.create({
            name: 'User 1',
            email: 'user1@gmail.com',
            phone: '0987654321',
            totalPrice: 16300000,
            addressId: addr1.id
        });
        await Cart.create({
            userId: user1.id,
            productId: p1.id,
            orderId: order1.id,
            quantity: 1,
            price: 12500000,
            brandId: jordan.id,
            isPayed: true,
            name: p1.name,
            size: s42.name,
            color: red.name
        });
        await Cart.create({
            userId: user1.id,
            productId: p4.id,
            orderId: order1.id,
            quantity: 1,
            price: 3800000,
            brandId: nike.id,
            isPayed: true,
            name: p4.name,
            size: s43.name,
            color: blue.name
        });

        // User 2 buys p1 (Jordan) as well
        const order2 = await Order.create({
            name: 'User 2',
            email: 'user2@gmail.com',
            phone: '0123456789',
            totalPrice: 12500000,
            addressId: addr1.id
        });
        await Cart.create({
            userId: user2.id,
            productId: p1.id,
            orderId: order2.id,
            quantity: 1,
            price: 12500000,
            brandId: jordan.id,
            isPayed: true,
            name: p1.name,
            size: s41.name,
            color: red.name
        });

        console.log('--- Seeding Done Successfully! ---');
        process.exit(0);

    } catch (error) {
        console.error('FAILED to seed data:', error);
        process.exit(1);
    }
};

seedData();
