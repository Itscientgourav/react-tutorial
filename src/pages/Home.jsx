import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Welcome to Home Page</h1>
        <p>This is your main content area.</p>
      </div>
    </Layout>
  );
};

export default Home;