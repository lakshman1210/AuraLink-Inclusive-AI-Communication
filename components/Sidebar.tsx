
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AppRoute } from '../types';

interface SidebarProps {
  currentUser: User;
  activeRoute: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, activeRoute }) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: 'fa-house', label: 'Home', route: AppRoute.DASHBOARD },
    { icon: 'fa-comment', label: 'Messages', route: '/chat/all' },
    { icon: 'fa-video', label: 'Calls', route: '/call/recent' },
    { icon: 'fa-gear', label: 'Settings', route: AppRoute.SETTINGS },
  ];

  return (
    <aside className="w-20 md:w-64 flex flex-col items-center py-8 border-r border-white/5 glass-dark z-50">
      <div className="mb-12 flex flex-col items-center">
        <div className="relative group perspective-container">
          <img 
            src={currentUser.avatar} 
            className="w-12 h-12 md:w-16 md:h-16 rounded-2xl aura-glow object-cover tilt-card transition-transform duration-500"
            alt="Profile"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full" />
        </div>
        <div className="hidden md:block text-center mt-4">
          <h3 className="font-bold text-sm">{currentUser.name}</h3>
          <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-semibold">Active Now</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-6 w-full px-4">
        {navItems.map((item) => {
          const isActive = activeRoute === item.route;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className={`flex items-center gap-4 p-3 md:px-5 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-indigo-600 text-white aura-glow shadow-indigo-500/20' 
                  : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
            >
              <i className={`fa-solid ${item.icon} text-lg w-6`}></i>
              <span className="hidden md:block font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1 h-1 bg-white rounded-full hidden md:block"></div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-4 w-full">
        <div className="hidden md:block p-4 rounded-xl glass bg-white/5 border border-white/10 text-[11px]">
          <p className="text-slate-400 mb-2">AI ENGINE STATUS</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-green-400">SIGN-DETECTION ACTIVE</span>
          </div>
        </div>
        <button className="w-full mt-4 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors flex items-center justify-center md:justify-start gap-4">
          <i className="fa-solid fa-right-from-bracket"></i>
          <span className="hidden md:block text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
