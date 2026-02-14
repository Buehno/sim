
import React from 'react';
import { User, PlanType } from '../types';
import { Settings as SettingsIcon, User as UserIcon, Lock, CreditCard, Bell, Shield, ChevronRight } from 'lucide-react';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="text-blue-600" />
          Configurações
        </h1>
        <p className="text-gray-500">Gerencie sua conta, segurança e preferências do sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="space-y-1">
          {[
            { id: 'profile', icon: <UserIcon size={18} />, label: 'Perfil' },
            { id: 'security', icon: <Lock size={18} />, label: 'Segurança' },
            { id: 'plan', icon: <CreditCard size={18} />, label: 'Plano e Cobrança' },
            { id: 'notifications', icon: <Bell size={18} />, label: 'Notificações' },
            { id: 'privacy', icon: <Shield size={18} />, label: 'Privacidade' },
          ].map((item, idx) => (
            <button
              key={item.id}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${
                idx === 0 ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </div>
              <ChevronRight size={14} className={idx === 0 ? 'text-white/50' : 'text-gray-300'} />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-800 pb-2 border-b">Informações do Perfil</h3>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
                {user.name.charAt(0)}
              </div>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Alterar Foto</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Nome Completo</label>
                <input type="text" defaultValue={user.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">E-mail</label>
                <input type="email" defaultValue={user.email} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
              </div>
            </div>
          </div>

          {/* Plan Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 pb-2 border-b">Plano Atual</h3>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div>
                <p className="text-xs font-bold text-blue-700 uppercase tracking-widest">Plano {user.plan}</p>
                <p className="text-xl font-bold text-blue-900">
                  {user.plan === PlanType.UNLIMITED ? 'Ilimitado' : `${user.queryLimit} consultas/mês`}
                </p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700">
                Upgrade
              </button>
            </div>
            <p className="text-xs text-gray-500">Próxima renovação: 15 de Março de 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
