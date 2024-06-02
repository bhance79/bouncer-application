import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="bg-transparent top-0 left-0 w-full p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/bouncer logo.png" alt="Logo" className="h-12 w-auto mr-2" />
        </Link>
        <div className="flex space-x-6">
          {user ? (
            <Link to="/events" className="text-darkPurple font-semibold hover:text-mainPurple py-2">Home</Link>
          ) : (
            <Link to="/" className="text-darkPurple font-semibold hover:text-mainPurple py-2">Home</Link>
          )}
          <Link to="/future-events" className="text-darkPurple font-semibold hover:text-mainPurple py-2">See What's Next</Link>
          <Link to="/about" className="text-darkPurple font-semibold hover:text-mainPurple py-2">About</Link>
          <Link to="/contact" className="text-darkPurple font-semibold hover:text-mainPurple py-2">Contact Us</Link>
          {user ? (
            <Link to="/account" className="text-darkPurple font-semibold hover:text-mainPurple py-2">Account</Link>
          ) : (
            <Link to="/login" className="bg-darkPurple text-white font-semibold hover:text-gray-200 rounded-full px-4 py-2">Log In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
