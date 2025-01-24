import React from 'react';
import Head from '../components/Head'
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Category from '../components/category/Category';
import Crafts from '../components/category/Crafts';
import Artisans from '../components/category/Artisans';
import Layout from '../components/Layout';
Navbar
const Home = () => {
  return (
   <Layout>
      <Head title="R&T - Roots & Threads" />
     
      <Carousel />
      <Category />
      <Crafts />
      <Artisans />
      </Layout>
  
  );
};

export default Home;
