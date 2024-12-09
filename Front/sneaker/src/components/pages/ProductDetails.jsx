import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}?populate=Brands,Categories,Images`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Chargement...</p>;
  }

  const { Name, Description, Price, Availability, Brands, Categories, Images } = product.attributes;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{Name}</h2>
      <img
        src={`http://localhost:1337${Images?.data[0]?.url}`}
        alt={Name}
        style={{ width: "400px" }}
      />
      <p><strong>Description :</strong> {Description}</p>
      <p><strong>Prix :</strong> ${Price}</p>
      <p><strong>Disponibilité :</strong> {Availability ? "Disponible" : "Indisponible"}</p>
      <p><strong>Marque :</strong> {Brands?.data?.attributes?.Name}</p>
      <p><strong>Catégorie :</strong> {Categories?.data?.attributes?.Name}</p>
    </div>
  );
};

export default ProductDetails;
