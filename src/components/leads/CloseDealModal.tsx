import { useState } from 'react';
import { X, CheckCircle2, DollarSign, Home, Percent, Loader2 } from 'lucide-react';
import type { Lead } from '../../types/lead';
import './CloseDealModal.css';

interface CloseDealModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onConfirm: (data: { property: string; value: number; commission: number }) => void;
}

export function CloseDealModal({ isOpen, lead, onClose, onConfirm }: CloseDealModalProps) {
  const [property, setProperty] = useState('');
  const [value, setValue] = useState(lead?.budget_max ? lead.budget_max.toString() : '');
  const [commission, setCommission] = useState('6');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !lead) return null;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm({
        property,
        value: Number(value.replace(/\D/g, '')) / 100 || 0,
        commission: Number(commission.replace(/\D/g, '')) || 0
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const formatCurrency = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (!raw) return '';
    const num = (parseInt(raw, 10) / 100).toFixed(2);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(num));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container close-deal-modal">
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">Concluir Negócio 🎉</h2>
            <p className="modal-subtitle">Fechando negócio com {lead.name}</p>
          </div>
          <button className="btn-close-modal" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Imóvel Vendido / Locado</label>
            <div className="input-with-icon">
              <Home size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Ref. ou Endereço do Imóvel" 
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group flex-1">
              <label>Valor Final (R$)</label>
              <div className="input-with-icon">
                <DollarSign size={18} className="input-icon" />
                <input 
                  type="text" 
                  value={formatCurrency(value)}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group flex-1">
              <label>Comissão (%)</label>
              <div className="input-with-icon">
                <Percent size={18} className="input-icon" />
                <input 
                  type="number" 
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose} disabled={isSubmitting}>Cancelar</button>
          <button className="btn-primary btn-success" onClick={handleConfirm} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 size={18} className="spin" /> Processando...</> : <><CheckCircle2 size={18} /> Confirmar Fechamento</>}
          </button>
        </div>
      </div>
    </div>
  );
}
