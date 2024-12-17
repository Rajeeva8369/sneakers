import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { documentId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const token =
    "502b3ad67fb82f58252b17347a2203013769a127493405c11c8f4aaa9e8b3df4a358479218533cfd7cc31e4d67623b565717f0bd5a2d58d3293b23b037f66abc220ca00e09a7bca11041e2bc57424cafd199ff05a2ac5b860f8f0c8f513246057b9354711303afc24eb99fd758088a1686bbece56303f567b56eed09ade3c013";

  
  const fetchProductData = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/products/?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      setProductData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchProductData();
  }, [documentId]);

  if (loading) {
    return <div className="text-gray-200 text-center mt-10">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Erreur : {error}</div>;
  }

  if (!productData) {
    return <div className="text-gray-500 text-center mt-10">Produit introuvable.</div>;
  }

  
  const attributes = productData.attributes || {};
  const imageUrl =
    attributes.Images?.data?.[0]?.attributes?.url || null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-6">
        
        <div className="flex-1">
          {imageUrl ? (
            <img
              src={`http://localhost:1337${imageUrl}`}
              alt={attributes.Name || "Image du produit"}
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          ) : (
            <div className="text-gray-400">Aucune image disponible</div>
          )}
        </div>

        
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">
            {attributes.Name || "Nom non spécifié"}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {attributes.Description || "Description non disponible."}
          </p>
          <p className="text-2xl font-bold text-green-600 mb-4">
            {attributes.Price ? `${attributes.Price} €` : "Prix non disponible"}
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
