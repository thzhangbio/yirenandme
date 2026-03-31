import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// Configure marked to support GitHub Flavored Markdown and line breaks
marked.setOptions({
  gfm: true,
  breaks: true,
});

export interface ChatMessage {
  role: 'user' | 'ai';
  contentHtml: string;
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
}

// 递归获取目录下所有的 .md 文件
function getAllMdFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) {
    return arrayOfFiles;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMdFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.md')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

export function getChatSessions(): ChatSession[] {
  const postsDir = path.join(process.cwd(), 'post');
  const mdFiles = getAllMdFiles(postsDir);

  const sessions = mdFiles.map(filePath => {
    const fileName = path.basename(filePath);
    // Parse filename: "20260331-1 我又来汇报进度了亦仁老大.md"
    const match = fileName.match(/^(\d{8}-\d+)\s+(.+)\.md$/);
    if (!match) return null;

    const id = match[1];
    const title = match[2];
    const dateStr = id.split('-')[0];
    const date = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;

    const content = fs.readFileSync(filePath, 'utf-8');
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
        messages.push({ 
          role: currentRole, 
          contentHtml: marked.parse(currentContent.join('\n').trim()) as string
        });
      }
      currentRole = 'user';
      currentContent = [];
    } else if (line.trim() === '答：') {
      if (currentRole && currentContent.length > 0) {
        messages.push({ 
          role: currentRole, 
          contentHtml: marked.parse(currentContent.join('\n').trim()) as string
        });
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
    messages.push({ 
      role: currentRole, 
      contentHtml: marked.parse(currentContent.join('\n').trim()) as string
    });
  }

  return messages;
}