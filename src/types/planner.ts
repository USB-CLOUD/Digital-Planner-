export type ThemeMode = 'rainbow' | 'boho' | 'white' | 'dark';

export type ActivePageType =
  | 'index'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'monthly-budget'
  | 'monthly-review'
  | 'overview'
  | 'quarterly'
  | 'note-line'
  | 'note-grid'
  | 'note-table'
  | 'note-graph'
  | 'category'
  | 'custom-section';

export type CategoryType =
  | 'Personal'
  | 'Self-Care'
  | 'Education'
  | 'Finance'
  | 'Budget'
  | 'Vision'
  | 'Planning'
  | 'Household'
  | 'Work'
  | 'Travel';

export interface ToDoItem {
  id: string;
  text: string;
  completed: boolean;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
}

export interface PlacedSticker {
  id: string;
  stickerId: string;
  emojiOrUrl: string;
  title: string;
  x: number; // percentage or px
  y: number;
  scale: number;
  rotation: number;
  pageSide: 'left' | 'right';
}

export interface StickerDefinition {
  id: string;
  category: string;
  title: string;
  icon: string;
  type: 'emoji' | 'badge' | 'washi' | 'sticky' | 'tag';
  color?: string;
  textColor?: string;
}

export interface SmartEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // "09:00 AM"
  endTime: string; // "10:30 AM"
  hour: number;
  category: 'work' | 'personal' | 'wellness' | 'meal' | 'break';
  notes?: string;
  reminderMinutes?: number;
  calendarType?: 'apple' | 'google' | 'local';
}

export interface Habit {
  id: string;
  name: string;
  days: boolean[];
  category?: string;
}

export interface Expense {
  id: string;
  item: string;
  amount: number;
  category: string;
  date?: string;
}

export interface MealHydration {
  waterGlasses: number; // 0 to 8
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
}

export interface MoodSleep {
  mood: 'great' | 'good' | 'neutral' | 'down' | 'stressed' | null;
  sleepHours: number;
  sleepQuality: number; // 1 to 5
  notes?: string;
}

export interface CustomSection {
  id: number; // 1 to 10
  title: string;
  content: string;
  tags: string[];
  lastModified: string;
}
