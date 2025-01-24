import React from 'react';
import { Link } from 'react-router-dom';
import Head from '../components/Head';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/img/hero-banner.png')]">
         <Head title="404 - Page Not Found" description="The page you are looking for does not exist." />
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-500">404</h1>
        <h2 className="text-4xl font-semibold text-white mt-4">
          Oops! Page not found
        </h2>
        <p className="mt-2 text-gray-400">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
      
    </div>
  );
};

export default NotFound;
