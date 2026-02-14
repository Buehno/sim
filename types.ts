
export enum UserRole {
  MASTER = 'MASTER',
  ADMIN = 'ADMIN',
  STANDARD = 'STANDARD',
  TESTER = 'TESTER'
}

export enum PlanType {
  BASIC = 'Básico',
  PRO = 'Profissional',
  ENTERPRISE = 'Enterprise',
  UNLIMITED = 'Ilimitado',
  FREE = 'Gratuito'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  plan: PlanType;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
  queriesUsed: number;
  queryLimit: number;
  documentsProcessed: number;
  createdAt: string;
  expiresAt?: string;
  needsPasswordChange: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  tags?: string[];
  sources?: string[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'PROCESSED' | 'PENDING' | 'ERROR';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
