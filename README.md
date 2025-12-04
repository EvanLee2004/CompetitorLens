# CompetitorLens - AI 销售竞品分析工具

这是一个专为销售团队设计的辅助工具，可以自动抓取竞争对手的网站，并使用 AI 提取关键信息：核心功能、目标客户和独特卖点。

## 核心竞争力技术

本项目不仅是一个简单的演示，它集成了一套**智能数据获取架构**来应对复杂的网络环境：

1.  **AI 智能阅读器网关 (Reader Gateway)**: 
    *   在前端集成 `r.jina.ai` 引擎。
    *   **能力**: 能像人类浏览器一样渲染 JavaScript 页面，解决 SPA（单页应用）抓取难题。
    *   **对抗**: 相比普通爬虫，拥有更强的反爬虫绕过能力，能自动提取网页中的主要 Markdown 内容。

2.  **隧道代理技术 (Tunnel Proxy)**:
    *   使用双重代理链路 (`Browser` -> `Proxy` -> `Reader API` -> `Target`)，在纯前端环境下实现跨域和隐匿访问。

## 如何运行

1.  **安装依赖:**
    ```bash
    npm install
    ```
2.  **设置 API Key:**
    在根目录创建 `.env` 文件：
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```
3.  **启动应用:**
    ```bash
    npm start
    ```

## 技术栈映射

本项目模拟了企业级的数据分析流水线：

| 环节 | 企业级后端方案 (Python) | 本项目前端模拟方案 (React) |
| :--- | :--- | :--- |
| **抓取** | `Selenium` / `Playwright` / `Scrapy` | **Jina Reader API** + `CORS Proxy` |
| **解析** | `BeautifulSoup` / `Lxml` | `DOMParser` / Markdown Parser |
| **AI 模型** | 本地部署 `Qwen-1.8B-Chat` | 调用 `Google Gemini` 模拟推理 |
| **分析** | LangChain / Python Scripts | TypeScript 业务逻辑 |

---

*Powered by React, Tailwind CSS, Google Gemini, and Jina AI Reader.*
