import { useState, useMemo } from 'react';
import { 
  Plus, Search, Filter, Kanban, List as ListIcon, 
  MoreVertical, Phone, MessageSquare, Camera, Globe, Smartphone, User, HelpCircle,
  ExternalLink
} from 'lucide-react';
import { LeadModalCreate } from '../components/leads/LeadModalCreate';
import { LeadDrawerDetails } from '../components/leads/LeadDrawerDetails';
import { CloseDealModal } from '../components/leads/CloseDealModal';
import { LinkPropertyModal } from '../components/leads/LinkPropertyModal';
import type { Lead, LeadStatus, LeadOrigin } from '../types/lead';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { useProperties } from '../hooks/useProperties';
import './Leads.css';

// Mock initial data
const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    phone: '(11) 98765-4321',
    origin: 'whatsapp',
    interest_type: 'compra',
    budget_max: 850000,
    preferred_locations: ['Jardins', 'Pinheiros'],
    status: 'novo',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Ana Carolina',
    phone: '(11) 91234-5678',
    origin: 'instagram',
    interest_type: 'locacao',
    budget_max: 4500,
    preferred_locations: ['Moema'],
    status: 'qualificacao',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    name: 'Roberto Justo',
    phone: '(21) 99999-8888',
    origin: 'zap',
    interest_type: 'compra',
    budget_max: 1200000,
    preferred_locations: ['Barra da Tijuca'],
    status: 'visita',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  }
];

