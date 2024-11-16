import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import StickyWall from './pages/StickyWall';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/sticky-wall" element={<StickyWall />} />
      </Routes>
    </Router>
  );
};

export default App;