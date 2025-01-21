export class Product {
    #stock;

    constructor(title, imageUrl, stock, price, discountPercentage, category, rating) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.#stock = stock; 
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.category = category;
        this.rating = rating;
    }

    get discountedPrice() {
        return parseFloat((this.price * (1 - this.discountPercentage / 100)).toFixed(2));
    }

    get stock() {
        return this.#stock;
    }

    updateStock(quantity) {
        if (this.#stock - quantity >= 0) {
            this.#stock -= quantity;
        } else {
            console.warn(`Stock for ${this.title} cannot go below 0.`);
        }
    }
}