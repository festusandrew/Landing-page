import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookDemo: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onBookDemo }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(15);

  const chapters = [
    {
      time: '0:00',
      title: 'Unified Healthcare Ecosystem',
      desc: 'How MployUS bridges recruitment, care delivery, staffing, and facility management into one real-time cloud platform.',
      module: 'Core Ecosystem',
      badgeColor: 'bg-teal-500'
    },
    {
      time: '0:35',
      title: 'Recruitment & ATS Automation',
      desc: 'Publishing roles to 10+ UK job boards with 1 click, drag-and-drop applicant tracking, and automated DBS validation.',
      module: 'Recruitment Module',
      badgeColor: 'bg-blue-500'
    },
    {
      time: '1:05',
      title: 'Digital Care Plans & eMAR',
      desc: 'Mobile daily notes with voice dictation, smart eMAR medication checks, incident logs, and CQC audit readiness.',
      module: 'Care Management Module',
      badgeColor: 'bg-emerald-500'
    },
    {
      time: '1:35',
      title: 'Instant Locum Matching & GPS Clocking',
      desc: 'Matching qualified nurses to urgent shifts in under 15 minutes with geofenced GPS check-ins and automated timesheets.',
      module: 'Locums & Staffing App',
      badgeColor: 'bg-violet-500'
    },
    {
      time: '1:50',
      title: 'Live Facility Dashboard & Analytics',
      desc: 'Real-time attendance tracking, funder billing reports, compliance scores, and Sage/Xero payroll export.',
      module: 'Facility Portal',
      badgeColor: 'bg-amber-500'
    }
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        const next = prev + 1;
        if (next >= 80) setActiveChapter(4);
        else if (next >= 60) setActiveChapter(3);
        else if (next >= 35) setActiveChapter(2);
        else if (next >= 15) setActiveChapter(1);
        else setActiveChapter(0);
        return next;
      });
    }, 400);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Interactive Product Tour</span>
            <span className="text-slate-500 text-xs">|</span>
            <span className="text-xs text-slate-300 font-medium">{chapters[activeChapter].title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative bg-slate-950 aspect-video w-full overflow-hidden flex items-center justify-center group shrink-0">
          {/* Simulated Product UI Canvas */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 flex flex-col justify-between">
            {/* Top Bar of Simulated UI */}
            <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">mployus.cloud/app/dashboard</span>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white ${chapters[activeChapter].badgeColor}`}>
                {chapters[activeChapter].module}
              </span>
            </div>

            {/* Dynamic Simulated UI Center Card */}
            <div className="my-auto max-w-xl mx-auto w-full bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{chapters[activeChapter].title}</h4>
                  <p className="text-xs text-slate-400">Timestamp {chapters[activeChapter].time}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {chapters[activeChapter].desc}
              </p>

              {/* Simulated UI Live Indicators */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-between text-slate-300">
                  <span>Data Synchronization</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Live
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-between text-slate-300">
                  <span>CQC Compliance</span>
                  <span className="text-teal-400 font-semibold">Audit Ready</span>
                </div>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="flex items-center justify-between gap-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center font-bold transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {Math.floor((progress * 120) / 100 / 60)}:
                  {String(Math.floor(((progress * 120) / 100) % 60)).padStart(2, '0')} / 2:00
                </span>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 max-w-xs mx-4">
                <div 
                  className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = (clickX / rect.width) * 100;
                    setProgress(pct);
                  }}
                >
                  <div className="h-full bg-teal-400 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onBookDemo();
                }}
                className="px-3.5 py-1.5 bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-slate-950 text-xs font-semibold rounded-lg transition-all"
              >
                Book Personal Demo
              </button>
            </div>
          </div>
        </div>

        {/* Chapter Selection Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 overflow-x-auto shrink-0">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Jump to Chapter</div>
          <div className="flex gap-2">
            {chapters.map((ch, idx) => (
              <button
                key={ch.time}
                onClick={() => {
                  setActiveChapter(idx);
                  setProgress((idx / chapters.length) * 100 + 5);
                  setIsPlaying(true);
                }}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs shrink-0 w-52 ${
                  activeChapter === idx
                    ? 'bg-slate-800 border-teal-500 text-white shadow-md'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-teal-400 font-bold">{ch.time}</span>
                  <span className="text-[10px] font-semibold text-slate-500">{ch.module}</span>
                </div>
                <div className="font-semibold truncate">{ch.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
