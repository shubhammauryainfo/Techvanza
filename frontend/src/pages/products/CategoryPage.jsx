import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
              "Auth-key": import.meta.env.VITE_API_KEY 
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{categoryName} Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded p-4">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
