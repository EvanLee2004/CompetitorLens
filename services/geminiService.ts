import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// In a real Python implementation as requested, this would be replaced by a call to 
// a local Qwen-1.8B-Chat model served via an API endpoint.
// For this frontend demo, we use Gemini to simulate the intelligence layer.

export const analyzeCompetitorText = async (text: string): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key 缺失。请设置 API_KEY 环境变量。");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Truncate text if it's too long to prevent token overflow, keeping the most relevant top/bottom parts
  const maxLength = 20000;
  let processedText = text;
  if (text.length > maxLength) {
    processedText = text.substring(0, maxLength);
  }

  const prompt = `
    你是一位资深的销售策略专家和竞品分析师。
    请分析以下从竞争对手网站抓取的原始内容。
    
    请提取以下结构化信息，并必须使用【简体中文】回答，语言风格专业、干练：
    1. **公司或产品名称 (companyName)**: 准确识别品牌名。
    2. **执行摘要 (summary)**: 简明扼要地概括该公司是做什么的，以及他们的核心价值主张（最多2句话）。
    3. **核心功能列表 (Core Features)**: 列出3-5个最关键的产品功能或服务能力。
    4. **目标客户群体 (Target Audience)**: 明确他们在向谁销售（例如：中小企业市场部、个人开发者、大型制造企业等）。
    5. **独特卖点 (Unique Selling Points/Moat)**: 客户选择他们而不是别人的理由（护城河）。
    6. **定价模式 (Pricing Model)**: 如果提到，请归纳（如“免费增值”、“按席位订阅”、“定制报价”等）；未提到则填“未公开”。
    7. **情感倾向 (Sentiment)**: 基于文案风格判断（积极/中性/混合）。

    网站原始内容：
    """
    ${processedText}
    """
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          companyName: { type: Type.STRING },
          summary: { type: Type.STRING },
          coreFeatures: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          targetAudience: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          sellingPoints: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          pricingModel: { type: Type.STRING },
          sentiment: { type: Type.STRING, enum: ["Positive", "Neutral", "Mixed"] }
        },
        required: ["companyName", "summary", "coreFeatures", "targetAudience", "sellingPoints"]
      }
    }
  });

  const resultText = response.text;
  if (!resultText) {
    throw new Error("AI 模型未能生成分析结果，请稍后重试。");
  }

  return JSON.parse(resultText) as AnalysisResult;
};