import React, { useState } from 'react';
import { CreatorProfile } from '../types';
import { 
  CheckCircle, 
  Copy, 
  ExternalLink, 
  Globe, 
  Mail, 
  MessageCircle, 
  Sparkles, 
  QrCode, 
  Sliders,
  Share2,
  Heart
} from 'lucide-react';

interface HeaderProps {
  profile: CreatorProfile;
  lang: 'zh' | 'en';
  setLang: (lang: 'zh' | 'en') => void;
  onOpenCollab: () => void;
  onOpenEdit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  lang,
  setLang,
  onOpenCollab,
  onOpenEdit
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleCopyRedId = () => {
    navigator.clipboard.writeText(profile.redId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + (lang === 'zh' ? '万' : 'w');
    }
    return num.toLocaleString();
  };

  return (
    <header className="relative w-full bg-[#141414] text-stone-100 overflow-hidden border-b border-stone-800">
      {/* Cover Backdrop with subtle overlay */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={profile.coverUrl} 
          alt="Cover" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 saturate-105 transform hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
        
        {/* Top Floating Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141414]/80 backdrop-blur-md text-xs font-medium text-stone-200 border border-stone-700/80 hover:bg-stone-800 transition-colors shadow-sm tracking-wider"
          >
            <Globe className="w-3.5 h-3.5 text-rose-400" />
            {lang === 'zh' ? 'ENGLISH' : '中文'}
          </button>

          <button
            onClick={onOpenEdit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141414]/80 backdrop-blur-md text-xs font-medium text-stone-200 border border-stone-700/80 hover:bg-stone-800 transition-colors shadow-sm tracking-wider"
            title="Custom Profile Settings"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            {lang === 'zh' ? '编辑主页' : 'EDIT PROFILE'}
          </button>
        </div>
      </div>

      {/* Profile Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Avatar & Main Bio */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-stone-700 via-stone-400 to-rose-400/80 shadow-2xl">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full border-4 border-[#141414] shadow-inner"
                />
              </div>
              <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#141414] flex items-center justify-center shadow-lg" title="Online / Open for Collab">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </span>
            </div>

            <div className="space-y-2 max-w-xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-white italic">
                  {profile.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-medium tracking-widest uppercase bg-rose-500/10 text-rose-300 border border-rose-500/30">
                  <CheckCircle className="w-3 h-3 text-rose-400" />
                  {profile.verifiedBadge}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-stone-400 font-mono tracking-wide">
                <span className="flex items-center gap-1.5">
                  <span className="text-stone-500">RED ID:</span> 
                  <strong className="text-stone-200 font-semibold">{profile.redId}</strong>
                </span>
                <button
                  onClick={handleCopyRedId}
                  className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  {copied ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制' : 'Copy')}
                </button>
                <span className="text-stone-700">|</span>
                <span>📍 {profile.location}</span>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed font-sans font-light whitespace-pre-line pt-1">
                {lang === 'zh' ? profile.bio : profile.bioEn}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-2">
                {profile.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-widest bg-stone-900/90 text-stone-300 border border-stone-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 pt-2 md:pt-0">
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-xs tracking-widest uppercase bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-lg shadow-rose-600/20 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>{lang === 'zh' ? '关注小红书主页' : 'Follow on RED'}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <button
              onClick={onOpenCollab}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-xs tracking-widest uppercase bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'zh' ? '品牌合作与刊例' : 'Brand Collab Kit'}</span>
            </button>

            <button
              onClick={() => setShowQr(!showQr)}
              className="p-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors"
              title="WeChat Contact"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* QR Code Modal / Popup */}
        {showQr && (
          <div className="mt-4 p-5 rounded-2xl bg-[#1c1c1c] border border-stone-800 text-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl text-stone-900 shadow-inner">
                <QrCode className="w-12 h-12 text-rose-600" />
              </div>
              <div>
                <p className="font-serif italic text-base text-stone-100">
                  {lang === 'zh' ? '商务合作微信号' : 'Business WeChat Contact'}
                </p>
                <p className="text-xs text-rose-400 font-mono font-bold mt-1 tracking-wider">
                  {profile.wechatId}
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5 font-mono">
                  {lang === 'zh' ? '官方邮箱: ' + profile.email : 'Official Email: ' + profile.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowQr(false)}
              className="text-xs px-4 py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors uppercase tracking-wider font-mono"
            >
              {lang === 'zh' ? '关闭' : 'Close'}
            </button>
          </div>
        )}

        {/* Creator Key Stats Counter Bar */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#1a1a1a]/80 backdrop-blur-md p-5 rounded-2xl border border-stone-800">
          <div className="text-center sm:text-left sm:border-r sm:border-stone-800/80 sm:pr-4">
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-mono">
              {lang === 'zh' ? '小红书粉丝' : 'Followers'}
            </p>
            <p className="text-2xl font-serif italic text-stone-100 mt-1">
              {formatNumber(profile.stats.followers)}
            </p>
          </div>

          <div className="text-center sm:text-left sm:border-r sm:border-stone-800/80 sm:px-4">
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-mono">
              {lang === 'zh' ? '获赞与收藏' : 'Likes & Collects'}
            </p>
            <p className="text-2xl font-serif italic text-rose-400 mt-1">
              {formatNumber(profile.stats.likesAndCollects)}
            </p>
          </div>

          <div className="text-center sm:text-left sm:border-r sm:border-stone-800/80 sm:px-4">
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-mono">
              {lang === 'zh' ? '精选笔记数' : 'Total Notes'}
            </p>
            <p className="text-2xl font-serif italic text-amber-300 mt-1">
              {profile.stats.notesCount} <span className="text-sm font-sans text-stone-400">{lang === 'zh' ? '篇' : ''}</span>
            </p>
          </div>

          <div className="text-center sm:text-left sm:pl-4">
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-mono">
              {lang === 'zh' ? '平均互动率' : 'Engagement'}
            </p>
            <p className="text-2xl font-serif italic text-emerald-400 mt-1">
              {profile.stats.engagementRate}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
