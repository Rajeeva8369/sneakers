import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { documentId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const API_URL = `http://localhost:1337/api/products/${documentId}?populate=*`;
      const response = await fetch(API_URL);
      const data = await response.json();
      setProduct(data.data);
      setLoading(false);
    };
    fetchProduct();
  }, [documentId]);

  if (loading) return <div>Chargement...</div>;
  if (!product) return <div>Produit introuvable.</div>;

  const { attributes } = product;
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{attributes.Name}</h1>
      <img
        src={`http://localhost:1337${attributes.Images.data[0]?.attributes.url}`}
        alt={attributes.Name}
        className="w-full max-w-lg mx-auto rounded-lg shadow-lg mb-8"
      />
      <p>{attributes.Description}</p>
      <p className="text-xl font-semibold text-green-500 mt-4">
        {attributes.Price} €
      </p>
    </div>
  );
};

export default ProductDetails;
