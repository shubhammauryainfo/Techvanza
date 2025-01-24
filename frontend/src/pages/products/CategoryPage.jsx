import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
  

const CategoryPage = () => {
  const { categoryName } = useParams();
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
            params: { category: categoryName },
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
  }, [categoryName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-8">
          {categoryName} Products
        </h1>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border rounded p-4">
                {/* Check if the image array exists and has at least one element */}
                {product.image && product.image.length > 0 ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${product.image[0]}`}
                    alt={product.name}
                    className="w-full my-3 h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-sm text-gray-600">{product.description}</p>

                {/* Add buttons */}
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
    </Layout>
  );
};

export default CategoryPage;
