import { ProductAPI } from './ProductAPI.js';
import { Filters } from './Filters.js';

const productGrid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const applyFiltersButton = document.getElementById('applyFilters');

const sortPriceAscButton = document.getElementById('sortPriceAsc');
const sortPriceDescButton = document.getElementById('sortPriceDesc');
const sortRatingAscButton = document.getElementById('sortRatingAsc');
const sortRatingDescButton = document.getElementById('sortRatingDesc');

let allProducts = [];
let filteredProducts = [];

async function initialize() {
    allProducts = await ProductAPI.fetchProducts();
    populateCategoryFilter();
    displayProducts(allProducts);
}

function populateCategoryFilter() {
    const categories = [...new Set(allProducts.map(product => product.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function displayProducts(products) {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Lagersaldo: ${product.stock}</p>
            <p>
                <span class="old-price">${product.price} kr</span>
                <span class="discounted-price">${product.discountedPrice} kr</span>
            </p>
            <button ${product.stock === 0 ? 'disabled' : ''}>Lägg till i kundvagn</button>
        `;

        const button = card.querySelector('button');
        button.addEventListener('click', () => {
            product.updateStock(1);
            displayProducts(filteredProducts.length ? filteredProducts : allProducts);
        });

        productGrid.appendChild(card);
    });
}

applyFiltersButton.addEventListener('click', () => {
    const category = categoryFilter.value;
    const maxPrice = parseFloat(priceFilter.value);

    filteredProducts = allProducts;
    if (category) {
        filteredProducts = Filters.filterByCategory(filteredProducts, category);
    }
    if (!isNaN(maxPrice)) {
        filteredProducts = Filters.filterByPrice(filteredProducts, maxPrice);
    }

    displayProducts(filteredProducts);
});

sortPriceAscButton.addEventListener('click', () => {
    const productsToSort = filteredProducts.length ? filteredProducts : allProducts;
    displayProducts(Filters.sortByPrice(productsToSort, true));
});

sortPriceDescButton.addEventListener('click', () => {
    const productsToSort = filteredProducts.length ? filteredProducts : allProducts;
    displayProducts(Filters.sortByPrice(productsToSort, false));
});

sortRatingAscButton.addEventListener('click', () => {
    const productsToSort = filteredProducts.length ? filteredProducts : allProducts;
    displayProducts(Filters.sortByRating(productsToSort, true));
});

sortRatingDescButton.addEventListener('click', () => {
    const productsToSort = filteredProducts.length ? filteredProducts : allProducts;
    displayProducts(Filters.sortByRating(productsToSort, false));
});

initialize();
