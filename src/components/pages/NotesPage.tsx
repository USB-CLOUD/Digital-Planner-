import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Grid, FileText, Table as TableIcon, Activity } from 'lucide-react';
import { ActivePageType } from '../../types/planner';
import { ThemeConfig } from '../../styles/themes';

interface NotesPageProps {
  type: 'note-line' | 'note-grid' | 'note-table' | 'note-graph' | 'overview' | 'quarterly';
  theme: ThemeConfig;
}

interface TableRow {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}

export const NotesPage: React.FC<NotesPageProps> = ({ type, theme }) => {
  // Line template state
  const [lineTitle, setLineTitle] = useState('Deep Ideation & Project Reflections');
  const [lineContent, setLineContent] = useState(
    '1. Focus on building enduring digital products with tangible sensory warmth.\n' +
    '2. Skeuomorphism done right bridges digital convenience with the reassuring tactile familiarity of real stationery.\n' +
    '3. Keep daily priority counts low (1 to 3 items maximum) to guarantee exceptional execution quality.\n' +
    '4. Evening routine: screen shutdown at 9:30 PM, chamomile tea, handwritten reflection in paper binder.'
  );

  // Dot Grid state
  const [gridTitle, setGridTitle] = useState('Bullet Journal Dot Grid');
  const [gridNotes, setGridNotes] = useState(
    '• [X] Sprint kickoff meeting\n• [X] Refine binder 3D rings and metallic highlights\n• [ ] Design custom washi tape palettes\n• [ ] Test stylus handwriting canvas tool\n\nNotes & Thoughts:\n- Creative momentum is highest before lunch.\n- Take a 15-minute screen break every 90 minutes.'
  );

  // Table template state
  const [tableHeaders, setTableHeaders] = useState(['Project / Deliverable', 'Owner', 'Status', 'Target Date']);
  const [tableRows, setTableRows] = useState<TableRow[]>([
    { id: '1', col1: 'Digital Planner Tablet App', col2: 'Design Lead', col3: 'Active In-Progress', col4: 'Oct 25' },
    { id: '2', col1: 'Annotation Canvas Layer', col2: 'Frontend Dev', col3: 'Completed', col4: 'Oct 23' },
    { id: '3', col1: 'Sticker Library 5000+ Catalog', col2: 'Art Team', col3: 'Completed', col4: 'Oct 24' },
    { id: '4', col1: 'Gemini Schedule Optimizer', col2: 'AI Engineer', col3: 'Verified', col4: 'Oct 24' },
  ]);

  // Graph template state
  const [graphTitle, setGraphTitle] = useState('Coordinate Graph & Charting');
  const [graphNotes, setGraphNotes] = useState(
    'Weekly Productivity vs Energy Flow Analysis:\n\n' +
    'Y-Axis: Creative Focus (1 - 10)\n' +
    'X-Axis: Days of Week (Mon - Sun)\n\n' +
    'Peak performance observed on Tuesday and Thursday mornings (Energy 9.5).\n' +
    'Optimal recovery dip on Sunday afternoon.'
  );

  const handleAddTableRow = () => {
    setTableRows([
      ...tableRows,
      {
        id: Date.now().toString(),
        col1: 'New Milestone Item',
        col2: 'Self',
        col3: 'Planned',
        col4: 'Upcoming',
      },
    ]);
  };

  const handleUpdateTableRow = (id: string, col: keyof TableRow, val: string) => {
    setTableRows(tableRows.map((r) => (r.id === id ? { ...r, [col]: val } : r)));
  };

  const handleRemoveTableRow = (id: string) => {
    setTableRows(tableRows.filter((r) => r.id !== id));
  };

  if (type === 'note-line') {
    return (
      <div className="w-full h-full p-6 md:p-8 flex flex-col text-stone-800">
        <div className="border-b-2 border-rose-300/60 pb-3 mb-4 flex items-center justify-between">
          <input
            type="text"
            value={lineTitle}
            onChange={(e) => setLineTitle(e.target.value)}
            className="text-xl md:text-2xl font-bold font-sans bg-transparent border-none focus:outline-none w-full"
            placeholder="Notes Title..."
          />
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest shrink-0">
            Lined Template
          </span>
        </div>

        <div className="flex-1 rounded-xl bg-paper-lines p-4 border border-stone-200/60 shadow-xs flex flex-col">
          <textarea
            value={lineContent}
            onChange={(e) => setLineContent(e.target.value)}
            className="w-full flex-1 bg-transparent border-none focus:outline-none text-base md:text-lg font-handwriting font-bold leading-[28px] resize-none text-stone-900"
            placeholder="Write handwritten notes on ruled lines..."
          />
        </div>
      </div>
    );
  }

  if (type === 'note-grid') {
    return (
      <div className="w-full h-full p-6 md:p-8 flex flex-col text-stone-800">
        <div className="border-b border-stone-200/80 pb-3 mb-4 flex items-center justify-between">
          <input
            type="text"
            value={gridTitle}
            onChange={(e) => setGridTitle(e.target.value)}
            className="text-xl md:text-2xl font-bold font-sans bg-transparent border-none focus:outline-none w-full"
            placeholder="Dot Grid Title..."
          />
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest shrink-0">
            5mm Dot Grid
          </span>
        </div>

        <div className="flex-1 rounded-xl bg-paper-dots p-6 border border-stone-200/60 shadow-xs flex flex-col bg-white">
          <textarea
            value={gridNotes}
            onChange={(e) => setGridNotes(e.target.value)}
            className="w-full flex-1 bg-transparent border-none focus:outline-none text-sm md:text-base font-handwriting font-bold leading-relaxed resize-none text-stone-900"
            placeholder="Bullet journal rapid logging, diagrams, and checklist..."
          />
        </div>
      </div>
    );
  }

  if (type === 'note-table') {
    return (
      <div className="w-full h-full p-6 md:p-8 flex flex-col text-stone-800">
        <div className="border-b border-stone-200/80 pb-3 mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Structured Data Table</h2>
            <span className="text-xs text-stone-500">Customizable spreadsheet matrix template</span>
          </div>
          <button
            onClick={handleAddTableRow}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 text-white rounded-lg text-xs font-semibold hover:bg-stone-700 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>
        </div>

        <div className="flex-1 border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200 font-bold text-stone-700">
                  {tableHeaders.map((hdr, hIdx) => (
                    <th key={hIdx} className="p-3">
                      <input
                        type="text"
                        value={hdr}
                        onChange={(e) => {
                          const updated = [...tableHeaders];
                          updated[hIdx] = e.target.value;
                          setTableHeaders(updated);
                        }}
                        className="font-bold bg-transparent border-b border-transparent hover:border-stone-400 focus:outline-none text-xs w-full"
                      />
                    </th>
                  ))}
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {tableRows.map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50/80 group">
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={row.col1}
                        onChange={(e) => handleUpdateTableRow(row.id, 'col1', e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none font-medium"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={row.col2}
                        onChange={(e) => handleUpdateTableRow(row.id, 'col2', e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none text-stone-600"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={row.col3}
                        onChange={(e) => handleUpdateTableRow(row.id, 'col3', e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none text-stone-600"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={row.col4}
                        onChange={(e) => handleUpdateTableRow(row.id, 'col4', e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none text-stone-600 font-tabular"
                      />
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => handleRemoveTableRow(row.id)}
                        className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'note-graph') {
    return (
      <div className="w-full h-full p-6 md:p-8 flex flex-col text-stone-800">
        <div className="border-b border-stone-200/80 pb-3 mb-4 flex items-center justify-between">
          <input
            type="text"
            value={graphTitle}
            onChange={(e) => setGraphTitle(e.target.value)}
            className="text-xl md:text-2xl font-bold font-sans bg-transparent border-none focus:outline-none w-full"
            placeholder="Graph Title..."
          />
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest shrink-0">
            Graph / Plot Paper
          </span>
        </div>

        <div className="flex-1 rounded-xl bg-paper-grid p-6 border border-stone-200/60 shadow-xs flex flex-col bg-white">
          <textarea
            value={graphNotes}
            onChange={(e) => setGraphNotes(e.target.value)}
            className="w-full flex-1 bg-transparent border-none focus:outline-none text-sm md:text-base font-handwriting font-bold leading-relaxed resize-none text-stone-900"
            placeholder="Coordinate plotting notes, data trends, and architectural sketches..."
          />
        </div>
      </div>
    );
  }

  // Overview / Quarterly
  return (
    <div className="w-full h-full p-6 md:p-8 flex flex-col text-stone-800 overflow-y-auto">
      <div className="border-b border-stone-200/80 pb-3 mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            {type === 'quarterly' ? 'Quarterly Execution Matrix (Q1–Q4)' : 'Annual Life Overview & Vision'}
          </h2>
          <span className="text-xs text-stone-500">Long-term strategic roadmap and high-level milestones</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {['Q1: Foundation & Habits', 'Q2: Expansion & Velocity', 'Q3: High Impact & Scale', 'Q4: Harvest & Reflection'].map(
          (quarter, qIdx) => (
            <div key={qIdx} className="p-4 bg-stone-50 rounded-xl border border-stone-200 shadow-xs flex flex-col">
              <span className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
                {quarter}
              </span>
              <textarea
                defaultValue={
                  qIdx === 0
                    ? '• Launch tablet digital planner with skeuomorphic binder design\n• Solidify morning meditation & workout streak\n• Build automated budget tracking system'
                    : qIdx === 1
                    ? '• Advance professional mastery in modern web architecture\n• Plan summer hiking trail trip\n• Expand personal investment savings'
                    : qIdx === 2
                    ? '• Deep creative retreat & book writing\n• Host culinary workshop for friends\n• Evaluate yearly progress checkpoints'
                    : '• Celebrate year-end milestones & reflect on growth\n• Set intentions for next annual cycle\n• Restorative winter break with loved ones'
                }
                rows={5}
                className="w-full flex-1 p-2 bg-white border border-stone-200 rounded text-sm font-handwriting font-bold resize-none focus:outline-none"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
