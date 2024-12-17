import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [removing, setRemoving] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    setRemoving(productId); 
    setTimeout(() => {
      const updatedWishlist = wishlist.filter((product) => product.id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setRemoving(null); 
    }, 50); 
  };

  if (wishlist.length === 0) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Ma Wishlist</h1>
        <p className="text-gray-600">Votre wishlist est vide.</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Explorer les produits
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ma Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className={`relative border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
              removing === product.id ? "opacity-50" : "opacity-100"
            }`}
          >
            
            <button
              onClick={() => handleRemoveFromWishlist(product.id)}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-2 py-2 text-sm hover:bg-red-600 transition"
            >
              X
            </button>

            
            {product.Images[0]?.formats?.medium?.url ? (
              <img
                src={`http://localhost:1337${product.Images[0].formats.medium.url}`}
                alt={product.Name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-400">Aucune image</p>
              </div>
            )}

            
            <div className="p-4 bg-white">
              <h2 className="text-lg font-semibold text-gray-800">{product.Name}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.Description || "Description non disponible."}
              </p>
              <p className="text-green-700 font-bold">Prix: {product.Price}€</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
