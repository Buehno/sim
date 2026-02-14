
import { UserRole, PlanType, User } from './types';

export const COLORS = {
  primary: '#1E3A8A', // Deep Blue
  brand: '#818CF8',   // IAgentics Purple/Indigo
  white: '#FFFFFF',
  background: '#F3F4F6',
  success: '#059669', // Fiscal Green
  alert: '#F97316',   // Warning Orange
};

export const COMPANY_NAME = 'IAgentics';

export const MASTER_USER: User = {
  id: 'master-1',
  email: 'ronaldo.bueno@iagentics.com.br',
  name: 'Ronaldo Bueno',
  role: UserRole.MASTER,
  plan: PlanType.UNLIMITED,
  status: 'ACTIVE',
  queriesUsed: 0,
  queryLimit: Infinity,
  documentsProcessed: 0,
  createdAt: new Date().toISOString(),
  needsPasswordChange: false,
};

export const PLAN_LIMITS = {
  [PlanType.BASIC]: 50,
  [PlanType.PRO]: 200,
  [PlanType.ENTERPRISE]: 1000,
  [PlanType.UNLIMITED]: Infinity,
  [PlanType.FREE]: 3, // Per day for testers
};

export const INITIAL_SUGGESTIONS = [
  "Quais as principais mudanças da reforma tributária?",
  "Como calcular o ICMS-ST em São Paulo?",
  "O que muda no PIS/COFINS com a CBS?",
  "Diferença entre Lucro Real e Lucro Presumido",
];

export const TAX_TIMELINE = [
  { year: '2023', event: 'Aprovação da EC 132/2023', details: 'Base da Reforma Tributária do Consumo.' },
  { year: '2024', event: 'Regulamentação (PLP 68)', details: 'Definição das alíquotas e regras do IBS/CBS.' },
  { year: '2026', event: 'Período de Teste', details: 'Início da cobrança de 1% de IBS/CBS.' },
  { year: '2027', event: 'Extinção de PIS/COFINS', details: 'Substituição total pela CBS.' },
  { year: '2033', event: 'Substituição Final', details: 'IBS substitui integralmente ICMS e ISS.' },
];
