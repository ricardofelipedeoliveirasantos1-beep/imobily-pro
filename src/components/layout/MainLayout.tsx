import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import './MainLayout.css';

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'Dashboard';
      case '/properties': return 'Imóveis';
      case '/leads': return 'Leads';
      case '/clients': return 'Clientes';
      case '/appointments': return 'Agenda';
      case '/proposals': return 'Propostas';
      case '/contracts': return 'Contratos';
      case '/finance': return 'Financeiro';
      case '/reports': return 'Relatórios';
      case '/public-site': return 'Site Público';
      case '/integrations': return 'Integrações';
      case '/settings': return 'Configurações';
      default: return 'Imobilypro';
    }
  };

  return (
    <div className="app-container">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className={`main-wrapper ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <Header collapsed={collapsed} pageTitle={getPageTitle(location.pathname)} />
        
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
