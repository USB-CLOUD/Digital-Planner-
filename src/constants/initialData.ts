import {
  Habit,
  Expense,
  ToDoItem,
  SmartEvent,
  MealHydration,
  MoodSleep,
  CustomSection,
  StickerDefinition,
} from '../types/planner';

export const INITIAL_HABITS: Habit[] = [
  { id: 'h1', name: 'Morning Meditation (10m)', days: [true, true, true, true, false, true, true], category: 'Wellness' },
  { id: 'h2', name: 'Drink 2.5L Water', days: [true, true, true, false, true, true, true], category: 'Health' },
  { id: 'h3', name: '30-Minute Movement / Gym', days: [true, false, true, true, false, true, false], category: 'Fitness' },
  { id: 'h4', name: 'Deep Work Block (No Phone)', days: [true, true, true, true, true, false, false], category: 'Productivity' },
  { id: 'h5', name: 'Read 15 Pages of Book', days: [true, true, false, true, true, true, true], category: 'Growth' },
  { id: 'h6', name: 'Skincare & 10:30 PM Sleep', days: [false, true, true, true, false, true, false], category: 'Self-Care' },
];

export const INITIAL_TODOS: ToDoItem[] = [
  { id: 'td1', text: 'Review quarterly client presentation & finalize slides', completed: true, priority: 'high', category: 'Work' },
  { id: 'td2', text: 'Confirm reservation for anniversary dinner', completed: false, priority: 'medium', category: 'Personal' },
  { id: 'td3', text: 'Submit monthly expense reconciliation', completed: false, priority: 'high', category: 'Finance' },
  { id: 'td4', text: 'Prep healthy meal boxes for the next 3 days', completed: true, priority: 'medium', category: 'Self-Care' },
  { id: 'td5', text: 'Order replacement organic matcha & honey', completed: false, priority: 'low', category: 'Household' },
  { id: 'td6', text: 'Call Mom & wish happy birthday', completed: false, priority: 'high', category: 'Personal' },
];

export const INITIAL_EXPENSES: Expense[] = [
  { id: 'e1', item: 'Oat Milk Latte & Croissant', amount: 8.50, category: 'Food & Dining', date: 'Today' },
  { id: 'e2', item: 'Subway Metro Pass (Weekly)', amount: 24.00, category: 'Transit', date: 'Today' },
  { id: 'e3', item: 'Paper & Fountain Pen Ink', amount: 15.20, category: 'Stationery', date: 'Today' },
  { id: 'e4', item: 'Organic Produce Market', amount: 38.65, category: 'Groceries', date: 'Today' },
];

export const INITIAL_EVENTS: SmartEvent[] = [
  { id: 'ev1', hour: 8, title: 'Gentle Yoga & Green Tea', startTime: '08:00 AM', endTime: '08:45 AM', category: 'wellness', date: '2026-10-24' },
  { id: 'ev2', hour: 9, title: 'Deep Work: Product Architecture', startTime: '09:00 AM', endTime: '11:00 AM', category: 'work', date: '2026-10-24', notes: 'Design tablet binder layouts' },
  { id: 'ev3', hour: 11, title: 'Weekly Alignment Sync with Team', startTime: '11:30 AM', endTime: '12:15 PM', category: 'work', date: '2026-10-24' },
  { id: 'ev4', hour: 13, title: 'Nourishing Lunch & 15m Sun Walk', startTime: '01:00 PM', endTime: '02:00 PM', category: 'meal', date: '2026-10-24' },
  { id: 'ev5', hour: 15, title: 'Review Client Deliverables & Feedback', startTime: '03:00 PM', endTime: '04:15 PM', category: 'work', date: '2026-10-24' },
  { id: 'ev6', hour: 18, title: 'Pilates Reformer Class', startTime: '06:00 PM', endTime: '07:00 PM', category: 'wellness', date: '2026-10-24' },
];

