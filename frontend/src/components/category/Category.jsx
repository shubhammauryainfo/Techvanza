import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Crafts', route: 'crafts', image: 'https://via.placeholder.com/400x300?text=Crafts' },
  { name: 'Artisans', route: 'artisans', image: 'https://via.placeholder.com/400x300?text=Artisans' },
  { name: 'Handmade Jewelry', route: 'handmade-jewelry', image: 'https://via.placeholder.com/400x300?text=Jewelry' },
  { name: 'Textiles', route: 'textiles', image: 'https://via.placeholder.com/400x300?text=Textiles' },
];

const Category = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.route}`} // Use the route to navigate
            className="group relative rounded-lg overflow-hidden shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover transition duration-300"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 text-white text-center transition duration-300 group-hover:bg-opacity-75">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
