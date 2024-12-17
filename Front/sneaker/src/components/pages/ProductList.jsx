import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const API_URL = "http://localhost:1337/api/products?populate=Images";

  const addToWishlist = (product) => {
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Découvrez nos Produits
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 auto-rows-fr">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative h-full min-h-[450px] flex flex-col bg-gray-50 p-4 rounded-lg shadow-md"
            >
              {/* Image du produit */}
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                {product.Images?.[0]?.formats?.medium?.url ? (
                  <img
                    src={`http://localhost:1337${product.Images[0].formats.medium.url}`}
                    alt={product.Name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    Aucune image
                  </div>
                )}
              </div>

              {/* Contenu texte */}
              <div className="mt-4 flex-grow">
                <h3 className="text-lg font-medium text-gray-900">{product.Name}</h3>
                <p className="mt-1 text-sm text-gray-700 line-clamp-2">
                  {product.Description || "Description non disponible."}
                </p>
                <p className="mt-2 text-lg font-bold text-emerald-600">
                  {product.Price ? `${product.Price} €` : "Prix non disponible"}
                </p>
              </div>

              {/* Boutons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => addToWishlist(product)}
                  className="flex-1 bg-emerald-600 text-white text-sm font-medium py-2 rounded-md hover:bg-emerald-700 transition"
                >
                  Ajouter à la Wishlist
                </button>
                <Link
                  to={`/products/${product.documentId}`}
                  className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 transition text-center"
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
