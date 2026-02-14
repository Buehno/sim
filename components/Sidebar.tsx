
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Files, 
  History, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft,
  Scale
} from 'lucide-react';
import { User, UserRole } from '../types';
import Logo from './Logo';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  user: User;
  onLogout: () => void;
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle, user, onLogout, isDarkMode }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <MessageSquare size={20} />, label: 'Chat Tributário', path: '/chat' },
    { icon: <Files size={20} />, label: 'Meus Documentos', path: '/documents' },
    { icon: <History size={20} />, label: 'Histórico', path: '/history' },
    { icon: <Scale size={20} />, label: 'Ferramentas Fiscais', path: '/tools' },
  ];

  if (user.role === UserRole.MASTER || user.role === UserRole.ADMIN) {
    menuItems.push({ icon: <Users size={20} />, label: 'Gerenciar Usuários', path: '/admin' });
  }

  menuItems.push({ icon: <Settings size={20} />, label: 'Configurações', path: '/settings' });

  return (
    <aside className={`
      ${isOpen ? 'w-64' : 'w-20'} 
      ${isDarkMode ? 'bg-slate-800' : 'bg-[#1E3A8A]'} 
      text-white transition-all duration-300 ease-in-out h-screen flex flex-col z-20 sticky top-0
      hidden md:flex
    `}>
      {/* Brand IAgentics */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 overflow-hidden">
        <Logo size={28} showText={isOpen} textColor="white" className="ml-1" />
        {isOpen && (
          <button onClick={toggle} className="p-1 hover:bg-white/10 rounded transition-colors">
            <ChevronLeft size={20} />
          </button>
        )}
        {!isOpen && (
           <button onClick={toggle} className="w-full flex justify-center py-4 hover:bg-white/10">
              <ChevronLeft size={20} className="rotate-180" />
           </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
              ${isActive ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10'}
              ${!isOpen && 'justify-center px-0'}
            `}
            title={!isOpen ? item.label : ''}
          >
            {item.icon}
            <span className={`${!isOpen && 'hidden'} font-medium truncate`}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Branding */}
      <div className="p-4 border-t border-white/10">
        <div className={`mb-4 flex flex-col items-center ${!isOpen && 'hidden'}`}>
           <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest opacity-60">Empresa Responsável</p>
           <p className="text-sm font-semibold">IAgentics Intelligence</p>
        </div>
        <button 
          onClick={onLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-200 hover:bg-red-500/10 transition-colors
            ${!isOpen && 'justify-center px-0'}
          `}
        >
          <LogOut size={20} />
          <span className={`${!isOpen && 'hidden'} font-medium`}>Sair da Conta</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
