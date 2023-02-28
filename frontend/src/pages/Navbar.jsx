import React from 'react';
import { NavLink } from 'react-router-dom';

/* This is the navbar wrapper */

function Navbar() {
  return (
    <div>
      <div className="px-2 sm:px-4 py-2.5 container flex flex-wrap justify-between mx-16">
        <NavLink to="/">
          <img src="https://zupimages.net/up/23/09/67q9.png" className="h-6 mr-3 sm:h-10" alt="Flowbite Logo" />
        </NavLink>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col p-4 border border-gray-300 md:space-x-8 md:flex-row rounded-lg font-bold text-gray-700 ">
            <li><button type="button"><NavLink to="/register">Register</NavLink></button></li>
            <li><button type="button"><NavLink to="/login">Login</NavLink></button></li>
            <li><a href="https://github.com/C-Chafik">About us</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
