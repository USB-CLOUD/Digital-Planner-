import React from 'react';
import { CustomSection, ActivePageType } from '../../types/planner';
import { ThemeConfig } from '../../styles/themes';

interface LeftTabsProps {
  customSections: CustomSection[];
  activeSectionId: number;
  onSelectSection: (sectionId: number) => void;
  activePage: ActivePageType;
  theme: ThemeConfig;
}

export const LeftTabs: React.FC<LeftTabsProps> = ({
  customSections,
  activeSectionId,
  onSelectSection,
  activePage,
  theme,
}) => {
  return (
    <div className="absolute top-12 bottom-12 -left-8.5 w-8 flex flex-col justify-between py-1 z-10 pointer-events-auto">
      {customSections.map((sec, idx) => {
        const isSelected = activePage === 'custom-section' && activeSectionId === sec.id;
        const style = theme.tabStyles.left[idx % theme.tabStyles.left.length];

        return (
          <button
            key={sec.id}
            onClick={() => onSelectSection(sec.id)}
            title={`Section ${sec.id}: ${sec.title}`}
            className={`
              group relative flex items-center justify-center h-7 text-[11px] font-bold rounded-l-md transition-all duration-150 transform select-none shadow-xs
              ${isSelected
                ? `${style.activeBg} ${style.activeText} -translate-x-1.5 shadow-md z-20 w-10`
                : `${style.bg} ${style.text} hover:-translate-x-1 opacity-95 w-8`}
            `}
            style={{
              clipPath: 'polygon(15% 10%, 100% 0%, 100% 100%, 15% 90%, 0% 50%)',
            }}
          >
            <span className="text-[11px] font-extrabold pl-0.5">
              {sec.id}
            </span>
          </button>
        );
      })}
    </div>
  );
};
