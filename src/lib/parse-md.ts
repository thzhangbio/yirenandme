import fs from 'fs';
import path from 'path';

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
}

export function getChatSessions(): ChatSession[] {
  const rootDir = process.cwd();
  const files = fs.readdirSync(rootDir).filter(file => file.endsWith('.md') && file !== 'README.md');

  const sessions = files.map(file => {
    // Parse filename: "20260331-1 我又来汇报进度了亦仁老大.md"
    const match = file.match(/^(\d{8}-\d+)\s+(.+)\.md$/);
    if (!match) return null;

    const id = match[1];
    const title = match[2];
    const dateStr = id.split('-')[0];
    const date = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;

    const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
    const messages = parseMessages(content);

    return { id, title, date, messages };
  }).filter(Boolean) as ChatSession[];

  // Sort by id descending (time descending)
  return sessions.sort((a, b) => b.id.localeCompare(a.id));
}

function parseMessages(content: string): ChatMessage[] {
  const messages: ChatMessage[] = [];
  
  const lines = content.split('\n');
  let currentRole: 'user' | 'ai' | null = null;
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.trim() === '问：') {
      if (currentRole && currentContent.length > 0) {
        messages.push({ role: currentRole, content: currentContent.join('\n').trim() });
      }
      currentRole = 'user';
      currentContent = [];
    } else if (line.trim() === '答：') {
      if (currentRole && currentContent.length > 0) {
        messages.push({ role: currentRole, content: currentContent.join('\n').trim() });
      }
      currentRole = 'ai';
      currentContent = [];
    } else {
      if (currentRole) {
        currentContent.push(line);
      }
    }
  }

  if (currentRole && currentContent.length > 0) {
    messages.push({ role: currentRole, content: currentContent.join('\n').trim() });
  }

  return messages;
}