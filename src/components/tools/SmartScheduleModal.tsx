import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Bell,
  Check,
  Trash2,
  Share2,
  Download,
  Tag,
} from 'lucide-react';
import { SmartEvent } from '../../types/planner';

interface SmartScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  hour: number;
  existingEvent?: SmartEvent;
  onSaveEvent: (event: SmartEvent) => void;
  onDeleteEvent?: (id: string) => void;
}

export const SmartScheduleModal: React.FC<SmartScheduleModalProps> = ({
  isOpen,
  onClose,
  hour,
  existingEvent,
  onSaveEvent,
  onDeleteEvent,
}) => {
  const [scheduleType, setScheduleType] = useState<'event' | 'reminder'>('event');
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('10:00 AM');
  const [category, setCategory] = useState<'work' | 'personal' | 'wellness' | 'meal' | 'break'>('work');
  const [calendarType, setCalendarType] = useState<'apple' | 'google' | 'local'>('google');
  const [reminderMinutes, setReminderMinutes] = useState<number>(15);
  const [notes, setNotes] = useState('');
  const [syncFeedback, setSyncFeedback] = useState(false);

  useEffect(() => {
    if (existingEvent) {
      setTitle(existingEvent.title);
      setStartTime(existingEvent.startTime);
      setEndTime(existingEvent.endTime);
      setCategory(existingEvent.category || 'work');
      setNotes(existingEvent.notes || '');
      setCalendarType(existingEvent.calendarType || 'google');
      setReminderMinutes(existingEvent.reminderMinutes || 15);
    } else {
      const period = hour < 12 ? 'AM' : 'PM';
      const dispHour = hour % 12 === 0 ? 12 : hour % 12;
      const nextHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12;
      const nextPeriod = hour + 1 < 12 ? 'AM' : 'PM';

      setTitle('');
      setStartTime(`${dispHour}:00 ${period}`);
      setEndTime(`${nextHour}:00 ${nextPeriod}`);
      setCategory('work');
      setNotes('');
      setCalendarType('google');
      setReminderMinutes(15);
    }
  }, [hour, existingEvent, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const eventToSave: SmartEvent = {
      id: existingEvent?.id || Date.now().toString(),
      hour,
      title: title.trim(),
      startTime,
      endTime,
      category,
      notes: notes.trim(),
      calendarType,
      reminderMinutes,
      date: '2026-10-24',
    };

    onSaveEvent(eventToSave);
    onClose();
  };

  // Generate .ics calendar download
  const handleExportICS = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//All-in-One Digital Planner//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@digitalplanner.app`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${title || 'Scheduled Event'}`,
      `DESCRIPTION:${notes || 'Created in All-in-One Digital Planner'}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(title || 'event').replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSyncFeedback(true);
    setTimeout(() => setSyncFeedback(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header with Apple/Google Calendar Simulation Badge */}
        <div className="p-4 bg-stone-100/90 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">
                {existingEvent ? 'Edit Schedule Slot' : 'Smart Scheduling'}
              </h2>
              <span className="text-[10px] text-stone-500 font-semibold">
                Apple & Google Calendar Synchronized
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-200 text-stone-500 transition"
            aria-label="Close schedule modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-4 space-y-3.5 text-xs">
          {/* Segmented Switch: Event vs Reminder */}
          <div className="flex p-0.5 bg-stone-100 rounded-lg border border-stone-200">
            <button
              type="button"
              onClick={() => setScheduleType('event')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition flex items-center justify-center gap-1.5 ${
                scheduleType === 'event'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </button>
            <button
              type="button"
              onClick={() => setScheduleType('reminder')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition flex items-center justify-center gap-1.5 ${
                scheduleType === 'reminder'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Add Reminder</span>
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="font-bold text-[11px] text-stone-600 block mb-1">
              {scheduleType === 'event' ? 'Event Title' : 'Reminder Task'}
            </label>
            <input
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Deep Work: Product Design Sprint"
              className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-[10px] text-stone-500 block mb-1">
                Start Time
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-tabular"
              />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-stone-500 block mb-1">
                End Time
              </label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-tabular"
              />
            </div>
          </div>

          {/* Category & Calendar Target */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-[10px] text-stone-500 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1.5 text-xs"
              >
                <option value="work">💼 Work / Project</option>
                <option value="wellness">🧘 Wellness & Fitness</option>
                <option value="personal">❤️ Personal & Social</option>
                <option value="meal">🥗 Meal / Hydration</option>
                <option value="break">☕ Short Break</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[10px] text-stone-500 block mb-1">
                Calendar Provider
              </label>
              <select
                value={calendarType}
                onChange={(e) => setCalendarType(e.target.value as any)}
                className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1.5 text-xs"
              >
                <option value="google">Google Calendar</option>
                <option value="apple">Apple Calendar</option>
                <option value="local">Local Planner Only</option>
              </select>
            </div>
          </div>

          {/* Reminder Alert Notice */}
          <div>
            <label className="font-semibold text-[10px] text-stone-500 block mb-1 flex items-center gap-1">
              <Bell className="w-3 h-3 text-amber-600" />
              <span>Reminder Notification</span>
            </label>
            <select
              value={reminderMinutes}
              onChange={(e) => setReminderMinutes(Number(e.target.value))}
              className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs"
            >
              <option value={0}>At time of event</option>
              <option value={5}>5 minutes before</option>
              <option value={15}>15 minutes before</option>
              <option value={30}>30 minutes before</option>
              <option value={60}>1 hour before</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="font-semibold text-[10px] text-stone-500 block mb-1">
              Notes & Checklist
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add agenda items, meeting link, or reminder details..."
              rows={2}
              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs resize-none"
            />
          </div>

          {/* Calendar Sync / Export Trigger */}
          <div className="pt-1 flex items-center justify-between border-t border-stone-100">
            <button
              type="button"
              onClick={handleExportICS}
              className="flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:text-sky-800 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{syncFeedback ? 'iCalendar (.ics) Exported!' : 'Export to Apple / Google (.ics)'}</span>
            </button>

            {existingEvent && onDeleteEvent && (
              <button
                type="button"
                onClick={() => {
                  onDeleteEvent(existingEvent.id);
                  onClose();
                }}
                className="text-red-500 hover:text-red-600 p-1 rounded"
                title="Delete Event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 rounded-lg text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save to Schedule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
