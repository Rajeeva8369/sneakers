import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ padding: "20px", backgroundColor: "#333", color: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>Luxious Bag</h1>
      <nav style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Accueil</Link>
        <Link to="/products" style={{ color: "#fff", textDecoration: "none" }}>Produits</Link>
      </nav>
    </header>
  );
};

export default Header;
