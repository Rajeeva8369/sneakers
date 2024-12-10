import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { documentId } = useParams(); // Récupère le documentId depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const API_URL = `http://localhost:1337/api/products/${documentId}?populate=Images`;  // Utilisation du documentId dans l'URL
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer 502b3ad67fb82f58252b17347a2203013769a127493405c11c8f4aaa9e8b3df4a358479218533cfd7cc31e4d67623b565717f0bd5a2d58d3293b23b037f66abc220ca00e09a7bca11041e2bc57424cafd199ff05a2ac5b860f8f0c8f513246057b9354711303afc24eb99fd758088a1686bbece56303f567b56eed09ade3c013`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setProduct(data.data);  
      } catch (err) {
        setError(err.message);  
      } finally {
        setLoading(false); 
      }
    };

    fetchProduct();  
  }, [documentId]); 

  // Affichage en fonction des états
  if (loading) return <div className="text-center text-xl p-4">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Erreur : {error}</div>;
  if (!product) return null;

  const { attributes } = product; 
  const images = attributes.Images?.data || []; 

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div>
        {images.length > 0 && (
          <>
            <img
              src={`http://localhost:1337${images[selectedImage]?.attributes?.url}`}
              alt={attributes.Name}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
            <div className="flex space-x-2 mt-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:1337${image.attributes.url}`}
                  alt={`${attributes.Name} - Image ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 object-cover cursor-pointer rounded ${
                    index === selectedImage ? 'border-2 border-black' : 'opacity-60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">{attributes.Name}</h1>

        <div className="space-y-4">
          <p className="text-gray-700">{attributes.Description}</p>

          <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
            <div>
              <strong className="block text-gray-600">Prix</strong>
              <span className="text-2xl font-semibold text-green-600">{attributes.Price} €</span>
            </div>

            <div>
              <strong className="block text-gray-600">Disponibilité</strong>
              <span className={`
                ${attributes.Availability ? 'text-green-600' : 'text-red-600'}
                font-semibold
              `}>
                {attributes.Availability ? 'En stock' : 'Rupture de stock'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <strong className="text-gray-600">Matériau :</strong>
              <span className="ml-2">{attributes.Material || 'Non spécifié'}</span>
            </div>

            <div>
              <strong className="text-gray-600">Marque :</strong>
              <span className="ml-2">
                {attributes.Brand?.data?.attributes?.Nom || 'Non spécifié'}
              </span>
            </div>

            <div>
              <strong className="text-gray-600">Catégorie :</strong>
              <span className="ml-2">
                {attributes.Category?.data?.attributes?.Nom || 'Non spécifié'}
              </span>
            </div>
          </div>

          <button
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
