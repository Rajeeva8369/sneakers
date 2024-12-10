import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import ProductList from "./components/pages/ProductList";
import ProductDetails from "./components/pages/ProductDetails";
import HomeCarousel from "./components/HomeCarousel";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:documentId" element={<ProductDetails />} />

          <Route path="/" element={<HomeCarousel />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;