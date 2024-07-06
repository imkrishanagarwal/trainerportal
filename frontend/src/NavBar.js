import React from 'react';
import SearchBar from './SearchBar';

function Navbar({ handleSearch, handleReset, handleLogout }) {
  return (
    <nav className="flex items-center justify-between bg-gray-100 p-2 fixed top-0 left-0 right-0 z-50">
      {/* Company Logo (Left) */}
      <div className="flex-shrink-0 w-1/6">
        <img src="/logo.png" alt="Company Logo" />
      </div>

      {/* Centered Search Bar */}
      <div className="flex items-center justify-center w-100 px-3 ml-2">
        <SearchBar onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* Menu Items */}
      <div className="flex justify-end w-2/6">
        <div className="relative group">
          <button className="text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-lg mr-4 focus:outline-none hover:bg-gray-200">
            Menu
          </button>
          <ul className="absolute hidden bg-white rounded-lg shadow-md group-hover:block min-w-max">
            <li>
              <a
                href="/createTrainer"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Add Trainer
              </a>
            </li>
            <li>
              <a
                href="/trainers"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                View Trainers
              </a>
            </li>
          </ul>
        </div>
        <button
          className="bg-red-600 text-white font-semibold py-2 px-4 border border-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
