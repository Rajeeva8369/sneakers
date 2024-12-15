import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistId } = useParams();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = '502b3ad67fb82f58252b17347a2203013769a127493405c11c8f4aaa9e8b3df4a358479218533cfd7cc31e4d67623b565717f0bd5a2d58d3293b23b037f66abc220ca00e09a7bca11041e2bc57424cafd199ff05a2ac5b860f8f0c8f513246057b9354711303afc24eb99fd758088a1686bbece56303f567b56eed09ade3c013'; // Remplacez par votre token d'authentification

  useEffect(() => {
    fetch(`http://localhost:1337/api/wishlists/?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setWishlist(data.data.products); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la wishlist:', error);
        setLoading(false);
      });
  }, [wishlistId, token]);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  
return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Ma Wishlist</h1>
      {wishlist && wishlist.length > 0 ? (
        wishlist.map((item) => {
          const product = item?.attributes?.product?.data?.attributes;
          return (
            <div key={item.id} className="border p-4 rounded-lg shadow-lg">
              {product ? (
                <>
                  <img
                    src={`http://localhost:1337${product.Images?.data?.[0]?.attributes?.url || ''}`}
                    alt={product.Name || 'Produit'}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h2 className="text-xl font-semibold">{product.Name || "Nom inconnu"}</h2>
                  <p className="text-gray-600">{product.Description || "Pas de description disponible."}</p>
                </>
              ) : (
                <p className="text-red-500">Produit non disponible.</p>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">Votre liste de favoris est vide.</p>
      )}
    </div>
  );
};

export default Wishlist;
