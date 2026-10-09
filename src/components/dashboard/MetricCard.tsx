import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  type?: 'ativos' | 'leads' | 'vendas' | 'visitas';
}

export function MetricCard({ title, value, trend, trendDirection = 'neutral', icon, type = 'ativos' }: MetricCardProps) {
  return (
    <div className={`new-metric-card type-${type}`}>
      <div className="nm-header">
        <h4 className="nm-title">{title}</h4>
        <div className="nm-icon-wrapper">
          {icon}
        </div>
      </div>
      <div className="nm-content">
        <span className="nm-value">{value}</span>
      </div>
      <div className="nm-footer">
        {trend ? (
          <>
            <span className={`nm-trend-badge ${trendDirection === 'up' ? 'trend-up' : 'trend-down'}`}>
              {trendDirection === 'up' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
              {trend}
            </span>
            <div className="nm-vs-container">
              <span className="nm-vs-label">Rótulo</span>
              <span className="nm-vs">vs. mês anterior</span>
            </div>
          </>
        ) : (
          <div className="nm-vs-container" style={{ opacity: 0.5 }}>
            <span className="nm-vs">Sem histórico anterior</span>
          </div>
        )}
      </div>
    </div>
  );
}
