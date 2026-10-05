import React from 'react';
import { Card } from '../ui/Card';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

export function MetricCard({ title, value, trend, trendDirection = 'neutral', icon }: MetricCardProps) {
  return (
    <Card className="metric-card">
      <div className="metric-header">
        <h4 className="metric-title">{title}</h4>
        <div className="metric-icon">{icon}</div>
      </div>
      <div className="metric-content">
        <span className="metric-value">{value}</span>
        {trend && (
          <span className={`metric-trend trend-${trendDirection}`}>
            {trend}
          </span>
        )}
      </div>
    </Card>
  );
}
