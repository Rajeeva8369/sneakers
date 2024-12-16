import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt"); 
    setIsAuthenticated(false); 
    alert("Vous êtes déconnecté !");
    window.location.href = "/login";
  };

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
          {isAuthenticated && (
            <Link to="/wishlists" className="hover:text-gray-300">
              Wishlist
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/profil" className="hover:text-gray-300">
              Profil
            </Link>
          )}
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Connexion
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Inscription
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
