
import React, { useState, useRef, useEffect } from 'react';
import { User, Message } from '../types';
import { INITIAL_SUGGESTIONS } from '../constants';
import { generateTaxResponse } from '../services/geminiService';
import { 
  Send, 
  Paperclip, 
  Copy, 
  Download, 
  Share2, 
  RotateCcw,
  Sparkles,
  Bot,
  User as UserIcon,
  AlertTriangle,
  Bookmark,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatProps {
  user: User;
  onUpdateCredits: (userId: string, cost: number) => void;
}

const Chat: React.FC<ChatProps> = ({ user, onUpdateCredits }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Credit Check
    if (user.queriesUsed >= user.queryLimit) {
      setShowLimitModal(true);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      onUpdateCredits(user.id, 1);
      const response = await generateTaxResponse(text, messages);
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || 'Não consegui processar sua dúvida agora.',
        timestamp: new Date().toISOString(),
        tags: ['ICMS', 'Reforma Tributária'],
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const shareChat = () => {
    const link = `https://taxai.brasil/share/${Date.now()}`;
    navigator.clipboard.writeText(link);
    alert('Link de compartilhamento seguro gerado e copiado!');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">Assistente Tributário</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs text-gray-500 font-medium">Pronto para analisar</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMessages([])}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" 
            title="Limpar Chat"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={shareChat}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            title="Compartilhar análise"
          >
            <Share2 size={18} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="Exportar PDF">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
            <div className="p-4 bg-blue-50 rounded-full text-blue-600">
              <Sparkles size={48} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Como posso ajudar hoje?</h3>
              <p className="text-gray-500 text-sm">
                Sou treinado na legislação tributária brasileira e na nova reforma. Pergunte sobre impostos, cálculos ou análises de documentos.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              {INITIAL_SUGGESTIONS.map((suggestion, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="p-3 text-left text-xs font-medium border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-gray-100 text-gray-600' : 'bg-blue-600 text-white'
              }`}>
                {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-sm' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none shadow-sm border border-gray-200/50'
                }`}>
                  <div className="whitespace-pre-wrap prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0">
                    {msg.content}
                  </div>
                </div>
                
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-3 px-1">
                    <div className="flex gap-1 overflow-x-auto no-scrollbar">
                      {msg.tags?.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto shrink-0">
                      <button 
                        onClick={() => toggleBookmark(msg.id)}
                        className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
                          bookmarks.includes(msg.id) ? 'text-blue-600' : 'text-gray-400'
                        }`}
                        title="Salvar resposta"
                      >
                        <Bookmark size={14} fill={bookmarks.includes(msg.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button 
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
                          copiedId === msg.id ? 'text-green-600' : 'text-gray-400'
                        }`}
                        title="Copiar resposta"
                      >
                        {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                )}
                
                <p className="text-[10px] text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none border border-gray-200/50">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="relative flex items-end gap-2 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
              placeholder="Digite sua dúvida tributária aqui..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[52px] max-h-32 text-sm outline-none transition-all"
              rows={1}
            />
            <button className="absolute right-3 bottom-3 p-1.5 text-gray-400 hover:text-blue-600 rounded-lg transition-colors">
              <Paperclip size={20} />
            </button>
          </div>
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl transition-all shadow-lg ${
              !input.trim() || isLoading 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 mt-3">
           <button className="text-[10px] text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1">
             <Sparkles size={10} />
             Sugestões inteligentes
           </button>
           <button className="text-[10px] text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1">
             <Bot size={10} />
             Atalhos de teclado
           </button>
        </div>
      </div>

      {/* Credit Limit Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Limite Atingido</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Você atingiu o limite de consultas do seu plano. Faça um upgrade para o plano <strong>Profissional</strong> e tenha consultas ilimitadas!
            </p>
            <div className="pt-4 space-y-2">
              <button className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl active:scale-95">
                Fazer Upgrade Agora
              </button>
              <button 
                onClick={() => setShowLimitModal(false)}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                Talvez mais tarde
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
