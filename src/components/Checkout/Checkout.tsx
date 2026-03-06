import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCartStore } from "../../store/useCartStore";
import "./Checkout.css";

/* Lets the user checkout when items are added to the cart */
export default function Checkout() {
    const items = useCartStore(state => state.items);
    const increaseQuantity = useCartStore(state => state.increaseQty);
    const decreaseQuantity = useCartStore(state => state.decreaseQty);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    const clearCart = useCartStore(state => state.clearCart);
    const setLastOrderItemCount = useCartStore(state => state.setLastOrderItemCount);
    const setCheckoutSuccess = useCartStore(state => state.setCheckoutSuccess);

    const navigate = useNavigate();

    const totalPrice = items.reduce((sum, item) => 
        sum + item.price * item.quantity, 0);

    const checkoutBtn = () => {
            const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
            setLastOrderItemCount(totalItems);
            clearCart();
            setCheckoutSuccess(true);
            navigate("/success", { state: { fromCheckout: true } });
    };

    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    /* Checkout container */
    return (
        <div className="checkout-page">

            <h1>Checkout</h1>

            <div className="cart-items">
                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="checkout-item">
                            <img 
                                src={item.image || FALLBACK_IMAGE} 
                                alt={item.title || "Product image"} 
                                className="checkout-item-img" 
                                onError={(e) => {
                                    e.currentTarget.src = FALLBACK_IMAGE;
                                    e.currentTarget.onerror = null;
                                }}
                            />

                            <div className="checkout-item-info">
                                <h3>{item.title}</h3>
                                <p>${item.price}</p>

                                <div className="checkout-quantity">
                                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                </div>
                            </div>

                            <button 
                                className="remove-item-btn"
                                onClick={() => {
                                    removeFromCart(item.id);
                                    toast.error("Item removed");
                                }}>
                                ✖
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="checkout-total">
                <h2>Total: ${totalPrice.toFixed(2)}</h2>
            </div>

            {items.length === 0 ? (
                <button 
                    className="checkout-btn"
                    onClick={() => navigate("/")}
                >
                    Keep Shopping
                </button>
            ) : (
                <button 
                    className="checkout-btn"
                    onClick={checkoutBtn}
                >
                    Checkout
                </button>
            )}
        </div>
    );
}