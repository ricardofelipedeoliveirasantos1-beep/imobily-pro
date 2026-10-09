import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Search, Filter, MoreVertical, Plus, Building2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { MetricCard } from '../../components/dashboard/MetricCard';
import type { Agency } from '../../types/agency';
import './Accounts.css';

const MOCK_AGENCIES: Agency[] = [
  {
    id: '1',
    name: 'Imobiliária Prime',
    document: '12.345.678/0001-90',
    email: 'contato@prime.com.br',
    status: 'ACTIVE',
    planId: 'pro_plan_1',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Nova Casa Imóveis',
    document: '98.765.432/0001-10',
    email: 'ola@novacasa.com.br',
    status: 'TRIAL',
    planId: 'trial_plan_1',
    createdAt: '2026-10-01T14:30:00Z',
    updatedAt: '2026-10-01T14:30:00Z',
  },
  {
    id: '3',
    name: 'Exclusiva Brokers',
    document: '45.123.890/0001-55',
    email: 'adm@exclusivabrokers.com.br',
    status: 'SUSPENDED',
    planId: 'pro_plan_1',
    createdAt: '2025-11-20T09:15:00Z',
    updatedAt: '2026-09-05T11:20:00Z',
  }
];

export function Accounts() {
  const [agencies] = useState<Agency[]>(MOCK_AGENCIES);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgencies = agencies.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.document?.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <span className="status-badge status-active">Ativo</span>;
      case 'TRIAL': return <span className="status-badge status-trial">Trial</span>;
      case 'SUSPENDED': return <span className="status-badge status-suspended">Suspenso</span>;
      case 'BLOCKED': return <span className="status-badge status-blocked">Bloqueado</span>;
      default: return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="accounts-page">
      <header className="page-header">
        <div>
          <h2 className="page-title">Contas (Agências)</h2>
          <p className="page-subtitle">Gerencie as imobiliárias e corretores independentes da plataforma.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} />
          Nova Conta
        </button>
      </header>

      <div className="accounts-metrics">
        <MetricCard 
          title="Total de Contas" 
          value={agencies.length.toString()} 
          icon={<Building2 size={24} />} 
        />
        <MetricCard 
          title="Ativas (Pro)" 
          value={agencies.filter(a => a.status === 'ACTIVE').length.toString()} 
          icon={<CheckCircle size={24} />} 
        />
        <MetricCard 
          title="Em Trial" 
          value={agencies.filter(a => a.status === 'TRIAL').length.toString()} 
          icon={<Clock size={24} />} 
        />
        <MetricCard 
          title="Inadimplentes/Suspensas" 
          value={agencies.filter(a => a.status === 'SUSPENDED').length.toString()} 
          icon={<AlertTriangle size={24} />} 
        />
      </div>

      <Card className="accounts-list-card">
        <div className="list-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou CNPJ..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary">
            <Filter size={18} />
            Filtros
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome da Agência</th>
                <th>Documento (CNPJ/CPF)</th>
                <th>Email</th>
                <th>Plano</th>
                <th>Status</th>
                <th>Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgencies.map((agency) => (
                <tr key={agency.id}>
                  <td className="fw-medium">{agency.name}</td>
                  <td className="text-tertiary">{agency.document || '-'}</td>
                  <td className="text-tertiary">{agency.email}</td>
                  <td>
                    <span className="plan-tag">
                      {agency.planId.includes('pro') ? 'PRO' : 'TRIAL'}
                    </span>
                  </td>
                  <td>{getStatusBadge(agency.status)}</td>
                  <td className="text-tertiary">
                    {new Date(agency.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td>
                    <button className="btn-icon">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAgencies.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center empty-state-row">
                    Nenhuma conta encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
