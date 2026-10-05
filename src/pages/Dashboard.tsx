import React from 'react';
import { Home, Users, CheckCircle, Eye, Plus } from 'lucide-react';
import { MetricCard } from '../components/dashboard/MetricCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import './Dashboard.css';

export function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Visão geral da sua operação imobiliária.</h2>
        </div>
        <div className="dashboard-actions">
          <Button variant="primary">
            <Plus size={18} style={{ marginRight: 8 }} /> Adicionar imóvel
          </Button>
        </div>
      </div>

      <div className="dashboard-grid metrics-grid">
        <MetricCard 
          title="Imóveis ativos" 
          value="1.248" 
          trend="+8,4%" 
          trendDirection="up" 
          icon={<Home size={24} />} 
        />
        <MetricCard 
          title="Leads" 
          value="342" 
          trend="+12%" 
          trendDirection="up" 
          icon={<Users size={24} />} 
        />
        <MetricCard 
          title="Vendas" 
          value="45" 
          trend="-2%" 
          trendDirection="down" 
          icon={<CheckCircle size={24} />} 
        />
        <MetricCard 
          title="Visitas" 
          value="128" 
          trend="+5%" 
          trendDirection="up" 
          icon={<Eye size={24} />} 
        />
      </div>

      <div className="dashboard-grid charts-grid">
        <Card className="chart-card">
          <h3 className="card-title">Desempenho</h3>
          <div className="chart-placeholder">
            Gráfico de desempenho será inserido aqui
          </div>
        </Card>
        <Card className="chart-card">
          <h3 className="card-title">Pipeline / Leads</h3>
          <div className="chart-placeholder">
            Gráfico de leads será inserido aqui
          </div>
        </Card>
      </div>

      <div className="dashboard-grid charts-grid">
        <Card className="chart-card">
          <h3 className="card-title">Imóveis recentes</h3>
          <div className="chart-placeholder">
            Lista de imóveis recentes
          </div>
        </Card>
        <Card className="chart-card">
          <h3 className="card-title">Próximos compromissos</h3>
          <div className="chart-placeholder">
            Lista de compromissos
          </div>
        </Card>
      </div>
      
      <div className="dashboard-grid">
        <Card className="full-width-card">
          <h3 className="card-title">Atividades recentes</h3>
          <div className="chart-placeholder">
            Timeline de atividades
          </div>
        </Card>
      </div>
    </div>
  );
}
