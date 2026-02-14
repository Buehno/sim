
import React, { useState } from 'react';
import { User } from '../types';
import { 
  Upload, 
  FileText, 
  Search, 
  Trash2, 
  Download, 
  Eye, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Inbox
} from 'lucide-react';

interface DocumentsProps {
  user: User;
  onUpdateCredits: (userId: string, cost: number) => void;
}

const Documents: React.FC<DocumentsProps> = ({ user, onUpdateCredits }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    setTimeout(() => {
      const newDoc = {
        id: Date.now().toString(),
        name: e.target.files![0].name,
        size: `${Math.round(e.target.files![0].size / 1024)} KB`,
        date: new Date().toLocaleDateString('pt-BR'),
        status: 'PROCESSED'
      };
      setDocuments(prev => [newDoc, ...prev]);
      setIsUploading(false);
      onUpdateCredits(user.id, 2);
    }, 2000);
  };

  const removeDoc = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meus Documentos</h1>
          <p className="text-gray-500">Faça upload de notas fiscais, balancetes e arquivos XML para análise inteligente.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all group cursor-pointer relative">
        <input 
          type="file" 
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
          accept=".pdf,.xml,.docx,.xlsx"
        />
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Arraste seus documentos aqui</h3>
            <p className="text-sm text-gray-500">PDF, XML, XLSX ou DOCX (Max 10MB)</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow-md">
            Selecionar Arquivo
          </button>
        </div>
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <div className="flex flex-col items-center gap-4 text-center p-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-bold text-blue-600">Extraindo dados tributários...</p>
              <p className="text-xs text-gray-500">Isso pode levar alguns segundos dependendo do tamanho.</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Pesquisar arquivos..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
              <Clock size={18} />
            </button>
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
             <div className="bg-gray-50 p-6 rounded-full text-gray-300">
                <Inbox size={48} />
             </div>
             <div className="max-w-xs">
                <h4 className="font-bold text-gray-900">Nenhum documento</h4>
                <p className="text-sm text-gray-500">Seus arquivos processados aparecerão aqui para consulta futura.</p>
             </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Arquivo</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Tamanho</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${doc.name.endsWith('.xml') ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                          <FileText size={18} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 size={10} />
                        Processado
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={16} /></button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"><Download size={16} /></button>
                        <button onClick={() => removeDoc(doc.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
