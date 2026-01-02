
import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Info, 
  Zap,
  CheckCircle,
  Menu,
  PenTool,
  Printer,
  Smartphone,
  X,
  ExternalLink
} from 'lucide-react';
import { GRAMMAR_SECTIONS } from './data/grammarData';
import { UserProgress } from './types';
import { GeminiService } from './services/geminiService';
import { InfoModal } from './components/InfoModal';
import { ChatWidget } from './components/ChatWidget';
import { QuizSection } from './components/QuizSection';
import { FlashcardSection } from './components/FlashcardSection';
import { IrregularVerbsView } from './components/IrregularVerbsView';
import { TranslationExercise } from './components/TranslationExercise';

type Tab = 'theory' | 'quiz' | 'flashcards' | 'translation';

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(GRAMMAR_SECTIONS[0].id);
  const [activeTab, setActiveTab] = useState<Tab>('theory');
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isIframe, setIsIframe] = useState(false);
  
  const [progress, setProgress] = useState<UserProgress>({
    completedSections: JSON.parse(localStorage.getItem('completed_sections') || '[]'),
    quizScores: JSON.parse(localStorage.getItem('quiz_scores') || '{}'),
    dailyStreak: 0
  });

  // Service initialized with permanent API key from process.env.API_KEY
  const gemini = useMemo(() => new GeminiService(), []);
  const activeSection = GRAMMAR_SECTIONS.find(s => s.id === activeSectionId) || GRAMMAR_SECTIONS[0];

  useEffect(() => {
    // Detect if app is running inside the AI Studio editor iframe
    setIsIframe(window.self !== window.top);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    setIsSidebarOpen(false);
    if (activeSectionId !== 'global-translation') {
       if (activeTab === 'translation') setActiveTab('theory');
    }
    window.scrollTo(0, 0);
  }, [activeSectionId]);

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col lg:flex-row print:bg-white overflow-x-hidden">
      {/* Sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl border-r border-gray-100 transform lg:translate-x-0 transition-transform duration-500 ease-out print:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-8 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                <Zap size={28} fill="white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-indigo-700 to-purple-800">GrammarGuru</h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-xl">
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-6 space-y-2 no-scrollbar">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4 mt-2 px-2">AI Mastery</p>
            <button 
              onClick={() => { setActiveSectionId('global-translation'); setActiveTab('translation'); }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all duration-300 ${activeSectionId === 'global-translation' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]' : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}`}
            >
              <PenTool size={20} /> Wyzwanie Tłumacza
            </button>

            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4 mt-8 px-2">Podręcznik</p>
            <div className="space-y-1">
              {GRAMMAR_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all group ${
                    activeSectionId === section.id 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm border-l-4 border-indigo-600' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {progress.completedSections.includes(section.id) ? (
                      <CheckCircle size={18} className="text-green-500" />
                    ) : (
                      <div className={`w-2 h-2 rounded-full ${activeSectionId === section.id ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                    )}
                    <span>{section.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </nav>

          <div className="p-6 border-t border-gray-50 space-y-3">
            <button onClick={() => setShowInfo(true)} className="w-full flex items-center gap-3 p-4 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-2xl transition-all">
              <Smartphone size={20} /> Instrukcja PWA
            </button>
            <button onClick={handlePrint} className="w-full flex items-center gap-3 p-4 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-all">
              <Printer size={20} /> Drukuj lekcję (PDF)
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 min-h-screen flex flex-col relative">
        {isIframe && (
          <div className="bg-indigo-600 text-white px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-4 print:hidden">
            <span>Widok wewnątrz edytora. Aby zainstalować PWA, otwórz aplikację osobno:</span>
            <button 
              onClick={() => window.open(window.location.href, '_blank')}
              className="bg-white text-indigo-600 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-indigo-50 transition-colors"
            >
              <ExternalLink size={12} /> Otwórz Standalone
            </button>
          </div>
        )}

        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 p-6 flex justify-between items-center px-8 print:hidden">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-gray-50 text-indigo-600 hover:bg-indigo-100 rounded-2xl transition-colors">
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-xl font-black text-gray-900">{activeSectionId === 'global-translation' ? 'Wyzwanie Tłumacza' : activeSection.title}</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Moduł Nauki GrammarGuru</p>
            </div>
          </div>
          <button onClick={() => setShowInfo(true)} className="w-12 h-12 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl flex items-center justify-center transition-all">
            <Info size={22} />
          </button>
        </header>

        {activeSectionId !== 'global-translation' && (
          <div className="bg-white border-b border-gray-50 px-8 sticky top-[89px] z-30 print:hidden overflow-x-auto no-scrollbar">
            <div className="flex gap-10">
              <button onClick={() => setActiveTab('theory')} className={`py-5 text-sm font-black whitespace-nowrap transition-all border-b-4 ${activeTab === 'theory' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>TEORIA</button>
              <button onClick={() => setActiveTab('quiz')} className={`py-5 text-sm font-black whitespace-nowrap transition-all border-b-4 ${activeTab === 'quiz' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>ZADANIA</button>
              <button onClick={() => setActiveTab('flashcards')} className={`py-5 text-sm font-black whitespace-nowrap transition-all border-b-4 ${activeTab === 'flashcards' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>FISZKI ({activeSection.flashcards.length})</button>
            </div>
          </div>
        )}

        <div className="flex-1 p-6 lg:p-12 max-w-5xl mx-auto w-full print:max-w-none print:p-0">
          {activeSectionId === 'global-translation' ? (
            <TranslationExercise gemini={gemini} />
          ) : (
            <div className="print:block">
              {activeTab === 'theory' && (
                <div className="space-y-12 animate-in fade-in duration-700">
                  <section className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-2xl border border-gray-100 print:shadow-none print:border-none print:p-0">
                    <h3 className="text-4xl lg:text-5xl font-black mb-10 text-gray-900 print:text-3xl print:mb-6">{activeSection.title}</h3>
                    
                    <div className="prose prose-indigo max-w-none mb-12">
                      <div className="whitespace-pre-wrap text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium tracking-tight">
                        {activeSection.theory.split('\n').map((line, i) => (
                           <p key={i} className={line.startsWith('**') ? 'font-black text-indigo-900 mt-8 mb-4' : 'mb-4'}>
                             {line.replace(/\*\*/g, '')}
                           </p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 print:grid-cols-3 print:gap-4 print:mb-10">
                      <div className="p-8 bg-gradient-to-br from-green-50 to-white rounded-[2rem] border-2 border-green-100 print:bg-white print:border-gray-200">
                        <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Twierdzenia</p>
                        <p className="font-roboto font-black text-2xl text-green-900 print:text-black print:text-lg">{activeSection.forms.affirmative}</p>
                      </div>
                      <div className="p-8 bg-gradient-to-br from-red-50 to-white rounded-[2rem] border-2 border-red-100 print:bg-white print:border-gray-200">
                        <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-4">Przeczenia</p>
                        <p className="font-roboto font-black text-2xl text-red-900 print:text-black print:text-lg">{activeSection.forms.negative}</p>
                      </div>
                      <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-[2rem] border-2 border-blue-100 print:bg-white print:border-gray-200">
                        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Pytania</p>
                        <p className="font-roboto font-black text-2xl text-blue-900 print:text-black print:text-lg">{activeSection.forms.question}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 print:block">
                      <div className="space-y-6 print:mt-10">
                        <h4 className="font-black text-2xl text-gray-900 border-b-4 border-indigo-600 inline-block pb-1 mb-4 print:text-xl">Kiedy używamy?</h4>
                        <ul className="space-y-4">
                            {activeSection.usage.map((u, i) => (
                              <li key={i} className="flex items-start gap-4 text-gray-700 text-lg font-medium print:text-sm">
                                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 mt-1 font-bold">{i+1}</div>
                                <span>{u}</span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="space-y-6 print:mt-10 print:page-break-before-always">
                        <h4 className="font-black text-2xl text-gray-900 border-b-4 border-green-600 inline-block pb-1 mb-4 print:text-xl">Przykłady Master</h4>
                        <div className="space-y-4">
                            {activeSection.examples.map((ex, i) => (
                              <div key={i} className="p-5 bg-gray-50 rounded-2xl italic text-gray-800 text-lg border-l-4 border-gray-200 print:bg-white print:border-gray-300 print:text-sm">
                                "{ex}"
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {activeSection.irregularVerbs && (
                      <div className="mt-20 print:mt-12">
                        <h4 className="text-3xl font-black mb-8 flex items-center gap-4 text-gray-900 print:text-xl">
                          <BookOpen size={32} className="text-indigo-600 print:hidden" />
                          Master Irregular List
                        </h4>
                        <IrregularVerbsView verbs={activeSection.irregularVerbs} />
                      </div>
                    )}
                  </section>
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="print:hidden">
                  <QuizSection 
                    tasks={activeSection.initialQuiz} 
                    onComplete={(score) => {
                      const newScores = { ...progress.quizScores, [activeSection.id]: score };
                      setProgress(prev => ({ ...prev, quizScores: newScores }));
                      localStorage.setItem('quiz_scores', JSON.stringify(newScores));
                    }} 
                    gemini={gemini}
                    sectionTitle={activeSection.title}
                  />
                </div>
              )}
              {activeTab === 'flashcards' && <div className="print:hidden"><FlashcardSection cards={activeSection.flashcards} /></div>}
            </div>
          )}
        </div>
      </main>

      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
      <ChatWidget gemini={gemini} />
    </div>
  );
};

export default App;
