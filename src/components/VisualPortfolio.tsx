import React, { useState } from 'react';
import { PortfolioProject } from '../types';
import { Sparkles, Eye, TrendingUp, Award, ExternalLink, X, ChevronRight } from 'lucide-react';

interface VisualPortfolioProps {
  projects: PortfolioProject[];
  lang: 'zh' | 'en';
}

export const VisualPortfolio: React.FC<VisualPortfolioProps> = ({ projects, lang }) => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-rose-600">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>{lang === 'zh' ? '视觉全案与品牌案例' : 'Visual & Brand Case Studies'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-900 italic mt-1">
            {lang === 'zh' ? '精选视觉与商业案例' : 'Selected Works & Visual Direction'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md font-sans font-light leading-relaxed">
          {lang === 'zh'
            ? '融合前沿美学视角与小红书生态传播逻辑，为顶级品牌打造高价值商业资产。'
            : 'Combining modern aesthetics with social strategy to build impactful brand equity.'}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
            className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Project Image Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={proj.coverUrl}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-[#141414]/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-stone-200 uppercase border border-stone-700/60">
                  {proj.category}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono tracking-wide">
                  <span>{proj.client}</span>
                  <span>{proj.year}</span>
                </div>

                <h3 className="text-lg font-serif font-medium text-stone-900 group-hover:text-rose-600 transition-colors leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 font-sans font-light">
                  {proj.summary}
                </p>

                {/* Impact Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-100">
                  {proj.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-stone-50/80 p-2.5 rounded-xl text-center border border-stone-100">
                      <p className="text-[9px] font-mono text-stone-400 truncate uppercase tracking-wider">{metric.label}</p>
                      <p className="text-xs font-serif font-bold text-stone-900 mt-0.5">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Read Case Study Button */}
            <div className="px-5 py-3.5 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-stone-700 group-hover:text-rose-600 transition-colors">
              <span>{lang === 'zh' ? '查看案例全案' : 'View Full Case Study'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-y-auto p-6 sm:p-10 shadow-2xl border border-stone-200 space-y-6">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-rose-600 uppercase">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-1 italic">
                {selectedProject.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-stone-400 font-mono mt-2">
                <span>Client: {selectedProject.client}</span>
                <span>•</span>
                <span>Year: {selectedProject.year}</span>
              </div>
            </div>

            {/* Overview & Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50/80 p-5 rounded-2xl border border-stone-200/80">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="text-center p-2">
                  <p className="text-[10px] font-mono tracking-wider uppercase text-stone-500">{m.label}</p>
                  <p className="text-2xl font-serif italic text-rose-600 mt-1">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono tracking-[0.15em] text-stone-900 uppercase">
                {lang === 'zh' ? '案例企划与核心执行' : 'Project Overview & Execution'}
              </h4>
              <p className="text-sm text-stone-700 leading-relaxed font-sans font-light whitespace-pre-line">
                {selectedProject.description}
              </p>
            </div>

            {/* Gallery Images */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono tracking-[0.15em] text-stone-900 uppercase">
                {lang === 'zh' ? '视觉产出画廊' : 'Visual Deliverables Gallery'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProject.gallery.map((imgUrl, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-stone-200 shadow-xs">
                    <img
                      src={imgUrl}
                      alt="Gallery"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
