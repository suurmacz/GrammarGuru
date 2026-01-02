
import React, { useState, useEffect } from 'react';
import { QuizTask, TaskType } from '../types';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { GeminiService } from '../services/geminiService';

interface QuizSectionProps {
  tasks: QuizTask[];
  onComplete: (score: number) => void;
  gemini: GeminiService | null;
  sectionTitle: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ tasks: initialTasks, onComplete, gemini, sectionTitle }) => {
  const [tasks, setTasks] = useState<QuizTask[]>(initialTasks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTasks(initialTasks);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setFeedback(null);
  }, [initialTasks, sectionTitle]);

  const handleGenerateAiQuiz = async () => {
    if (!gemini) {
      setError("Najpierw ustaw klucz API w ustawieniach.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const newTasks = await gemini.generateAiQuiz(sectionTitle);
      if (newTasks && newTasks.length > 0) {
        setTasks(newTasks);
        setCurrentIndex(0);
        setScore(0);
        setIsFinished(false);
        setFeedback(null);
      } else {
        setError("AI nie zwróciło żadnych zadań. Spróbuj ponownie.");
      }
    } catch (e) {
      setError("Błąd generowania zadań. Sprawdź klucz API.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCheck = () => {
    if (feedback) return;

    let isCorrect = false;
    const currentTask = tasks[currentIndex];
    const answer = userInput.trim().toLowerCase();
    const correctAnswer = currentTask.answer.toLowerCase();

    if (currentTask.type === TaskType.MULTIPLE_CHOICE) {
      isCorrect = selectedOption === currentTask.answer;
    } else {
      isCorrect = answer === correctAnswer;
    }

    if (isCorrect) setScore(s => s + 1);
    setFeedback({
      isCorrect,
      message: currentTask.explanation
    });
  };

  const handleNext = () => {
    setFeedback(null);
    setUserInput('');
    setSelectedOption(null);

    if (currentIndex + 1 < tasks.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      onComplete(score);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setFeedback(null);
  };

  if (isGenerating) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl shadow-xl border border-indigo-50 flex flex-col items-center gap-6">
        <div className="relative">
          <Loader2 className="animate-spin text-indigo-600" size={60} />
          <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Generuję wyzwanie...</h3>
          <p className="text-gray-500">Gemini AI przygotowuje unikalne zadania dla sekcji {sectionTitle}.</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center">
          <AlertCircle size={40} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Brak zadań</h3>
          <p className="text-gray-500 mb-6">Ta sekcja nie ma jeszcze wbudowanych zadań. Poproś AI o ich wygenerowanie!</p>
          
          {error && <p className="text-red-500 text-sm font-bold mb-4">{error}</p>}
          
          <button 
            onClick={handleGenerateAiQuiz}
            className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            <Sparkles size={20} /> Generuj zadania przez AI
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / tasks.length) * 100);
    return (
      <div className="p-10 text-center bg-white rounded-3xl shadow-xl border border-indigo-100 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Award size={56} />
        </div>
        <h2 className="text-4xl font-black mb-2 text-gray-900">Wynik: {score} / {tasks.length}</h2>
        <p className="text-gray-500 text-lg mb-8 font-medium">Ukończyłeś sekcję z wynikiem <span className="text-indigo-600 font-black">{percentage}%</span>!</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={restartQuiz} className="px-8 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-2xl flex items-center justify-center gap-2 font-black transition-all active:scale-95">
            <RotateCcw size={20} /> Powtórz ten quiz
          </button>
          <button onClick={handleGenerateAiQuiz} className="px-8 py-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-2xl flex items-center justify-center gap-2 font-black transition-all shadow-lg shadow-indigo-100 active:scale-95">
            <Sparkles size={20} /> Generuj nowe przez AI
          </button>
        </div>
      </div>
    );
  }

  const currentTask = tasks[currentIndex];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
      <div className="h-3 bg-gray-100 w-full">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700 ease-out" 
          style={{ width: `${((currentIndex) / tasks.length) * 100}%` }}
        ></div>
      </div>

      <div className="p-8 lg:p-12">
        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Zadanie {currentIndex + 1} z {tasks.length}</span>
            <div className="h-1 w-12 bg-indigo-100 rounded-full"></div>
          </div>
          <span className="px-4 py-2 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-gray-100">
            {currentTask.type.replace('-', ' ')}
          </span>
        </div>

        <h3 className="text-2xl lg:text-3xl font-black mb-10 text-gray-900 leading-tight">
          {currentTask.question}
        </h3>

        <div className="space-y-4 mb-10">
          {currentTask.type === TaskType.MULTIPLE_CHOICE ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTask.options?.map((opt, i) => (
                <button
                  key={i}
                  disabled={!!feedback}
                  onClick={() => setSelectedOption(opt)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all font-bold text-lg relative overflow-hidden group ${
                    selectedOption === opt 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' 
                      : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50 text-gray-600'
                  } ${feedback && opt === currentTask.answer ? 'border-green-500 bg-green-50 text-green-700' : ''} ${feedback && selectedOption === opt && opt !== currentTask.answer ? 'border-red-500 bg-red-50 text-red-700' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {feedback && opt === currentTask.answer && <CheckCircle2 size={24} className="text-green-600" />}
                    {feedback && selectedOption === opt && opt !== currentTask.answer && <XCircle size={24} className="text-red-600" />}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="relative">
              <input 
                type="text"
                value={userInput}
                disabled={!!feedback}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Wpisz swoją odpowiedź..."
                className={`w-full p-6 bg-gray-50 border-4 rounded-2xl focus:ring-0 outline-none transition-all text-xl font-bold ${feedback ? (feedback.isCorrect ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50') : 'border-transparent focus:border-indigo-500 focus:bg-white'}`}
                onKeyDown={(e) => e.key === 'Enter' && !feedback && handleCheck()}
              />
              {feedback && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  {feedback.isCorrect ? <CheckCircle2 size={30} className="text-green-500" /> : <XCircle size={30} className="text-red-500" />}
                </div>
              )}
            </div>
          )}
        </div>

        {feedback && (
          <div className={`p-8 rounded-3xl mb-10 flex gap-5 animate-in slide-in-from-top-4 duration-500 border-l-8 ${feedback.isCorrect ? 'bg-green-50 text-green-900 border-green-500 shadow-lg shadow-green-100' : 'bg-red-50 text-red-900 border-red-500 shadow-lg shadow-red-100'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${feedback.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {feedback.isCorrect ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
            </div>
            <div>
              <p className="font-black text-xl mb-2">{feedback.isCorrect ? 'Genialnie!' : 'Prawie dobrze...'}</p>
              <p className="text-lg opacity-80 leading-relaxed font-medium">{feedback.message}</p>
              {!feedback.isCorrect && <p className="mt-4 font-black">Poprawna odpowiedź: <span className="underline">{currentTask.answer}</span></p>}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
           <button 
              onClick={handleGenerateAiQuiz}
              className="text-indigo-400 hover:text-indigo-600 text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-colors"
            >
              <Sparkles size={16} /> Nowe przez AI
            </button>

          {!feedback ? (
            <button 
              onClick={handleCheck}
              disabled={(!userInput.trim() && !selectedOption)}
              className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 disabled:opacity-30 shadow-2xl shadow-indigo-100 transition-all active:scale-95"
            >
              Sprawdź odpowiedź
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black flex items-center gap-3 transition-all active:scale-95"
            >
              Następne zadanie <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
