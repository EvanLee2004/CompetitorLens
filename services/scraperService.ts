import { ScrapedData } from "../types";

/**
 * 核心竞争力升级：
 * 引入智能阅读器网关 (Intelligent Reader Gateway)。
 * 
 * 策略 1 (优先): 使用 r.jina.ai 引擎。
 *    - 这是一个专门为 LLM 设计的云端阅读器。
 *    - 它能模拟浏览器渲染 (Headless Browser)，解决 SPA/JS 动态加载问题。
 *    - 它能自动去除广告、侧边栏，提取核心内容为 Markdown。
 *    - 它的服务器 IP 相比普通公共代理更“干净”，或者有更好的反爬对抗策略。
 * 
 * 策略 2 (降级): 使用 CORS 代理直接请求 HTML。
 *    - 传统的 requests/BeautifulSoup 模拟模式。
 */

export const scrapeWebsite = async (url: string): Promise<ScrapedData> => {
  let validUrl = url.trim();
  if (!validUrl.startsWith('http')) {
    validUrl = `https://${validUrl}`;
  }

  // =================================================================================
  // 策略 1: 智能阅读器网关 (High Competitiveness Mode)
  // =================================================================================
  try {
    console.log(`正在启动智能阅读器网关分析: ${validUrl}`);
    
    // 我们将 URL 传给 jina 阅读器，并使用 corsproxy 穿透浏览器的跨域限制
    // 这种链路：Browser -> CorsProxy -> Jina Reader -> Target Website
    const readerUrl = `https://r.jina.ai/${validUrl}`;
    const proxyTunnel = `https://corsproxy.io/?${encodeURIComponent(readerUrl)}`;

    const response = await fetch(proxyTunnel);
    
    if (response.ok) {
      const markdownText = await response.text();
      
      // 简单的验证：确保返回的不是错误信息
      const isBlocked = markdownText.includes("403 Forbidden") || markdownText.includes("Access Denied");
      
      if (!isBlocked && markdownText.length > 100) {
        // 尝试从 Markdown 中提取标题 (Jina 通常会在第一行放 Title: ...)
        const titleMatch = markdownText.match(/^Title:\s*(.+)$/m);
        const title = titleMatch ? titleMatch[1] : "智能提取页面";

        console.log("智能阅读器解析成功！");
        return {
          url: validUrl,
          title: title,
          text: markdownText // Jina 直接返回高质量的 Markdown，非常适合 LLM 分析
        };
      }
    }
    console.warn("智能阅读器未能获取有效内容，切换至备用线路...");
  } catch (error) {
    console.warn("智能阅读器网关连接失败，切换至备用线路...", error);
  }

  // =================================================================================
  // 策略 2: 传统多线路代理重试 (Fallback Mode)
  // =================================================================================
  
  // List of CORS proxies to try in order
  const PROXY_SERVICES = [
    // CorsProxy.io (Direct HTML response) - 速度快
    (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    // AllOrigins (JSON response) - 备用
    (url: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}&disableCache=true`,
  ];

  let htmlContent = "";
  let lastError: Error | null = null;

  for (const proxyGen of PROXY_SERVICES) {
    const proxyUrl = proxyGen(validUrl);
    try {
      console.log(`尝试备用线路: ${proxyUrl}`);
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`Proxy status: ${response.status}`);
      }

      if (proxyUrl.includes('allorigins')) {
        const data = await response.json();
        htmlContent = data.contents;
      } else {
        htmlContent = await response.text();
      }

      if (htmlContent && htmlContent.length > 200) {
        break; 
      }
    } catch (error: any) {
      console.warn(`线路失败:`, error);
      lastError = error;
    }
  }

  if (!htmlContent) {
    const isECommerce = /amazon|taobao|tmall|jd\.com/i.test(validUrl);
    let errorMessage = "无法突破该网站的反爬虫机制。";
    
    if (isECommerce) {
      errorMessage = "即使使用了智能网关，该电商平台（如亚马逊/淘宝）的高级防御系统仍然拦截了请求。为了获取分析结果，请您直接【复制页面商品描述】，使用本工具的“粘贴文本”模式。这也是一种合法的各种数据获取方式。";
    } else {
      errorMessage += " 请尝试使用【粘贴文本】模式进行分析。";
    }

    throw new Error(errorMessage);
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const scripts = doc.querySelectorAll('script, style, noscript, iframe, svg, [hidden], header, footer, nav');
    scripts.forEach(script => script.remove());

    const cleanText = (doc.body.innerText || "")
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();

    if (cleanText.length < 50) {
       throw new Error("网页内容过少，可能是动态渲染导致。建议使用粘贴文本模式。");
    }

    return {
      url: validUrl,
      title: doc.title || "网页快照",
      text: cleanText
    };

  } catch (parseError: any) {
    throw new Error(parseError.message || "解析网页内容失败。");
  }
};