export const INITIAL_MEALS_HYDRATION: MealHydration = {
  waterGlasses: 5,
  breakfast: 'Chia seed pudding with fresh blueberries, almond butter & honey',
  lunch: 'Warm quinoa bowl with roasted sweet potato, kale, avocado & tahini',
  dinner: 'Pan-seared wild salmon, steamed broccolini & wild rice',
  snacks: 'Dark chocolate 85%, walnuts, chamomile herbal infusion',
};

export const INITIAL_MOOD_SLEEP: MoodSleep = {
  mood: 'great',
  sleepHours: 7.5,
  sleepQuality: 4,
  notes: 'Woke up feeling deeply refreshed, early sunlight exposure made a big difference.',
};

export const INITIAL_CUSTOM_SECTIONS: CustomSection[] = [
  { id: 1, title: 'Daily Gratitude', content: '1. The morning sunlight through the window\n2. Delicious steaming cup of warm coffee\n3. Meaningful progress on creative software projects', tags: ['Gratitude', 'Mindset'], lastModified: 'Today' },
  { id: 2, title: 'Brain Dump & Ideas', content: '- Build skeuomorphic paper digital planner with 3D spiral rings\n- Add vintage washi tapes and pastel highlighters\n- Explore sound effects for turning pages and checking to-dos\n- Integrate AI prompt for smart daily time-blocking', tags: ['Ideation', 'Projects'], lastModified: 'Yesterday' },
  { id: 3, title: 'Book Summaries', content: 'Atomic Habits by James Clear:\n- Make it obvious, attractive, easy, satisfying\n- Habit stacking: After [CURRENT HABIT], I will [NEW HABIT]\n- Focus on identity change rather than outcome goals', tags: ['Reading', 'Growth'], lastModified: 'Oct 20' },
  { id: 4, title: 'Meeting Notes', content: 'Project Phoenix Kickoff:\n- Deliver MVP tablet binder interface by Friday\n- Ensure WCAG AA contrast on tab text and labels\n- Implement smooth stylus canvas handwriting layer', tags: ['Work', 'Clients'], lastModified: 'Oct 22' },
  { id: 5, title: 'Recipe Vault', content: 'Creamy Lemon Zest Rigatoni:\n- 250g bronze-die rigatoni\n- 2 organic unwaxed lemons (zest + juice)\n- 150ml double cream or cashew cream\n- Freshly cracked black pepper, parmesan, toasted pine nuts', tags: ['Cooking', 'Food'], lastModified: 'Oct 18' },
  { id: 6, title: 'Skincare Routine', content: 'AM:\n1. Gentle hydrating cleanser\n2. Vitamin C serum\n3. Barrier cream\n4. SPF 50 Mineral sunscreen\n\nPM:\n1. Squalane oil cleanse\n2. Gentle peptide serum\n3. Ceramide night moisturizer', tags: ['Self-Care', 'Health'], lastModified: 'Oct 15' },
  { id: 7, title: 'Fitness Log', content: 'Monday: Lower Body Strength (Squats 4x8, Romanian Deadlifts 4x10)\nWednesday: Upper Body Push/Pull (Overhead Press, Dumbbell Rows)\nFriday: Core & Mobility Flow\nSaturday: Long nature trail walk 8km', tags: ['Fitness', 'Workout'], lastModified: 'Oct 21' },
  { id: 8, title: 'Wishlist & Buy Later', content: '- Ergonomic mechanical split keyboard\n- Ceramic Japanese matcha bowl (chawan)\n- Brass ruler and fountain pen ink cartridge in sage green\n- Linen bed duvet cover', tags: ['Shopping', 'Lifestyle'], lastModified: 'Oct 19' },
  { id: 9, title: 'Finance Checkpoints', content: '- Emergency fund reached 6 months of expenses\n- Auto-transfer $400 to index fund ETF on 1st of month\n- Review annual subscriptions before renewal date', tags: ['Budget', 'Wealth'], lastModified: 'Oct 14' },
  { id: 10, title: 'Yearly Bucket List', content: '- Learn conversational Italian basics\n- Take pottery wheel throwing weekend workshop\n- Hike the Dolomites high route trail\n- Host a summer outdoor dinner party with handmade pasta', tags: ['Dreams', 'Bucket List'], lastModified: 'Oct 12' },
];

