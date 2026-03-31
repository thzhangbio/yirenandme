import { getChatSessions } from '@/lib/parse-md';
import { Sidebar } from '@/components/sidebar';
import { ChatArea } from '@/components/chat-area';
import { Suspense } from 'react';
import { MobileLayout } from '@/components/mobile-layout';

export default function Home() {
  const sessions = getChatSessions();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Suspense fallback={<div className="w-80 border-r border-gray-200 bg-white hidden md:block" />}>
        <MobileLayout sessions={sessions}>
          <Sidebar sessions={sessions} />
          <ChatArea sessions={sessions} />
        </MobileLayout>
      </Suspense>
    </div>
  );
}