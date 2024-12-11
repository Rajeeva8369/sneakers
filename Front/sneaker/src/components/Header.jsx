import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <h1 className="text-center">Luxious Bag</h1>
      <nav className="flex justify-center gap-8">
        <Link to="/" className="hover:text-gray-300">
          Accueil
        </Link>
        <Link to="/products" className="hover:text-gray-300">
          Produits
        </Link>
      </nav>
    </header>
  );
};

export default Header;