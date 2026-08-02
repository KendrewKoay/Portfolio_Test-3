import React, { useState } from 'react';
import { CreatorProfile, RedNote } from '../types';
import { X, Save, Plus, Image as ImageIcon } from 'lucide-react';

interface EditProfileModalProps {
  profile: CreatorProfile;
  lang: 'zh' | 'en';
  onClose: () => void;
  onUpdateProfile: (updated: CreatorProfile) => void;
  onAddNote: (newNote: RedNote) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  lang,
  onClose,
  onUpdateProfile,
  onAddNote,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'addNote'>('profile');

  // Profile Form State
  const [formData, setFormData] = useState<CreatorProfile>({ ...profile });

  // Add Note Form State
  const [newNote, setNewNote] = useState({
    title: '',
    category: 'Lifestyle' as const,
    coverUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    content: '',
    tags: '#美学 #生活灵感',
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    onClose();
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) return;

    const createdNote: RedNote = {
      id: 'note-' + Date.now(),
      title: newNote.title,
      coverUrl: newNote.coverUrl,
      category: newNote.category,
      likes: Math.floor(Math.random() * 5000) + 1000,
      collects: Math.floor(Math.random() * 3000) + 500,
      commentsCount: Math.floor(Math.random() * 200) + 20,
      publishDate: new Date().toISOString().split('T')[0],
      isHot: true,
      images: [newNote.coverUrl],
      content: newNote.content,
      tags: newNote.tags.split(' ').filter(Boolean),
      redNoteUrl: profile.profileUrl,
      comments: []
    };

    onAddNote(createdNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Tabs */}
        <div className="flex items-center gap-6 border-b border-stone-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`font-serif italic text-base transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'text-stone-900 border-b-2 border-stone-900 pb-1 font-medium' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            {lang === 'zh' ? '编辑创作者资料' : 'Edit Creator Profile'}
          </button>
          <button
            onClick={() => setActiveTab('addNote')}
            className={`font-serif italic text-base transition-colors cursor-pointer ${
              activeTab === 'addNote' ? 'text-stone-900 border-b-2 border-stone-900 pb-1 font-medium' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            {lang === 'zh' ? '发布新笔记' : 'Add New Note'}
          </button>
        </div>

        {activeTab === 'profile' ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs text-stone-800 font-sans">
            <div>
              <label className="block font-mono tracking-wider text-[11px] uppercase mb-1">博主昵称 / Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-full border border-stone-300 focus:outline-none focus:border-stone-900 font-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono tracking-wider text-[11px] uppercase mb-1">小红书号 / RED ID</label>
                <input
                  type="text"
                  value={formData.redId}
                  onChange={(e) => setFormData({ ...formData, redId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-stone-300 font-mono focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block font-mono tracking-wider text-[11px] uppercase mb-1">认证头衔 / Verified Title</label>
                <input
                  type="text"
                  value={formData.verifiedBadge}
                  onChange={(e) => setFormData({ ...formData, verifiedBadge: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-stone-300 focus:outline-none focus:border-stone-900 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono tracking-wider text-[11px] uppercase mb-1">个人简介 (中文) / Bio (ZH)</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:border-stone-900 font-sans font-light"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div>
                <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1">粉丝数</label>
                <input
                  type="number"
                  value={formData.stats.followers}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, followers: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white font-mono text-xs focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1">获赞与收藏</label>
                <input
                  type="number"
                  value={formData.stats.likesAndCollects}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, likesAndCollects: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white font-mono text-xs focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1">互动率</label>
                <input
                  type="text"
                  value={formData.stats.engagementRate}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, engagementRate: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white font-mono text-xs focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#141414] hover:bg-stone-800 text-white font-mono text-xs tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span>保存修改 / Save Profile</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreateNote} className="space-y-4 text-xs text-stone-800 font-sans">
            <div>
              <label className="block font-mono tracking-wider text-[11px] uppercase mb-1">笔记标题 / Title *</label>
              <input
                type="text"
                required
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="例如: ☕ 提升沉浸感！我的极简桌搭布局..."
                className="w-full px-4 py-2.5 rounded-full border border-stone-300 focus:outline-none focus:border-stone-900 font-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono tracking-wider text-[11px] uppercase mb-1">分类 / Category</label>
                <select
                  value={newNote.category}
                  onChange={(e) => setNewNote({ ...newNote, category: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-full border border-stone-300 bg-white focus:outline-none focus:border-stone-900 font-sans"
                >
                  <option value="Lifestyle">Lifestyle / 美学生活</option>
                  <option value="Visual Design">Visual Design / 视觉设计</option>
                  <option value="Tech & AI">Tech & AI / 科技与AI</option>
                  <option value="Fashion">Fashion / 穿搭</option>
                  <option value="Vlog">Vlog / 日常</option>
                </select>
              </div>

              <div>
                <label className="block font-mono tracking-wider text-[11px] uppercase mb-1">封面图片链接 / Cover Image URL</label>
                <input
                  type="text"
                  value={newNote.coverUrl}
                  onChange={(e) => setNewNote({ ...newNote, coverUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-stone-300 focus:outline-none focus:border-stone-900 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono tracking-wider text-[11px] uppercase mb-1">笔记正文 / Content *</label>
              <textarea
                rows={4}
                required
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                placeholder="在此编写小红书笔记文案..."
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:border-stone-900 font-sans font-light"
              />
            </div>

            <div>
              <label className="block font-mono tracking-wider text-[11px] uppercase mb-1">话题标签 / Tags (空格分隔)</label>
              <input
                type="text"
                value={newNote.tags}
                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                className="w-full px-4 py-2.5 rounded-full border border-stone-300 focus:outline-none focus:border-stone-900 font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>立即发布笔记 / Publish Note</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
