import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useEffect, useState } from "react";
import { API_URL } from "../../api/Api";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./IndividualProduct.css";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discountedPrice?: number;
    image: {
        url: string;
        alt: string;
    };
    rating?: number;
    tags?: string[];
    reviews?: {
        id: string;
        username: string;
        rating: number;
        description: string;
    }[];
}

export default function IndividualProduct() {
    const addToCart = useCartStore((state) => state.addToCart);
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchProduct() {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error("Failed to fetch product");

            const data = await response.json();
            
            setProduct(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>No product found.</p>;

    return (
    <>
        <div className="product-page">
            <h1 className="product-page-title">{product.title}</h1>

            <img src={product.image.url} alt={product.image.alt} />

            <div className="product-page-price-section">
                {product.discountedPrice && product.discountedPrice < product.price ? (
                    <>
                        <span className="product-page-original-price">
                            ${product.price}
                        </span>
                        <span className="product-page-discounted-price">
                            ${product.discountedPrice}
                        </span>
                    </>
                ) : (
                    <span className="product-page-price">${product.price}</span>
                )}

                <div className="rating-section">
                    <p className="rating">Rating: {product.rating || "No rating"}⭐</p>
                </div>
            </div>

            <p className="product-page-description">{product.description}</p>

            <button
                className="add-to-cart-btn"
                onClick={() => {
                    if (!product) return;

                    addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.discountedPrice ?? product.price,
                        image: product.image.url,
                    });

                    toast.success("Added to cart!");
                }}
            >
                Add to Cart
            </button>
        </div>

        {product.tags && (
            <div className="tags-section">
                <h3>Tags:</h3>
                <p>{product.tags.join(", ")}</p>
            </div>
        )}

        {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews-section">
                <h2>Reviews</h2>

                {product.reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <p><strong>{review.username}</strong> — {review.rating}⭐</p>
                        <p>{review.description}</p>
                    </div>
                ))}
            </div>
        ) : (
            <p className="no-reviews">No reviews yet.</p>
        )}
    </>
);
}
