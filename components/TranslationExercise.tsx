
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { Sparkles, Loader2, RefreshCcw, CheckCircle2, AlertCircle, BookOpen, Key, Languages } from 'lucide-react';

interface Props {
  gemini: GeminiService | null;
}

export const TranslationExercise: React.FC<Props> = ({ gemini }) => {
  const [currentSentence, setCurrentSentence] = useState({ pl: "Ona zazwyczaj pije kawę rano.", en: "She usually drinks coffee in the morning." });
  const [userInput, setUserInput] = useState('');
  const [feedbackEn, setFeedbackEn] = useState<string | null>(null);
  const [feedbackPl, setFeedbackPl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatAIData = (text: string, isPolish: boolean = false) => {
    return text.split('\n').map((line, i) => {
      const cleanLine = line.replace(/[*#]/g, '').trim();
      if (!cleanLine) return <div key={i} className="h-2"></div>;
      
      const isPositive = cleanLine.toLowerCase().includes('well done') || cleanLine.toLowerCase().includes('brawo') || cleanLine.toLowerCase().includes('perfect') || cleanLine.toLowerCase().includes('correct');
      const isWarning = cleanLine.toLowerCase().includes('mistake') || cleanLine.toLowerCase().includes('error') || cleanLine.toLowerCase().includes('wrong') || cleanLine.toLowerCase().includes('błąd');
      const isHeader = cleanLine.length < 60 && cleanLine.includes(':');

      return (
        <div key={i} className={`flex items-start gap-2 py-1.5 px-4 rounded-xl transition-all ${isPositive ? 'bg-green-50 text-green-800' : isWarning ? 'bg-red-50 text-red-800' : ''}`}>
          {isPositive && <CheckCircle2 size={16} className="mt-1 shrink-0" />}
          {isWarning && <AlertCircle size={16} className="mt-1 shrink-0" />}
          {isHeader && !isPositive && !isWarning && <BookOpen size={16} className="mt-1 shrink-0 text-indigo-400" />}
          <p className={`${isHeader ? 'font-bold text-gray-900' : 'text-gray-700'} leading-relaxed text-sm lg:text-base`}>
            {cleanLine}
          </p>
        </div>
      );
    });
  };

  const handleAnalyze = async () => {
    setError(null);
    if (!userInput.trim()) return;
    
    if (!gemini) {
      setError("Nie ustawiono klucza API Gemini. Wejdź w ustawienia, aby go dodać.");
      return;
    }

    setIsLoading(true);
    setFeedbackEn(null);
    setFeedbackPl(null);
    
    try {
      const response = await gemini.analyzeTranslation(currentSentence.pl, currentSentence.en, userInput);
      setFeedbackEn(response);
    } catch (e: any) {
      setError("Analysis failed. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!feedbackEn || !gemini || isTranslating) return;
    setIsTranslating(true);
    try {
      const translated = await gemini.translateToPolish(feedbackEn);
      setFeedbackPl(translated);
    } catch (e) {
      setError("Translation failed.");
    } finally {
      setIsTranslating(false);
    }
  };

  const nextSentence = async () => {
    if (!gemini) {
      setError("Nie ustawiono klucza API Gemini. Wejdź w ustawienia, aby go dodać.");
      return;
    }
    setIsLoading(true);
    try {
      const newSentence = await gemini.generateSentence();
      setCurrentSentence(newSentence);
      setUserInput('');
      setFeedbackEn(null);
      setFeedbackPl(null);
      setError(null);
    } catch (e) {
      setError("Failed to generate new sentence.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <Sparkles className="absolute right-[-20px] top-[-20px] opacity-10 rotate-12" size={150} />
        <div className="relative z-10">
          <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-3">Translation Mastery</p>
          <h3 className="text-3xl font-extrabold leading-tight drop-shadow-sm">{currentSentence.pl}</h3>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 ring-1 ring-gray-50">
        <textarea 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your English translation here..."
          className="w-full h-40 p-6 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-3xl outline-none transition-all text-xl resize-none placeholder:text-gray-300 shadow-inner"
        />
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-2xl flex items-center gap-3 border border-red-100 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={20} className="shrink-0" />
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <button 
            onClick={nextSentence}
            className="flex items-center gap-2 px-8 py-4 text-gray-500 font-bold hover:bg-gray-100 rounded-2xl transition-all active:scale-95"
          >
            <RefreshCcw size={20} /> Next Sentence
          </button>
          
          <button 
            onClick={handleAnalyze}
            disabled={!userInput.trim() || isLoading}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5 rounded-2xl font-black shadow-2xl transition-all active:scale-95 disabled:opacity-30 disabled:shadow-none ${!gemini ? 'bg-gray-400 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'}`}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={22} />}
            Analyze in English
          </button>
        </div>
      </div>

      {feedbackEn && (
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-indigo-50 animate-in slide-in-from-bottom-10 duration-700 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="font-black text-2xl text-gray-900">Expert Feedback</h4>
                <p className="text-sm text-gray-400">English Analysis</p>
              </div>
            </div>
            
            {!feedbackPl && (
              <button 
                onClick={handleTranslate}
                disabled={isTranslating}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-all disabled:opacity-50"
              >
                {isTranslating ? <Loader2 className="animate-spin" size={18} /> : <Languages size={18} />}
                Tłumacz na polski
              </button>
            )}
          </div>

          <div className="space-y-3">
            {formatAIData(feedbackEn)}
          </div>

          {feedbackPl && (
            <div className="mt-12 pt-12 border-t-2 border-dashed border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Languages className="text-indigo-400" size={24} />
                <h5 className="font-black text-xl text-indigo-900">Tłumaczenie analizy</h5>
              </div>
              <div className="space-y-3 opacity-90">
                {formatAIData(feedbackPl, true)}
              </div>
            </div>
          )}
        </div>
      )}

      {!gemini && (
        <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-start gap-4">
          <Key className="text-indigo-600 shrink-0 mt-1" size={24} />
          <div>
            <p className="font-bold text-indigo-900 mb-1">API Key Required</p>
            <p className="text-sm text-indigo-700">Please add your Gemini API key in settings to enable AI analysis and translation.</p>
          </div>
        </div>
      )}
    </div>
  );
};
