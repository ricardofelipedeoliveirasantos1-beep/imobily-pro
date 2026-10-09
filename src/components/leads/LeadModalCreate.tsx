import { useState, useRef, useEffect } from 'react';
import { 
  X, User, Phone, Mail, DollarSign, MapPin, 
  MessageSquare, ChevronDown, Check, Loader2,
  Smartphone, Camera, Globe, HelpCircle, MessageCircle, UserPlus,
  Home, Search
} from 'lucide-react';
import { useLeadForm } from '../../hooks/useLeadForm';
import { useProperties } from '../../hooks/useProperties';
import type { LeadOrigin } from '../../types/lead';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import './LeadModalCreate.css';

interface LeadModalCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data?: any) => void;
}

const origins: { value: LeadOrigin; label: string; icon: React.ReactNode }[] = [
  { value: 'whatsapp', label: 'WhatsApp', icon: <WhatsAppIcon size={16} color="currentColor" /> },
  { value: 'instagram', label: 'Instagram', icon: <Camera size={16} /> },
  { value: 'zap', label: 'ZAP Imóveis', icon: <Globe size={16} /> },
  { value: 'vivareal', label: 'Viva Real', icon: <Globe size={16} /> },
  { value: 'site', label: 'Site Próprio', icon: <Smartphone size={16} /> },
  { value: 'indicacao', label: 'Indicação', icon: <User size={16} /> },
  { value: 'manual', label: 'Manual/Outro', icon: <HelpCircle size={16} /> },
];

