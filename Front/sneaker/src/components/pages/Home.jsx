import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-800">
          Bienvenue sur <span className="text-blue-600">Luxious Bag</span>
        </h1>
        <p className="text-lg text-gray-600">
          Découvrez nos produits de qualité supérieure, conçus pour tous vos
          besoins.
        </p>
        <Link to="/products" className="bg-purple-500 hover:bg-purple-700 text-white font-bold px-6 rounded-full">
          Get Started
          </Link>
      </div>
    </div>
  );
};

export default Home;