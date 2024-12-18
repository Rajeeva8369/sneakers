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
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10 text-white"
            >
              <path d="M12 2C8.13 2 4.73 3.7 2.88 6.39C1.03 9.08 1.1 12.68 2.88 15.59L12 22L21.12 15.59C22.9 12.68 22.97 9.08 21.12 6.39C19.27 3.7 15.87 2 12 2ZM12 20L3.12 13.59C2.42 12.63 2 11.42 2 10C2 8.58 2.42 7.37 3.12 6.41L12 12L20.88 6.41C21.58 7.37 22 8.58 22 10C22 11.42 21.58 12.63 20.88 13.59L12 20Z" />
            </svg>
            <span className="text-2xl font-extrabold tracking-wide text-white">
              Luxious Bag
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex flex-5 justify-end gap-10">
         
          {isAuthenticated && (
            <Link
              to="/wishlists"
              className="text-sm font-semibold hover:text-pink-300 transition-colors"
            >
              Wishlist
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/profil"
              className="text-sm font-semibold hover:text-pink-300 transition-colors"
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
                className="text-sm font-semibold bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-shadow hover:shadow-md"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold bg-pink-600 px-4 py-2 rounded-lg hover:bg-pink-700 transition-shadow hover:shadow-md"
              >
                Inscription
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700 transition-shadow hover:shadow-lg"
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
