import React from 'react';
import Head from '../components/Head'
import Layout from '../components/Layout';
import { GiGamepadCross } from "react-icons/gi";
import { RiUserCommunityLine } from "react-icons/ri";
import { MdOutlineEmojiEvents } from "react-icons/md";
const Home = () => {
  return (
    <Layout>
      <Head title="Battle Royale Hub" description="Welcome to the home page of our application." />
    <section className="h-screen bg-[url('/img/hero-banner.png')] bg-cover bg-center flex flex-col items-center justify-center text-center text-white">
   
      {/* <div className="absolute inset-0 bg-[#000f38]   bg-opacity-60"></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6">
        <img src="/img/logo.png" alt="Logo" className="w-full md:w-2/3  mx-auto mb-5" />
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide text-green-400">
          Enter the Gaming World
        </h1>
        <p className="mt-4 text-md md:text-xl text-gray-300">
        Gear up for the ultimate BGMI tournament! Dive into immersive battles, connect with fellow players, and conquer epic challenges. Are you ready to rise to the top?
        </p>
        <div className="mt-6 space-x-4">
         
          <div className="flex justify-center">
            <a
              href="/about"
              className="border-[#0b283d] border-2 rounded-md flex items-center justify-center relative h-[50px] font-semibold w-40 overflow-hidden before:bg-[#2d876c] px-3 text-white text-md transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 bg-transparent before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10 mx-1">Know More</span>
            </a>
          </div>
        </div>
      </div>
    </section>

{/* after hero section */}

<section className=" text-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-400 uppercase">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-gray-300 text-lg md:text-xl">
          Discover what makes our gaming platform the ultimate choice for players worldwide.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#196a75] p-4 rounded-full shadow-lg">
              <GiGamepadCross
                 className="text-4xl"/>
            </div>
            <h3 className="text-2xl font-bold mt-4">Immersive Gameplay</h3>
            <p className="mt-2 text-gray-400 text-center">
              Experience cutting-edge graphics and engaging storylines like never before.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#3ec7a9] p-4 rounded-full shadow-lg">
              <RiUserCommunityLine
                 className=" text-4xl"/>
            </div>
            <h3 className="text-2xl font-bold mt-4">Global Community</h3>
            <p className="mt-2 text-gray-400 text-center">
              Connect with players around the globe and team up to conquer challenges.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#2f374f] p-4 rounded-full shadow-lg">
              <MdOutlineEmojiEvents
               className="text-4xl"/>
            </div>
            <h3 className="text-2xl font-bold mt-4">Competitive Events</h3>
            <p className="mt-2 text-gray-400 text-center">
              Compete in tournaments and climb the leaderboards to prove your skills.
            </p>
          </div>
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default Home;
