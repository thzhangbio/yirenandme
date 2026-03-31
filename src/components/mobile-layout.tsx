'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { ChatSession } from '@/lib/parse-md';
import { Menu } from 'lucide-react';

export function MobileLayout({ 
  children,
  sessions
}: { 
  children: ReactNode[];
  sessions: ChatSession[];
}) {
  const [selectedId] = useQueryState('id');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when a selection is made on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [selectedId]);

  const [sidebar, chatArea] = children;

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full h-full">
        {sidebar}
        <div className="flex-1 flex flex-col min-w-0">
          {chatArea}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden w-full h-full relative">
        {/* Chat Area takes full width */}
        <div className="flex-1 flex flex-col min-w-0 w-full h-full">
          {/* Mobile Header with Hamburger */}
          <div className="absolute top-0 left-0 h-14 w-14 flex items-center justify-center z-20">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          {chatArea}
        </div>

        {/* Mobile Sidebar Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* Sidebar Content */}
            <div className="relative w-[85%] max-w-sm h-full bg-white shadow-xl flex flex-col">
              {sidebar}
            </div>
          </div>
        )}
      </div>
    </>
  );
}