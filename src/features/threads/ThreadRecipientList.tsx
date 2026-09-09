import React from 'react';
import { Feather } from 'lucide-react';
import { ConstellationEntry, User, SlowMessage } from '../../types';
import { AbstractAvatar } from '../../components/AbstractAvatar';

interface ThreadRecipientListProps {
  constellation: ConstellationEntry[];
  selectedUser: User | null;
  slowMessages: SlowMessage[];
  onSelectUser: (user: User) => void;
}

export const ThreadRecipientList: React.FC<ThreadRecipientListProps> = React.memo(({
  constellation,
  selectedUser,
  slowMessages,
  onSelectUser,
}) => {
  return (
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
                onClick={() => onSelectUser(user)}
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
  );
});

ThreadRecipientList.displayName = 'ThreadRecipientList';