const COLUMNS: { id: LeadStatus; label: string; color: string }[] = [
  { id: 'novo', label: 'Novo Lead', color: 'var(--color-primary)' },
  { id: 'qualificacao', label: 'Qualificação', color: '#3b82f6' },
  { id: 'visita', label: 'Visita Agendada', color: '#f59e0b' },
  { id: 'proposta', label: 'Em Negociação', color: '#8b5cf6' },
  { id: 'fechado', label: 'Fechado', color: '#10b981' },
];

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals/Drawers states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const { properties: realProperties } = useProperties();
  
  const [leadToClose, setLeadToClose] = useState<Lead | null>(null);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  
  // Drag and drop state
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

  // Card dropdown state
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const formatCurrency = (value?: number, interestType?: string) => {
    if (!value) return 'Sob consulta';
    const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    return interestType === 'locacao' ? `${formatted}/mês` : formatted;
  };

  const getOriginIcon = (origin: LeadOrigin) => {
    switch (origin) {
      case 'whatsapp': return <WhatsAppIcon size={14} className="origin-icon whatsapp" color="currentColor" />;
      case 'instagram': return <Camera size={14} className="origin-icon instagram" />;
      case 'zap': 
      case 'vivareal': return <Globe size={14} className="origin-icon portals" />;
      case 'site': return <Smartphone size={14} className="origin-icon site" />;
      case 'indicacao': return <User size={14} className="origin-icon" />;
      default: return <HelpCircle size={14} className="origin-icon" />;
    }
  };

  const getWhatsAppLink = (phone: string) => {
    const raw = phone.replace(/\D/g, '');
    return `https://wa.me/55${raw}`;
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(id);
    // Needed for Firefox
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStatus: LeadStatus) => {
    e.preventDefault();
    if (!draggedLeadId) return;

    const lead = leads.find(l => l.id === draggedLeadId);
    if (!lead) return;

    if (targetStatus === 'fechado' && lead.status !== 'fechado') {
      // Trigger close deal modal instead of immediate change
      setLeadToClose(lead);
      setIsCloseModalOpen(true);
      setDraggedLeadId(null);
      return;
    }

    setLeads(prev => prev.map(l => 
      l.id === draggedLeadId ? { ...l, status: targetStatus } : l
    ));
    
    // Update selected lead if it's open in drawer
    if (selectedLead?.id === draggedLeadId) {
      setSelectedLead(prev => prev ? { ...prev, status: targetStatus } : null);
    }
    setDraggedLeadId(null);
  };

  // Drawer handlers
  const handleCardClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleUpdateStatus = (id: string, status: LeadStatus) => {
    if (status === 'fechado') {
      setIsDrawerOpen(false);
      const lead = leads.find(l => l.id === id);
      if (lead) {
        setLeadToClose(lead);
        setIsCloseModalOpen(true);
      }
      return;
    }
    
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    if (selectedLead?.id === id) {
      setSelectedLead(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleAddNote = (id: string, text: string) => {
    const newNote = { id: Math.random().toString(), text, created_at: new Date().toISOString() };
    
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        return { ...l, notes_history: [...(l.notes_history || []), newNote] };
      }
      return l;
    }));
    
    if (selectedLead?.id === id) {
      setSelectedLead(prev => prev ? { 
        ...prev, 
        notes_history: [...(prev.notes_history || []), newNote] 
      } : null);
    }
  };

  const handleArchive = (id: string, reason: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    setIsDrawerOpen(false);
    setSelectedLead(null);
    alert(`Lead arquivado. Motivo: ${reason}`);
  };

  const handleConfirmCloseDeal = (data: { property: string; value: number; commission: number }) => {
    if (!leadToClose) return;
    
    setLeads(prev => prev.map(l => 
      l.id === leadToClose.id ? { ...l, status: 'fechado' } : l
    ));
    
    if (selectedLead?.id === leadToClose.id) {
      setSelectedLead(prev => prev ? { ...prev, status: 'fechado' } : null);
    }
    
    setIsCloseModalOpen(false);
    setLeadToClose(null);
    alert(`🎉 Negócio fechado com sucesso! Valor: R$ ${data.value}`);
  };

  const handleLinkProperty = (leadId: string, propertyId: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const linked = l.linkedProperties || [];
        if (!linked.includes(propertyId)) {
          return { ...l, linkedProperties: [...linked, propertyId] };
        }
      }
      return l;
    }));
    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => {
        if (!prev) return prev;
        const linked = prev.linkedProperties || [];
        if (!linked.includes(propertyId)) {
          return { ...prev, linkedProperties: [...linked, propertyId] };
        }
        return prev;
      });
    }
  };

  const handleUnlinkProperty = (leadId: string, propertyId: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const linked = l.linkedProperties || [];
        return { ...l, linkedProperties: linked.filter(id => id !== propertyId) };
      }
      return l;
    }));
    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => {
        if (!prev) return prev;
        const linked = prev.linkedProperties || [];
        return { ...prev, linkedProperties: linked.filter(id => id !== propertyId) };
      });
    }
  };

  // Filtered leads
  const filteredLeads = useMemo(() => {
    if (!searchTerm) return leads;
    const lower = searchTerm.toLowerCase();
    return leads.filter(l => 
      l.name.toLowerCase().includes(lower) || 
      l.phone.includes(lower) ||
      (l.email && l.email.toLowerCase().includes(lower))
    );
  }, [leads, searchTerm]);

  // Handle new lead from modal
  const handleLeadSuccess = (newLeadData?: any) => {
    // In a real app we'd fetch from DB or the modal would return the new lead.
    // For now we listen to a custom event or we can just mock fetching.
    alert('Funil atualizado com o novo lead!');
    
    if (!newLeadData) return;

    // To simulate adding to state, we use the created lead passed from the modal.
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      name: newLeadData.name || 'Lead Sem Nome',
      phone: newLeadData.phone || '(00) 00000-0000',
      origin: newLeadData.origin || 'whatsapp',
      interest_type: newLeadData.interest_type || 'compra',
      preferred_locations: newLeadData.preferred_locations || [],
      budget_max: newLeadData.budget_max,
      status: 'novo',
      created_at: new Date().toISOString(),
      linkedProperties: newLeadData.linkedProperties || []
    };
    setLeads(prev => [newLead, ...prev]);
  };

  return (
    <div className="leads-page">
      <header className="page-header">
        <div>
          <h2 className="page-title">Gestão de Leads</h2>
          <p className="page-subtitle">Acompanhe e avance suas oportunidades de negócio no funil.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} />
          Cadastrar Lead
        </button>
      </header>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por nome, telefone ou email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="toolbar-actions">
          <button className="btn-secondary btn-icon-text">
            <Filter size={18} />
            Filtros
          </button>
          
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
              title="Visualização em Funil (Kanban)"
            >
              <Kanban size={18} />
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Visualização em Lista"
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="kanban-board">
          {COLUMNS.map(column => {
            const columnLeads = filteredLeads.filter(l => l.status === column.id);
            
            return (
              <div 
                key={column.id} 
                className="kanban-column"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="column-header" style={{ borderTopColor: column.color }}>
                  <h3 className="column-title">
                    {column.label} 
                    <span className="column-count">{columnLeads.length}</span>
                  </h3>
                </div>
                
                <div className="column-body">
                  {columnLeads.map(lead => (
                    <div 
                      key={lead.id} 
                      className="lead-card kanban-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      onClick={() => handleCardClick(lead)}
                    >
                      <div className="card-header">
                        <div className="lead-name" title={lead.name}>{lead.name}</div>
                        <div className="status-dropdown-wrapper">
                          <button 
                            className="btn-icon card-more" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === lead.id ? null : lead.id);
                            }}
                          >
                            <MoreVertical size={16}/>
                          </button>
                          {openDropdownId === lead.id && (
                            <>
                              <div className="status-dropdown-overlay" onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); }} />
                              <div className="status-dropdown-menu" style={{ right: 0, left: 'auto', top: '100%', minWidth: '120px' }} onClick={(e) => e.stopPropagation()}>
                                <button
                                  className="status-dropdown-item"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDropdownId(null);
                                    handleCardClick(lead);
                                  }}
                                >
                                  Editar
                                </button>
                                <button
                                  className="status-dropdown-item"
                                  style={{ color: '#ef4444' }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if(window.confirm('Tem certeza que deseja excluir este lead?')) {
                                      setLeads(prev => prev.filter(l => l.id !== lead.id));
                                    }
                                    setOpenDropdownId(null);
                                  }}
                                >
                                  Excluir Lead
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="card-interest">
                        <span className={`interest-badge ${lead.interest_type}`}>
                          {lead.interest_type.toUpperCase()}
                        </span>
                        <span className="lead-budget">{formatCurrency(lead.budget_max, lead.interest_type)}</span>
                      </div>

                      {lead.preferred_locations && lead.preferred_locations.length > 0 && (
                        <div className="lead-subtitle">
                          {lead.preferred_locations.join(' • ')}
                        </div>
                      )}

                      {lead.linkedProperties && lead.linkedProperties.length > 0 && (
                        <div className="lead-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                          <span style={{ fontSize: '12px' }}>🏷️ {lead.linkedProperties.length} Imóve{lead.linkedProperties.length > 1 ? 'is' : 'l'} vinculado{lead.linkedProperties.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      
                      <div className="card-footer" style={{ justifyContent: 'flex-end', padding: '12px 16px', borderTop: '1px solid var(--border-normal)' }}>
                        <a 
                          href={getWhatsAppLink(lead.phone)} 
                          target="_blank" 
                          rel="noreferrer"
                          className="btn-whatsapp"
                          style={{ width: '100%', justifyContent: 'center' }}
                          title="Abrir WhatsApp"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <WhatsAppIcon size={18} color="#ffffff" />
                          Contatar
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="list-view">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Interesse</th>
                  <th>Orçamento</th>
                  <th>Origem</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map(lead => (
                  <tr key={lead.id} onClick={() => handleCardClick(lead)} style={{ cursor: 'pointer' }}>
                    <td className="fw-medium">{lead.name}</td>
                    <td>{lead.phone}</td>
                    <td>
                      <span className={`interest-badge ${lead.interest_type}`}>
                        {lead.interest_type}
                      </span>
                    </td>
                    <td>{formatCurrency(lead.budget_max)}</td>
                    <td>
                      <div className="lead-origin">
                        {getOriginIcon(lead.origin)}
                        <span className="origin-text">{lead.origin}</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge" style={{ 
                        backgroundColor: `${COLUMNS.find(c => c.id === lead.status)?.color}20`,
                        color: COLUMNS.find(c => c.id === lead.status)?.color,
                        border: `1px solid ${COLUMNS.find(c => c.id === lead.status)?.color}40`
                      }}>
                        {COLUMNS.find(c => c.id === lead.status)?.label}
                      </span>
                    </td>
                    <td>
                      <a 
                        href={getWhatsAppLink(lead.phone)} 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn-icon whatsapp-action"
                        title="Abrir WhatsApp"
                      >
                        <WhatsAppIcon size={18} color="#ffffff" />
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center empty-state-row">
                      Nenhum lead encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <LeadModalCreate 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleLeadSuccess}
      />
      
      <LeadDrawerDetails
        isOpen={isDrawerOpen}
        lead={selectedLead}
        onClose={() => setIsDrawerOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onAddNote={handleAddNote}
        onArchive={handleArchive}
        onConcludeDeal={(lead) => {
          setIsDrawerOpen(false);
          setLeadToClose(lead);
          setIsCloseModalOpen(true);
        }}
        onLinkProperty={handleLinkProperty}
        onUnlinkProperty={handleUnlinkProperty}
        onOpenLinkModal={() => setIsLinkModalOpen(true)}
      />
      
      <LinkPropertyModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        lead={selectedLead}
        properties={realProperties}
        onLinkProperty={handleLinkProperty}
      />
      
      <CloseDealModal
        isOpen={isCloseModalOpen}
        lead={leadToClose}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirm={handleConfirmCloseDeal}
      />
    </div>
  );
}
