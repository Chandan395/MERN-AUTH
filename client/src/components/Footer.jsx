import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-6 px-4 mt-10">
      <p className="text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
