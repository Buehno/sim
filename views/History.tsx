
import React from 'react';
import { History as HistoryIcon, Search, MessageSquare, Calendar, Filter, Inbox } from 'lucide-react';

const History: React.FC = () => {
  // Histórico inicia vazio para uso real
  const historyItems: any[] = [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <HistoryIcon className="text-blue-600" />
            Histórico de Consultas
          </h1>
          <p className="text-gray-500">Acesse suas análises e conversas anteriores com a IA.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar no histórico..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
              <Calendar size={16} />
              Data
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
              <Filter size={16} />
              Filtrar
            </button>
          </div>
        </div>

        {historyItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
             <div className="bg-blue-50 p-6 rounded-full text-blue-200">
                <MessageSquare size={48} />
             </div>
             <div className="max-w-xs">
                <h3 className="font-bold text-gray-900">Nenhuma consulta salva</h3>
                <p className="text-sm text-gray-500">Suas interações com o Assistente Tributário serão arquivadas aqui para fácil referência futura.</p>
             </div>
             <button className="text-blue-600 font-bold text-sm hover:underline">Iniciar nova consulta agora</button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {/* O mapeamento de itens aconteceria aqui conforme as consultas fossem salvas */}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
