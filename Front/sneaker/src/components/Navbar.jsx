import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]); 

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Luxious Bag
        </Link>
        

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Accueil
          </Link>
          <Link to="/products" className="hover:text-gray-300">
            Produits
          </Link>
          <Link to="/wishlists" className="hover:text-gray-300">
           Wishlist
            </Link>
            <Link to="/profile" className="hover:text-gray-300">
              Profil
            </Link>
          <Link to="/login" className="hover:text-gray-300">
            Connexion
          </Link>
          <Link to="/register" className="hover:text-gray-300">
            Inscription
          </Link>
          <Link to="/cart" className="relative">
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs text-white bg-red-600 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
