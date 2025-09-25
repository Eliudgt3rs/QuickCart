
import { blogs } from '@/data/blogs';
import connectDB from '@/config/db';
import Product from '@/models/Product';

const URL = 'https://yenuphoneskenya.com';

export default async function sitemap() {
    try {
        await connectDB();
        const products = await Product.find({});

        const productEntries = products.map(({ _id, date }) => ({
            url: `${URL}/product/${_id}`,
            lastModified: new Date(date).toISOString(),
            changeFrequency: 'daily',
        }));

        const blogEntries = blogs.map(({ id, date }) => ({
            url: `${URL}/blog/${id}`,
            lastModified: new Date(date).toISOString(),
            changeFrequency: 'daily',
        }));

        const staticPaths = [
            '/',
            '/about-us',
            '/add-address',
            '/all-products',
            '/blog',
            '/cancel',
            '/cart',
            '/contact-us',
            '/order-placed',
            '/search-results',
            '/seller',
            '/seller/orders',
            '/seller/product-list',
            '/success',
            '/wishlist',
        ].map(path => ({
            url: `${URL}${path}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
        }));

        return [
            ...staticPaths,
            ...productEntries,
            ...blogEntries,
        ];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [];
    }
}
