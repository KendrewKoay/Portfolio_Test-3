/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  initialProfile, 
  initialNotes, 
  portfolioProjects, 
  brandCollabs, 
  initialGuestbook 
} from './data/mockData';

import { CreatorProfile, RedNote, GuestbookMessage } from './types';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { NotesGrid } from './components/NotesGrid';
import { NoteDetailModal } from './components/NoteDetailModal';
import { VisualPortfolio } from './components/VisualPortfolio';
import { BrandCollabs } from './components/BrandCollabs';
import { AiIdeaGenerator } from './components/AiIdeaGenerator';
import { GuestbookSection } from './components/GuestbookSection';
import { EditProfileModal } from './components/EditProfileModal';
import { Footer } from './components/Footer';

export default function App() {
  const [profile, setProfile] = useState<CreatorProfile>(initialProfile);
  const [notes, setNotes] = useState<RedNote[]>(initialNotes);
  const [projects] = useState(portfolioProjects);
  const [collabs] = useState(brandCollabs);
  const [guestbook, setGuestbook] = useState<GuestbookMessage[]>(initialGuestbook);

  const [activeTab, setActiveTab] = useState<TabType>('notes');
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  const [selectedNote, setSelectedNote] = useState<RedNote | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  // Handlers
  const handleToggleLikeNote = (noteId: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === noteId) {
          return { ...note, likes: note.likes + 1 };
        }
        return note;
      })
    );

    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const handleAddComment = (noteId: string, commentText: string) => {
    const newComment = {
      id: 'c-' + Date.now(),
      user: lang === 'zh' ? '热心薯友' : 'Friendly Visitor',
      avatar: `https://picsum.photos/seed/${Date.now()}/100/100`,
      text: commentText,
      time: lang === 'zh' ? '刚刚' : 'Just now',
      likes: 1,
    };

    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === noteId) {
          const updatedComments = [newComment, ...(note.comments || [])];
          return {
            ...note,
            commentsCount: note.commentsCount + 1,
            comments: updatedComments,
          };
        }
        return note;
      })
    );

    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote((prev) =>
        prev
          ? {
              ...prev,
              commentsCount: prev.commentsCount + 1,
              comments: [newComment, ...(prev.comments || [])],
            }
          : null
      );
    }
  };

  const handleAddGuestbookMessage = (msg: GuestbookMessage) => {
    setGuestbook((prev) => [msg, ...prev]);
  };

  const handleToggleLikeGuestbook = (id: string) => {
    setGuestbook((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            likesCount: item.likesCount + (item.isLiked ? -1 : 1),
            isLiked: !item.isLiked,
          };
        }
        return item;
      })
    );
  };

  const handleAddNote = (newNote: RedNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans antialiased flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      <div>
        {/* Creator Hero Header */}
        <Header
          profile={profile}
          lang={lang}
          setLang={setLang}
          onOpenCollab={() => setActiveTab('collabs')}
          onOpenEdit={() => setIsEditOpen(true)}
        />

        {/* Sticky Tab Navigation Bar */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          notesCount={notes.length}
          portfolioCount={projects.length}
          collabsCount={collabs.length}
        />

        {/* Main Workspace View */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'notes' && (
            <NotesGrid
              notes={notes}
              profile={profile}
              lang={lang}
              onSelectNote={(note) => setSelectedNote(note)}
              onToggleLike={handleToggleLikeNote}
            />
          )}

          {activeTab === 'portfolio' && (
            <VisualPortfolio projects={projects} lang={lang} />
          )}

          {activeTab === 'collabs' && (
            <BrandCollabs collabs={collabs} profile={profile} lang={lang} />
          )}

          {activeTab === 'ai-assistant' && (
            <AiIdeaGenerator lang={lang} />
          )}

          {activeTab === 'guestbook' && (
            <GuestbookSection
              messages={guestbook}
              lang={lang}
              onAddMessage={handleAddGuestbookMessage}
              onToggleLikeMessage={handleToggleLikeGuestbook}
            />
          )}
        </main>
      </div>

      {/* Note Detail Lightbox Modal */}
      <NoteDetailModal
        note={selectedNote}
        profile={profile}
        lang={lang}
        onClose={() => setSelectedNote(null)}
        onToggleLike={handleToggleLikeNote}
        onAddComment={handleAddComment}
      />

      {/* Profile & Custom Note Editor Modal */}
      {isEditOpen && (
        <EditProfileModal
          profile={profile}
          lang={lang}
          onClose={() => setIsEditOpen(false)}
          onUpdateProfile={(updated) => setProfile(updated)}
          onAddNote={handleAddNote}
        />
      )}

      {/* Footer */}
      <Footer profile={profile} lang={lang} />
    </div>
  );
}
