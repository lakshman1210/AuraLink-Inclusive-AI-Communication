
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleGenAI, Modality } from '@google/genai';

// Note: In a production app, the API key would be managed securely.
// This component demonstrates the integration logic.

const CallView: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isCalling, setIsCalling] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [isGesturing, setIsGesturing] = useState(false);
  const [language, setLanguage] = useState('English');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recognitionInterval = useRef<number | null>(null);

  useEffect(() => {
    // Simulate connection phase
    const timer = setTimeout(() => setIsCalling(false), 2000);
    
    // Start camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Camera error:", err));

    // Simulated Recognition Logic
    // In actual implementation, we'd use the Live API to stream frames:
    /*
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const session = await ai.live.connect({ ... });
      // Stream frames to session...
    */
    
    const mockGestures = [
      "Hello! How are you?",
      "I am doing well today.",
      "Are we meeting later?",
      "That sounds great!",
      "I agree with that point.",
      "Let me explain more."
    ];

    recognitionInterval.current = window.setInterval(() => {
      if (!isVideoOff) {
        setIsGesturing(true);
        setTimeout(() => {
          setIsGesturing(false);
          setTranscription(mockGestures[Math.floor(Math.random() * mockGestures.length)]);
        }, 1500);
      }
    }, 8000);

    return () => {
      clearTimeout(timer);
      if (recognitionInterval.current) clearInterval(recognitionInterval.current);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [isVideoOff]);

  return (
    <div className="h-full w-full relative flex flex-col bg-black">
      {/* Remote Participant (Main Background) */}
      <div className="absolute inset-0 bg-slate-900 overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${userId}/1280/720`} 
          className="w-full h-full object-cover opacity-60 blur-sm"
          alt="Remote Participant"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      {/* Connection State */}
      {isCalling && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center glass-dark">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
            <img src={`https://picsum.photos/seed/${userId}/100/100`} className="absolute inset-2 w-28 h-28 rounded-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold animate-pulse">Connecting to Spatial Stream...</h2>
          <p className="text-slate-400 mt-2">Initializing Sign Language AI Engine</p>
        </div>
      )}

      {/* Header Info */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-10">
        <div className="glass p-4 rounded-2xl flex items-center gap-4">
          <div className="relative">
            <img src={`https://picsum.photos/seed/${userId}/100/100`} className="w-12 h-12 rounded-xl object-cover" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
          </div>
          <div>
            <h3 className="font-bold">Chat with Participant</h3>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold uppercase tracking-widest">E2E SECURE</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-bolt text-amber-400"></i> 12ms Latency</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="glass-dark px-4 py-2 rounded-xl text-sm font-medium border-none outline-none focus:ring-2 ring-indigo-500/50"
          >
            <option>English (US)</option>
            <option>Spanish (ES)</option>
            <option>French (FR)</option>
            <option>Japanese (JP)</option>
          </select>
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm">
            <i className="fa-solid fa-globe text-indigo-400"></i>
            <span>Live AI Translation</span>
          </div>
        </div>
      </div>

      {/* Main Interaction Area */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Transcription Overlay - Spatial/Immersive */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 z-20 pointer-events-none">
          <div className={`glass-dark p-6 rounded-3xl border-l-4 border-l-indigo-500 transition-all duration-500 transform ${
            transcription ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">AI SUBTITLE ({language})</span>
              {isGesturing && <div className="flex gap-1"><div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" /><div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-75" /><div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-150" /></div>}
            </div>
            <p className="text-2xl md:text-3xl font-medium leading-relaxed">
              {transcription || "Listening for gestures..."}
            </p>
          </div>
        </div>

        {/* Local Video Feed - Floating 3D window */}
        <div className="absolute bottom-32 right-8 w-48 h-64 md:w-64 md:h-80 perspective-container group z-30">
          <div className="w-full h-full glass-dark rounded-3xl overflow-hidden aura-glow tilt-card transition-all group-hover:scale-105 border border-white/20">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-500 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`} 
            />
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                <i className="fa-solid fa-video-slash text-3xl text-slate-600"></i>
              </div>
            )}
            
            {/* Gesture Detection Overlay */}
            {!isVideoOff && isGesturing && (
              <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-3xl animate-pulse pointer-events-none">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-bold text-indigo-400">DETECTING GESTURES</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="p-8 pb-10 flex justify-center z-40 bg-gradient-to-t from-black via-black/50 to-transparent">
        <div className="glass-dark px-8 py-4 rounded-full flex items-center gap-6 aura-glow border border-white/10">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/5 hover:bg-white/10'}`}
          >
            <i className={`fa-solid ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
          </button>
          
          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500/20 text-red-500' : 'bg-white/5 hover:bg-white/10'}`}
          >
            <i className={`fa-solid ${isVideoOff ? 'fa-video-slash' : 'fa-video'}`}></i>
          </button>

          <button className="w-16 h-16 bg-red-600 hover:bg-red-500 rounded-2xl flex items-center justify-center transition-all aura-glow transform hover:scale-110 active:scale-95 mx-4" onClick={() => navigate('/')}>
            <i className="fa-solid fa-phone-slash text-xl text-white"></i>
          </button>

          <button className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
            <i className="fa-solid fa-message"></i>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
            <i className="fa-solid fa-hand"></i>
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CallView;
