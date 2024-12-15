import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import ProductList from "./components/pages/ProductList";
import ProductDetails from "./components/pages/ProductDetails";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Cart from "./components/pages/Cart";

import Profil from "./components/pages/Profil";
import Wishlist from "./components/pages/Wishlist";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:documentId" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          
          <Route path="/profile" element={<Profil />} />
          <Route path="/wishlists" element={<Wishlist />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
