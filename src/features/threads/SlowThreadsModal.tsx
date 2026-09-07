import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Send,
  Sparkles,
  Clock,
  Eye,
  AlertCircle,
  Feather,
} from 'lucide-react';
import { useEcho } from '../../hooks/useEcho';
import { User, SlowMessage } from '../../types';
import { AbstractAvatar } from '../../components/AbstractAvatar';
import { cleanUserInput } from '../../utils/sanitize';

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

  // If no active thread user selected, select first constellation member
  const selectedUser: User | null = useMemo(() => {
    if (activeThreadUser) return activeThreadUser;
    if (constellation.length > 0) return constellation[0].user;
    return null;
  }, [activeThreadUser, constellation]);

  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [, setTick] = useState(0);

  // Force re-render every second to smoothly update countdowns of expiring messages
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

  // Filter messages between currentUser and selectedUser
  const currentThreadMessages = selectedUser
    ? slowMessages.filter(
        (m) =>
          (m.fromUserId === currentUser.id && m.toUserId === selectedUser.id) ||
          (m.fromUserId === selectedUser.id && m.toUserId === currentUser.id)
      )
    : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !messageText.trim() || isSending) return;

    setIsSending(true);
    const sanitized = cleanUserInput(messageText, MAX_MSG_CHARS);
    sendSlowMessage(selectedUser.id, sanitized);

    setTimeout(() => {
      setMessageText('');
      setIsSending(false);
    }, 200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="slow-threads-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-cream-950/30 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto"
    >
      {/* Background click dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsSlowThreadsOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl h-[85vh] max-h-[700px] flex flex-col md:flex-row rounded-3xl parchment-glass border border-resonance-300/60 shadow-parchment-elevated z-10 overflow-hidden">
        {/* Left / Sidebar: Constellation Connections */}
        <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-resonance-200/60 bg-cream-50/50 flex flex-col shrink-0">
          <div className="p-4 border-b border-resonance-200/50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Feather className="w-4 h-4 text-resonance-700" />
              <h3 className="font-serif text-lg font-medium text-ink-900 leading-tight">
                Slow Threads
              </h3>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-resonance-800 bg-resonance-100 px-2 py-0.5 rounded-full border border-resonance-200">
              Ephemeral
            </span>
          </div>

          {/* Connections List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {constellation.length === 0 ? (
              <div className="p-4 text-center text-xs text-ink-500 font-light">
                No connections in your Constellation yet. Resonate with moments in the sky
                to form mutual connections.
              </div>
            ) : (
              constellation.map(({ user }) => {
                const isSelected = selectedUser?.id === user.id;
                // Count unread from this user
                const unread = slowMessages.filter(
                  (m) => m.fromUserId === user.id && !m.readAt
                ).length;

                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => setActiveThreadUser(user)}
                    className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'bg-cream-100 shadow-light-soft border border-resonance-300/80'
                        : 'hover:bg-cream-100/60 text-ink-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <AbstractAvatar seed={user.avatarSeed} size={36} />
                      <div className="min-w-0 flex-1">
                        <span className="block text-xs font-medium text-ink-900 truncate">
                          {user.displayName}
                        </span>
                        <span className="block text-[10px] text-ink-400 font-light truncate">
                          {user.bio}
                        </span>
                      </div>
                    </div>

                    {unread > 0 && (
                      <span className="w-2 h-2 rounded-full bg-resonance-500 shrink-0 shadow-sm" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Ephemeral Philosophy Footer */}
          <div className="p-3 border-t border-resonance-200/40 text-[10px] text-ink-500 italic bg-cream-100/40">
            Messages dissolve 45 seconds after reading. Presence over archiving.
          </div>
        </aside>

        {/* Right / Main: Active Ephemeral Letter Exchange */}
        <section className="flex-1 flex flex-col h-full bg-cream-100/40 min-w-0">
          {selectedUser ? (
            <>
              {/* Thread Header */}
              <div className="p-4 px-6 border-b border-resonance-200/50 flex items-center justify-between bg-cream-50/70 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <AbstractAvatar seed={selectedUser.avatarSeed} size={38} glow />
                  <div>
                    <h4 className="text-sm font-medium text-ink-900 leading-none">
                      {selectedUser.displayName}
                    </h4>
                    <span className="text-[11px] text-ink-500 font-light">
                      Mutual Constellation connection
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSlowThreadsOpen(false)}
                  className="p-1.5 text-ink-400 hover:text-ink-800 hover:bg-resonance-100/60 rounded-full transition-colors"
                  aria-label="Close Slow Threads"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message Feed / Letters */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Ephemeral Notice Banner */}
                <div className="p-3 rounded-2xl bg-resonance-50/90 border border-resonance-200/60 flex items-start space-x-2.5 text-xs text-ink-600">
                  <Clock className="w-4 h-4 text-resonance-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-ink-800">
                      Unhurried, ephemeral letters:
                    </span>{' '}
                    <span className="font-light">
                      Incoming letters dissolve into memory 45 seconds after being opened.
                      Read with stillness.
                    </span>
                  </div>
                </div>

                {currentThreadMessages.length === 0 ? (
                  <div className="h-48 flex flex-col items-center justify-center text-center p-6">
                    <Sparkles className="w-6 h-6 text-resonance-400 mb-2" />
                    <p className="font-serif text-lg text-ink-800">
                      All words have dissolved into quiet stillness.
                    </p>
                    <p className="text-xs text-ink-500 font-light mt-1 max-w-sm">
                      Write an unhurried note to {selectedUser.displayName}, or let the
                      presence linger unsaid.
                    </p>
                  </div>
                ) : (
                  currentThreadMessages.map((msg: SlowMessage) => {
                    const isFromSelf = msg.fromUserId === currentUser.id;
                    const isRead = Boolean(msg.readAt);

                    // Calculate remaining seconds if message has been opened
                    const remainingSec = msg.expiresAt
                      ? Math.max(0, Math.ceil((msg.expiresAt - Date.now()) / 1000))
                      : null;

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          isFromSelf ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`relative max-w-md p-4 sm:p-5 rounded-3xl transition-all duration-700 shadow-sm border ${
                            isFromSelf
                              ? 'bg-resonance-100/70 border-resonance-300/80 text-ink-900 rounded-tr-sm'
                              : isRead
                                ? 'bg-cream-50/90 border-resonance-300/60 text-ink-800 rounded-tl-sm'
                                : 'bg-cream-50 border-resonance-500/80 text-ink-900 rounded-tl-sm shadow-light-soft'
                          }`}
                          style={{
                            opacity: remainingSec !== null ? Math.max(0.25, remainingSec / 45) : 1,
                            filter:
                              remainingSec !== null && remainingSec < 10
                                ? `blur(${Math.max(0, (10 - remainingSec) * 0.4)}px)`
                                : 'none',
                          }}
                        >
                          <p className="font-serif text-base sm:text-lg font-light leading-relaxed">
                            “{msg.text}”
                          </p>

                          {/* Message Metadata & Ephemeral Countdown */}
                          <div className="flex items-center justify-between gap-3 text-[10px] text-ink-400 mt-3 pt-2 border-t border-resonance-200/40">
                            <span>
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>

                            {!isFromSelf && (
                              <div className="flex items-center space-x-1">
                                {!isRead ? (
                                  <button
                                    type="button"
                                    onClick={() => markMessageRead(msg.id)}
                                    className="px-2 py-0.5 bg-resonance-500 text-cream-50 rounded-full font-medium hover:bg-resonance-600 transition-colors flex items-center space-x-1"
                                  >
                                    <Eye className="w-2.5 h-2.5" />
                                    <span>Read Letter</span>
                                  </button>
                                ) : (
                                  <span className="text-resonance-700 font-mono font-medium flex items-center space-x-1">
                                    <Clock className="w-2.5 h-2.5" />
                                    <span>Dissolving in {remainingSec}s</span>
                                  </span>
                                )}
                              </div>
                            )}

                            {isFromSelf && (
                              <span className="italic text-ink-400">
                                Cast to {selectedUser.displayName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Compose Box */}
              <form
                onSubmit={handleSend}
                className="p-4 border-t border-resonance-200/50 bg-cream-50/70"
              >
                <div className="relative rounded-2xl bg-cream-100 border border-resonance-300/60 focus-within:border-resonance-500 focus-within:ring-2 focus-within:ring-resonance-200/40 p-2.5 shadow-inner">
                  <textarea
                    rows={2}
                    value={messageText}
                    onChange={(e) =>
                      setMessageText(e.target.value.slice(0, MAX_MSG_CHARS))
                    }
                    placeholder={`Compose an unhurried note to ${selectedUser.displayName}...`}
                    className="w-full bg-transparent border-0 resize-none font-serif text-base text-ink-900 placeholder:text-ink-400 focus:outline-none leading-relaxed"
                  />
                  <div className="flex items-center justify-between pt-1 border-t border-resonance-200/40 text-[11px] text-ink-400">
                    <span className="italic">
                      Ephemeral · Will dissolve after reading
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono">
                        {MAX_MSG_CHARS - messageText.length} left
                      </span>
                      <button
                        type="submit"
                        disabled={!messageText.trim() || isSending}
                        className={`p-1.5 rounded-full transition-all ${
                          messageText.trim() && !isSending
                            ? 'bg-resonance-500 text-cream-50 hover:bg-resonance-600 shadow-sm'
                            : 'bg-ink-300/40 text-cream-50/70 cursor-not-allowed'
                        }`}
                        aria-label="Send Slow Letter"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-ink-500">
              <AlertCircle className="w-8 h-8 text-resonance-400 mb-2" />
              <h4 className="font-serif text-lg text-ink-800">
                Select a Constellation Connection
              </h4>
              <p className="text-xs font-light max-w-sm mt-1">
                Slow Threads are only shared with souls in your mutual Constellation.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
