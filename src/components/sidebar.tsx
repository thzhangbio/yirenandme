'use client';

import { useState } from 'react';
import { ChatSession } from '@/lib/parse-md';
import { useQueryState } from 'nuqs';
import { MessageSquarePlus, X } from 'lucide-react';
import clsx from 'clsx';
import { imgYiren, imgTianhui } from '@/lib/images';

export function Sidebar({ sessions }: { sessions: ChatSession[] }) {
  const [selectedId, setSelectedId] = useQueryState('id');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
      <div className="w-full md:w-80 bg-white border-r border-gray-100 flex flex-col h-full shrink-0">
        <div className="p-6 pb-2 flex flex-col items-center">
          {/* Profile Card */}
          <div className="bg-[#f9fafb] rounded-2xl p-6 flex flex-col items-center text-center w-full mb-6">
            <div className="w-20 h-20 bg-[#d24b35] rounded-full flex flex-col items-center justify-center text-white relative mb-4 shadow-sm">
              <span className="text-lg font-medium tracking-widest">亦仁</span>
              <div className="absolute -bottom-1 w-7 h-7 bg-[#e6b85c] rounded-full flex items-center justify-center text-[#d24b35] font-bold text-xs border-2 border-white shadow-sm">
                生
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-3">AI 亦仁</h1>
            <p className="text-xs text-gray-500 leading-relaxed px-1">
              生财有术社区创始人，多年创业经验，专注于帮助普通人发现赚钱机会和提升赚钱能力。
            </p>
          </div>

          {/* New Chat Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-white border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 text-gray-800 font-medium hover:bg-gray-50 transition-colors shadow-sm mb-2"
          >
            <MessageSquarePlus className="w-5 h-5 text-blue-500" />
            向AI亦仁提问
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">更多互动</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Column 1: AI Yiren */}
                <div className="flex flex-col items-center space-y-4">
                  <h4 className="text-base font-medium text-gray-800 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full">
                    向AI亦仁提问
                  </h4>
                  <div className="w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                    <img 
                      src={imgYiren} 
                      alt="向AI亦仁提问" 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    扫码免费体验三天生财有术
                  </p>
                </div>

                {/* Column 2: Tianhui */}
                <div className="flex flex-col items-center space-y-4">
                  <h4 className="text-base font-medium text-gray-800 bg-green-50 text-green-700 px-4 py-1.5 rounded-full">
                    联系我（天辉）
                  </h4>
                  <div className="w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                    <img 
                      src={imgTianhui} 
                      alt="联系我（天辉）" 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    扫码添加我的微信
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}