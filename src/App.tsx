import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import ProductPage from './components/IndividualProduct/IndividualProduct';
import Checkout from './components/Checkout/Checkout';
import Success from './components/Success/Success';
import './index.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Toaster position="top-center" />
            <main>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/products/:id" element={<ProductPage />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<Success />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;