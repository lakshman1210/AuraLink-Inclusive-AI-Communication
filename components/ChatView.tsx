
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Message } from '../types';

const ChatView: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'remote', text: 'Hey there! Are you free for a video call?', timestamp: Date.now() - 100000, type: 'text' },
    { id: '2', senderId: 'me', text: 'Yes! Just let me turn on my sign-recognition engine.', timestamp: Date.now() - 50000, type: 'text' },
    { id: '3', senderId: 'remote', text: 'Great, ready whenever you are.', timestamp: Date.now() - 10000, type: 'text' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: Date.now(),
      type: 'text'
    };
    
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <div className="flex h-full flex-col relative">
      {/* Header */}
      <header className="p-6 border-b border-white/5 flex items-center justify-between glass">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="md:hidden text-slate-400 mr-2">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <img src={`https://picsum.photos/seed/${userId}/100/100`} className="w-10 h-10 rounded-xl" />
          <div>
            <h2 className="font-bold text-white">Spatial Conversation</h2>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Secure Path</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate(`/call/${userId}`)}
            className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center"
          >
            <i className="fa-solid fa-video"></i>
          </button>
          <button className="w-10 h-10 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 transition-all flex items-center justify-center">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
        {messages.map((msg) => {
          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} perspective-container`}>
              <div className={`max-w-[70%] p-4 rounded-3xl tilt-card shadow-lg ${
                isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'glass-dark text-slate-200 rounded-tl-none'
              }`}>
                <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                <div className={`text-[9px] mt-2 font-bold uppercase tracking-widest opacity-40 ${isMe ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-8">
        <form onSubmit={handleSendMessage} className="glass rounded-2xl p-2 flex items-center gap-2 aura-glow">
          <button type="button" className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-colors">
            <i className="fa-solid fa-paperclip"></i>
          </button>
          <input 
            type="text" 
            placeholder="Type a message or use gestures..." 
            className="flex-1 bg-transparent border-none outline-none px-2 py-3 text-sm placeholder:text-slate-600"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="button" className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-colors">
            <i className="fa-solid fa-face-smile"></i>
          </button>
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center transition-all aura-glow active:scale-95"
          >
            <i className="fa-solid fa-paper-plane text-white"></i>
          </button>
        </form>
        <p className="text-[10px] text-center mt-3 text-slate-500 uppercase tracking-widest font-medium">
          <i className="fa-solid fa-hands-asl-interpreting mr-2 text-indigo-500"></i>
          Press Space to toggle sign-recognition keyboard
        </p>
      </div>
    </div>
  );
};

export default ChatView;
