import { useState, useEffect } from "react";
import { API_URL } from "../../api/Api";
import "./Products.css"

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
    meta?: any;
}

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch all products
    async function fetchAllProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Failed to fetch products");
            const result: ApiResponse = await response.json();
            setProducts(result.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <h3>{product.title}</h3>
                    <img className="product-image" src={product.image.url} alt={product.image.alt} />
                    {product.discountedPrice && product.discountedPrice < product.price && (
                        <span className="discount-badge">
                            Save ${product.price - product.discountedPrice}
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
            ))}
        </div>
    );
}

export default Products;
