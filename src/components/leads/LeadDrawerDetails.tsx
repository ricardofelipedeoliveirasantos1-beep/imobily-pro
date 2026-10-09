import { useState } from 'react';
import { 
  X, MessageSquare, Phone, Mail, Clock, Plus, 
  Trash2, AlertTriangle, CheckCircle2, ChevronDown, Check,
  Home, DollarSign, MapPin, Target
} from 'lucide-react';
import type { Lead, LeadStatus, LeadNote } from '../../types/lead';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { useProperties } from '../../hooks/useProperties';
import type { Property } from '../../pages/Properties';
import './LeadDrawerDetails.css';

interface LeadDrawerDetailsProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  onAddNote: (id: string, noteText: string) => void;
  onArchive: (id: string, reason: string) => void;
  onConcludeDeal: (lead: Lead) => void;
  onConcludeDeal: (lead: Lead) => void;
  onLinkProperty?: (leadId: string, propertyId: string) => void;
  onUnlinkProperty?: (leadId: string, propertyId: string) => void;
  onOpenLinkModal?: () => void;
}

const statusOptions: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'novo', label: 'Novo Lead', color: 'var(--color-primary)' },
  { value: 'qualificacao', label: 'Qualificação', color: '#3b82f6' },
  { value: 'visita', label: 'Visita Agendada', color: '#f59e0b' },
  { value: 'proposta', label: 'Em Negociação', color: '#8b5cf6' },
  { value: 'fechado', label: 'Fechado', color: '#10b981' },
];