export function LeadModalCreate({ isOpen, onClose, onSuccess }: LeadModalCreateProps) {
  const { 
    formData, errors, isSubmitting, 
    handleChange, addLocation, removeLocation, submitForm, setPropertyIds
  } = useLeadForm();
  
  const { properties: realProperties } = useProperties();
  
  const [locationInput, setLocationInput] = useState('');
  const [showOrigins, setShowOrigins] = useState(false);
  const [propertySearch, setPropertySearch] = useState('');
  const [isSearchingProperty, setIsSearchingProperty] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<typeof realProperties>([]);
  const originRef = useRef<HTMLDivElement>(null);
  const propertySearchRef = useRef<HTMLDivElement>(null);

  // Sincroniza estado local com hook do formulário
  useEffect(() => {
    const ids = selectedProperties.map(p => p.id);
    const firstPrice = selectedProperties.length > 0 ? selectedProperties[0].price : undefined;
    setPropertyIds(ids, firstPrice);
  }, [selectedProperties]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOrigins(false);
      }
      if (propertySearchRef.current && !propertySearchRef.current.contains(event.target as Node)) {
        setIsSearchingProperty(false);
      }
    };
    if (showOrigins || isSearchingProperty) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOrigins, isSearchingProperty]);

  if (!isOpen) return null;

  const handleSelectProperty = (propertyId: string) => {
    const prop = realProperties.find(p => p.id === propertyId);
    if (!prop) return;
    
    // Toggle (Add/Remove)
    if (selectedProperties.some(p => p.id === propertyId)) {
      setSelectedProperties(prev => prev.filter(p => p.id !== propertyId));
    } else {
      setSelectedProperties(prev => [...prev, prop]);
      setPropertySearch('');
      // Não fecha o dropdown para permitir mais seleções
      // Adiciona o bairro automaticamente às tags de interesse
      if (prop.neighborhood) {
        addLocation(prop.neighborhood);
      }
    }
  };

  const handleRemoveProperty = (propertyId: string) => {
    setSelectedProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (locationInput) {
        addLocation(locationInput);
        setLocationInput('');
      }
    }
  };

  const handleSave = () => {
    submitForm((data) => {
      // toast success logic here
      alert('Lead criado com sucesso!'); // TODO: replace with proper toast
      onSuccess(data);
      onClose();
    });
  };

  const selectedOrigin = origins.find(o => o.value === formData.origin);

  return (
    <div className="modal-backdrop">
      <div className="modal-container lead-modal-container">
        
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">Cadastrar Novo Lead</h2>
            <p className="modal-subtitle">Preencha as informações do novo contato.</p>
          </div>
          <button className="btn-close-modal" onClick={onClose} aria-label="Fechar">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body lead-modal-body">
          {/* Dados Pessoais */}
          <section className="form-section">
            <h3 className="section-title">Dados do Contato</h3>
            
            <div className="form-group">
              <label>Nome Completo *</label>
              <div className={`input-with-icon ${errors.name ? 'input-error' : ''}`}>
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="Ex: João da Silva"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>WhatsApp *</label>
                <div className={`input-with-icon ${errors.phone ? 'input-error' : ''}`}>
                  <Phone size={18} className="input-icon" />
                  <input 
                    type="tel" 
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    maxLength={15}
                  />
                </div>
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group flex-1">
                <label>E-mail (Opcional)</label>
                <div className={`input-with-icon ${errors.email ? 'input-error' : ''}`}>
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="joao@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Origem do Lead</label>
              <div className="segmented-control origin-control">
                <button
                  type="button"
                  className={`segment ${formData.origin === 'whatsapp' ? 'active' : ''}`}
                  onClick={() => handleChange('origin', 'whatsapp')}
                >
                  <WhatsAppIcon size={16} color="currentColor" /> WhatsApp
                </button>
                <button
                  type="button"
                  className={`segment ${formData.origin === 'instagram' ? 'active' : ''}`}
                  onClick={() => handleChange('origin', 'instagram')}
                >
                  <Globe size={16} /> Portais / Sociais
                </button>
                <button
                  type="button"
                  className={`segment ${formData.origin === 'indicacao' ? 'active' : ''}`}
                  onClick={() => handleChange('origin', 'indicacao')}
                >
                  <UserPlus size={16} /> Indicação
                </button>
              </div>
            </div>
          </section>

          {/* Interesse */}
          <section className="form-section">
            <h3 className="section-title">Interesse</h3>
            
            <div className="form-group">
              <label>Tipo de Negócio</label>
              <div className="segmented-control interest-control">
                <button
                  type="button"
                  className={`segment segment-compra ${formData.interest_type === 'compra' ? 'active' : ''}`}
                  onClick={() => handleChange('interest_type', 'compra')}
                >
                  Compra
                </button>
                <button
                  type="button"
                  className={`segment segment-locacao ${formData.interest_type === 'locacao' ? 'active' : ''}`}
                  onClick={() => handleChange('interest_type', 'locacao')}
                >
                  Locação
                </button>
              </div>
            </div>

            <div className="form-group" style={{ position: 'relative' }} ref={propertySearchRef}>
              <label>Vincular Imóvel Específico do Catálogo <span className="text-tertiary">(Opcional)</span></label>
              <div className="input-with-icon">
                <Home size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="Buscar imóvel por código (REF) ou bairro..."
                  value={propertySearch}
                  onChange={(e) => {
                    setPropertySearch(e.target.value);
                    setIsSearchingProperty(true);
                  }}
                  onFocus={() => setIsSearchingProperty(true)}
                  onClick={() => setIsSearchingProperty(true)}
                />
              </div>

              {selectedProperties.length > 0 && (
                <div className="modal-selected-properties-container mt-2">
                  <div className="text-secondary text-sm mb-1">Imóveis Selecionados ({selectedProperties.length})</div>
                  <div className="modal-selected-properties-list">
                    {selectedProperties.map(selectedProp => (
                      <div key={selectedProp.id} className="modal-property-search-item selected" style={{ border: '1px solid var(--border-normal)', cursor: 'default', padding: '8px' }}>
                        <img src={selectedProp.image} alt={selectedProp.title} className="psi-thumb" />
                        <div className="psi-info">
                          <strong>{selectedProp.reference}</strong> <span className="psi-title">{selectedProp.title}</span>
                          <span>{selectedProp.neighborhood} • {selectedProp.price}</span>
                        </div>
                        <button type="button" className="btn-clear-property" onClick={() => handleRemoveProperty(selectedProp.id)}>
                          <X size={16} className="text-danger" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="help-text mt-1">Selecione os imóveis que o cliente demonstrou interesse ou deixe em branco para busca geral.</p>
              
              {isSearchingProperty && (
                <div className="modal-property-search-results">
                  {realProperties
                    .filter(p => {
                      const matchSearch = p.reference.toLowerCase().includes(propertySearch.toLowerCase()) || 
                                        p.neighborhood.toLowerCase().includes(propertySearch.toLowerCase()) ||
                                        p.title.toLowerCase().includes(propertySearch.toLowerCase());
                      const matchInterest = formData.interest_type === 'compra' ? p.finality === 'Venda' : p.finality === 'Aluguel';
                      const isAvailable = p.status === 'available';
                      return matchSearch && matchInterest && isAvailable;
                    })
                    .map(p => {
                      const isSelected = selectedProperties.some(sel => sel.id === p.id);
                      return (
                        <div key={p.id} className={`modal-property-search-item ${isSelected ? 'is-selected' : ''}`} onMouseDown={(e) => {
                          e.preventDefault(); 
                          handleSelectProperty(p.id);
                        }}>
                          <img src={p.image} alt={p.title} className="psi-thumb" />
                          <div className="psi-info">
                            <strong>{p.reference}</strong> <span className="psi-title">{p.title}</span>
                            <span>{p.neighborhood} • {p.price}</span>
                          </div>
                          {isSelected && (
                            <div className="psi-check text-success">
                              <Check size={18} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  {realProperties.filter(p => {
                    const matchSearch = p.reference.toLowerCase().includes(propertySearch.toLowerCase()) || 
                                      p.neighborhood.toLowerCase().includes(propertySearch.toLowerCase()) ||
                                      p.title.toLowerCase().includes(propertySearch.toLowerCase());
                    const matchInterest = formData.interest_type === 'compra' ? p.finality === 'Venda' : p.finality === 'Aluguel';
                    const isAvailable = p.status === 'available';
                    return matchSearch && matchInterest && isAvailable;
                  }).length === 0 && (
                    <div className="modal-property-search-empty">Nenhum imóvel encontrado.</div>
                  )}
                </div>
              )}
            </div>

            <div className="form-group-dynamic">
              {formData.interest_type === 'compra' ? (
                <>
                  <div className="form-group">
                    <label>Orçamento Máximo de Compra (R$)</label>
                    <div className="input-with-icon">
                      <DollarSign size={18} className="input-icon" />
                      <input 
                        type="text" 
                        placeholder="Ex: R$ 650.000,00"
                        value={formData.budget_max}
                        onChange={(e) => handleChange('budget_max', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row mt-3">
                    <div className="form-group flex-1">
                      <label>Forma de Pagamento Pretendida</label>
                      <select 
                        className="custom-select-button" 
                        value={formData.payment_method}
                        onChange={(e) => handleChange('payment_method', e.target.value)}
                      >
                        <option value="">Selecione...</option>
                        <option value="À Vista">À Vista</option>
                        <option value="Financiamento Bancário">Financiamento Bancário</option>
                        <option value="Uso de FGTS">Uso de FGTS</option>
                        <option value="Tem Imóvel na Permuta">Tem Imóvel na Permuta</option>
                      </select>
                    </div>
                    <div className="form-group flex-1">
                      <label>Valor para Entrada (Opcional)</label>
                      <div className="input-with-icon">
                        <DollarSign size={18} className="input-icon" />
                        <input 
                          type="text" 
                          placeholder="Ex: R$ 120.000,00"
                          value={formData.down_payment}
                          onChange={(e) => handleChange('down_payment', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Aluguel Máximo Mensal (R$)</label>
                    <div className="input-with-icon">
                      <DollarSign size={18} className="input-icon" />
                      <input 
                        type="text" 
                        placeholder="Ex: R$ 3.500,00/mês"
                        value={formData.budget_max}
                        onChange={(e) => handleChange('budget_max', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row mt-3">
                    <div className="form-group flex-1">
                      <label>Garantia Locatícia de Preferência</label>
                      <select 
                        className="custom-select-button" 
                        value={formData.rental_guarantee}
                        onChange={(e) => handleChange('rental_guarantee', e.target.value)}
                      >
                        <option value="">Selecione...</option>
                        <option value="Seguro Fiança">Seguro Fiança</option>
                        <option value="Caução (3 meses)">Caução (3 meses)</option>
                        <option value="Fiador">Fiador</option>
                        <option value="Cartão de Crédito">Cartão de Crédito (CredPago/similar)</option>
                      </select>
                    </div>
                    <div className="form-group flex-1">
                      <label>Previsão de Mudança</label>
                      <select 
                        className="custom-select-button" 
                        value={formData.move_in_forecast}
                        onChange={(e) => handleChange('move_in_forecast', e.target.value)}
                      >
                        <option value="">Selecione...</option>
                        <option value="Imediata">Imediata (até 15 dias)</option>
                        <option value="Em 30 a 60 dias">Em 30 a 60 dias</option>
                        <option value="Apenas pesquisando">Apenas pesquisando</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="form-group">
              <label>Bairros/Regiões de Interesse</label>
              <div className="tags-input-container">
                <MapPin size={18} className="input-icon" />
                <div className="tags-wrapper">
                  {formData.preferred_locations.map(loc => (
                    <span key={loc} className="tag-badge">
                      {loc}
                      <button type="button" onClick={() => removeLocation(loc)}><X size={14}/></button>
                    </span>
                  ))}
                  <input 
                    type="text" 
                    placeholder="Digite e aperte Enter..."
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={handleLocationKeyDown}
                    onBlur={() => {
                      if(locationInput) { addLocation(locationInput); setLocationInput(''); }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Observações Adicionais</label>
              <textarea 
                className="custom-textarea"
                placeholder="O que o cliente está buscando? Tem pet? Quantas pessoas? etc..."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={3}
              />
            </div>
          </section>

        </div>

        <div className="modal-footer lead-modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </button>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? <><Loader2 size={18} className="spin" /> Salvando...</> : 'Cadastrar Lead'}
          </button>
        </div>
      </div>
    </div>
  );
}
