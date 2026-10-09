import { NavLink } from 'react-router-dom';
import {
  Home, Building, Users, Briefcase, Calendar,
  FileText, PenTool, DollarSign, BarChart2,
  Globe, Link, Settings, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import './Sidebar.css';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Imóveis', icon: Building, path: '/properties' },
  { name: 'Leads', icon: Users, path: '/leads' },
  { name: 'Clientes', icon: Briefcase, path: '/clients' },
  { name: 'Agenda', icon: Calendar, path: '/appointments' },
  { name: 'Propostas', icon: FileText, path: '/proposals' },
  { name: 'Contratos', icon: PenTool, path: '/contracts' },
  { name: 'Financeiro', icon: DollarSign, path: '/finance' },
  { name: 'Relatórios', icon: BarChart2, path: '/reports' },
  { name: 'Site Público', icon: Globe, path: '/public-site' },
  { name: 'Integrações', icon: Link, path: '/integrations' },
  { name: 'Configurações', icon: Settings, path: '/settings' },
];

export function Sidebar({ collapsed, setCollapsed, mobileOpen = false, onCloseMobile }: SidebarProps) {
  const isMobile = useIsMobile();
  const showCollapsed = collapsed && !isMobile;

  return (
    <aside id="app-sidebar" className={`sidebar ${showCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        {showCollapsed ? (
          <div className="logo-collapsed">IM<span className="neon-text">P</span></div>
        ) : (
          <div className="logo">IMOBILY<span className="neon-text">PRO</span></div>
        )}

        <button
          type="button"
          className="sidebar-close"
          onClick={onCloseMobile}
          aria-label="Fechar menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            title={showCollapsed ? item.name : undefined}
            onClick={onCloseMobile}
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
  );
}
