import React from 'react';
import { craftsProducts } from './data'; // Import product data

const Crafts = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Crafts</h3>
      <p className="text-gray-600">
        Discover beautiful handcrafted pieces from artisans around the world.
      </p>
      
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {craftsProducts.map(product => (
          <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
            <p className="text-gray-600">{product.price}</p>
            <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">View Product</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crafts;
