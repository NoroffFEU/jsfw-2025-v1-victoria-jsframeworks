import React from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import './index.css';

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Products />
        <Footer />
      </div>
    </>
  );
}

export default App;