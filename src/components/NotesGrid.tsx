import React, { useState, useMemo } from 'react';
import { RedNote, CreatorProfile } from '../types';
import { Heart, MessageCircle, Bookmark, Search, Flame, Sparkles, Filter, ExternalLink } from 'lucide-react';

interface NotesGridProps {
  notes: RedNote[];
  profile: CreatorProfile;
  lang: 'zh' | 'en';
  onSelectNote: (note: RedNote) => void;
  onToggleLike: (noteId: string) => void;
}

export const NotesGrid: React.FC<NotesGridProps> = ({
  notes,
  profile,
  lang,
  onSelectNote,
  onToggleLike,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyHot, setOnlyHot] = useState<boolean>(false);

  const categories = [
    { id: 'All', labelZh: '全部笔记', labelEn: 'All Notes' },
    { id: 'Lifestyle', labelZh: '美学生活', labelEn: 'Lifestyle' },
    { id: 'Visual Design', labelZh: '视觉设计', labelEn: 'Visual Design' },
    { id: 'Tech & AI', labelZh: '科技与AI', labelEn: 'Tech & AI' },
    { id: 'Fashion', labelZh: '穿搭构想', labelEn: 'Fashion' },
    { id: 'Vlog', labelZh: '日常Vlog', labelEn: 'Vlog' },
  ];

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesCategory =
        selectedCategory === 'All' || note.category === selectedCategory;
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.tags && note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesHot = onlyHot ? note.isHot : true;

      return matchesCategory && matchesSearch && matchesHot;
    });
  }, [notes, selectedCategory, searchQuery, onlyHot]);

  return (
    <section className="space-y-6">
      {/* Category & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1a1a1a] text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
              }`}
            >
              {lang === 'zh' ? cat.labelZh : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Filter Controls & Search */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setOnlyHot(!onlyHot)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border transition-colors cursor-pointer ${
              onlyHot
                ? 'bg-rose-50 text-rose-600 border-rose-300'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${onlyHot ? 'text-rose-500 fill-rose-500' : 'text-stone-400'}`} />
            <span>{lang === 'zh' ? '爆款推荐' : 'Hot Only'}</span>
          </button>

          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'zh' ? '搜索笔记关键词...' : 'Search notes...'}
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-stone-100/80 text-xs text-stone-800 placeholder-stone-400 border border-transparent focus:border-stone-400 focus:bg-white focus:outline-none transition-all font-sans"
            />
          </div>
        </div>
      </div>

      {/* Xiaohongshu Waterfall Cards Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
          <Filter className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-600 font-serif italic text-base">
            {lang === 'zh' ? '未找到相关笔记' : 'No matching notes found'}
          </p>
          <p className="text-xs text-stone-400 mt-1 font-mono">
            {lang === 'zh' ? '请尝试切换分类或重置搜索词' : 'Try switching categories or clear search query.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              onClick={() => onSelectNote(note)}
            >
              <div>
                {/* Note Image & Badges */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <img
                    src={note.coverUrl}
                    alt={note.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {note.isHot && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-[9px] font-mono tracking-widest uppercase shadow-sm">
                        <Flame className="w-3 h-3 fill-white" />
                        {lang === 'zh' ? '爆款' : 'Viral'}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-full bg-[#141414]/75 backdrop-blur-md text-stone-200 text-[9px] font-mono tracking-wider uppercase border border-stone-700/60">
                      {note.category}
                    </span>
                  </div>

                  {/* Image Count Indicator */}
                  {note.images && note.images.length > 1 && (
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-stone-950/70 backdrop-blur-md text-white text-[10px] font-mono">
                      1/{note.images.length}
                    </span>
                  )}
                </div>

                {/* Note Body */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-serif font-medium text-stone-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                    {note.title}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-sans font-light">
                    {note.content}
                  </p>

                  {/* Hashtags */}
                  {note.tags && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {note.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-mono tracking-wider text-rose-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Note Footer: Creator Watermark & Social Engagement */}
              <div className="px-5 py-3.5 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover border border-stone-200"
                  />
                  <span className="text-[11px] font-medium text-stone-600 truncate max-w-[100px]">
                    {profile.name}
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-stone-500 text-xs font-mono">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(note.id);
                    }}
                    className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer group/like"
                  >
                    <Heart className="w-3.5 h-3.5 group-hover/like:scale-125 transition-transform text-rose-500 fill-rose-500" />
                    <span>{note.likes.toLocaleString()}</span>
                  </button>

                  <span className="flex items-center gap-1 text-stone-400">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{note.collects.toLocaleString()}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
