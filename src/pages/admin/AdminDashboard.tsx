import React from 'react';
import { Card } from '../../components/ui/Card';
import { Users, CheckCircle, BarChart2 } from 'lucide-react';
import { MetricCard } from '../../components/dashboard/MetricCard';

export function AdminDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h2 style={{ margin: 0, color: 'var(--text-secondary)' }}>Dashboard Administrativo</h2>
        <p style={{ color: 'var(--text-tertiary)' }}>Visão geral da plataforma Imobilypro.</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <MetricCard 
          title="Total de Corretores" 
          value="156" 
          icon={<Users size={24} />} 
        />
        <MetricCard 
          title="Contas Ativas" 
          value="142" 
          trend="+5%" 
          trendDirection="up" 
          icon={<CheckCircle size={24} />} 
        />
        <MetricCard 
          title="Receita Mensal" 
          value="R$ 42.500" 
          trend="+12%" 
          trendDirection="up" 
          icon={<BarChart2 size={24} />} 
        />
      </div>

      <Card style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--text-tertiary)' }}>Gráfico Administrativo Mockado</span>
      </Card>
    </div>
  );
}
