import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Dashome from './dashboard/Dashome';
import Auth from './dashboard/components/Auth';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Product from './dashboard/Product';
import Category from './components/category/Category';
import CategoryPage from './pages/products/CategoryPage';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/category/:categoryName" element={<CategoryPage />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            {/* Dashboard pages */}
            <Route path="/dashboard"
              element={
                <Auth>
                  <Dashome />
                </Auth>

              } />
            <Route path="/dashboard/products"
              element={
                <Auth>
                  <Product />
                </Auth>

              } />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>

      </Router>
    </HelmetProvider>
  );
};

export default App;
