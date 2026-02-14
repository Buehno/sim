
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import Sidebar from './Sidebar';
import Logo from './Logo';
import { Menu, Bell, User as UserIcon, Moon, Sun, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggle={() => setSidebarOpen(!isSidebarOpen)} 
        user={user} 
        onLogout={onLogout}
        isDarkMode={isDarkMode}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b h-16 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg md:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-4">
              <Logo size={24} showText={false} className="md:hidden" />
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-slate-700 px-3 py-1.5 rounded-full w-64 lg:w-96">
                <Search size={16} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar na legislação..." 
                  className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-600 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 dark:bg-slate-700 mx-1"></div>
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold group-hover:text-blue-600 transition-colors">{user.name}</p>
                <p className="text-xs text-gray-500 uppercase tracking-tighter">{user.role}</p>
              </div>
              <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center">
                <UserIcon size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
