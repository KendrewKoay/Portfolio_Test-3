import React, { useState } from 'react';
import { RedNote, CreatorProfile } from '../types';
import { 
  X, 
  Heart, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  MessageCircle, 
  Send, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';

interface NoteDetailModalProps {
  note: RedNote | null;
  profile: CreatorProfile;
  lang: 'zh' | 'en';
  onClose: () => void;
  onToggleLike: (noteId: string) => void;
  onAddComment: (noteId: string, commentText: string) => void;
}

export const NoteDetailModal: React.FC<NoteDetailModalProps> = ({
  note,
  profile,
  lang,
  onClose,
  onToggleLike,
  onAddComment,
}) => {
  if (!note) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  const images = note.images && note.images.length > 0 ? note.images : [note.coverUrl];

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(note.id, commentInput.trim());
    setCommentInput('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-stone-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-900/60 text-white hover:bg-stone-900 transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Section: Image Gallery & Carousel */}
        <div className="md:w-3/5 bg-stone-950 relative flex flex-col justify-between items-center overflow-hidden min-h-[300px] md:min-h-full">
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <img
              src={images[activeImageIndex]}
              alt={note.title}
              referrerPolicy="no-referrer"
              className="max-h-[65vh] md:max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-lg transition-all duration-300"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors backdrop-blur-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors backdrop-blur-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Strip */}
          {images.length > 1 && (
            <div className="w-full p-3 bg-stone-900/80 backdrop-blur-md flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-rose-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Creator Header, Content & Discussion */}
        <div className="md:w-2/5 flex flex-col justify-between h-full bg-white border-l border-stone-200 overflow-hidden">
          
          {/* Creator Header & RED App Link */}
          <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-3">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-stone-800 shadow-xs"
              />
              <div>
                <h4 className="font-serif italic font-medium text-stone-900 leading-tight text-sm">
                  {profile.name}
                </h4>
                <p className="text-[10px] text-stone-400 font-mono">
                  RED ID: {profile.redId}
                </p>
              </div>
            </div>

            <a
              href={note.redNoteUrl || profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-xs"
            >
              <span>{lang === 'zh' ? '在APP中打开' : 'Open in RED'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Scrollable Note Body */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1 font-sans text-stone-800">
            {/* Title & Date */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {note.isHot && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-300 text-[9px] font-mono tracking-widest uppercase">
                    <Flame className="w-3 h-3 fill-rose-600" />
                    {lang === 'zh' ? '爆款' : 'Viral'}
                  </span>
                )}
                <span className="text-[11px] font-mono text-stone-400">
                  {note.publishDate}
                </span>
              </div>
              <h2 className="text-xl font-serif font-medium text-stone-900 leading-snug">
                {note.title}
              </h2>
            </div>

            {/* Content Copy */}
            <div className="text-xs sm:text-sm leading-relaxed text-stone-700 font-light space-y-3 whitespace-pre-line border-t border-stone-100 pt-4">
              {note.content}
            </div>

            {/* Tags */}
            {note.tags && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                {note.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-mono tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Comments List */}
            <div className="pt-4 border-t border-stone-200">
              <h4 className="text-[10px] font-mono tracking-[0.2em] text-stone-900 uppercase mb-3 flex items-center justify-between">
                <span>{lang === 'zh' ? '评论互动' : 'Comments'}</span>
                <span className="text-stone-400 font-mono text-[11px]">
                  ({note.comments ? note.comments.length : 0})
                </span>
              </h4>

              <div className="space-y-3">
                {note.comments && note.comments.length > 0 ? (
                  note.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2.5 text-xs bg-stone-50/80 p-3 rounded-xl border border-stone-100">
                      <img
                        src={comment.avatar}
                        alt={comment.user}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif italic font-medium text-stone-800">{comment.user}</span>
                          <span className="text-[10px] text-stone-400 font-mono">{comment.time}</span>
                        </div>
                        <p className="text-stone-600 leading-normal font-sans font-light">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-400 font-mono italic text-center py-2">
                    {lang === 'zh' ? '暂无评论，快来抢沙发吧～' : 'No comments yet. Be the first!'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action & Comment Bar */}
          <div className="p-4 border-t border-stone-200 bg-stone-50/80 space-y-3">
            {/* Interaction Buttons Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggleLike(note.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
                  <span>{note.likes.toLocaleString()}</span>
                </button>

                <button
                  onClick={() => setIsCollected(!isCollected)}
                  className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    isCollected ? 'text-amber-600' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isCollected ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>{(note.collects + (isCollected ? 1 : 0)).toLocaleString()}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  {copiedShare ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
                  <span>{copiedShare ? (lang === 'zh' ? '已复制链接' : 'Link Copied') : (lang === 'zh' ? '分享' : 'Share')}</span>
                </button>
              </div>
            </div>

            {/* Comment Form Input */}
            <form onSubmit={handleSendComment} className="flex items-center gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder={lang === 'zh' ? '说点什么吧...' : 'Write a comment...'}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
