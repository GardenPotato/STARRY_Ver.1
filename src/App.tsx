import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import Frontend from './components/Frontend';
import Admin from './components/Admin';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'frontend' | 'admin'>('frontend');

  return (
    <DataProvider>
      <div className="min-h-screen bg-black text-white font-sans">
        {/* View Switcher (For Demo Purposes) */}
        <div className="fixed top-4 right-4 z-50 flex bg-gray-900/90 backdrop-blur-md rounded-full p-1 border border-gray-700 shadow-xl">
          <button
            onClick={() => setView('frontend')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              view === 'frontend' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            Mobile Web
          </button>
          <button
            onClick={() => setView('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              view === 'admin' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3 h-3" />
            Admin
          </button>
        </div>

        {/* Main Content */}
        {view === 'frontend' ? <Frontend /> : <Admin />}
      </div>
    </DataProvider>
  );
}
