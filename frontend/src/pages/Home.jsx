import React from 'react';
import Head from '../components/Head'
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Category from '../components/category/Category';
import Footer from '../components/Footer';
import Crafts from '../components/category/Crafts';
import Artisans from '../components/category/Artisans';
Navbar
const Home = () => {
  return (
    <div>
      <Head title="R&T - Roots & Threads" />
      <Navbar />
      <Carousel />
      <Category />
      <Crafts />
      <Artisans />
      <Footer />
    </div>
  );
};

export default Home;
