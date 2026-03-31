# AI 亦仁对话展示 (yirenandme)

🌐 **在线预览**: [https://yiren.tianhui.me/](https://yiren.tianhui.me/)

## 项目简介

这是一个极简的静态网站项目，专门用于展示“天辉”与“AI 亦仁”的对话记录。
项目采用了类似微信聊天界面的 UI 设计，旨在提供最清爽、最易读的对话阅读体验。

### 核心特点

*   **极简架构**：没有数据库，没有复杂的后端 API。所有数据直接读取本地的 Markdown 文件。
*   **极致性能**：
    *   采用 Next.js 服务端渲染 (SSG)，Markdown 解析在构建时完成，客户端零解析负担。
    *   开启 Critical CSS 优化，移除无效 Polyfill，移动端加载速度极快。
    *   PageSpeed 性能跑分极高。
*   **完美还原 UI**：
    *   仿微信聊天气泡设计，带有指向性“小角角”。
    *   左侧边栏按日期自动归类对话。
    *   响应式设计，完美适配桌面端和移动端（移动端支持抽屉式侧边栏）。
*   **易于维护**：只需要往 `post/` 文件夹中丢入符合格式的 `.md` 文件，网站就会自动更新内容并按时间倒序排列。

## 技术栈

*   **框架**: [Next.js](https://nextjs.org/) (App Router, SSG)
*   **UI 库**: [React](https://react.dev/)
*   **样式**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Markdown 解析**: [marked](https://marked.js.org/) (服务端构建时解析)
*   **状态管理**: [nuqs](https://nuqs.47ng.com/) (基于 URL 的状态管理)
*   **图标**: [Lucide React](https://lucide.dev/)

## 如何添加新的对话？

1. 在项目的 `post/` 文件夹（或其任意子文件夹）内新建一个 Markdown 文件。
2. 文件命名格式必须为：`YYYYMMDD-序号 标题.md`（例如：`20260401-1 我今天做了个新功能.md`）。
3. 文件内容严格按照以下格式编写（可参考根目录的 `TEMPLATE.md`）：

```markdown
问：
[这里填写天辉的问题内容，支持多段落...]

答：
[这里填写AI亦仁的回答内容，支持 Markdown 格式，如加粗、列表等...]
```

## 本地运行与部署

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器 (http://localhost:3000)
npm run dev
```

### 生产环境构建测试

为了体验真实的加载速度，建议在本地进行生产构建：

```bash
# 构建静态页面
npm run build

# 启动生产服务器
npm run start
```

### 部署

本项目非常适合部署在 [Vercel](https://vercel.com/) 上。由于是纯静态生成，部署后几乎不需要任何服务器资源。直接将 GitHub 仓库关联到 Vercel 即可实现自动化部署。