
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole, AuthState } from './types';
import { MASTER_USER } from './constants';
import Layout from './components/Layout';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Chat from './views/Chat';
import Admin from './views/Admin';
import Documents from './views/Documents';
import TaxTools from './views/TaxTools';
import History from './views/History';
import Settings from './views/Settings';
import Logo from './components/Logo';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [appLoading, setAppLoading] = useState(true);
  const [authState, setAuthState] = useState<AuthState>(() => {
    const saved = localStorage.getItem('tax_auth');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('tax_users');
    return saved ? JSON.parse(saved) : [MASTER_USER];
  });

  useEffect(() => {
    // Carregamento inicial da IAgentics
    const timer = setTimeout(() => setAppLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('tax_auth', JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    localStorage.setItem('tax_users', JSON.stringify(users));
  }, [users]);

  const login = (user: User) => {
    setAuthState({ user, isAuthenticated: true });
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('tax_auth');
  };

  const updateUserCredits = (userId: string, cost: number) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, queriesUsed: u.queriesUsed + cost };
      }
      return u;
    }));
    
    if (authState.user?.id === userId) {
      setAuthState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, queriesUsed: prev.user.queriesUsed + cost } : null
      }));
    }
  };

  const ProtectedRoute = ({ children, roles }: { children?: React.ReactNode, roles?: UserRole[] }) => {
    if (!authState.isAuthenticated) return <Navigate to="/login" />;
    if (roles && authState.user && !roles.includes(authState.user.role)) return <Navigate to="/" />;
    return <>{children}</>;
  };

  return (
    <>
      <AnimatePresence>
        {appLoading && (
          <motion.div 
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            {/* O vídeo de loading solicitado como background */}
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
              <source src="video_loading.mp4" type="video/mp4" />
              {/* Fallback caso o vídeo não carregue */}
              <div className="w-full h-full bg-gradient-to-br from-slate-900 to-indigo-950"></div>
            </video>
            
            {/* Branding Overlay */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-10 flex flex-col items-center"
            >
              <Logo size={120} showText={false} className="mb-8" />
              <h1 className="text-white font-poppins text-5xl font-bold tracking-[0.2em]">IAGENTICS</h1>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
                <p className="text-indigo-300 font-medium tracking-widest uppercase text-xs">Intelligence Systems</p>
                <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={login} users={users} />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout user={authState.user!} onLogout={logout}>
                <Dashboard user={authState.user!} />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/chat" element={
            <ProtectedRoute>
              <Layout user={authState.user!} onLogout={logout}>
                <Chat user={authState.user!} onUpdateCredits={updateUserCredits} />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/documents" element={
            <ProtectedRoute>
              <Layout user={authState.user!} onLogout={logout}>
                <Documents user={authState.user!} onUpdateCredits={updateUserCredits} />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/history" element={
            <ProtectedRoute>
              <Layout user={authState.user!} onLogout={logout}>
                <History />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/tools" element={
            <ProtectedRoute>
              <Layout user={authState.user!} onLogout={logout}>
                <TaxTools />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout user={authState.user!} onLogout={logout}>
                <Settings user={authState.user!} />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute roles={[UserRole.MASTER, UserRole.ADMIN]}>
              <Layout user={authState.user!} onLogout={logout}>
                <Admin currentUser={authState.user!} users={users} setUsers={setUsers} />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
