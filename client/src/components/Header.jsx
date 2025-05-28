import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        Welcome to Our Website
      </h1>
      <p className="text-lg md:text-xl mb-6">
        Hey {userData?.name || 'Developer'},<br />
        Discover powerful tools and seamless experiences that help you succeed.
      </p>
      <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer">
        Get Started
      </button>
    </header>
  );
};

export default Header;
