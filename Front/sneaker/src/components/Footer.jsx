import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        {/* Logo et description */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-wide">
            Luxious Bag
          </h2>
          <p className="mt-2 text-gray-300">
            Découvrez des sacs d'exception pour un style unique et raffiné.
          </p>
        </div>

        
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="/products"
            className="text-gray-300 hover:text-white text-sm transition-colors"
          >
            Produits
          </a>
          <a
            href="/about"
            className="text-gray-300 hover:text-white text-sm transition-colors"
          >
            À propos
          </a>
          <a
            href="/contact"
            className="text-gray-300 hover:text-white text-sm transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Luxious Bag. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
