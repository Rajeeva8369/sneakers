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
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="Luxious Bag"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">Luxious Bag</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          
          {isAuthenticated && (
            <Link
              to="/wishlists"
              className="text-sm font-semibold hover:text-indigo-400"
            >
              Wishlist
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/profil"
              className="text-sm font-semibold hover:text-indigo-400"
            >
              Profil
            </Link>
          )}
        </div>

        {/* Boutons d'authentification */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold hover:text-indigo-400"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold hover:text-indigo-400"
              >
                Inscription
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition"
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
