import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import Conditions from './pages/Condition';
import Auth from './dashboard/components/Auth';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            {/* Dashboard pages */}
            {/* <Route path="/dashboard"
              element={
                <Auth>
                  <Dashome />
                </Auth>
              } /> */}

            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>

      </Router>
    </HelmetProvider>
  );
};

export default App;
