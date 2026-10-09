import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, FileText, Settings, Shield, Activity, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Header } from './Header';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useMobileDrawer } from '../../hooks/useMobileDrawer';
import './MainLayout.css'; // Reusing main layout styles

const adminMenuItems = [
  { name: 'Dashboard', icon: Home, path: '/admin/dashboard' },
  { name: 'Corretores', icon: Users, path: '/admin/brokers' },
  { name: 'Contas', icon: Briefcase, path: '/admin/accounts' },
  { name: 'Planos & Assinaturas', icon: FileText, path: '/admin/billing' },
  { name: 'Logs', icon: Activity, path: '/admin/logs' },
  { name: 'Configurações Globais', icon: Settings, path: '/admin/settings' },
];

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const drawer = useMobileDrawer();
  const showCollapsed = collapsed && !isMobile;

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/admin/dashboard': return 'Admin Dashboard';
      case '/admin/brokers': return 'Corretores';
      case '/admin/accounts': return 'Contas';
      case '/admin/billing': return 'Planos & Assinaturas';
      case '/admin/logs': return 'Logs do Sistema';
      case '/admin/settings': return 'Configurações Globais';
      default: return 'Painel Admin';
    }
  };

  return (
    <div className="app-container">
      <aside
        id="app-sidebar"
        className={`sidebar ${showCollapsed ? 'collapsed' : ''} ${drawer.open ? 'mobile-open' : ''}`}
        style={{ backgroundColor: '#05070a' }}
      >
        <div className="sidebar-header" style={{ borderBottomColor: '#1A2533' }}>
          {showCollapsed ? (
            <div className="logo-collapsed" style={{ color: 'var(--color-error)' }}><Shield size={24} /></div>
          ) : (
            <div className="logo" style={{ color: 'var(--color-error)' }}><Shield size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />ADMIN<span className="neon-text" style={{ color: '#fff', textShadow: 'none' }}>PRO</span></div>
          )}

          <button
            type="button"
            className="sidebar-close"
            onClick={drawer.closeDrawer}
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', padding: '12px 12px 4px', fontWeight: 'bold' }}>
            {!showCollapsed && 'PLATAFORMA'}
          </div>
          {adminMenuItems.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path} 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              title={showCollapsed ? item.name : undefined}
              onClick={drawer.closeDrawer}
            >
              <item.icon className="sidebar-icon" size={18} />
              {!showCollapsed && <span className="sidebar-text">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button 
            className="collapse-btn" 
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expandir' : 'Recolher'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span>Recolher</span>}
          </button>
        </div>
      </aside>

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
