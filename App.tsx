
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CallView from './components/CallView';
import ChatView from './components/ChatView';
import { AppRoute, User } from './types';

const MOCK_CURRENT_USER: User = {
  id: 'me',
  name: 'Alex Rivera',
  status: 'online',
  avatar: 'https://picsum.photos/seed/me/100/100',
  isSigner: true
};

const App: React.FC = () => {
  const [currentUser] = useState<User>(MOCK_CURRENT_USER);
  const navigate = useNavigate();
  const location = useLocation();

  // Basic layout wrapper to ensure consistent UI across routes
  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Sidebar currentUser={currentUser} activeRoute={location.pathname} />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat/:userId" element={<ChatView />} />
          <Route path="/call/:userId" element={<CallView />} />
          <Route path="/settings" element={<div className="p-10">Settings Coming Soon</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
