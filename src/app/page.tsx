import { getChatSessions } from '@/lib/parse-md';
import { Sidebar } from '@/components/sidebar';
import { ChatArea } from '@/components/chat-area';
import { Suspense } from 'react';

export default function Home() {
  const sessions = getChatSessions();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Suspense fallback={<div className="w-80 border-r border-gray-200 bg-white" />}>
        <Sidebar sessions={sessions} />
      </Suspense>
      <div className="flex-1 flex flex-col min-w-0">
        <Suspense fallback={<div className="flex-1 flex items-center justify-center">加载中...</div>}>
          <ChatArea sessions={sessions} />
        </Suspense>
      </div>
    </div>
  );
}