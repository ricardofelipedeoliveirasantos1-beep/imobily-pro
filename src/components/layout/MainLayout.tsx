import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import { useMobileDrawer } from '../../hooks/useMobileDrawer';
import './MainLayout.css';

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const drawer = useMobileDrawer();

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
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={drawer.open}
        onCloseMobile={drawer.closeDrawer}
      />
      <div
        className={`sidebar-overlay ${drawer.open ? 'visible' : ''}`}
        onClick={drawer.closeDrawer}
        role="presentation"
      />

      <div className={`main-wrapper ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <Header
          collapsed={collapsed}
          pageTitle={getPageTitle(location.pathname)}
          onMenuClick={drawer.openDrawer}
          menuOpen={drawer.open}
        />
        
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
