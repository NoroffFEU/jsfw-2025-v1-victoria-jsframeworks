import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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

    return (
        <header className="header">
            <nav ref={menuRef} className={`side-menu ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/checkout" onClick={() => setMenuOpen(false)}>Checkout</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </nav>

            <div className="header-content">
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                <h1 className="title">Online shop</h1>

                <div className="cart">
                    🛒<span className="cart-number">0</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
