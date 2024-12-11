import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const API_URL = "http://localhost:1337/api/products?populate=Images";

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
        console.log(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Nos Produits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <img
              src={`http://localhost:1337${product.Images[0].formats.medium.url}`}
              alt={product.Name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{product.Name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.Description}</p>
              <Link
                to={`/products/${product.id}`}
                className="w-full block text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Voir plus
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;