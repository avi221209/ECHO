import React, { useState, useEffect, useMemo } from 'react';
import { X, Send, Feather, Eye } from 'lucide-react';
import { useEcho } from '../../hooks/useEcho';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { User, SlowMessage } from '../../types';
import { AbstractAvatar } from '../../components/AbstractAvatar';
import { cleanUserInput } from '../../utils/sanitize';
import { playLetterUnfoldSound } from '../../utils/audio';

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
        <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-resonance-200/70 bg-cream-100/60 flex flex-col shrink-0">
          <div className="p-5 border-b border-resonance-200/60 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Feather className="w-4 h-4 text-resonance-700" />
              <h3 id="slow-threads-heading" className="font-serif text-xl font-normal text-ink-900 leading-tight">
                Slow Letters
              </h3>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-resonance-900 bg-resonance-100 px-2 py-0.5 rounded-full border border-resonance-200">
              Ephemeral
            </span>
          </div>

          {/* Recipient Addresses */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {constellation.length === 0 ? (
              <div className="p-6 text-center text-xs text-ink-500 font-light italic">
                Your Constellation has no connections yet. Mutual resonance in the sky opens
                the path for Slow Letters.
              </div>
            ) : (
              constellation.map(({ user }) => {
                const isSelected = selectedUser?.id === user.id;
                const unread = slowMessages.filter(
                  (m) => m.fromUserId === user.id && !m.readAt
                ).length;

                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => setActiveThreadUser(user)}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'bg-cream-50 shadow-light-soft border border-resonance-300/90'
                        : 'hover:bg-cream-100 text-ink-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <AbstractAvatar seed={user.avatarSeed} size={38} glow={isSelected} />
                      <div className="min-w-0 flex-1">
                        <span className="block text-xs font-serif font-medium text-ink-900 truncate">
                          {user.displayName}
                        </span>
                        <span className="block text-[11px] text-ink-500 font-light truncate">
                          {user.bio}
                        </span>
                      </div>
                    </div>

                    {unread > 0 && (
                      <span className="w-2 h-2 rounded-full bg-resonance-500 shrink-0 animate-pulse" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="p-4 border-t border-resonance-200/50 text-[11px] text-ink-500 italic font-serif bg-cream-50/50">
            “Like paper letters read beside a morning window.”
          </div>
        </aside>

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
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6">
                {currentThreadLetters.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-8">
                    <Feather className="w-8 h-8 text-resonance-400 mb-3 stroke-[1.2]" />
                    <p className="font-serif text-2xl font-light text-ink-800">
                      All words have dissolved into quiet memory.
                    </p>
                    <p className="text-xs text-ink-500 font-light mt-2 max-w-sm leading-relaxed">
                      Pen an unhurried note below. Once opened, it will remain visible for 45
                      seconds before softly departing.
                    </p>
                  </div>
                ) : (
                  currentThreadLetters.map((msg: SlowMessage) => {
                    const isFromSelf = msg.fromUserId === currentUser.id;
                    const isRead = Boolean(msg.readAt);

                    // Compute remaining seconds and visual ink decay
                    const remainingSec = msg.expiresAt
                      ? Math.max(0, Math.ceil((msg.expiresAt - Date.now()) / 1000))
                      : null;

                    // Calculate subtle ink dispersion based on age
                    const opacityRatio = remainingSec !== null ? Math.max(0.18, remainingSec / 45) : 1;
                    const blurPx = remainingSec !== null && remainingSec < 12 ? (12 - remainingSec) * 0.35 : 0;

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          isFromSelf ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`relative max-w-lg p-6 sm:p-7 rounded-[1.8rem] transition-all duration-700 shadow-sm border ${
                            isFromSelf
                              ? 'bg-resonance-100/60 border-resonance-300/80 text-ink-900'
                              : isRead
                                ? 'bg-cream-50/90 border-resonance-300/60 text-ink-800'
                                : 'bg-cream-50 border-resonance-500/80 text-ink-900 shadow-light-soft'
                          }`}
                          style={{
                            opacity: opacityRatio,
                            filter: blurPx > 0 ? `blur(${blurPx}px)` : 'none',
                          }}
                        >
                          <blockquote className="font-serif text-lg sm:text-xl font-light leading-relaxed">
                            “{msg.text}”
                          </blockquote>

                          {/* Letter Footer */}
                          <div className="flex items-center justify-between gap-4 text-xs text-ink-500 mt-4 pt-3 border-t border-resonance-200/50">
                            <span className="font-light">
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>

                            {!isFromSelf && (
                              <div>
                                {!isRead ? (
                                  <button
                                    type="button"
                                    onClick={() => handleUnfoldLetter(msg.id)}
                                    className="px-3 py-1 bg-resonance-500 hover:bg-resonance-600 text-cream-50 rounded-full font-medium transition-colors flex items-center space-x-1.5 shadow-xs"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>Unfold Letter</span>
                                  </button>
                                ) : (
                                  <span className="text-resonance-800 italic font-serif text-xs">
                                    Ink dissolving ({remainingSec}s)...
                                  </span>
                                )}
                              </div>
                            )}

                            {isFromSelf && (
                              <span className="italic text-ink-400 font-serif">
                                Penned by you
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Mindful Composition Writing Surface */}
              <form
                onSubmit={handleSend}
                className="p-5 sm:p-6 border-t border-resonance-200/60 bg-cream-50/80"
              >
                <div className="relative rounded-2xl bg-cream-100 border border-resonance-300/70 focus-within:border-resonance-500 focus-within:ring-2 focus-within:ring-resonance-200/50 p-4 transition-all shadow-inner">
                  <textarea
                    rows={2}
                    value={letterText}
                    onChange={(e) =>
                      setLetterText(e.target.value.slice(0, MAX_MSG_CHARS))
                    }
                    placeholder={`Compose an unhurried letter to ${selectedUser.displayName}...`}
                    className="w-full bg-transparent border-0 resize-none font-serif text-lg text-ink-900 placeholder:text-ink-400 focus:outline-none leading-relaxed"
                  />
                  <div className="flex items-center justify-between pt-2 border-t border-resonance-200/50 text-xs text-ink-500">
                    <span className="italic font-light">
                      Ephemeral · Words dissolve into quietness after reading
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-[11px]">
                        {MAX_MSG_CHARS - letterText.length} left
                      </span>
                      <button
                        type="submit"
                        disabled={!letterText.trim() || isSending}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                          letterText.trim() && !isSending
                            ? 'bg-resonance-500 text-cream-50 hover:bg-resonance-600 shadow-sm'
                            : 'bg-ink-300/40 text-cream-50/70 cursor-not-allowed'
                        }`}
                        aria-label="Send Slow Letter"
                      >
                        <span>Send</span>
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
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
