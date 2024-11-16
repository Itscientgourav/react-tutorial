import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm h-16 fixed w-full z-10">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Sticky Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <i className="fas fa-bell text-gray-600"></i>
          </button>
          <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
            <img src="https://avatars.githubusercontent.com/u/98934583?v=4" alt="User" className="w-8 h-8 rounded-full" />
            <span className="text-gray-700">Gourav</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;