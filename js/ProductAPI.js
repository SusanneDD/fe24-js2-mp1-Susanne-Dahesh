import { Product } from './Product.js';

export class ProductAPI {
    static async fetchProducts() {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            return data.products.map(product => new Product(
                product.title,
                product.thumbnail,
                product.stock,
                product.price,
                product.discountPercentage,
                product.category,
                product.rating
            ));
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }
}