import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const MenuItem = ({ icon, text, path }) => (
    <Link to={path}>
      <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer
        ${location.pathname === path ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
        <i className={`${icon} ${location.pathname === path ? 'text-blue-600' : 'text-gray-500'}`}></i>
        <span className={location.pathname === path ? 'text-blue-600' : 'text-gray-700'}>{text}</span>
      </div>
    </Link>
  );

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">Menu</h1>
        
        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          <MenuItem icon="fas fa-calendar" text="Dashboard" path="/" />

          <h2 className="text-xs font-semibold text-gray-500 mb-2">TASKS</h2>
          <MenuItem icon="fas fa-calendar" text="Upcoming" path="/upcoming" />
          <MenuItem icon="fas fa-list-check" text="Todo" path="/todo" />
          <MenuItem icon="fas fa-note-sticky" text="Sticky Wall" path="/sticky-wall" />
          
          <h2 className="text-xs font-semibold text-gray-500 mt-6 mb-2">LISTS</h2>
          <MenuItem icon="fas fa-user" text="Personal" path="/personal" />
          <MenuItem icon="fas fa-briefcase" text="Work" path="/work" />
          
          <div className="pt-6">
            <MenuItem icon="fas fa-gear" text="Settings" path="/settings" />
            <MenuItem icon="fas fa-sign-out" text="Sign out" path="/logout" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;