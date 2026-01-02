
import React, { useState } from 'react';
import { IrregularVerb } from '../types';
import { Search, Book } from 'lucide-react';

interface Props {
  verbs: IrregularVerb[];
}

export const IrregularVerbsView: React.FC<Props> = ({ verbs }) => {
  const [search, setSearch] = useState('');

  const filteredVerbs = verbs.filter(v => 
    v.v1.toLowerCase().includes(search.toLowerCase()) || 
    v.translation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Szukaj czasownika (np. go, widzieć)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Infinitive (V1)</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Past Simple (V2)</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Past Participle (V3)</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Tłumaczenie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredVerbs.map((v, i) => (
                <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-indigo-600">{v.v1}</td>
                  <td className="px-6 py-4 text-gray-700">{v.v2}</td>
                  <td className="px-6 py-4 text-gray-700">{v.v3}</td>
                  <td className="px-6 py-4 text-gray-500 italic">{v.translation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
