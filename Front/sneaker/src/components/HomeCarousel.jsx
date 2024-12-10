import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from './pages/ProductList';


const HomeCarousel = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await ProductList.getAllProducts(1, 5);
        setProducts(response.products);
      } catch (error) {
        console.error('Erreur de chargement des produits', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  if (products.length === 0) return null;

  const currentProduct = products[currentSlide];
  const attributes = currentProduct.attributes;
  const imageUrl = `http://localhost:1337${product.Images?.formats?.medium?.url}`;

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          filter: 'brightness(0.7)'
        }}
      />
      
      <div className="relative z-10 container mx-auto flex items-center justify-center h-full">
        <div className="text-center text-white max-w-2xl p-8 bg-black bg-opacity-50 rounded-lg">
          <h2 className="text-4xl font-bold mb-4">{attributes.Name}</h2>
          <p className="text-xl mb-6">{attributes.Description.substring(0, 200)}...</p>
          
          <div className="flex justify-center space-x-4">
            <Link 
              to={`/products/${currentProduct.id}`}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition duration-300"
            >
              Voir les détails
            </Link>
            <button 
              className="px-6 py-3 bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-black transition duration-300"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
        <button 
          onClick={prevSlide}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          ←
        </button>
        <button 
          onClick={nextSlide}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default HomeCarousel;