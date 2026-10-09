import { useState } from 'react';
import { X, Search } from 'lucide-react';
import type { Lead } from '../../types/lead';
import type { Property } from '../../pages/Properties';

interface LinkPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  properties: Property[];
  onLinkProperty: (leadId: string, propertyId: string) => void;
}

export function LinkPropertyModal({ isOpen, onClose, lead, properties, onLinkProperty }: LinkPropertyModalProps) {
  const [propertySearch, setPropertySearch] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  if (!isOpen || !lead) return null;

  const filteredProperties = properties.filter(p => {
    const matchSearch = p.reference.toLowerCase().includes(propertySearch.toLowerCase()) || 
                      p.neighborhood.toLowerCase().includes(propertySearch.toLowerCase()) ||
                      p.title.toLowerCase().includes(propertySearch.toLowerCase());
    
    const matchInterest = lead.interest_type === 'compra' ? p.finality === 'Venda' : p.finality === 'Aluguel';
    const notLinked = !(lead.linkedProperties || []).includes(p.id);
    const isAvailable = p.status === 'available';
    
    return matchSearch && matchInterest && notLinked && isAvailable;
  });

  const handleConfirm = () => {
    if (selectedPropertyId) {
      onLinkProperty(lead.id, selectedPropertyId);
      setSelectedPropertyId(null);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="modal-container" style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', maxHeight: '80vh', position: 'relative', margin: '0 20px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">Selecionar Imóvel Disponível</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="modal-body" style={{ overflowY: 'auto', flex: 1 }}>
          <div className="search-input-wrapper mb-4" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} className="search-icon" style={{ position: 'absolute', left: '12px', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Buscar por código (REF) ou bairro..." 
              value={propertySearch}
              onChange={e => setPropertySearch(e.target.value)}
              autoFocus
              style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid var(--border-normal)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            />
          </div>
          
          <div className="property-search-results" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredProperties.length > 0 ? filteredProperties.map(p => (
              <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: '1px solid var(--border-normal)', borderRadius: '8px', cursor: 'pointer', background: selectedPropertyId === p.id ? 'var(--bg-secondary)' : 'transparent' }}>
                <input 
                  type="checkbox" 
                  checked={selectedPropertyId === p.id}
                  onChange={() => setSelectedPropertyId(selectedPropertyId === p.id ? null : p.id)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <img src={p.image} alt={p.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                <div style={{ flex: 1 }}>
                  <div><strong>{p.reference}</strong> <span title={p.title} style={{ color: 'var(--text-secondary)' }}>{p.title}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      fontSize: '10px', 
                      borderRadius: '4px',
                      background: p.finality === 'Venda' ? '#10b981' : '#3b82f6',
                      color: 'white'
                    }}>
                      {p.finality}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{p.neighborhood} • {p.price}</span>
                  </div>
                </div>
              </label>
            )) : (
              <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '20px 0' }}>Nenhum imóvel disponível encontrado.</p>
            )}
          </div>
        </div>
        
        <div className="modal-footer" style={{ borderTop: '1px solid var(--border-normal)', padding: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleConfirm} disabled={!selectedPropertyId}>
            Selecionar
          </button>
        </div>
      </div>
    </div>
  );
}
