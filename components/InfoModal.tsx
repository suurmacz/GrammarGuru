
import React, { useState } from 'react';
import { Apple, Smartphone, X, Globe, Zap, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';

interface InfoModalProps {
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openStandalone = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Zap size={24} fill="white" />
            <h3 className="text-xl font-black">GrammarGuru AI</h3>
          </div>
          <button onClick={onClose} className="hover:bg-indigo-500 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 space-y-8 overflow-y-auto max-h-[80vh]">
          {/* Important Safari Fix Notice */}
          <div className="p-6 bg-amber-50 border-2 border-amber-100 rounded-[2rem] space-y-4">
            <div className="flex gap-4 items-start">
              <AlertCircle className="text-amber-600 shrink-0 mt-1" size={24} />
              <div>
                <p className="font-black text-amber-900 text-base mb-1">Poprawna instalacja (Safari)</p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Jeśli dodasz aplikację do ekranu głównego bezpośrednio z edytora, zapisze się błędny link. Użyj przycisku poniżej, aby otworzyć aplikację "czysto" i wtedy zainstalować.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={openStandalone}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-200"
              >
                <ExternalLink size={18} /> Otwórz w nowej karcie
              </button>
              <button 
                onClick={copyUrl}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-2 border-amber-200 text-amber-700 rounded-xl font-bold hover:bg-amber-50 transition-all"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Skopiowano!' : 'Kopiuj link'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600">
              <Apple size={28} />
              <h4 className="text-lg font-black">Instrukcja PWA (iPhone)</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black shrink-0">1</div>
                <p className="text-sm text-gray-700">Otwórz link w czystej karcie <b>Safari</b>.</p>
              </div>
              <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black shrink-0">2</div>
                <p className="text-sm text-gray-700">Kliknij ikonę <b>Udostępnij</b> w dolnym menu.</p>
              </div>
              <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black shrink-0">3</div>
                <p className="text-sm text-gray-700">Wybierz <b>Dodaj do ekranu początkowego</b>.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600">
              <Globe size={28} />
              <h4 className="text-lg font-black">Klucz AI i Prywatność</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Aplikacja korzysta z Twojego dedykowanego klucza Gemini AI zapisanego w środowisku. Wszystkie Twoje dane i postępy są przechowywane wyłącznie na Twoim urządzeniu (LocalStorage).
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            Zrozumiałem, wracam do nauki
          </button>
        </div>
      </div>
    </div>
  );
};
