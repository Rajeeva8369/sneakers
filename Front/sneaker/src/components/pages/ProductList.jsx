import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const API_URL = "http://localhost:1337/api/products?populate=Images";

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(!!token);
  }, []);

  const addToWishlist = (product) => {
    if (!isAuthenticated) {
      alert("Veuillez vous connecter pour ajouter des produits à la wishlist !");
      return;
    }

    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = existingWishlist.some((item) => item.id === product.id);

    if (!isAlreadyInWishlist) {
      const updatedWishlist = [...existingWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      alert("Produit ajouté à la wishlist !");
    } else {
      alert("Ce produit est déjà dans la wishlist.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer 502b3ad67fb82f58252b17347a2203013769a127493405c11c8f4aaa9e8b3df4a358479218533cfd7cc31e4d67623b565717f0bd5a2d58d3293b23b037f66abc220ca00e09a7bca11041e2bc57424cafd199ff05a2ac5b860f8f0c8f513246057b9354711303afc24eb99fd758088a1686bbece56303f567b56eed09ade3c013`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 pt-10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold mb-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 drop-shadow-md">
          Découvrez nos Produits Exclusifs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col h-full"
            >
              {/* Image du produit */}
              <div className="relative w-full h-48 bg-gray-100">
                {product.Images?.[0]?.formats?.medium?.url ? (
                  <img
                    src={`http://localhost:1337${product.Images[0].formats.medium.url}`}
                    alt={product.Name}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    Aucune image
                  </div>
                )}
                <span
                  className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full shadow ${
                    product.Availability === "Activate"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {product.Availability === "Activate" ? "En stock" : "Rupture"}
                </span>
              </div>

              {/* Contenu texte */}
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.Name}</h3>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {product.Description || "Description non disponible."}
                  </p>
                </div>
                <p className="mt-4 text-lg font-bold text-purple-900">
                  {product.Price ? `${product.Price} €` : "Prix non disponible"}
                </p>
              </div>

              
              <div className="p-4 flex gap-4">
                <button
                  onClick={() => addToWishlist(product)}
                  className={`w-1/2 text-sm font-medium py-3 rounded-lg shadow-md ${
                    isAuthenticated
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Ajouter à la Wishlist
                </button>
                <Link
                  to={`/products/${product.documentId}`}
                  className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-300 text-white text-sm font-medium rounded-lg shadow-md text-center py-5 hover:from-blue-600 hover:to-blue-400 transition "
                >
                  Voir Plus
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
