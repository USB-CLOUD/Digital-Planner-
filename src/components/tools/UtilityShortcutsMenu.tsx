import React, { useState, useEffect } from 'react';
import {
  Wrench,
  CheckSquare,
  Clock,
  Timer,
  FileEdit,
  Search,
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
} from 'lucide-react';

interface UtilityShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickAddTodo: (text: string) => void;
}

export const UtilityShortcutsModal: React.FC<UtilityShortcutsModalProps> = ({
  isOpen,
  onClose,
  onQuickAddTodo,
}) => {
  const [activeTool, setActiveTool] = useState<'todo' | 'timer' | 'alarm' | 'note' | 'search'>('timer');

  // Quick Todo state
  const [quickTodoText, setQuickTodoText] = useState('');

  // Break Timer state (Pomodoro 25 min = 1500 sec)
  const [timerSeconds, setTimerSeconds] = useState(1500);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Set Alarm state
  const [alarmTime, setAlarmTime] = useState('17:00');
  const [alarmSet, setAlarmSet] = useState(false);

  // Quick Note state (persists in localStorage)
  const [quickNote, setQuickNote] = useState(() => {
    return localStorage.getItem('digital_planner_quick_note') || 'Quick thoughts, ideas, or phone numbers...';
  });

  // Web Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Sound Chime helper via Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.warn('Audio chime unavailable', e);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      playChime();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSaveQuickNote = (val: string) => {
    setQuickNote(val);
    localStorage.setItem('digital_planner_quick_note', val);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchResults([
      `Results for "${searchQuery}":`,
      `• Digital stationery and planning workflows`,
      `• High-performance deep work scheduling techniques`,
      `• Minimalist habit tracking guidelines and atomic habits`,
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-3.5 bg-stone-100/90 border-b border-stone-200 flex items-center justify-between">
          <span className="font-bold text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-amber-600" />
            Utility Shortcuts
          </span>
          <button
            onClick={onClose}
            className="p-1 text-stone-500 hover:bg-stone-200 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Actions Buttons Strip */}
        <div className="grid grid-cols-5 p-2 bg-stone-50 border-b border-stone-200 gap-1 text-center">
          <button
            onClick={() => setActiveTool('timer')}
            className={`p-2 rounded-lg flex flex-col items-center text-[10px] font-semibold transition ${
              activeTool === 'timer' ? 'bg-amber-100 text-amber-900 shadow-xs' : 'hover:bg-stone-200/60 text-stone-600'
            }`}
          >
            <Timer className="w-4 h-4 mb-1 text-rose-600" />
            <span>Break</span>
          </button>

          <button
            onClick={() => setActiveTool('todo')}
            className={`p-2 rounded-lg flex flex-col items-center text-[10px] font-semibold transition ${
              activeTool === 'todo' ? 'bg-amber-100 text-amber-900 shadow-xs' : 'hover:bg-stone-200/60 text-stone-600'
            }`}
          >
            <CheckSquare className="w-4 h-4 mb-1 text-emerald-600" />
            <span>To-Do</span>
          </button>

          <button
            onClick={() => setActiveTool('alarm')}
            className={`p-2 rounded-lg flex flex-col items-center text-[10px] font-semibold transition ${
              activeTool === 'alarm' ? 'bg-amber-100 text-amber-900 shadow-xs' : 'hover:bg-stone-200/60 text-stone-600'
            }`}
          >
            <Clock className="w-4 h-4 mb-1 text-indigo-600" />
            <span>Alarm</span>
          </button>

          <button
            onClick={() => setActiveTool('note')}
            className={`p-2 rounded-lg flex flex-col items-center text-[10px] font-semibold transition ${
              activeTool === 'note' ? 'bg-amber-100 text-amber-900 shadow-xs' : 'hover:bg-stone-200/60 text-stone-600'
            }`}
          >
            <FileEdit className="w-4 h-4 mb-1 text-amber-600" />
            <span>Scratch</span>
          </button>

          <button
            onClick={() => setActiveTool('search')}
            className={`p-2 rounded-lg flex flex-col items-center text-[10px] font-semibold transition ${
              activeTool === 'search' ? 'bg-amber-100 text-amber-900 shadow-xs' : 'hover:bg-stone-200/60 text-stone-600'
            }`}
          >
            <Search className="w-4 h-4 mb-1 text-sky-600" />
            <span>Search</span>
          </button>
        </div>

        {/* Tool Active Panes */}
        <div className="p-4 flex-1 text-xs">
          {/* Break Timer / Pomodoro Pane */}
          {activeTool === 'timer' && (
            <div className="text-center space-y-3">
              <span className="font-bold text-stone-700 block">25-Min Focus Break Timer</span>
              <div className="text-4xl font-extrabold font-tabular tracking-tight text-stone-900 py-1">
                {formatTimer(timerSeconds)}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="px-4 py-1.5 bg-rose-600 text-white font-bold rounded-lg flex items-center gap-1 hover:bg-rose-700"
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(1500);
                  }}
                  className="p-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-600"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={playChime}
                  className="p-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-600"
                  title="Test Audio Chime"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Add To-Do Quick Pane */}
          {activeTool === 'todo' && (
            <div className="space-y-3">
              <span className="font-bold text-stone-700 block">Quick Capture Action</span>
              <input
                type="text"
                autoFocus
                value={quickTodoText}
                onChange={(e) => setQuickTodoText(e.target.value)}
                placeholder="Enter urgent to-do..."
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
              <button
                onClick={() => {
                  if (quickTodoText.trim()) {
                    onQuickAddTodo(quickTodoText.trim());
                    setQuickTodoText('');
                    onClose();
                  }
                }}
                className="w-full py-2 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition"
              >
                Add to Daily To-Dos
              </button>
            </div>
          )}

          {/* Set Alarm Pane */}
          {activeTool === 'alarm' && (
            <div className="space-y-3">
              <span className="font-bold text-stone-700 block">Planner Alarm Notification</span>
              <input
                type="time"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-sm font-tabular text-center"
              />
              <button
                onClick={() => {
                  setAlarmSet(!alarmSet);
                  playChime();
                }}
                className={`w-full py-2 font-bold rounded-lg text-xs transition ${
                  alarmSet ? 'bg-emerald-600 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {alarmSet ? `Alarm Armed for ${alarmTime}` : 'Arm Alarm'}
              </button>
            </div>
          )}

          {/* Quick Note Scratchpad Pane */}
          {activeTool === 'note' && (
            <div className="space-y-2">
              <span className="font-bold text-stone-700 block">Local Scratchpad Note</span>
              <textarea
                value={quickNote}
                onChange={(e) => handleSaveQuickNote(e.target.value)}
                rows={4}
                className="w-full p-2.5 bg-yellow-50/80 border border-yellow-200 rounded-lg text-xs font-handwriting text-base font-bold text-stone-800 resize-none focus:outline-none"
              />
              <span className="text-[10px] text-stone-400 block text-right">Auto-saved to device</span>
            </div>
          )}

          {/* Web Search Simulation Pane */}
          {activeTool === 'search' && (
            <div className="space-y-3">
              <span className="font-bold text-stone-700 block">In-Planner Web Quick Lookup</span>
              <form onSubmit={handleSearchSubmit} className="flex gap-1.5">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search knowledge..."
                  className="flex-1 p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                />
                <button
                  type="submit"
                  className="px-3 bg-stone-900 text-white rounded-lg text-xs font-semibold"
                >
                  Go
                </button>
              </form>
              {searchResults.length > 0 && (
                <div className="p-2 bg-stone-50 rounded-lg border border-stone-200 space-y-1 text-[11px] text-stone-700">
                  {searchResults.map((r, i) => (
                    <div key={i}>{r}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
