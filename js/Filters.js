export class Filters {
    static filterByCategory(products, category) {
        return products.filter(product => product.category === category);
    }

    static filterByPrice(products, maxPrice) {
        return products.filter(product => product.discountedPrice <= maxPrice);
    }

    static sortByPrice(products, ascending = true) {
        return products.slice().sort((a, b) => ascending ? a.discountedPrice - b.discountedPrice : b.discountedPrice - a.discountedPrice);
    }

    static sortByRating(products, ascending = true) {
        return products.slice().sort((a, b) => ascending ? a.rating - b.rating : b.rating - a.rating);
    }
}