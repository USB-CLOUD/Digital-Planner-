import React from 'react';
import { ActivePageType } from '../../types/planner';
import { ThemeConfig } from '../../styles/themes';

interface TopTabsProps {
  activePage: ActivePageType;
  onSelectPage: (page: ActivePageType) => void;
  theme: ThemeConfig;
}

interface TopTabItem {
  id: ActivePageType;
  label: string;
  icon?: string;
}

const TOP_TAB_ITEMS: TopTabItem[] = [
  { id: 'index', label: 'Index' },
  { id: 'overview', label: 'Overview' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'monthly-review', label: 'Review' },
  { id: 'note-line', label: 'Lines' },
  { id: 'note-grid', label: 'Grid' },
  { id: 'note-table', label: 'Table' },
  { id: 'note-graph', label: 'Graph' },
];

export const TopTabs: React.FC<TopTabsProps> = ({ activePage, onSelectPage, theme }) => {
  return (
    <div className="flex items-end justify-center gap-1.5 px-8 pt-2 overflow-x-auto max-w-full z-10 scrollbar-none">
      {TOP_TAB_ITEMS.map((tab, idx) => {
        const isActive = activePage === tab.id;
        const style = theme.tabStyles.top[idx % theme.tabStyles.top.length];

        return (
          <button
            key={tab.id}
            onClick={() => onSelectPage(tab.id)}
            className={`
              relative px-3.5 py-1.5 text-xs font-semibold rounded-t-lg transition-all duration-150 transform select-none whitespace-nowrap shadow-xs
              ${isActive ? `${style.activeBg} ${style.activeText} -translate-y-1 shadow-md z-20` : `${style.bg} ${style.text} hover:-translate-y-0.5 opacity-90`}
            `}
            style={{
              clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
              minWidth: '68px',
            }}
          >
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
