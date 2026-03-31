'use client';

import { ChatSession } from '@/lib/parse-md';
import { useQueryState } from 'nuqs';
import { MessageSquarePlus } from 'lucide-react';
import clsx from 'clsx';

export function Sidebar({ sessions }: { sessions: ChatSession[] }) {
  const [selectedId, setSelectedId] = useQueryState('id');

  // Default to the first session if none is selected
  const activeId = selectedId || (sessions.length > 0 ? sessions[0].id : null);

  // Group sessions by date
  const groupedSessions = sessions.reduce((acc, session) => {
    const date = session.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {} as Record<string, ChatSession[]>);

  // Sort dates descending
  const sortedDates = Object.keys(groupedSessions).sort((a, b) => b.localeCompare(a));

  // Format date label (e.g., show "今天" if it's today)
  const formatDateLabel = (dateStr: string) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    if (dateStr === todayStr) {
      return '今天';
    }
    return dateStr;
  };

  return (
    <div className="w-80 bg-white border-r border-gray-100 flex flex-col h-full shrink-0">
      <div className="p-6 pb-2 flex flex-col items-center">
        {/* Profile Card */}
        <div className="bg-[#f9fafb] rounded-2xl p-6 flex flex-col items-center text-center w-full mb-6">
          <div className="w-20 h-20 bg-[#d24b35] rounded-full flex flex-col items-center justify-center text-white relative mb-4 shadow-sm">
            <span className="text-lg font-medium tracking-widest">亦仁</span>
            <div className="absolute -bottom-1 w-7 h-7 bg-[#e6b85c] rounded-full flex items-center justify-center text-[#d24b35] font-bold text-xs border-2 border-white shadow-sm">
              生
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">AI 亦仁</h2>
          <p className="text-xs text-gray-500 leading-relaxed px-1">
            生财有术社区创始人，多年创业经验，专注于帮助普通人发现赚钱机会和提升赚钱能力。
          </p>
        </div>

        {/* New Chat Button */}
        <button 
          onClick={() => {
            // In a real app, this would create a new chat. 
            // For this static viewer, we can just clear the selection or redirect to a "new" state.
            // Here we just keep it as a UI element as requested.
          }}
          className="w-full bg-white border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 text-gray-800 font-medium hover:bg-gray-50 transition-colors shadow-sm mb-2"
        >
          <MessageSquarePlus className="w-5 h-5" />
          开启新对话
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 pt-2 space-y-6">
        {sortedDates.map((date) => (
          <div key={date}>
            <h3 className="text-xs font-medium text-gray-400 mb-3 px-2">
              {formatDateLabel(date)}
            </h3>
            <div className="space-y-1">
              {groupedSessions[date].map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedId(session.id)}
                  className={clsx(
                    'w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 flex flex-col gap-1',
                    activeId === session.id
                      ? 'bg-[#f0f7ff] text-blue-900 font-medium'
                      : 'hover:bg-gray-50 text-gray-600 border-transparent'
                  )}
                >
                  <span className="text-sm truncate w-full block">
                    {session.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}