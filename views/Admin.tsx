
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, UserRole, PlanType } from '../types';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  ShieldCheck, 
  TrendingUp,
  Download,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface AdminProps {
  currentUser: User;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Admin: React.FC<AdminProps> = ({ currentUser, users, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  // Cálculos baseados em dados reais
  const totalQueries = users.reduce((acc, user) => acc + (user.queriesUsed || 0), 0);
  const totalDocs = users.reduce((acc, user) => acc + (user.documentsProcessed || 0), 0);
  const activeUsers = users.filter(u => u.status === 'ACTIVE').length;

  // New User State
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    role: UserRole.STANDARD,
    plan: PlanType.BASIC
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const userToAdd: User = {
      id: Date.now().toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      plan: newUser.plan,
      status: 'ACTIVE',
      queriesUsed: 0,
      queryLimit: newUser.role === UserRole.TESTER ? 3 : 50,
      documentsProcessed: 0,
      createdAt: new Date().toISOString(),
      needsPasswordChange: true,
    };
    setUsers([...users, userToAdd]);
    setShowAddUser(false);
    setNewUser({ email: '', name: '', role: UserRole.STANDARD, plan: PlanType.BASIC });
  };

  const deleteUser = (id: string) => {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-blue-600" />
            Painel de Administração
          </h1>
          <p className="text-gray-500">Gerenciamento centralizado de acessos e métricas reais.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAddUser(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
          >
            <UserPlus size={18} />
            Novo Usuário
          </button>
          <button className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Analytics Real-time */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Usuários</p>
          <p className="text-2xl font-bold">{users.length}</p>
          <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">{activeUsers} ativos agora</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Consultas Globais</p>
          <p className="text-2xl font-bold">{totalQueries}</p>
          <p className="text-xs text-gray-400 mt-2">Volume total processado</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Docs Processados</p>
          <p className="text-2xl font-bold">{totalDocs}</p>
          <p className="text-xs text-gray-400 mt-2">Total de arquivos analisados</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Taxa de Atividade</p>
          <p className="text-2xl font-bold">{users.length > 0 ? Math.round((activeUsers / users.length) * 100) : 0}%</p>
          <p className="text-xs text-gray-400 mt-2">Engajamento da plataforma</p>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Filter size={16} />
              Filtros
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Tipo / Plano</th>
                <th className="px-6 py-4">Consultas</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500 text-sm italic">
                    Nenhum usuário encontrado com os filtros atuais.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-bold uppercase w-fit px-1.5 py-0.5 rounded ${
                          user.role === UserRole.MASTER ? 'bg-purple-100 text-purple-700' :
                          user.role === UserRole.ADMIN ? 'bg-blue-100 text-blue-700' :
                          user.role === UserRole.TESTER ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">{user.plan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 w-24">
                        <div className="flex justify-between text-[10px] text-gray-500">
                          <span>Uso</span>
                          <span>{user.queryLimit === Infinity ? '0%' : `${Math.round((user.queriesUsed / user.queryLimit) * 100)}%`}</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: `${user.queryLimit === Infinity ? 0 : (user.queriesUsed / user.queryLimit) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-[10px] text-gray-400">{user.queriesUsed} / {user.queryLimit === Infinity ? '∞' : user.queryLimit}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={12} />
                          Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                          <XCircle size={12} />
                          Bloqueado
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                          <Edit2 size={16} />
                        </button>
                        {user.role !== UserRole.MASTER && (
                          <button 
                            onClick={() => deleteUser(user.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Criar Novo Usuário</h2>
              <button onClick={() => setShowAddUser(false)} className="text-gray-400 hover:text-gray-600">
                <XCircle size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    value={newUser.name}
                    onChange={e => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Email Corporativo</label>
                  <input 
                    type="email" 
                    required
                    value={newUser.email}
                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="ex@empresa.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Tipo de Usuário</label>
                  <select 
                    value={newUser.role}
                    onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value={UserRole.STANDARD}>Standard (Pago)</option>
                    <option value={UserRole.TESTER}>Tester (Gratuito)</option>
                    {currentUser.role === UserRole.MASTER && <option value={UserRole.ADMIN}>Admin (Secundário)</option>}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Plano</label>
                  <select 
                    value={newUser.plan}
                    onChange={e => setNewUser({...newUser, plan: e.target.value as PlanType})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value={PlanType.BASIC}>Básico (50 consultas)</option>
                    <option value={PlanType.PRO}>Profissional (200 consultas)</option>
                    <option value={PlanType.ENTERPRISE}>Enterprise (1000 consultas)</option>
                    <option value={PlanType.UNLIMITED}>Ilimitado</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-xs text-blue-700 leading-relaxed">
                  O sistema gerará credenciais de acesso padrão. O usuário deverá alterar a senha no primeiro login.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Criar Usuário
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
