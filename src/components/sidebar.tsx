'use client';

import { ChatSession } from '@/lib/parse-md';
import { useQueryState } from 'nuqs';
import { MessageSquare } from 'lucide-react';
import clsx from 'clsx';

export function Sidebar({ sessions }: { sessions: ChatSession[] }) {
  const [selectedId, setSelectedId] = useQueryState('id');

  // Default to the first session if none is selected
  const activeId = selectedId || (sessions.length > 0 ? sessions[0].id : null);

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-gray-200 bg-gray-50/50">
        <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          对话记录
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => setSelectedId(session.id)}
            className={clsx(
              'w-full text-left p-3 rounded-xl transition-all duration-200 flex flex-col gap-1.5',
              activeId === session.id
                ? 'bg-blue-50 border-blue-200 shadow-sm'
                : 'hover:bg-gray-50 border-transparent'
            )}
            style={{ borderWidth: '1px' }}
          >
            <div className="flex justify-between items-center w-full">
              <span className={clsx(
                "text-sm font-medium truncate pr-2",
                activeId === session.id ? "text-blue-900" : "text-gray-700"
              )}>
                {session.title}
              </span>
            </div>
            <span className={clsx(
              "text-xs",
              activeId === session.id ? "text-blue-600/80" : "text-gray-400"
            )}>
              {session.date}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}