export const STICKER_LIBRARY: StickerDefinition[] = [
  // Productivity & Badges
  { id: 'st1', category: 'Productivity', title: 'Top Priority', icon: '⭐ PRIORITY', type: 'badge', color: '#FEF08A', textColor: '#854D0E' },
  { id: 'st2', category: 'Productivity', title: 'Done Check', icon: '✅ COMPLETED', type: 'badge', color: '#BBF7D0', textColor: '#166534' },
  { id: 'st3', category: 'Productivity', title: 'Urgent', icon: '🔥 URGENT', type: 'badge', color: '#FECDD3', textColor: '#9F1239' },
  { id: 'st4', category: 'Productivity', title: 'Deep Work', icon: '🧠 DEEP WORK', type: 'badge', color: '#DDD6FE', textColor: '#5B21B6' },
  { id: 'st5', category: 'Productivity', title: 'Meeting', icon: '📅 MEETING', type: 'badge', color: '#BAE6FD', textColor: '#075985' },
  { id: 'st6', category: 'Productivity', title: 'Deadline', icon: '⏰ DUE TODAY', type: 'badge', color: '#FED7AA', textColor: '#9A3412' },
  { id: 'st7', category: 'Productivity', title: 'Goal Hit', icon: '🎯 TARGET HIT', type: 'badge', color: '#C7D2FE', textColor: '#3730A3' },
  { id: 'st8', category: 'Productivity', title: 'Review', icon: '🔍 IN REVIEW', type: 'badge', color: '#E2E8F0', textColor: '#334155' },

  // Washi Tapes
  { id: 'wt1', category: 'Washi Tape', title: 'Pastel Rainbow', icon: '═════════', type: 'washi', color: 'linear-gradient(90deg, #fbcfe8, #fed7aa, #fef08a, #bbf7d0, #bae6fd, #ddd6fe)' },
  { id: 'wt2', category: 'Washi Tape', title: 'Boho Terracotta', icon: '─────────', type: 'washi', color: 'linear-gradient(90deg, #c2410c, #ea580c, #f97316, #fb923c)' },
  { id: 'wt3', category: 'Washi Tape', title: 'Sage Botanical', icon: '─────────', type: 'washi', color: 'linear-gradient(90deg, #84cc16, #65a30d, #4d7c0f)' },
  { id: 'wt4', category: 'Washi Tape', title: 'Gold Shimmer', icon: '═════════', type: 'washi', color: 'linear-gradient(90deg, #ca8a04, #eab308, #facc15, #ca8a04)' },
  { id: 'wt5', category: 'Washi Tape', title: 'Lavender Mist', icon: '─────────', type: 'washi', color: 'linear-gradient(90deg, #c084fc, #a855f7, #9333ea)' },
  { id: 'wt6', category: 'Washi Tape', title: 'Vintage Grid', icon: '┼┼┼┼┼┼┼┼┼', type: 'washi', color: '#f1f5f9', textColor: '#64748b' },

  // Sticky Notes
  { id: 'sn1', category: 'Sticky Notes', title: 'Yellow Note', icon: '📝 Quick Thought', type: 'sticky', color: '#fef08a', textColor: '#713f12' },
  { id: 'sn2', category: 'Sticky Notes', title: 'Pink Note', icon: '💡 Remember This', type: 'sticky', color: '#fbcfe8', textColor: '#831843' },
  { id: 'sn3', category: 'Sticky Notes', title: 'Green Note', icon: '🌿 Affirmation', type: 'sticky', color: '#bbf7d0', textColor: '#14532d' },
  { id: 'sn4', category: 'Sticky Notes', title: 'Blue Note', icon: '🌊 Weekly Spark', type: 'sticky', color: '#bae6fd', textColor: '#0c4a6e' },
  { id: 'sn5', category: 'Sticky Notes', title: 'Peach Note', icon: '🍑 Don\'t Forget', type: 'sticky', color: '#fed7aa', textColor: '#7c2d12' },

  // Cute Emojis & Doodles
  { id: 'em1', category: 'Cute Doodles', title: 'Sparkles', icon: '✨', type: 'emoji' },
  { id: 'em2', category: 'Cute Doodles', title: 'Coffee Cup', icon: '☕', type: 'emoji' },
  { id: 'em3', category: 'Cute Doodles', title: 'Potted Plant', icon: '🪴', type: 'emoji' },
  { id: 'em4', category: 'Cute Doodles', title: 'Matcha Bowl', icon: '🍵', type: 'emoji' },
  { id: 'em5', category: 'Cute Doodles', title: 'Open Book', icon: '📖', type: 'emoji' },
  { id: 'em6', category: 'Cute Doodles', title: 'Fountain Pen', icon: '✒️', type: 'emoji' },
  { id: 'em7', category: 'Cute Doodles', title: 'Art Palette', icon: '🎨', type: 'emoji' },
  { id: 'em8', category: 'Cute Doodles', title: 'Sunflower', icon: '🌻', type: 'emoji' },
  { id: 'em9', category: 'Cute Doodles', title: 'Heart Glow', icon: '💖', type: 'emoji' },
  { id: 'em10', category: 'Cute Doodles', title: 'Cat Nap', icon: '🐱', type: 'emoji' },
  { id: 'em11', category: 'Cute Doodles', title: 'Avocado', icon: '🥑', type: 'emoji' },
  { id: 'em12', category: 'Cute Doodles', title: 'Bicycle', icon: '🚲', type: 'emoji' },
  { id: 'em13', category: 'Cute Doodles', title: 'Water Bottle', icon: '💧', type: 'emoji' },
  { id: 'em14', category: 'Cute Doodles', title: 'Moon & Stars', icon: '🌙', type: 'emoji' },
  { id: 'em15', category: 'Cute Doodles', title: 'Headphones', icon: '🎧', type: 'emoji' },
  { id: 'em16', category: 'Cute Doodles', title: 'Meditation', icon: '🧘', type: 'emoji' },

  // Weather & Mood
  { id: 'wm1', category: 'Weather & Mood', title: 'Sunny Sky', icon: '☀️ Sunny', type: 'badge', color: '#FEF9C3', textColor: '#A16207' },
  { id: 'wm2', category: 'Weather & Mood', title: 'Cozy Rain', icon: '🌧️ Rainy', type: 'badge', color: '#E0F2FE', textColor: '#0369A1' },
  { id: 'wm3', category: 'Weather & Mood', title: 'Cloudy Calm', icon: '⛅ Partly Cloudy', type: 'badge', color: '#F1F5F9', textColor: '#475569' },
  { id: 'wm4', category: 'Weather & Mood', title: 'Gentle Breeze', icon: '🍃 Breezy', type: 'badge', color: '#DCFCE7', textColor: '#15803D' },
  { id: 'wm5', category: 'Weather & Mood', title: 'Grateful Mind', icon: '🙏 Grateful', type: 'badge', color: '#EDE9FE', textColor: '#6D28D9' },
  { id: 'wm6', category: 'Weather & Mood', title: 'High Energy', icon: '⚡ Energized', type: 'badge', color: '#FFEDD5', textColor: '#C2410C' },

  // Fitness & Meals
  { id: 'fm1', category: 'Fitness & Food', title: 'Workout Done', icon: '💪 WORKOUT', type: 'badge', color: '#CCFBF1', textColor: '#115E59' },
  { id: 'fm2', category: 'Fitness & Food', title: 'Clean Eating', icon: '🥗 CLEAN MEAL', type: 'badge', color: '#DCFCE7', textColor: '#166534' },
  { id: 'fm3', category: 'Fitness & Food', title: '10K Steps', icon: '👟 10,000 STEPS', type: 'badge', color: '#E0E7FF', textColor: '#3730A3' },
  { id: 'fm4', category: 'Fitness & Food', title: 'Hydrated', icon: '💧 8 GLASSES', type: 'badge', color: '#DBEAFE', textColor: '#1E40AF' },
];

export const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const CATEGORY_NAMES = [
  'Personal', 'Self-Care', 'Education', 'Finance', 'Budget',
  'Vision', 'Planning', 'Household', 'Work', 'Travel',
] as const;
