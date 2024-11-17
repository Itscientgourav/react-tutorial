import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const MenuItem = ({ icon, text, path, delay }) => (
    <Link to={path}>
      <div 
        className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer
          transform transition-all duration-300 ease-out
          ${location.pathname === path ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}
          ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
        style={{ transitionDelay: delay }}
      >
        <i className={`${icon} transform transition-transform duration-300 group-hover:scale-110
          ${location.pathname === path ? 'text-blue-600' : 'text-gray-500'}`}></i>
        <span className={`transition-colors duration-200
          ${location.pathname === path ? 'text-blue-600' : 'text-gray-700'}`}>
          {text}
        </span>
      </div>
    </Link>
  );

  return (
    <div className={`w-64 bg-white shadow-lg h-screen fixed transition-all duration-500 ease-out
      ${isVisible ? 'translate-x-0' : '-translate-x-64'}`}>
      <div className="p-4">
        <h1 className={`text-xl font-bold mb-6 text-blue-600 transition-all duration-500
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          Menu
        </h1>

        {/* Menu Items */}
        <div className="space-y-1">
          <MenuItem icon="fas fa-calendar" text="Dashboard" path="/" delay="200ms" />

          <h2 className={`text-xs font-semibold text-gray-500 mb-2 transition-all duration-500
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            style={{ transitionDelay: '300ms' }}>
            TASKS
          </h2>
          {/* <MenuItem icon="fas fa-calendar" text="Upcoming" path="/upcoming" delay="400ms" /> */}
          <MenuItem icon="fas fa-list-check" text="Todo" path="/todo" delay="500ms" />
          <MenuItem icon="fas fa-note-sticky" text="Sticky Wall" path="/sticky-wall" delay="600ms" />
          
          <h2 className={`text-xs font-semibold text-gray-500 mt-6 mb-2 transition-all duration-500
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            style={{ transitionDelay: '700ms' }}>
            LISTS
          </h2>
          <MenuItem icon="fas fa-images" text="Gallery" path="/gallery" delay="800ms" />
          <MenuItem icon="fas fa-briefcase" text="Work" path="/work" delay="900ms" />
          
          <div className={`pt-6 transition-all duration-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '1000ms' }}>
            <MenuItem icon="fas fa-gear" text="Settings" path="/settings" delay="1100ms" />
            <MenuItem 
              icon="fas fa-sign-out" 
              text="Sign out" 
              path="/logout" 
              delay="1200ms"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;