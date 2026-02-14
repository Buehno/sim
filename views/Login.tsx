
import React, { useState } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

interface LoginProps {
  onLogin: (user: User) => void;
  users: User[];
}

const Login: React.FC<LoginProps> = ({ onLogin, users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const user = users.find(u => u.email === email);
      if (user && (password === 'Buh@1202' || !user.needsPasswordChange)) { 
        onLogin(user);
        navigate('/');
      } else {
        setError('E-mail ou senha incorretos. Verifique as credenciais Master.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-inter">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="flex flex-col items-center mb-10">
          <Logo size={80} showText={false} className="mb-4" />
          <div className="text-center">
            <h1 className="text-4xl font-poppins font-bold text-gray-900 tracking-tight">IAgentics</h1>
            <p className="text-gray-500 font-medium tracking-wide">Inteligência Tributária Brasileira</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-white space-y-6">
          <div className="space-y-1 text-center">
             <h2 className="text-xl font-bold text-gray-800">Sistema de Acesso</h2>
             <p className="text-sm text-gray-500 font-medium">Empresa responsável: IAgentics Intelligence</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm border border-red-100 animate-pulse">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">E-mail Corporativo</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="usuario@iagentics.com.br"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <label className="text-sm font-semibold text-gray-700">Senha</label>
                <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Esqueci a senha</button>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-[#1E3A8A] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-800 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-blue-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Conectando à IA...
                </>
              ) : (
                "Acessar Sistema"
              )}
            </button>
          </form>

          <div className="pt-4 text-center border-t border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Tecnologia por</p>
            <p className="text-xs font-semibold text-gray-600 underline">IAgentics Intelligence Systems</p>
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] text-gray-400 font-medium">
          <p>© 2024 IAgentics | Todos os direitos reservados</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
