
import React from 'react';
import { User, UserRole, PlanType } from '../types';
import { 
  FileText, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  BarChart3,
  Calendar,
  CheckCircle2,
  Inbox
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // Dados iniciam zerados para refletir uso real
  const usageData = [
    { name: 'Seg', consultas: 0, docs: 0 },
    { name: 'Ter', consultas: 0, docs: 0 },
    { name: 'Qua', consultas: 0, docs: 0 },
    { name: 'Qui', consultas: 0, docs: 0 },
    { name: 'Sex', consultas: 0, docs: 0 },
    { name: 'Sab', consultas: 0, docs: 0 },
    { name: 'Dom', consultas: 0, docs: 0 },
  ];

  const usagePercent = user.queryLimit === Infinity ? 0 : (user.queriesUsed / user.queryLimit) * 100;
  const isTester = user.role === UserRole.TESTER;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Olá, {user.name.split(' ')[0]}!</h1>
          <p className="text-gray-500">Bem-vindo ao seu painel de inteligência fiscal.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <Calendar size={18} className="text-blue-600" />
          <span className="text-sm font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <MessageSquare size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">Consultas Restantes</p>
          <p className="text-2xl font-bold mt-1">
            {user.queryLimit === Infinity ? 'Ilimitado' : `${Math.max(0, user.queryLimit - user.queriesUsed)}/${user.queryLimit}`}
          </p>
          {user.queryLimit !== Infinity && (
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${usagePercent > 90 ? 'bg-red-500' : usagePercent > 70 ? 'bg-orange-500' : 'bg-blue-600'}`}
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              ></div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <FileText size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">Documentos Analisados</p>
          <p className="text-2xl font-bold mt-1">{user.documentsProcessed}</p>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <TrendingUp size={12} />
            Total acumulado
          </p>
        </div>

        {isTester ? (
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Clock size={20} />
              </div>
            </div>
            <p className="text-sm text-orange-700 font-medium">Expiração do Teste</p>
            <p className="text-2xl font-bold mt-1 text-orange-900">7 dias</p>
            <p className="text-xs text-orange-600 mt-2">Plano: {user.plan}</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <BarChart3 size={20} />
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Economia Estimada</p>
            <p className="text-2xl font-bold mt-1">R$ 0,00</p>
            <p className="text-xs text-purple-600 mt-2">Inicie consultas para ver projeções</p>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">Status do Sistema</p>
          <p className="text-2xl font-bold mt-1">Legislação Ok</p>
          <p className="text-xs text-green-600 mt-2">Atualizado em tempo real</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Uso da Plataforma</h3>
            <span className="text-xs text-gray-400">Últimos 7 dias</span>
          </div>
          <div className="h-64 flex flex-col items-center justify-center">
            {user.queriesUsed === 0 ? (
              <div className="text-center space-y-2">
                <div className="bg-gray-50 p-4 rounded-full inline-block text-gray-300">
                  <BarChart3 size={40} />
                </div>
                <p className="text-sm text-gray-400">Nenhum dado de atividade para exibir ainda.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="consultas" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsage)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-800 mb-4">Alertas e Atualizações</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-3">
             <div className="p-3 bg-gray-50 rounded-full text-gray-400">
                <Inbox size={32} />
             </div>
             <p className="text-sm text-gray-500">Nenhum alerta pendente no momento. Sua base está atualizada com a legislação vigente.</p>
          </div>
          <button className="w-full mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 py-2 bg-blue-50 rounded-lg">
            Acessar Base Legal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
