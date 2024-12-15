import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const fetchCartProducts = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/products?populate=*");
        const data = await response.json();

        
        const filteredProducts = data.data.filter((product) =>
          cartItems.some((item) => item.id === product.id)
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchCartProducts();
  }, [cartItems]);

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  if (products.length === 0) {
    return <div className="text-center p-8">Votre panier est vide.</div>;
  }

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.attributes.Price, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Votre Panier</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center">
              <img
                src={`http://localhost:1337${product.attributes.Images.data[0]?.attributes?.url}`}
                alt={product.attributes.Name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{product.attributes.Name}</h2>
                <p className="text-gray-600">{product.attributes.Description}</p>
                <p className="text-green-600 font-bold">{product.attributes.Price} €</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Retirer
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">
          Total : <span className="text-green-600">{calculateTotal()} €</span>
        </h2>
      </div>
    </div>
  );
};

export default Cart;
