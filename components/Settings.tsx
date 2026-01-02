
import React, { useState } from 'react';
import { Key, ShieldCheck, X, Smartphone, Globe, Apple } from 'lucide-react';

interface SettingsProps {
  onSave: (key: string) => void;
  onClose: () => void;
  initialKey: string;
}

export const Settings: React.FC<SettingsProps> = ({ onSave, onClose, initialKey }) => {
  const [key, setKey] = useState(initialKey);
  const [tab, setTab] = useState<'api' | 'ios'>('api');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
          <div className="flex gap-4">
            <button 
              onClick={() => setTab('api')}
              className={`pb-1 text-sm font-bold border-b-2 transition-all ${tab === 'api' ? 'border-white opacity-100' : 'border-transparent opacity-60'}`}
            >
              Ustawienia AI
            </button>
            <button 
              onClick={() => setTab('ios')}
              className={`pb-1 text-sm font-bold border-b-2 transition-all ${tab === 'ios' ? 'border-white opacity-100' : 'border-transparent opacity-60'}`}
            >
              Instalacja iOS
            </button>
          </div>
          <button onClick={onClose} className="hover:bg-indigo-500 p-1 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8">
          {tab === 'api' ? (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                <Globe className="text-indigo-600 shrink-0 mt-1" size={24} />
                <div className="text-sm text-indigo-900">
                  Klucz API Gemini pozwala na tłumaczenia i inteligentny czat. Pobierz go z <a href="https://aistudio.google.com/app/apikey" target="_blank" className="font-bold underline">Google AI Studio</a>.
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Klucz API</label>
                <input 
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Wklej klucz..."
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-mono"
                />
              </div>

              <button 
                onClick={() => onSave(key)}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-100"
              >
                Zapisz Klucz
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-indigo-600 mb-2">
                <Apple size={32} />
                <h3 className="text-xl font-bold">Instalacja na iPhone</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold">1</div>
                  <p className="text-sm text-gray-700">Otwórz tę stronę w przeglądarce <b>Safari</b>.</p>
                </div>
                <div className="flex gap-4 items-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold">2</div>
                  <p className="text-sm text-gray-700">Kliknij przycisk <b>Udostępnij</b> (ikona kwadratu ze strzałką).</p>
                </div>
                <div className="flex gap-4 items-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold">3</div>
                  <p className="text-sm text-gray-700">Przewiń w dół i wybierz <b>Dodaj do ekranu początkowego</b>.</p>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-green-800 text-xs">
                Aplikacja będzie działać jak natywny program, z pełnym dostępem do Twojego klucza API i postępów.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
