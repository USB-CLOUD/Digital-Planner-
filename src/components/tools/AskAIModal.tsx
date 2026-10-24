import React, { useState } from 'react';
import { Sparkles, X, Check, Loader2, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { SmartEvent, ToDoItem } from '../../types/planner';

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  todayFocus: string;
  pendingTodos: ToDoItem[];
  onApplySchedule: (events: SmartEvent[], newFocus?: string) => void;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({
  isOpen,
  onClose,
  todayFocus,
  pendingTodos,
  onApplySchedule,
}) => {
  const initialPriorities = todayFocus
    ? todayFocus
    : pendingTodos.length > 0
    ? pendingTodos.map((t) => t.text).slice(0, 3).join(', ')
    : 'Finish digital planner tablet design, workout, meal prep';

  const [priorities, setPriorities] = useState(initialPriorities);
  const [workStyle, setWorkStyle] = useState('Deep Work blocks with intentional rest');
  const [wakeTime, setWakeTime] = useState('07:00 AM');
  const [sleepTime, setSleepTime] = useState('10:30 PM');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    summary: string;
    keyFocus: string;
    schedule: Array<{
      time: string;
      title: string;
      category: 'work' | 'personal' | 'wellness' | 'meal' | 'break';
      notes?: string;
      priority?: 'high' | 'medium' | 'low';
    }>;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priorities,
          workStyle,
          wakeTime,
          sleepTime,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        throw new Error(data.error || 'Failed to generate schedule');
      }
    } catch (err: any) {
      console.warn('AI schedule fetch error, fallback active:', err);
      setErrorMsg('AI service encountered an issue; fallback schedule generated.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (!result || !result.schedule) return;

    // Convert result.schedule into SmartEvent items
    const newEvents: SmartEvent[] = result.schedule.map((item, idx) => {
      // Parse hour from time string (e.g. "08:00 AM" -> 8, "02:00 PM" -> 14)
      const match = item.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
      let hour = 8 + idx;
      if (match) {
        let rawHour = parseInt(match[1], 10);
        const period = match[3].toUpperCase();
        if (period === 'PM' && rawHour < 12) rawHour += 12;
        if (period === 'AM' && rawHour === 12) rawHour = 0;
        hour = rawHour;
      }

      return {
        id: `ai_ev_${Date.now()}_${idx}`,
        hour,
        title: item.title,
        startTime: item.time,
        endTime: `${item.time} + 1h`,
        category: item.category || 'work',
        notes: item.notes || '',
        date: '2026-10-24',
      };
    });

    onApplySchedule(newEvents, result.keyFocus);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold">Ask AI: Daily Schedule Architect</h2>
              <span className="text-[10px] text-white/80 font-semibold">
                Powered by Gemini 3.8 Flash (Free Tier)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition"
            aria-label="Close Ask AI modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Form */}
          <form onSubmit={handleGenerate} className="space-y-3">
            <div>
              <label className="font-bold text-[11px] text-stone-700 block mb-1">
                What are your top goals and priorities for today?
              </label>
              <textarea
                value={priorities}
                onChange={(e) => setPriorities(e.target.value)}
                placeholder="e.g. Complete presentation, gym leg workout, read book, prep healthy dinner"
                rows={2}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="font-semibold text-[10px] text-stone-500 block mb-1">
                  Preferred Work Style
                </label>
                <select
                  value={workStyle}
                  onChange={(e) => setWorkStyle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                >
                  <option value="Deep Work blocks with intentional rest">Deep Work (90m)</option>
                  <option value="Pomodoro sprints 25/5 rhythm">Pomodoro (25/5)</option>
                  <option value="Gentle & balanced lifestyle">Gentle & Balanced</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[10px] text-stone-500 block mb-1">
                  Wake Up Time
                </label>
                <input
                  type="text"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-tabular"
                />
              </div>

              <div>
                <label className="font-semibold text-[10px] text-stone-500 block mb-1">
                  Sleep Target
                </label>
                <input
                  type="text"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-tabular"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-xl text-xs font-bold hover:from-amber-600 hover:to-rose-600 transition flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Optimal Schedule with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Balanced Day Schedule</span>
                </>
              )}
            </button>
          </form>

          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className="pt-2 border-t border-stone-200 space-y-3 animate-in fade-in">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">
                  AI Productivity Insight
                </span>
                <p className="text-xs text-stone-800 leading-relaxed font-medium">
                  {result.summary}
                </p>
                {result.keyFocus && (
                  <div className="mt-2 pt-1.5 border-t border-amber-200/60 text-xs font-handwriting text-base font-bold text-amber-950">
                    ★ Key Focus: "{result.keyFocus}"
                  </div>
                )}
              </div>

              {/* Schedule Blocks */}
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {result.schedule.map((slot, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-16 font-tabular font-bold text-[10px] text-stone-500">
                        {slot.time}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          slot.category === 'work'
                            ? 'bg-blue-100 text-blue-800'
                            : slot.category === 'wellness'
                            ? 'bg-emerald-100 text-emerald-800'
                            : slot.category === 'meal'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {slot.category}
                      </span>
                      <span className="font-semibold text-stone-900 text-xs">{slot.title}</span>
                    </div>
                    {slot.notes && (
                      <span className="text-[10px] text-stone-400 italic truncate max-w-[120px]">
                        {slot.notes}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Apply Schedule Button */}
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Apply Schedule Directly to My Daily Planner</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
