import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function MainHero() {
  return (
    <div className='min-h-screen bg-newHero bg-no-repeat bg-cover bg-left md:bg-top'>
      <Navigation />
      <main className='container'>
        <h1 className='mt-32 md:mt-48 font-bubble text-4xl lg:text-7xl w-[15ch] leading-relaxed'>
          <span className='border-2 border-black rounded-full p-3 inline-block'>
            Clothes
          </span>
          are the
          <span className='bg-green-500 text-white font-semibold px-2 mx-3 rounded-3xl '>
            &rarr;
          </span>
          way you present yourself to the world.
        </h1>
        <div className='flex mt-12'>
          <div className='w-8 h-8 rounded-full bg-red-400'></div>
          <div className='w-8 h-8 rounded-full bg-purple-400 -ml-2'></div>
          <div className='w-8 h-8 rounded-full bg-green-400 -ml-2'></div>
        </div>
        <p className='md:text-2xl mt-4 w-[35ch] lg:w-auto'>
          Style is a way to say who you are without having to speak.
        </p>
        <div className='mt-6 flex gap-3'>          
          <Link to='/products/all'>
            <button className='text-white font-semibold bg-orange-400 px-4 py-2 text-xl'>
              Shop now
            </button>
          </Link>
          <Link to='/customer-support'>
            <button className='border-2 border-black px-3 py-1 text-xl font-black'>
              Learn more
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default MainHero;
