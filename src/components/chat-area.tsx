'use client';

import { ChatSession } from '@/lib/parse-md';
import { useQueryState } from 'nuqs';
import clsx from 'clsx';

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
      <div className="h-14 border-b border-gray-200 bg-[#f5f5f5] flex items-center justify-between px-6 shadow-sm z-10 shrink-0 relative">
        {/* On mobile, leave space for the hamburger menu (w-14) */}
        <h1 className="text-lg font-medium text-gray-800 md:ml-0 ml-10 truncate">{activeSession.title}</h1>
        
        {/* Share Button */}
        <button
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.set('id', activeSession.id);
            navigator.clipboard.writeText(url.toString());
            alert('链接已复制到剪贴板！');
          }}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex-shrink-0 ml-2"
          title="分享此对话"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </button>
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
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 z-10',
                  isUser ? 'bg-[#475569] text-white' : 'bg-[#d24b35] text-white'
                )}
              >
                {isUser ? <span className="font-bold text-sm">天辉</span> : <span className="font-bold text-sm">亦仁</span>}
              </div>

              {/* Bubble Container */}
              <div className="relative max-w-[85%] md:max-w-[80%] flex">
                {/* Tail/Triangle */}
                <div 
                  className={clsx(
                    'absolute top-4 w-0 h-0 border-[6px] border-transparent',
                    isUser 
                      ? 'right-[-10px] border-l-[#95ec69]' 
                      : 'left-[-10px] border-r-white'
                  )}
                />
                
                {/* Bubble Content */}
                <div
                  className={clsx(
                    'px-4 md:px-5 py-3 rounded-lg shadow-sm w-full',
                    isUser
                      ? 'bg-[#95ec69] text-gray-900'
                      : 'bg-white text-gray-900 border border-gray-100'
                  )}
                >
                  <div
                    className={clsx(
                      'prose prose-sm max-w-none break-words',
                      isUser ? 'prose-gray' : 'prose-gray prose-p:leading-relaxed prose-pre:bg-gray-100 prose-pre:text-gray-800'
                    )}
                    dangerouslySetInnerHTML={{ __html: msg.contentHtml }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}