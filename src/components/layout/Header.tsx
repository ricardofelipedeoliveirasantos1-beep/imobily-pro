import React from 'react';
import { Search, Bell, HelpCircle, User, LogOut, Settings, Menu } from 'lucide-react';
import { IconButton } from '../ui/Button';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  collapsed: boolean;
  pageTitle: string;
  onMenuClick?: () => void;
  menuOpen?: boolean;
}

export function Header({ collapsed, pageTitle, onMenuClick, menuOpen = false }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleLogout = () => {
    if (window.confirm('Sair da sua conta?')) {
      logout();
      navigate('/login', { replace: true });
    }
  };

  return (
    <header className={`header ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="header-left">
        {onMenuClick && (
          <button
            type="button"
            className="menu-toggle"
            onClick={onMenuClick}
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
            aria-controls="app-sidebar"
          >
            <Menu size={22} />
          </button>
        )}
        <h1 className="header-title">{pageTitle}</h1>
      </div>

      <div className="header-right">
        <div className="global-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar imóveis, clientes..." 
            className="search-input"
          />
        </div>

        <div className="header-actions">
          <IconButton>
            <Bell size={18} />
          </IconButton>
          <IconButton className="help-btn">
            <HelpCircle size={18} />
          </IconButton>
          
          <div className="profile-menu-container" style={{ position: 'relative' }}>
            <button 
              className="avatar-btn" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <User size={18} />
            </button>
            
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <strong>{user?.name}</strong>
                  <span>{user?.role === 'super_admin' ? 'Super Admin' : 'Corretor Pro'}</span>
                </div>
                <hr />
                <button className="dropdown-item"><User size={16}/> Meu Perfil</button>
                <button className="dropdown-item"><Settings size={16}/> Configurações</button>
                <hr />
                <button className="dropdown-item logout" onClick={handleLogout}><LogOut size={16}/> Sair</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
