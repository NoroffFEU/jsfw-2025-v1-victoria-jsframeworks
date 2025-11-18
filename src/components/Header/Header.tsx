import { useState, useEffect, useRef } from "react";
import { useCartStore } from "../../store/useCartStore";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);

    const items = useCartStore((state) => state.items);
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

        const totalPrice = items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const removeFromCart = useCartStore((state) => state.removeFromCart);

    /* Closes the side menu */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    /* Closes the cart menu */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setCartOpen(false);
            }
        }

        if (cartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cartOpen]);

    return (
        <header className="header">
            <nav ref={menuRef} className={`side-menu ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/checkout" onClick={() => setMenuOpen(false)}>Checkout</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </nav>

            <div className="header-content">

                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                <h1 className="title">Online shop</h1>

                <div ref={cartRef} className={`cart-panel ${cartOpen ? "open" : ""}`}>
                    <h2>Your Cart</h2>

                    {items.length === 0 ? (
                        <p className="empty-cart">Your cart is empty.</p>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title} />

                                <div className="cart-item-info">
                                    <p>{item.title}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>${item.price}</p>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => {
                                        removeFromCart(item.id);
                                        toast.error("Item removed from cart!");
                                    }}
                                >
                                    ✖
                                </button>
                            </div>
                        ))
                    )}{items.length > 0 && (
                        <div className="cart-total">
                            <p>Total:</p>
                            <p className="total-amount">${totalPrice.toFixed(2)}</p>
                        </div>
                    )}

                    <Link to="/checkout" className="checkout-btn" onClick={() => setCartOpen(false)}>
                        Go to Checkout
                    </Link>
                </div>

                <div
                    className="cart"
                    onClick={() => setCartOpen(!cartOpen)}
                    style={{ cursor: "pointer" }}>
                    🛒<span className="cart-number">{totalCount}</span>
                </div>
            </div>
        </header>
    );
}

export default Header;