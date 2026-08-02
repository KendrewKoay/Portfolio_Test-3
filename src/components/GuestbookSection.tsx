import React, { useState } from 'react';
import { GuestbookMessage } from '../types';
import { MessageSquareHeart, Send, Heart, User, Sparkles } from 'lucide-react';

interface GuestbookSectionProps {
  messages: GuestbookMessage[];
  lang: 'zh' | 'en';
  onAddMessage: (message: GuestbookMessage) => void;
  onToggleLikeMessage: (id: string) => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  messages,
  lang,
  onAddMessage,
  onToggleLikeMessage,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('粉丝朋友');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const newMsg: GuestbookMessage = {
      id: 'g-' + Date.now(),
      authorName: name.trim(),
      authorAvatar: `https://picsum.photos/seed/${Date.now()}/100/100`,
      role: role.trim(),
      date: new Date().toISOString().split('T')[0],
      content: content.trim(),
      likesCount: 1,
      isLiked: true,
      tag: role.includes('品牌') || role.toLowerCase().includes('brand') ? '品牌好评' : '粉丝互动',
    };

    onAddMessage(newMsg);
    setName('');
    setContent('');
  };

  return (
    <section className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
        <div>
          <h2 className="text-3xl font-serif font-light text-stone-900 italic flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-rose-600" />
            <span>{lang === 'zh' ? '互动留言墙' : 'Community & Brand Wall'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans font-light">
            {lang === 'zh' ? '给小夕留言、提出合作构想或表达对审美作品的喜爱～' : 'Leave a message, feedback, or brand greeting.'}
          </p>
        </div>
      </div>

      {/* New Message Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <h3 className="text-xs font-mono tracking-[0.15em] text-stone-800 uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{lang === 'zh' ? '写下一条留言' : 'Leave a Message'}</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-700 mb-1">
                {lang === 'zh' ? '您的称呼 *' : 'Your Name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'zh' ? '例: 小红书薯友 / 品牌方Sarah' : 'Name or Brand Title'}
                className="w-full px-4 py-2.5 rounded-full border border-stone-300 text-xs text-stone-800 focus:outline-none focus:border-stone-900 font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-700 mb-1">
                {lang === 'zh' ? '身份标签' : 'Identity Tag'}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-stone-300 text-xs text-stone-800 bg-white focus:outline-none focus:border-stone-900 font-sans"
              >
                <option value="粉丝朋友">粉丝朋友 / Fan</option>
                <option value="品牌方商务">品牌方商务 / Brand Partner</option>
                <option value="设计师同行">设计师同行 / Fellow Creator</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-700 mb-1">
              {lang === 'zh' ? '留言内容 *' : 'Message Content *'}
            </label>
            <textarea
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={lang === 'zh' ? '分享你的想法...' : 'Type your message here...'}
              className="w-full px-4 py-3 rounded-2xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:border-stone-900 font-sans"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#141414] hover:bg-stone-800 text-white font-mono text-xs tracking-[0.2em] uppercase transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-rose-400" />
            <span>{lang === 'zh' ? '发布留言' : 'Post Message'}</span>
          </button>
        </form>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={msg.authorAvatar}
                  alt={msg.authorName}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="text-sm font-serif font-medium text-stone-900">
                    {msg.authorName}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-stone-400 font-mono">
                    <span>{msg.role}</span>
                    <span>•</span>
                    <span>{msg.date}</span>
                  </div>
                </div>
              </div>

              {msg.tag && (
                <span className="px-3 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[9px] font-mono tracking-wider uppercase border border-stone-200">
                  {msg.tag}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans font-light pl-1">
              {msg.content}
            </p>

            <div className="flex items-center justify-end pt-2 border-t border-stone-100">
              <button
                onClick={() => onToggleLikeMessage(msg.id)}
                className={`flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer ${
                  msg.isLiked ? 'text-rose-600' : 'text-stone-400 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${msg.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{msg.likesCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
