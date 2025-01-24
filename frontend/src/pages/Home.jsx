import React from 'react';
import Head from '../components/Head'
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Category from '../components/category/Category';
Navbar
const Home = () => {
  return (
    <div>
      <Head title="R&T - Roots & Threads" />
      <Navbar/>
      <Carousel/>
      <Category/>
      hello
    </div>
  );
};

export default Home;
