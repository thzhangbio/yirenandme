'use client';

import { ChatSession } from '@/lib/parse-md';
import { useQueryState } from 'nuqs';
import clsx from 'clsx';
import { User } from 'lucide-react';

export function ChatArea({ sessions }: { sessions: ChatSession[] }) {
  const [selectedId] = useQueryState('id');
  const activeSession = sessions.find((s) => s.id === selectedId) || sessions[0];

  if (!activeSession) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        暂无对话记录
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f5f5f5]">
      {/* Header */}
      <div className="h-14 border-b border-gray-200 bg-[#f5f5f5] flex items-center px-6 shadow-sm z-10 shrink-0 relative">
        {/* On mobile, leave space for the hamburger menu (w-14) */}
        <h2 className="text-lg font-medium text-gray-800 md:ml-0 ml-10 truncate">{activeSession.title}</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {activeSession.messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={idx}
              className={clsx(
                'flex gap-3 max-w-4xl mx-auto w-full',
                isUser ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {/* Avatar */}
              <div
                className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1',
                  isUser ? 'bg-blue-500 text-white' : 'bg-[#d24b35] text-white'
                )}
              >
                {isUser ? <User size={20} /> : <span className="font-bold text-sm">亦仁</span>}
              </div>

              {/* Bubble */}
              <div
                className={clsx(
                  'px-4 md:px-5 py-3 rounded-2xl max-w-[85%] md:max-w-[80%] shadow-sm',
                  isUser
                    ? 'bg-blue-500 text-white rounded-tr-sm'
                    : 'bg-white text-gray-900 rounded-tl-sm border border-gray-100'
                )}
              >
                <div
                  className={clsx(
                    'prose prose-sm max-w-none break-words',
                    isUser ? 'prose-invert' : 'prose-gray prose-p:leading-relaxed prose-pre:bg-gray-100 prose-pre:text-gray-800'
                  )}
                  dangerouslySetInnerHTML={{ __html: msg.contentHtml }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}