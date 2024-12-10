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
        // console.log(data.data[0].Images[0].formats.medium.url);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Nos Produits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >

              <img 
                src={`http://localhost:1337${product.Images[0].formats.medium.url}`} 
                alt={product.Name} 
                className=""
                />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.Name}</h3>
              <p className="text-gray-600 mb-4">{product.Description}</p>
              <Link 
                to={`/products/${product.documentid}`} 
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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