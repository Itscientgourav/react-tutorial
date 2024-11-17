import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    activeTasks: 0,
    stickyNotes: 0
  });

  const [recentTasks, setRecentTasks] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get data from localStorage
    const notes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Calculate stats
    setStats({
      totalTasks: tasks.length,
      completedTasks: tasks.filter(task => task.status === 'completed').length,
      activeTasks: tasks.filter(task => task.status === 'active').length,
      stickyNotes: notes.length
    });

    // Get recent items
    setRecentTasks(tasks.slice(-5).reverse());
    setRecentNotes(notes.slice(-5).reverse());
    
    // Trigger animations after component mount
    setIsVisible(true);
  }, []);

  const StatCard = ({ title, value, icon, color, delay }) => (
    <div className={`bg-white rounded-lg shadow-lg p-6 transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
         style={{ transitionDelay: delay }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-blue-600">{value}</h3>
        </div>
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110`}>
          <i className={`${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="p-8 ml-64 mt-16 mb-16">
        <div className={`flex justify-between items-center mb-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200 flex items-center">
            <i className="fas fa-plus mr-2"></i>Add New Task
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Tasks" 
            value={stats.totalTasks}
            icon="fas fa-tasks text-blue-600" 
            color="bg-blue-100"
            delay="100ms"
          />
          <StatCard 
            title="Completed Tasks" 
            value={stats.completedTasks}
            icon="fas fa-check-circle text-green-600" 
            color="bg-green-100"
            delay="200ms"
          />
          <StatCard 
            title="Active Tasks" 
            value={stats.activeTasks}
            icon="fas fa-clock text-yellow-600" 
            color="bg-yellow-100"
            delay="300ms"
          />
          <StatCard 
            title="Sticky Notes" 
            value={stats.stickyNotes}
            icon="fas fa-note-sticky text-purple-600" 
            color="bg-purple-100"
            delay="400ms"
          />
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tasks */}
          <div className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
               style={{ transitionDelay: '500ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-600">Recent Tasks</h2>
              <a href="/tasks" className="text-blue-600 hover:text-blue-700 text-sm hover:underline">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase">Task</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentTasks.map((task, index) => (
                    <tr key={index} className={`transition-all duration-300 ease-out hover:bg-blue-50 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                        style={{ transitionDelay: `${600 + index * 100}ms` }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <i className={`fas fa-circle text-xs ${
                            task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                          } mr-2`}></i>
                          {task.title}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          task.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(task.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Sticky Notes */}
          <div className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
               style={{ transitionDelay: '600ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-600">Recent Sticky Notes</h2>
              <a href="/sticky-wall" className="text-blue-600 hover:text-blue-700 text-sm hover:underline">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase">Preview</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentNotes.map((note, index) => (
                    <tr key={index} className={`transition-all duration-300 ease-out hover:bg-blue-50 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                        style={{ transitionDelay: `${700 + index * 100}ms` }}>
                      <td className="px-4 py-3 font-medium">{note.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {note.content.substring(0, 30)}...
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(note.id).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;