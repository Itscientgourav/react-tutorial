import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const StickyWall = () => {
  const [notes, setNotes] = useState(() => {
    // Get notes from localStorage on initial load
    const savedNotes = localStorage.getItem('stickyNotes');
    return savedNotes ? JSON.parse(savedNotes) : [
      { id: 1, title: 'Name', content: 'Gourav', color: 'bg-yellow-100' },
      { id: 2, title: 'Yeh Shere Hai', content: 'Gourav Vish', color: 'bg-pink-200' },
      { id: 3, title: 'Description', content: 'Click to edit...', color: 'bg-orange-100' }
    ];
  });

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
  }, [notes]);

  const addNewNote = () => {
    const colors = ['bg-yellow-100', 'bg-pink-200', 'bg-orange-100', 'bg-blue-100', 'bg-green-100'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: 'Click to edit...',
      color: randomColor
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, updates) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Layout>
        <div className="p-8 ml-64 mt-16 mb-16">
        <h1 className="text-2xl font-bold mb-6">Sticky Wall</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {notes.map((note) => (
            <div
                key={note.id}
                className={`${note.color} p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group relative`}
            >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => deleteNote(note.id)}
                    className="p-1 hover:bg-red-100 rounded"
                >
                    <i className="fas fa-trash text-red-500"></i>
                </button>
                </div>
                <input
                className="font-semibold mb-2 w-full bg-transparent border-none focus:outline-none"
                value={note.title}
                onChange={(e) => updateNote(note.id, { title: e.target.value })}
                />
                <textarea
                className="w-full bg-transparent border-none focus:outline-none resize-none"
                value={note.content}
                onChange={(e) => updateNote(note.id, { content: e.target.value })}
                />
            </div>
            ))}
            
            {/* Add New Note Button */}
            <button
            onClick={addNewNote}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex items-center justify-center hover:border-gray-400 transition-colors duration-200"
            >
            <i className="fas fa-plus text-3xl text-gray-400"></i>
            </button>
        </div>
        </div>
    </Layout>
  );
};

export default StickyWall;