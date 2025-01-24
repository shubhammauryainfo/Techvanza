import React, { useEffect, useState } from "react";
import axios from "axios";

const Artisans = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`,
          {
            params: { category: "Craft" }, // Replace "Craft" with the actual category name string
            headers: {
              "Auth-key": import.meta.env.VITE_API_KEY,
            },
          }
        );
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Artisans</h3>
      <div className="container mx-auto p-4">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border rounded p-4">
                {/* Product Image */}
                {product.image && product.image.length > 0 ? (
                  <img
                    src={`${import.meta.env.VITE_API_KEY} {product.image}`}
                    alt={product.name}
                    className="w-full my-3 h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}
                {/* Product Details */}
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
                {/* Buttons */}
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                    onClick={() => console.log(`Added ${product.name} to cart`)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
                    onClick={() => console.log(`Buying ${product.name}`)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Artisans;
