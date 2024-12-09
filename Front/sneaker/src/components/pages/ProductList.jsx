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
            Authorization: `Bearer 502b3ad67fb82f58252b17347a2203013769a127493405c11c8f4aaa9e8b3df4a358479218533cfd7cc31e4d67623b565717f0bd5a2d58d3293b23b037f66abc220ca00e09a7bca11041e2bc57424cafd199ff05a2ac5b860f8f0c8f513246057b9354711303afc24eb99fd758088a1686bbece56303f567b56eed09ade3c013`, // Remplacez par votre token
          },
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.data); // Les produits sont dans data.data
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nos Produits</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", width: "300px" }}>
            <img
              src={`http://localhost:1337${product.Images?.formats?.medium?.url}`}
              alt={product.name}
              style={{ width: "100%" }}
            />
            <h3>{product.Name}</h3>
            <p>{product.Description}</p>
            <Link to={`/products/${product.id}`}>Voir plus</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

