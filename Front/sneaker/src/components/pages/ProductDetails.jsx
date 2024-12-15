import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { documentId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:1337/api/products/${documentId}?populate=*`);
        const data = await response.json();

        if (!data.data) {
          throw new Error("Produit introuvable.");
        }

        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [documentId]);

  if (loading) return <div className="text-center text-xl mt-10">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  const { attributes } = product || {};
  const { 
    Name, 
    Description, 
    Price, 
    Material, 
    Availability, 
    brand, 
    category, 
    Images 
  } = attributes || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{Name || "Nom non spécifié"}</h1>
      
      {Images?.data?.length > 0 && (
        <img
          src={`http://localhost:1337${Images.data[0]?.attributes?.url}`}
          alt={Name || "Image du produit"}
          className="w-full max-w-lg mx-auto rounded-lg shadow-lg mb-8"
        />
      )}

      <p className="text-lg text-gray-700 mb-4">{Description || "Description non disponible."}</p>
      <p className="text-2xl font-semibold text-green-600 mb-4">{Price ? `${Price} €` : "Prix non disponible"}</p>
      
      <div className="mb-4">
        <p>
          <strong>Matériau :</strong> {Material || "Non spécifié"}
        </p>
        <p>
          <strong>Disponibilité :</strong>{" "}
          <span className={Availability === "Activate" ? "text-green-600" : "text-red-600"}>
            {Availability === "Activate" ? "En stock" : "Rupture de stock"}
          </span>
        </p>
        {brand?.data && (
          <p>
            <strong>Marque :</strong> {brand.data.attributes.Name || "Non spécifiée"}
          </p>
        )}
        {category?.data && (
          <p>
            <strong>Catégorie :</strong> {category.data.attributes.Name || "Non spécifiée"}
          </p>
        )}
      </div>

      <div>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;