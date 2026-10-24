import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  BookOpen,
  DollarSign,
  Compass,
  Calendar,
  Home,
  Briefcase,
  Plane,
  Plus,
  Trash2,
  Check,
  Target,
} from 'lucide-react';
import { CategoryType } from '../../types/planner';
import { ThemeConfig } from '../../styles/themes';

interface CategoryPageProps {
  category: CategoryType;
  theme: ThemeConfig;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, theme }) => {
  // Vision Board items
  const [visionCards, setVisionCards] = useState([
    { id: '1', title: 'Serene Modern Studio', subtitle: 'Sunlit wooden desk with mechanical keyboard, books, and green fiddle leaf fig.' },
    { id: '2', title: 'Flourishing Health & Vitality', subtitle: 'Trail running in the mountains, nutrient-dense home cooking, and restorative sleep.' },
    { id: '3', title: 'Creative Freedom & Flow', subtitle: 'Shipping software products that delight millions with tactile warmth and precision.' },
    { id: '4', title: 'Global Adventures & Culture', subtitle: 'Wandering cobblestone alleys of Florence and Kyoto with a sketchbook in hand.' },
  ]);
  const [newVisionTitle, setNewVisionTitle] = useState('');

  // Travel packing list
  const [travelItems, setTravelItems] = useState([
    { id: 't1', text: 'Passport & International Travel Insurance', packed: true },
    { id: 't2', text: 'Tablet with Digital Planner & Stylus Pen', packed: true },
    { id: 't3', text: 'Noise-canceling headphones & charging cables', packed: false },
    { id: 't4', text: 'Minimalist merino wool capsule wardrobe', packed: false },
    { id: 't5', text: 'Comfortable trail walking sneakers', packed: true },
    { id: 't6', text: 'Travel size skincare & sunscreen SPF 50', packed: false },
  ]);
  const [newTravelItem, setNewTravelItem] = useState('');

  // Self-Care Checklist
  const [selfCareItems, setSelfCareItems] = useState([
    { id: 'sc1', text: '10 minutes of morning sunlight before screen exposure', done: true },
    { id: 'sc2', text: 'Deep breathing box exercise during work transitions', done: true },
    { id: 'sc3', text: 'Warm epsom salt bath with lavender essential oil', done: false },
    { id: 'sc4', text: 'Writing 3 heartfelt gratitudes in physical binder', done: true },
    { id: 'sc5', text: 'No work communications past 8:00 PM', done: false },
  ]);
  const [newSelfCareItem, setNewSelfCareItem] = useState('');

  // General notes state for categories
  const [categoryNotes, setCategoryNotes] = useState(
    `Notes & Strategy for ${category}:\n\n` +
    `• Keep objectives aligned with long-term core values.\n` +
    `• Regular weekly review ensures continuous steady momentum.\n` +
    `• Celebrate small incremental milestones along the way.`
  );

  const getCategoryIcon = () => {
    switch (category) {
      case 'Vision': return Compass;
      case 'Self-Care': return Sparkles;
      case 'Travel': return Plane;
      case 'Personal': return Heart;
      case 'Education': return BookOpen;
      case 'Finance': return DollarSign;
      case 'Budget': return Target;
      case 'Planning': return Calendar;
      case 'Household': return Home;
      case 'Work': return Briefcase;
      default: return Heart;
    }
  };

  const Icon = getCategoryIcon();

  const handleAddVision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisionTitle.trim()) return;
    setVisionCards([
      ...visionCards,
      { id: Date.now().toString(), title: newVisionTitle.trim(), subtitle: 'Personal vision affirmation and target goal.' },
    ]);
    setNewVisionTitle('');
  };

  const handleAddTravel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTravelItem.trim()) return;
    setTravelItems([...travelItems, { id: Date.now().toString(), text: newTravelItem.trim(), packed: false }]);
    setNewTravelItem('');
  };

  const handleAddSelfCare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSelfCareItem.trim()) return;
    setSelfCareItems([...selfCareItems, { id: Date.now().toString(), text: newSelfCareItem.trim(), done: false }]);
    setNewSelfCareItem('');
  };

  return (
    <div className="w-full h-full p-6 md:p-8 flex flex-col text-stone-800 overflow-y-auto">
      {/* Category Header */}
      <div className="border-b border-stone-200/80 pb-4 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              {category} Workspace
            </h1>
            <p className="text-xs text-stone-500">Dedicated life category dashboard & action plans</p>
          </div>
        </div>
        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
          Category Tab
        </span>
      </div>

      {/* Special View for Vision Board */}
      {category === 'Vision' && (
        <div className="flex-1 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Inspirational Vision Pinboard
            </h2>
            <form onSubmit={handleAddVision} className="flex items-center gap-1.5">
              <input
                type="text"
                value={newVisionTitle}
                onChange={(e) => setNewVisionTitle(e.target.value)}
                placeholder="New vision aspiration..."
                className="bg-white border border-stone-200 rounded px-2.5 py-1 text-xs"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-amber-600 text-white rounded text-xs font-semibold hover:bg-amber-700 transition"
              >
                Add Card
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {visionCards.map((card, i) => (
              <div
                key={card.id}
                className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition relative group"
              >
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-400 border border-red-500 shadow-xs" title="Pushpin" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                    Vision Card {i + 1}
                  </span>
                  <h3 className="font-handwriting text-2xl font-bold text-stone-900 mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{card.subtitle}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-amber-700 font-semibold">
                  <span>Affirmation Active</span>
                  <button
                    onClick={() => setVisionCards(visionCards.filter((c) => c.id !== card.id))}
                    className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special View for Travel */}
      {category === 'Travel' && (
        <div className="flex-1 flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-stone-50/70 p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col">
            <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-sky-600" />
              Packing & Luggage Checklist
            </h3>
            <div className="space-y-1.5 flex-1 overflow-y-auto mb-3">
              {travelItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2 bg-white rounded border border-stone-200"
                >
                  <button
                    onClick={() =>
                      setTravelItems(
                        travelItems.map((t) =>
                          t.id === item.id ? { ...t, packed: !t.packed } : t
                        )
                      )
                    }
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      item.packed ? 'bg-sky-600 border-sky-600 text-white' : 'border-stone-300'
                    }`}
                  >
                    {item.packed && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                  <span
                    className={`text-xs ${
                      item.packed ? 'line-through text-stone-400' : 'text-stone-800'
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddTravel} className="flex gap-1.5">
              <input
                type="text"
                value={newTravelItem}
                onChange={(e) => setNewTravelItem(e.target.value)}
                placeholder="Add item to pack..."
                className="flex-1 bg-white border border-stone-200 rounded px-2 py-1 text-xs"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-stone-800 text-white rounded text-xs font-semibold"
              >
                Add
              </button>
            </form>
          </div>

          <div className="flex-1 bg-stone-50/70 p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col">
            <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
              Upcoming Trip Itinerary
            </h3>
            <textarea
              defaultValue={
                "Next Destination: Amalfi Coast & Rome, Italy\n\n" +
                "Day 1: Arrival in Rome Fiumicino, check in to Trastevere boutique hotel, evening carbonara\n" +
                "Day 2: Morning visit to Colosseum & Roman Forum, afternoon gelato, sunset at Pincio Terrace\n" +
                "Day 3: High speed train to Naples, ferry to Positano, coastal cliffside hike\n" +
                "Day 4: Lemon grove tour, boat charter around Capri\n" +
                "Day 5: Rest & watercolor sketching on the beach"
              }
              rows={8}
              className="flex-1 p-3 bg-white border border-stone-200 rounded text-xs font-handwriting text-base font-bold text-stone-900 leading-relaxed resize-none focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Special View for Self-Care */}
      {category === 'Self-Care' && (
        <div className="flex-1 flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-stone-50/70 p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col">
            <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              Nourishing Self-Care Habits
            </h3>
            <div className="space-y-1.5 flex-1 overflow-y-auto mb-3">
              {selfCareItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2 bg-white rounded border border-stone-200"
                >
                  <button
                    onClick={() =>
                      setSelfCareItems(
                        selfCareItems.map((t) =>
                          t.id === item.id ? { ...t, done: !t.done } : t
                        )
                      )
                    }
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      item.done ? 'bg-pink-600 border-pink-600 text-white' : 'border-stone-300'
                    }`}
                  >
                    {item.done && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                  <span
                    className={`text-xs ${
                      item.done ? 'line-through text-stone-400' : 'text-stone-800'
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddSelfCare} className="flex gap-1.5">
              <input
                type="text"
                value={newSelfCareItem}
                onChange={(e) => setNewSelfCareItem(e.target.value)}
                placeholder="Add daily self-care gesture..."
                className="flex-1 bg-white border border-stone-200 rounded px-2 py-1 text-xs"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-stone-800 text-white rounded text-xs font-semibold"
              >
                Add
              </button>
            </form>
          </div>

          <div className="flex-1 bg-stone-50/70 p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col">
            <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
              Mindfulness & Energy Journal
            </h3>
            <textarea
              defaultValue={
                "Daily Wellness Check-In:\n\n" +
                "Energy level: 8/10\n" +
                "Physical feeling: Light and calm after morning stretching\n" +
                "Mindset affirmation: 'I move through my work with patient confidence and grace.'\n\n" +
                "Evening reset ritual:\n" +
                "- 15m chamomile tea in dim warm light\n" +
                "- No social media 1 hour prior to sleep\n" +
                "- Diffuse lavender & bergamot essential oils"
              }
              rows={8}
              className="flex-1 p-3 bg-white border border-stone-200 rounded text-xs font-handwriting text-base font-bold text-stone-900 leading-relaxed resize-none focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Default view for other categories (Personal, Education, Finance, Budget, Planning, Household, Work) */}
      {category !== 'Vision' && category !== 'Travel' && category !== 'Self-Care' && (
        <div className="flex-1 flex flex-col space-y-4">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex-1 flex flex-col shadow-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
              {category} Action Tracker & Notes
            </h3>
            <textarea
              value={categoryNotes}
              onChange={(e) => setCategoryNotes(e.target.value)}
              className="w-full flex-1 p-3 bg-white border border-stone-200 rounded-lg text-base font-handwriting font-bold leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};
