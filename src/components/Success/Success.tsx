import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import "./Success.css";
import { toast } from "react-hot-toast";

export default function Success() {
    const checkoutSuccess = useCartStore(state => state.checkoutSuccess);
    const lastOrderItemCount = useCartStore(state => state.lastOrderItemCount);
    const navigate = useNavigate();
    const hasShown = useRef(false);

    useEffect(() => {
    if (!checkoutSuccess) {
        navigate("/");
        return;
    }

    if (!hasShown.current && lastOrderItemCount > 0) {
        toast.success("Checkout successful!");
        hasShown.current = true;
    }
    
}, [checkoutSuccess, lastOrderItemCount, navigate]);

    return (
        <div className="success-page">
            <h1>Order Successful!</h1>
            <p>Your order has been placed. Thank you! ❤️</p>
        </div>
    );
}
