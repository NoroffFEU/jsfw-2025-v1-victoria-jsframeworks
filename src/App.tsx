import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import ProductPage from './components/IndividualProduct/IndividualProduct';
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
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;