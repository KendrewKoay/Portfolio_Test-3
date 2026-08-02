import React from 'react';
import { LayoutGrid, Sparkles, FolderHeart, Award, MessageSquareHeart } from 'lucide-react';

export type TabType = 'notes' | 'portfolio' | 'collabs' | 'ai-assistant' | 'guestbook';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  lang: 'zh' | 'en';
  notesCount: number;
  portfolioCount: number;
  collabsCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  lang,
  notesCount,
  portfolioCount,
  collabsCount,
}) => {
  const tabs = [
    {
      id: 'notes' as TabType,
      labelZh: '爆款笔记',
      labelEn: 'RED Notes',
      icon: LayoutGrid,
      count: notesCount,
      badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-200',
    },
    {
      id: 'portfolio' as TabType,
      labelZh: '视觉作品集',
      labelEn: 'Visual Projects',
      icon: FolderHeart,
      count: portfolioCount,
      badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-200',
    },
    {
      id: 'collabs' as TabType,
      labelZh: '品牌合作刊例',
      labelEn: 'Media Kit & Collabs',
      icon: Award,
      count: collabsCount,
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
    },
    {
      id: 'ai-assistant' as TabType,
      labelZh: 'AI灵感生成器',
      labelEn: 'AI Content Assistant',
      icon: Sparkles,
      isNew: true,
      badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
    },
    {
      id: 'guestbook' as TabType,
      labelZh: '粉丝与商务留言',
      labelEn: 'Guestbook',
      icon: MessageSquareHeart,
      badgeColor: 'bg-stone-500/10 text-stone-700 border-stone-200',
    },
  ];

  return (
    <div className="sticky top-0 z-30 bg-[#faf9f6]/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between overflow-x-auto no-scrollbar py-3 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1a1a1a] text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-stone-400'}`} />
                  <span className="font-medium">{lang === 'zh' ? tab.labelZh : tab.labelEn}</span>

                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${
                        isActive
                          ? 'bg-stone-800 text-stone-200 border-stone-700'
                          : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}

                  {tab.isNew && (
                    <span className="text-[9px] uppercase tracking-widest font-extrabold px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-mono">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};
