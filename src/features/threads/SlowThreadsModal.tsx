import React, { useState, useEffect, useMemo } from 'react';
import { X, Feather } from 'lucide-react';
import { useEcho } from '../../hooks/useEcho';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { User } from '../../types';
import { AbstractAvatar } from '../../components/AbstractAvatar';
import { cleanUserInput } from '../../utils/sanitize';
import { playLetterUnfoldSound } from '../../utils/audio';
import { ThreadRecipientList } from './ThreadRecipientList';
import { LetterReader } from './LetterReader';
import { LetterComposer } from './LetterComposer';

const MAX_MSG_CHARS = 300;

export const SlowThreadsModal: React.FC = () => {
  const {
    isSlowThreadsOpen,
    setIsSlowThreadsOpen,
    constellation,
    slowMessages,
    currentUser,
    activeThreadUser,
    setActiveThreadUser,
    sendSlowMessage,
    markMessageRead,
  } = useEcho();

  const modalRef = useFocusTrap<HTMLDivElement>(isSlowThreadsOpen);

  const selectedUser: User | null = useMemo(() => {
    if (activeThreadUser) return activeThreadUser;
    if (constellation.length > 0) return constellation[0].user;
    return null;
  }, [activeThreadUser, constellation]);

  const [letterText, setLetterText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [, setTick] = useState(0);

  // Re-render tick to smoothly drive visual ink dispersion
  useEffect(() => {
    if (!isSlowThreadsOpen) return;
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isSlowThreadsOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSlowThreadsOpen(false);
      }
    };
    if (isSlowThreadsOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSlowThreadsOpen, setIsSlowThreadsOpen]);

  if (!isSlowThreadsOpen) return null;

  const currentThreadLetters = selectedUser
    ? slowMessages.filter(
        (m) =>
          (m.fromUserId === currentUser.id && m.toUserId === selectedUser.id) ||
          (m.fromUserId === selectedUser.id && m.toUserId === currentUser.id)
      )
    : [];

  const handleUnfoldLetter = (msgId: string) => {
    playLetterUnfoldSound();
    markMessageRead(msgId);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !letterText.trim() || isSending) return;

    setIsSending(true);
    const sanitized = cleanUserInput(letterText, MAX_MSG_CHARS);
    sendSlowMessage(selectedUser.id, sanitized);

    setTimeout(() => {
      setLetterText('');
      setIsSending(false);
    }, 300);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="slow-threads-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8 bg-cream-950/40 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto"
    >
      {/* Background click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsSlowThreadsOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-4xl h-[88vh] max-h-[740px] flex flex-col md:flex-row rounded-[2.5rem] bg-cream-50/95 border-2 border-resonance-300/80 shadow-2xl z-10 overflow-hidden focus:outline-none"
      >
        {/* Left Column: Addressing the Circle */}
        <ThreadRecipientList
          constellation={constellation}
          selectedUser={selectedUser}
          slowMessages={slowMessages}
          onSelectUser={setActiveThreadUser}
        />

        {/* Right Column: The Stationery Surface */}
        <section className="flex-1 flex flex-col h-full bg-[#FAF6EF] min-w-0 relative">
          {selectedUser ? (
            <>
              {/* Stationary Top Bar */}
              <div className="p-5 px-8 border-b border-resonance-200/60 flex items-center justify-between bg-cream-50/80 backdrop-blur-md">
                <div className="flex items-center space-x-3.5">
                  <AbstractAvatar seed={selectedUser.avatarSeed} size={42} glow />
                  <div>
                    <h4 className="font-serif text-lg font-normal text-ink-900 leading-none">
                      Letter to {selectedUser.displayName}
                    </h4>
                    <span className="text-xs text-ink-500 font-light mt-1 block">
                      Presence over archiving · Words dissolve 45s after reading
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSlowThreadsOpen(false)}
                  className="p-2 text-ink-500 hover:text-ink-900 hover:bg-resonance-100/80 rounded-full transition-colors"
                  aria-label="Close letters view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Letter Reading Surface */}
              <LetterReader
                currentThreadLetters={currentThreadLetters}
                currentUser={currentUser}
                onUnfoldLetter={handleUnfoldLetter}
              />

              {/* Mindful Composition Writing Surface */}
              <LetterComposer
                selectedUser={selectedUser}
                letterText={letterText}
                maxChars={MAX_MSG_CHARS}
                isSending={isSending}
                onTextChange={setLetterText}
                onSubmit={handleSend}
              />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-ink-500">
              <Feather className="w-8 h-8 text-resonance-400 mb-2 stroke-[1.2]" />
              <h4 className="font-serif text-xl text-ink-800">
                Choose a Soul from your Constellation
              </h4>
              <p className="text-xs font-light max-w-sm mt-1 leading-relaxed">
                Slow Letters are exclusively shared across mutual connections.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
