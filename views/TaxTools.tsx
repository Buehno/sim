
import React, { useState } from 'react';
import { TAX_TIMELINE } from '../constants';
import { 
  Calculator, 
  History, 
  ArrowRightLeft, 
  Info, 
  FileCheck,
  TrendingUp,
  Percent,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

const TaxTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'calc' | 'compare'>('timeline');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto no-scrollbar">
        {[
          { id: 'timeline', label: 'Linha do Tempo Reforma', icon: <History size={18} /> },
          { id: 'calc', label: 'Simulador Tributário', icon: <Calculator size={18} /> },
          { id: 'compare', label: 'Comparador de Regimes', icon: <ArrowRightLeft size={18} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap
              ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* View: Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-12 py-6 px-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Cronograma da Reforma Tributária</h2>
            <p className="text-gray-500">Acompanhe as fases de implementação do novo modelo tributário (IBS e CBS).</p>
          </div>
          
          <div className="relative">
            {/* Desktop Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block"></div>
            
            <div className="space-y-12">
              {TAX_TIMELINE.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 && 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">{item.year}</span>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">{item.event}</h3>
                      <p className="text-gray-500 text-sm mt-2">{item.details}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white shrink-0">
                    <FileCheck size={20} />
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View: Calculator */}
      {activeTab === 'calc' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 bg-blue-600 text-white">
            <h2 className="text-xl font-bold">Simulador de Impacto IBS/CBS</h2>
            <p className="text-blue-100 text-sm opacity-90">Simulação baseada na transição do PIS/COFINS para a nova CBS.</p>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Faturamento Mensal (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                  <input 
                    type="text" 
                    defaultValue="100.000,00"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono text-lg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Alíquota Atual (PIS/COFINS)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    defaultValue="9,25"
                    className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono text-lg"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl flex gap-3">
                <Info size={20} className="text-blue-600 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  A alíquota estimada da CBS para o setor de serviços é de 8,8% (referência 2024). O IBS será adicionado gradualmente.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
              <h3 className="font-bold text-gray-800 border-b pb-3">Resumo da Simulação</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Imposto Atual (Mensal)</span>
                  <span className="font-bold text-gray-900">R$ 9.250,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Imposto Projetado (CBS)</span>
                  <span className="font-bold text-blue-600">R$ 8.800,00</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-300">
                  <span className="text-gray-900 font-bold">Diferença Projetada</span>
                  <div className="text-right">
                    <p className="text-green-600 font-bold flex items-center justify-end gap-1">
                      <TrendingUp size={16} />
                      - R$ 450,00
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium italic">Simulação de redução de 4,8%</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors">
                Gerar Relatório Detalhado
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View: Comparison */}
      {activeTab === 'compare' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              name: 'Lucro Presumido', 
              pros: ['Menor burocracia', 'Ideal para margens altas', 'Alíquotas pré-definidas'],
              cons: ['Pode pagar mais se lucro for baixo', 'Sem crédito de PIS/COFINS'],
              rate: '13,33% a 16,33%',
              bestFor: 'Serviços e Comércio'
            },
            { 
              name: 'Lucro Real', 
              pros: ['Paga sobre lucro efetivo', 'Permite créditos tributários', 'Aproveitamento de prejuízo'],
              cons: ['Exige contabilidade rigorosa', 'Alíquotas nominais maiores'],
              rate: 'Variável (~34% sobre lucro)',
              bestFor: 'Grandes Empresas e Indústrias',
              highlight: true
            },
            { 
              name: 'Simples Nacional', 
              pros: ['Guia única (DAS)', 'Menor carga administrativa', 'Isenções parciais'],
              cons: ['Limite de faturamento', 'Fator R (serviços)'],
              rate: '4% a 33% (Anexos)',
              bestFor: 'ME e EPP'
            }
          ].map((regime, idx) => (
            <div key={idx} className={`bg-white rounded-2xl border-2 transition-all p-6 space-y-4 ${regime.highlight ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-100 shadow-sm'}`}>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-900">{regime.name}</h3>
                {regime.highlight && <span className="text-[10px] font-bold text-white bg-blue-500 px-2 py-0.5 rounded-full uppercase">Sugerido</span>}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Percent size={16} className="text-blue-600" />
                  <span className="text-sm font-bold">{regime.rate}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Vantagens</p>
                  {regime.pros.map((pro, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check size={12} className="text-green-500" />
                      {pro}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 italic">Melhor para: <strong>{regime.bestFor}</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaxTools;
