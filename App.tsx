import React, { useState } from 'react';
import InputSection from './components/InputSection';
import AnalysisDisplay from './components/AnalysisDisplay';
import { AnalysisResult, AnalysisStatus } from './types';
import { analyzeCompetitorText } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simplified handler: only deals with text analysis now
  const handleAnalyze = async (text: string) => {
    setStatus(AnalysisStatus.ANALYZING);
    setError(null);
    setResult(null);

    try {
      // Direct analysis without scraping attempt
      const analysis = await analyzeCompetitorText(text);
      setResult(analysis);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "分析过程中发生意外错误。");
      setStatus(AnalysisStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col relative overflow-hidden font-sans">
      {/* Tech Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900 via-indigo-800 to-transparent opacity-10 pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      {/* Navbar */}
      <header className="bg-white/70 backdrop-blur-md border-b border-white/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
              C
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Competitor<span className="text-indigo-600">Lens</span> <span className="text-[10px] align-top text-slate-400 font-normal ml-1 border border-slate-200 px-1 rounded">PRO</span></h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
               System Online
             </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full z-0">
        
        {/* Hero Section */}
        {status === AnalysisStatus.IDLE && (
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold border border-indigo-100 mb-6 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Enterprise Intelligence
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              秒级解读<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">全网竞争对手</span>
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              专为高防网站（如 Amazon、淘宝）优化。利用 Qwen/Gemini 大模型内核，自动提取核心功能、目标客户群及独特卖点。
            </p>
          </div>
        )}

        {/* Input Section */}
        <div className={`transition-all duration-700 ease-in-out ${result ? 'mb-8 translate-y-0' : 'mb-0 translate-y-0'}`}>
          <InputSection 
            onAnalyze={handleAnalyze} 
            status={status}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mt-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-700 animate-shake shadow-lg">
            <div className="p-2 bg-red-100 rounded-full shrink-0">
               <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="flex-1 py-1">
              <h4 className="font-bold text-sm">分析中断</h4>
              <p className="text-sm mt-1 opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <AnalysisDisplay result={result} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/50 backdrop-blur py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CompetitorLens AI. Enterprise Edition.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;