export function LeadDrawerDetails({ 
  isOpen, lead, onClose, onUpdateStatus, onAddNote, onArchive, onConcludeDeal, onLinkProperty, onUnlinkProperty, onOpenLinkModal
}: LeadDrawerDetailsProps) {
  const [newNote, setNewNote] = useState('');
  const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);
  
  // Archiving flow
  const [isArchiving, setIsArchiving] = useState(false);
  const [archiveReason, setArchiveReason] = useState('');
  
  // Property selection
  const { properties: realProperties } = useProperties();

  if (!isOpen || !lead) return null;

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    onAddNote(lead.id, newNote.trim());
    setNewNote('');
  };

  const getWhatsAppLink = (phone: string, name: string) => {
    const raw = phone.replace(/\D/g, '');
    const msg = encodeURIComponent(`Olá ${name}, tudo bem? Aqui é corretor da ImobilyPro.`);
    return `https://wa.me/55${raw}?text=${msg}`;
  };

  const formatCurrency = (value?: number) => {
    if (!value) return 'Não informado';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const currentStatus = statusOptions.find(s => s.value === lead.status) || statusOptions[0];

  return (
    <>
      <div className={`drawer-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`drawer-container ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-info">
            <h2 className="drawer-title" title={lead.name}>{lead.name}</h2>
            
            <div className="status-dropdown-wrapper">
              <button 
                className="status-dropdown-btn"
                style={{ 
                  backgroundColor: `${currentStatus.color}15`, 
                  color: currentStatus.color,
                  borderColor: `${currentStatus.color}40`
                }}
                onClick={() => setStatusDropdownOpen(!isStatusDropdownOpen)}
              >
                {currentStatus.label}
                <ChevronDown size={14} />
              </button>
              
              {isStatusDropdownOpen && (
                <>
                  <div className="status-dropdown-overlay" onClick={() => setStatusDropdownOpen(false)} />
                  <div className="status-dropdown-menu">
                    {statusOptions.map(opt => (
                      <button
                        key={opt.value}
                        className={`status-dropdown-item ${lead.status === opt.value ? 'active' : ''}`}
                        onClick={() => {
                          onUpdateStatus(lead.id, opt.value);
                          setStatusDropdownOpen(false);
                        }}
                      >
                        <span style={{ color: opt.color, fontWeight: 'bold' }}>•</span>
                        {opt.label}
                        {lead.status === opt.value && <Check size={14} className="ml-auto" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <button className="btn-close-drawer" onClick={onClose} aria-label="Fechar gaveta">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          
          {/* Quick Contact Section */}
          <section className="drawer-section">
            <h3 className="drawer-section-title">Contato Rápido</h3>
            
            <a 
              href={getWhatsAppLink(lead.phone, lead.name.split(' ')[0])} 
              target="_blank" rel="noreferrer"
              className="btn-whatsapp-large"
            >
              <WhatsAppIcon size={20} color="#ffffff" />
              Chamar no WhatsApp
            </a>
            
            <div className="contact-details-grid">
              <div className="contact-detail-box">
                <Phone size={16} className="text-tertiary" />
                <a href={`tel:${lead.phone.replace(/\D/g, '')}`}>{lead.phone}</a>
              </div>
              {lead.email && (
                <div className="contact-detail-box">
                  <Mail size={16} className="text-tertiary" />
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                </div>
              )}
            </div>
          </section>

          <hr className="drawer-divider" />

          {/* Profile Section */}
          <section className="drawer-section">
            <h3 className="drawer-section-title">Perfil do Lead</h3>
            
            <div className="profile-grid">
              <div className="profile-item">
                <div className="profile-item-label"><Target size={14} /> Interesse</div>
                <div className="profile-item-value capitalize">{lead.interest_type}</div>
              </div>
              <div className="profile-item">
                <div className="profile-item-label"><DollarSign size={14} /> Orçamento</div>
                <div className="profile-item-value">{formatCurrency(lead.budget_max)}</div>
              </div>
              <div className="profile-item full-width">
                <div className="profile-item-label"><MapPin size={14} /> Regiões de Preferência</div>
                <div className="profile-tags">
                  {lead.preferred_locations.length > 0 ? (
                    lead.preferred_locations.map(loc => <span key={loc} className="profile-tag">{loc}</span>)
                  ) : (
                    <span className="text-tertiary">Não informadas</span>
                  )}
                </div>
              </div>
            </div>
          </section>
          <hr className="drawer-divider" />

          {/* Properties of Interest Section */}
          <section className="drawer-section">
            <h3 className="drawer-section-title"><Home size={14} style={{marginRight: '6px', display: 'inline-block', verticalAlign: 'text-bottom'}} /> Imóveis de Interesse</h3>
            
            <div className="linked-properties-container">
              {lead.linkedProperties && lead.linkedProperties.length > 0 ? (
                <div className="linked-properties-list">
                  {lead.linkedProperties.map(propertyId => {
                    const property = realProperties.find(p => p.id === propertyId);
                    if (!property) return null;
                    return (
                      <div key={property.id} className="linked-property-card">
                        <img src={property.image} alt={property.title} className="linked-property-thumb" />
                        <div className="linked-property-info">
                          <span className="linked-property-ref">{property.reference} • {property.neighborhood}</span>
                          <h4 className="linked-property-title" title={property.title}>{property.title}</h4>
                          <span className="linked-property-price">{property.finality} • {property.price}</span>
                        </div>
                        <div className="linked-property-actions">
                          <a href={`/imoveis?id=${property.id}`} className="btn-icon text-tertiary" title="Ver Imóvel">
                            <ExternalLink size={16} />
                          </a>
                          <button 
                            className="btn-icon text-danger" 
                            title="Desvincular"
                            onClick={() => onUnlinkProperty?.(lead.id, property.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              
              <button 
                className="btn-secondary btn-sm mt-3" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={(e) => { e.stopPropagation(); onOpenLinkModal?.(); }}
              >
                <Plus size={14} /> Associar Imóvel Disponível
              </button>
            </div>
          </section>

          <hr className="drawer-divider" />

          {/* Timeline Section */}
          <section className="drawer-section timeline-section">
            <h3 className="drawer-section-title">Histórico de Atendimento</h3>
            
            <div className="note-input-container">
              <input 
                type="text" 
                placeholder="Ex: Liguei hoje, cliente quer visitar no sábado às 10h"
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddNote()}
              />
              <button className="btn-primary btn-sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                <Plus size={16} />
                Registrar
              </button>
            </div>
            
            <div className="timeline">
              {lead.notes_history && lead.notes_history.length > 0 ? (
                [...lead.notes_history].reverse().map(note => (
                  <div key={note.id} className="timeline-item">
                    <div className="timeline-icon"><Clock size={12} /></div>
                    <div className="timeline-content">
                      <p>{note.text}</p>
                      <span className="timeline-time">
                        {new Date(note.created_at).toLocaleString('pt-BR', {
                          day: '2-digit', month: '2-digit', hour: '2-digit', minute:'2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-timeline">Nenhum histórico registrado ainda.</div>
              )}
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="drawer-footer">
          {isArchiving ? (
            <div className="archive-flow">
              <input 
                type="text" 
                placeholder="Motivo da perda (ex: Comprou outro, Desistiu)"
                value={archiveReason}
                onChange={e => setArchiveReason(e.target.value)}
                autoFocus
              />
              <div className="archive-actions">
                <button className="btn-secondary" onClick={() => setIsArchiving(false)}>Cancelar</button>
                <button 
                  className="btn-danger" 
                  disabled={!archiveReason.trim()}
                  onClick={() => {
                    onArchive(lead.id, archiveReason);
                    setIsArchiving(false);
                  }}
                >
                  Confirmar Perda
                </button>
              </div>
            </div>
          ) : (
            <div className="default-footer-actions">
              <button className="btn-ghost text-tertiary" onClick={() => setIsArchiving(true)}>
                <AlertTriangle size={16} /> Arquivar / Perdido
              </button>
              
              <button className="btn-primary btn-success" onClick={() => onConcludeDeal(lead)}>
                <CheckCircle2 size={18} />
                Concluir Negócio
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
