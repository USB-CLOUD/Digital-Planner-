import React from 'react';
import { Tag, Clock, Edit2 } from 'lucide-react';
import { CustomSection } from '../../types/planner';
import { ThemeConfig } from '../../styles/themes';

interface CustomSectionPageProps {
  section: CustomSection;
  onUpdateSection: (updated: CustomSection) => void;
  theme: ThemeConfig;
}

export const CustomSectionPage: React.FC<CustomSectionPageProps> = ({
  section,
  onUpdateSection,
  theme,
}) => {
  return (
    <div className="w-full h-full p-6 md:p-8 flex flex-col text-stone-800 overflow-y-auto">
      {/* Header with editable Section Number & Title */}
      <div className="border-b border-stone-200/80 pb-4 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 mr-4">
          <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-800 font-extrabold text-base flex items-center justify-center shrink-0 shadow-xs border border-stone-300">
            {section.id}
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={section.title}
              onChange={(e) => onUpdateSection({ ...section, title: e.target.value, lastModified: 'Just now' })}
              className="text-xl md:text-2xl font-bold tracking-tight bg-transparent border-b border-transparent hover:border-stone-300 focus:border-stone-500 focus:outline-none w-full"
              placeholder="Section Name..."
            />
            <div className="flex items-center gap-3 text-xs text-stone-400 mt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Modified: {section.lastModified}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {section.tags.join(', ')}
              </span>
            </div>
          </div>
        </div>

        <span className="text-[11px] font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200 shrink-0">
          Left Tab {section.id}
        </span>
      </div>

      {/* Main Content Area (Paper lines) */}
      <div className="flex-1 rounded-xl bg-paper-lines p-5 border border-stone-200/60 shadow-xs flex flex-col bg-white">
        <textarea
          value={section.content}
          onChange={(e) => onUpdateSection({ ...section, content: e.target.value, lastModified: 'Just now' })}
          className="w-full flex-1 bg-transparent border-none focus:outline-none text-base md:text-lg font-handwriting font-bold leading-[28px] resize-none text-stone-900"
          placeholder="Start writing or brainstorming in this custom notebook tab..."
        />
      </div>
    </div>
  );
};
