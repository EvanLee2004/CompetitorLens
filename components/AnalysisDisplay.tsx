import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisDisplayProps {
  result: AnalysisResult;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result }) => {
  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{result.companyName}</h2>
            <p className="text-slate-500 text-sm mt-1">竞品分析报告 (由 Qwen/Gemini 驱动)</p>
          </div>
          {result.pricingModel && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
              定价: {result.pricingModel}
            </span>
          )}
        </div>
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">执行摘要</h3>
          <p className="text-slate-700 leading-relaxed text-justify">{result.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Features */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800">核心功能</h3>
          </div>
          <ul className="space-y-3 flex-1">
            {result.coreFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Target Audience */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800">目标客户</h3>
          </div>
          <ul className="space-y-3 flex-1">
            {result.targetAudience.map((audience, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                <span>{audience}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Selling Points (USP) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full ring-2 ring-indigo-50 ring-offset-2 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800">独特卖点 (USP)</h3>
          </div>
          <ul className="space-y-3 flex-1">
            {result.sellingPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span className="font-medium text-slate-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;