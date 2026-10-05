import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../auth/AuthContext';
import { ROLE_SUPER_ADMIN } from '../../auth/roles';
import './Login.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Informe seu e-mail.');
      return;
    }
    if (!password) {
      setError('Informe sua senha.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login(email, password);
      
      // We need to fetch the session from localStorage to determine where to redirect
      // because context updates on next render.
      const session = localStorage.getItem('@imobilypro:session');
      if (session) {
        const { user } = JSON.parse(session);
        if (user.role === ROLE_SUPER_ADMIN) {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-branding">
          <div className="logo-large">IMOBILY<span className="neon-text">PRO</span></div>
          <p className="login-tagline">Gestão imobiliária mais inteligente.</p>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-card">
          <h2 className="login-title">Entrar na sua conta</h2>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>E-mail</label>
              <Input 
                type="email" 
                placeholder="exemplo@imobilypro.local" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                icon={<Mail size={18} />}
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <div className="password-input-wrapper">
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Sua senha" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  icon={<Lock size={18} />}
                />
                <button 
                  type="button" 
                  className="toggle-password" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <div className="login-error">{error}</div>}

            <Button type="submit" variant="primary" disabled={loading} className="login-btn">
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            
            <div className="login-links">
              <Link to="/forgot-password">Esqueci minha senha</Link>
              <Link to="/register">Não possui uma conta? Criar conta</Link>
            </div>
          </form>

          {/* Dev Mode Panel */}
          <div className="dev-panel">
            <h4>[DEV] Contas Mock</h4>
            <p>Admin: admin@imobilypro.local / admin123</p>
            <p>Corretor: corretor@imobilypro.local / corretor123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
