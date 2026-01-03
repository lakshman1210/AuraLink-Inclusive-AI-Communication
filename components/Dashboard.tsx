
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const MOCK_CONTACTS: User[] = [
  { id: '1', name: 'Sarah Chen', status: 'online', avatar: 'https://picsum.photos/seed/sarah/100/100', isSigner: true },
  { id: '2', name: 'James Wilson', status: 'busy', avatar: 'https://picsum.photos/seed/james/100/100', isSigner: false },
  { id: '3', name: 'Elena Rodriguez', status: 'offline', avatar: 'https://picsum.photos/seed/elena/100/100', isSigner: true },
  { id: '4', name: 'Marcus Ng', status: 'online', avatar: 'https://picsum.photos/seed/marcus/100/100', isSigner: false },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 h-full flex flex-col overflow-y-auto">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Alex</span>
          </h1>
          <p className="text-slate-400">Connect spatially with gesture recognition and live translation.</p>
        </div>
        <div className="hidden lg:flex gap-4">
          <div className="glass p-4 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400">
              <i className="fa-solid fa-hands-asl-interpreting"></i>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Accuracy</p>
              <p className="font-bold">98.4%</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_CONTACTS.map((contact) => (
          <div 
            key={contact.id}
            onClick={() => navigate(`/call/${contact.id}`)}
            className="glass p-6 rounded-3xl cursor-pointer hover:bg-white/5 transition-all duration-500 perspective-container group"
          >
            <div className="tilt-card flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img 
                  src={contact.avatar} 
                  className="w-20 h-20 rounded-full object-cover aura-glow border-2 border-transparent group-hover:border-indigo-500/50 transition-all" 
                  alt={contact.name}
                />
                {contact.isSigner && (
                  <div className="absolute -top-1 -right-1 bg-indigo-500 text-white p-1 rounded-full text-[8px] flex items-center justify-center border-2 border-slate-900" title="Sign Language User">
                    <i className="fa-solid fa-hands"></i>
                  </div>
                )}
                <div className={`absolute bottom-0 right-1 w-4 h-4 rounded-full border-2 border-slate-950 ${
                  contact.status === 'online' ? 'bg-green-500' : 
                  contact.status === 'busy' ? 'bg-amber-500' : 'bg-slate-500'
                }`} />
              </div>
              <h3 className="font-bold text-lg mb-1">{contact.name}</h3>
              <p className="text-xs text-slate-400 mb-6">{contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}</p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate(`/chat/${contact.id}`); }}
                  className="flex-1 bg-white/5 hover:bg-white/10 p-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  Message
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate(`/call/${contact.id}`); }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 p-2.5 rounded-xl text-sm font-medium transition-all aura-glow"
                >
                  Call
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Contact Card */}
        <div className="glass p-6 rounded-3xl border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-400/50 transition-all cursor-pointer">
          <i className="fa-solid fa-plus text-3xl mb-4"></i>
          <span className="font-medium text-sm">Add New Contact</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
