import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCartStore } from "../../store/useCartStore";
import "./Checkout.css";

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

    return (
        <div className="checkout-page">

            <h1>Checkout</h1>

            <div className="cart-items">
                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="checkout-item">
                            <img src={item.image} alt={item.title} className="checkout-item-img" />

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
