
import React, { useState } from 'react';
import { Flashcard } from '../types';
import { ChevronLeft, ChevronRight, HelpCircle, RefreshCw } from 'lucide-react';

interface FlashcardSectionProps {
  cards: Flashcard[];
}

export const FlashcardSection: React.FC<FlashcardSectionProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 200);
  };

  const shuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * cards.length));
  };

  if (!cards.length) return <div className="p-20 text-center text-gray-400 font-bold">Brak fiszek w tej sekcji.</div>;

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Fiszki Aktywne</h3>
          <p className="text-sm text-gray-400 font-medium">Buduj pamięć długotrwałą</p>
        </div>
        <button 
          onClick={shuffle}
          className="p-3 bg-white text-indigo-600 rounded-2xl shadow-sm border border-gray-100 hover:bg-indigo-50 transition-all active:scale-95"
          title="Losuj fiszkę"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div 
        className="relative h-[450px] w-full perspective-2000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-[3rem] shadow-2xl border-4 border-indigo-50 flex flex-col items-center justify-center p-12 text-center group overflow-hidden">
            <div className="absolute top-8 left-8 text-indigo-100 group-hover:text-indigo-200 transition-colors">
              <HelpCircle size={60} />
            </div>
            <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-8">Pytanie / Zagadnienie</p>
            <h4 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              {currentCard.front}
            </h4>
            {currentCard.hint && (
              <div className="mt-10 px-6 py-3 bg-gray-50 rounded-2xl text-sm text-gray-400 font-bold italic border border-gray-100">
                Hint: {currentCard.hint}
              </div>
            )}
            <p className="absolute bottom-8 text-xs font-bold text-gray-300 uppercase tracking-widest">Kliknij, aby odwrócić</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-12 text-center text-white overflow-hidden">
            <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <p className="text-xs font-black text-white/50 uppercase tracking-[0.3em] mb-8">Rozwiązanie / Reguła</p>
            <h4 className="text-4xl lg:text-5xl font-black mb-8 drop-shadow-lg">
              {currentCard.back}
            </h4>
            <div className="w-20 h-2 bg-white/20 rounded-full"></div>
            <p className="absolute bottom-8 text-xs font-bold text-white/40 uppercase tracking-widest">Kliknij, aby wrócić</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-12 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all active:scale-90"
        >
          <ChevronLeft size={28} />
        </button>
        <div className="flex flex-col items-center">
          <div className="text-xl font-black text-gray-900 tracking-tighter">
            {currentIndex + 1} <span className="text-gray-300">/</span> {cards.length}
          </div>
          <div className="h-1 w-24 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300" 
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all active:scale-90"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
};
