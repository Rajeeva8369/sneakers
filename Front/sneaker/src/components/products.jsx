import React, { useEffect, useState } from "react";


const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Récupérer les produits depuis Strapi
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products?populate=brand,category,images");
        setProducts(response.data.data); // Les données sont dans response.data.data
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Produits</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              width: "300px",
            }}
          >
            <h2>{product.attributes.name}</h2>
            <p>{product.attributes.description}</p>
            <p>
              <strong>Prix :</strong> ${product.attributes.price}
            </p>
            <p>
              <strong>Disponibilité :</strong>{" "}
              {product.attributes.availability ? "Disponible" : "Indisponible"}
            </p>
            <p>
              <strong>Marque :</strong>{" "}
              {product.attributes.brand?.data?.attributes?.name}
            </p>
            <p>
              <strong>Catégorie :</strong>{" "}
              {product.attributes.category?.data?.attributes?.name}
            </p>
            {product.attributes.images?.data && (
              <img
                src={`http://localhost:1337${product.attributes.images.data[0]?.attributes?.url}`}
                alt={product.attributes.name}
                style={{ width: "100%" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;