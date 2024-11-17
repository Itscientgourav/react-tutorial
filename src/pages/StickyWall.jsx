import React, { useState, useEffect } from 'react';
import { AlignLeft, List, X, Plus } from 'lucide-react';
import Layout from '../components/Layout';

const StickyWall = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedNotes = localStorage.getItem('stickyNotes');
    const initialNotes = savedNotes
      ? JSON.parse(savedNotes)
      : [
          {
            id: 1,
            title: 'Welcome Note',
            content:
              '• Welcome to your sticky wall!\n• Create new notes easily\n• Switch between text and bullets',
            color: 'bg-gradient-to-br from-blue-50 to-blue-100',
            type: 'bullets',
          },
        ];
    setNotes(initialNotes);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('stickyNotes', JSON.stringify(notes));
    }
  }, [notes, loading]);

  const gradients = [
    'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200',
    'bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200',
    'bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200',
    'bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200',
    'bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200',
    'bg-gradient-to-br from-green-50 via-green-100 to-green-200',
    'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200',
    'bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200',
    'bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200',
    'bg-gradient-to-br from-cyan-50 via-cyan-100 to-cyan-200',
  ];
  
  
  const addNewNote = () => {
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      color: randomGradient,
      type: 'text',
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, updates) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updates } : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const formatBulletContent = (content, type) => {
    if (type === 'bullets') {
      return content
        .split('\n')
        .map((line) => (line.trim().startsWith('•') ? line : `• ${line}`))
        .join('\n');
    }
    return content;
  };

  return (
    <Layout>
      <div className="p-8 ml-64 mt-16 mb-16">
        <h1 className="text-2xl font-bold mb-6">Sticky Wall</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 rounded-lg">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`${note.color} rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <input
                      type="text"
                      value={note.title}
                      onChange={(e) => updateNote(note.id, { title: e.target.value })}
                      className="font-semibold text-lg bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-200 w-full mr-2"
                      placeholder="Note Title"
                    />
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 hover:bg-red-100 rounded-full transition-colors duration-200 group"
                    >
                      <X className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                    </button>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => updateNote(note.id, { type: 'text' })}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                        note.type === 'text'
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    >
                      <AlignLeft className="w-4 h-4" />
                      Text
                    </button>
                    <button
                      onClick={() => updateNote(note.id, { type: 'bullets' })}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                        note.type === 'bullets'
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    >
                      <List className="w-4 h-4" />
                      Bullets
                    </button>
                  </div>

                  <div className="relative">
                    <textarea
                      value={note.content}
                      onChange={(e) => {
                        const newContent =
                          note.type === 'bullets'
                            ? formatBulletContent(e.target.value, note.type)
                            : e.target.value;
                        updateNote(note.id, { content: newContent });
                      }}
                      className={`w-full bg-white/40 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[150px] max-h-[300px] transition-all duration-200 ${
                        note.type === 'bullets' ? 'font-normal leading-relaxed' : ''
                      }`}
                      style={{
                        height: '150px',
                        overflowY: 'auto',
                      }}
                      placeholder={
                        note.type === 'bullets'
                          ? '• Type your bullet points here...'
                          : 'Type your note here...'
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addNewNote}
              className="border-3 border-dashed border-blue-200 rounded-xl p-4 h-full min-h-[280px] flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 group"
            >
              <Plus className="w-10 h-10 text-blue-400 group-hover:text-blue-500 mb-2" />
              <span className="text-blue-400 group-hover:text-blue-500 font-medium">
                Add New Note
              </span>
            </button>
          </div>
      </div>
    </Layout>
  );
};

export default StickyWall;