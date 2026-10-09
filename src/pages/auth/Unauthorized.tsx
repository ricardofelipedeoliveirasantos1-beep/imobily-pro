import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' }}>
      <h1>Acesso não autorizado</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Você não possui permissão para acessar esta área.</p>
      <Button onClick={() => navigate('/')}>Voltar para o dashboard</Button>
    </div>
  );
}
