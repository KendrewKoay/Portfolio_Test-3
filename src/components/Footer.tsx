import React from 'react';
import { CreatorProfile } from '../types';
import { Heart, ArrowUp, ExternalLink, Mail, MessageCircle, Instagram } from 'lucide-react';

interface FooterProps {
  profile: CreatorProfile;
  lang: 'zh' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ profile, lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141414] text-stone-300 mt-20 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-2xl font-serif font-light italic text-white flex items-center justify-center md:justify-start gap-3">
              <span>{profile.name}</span>
              <span className="text-[10px] px-3 py-0.5 rounded-full bg-stone-800 text-stone-300 font-mono tracking-widest uppercase border border-stone-700">
                RED Creator
              </span>
            </h3>
            <p className="text-xs text-stone-400 font-sans font-light max-w-md leading-relaxed">
              {lang === 'zh'
                ? '致力于以极简美学、设计视角与AI灵感，记录美好生活与深度品牌价值。'
                : 'Crafting aesthetic storytelling, visual design, and viral brand partnerships.'}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-white transition-colors"
              title="Xiaohongshu Profile"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              title="Business Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono tracking-wider text-stone-500">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Xiaohongshu RED ID:</span>
            <strong className="text-stone-300 font-mono">{profile.redId}</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};
