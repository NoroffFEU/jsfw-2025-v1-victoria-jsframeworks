import { useState, useEffect } from "react";
import { API_URL } from "../../api/Api";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./Products.css"
import { Link } from "react-router-dom";

export interface Product {
    id: string;
    title: string;
    price: number;
    image: {
        url: string;
        alt: string;
    };
    discountedPrice?: number;
    description?: string;
    rating?: number;
}

interface ApiResponse {
    data: Product[];
}

/* Fetches and displays products on page */
function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch all products
    async function fetchAllProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Failed to fetch products");
            const result: ApiResponse = await response.json();
            setProducts(result.data);
            setFilteredProducts(result.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    /* Filters products based on the user's search input */
    const handleSearch = (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    /* Sort products based on name, price or rating */
    const handleSort = (sortOption: string) => {
        let sortedProducts = [...filteredProducts];
        
        switch (sortOption) {
            case 'name-asc':
                sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'price-asc':
                sortedProducts.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
                break;
            case 'rating-desc':
                sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                return;
        }
        
        setFilteredProducts(sortedProducts);
    };

    const handleClearSearch = () => {
        setFilteredProducts(products);
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error: {error}</p>;

    /* Products container */
    return (
        <>
            <div className="search-filter-container">
                <Search onSearch={handleSearch} onClear={handleClearSearch} />
                <Filter onSort={handleSort} />
            </div>
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id} className="product-link">
                            <div key={product.id} className="product-card">
                                <h3>{product.title}</h3>
                                <img className="product-image" src={product.image.url} alt={product.image.alt} />
                                {product.discountedPrice && product.discountedPrice < product.price && (
                                    <span className="discount-badge">
                                        {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                                    </span>
                                )}
                                <div className="product-info">
                                    <div className="price-section">
                                        {product.discountedPrice && product.discountedPrice < product.price ? (
                                            <>
                                                <span className="original-price">${product.price}</span>
                                                <span className="discounted-price">${product.discountedPrice}</span>
                                            </>
                                        ) : (
                                            <span className="price">${product.price}</span>
                                        )}
                                    </div>
                                    <div className="rating-section">
                                        <p className="rating">Rating: {product.rating || "No rating"}⭐</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="no-results">No Results.</p>
                )}
            </div>
        </>
    );
}

export default Products;