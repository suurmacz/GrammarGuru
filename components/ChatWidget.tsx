
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Maximize2, Minimize2, Loader2, MessageSquare } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatWidgetProps {
  gemini: GeminiService | null;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ gemini }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Cześć! Jestem Twoim nauczycielem gramatyki. W czym mogę Ci dzisiaj pomóc? Napisz dowolne zdanie, a sprawdzę jego poprawność!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !gemini || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await gemini.generateChatResponse(userMsg, messages.slice(-5));
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Wystąpił błąd przy połączeniu z AI. Sprawdź swój klucz API.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform z-50 animate-bounce"
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[400px] bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col z-[60] transition-all duration-300 ${isMinimized ? 'h-[60px]' : 'h-[600px] max-h-[90vh]'}`}>
      <div className="p-4 bg-indigo-600 text-white flex justify-between items-center cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <span className="font-bold">Grammar Tutor AI</span>
        </div>
        <div className="flex items-center gap-2">
          {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="hover:bg-white/20 p-1 rounded">
            <X size={20} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white shadow-sm border border-gray-100 rounded-bl-none text-gray-800'}`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <Loader2 className="animate-spin text-indigo-600" size={16} />
                  <span className="text-xs text-gray-500">Myślę...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Wpisz pytanie gramatyczne..."
              className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !gemini}
              className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
