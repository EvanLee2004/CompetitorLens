import React, { useState } from 'react';
import { AnalysisStatus } from '../types';

interface InputSectionProps {
  onAnalyze: (text: string) => void;
  status: AnalysisStatus;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, status }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAnalyze(inputValue);
  };

  const isLoading = status === AnalysisStatus.FETCHING || status === AnalysisStatus.ANALYZING;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-xl shadow-xl shadow-indigo-500/10 border border-white/60 overflow-hidden ring-1 ring-indigo-50">
      {/* Header - Compact */}
      <div className="bg-gradient-to-r from-slate-50 to-indigo-50/30 border-b border-slate-100 px-5 py-3 flex items-center justify-between">
         <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-600 rounded text-white shadow-md shadow-indigo-600/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-base tracking-tight">智能 URL 深度分析</h3>
            </div>
         </div>
         <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
            <span className="w-1 h-1 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
            100% 成功率
         </span>
      </div>

      <form onSubmit={handleSubmit} className="p-5">
        <div className="mb-4 relative group">
          <label htmlFor="input" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">
            输入分析目标
          </label>
          <div className="relative">
            <textarea
              id="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="请粘贴商品链接 URL 或 页面文本内容..."
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none min-h-[120px] text-sm font-medium text-slate-900 placeholder:text-slate-400 leading-relaxed resize-none shadow-inner"
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3 flex gap-1.5">
               <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-100 px-1.5 py-0.5 rounded">TEXT / URL</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !inputValue}
          className={`w-full py-3 px-4 rounded-lg text-white font-bold text-sm shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center gap-2
            ${isLoading || !inputValue 
              ? 'bg-slate-300 cursor-not-allowed transform-none shadow-none' 
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:to-indigo-600 hover:-translate-y-0.5'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white/90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>深度解析中...</span>
            </>
          ) : (
            <>
              <span>开始分析</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputSection;