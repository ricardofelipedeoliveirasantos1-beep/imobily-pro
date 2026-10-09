import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Edit, Eye, Trash2, Share2, Bed, Bath, Car, Maximize, Plus, X, MapPin, UploadCloud, ChevronLeft, ChevronRight, CheckCircle2, Search, Crown, Tv, User, HardHat, Building2 } from 'lucide-react';
import './Properties.css';

export interface Property {
  id: string;
  title: string;
  reference: string;
  type: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  status: string;
  finality: string;
  price: string;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  livingRooms: number;
  garage: number;
  area: number;
  leads: number;
  views: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  floor?: string;
  totalFloors?: string;
  condoFee?: string;
  iptu?: string;
  frontDimension?: string;
  backDimension?: string;
  topography?: string;
  street?: string;
  number?: string;
  complement?: string;
  // Novos campos: Proprietário / Construtora
  ownerType: 'pf' | 'pj';
  ownerName?: string;
  ownerCpf?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerCommission?: string;
  companyName?: string;
  companyTradeName?: string;
  companyCnpj?: string;
  companyProjectName?: string;
  companyContactName?: string;
  companyContactPhone?: string;
  companyContactEmail?: string;
  companyCommission?: string;
  companyStage?: string;
  companyDeliveryDate?: string;
}

const amenitiesOptions: Record<string, string[]> = {
  'Casa Padrão': ['Quintal', 'Jardim', 'Portão Eletrônico', 'Muro Alto', 'Churrasqueira Privativa', 'Piscina Privativa', 'Área de Serviço Separada', 'Garagem Coberta', 'Espaço Pet'],
  'Apartamento': ['Elevador', 'Sacada/Varanda', 'Varanda Gourmet', 'Portaria 24h', 'Salão de Festas', 'Piscina do Condomínio', 'Academia', 'Playground', 'Vaga Coberta', 'Aceita Animais'],
  'Casa de Condomínio': ['Condomínio Fechado', 'Ronda Motorizada/Segurança 24h', 'Clube Privativo', 'Área Gourmet Integrada', 'Quadra Desportiva', 'Energia Solar'],
  'Sobrado': ['Sacada Superior', 'Escada em Granito/Porcelanato', 'Lavabo no Rés-do-Chão', 'Sala com 2 Ambientes', 'Quintal Traseiro', 'Portão Automático'],
  'Lote / Terreno': ['Asfalto à Porta', 'Rede de Água', 'Rede Elétrica', 'Esgoto Ligado', 'Murado', 'Pronto a Construir']
};

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Apartamento de Luxo no Jardins',
    reference: 'REF-1029',
    type: 'Apartamento',
    neighborhood: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    cep: '01402-000',
    status: 'available',
    finality: 'Venda',
    price: 'R$ 2.500.000',
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    livingRooms: 1,
    garage: 2,
    area: 185,
    leads: 12,
    views: 436,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1174&ixlib=rb-4.0.3'
    ],
    description: 'Excelente apartamento de alto padrão, recém reformado, localizado no coração do Jardins. Conta com varanda gourmet espaçosa, suíte master com closet, acabamentos de primeira linha em todos os ambientes e iluminação natural privilegiada. Condomínio com lazer completo.',
    amenities: ['Piscina', 'Varanda Gourmet', 'Ar-condicionado', 'Segurança 24h', 'Academia']
  },
  {
    id: '2',
    title: 'Casa Contemporânea em Alphaville',
    reference: 'REF-2044',
    type: 'Casa de Condomínio',
    neighborhood: 'Alphaville',
    city: 'Barueri',
    state: 'SP',
    cep: '06454-000',
    status: 'available',
    finality: 'Venda',
    price: 'R$ 4.200.000',
    bedrooms: 4,
    suites: 2,
    bathrooms: 5,
    livingRooms: 2,
    garage: 4,
    area: 320,
    leads: 5,
    views: 210,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1175&ixlib=rb-4.0.3',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1175&ixlib=rb-4.0.3'],
    description: 'Linda casa com design contemporâneo em condomínio fechado. Acabamentos finos, ambientes integrados e iluminados.',
    amenities: ['Piscina Privativa', 'Churrasqueira', 'Quintal', 'Segurança 24h']
  },
  {
    id: '3',
    title: 'Sobrado Confortável na Lapa',
    reference: 'REF-3012',
    type: 'Sobrado',
    neighborhood: 'Lapa',
    city: 'São Paulo',
    state: 'SP',
    cep: '05050-000',
    status: 'available',
    finality: 'Aluguel',
    price: 'R$ 8.500 /mês',
    bedrooms: 3,
    suites: 1,
    bathrooms: 3,
    livingRooms: 1,
    garage: 2,
    area: 150,
    leads: 24,
    views: 890,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3',
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3'],
    description: 'Sobrado charmoso e espaçoso para locação. Ótima localização, rua tranquila e arborizada.',
    amenities: ['Quintal', 'Portão Eletrônico', 'Cozinha Planejada']
  }
];

export const statusConfig = {
  available: { label: 'Disponível', className: 'status-available' },
  sold: { label: 'Vendido', className: 'status-sold' },
  negotiation: { label: 'Em Negociação', className: 'status-negotiation' },
  rented: { label: 'Alugado', className: 'status-rented' }
};

const defaultFormData = {
  id: '',
  title: '',
  reference: '',
  finality: 'Venda',
  type: 'Apartamento',
  cep: '',
  neighborhood: '',
  city: '',
  state: '',
  price: '',
  bedrooms: 1,
  suites: 0,
  bathrooms: 1,
  livingRooms: 1,
  garage: 1,
  area: 0,
  description: '',
  amenities: [] as string[],
  floor: '',
  totalFloors: '',
  condoFee: '',
  iptu: '',
  frontDimension: '',
  backDimension: '',
  topography: 'Plano',
  street: '',
  number: '',
  complement: '',
  status: 'available',
  ownerType: 'pf' as 'pf' | 'pj',
  ownerName: '',
  ownerCpf: '',
  ownerPhone: '',
  ownerEmail: '',
  ownerCommission: '',
  companyName: '',
  companyTradeName: '',
  companyCnpj: '',
  companyProjectName: '',
  companyContactName: '',
  companyContactPhone: '',
  companyContactEmail: '',
  companyCommission: '',
  companyStage: '',
  companyDeliveryDate: ''
};

export function Properties() {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('@ImobilyPro:properties');
    if (saved) return JSON.parse(saved);
    return mockProperties;
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('@ImobilyPro:properties', JSON.stringify(properties));
    window.dispatchEvent(new Event('imobilypro:properties_updated'));
  }, [properties]);
  const [filter, setFilter] = useState('Todos');
  const [finalityFilter, setFinalityFilter] = useState<'Todos' | 'Venda' | 'Aluguel'>('Todos');
  const [sortOrder, setSortOrder] = useState('Novos');
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);
  
  const [formData, setFormData] = useState(defaultFormData);
  const [selectedPhotos, setSelectedPhotos] = useState<{file: File|null, url: string}[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const [customAmenity, setCustomAmenity] = useState('');
  const [showCustomAmenityInput, setShowCustomAmenityInput] = useState(false);
  
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState(0);
  
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Body scroll lock and Escape key handling
  useEffect(() => {
    if (isFormModalOpen || isViewModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFormModalOpen(false);
        setIsViewModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFormModalOpen, isViewModalOpen]);

  useEffect(() => {
    if (location.state && location.state.viewPropertyId) {
      const propToView = properties.find(p => p.id === location.state.viewPropertyId);
      if (propToView) {
        setViewingProperty(propToView);
        setIsViewModalOpen(true);
      }
      // clear state to prevent reopening on navigation back
      window.history.replaceState({}, document.title);
    }
  }, [location.state, properties]);

  // Actions
  const handleOpenNew = () => {
    setFormData(defaultFormData);
    setSelectedPhotos([]);
    setCoverPhotoIndex(0);
    setEditingId(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const prop = properties.find(p => p.id === id);
    if (prop) {
      setFormData({
        id: prop.id,
        title: prop.title,
        reference: prop.reference,
        finality: prop.finality,
        type: prop.type,
        cep: prop.cep,
        neighborhood: prop.neighborhood,
        city: prop.city,
        state: prop.state,
        price: prop.price,
        bedrooms: prop.bedrooms,
        suites: prop.suites || 0,
        bathrooms: prop.bathrooms,
        livingRooms: prop.livingRooms || 1,
        garage: prop.garage,
        area: prop.area,
        description: prop.description,
        amenities: prop.amenities || [],
        floor: prop.floor || '',
        totalFloors: prop.totalFloors || '',
        condoFee: prop.condoFee || '',
        iptu: prop.iptu || '',
        frontDimension: prop.frontDimension || '',
        backDimension: prop.backDimension || '',
        topography: prop.topography || 'Plano',
        street: prop.street || '',
        number: prop.number || '',
        complement: prop.complement || '',
        status: prop.status || 'available'
      });
      
      const imagesList = prop.images || (prop.image ? [prop.image] : []);
      setSelectedPhotos(imagesList.map(img => ({ file: null, url: img })));
      
      // Attempt to find the cover image in the array to set the right index
      const coverIndex = imagesList.indexOf(prop.image);
      setCoverPhotoIndex(coverIndex >= 0 ? coverIndex : 0);
      
      setEditingId(prop.id);
      setIsFormModalOpen(true);
    }
  };

  const handleView = (id: string) => {
    const prop = properties.find(p => p.id === id);
    if (prop) {
      setViewingProperty(prop);
      setCurrentPhotoIndex(0);
      setIsViewModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.")) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const handleShare = (id: string) => {
    const url = `${window.location.origin}/imovel/${id}`;
    if (navigator.share) {
      navigator.share({
        title: 'Confira este imóvel',
        url: url
      }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado!');
    }
  };

  // Form Handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles: {file: File, url: string}[] = [];
      files.forEach(file => {
        if (file.size > 5 * 1024 * 1024) alert(`A foto ${file.name} excede 5MB.`);
        else validFiles.push({ file, url: URL.createObjectURL(file) });
      });
      setSelectedPhotos(prev => [...prev, ...validFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
    if (coverPhotoIndex === index) {
      setCoverPhotoIndex(0);
    } else if (coverPhotoIndex > index) {
      setCoverPhotoIndex(prev => prev - 1);
    }
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    const amount = Number(numbers) / 100;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, price: formatCurrency(e.target.value)});
  };

  const searchCep = async () => {
    const cleanCep = formData.cep.replace(/\D/g, '');
    if(cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev, 
            state: data.uf, 
            city: data.localidade, 
            neighborhood: data.bairro,
            street: data.logradouro
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const addCustomAmenity = () => {
      if (customAmenity.trim() && !formData.amenities.includes(customAmenity.trim())) {
        setFormData(prev => ({ ...prev, amenities: [...prev.amenities, customAmenity.trim()] }));
      }
      setCustomAmenity('');
      setShowCustomAmenityInput(false);
    };

    setTimeout(() => {
      const newImage = selectedPhotos.length > 0 ? (selectedPhotos[coverPhotoIndex]?.url || selectedPhotos[0].url) : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073&ixlib=rb-4.0.3';
      
      if (editingId) {
        setProperties(prev => prev.map(p => {
          if (p.id === editingId) {
            return {
              ...p,
              ...formData,
              image: newImage,
              images: selectedPhotos.length > 0 ? selectedPhotos.map(p => p.url) : p.images
            };
          }
          return p;
        }));
      } else {
        const newProp: Property = {
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
          reference: formData.reference || `REF-${Math.floor(Math.random() * 9000) + 1000}`,
          status: formData.status || 'available',
          leads: 0,
          views: 0,
          image: newImage,
          images: selectedPhotos.length > 0 ? selectedPhotos.map(p => p.url) : [newImage],
          amenities: []
        };
        setProperties([newProp, ...properties]);
      }
      setIsSaving(false);
      setIsFormModalOpen(false);
    }, 800);
  };

  return (
    <div className="properties-container">
      {/* Header and Filters */}
      <div className="properties-header-wrapper">
        <div className="header-title-row">
          <div className="header-info">
            <h2>Gestão de Imóveis</h2>
            <p>Gerencie seus imóveis em uma interface limpa e vertical.</p>
          </div>
          <button className="add-property-btn desktop-add-btn" onClick={handleOpenNew}>
            <Plus size={18} /> Adicionar Imóvel
          </button>
        </div>
        
        <div className="filters-section">
          <h3 className="filters-title">Filtros e Ordenação</h3>
          <div className="filters-bar">
            <div className="status-filters">
              <button className={`status-filter-btn filter-todos ${filter === 'Todos' ? 'active' : ''}`} onClick={() => setFilter('Todos')}>Todos</button>
              <button className={`status-filter-btn filter-disponiveis ${filter === 'Disponível' ? 'active' : ''}`} onClick={() => setFilter('Disponível')}>Disponíveis</button>
              <button className={`status-filter-btn filter-negociacao ${filter === 'Em Negociação' ? 'active' : ''}`} onClick={() => setFilter('Em Negociação')}>Em Negociação</button>
              <button className={`status-filter-btn filter-vendidos ${filter === 'Vendido' ? 'active' : ''}`} onClick={() => setFilter('Vendido')}>Vendidos</button>
              <button className={`status-filter-btn filter-alugados ${filter === 'Alugado' ? 'active' : ''}`} onClick={() => setFilter('Alugado')}>Alugados</button>
              <button className="status-filter-btn mobile-add-btn" onClick={handleOpenNew}><Plus size={18} /> Adicionar Imóvel</button>
            </div>
            
            <div className="controls-additional">
              <div className="segmented-control">
                <button 
                  className={`segmented-btn ${finalityFilter === 'Todos' ? 'active' : ''}`}
                  onClick={() => setFinalityFilter('Todos')}
                >
                  Todos
                </button>
                <button 
                  className={`segmented-btn ${finalityFilter === 'Venda' ? 'active' : ''}`}
                  onClick={() => setFinalityFilter('Venda')}
                >
                  Venda
                </button>
                <button 
                  className={`segmented-btn ${finalityFilter === 'Aluguel' ? 'active' : ''}`}
                  onClick={() => setFinalityFilter('Aluguel')}
                >
                  Aluguel
                </button>
              </div>
              
              <div className="sort-dropdown-container">
                <select className="sort-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="Novos">Novos</option>
                  <option value="Menor Preço">Menor Preço</option>
                  <option value="Maior Preço">Maior Preço</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="properties-grid">
        {properties.filter(p => {
          // Status filter
          if (filter !== 'Todos') {
            const statusMap: Record<string, string> = {
              'Disponível': 'available',
              'Em Negociação': 'negotiation',
              'Vendido': 'sold',
              'Alugado': 'rented'
            };
            if (p.status !== statusMap[filter]) return false;
          }
          
          // Finality filter
          if (finalityFilter !== 'Todos' && p.finality !== finalityFilter) {
            return false;
          }

          return true;
        }).sort((a, b) => {
          if (sortOrder === 'Menor Preço' || sortOrder === 'Maior Preço') {
            const parsePrice = (priceStr: string) => {
              const numStr = priceStr.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.');
              return parseFloat(numStr) || 0;
            };
            const priceA = parsePrice(a.price);
            const priceB = parsePrice(b.price);
            if (sortOrder === 'Menor Preço') return priceA - priceB;
            if (sortOrder === 'Maior Preço') return priceB - priceA;
          }
          return 0; // Novos (default array order)
        }).map(property => (
          <div key={property.id} className="property-card">
            <div className="property-image-wrapper">
              <img src={property.image} alt={property.title} className="property-image" />
              <span className={`property-badge-status ${statusConfig[property.status as keyof typeof statusConfig].className}`}>
                {statusConfig[property.status as keyof typeof statusConfig].label}
              </span>
            </div>
            
            <div className="property-info">
              <div className="property-title-row">
                <h3 className="property-title" title={property.title}>{property.title}</h3>
              </div>
              
              <div className="property-tags-row">
                <span className={`tag-finality ${property.finality === 'Venda' ? 'tag-venda' : 'tag-aluguel'}`}>{property.finality}</span>
                <span className="property-reference">{property.reference}</span>
              </div>
              
              <div className="property-specs">
                <div className="spec-item" title="Quartos"><Bed size={18} /> <div><span>{property.bedrooms}</span> <small>Quartos</small></div></div>
                <div className="spec-item" title="Suítes"><Crown size={18} /> <div><span>{property.suites || 0}</span> <small>Suítes</small></div></div>
                <div className="spec-item" title="Banheiros"><Bath size={18} /> <div><span>{property.bathrooms}</span> <small>Banheiros</small></div></div>
                <div className="spec-item" title="Salas"><Tv size={18} /> <div><span>{property.livingRooms || 1}</span> <small>Salas</small></div></div>
                <div className="spec-item" title="Vagas"><Car size={18} /> <div><span>{property.garage}</span> <small>Vagas</small></div></div>
                <div className="spec-item" title="Área"><Maximize size={18} /> <div><span>{property.area}</span> <small>m²</small></div></div>
              </div>
              
              <div className="property-metrics-row">
                <div className="property-price">{property.price}</div>
              </div>
            </div>
            
            <div className="property-card-footer">
              <button className="action-icon-btn" title="Editar" onClick={() => handleEdit(property.id)}><Edit size={18} /></button>
              <button className="action-icon-btn" title="Visualizar" onClick={() => handleView(property.id)}><Eye size={18} /></button>
              <button className="action-icon-btn delete-btn" title="Excluir" onClick={() => handleDelete(property.id)}><Trash2 size={18} /></button>
              <button className="action-icon-btn" title="Compartilhar" onClick={() => handleShare(property.id)}><Share2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <div className="pagination-controls">
          <button className="page-btn">&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-ellipsis">...</span>
          <button className="page-btn">10</button>
          <button className="page-btn">&gt;</button>
        </div>
        <div className="pagination-info">
          Exibindo 1-12 de {properties.length} imóveis
        </div>
      </div>

      {/* 1. Modal Form (Cadastro e Edição) */}
      {isFormModalOpen && (
        <div className="modal-overlay" onClick={() => setIsFormModalOpen(false)}>
          <div className="modal-content-vertical modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-sticky">
              <h3>{editingId ? `Editar Imóvel [REF-${properties.find(p=>p.id===editingId)?.reference.split('-')[1]}]` : 'Cadastrar Imóvel'}</h3>
              <button className="modal-close" onClick={() => setIsFormModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-scroll-body">
              
              <div className="form-section">
                <h4 className="section-title">Informações Principais</h4>
                <div className="form-row">
                  <div className="form-group" style={{ flex: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ margin: 0 }}>Título do Imóvel</label>
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{formData.title.length}/30</span>
                    </div>
                    <input required type="text" className="form-input" maxLength={30} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ex: Apto Luxo no Jardins" />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Código / REF</label>
                    <input required type="text" className="form-input" maxLength={15} value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value.toUpperCase()})} placeholder="Ex: REF-1029" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Finalidade</label>
                    <select className="form-select" value={formData.finality} onChange={e => setFormData({...formData, finality: e.target.value})}>
                      <option value="Venda">Venda</option>
                      <option value="Aluguel">Aluguel</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tipo de Imóvel</label>
                    <select className="form-select" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Casa Padrão">Casa Padrão</option>
                      <option value="Casa de Condomínio">Casa de Condomínio</option>
                      <option value="Sobrado">Sobrado</option>
                      <option value="Lote / Terreno">Lote / Terreno</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select className="form-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="available">Disponível</option>
                      <option value="negotiation">Em Negociação</option>
                      <option value="sold">Vendido</option>
                      <option value="rented">Alugado</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Valor (R$)</label>
                    <input required type="text" className="form-input" value={formData.price} onChange={handlePriceChange} placeholder="R$ 0,00" />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">Localização</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>CEP</label>
                    <div className="cep-input-wrapper">
                      <input 
                        type="text" 
                        className="form-input" 
                        value={formData.cep} 
                        onChange={e => setFormData({...formData, cep: e.target.value})} 
                        onBlur={searchCep} 
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            searchCep();
                          }
                        }}
                        placeholder="00000-000" 
                      />
                      <button type="button" className="cep-search-btn" onClick={searchCep}>
                        <Search size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <input type="text" className="form-input" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} placeholder="SP" />
                  </div>
                  <div className="form-group">
                    <label>Cidade</label>
                    <input type="text" className="form-input" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Ex: São Paulo" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ flex: 2 }}>
                    <label>Rua / Logradouro</label>
                    <input type="text" className="form-input" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} placeholder="Ex: Rua das Flores, Avenida Brasil" />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Número</label>
                    <input type="text" className="form-input" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} placeholder="Ex: 120, S/N" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Complemento</label>
                    <input type="text" className="form-input" value={formData.complement} onChange={e => setFormData({...formData, complement: e.target.value})} placeholder="Ex: Apto 402, Bloco B" />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Bairro</label>
                    <input type="text" className="form-input" value={formData.neighborhood} onChange={e => setFormData({...formData, neighborhood: e.target.value})} placeholder="Ex: Jardins" />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">Especificações e Dimensões</h4>
                
                {formData.type !== 'Lote / Terreno' ? (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Quartos</label>
                        <div className="number-input-group">
                          <button type="button" onClick={() => setFormData({...formData, bedrooms: Math.max(0, formData.bedrooms-1)})}>-</button>
                          <input type="number" readOnly value={formData.bedrooms} />
                          <button type="button" onClick={() => setFormData({...formData, bedrooms: formData.bedrooms+1})}>+</button>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Suítes</label>
                        <div className="number-input-group">
                          <button type="button" onClick={() => setFormData({...formData, suites: Math.max(0, formData.suites-1)})}>-</button>
                          <input type="number" readOnly value={formData.suites} />
                          <button type="button" onClick={() => setFormData({...formData, suites: formData.suites+1})}>+</button>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Banheiros</label>
                        <div className="number-input-group">
                          <button type="button" onClick={() => setFormData({...formData, bathrooms: Math.max(0, formData.bathrooms-1)})}>-</button>
                          <input type="number" readOnly value={formData.bathrooms} />
                          <button type="button" onClick={() => setFormData({...formData, bathrooms: formData.bathrooms+1})}>+</button>
                        </div>
                      </div>
                    </div>
                    <div className="form-row mt-3">
                      <div className="form-group">
                        <label>Salas</label>
                        <div className="number-input-group">
                          <button type="button" onClick={() => setFormData({...formData, livingRooms: Math.max(0, formData.livingRooms-1)})}>-</button>
                          <input type="number" readOnly value={formData.livingRooms} />
                          <button type="button" onClick={() => setFormData({...formData, livingRooms: formData.livingRooms+1})}>+</button>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Vagas</label>
                        <div className="number-input-group">
                          <button type="button" onClick={() => setFormData({...formData, garage: Math.max(0, formData.garage-1)})}>-</button>
                          <input type="number" readOnly value={formData.garage} />
                          <button type="button" onClick={() => setFormData({...formData, garage: formData.garage+1})}>+</button>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Área Útil (m²)</label>
                        <input type="number" className="form-input" value={formData.area} onChange={e => setFormData({...formData, area: Number(e.target.value)})} placeholder="0" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="form-row">
                    <div className="form-group">
                      <label>Área Total (m²)</label>
                      <input type="number" className="form-input" value={formData.area} onChange={e => setFormData({...formData, area: Number(e.target.value)})} placeholder="0" />
                    </div>
                    <div className="form-group">
                      <label>Frente (m)</label>
                      <input type="text" className="form-input" value={formData.frontDimension} onChange={e => setFormData({...formData, frontDimension: e.target.value})} placeholder="Ex: 10m" />
                    </div>
                    <div className="form-group">
                      <label>Fundo (m)</label>
                      <input type="text" className="form-input" value={formData.backDimension} onChange={e => setFormData({...formData, backDimension: e.target.value})} placeholder="Ex: 25m" />
                    </div>
                    <div className="form-group">
                      <label>Topografia</label>
                      <select className="form-select" value={formData.topography} onChange={e => setFormData({...formData, topography: e.target.value})}>
                        <option value="Plano">Plano</option>
                        <option value="Aclive">Aclive</option>
                        <option value="Declive">Declive</option>
                      </select>
                    </div>
                  </div>
                )}

                {formData.type === 'Apartamento' && (
                  <div className="form-row mt-3">
                    <div className="form-group">
                      <label>Andar</label>
                      <input type="text" className="form-input" value={formData.floor} onChange={e => setFormData({...formData, floor: e.target.value})} placeholder="Ex: 5º" />
                    </div>
                    <div className="form-group">
                      <label>Total de Andares</label>
                      <input type="text" className="form-input" value={formData.totalFloors} onChange={e => setFormData({...formData, totalFloors: e.target.value})} placeholder="Ex: 12" />
                    </div>
                    <div className="form-group">
                      <label>Condomínio (R$)</label>
                      <input type="text" className="form-input" value={formData.condoFee} onChange={e => setFormData({...formData, condoFee: e.target.value})} placeholder="R$ 0,00" />
                    </div>
                    <div className="form-group">
                      <label>IPTU (R$)</label>
                      <input type="text" className="form-input" value={formData.iptu} onChange={e => setFormData({...formData, iptu: e.target.value})} placeholder="R$ 0,00" />
                    </div>
                  </div>
                )}

                {formData.type === 'Casa de Condomínio' && (
                  <div className="form-row mt-3">
                    <div className="form-group">
                      <label>Condomínio (R$)</label>
                      <input type="text" className="form-input" value={formData.condoFee} onChange={e => setFormData({...formData, condoFee: e.target.value})} placeholder="R$ 0,00" />
                    </div>
                  </div>
                )}
                
                <div className="form-group mt-3">
                  <label>Descrição Completa</label>
                  <textarea className="form-input" rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Descreva os encantos e diferenciais do imóvel..."></textarea>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">Características do Imóvel</h4>
                <div className="amenities-grid">
                  {(amenitiesOptions[formData.type] || []).map(opt => (
                     <label key={opt} className="amenity-checkbox">
                       <input type="checkbox" checked={formData.amenities.includes(opt)} onChange={(e) => {
                          if (e.target.checked) setFormData({...formData, amenities: [...formData.amenities, opt]});
                          else setFormData({...formData, amenities: formData.amenities.filter(a => a !== opt)});
                       }} />
                       <span>{opt}</span>
                     </label>
                  ))}
                </div>
                
                <div className="custom-amenities-list mt-3">
                  {formData.amenities.filter(a => !(amenitiesOptions[formData.type] || []).includes(a)).map(custom => (
                     <div key={custom} className="custom-amenity-tag">
                       {custom} <button type="button" onClick={() => setFormData({...formData, amenities: formData.amenities.filter(a => a !== custom)})}><X size={14}/></button>
                     </div>
                  ))}
                </div>

                {showCustomAmenityInput ? (
                  <div className="add-custom-amenity-row mt-2">
                     <input type="text" value={customAmenity} onChange={e => setCustomAmenity(e.target.value)} onKeyDown={e => {
                       if (e.key === 'Enter') {
                         e.preventDefault();
                         if (customAmenity.trim() && !formData.amenities.includes(customAmenity.trim())) {
                           setFormData(prev => ({ ...prev, amenities: [...prev.amenities, customAmenity.trim()] }));
                         }
                         setCustomAmenity('');
                         setShowCustomAmenityInput(false);
                       }
                     }} placeholder="Ex: Piso Aquecido" className="form-input" style={{flex: 1}}/>
                     <button type="button" className="btn-secondary" onClick={() => {
                       if (customAmenity.trim() && !formData.amenities.includes(customAmenity.trim())) {
                         setFormData(prev => ({ ...prev, amenities: [...prev.amenities, customAmenity.trim()] }));
                       }
                       setCustomAmenity('');
                       setShowCustomAmenityInput(false);
                     }}>Adicionar</button>
                     <button type="button" className="btn-icon" style={{background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer'}} onClick={() => setShowCustomAmenityInput(false)}><X size={18}/></button>
                  </div>
                ) : (
                  <button type="button" className="btn-add-amenity mt-2" onClick={() => setShowCustomAmenityInput(true)}>
                     <Plus size={16}/> Adicionar Característica
                  </button>
                )}
              </div>

              <div className="form-section">
                <h4 className="section-title">Upload de Mídia</h4>
                <div className="form-group">
                  <label>Fotos (Gerencie a capa clicando sobre a foto)</label>
                  <div className="upload-area" onClick={() => photoInputRef.current?.click()}>
                    <UploadCloud size={32} className="upload-icon" />
                    <span className="upload-text"><strong>Clique ou arraste</strong> fotos aqui (Máx 5MB)</span>
                    <input type="file" multiple accept="image/*" ref={photoInputRef} onChange={handlePhotoUpload} />
                  </div>
                  {selectedPhotos.length > 0 && (
                    <div className="file-preview-list">
                      {selectedPhotos.map((photo, idx) => (
                        <div key={idx} className={`file-preview-item ${idx === coverPhotoIndex ? 'is-capa' : ''}`} onClick={() => setCoverPhotoIndex(idx)}>
                          <img src={photo.url} alt="Preview" />
                          {idx === coverPhotoIndex ? (
                            <div className="capa-badge">CAPA ⭐</div>
                          ) : (
                            <button type="button" className="make-cover-btn" onClick={(e) => { e.stopPropagation(); setCoverPhotoIndex(idx); }}>Tornar Capa</button>
                          )}
                          <button type="button" className="remove-photo-btn" onClick={(e) => { e.stopPropagation(); removePhoto(idx); }}><X size={14}/></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">Dados do Proprietário / Construtora</h4>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <div className="segmented-control">
                    <button 
                      type="button" 
                      className={`segmented-btn ${formData.ownerType === 'pf' ? 'active' : ''}`}
                      onClick={() => setFormData({...formData, ownerType: 'pf'})}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
                    >
                      <User size={16} /> Pessoa Física (Proprietário)
                    </button>
                    <button 
                      type="button" 
                      className={`segmented-btn ${formData.ownerType === 'pj' ? 'active' : ''}`}
                      onClick={() => setFormData({...formData, ownerType: 'pj'})}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
                    >
                      <Building2 size={16} /> Grupo de Engenharia / Construtora
                    </button>
                  </div>
                </div>

                {formData.ownerType === 'pf' ? (
                  <div className="form-group-dynamic">
                    <div className="form-row mt-3">
                      <div className="form-group" style={{ flex: 2 }}>
                        <label>Nome Completo do Proprietário *</label>
                        <input type="text" className="form-input" required value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} placeholder="Ex: João da Silva" />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>CPF</label>
                        <input type="text" className="form-input" value={formData.ownerCpf} onChange={e => {
                          const val = e.target.value.replace(/\D/g, '');
                          const masked = val.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                          setFormData({...formData, ownerCpf: masked.substring(0, 14)});
                        }} placeholder="000.000.000-00" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>WhatsApp de Contato</label>
                        <input type="text" className="form-input" value={formData.ownerPhone} onChange={e => {
                           const val = e.target.value.replace(/\D/g, '');
                           const masked = val.length > 10 
                            ? val.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
                            : val.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                           setFormData({...formData, ownerPhone: masked.substring(0, 15)});
                        }} placeholder="(00) 00000-0000" />
                      </div>
                      <div className="form-group">
                        <label>E-mail</label>
                        <input type="email" className="form-input" value={formData.ownerEmail} onChange={e => setFormData({...formData, ownerEmail: e.target.value})} placeholder="email@exemplo.com" />
                      </div>
                      <div className="form-group">
                        <label>Acordo de Comissão</label>
                        <input type="text" className="form-input" value={formData.ownerCommission} onChange={e => setFormData({...formData, ownerCommission: e.target.value})} placeholder="Ex: 5% ou 1º Aluguel" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="form-group-dynamic">
                    <div className="form-row mt-3">
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Razão Social</label>
                        <input type="text" className="form-input" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} placeholder="Ex: Construtora XYZ Ltda" />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Nome Fantasia</label>
                        <input type="text" className="form-input" value={formData.companyTradeName} onChange={e => setFormData({...formData, companyTradeName: e.target.value})} placeholder="Ex: XYZ Engenharia" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>CNPJ</label>
                        <input type="text" className="form-input" value={formData.companyCnpj} onChange={e => {
                          const val = e.target.value.replace(/\D/g, '');
                          const masked = val.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2');
                          setFormData({...formData, companyCnpj: masked.substring(0, 18)});
                        }} placeholder="00.000.000/0000-00" />
                      </div>
                      <div className="form-group" style={{ flex: 2 }}>
                        <label>Nome do Empreendimento / Edifício</label>
                        <input type="text" className="form-input" value={formData.companyProjectName} onChange={e => setFormData({...formData, companyProjectName: e.target.value})} placeholder="Ex: Residencial Solar das Águas" />
                      </div>
                    </div>
                    <h5 className="mt-4 mb-3" style={{ color: 'var(--text-secondary)' }}>Contato do Plantão / Responsável</h5>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Nome do Contato</label>
                        <input type="text" className="form-input" value={formData.companyContactName} onChange={e => setFormData({...formData, companyContactName: e.target.value})} placeholder="Ex: Maria (Gerente de Vendas)" />
                      </div>
                      <div className="form-group">
                        <label>WhatsApp</label>
                        <input type="text" className="form-input" value={formData.companyContactPhone} onChange={e => {
                           const val = e.target.value.replace(/\D/g, '');
                           const masked = val.length > 10 
                            ? val.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
                            : val.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                           setFormData({...formData, companyContactPhone: masked.substring(0, 15)});
                        }} placeholder="(00) 00000-0000" />
                      </div>
                      <div className="form-group">
                        <label>E-mail</label>
                        <input type="email" className="form-input" value={formData.companyContactEmail} onChange={e => setFormData({...formData, companyContactEmail: e.target.value})} placeholder="vendas@construtora.com" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Comissão Acordada</label>
                        <input type="text" className="form-input" value={formData.companyCommission} onChange={e => setFormData({...formData, companyCommission: e.target.value})} placeholder="Ex: 5% sobre a tabela" />
                      </div>
                      <div className="form-group">
                        <label>Estágio da Obra</label>
                        <select className="form-select" value={formData.companyStage} onChange={e => setFormData({...formData, companyStage: e.target.value})}>
                          <option value="">Selecione...</option>
                          <option value="Lançamento / Na Planta">Lançamento / Na Planta</option>
                          <option value="Em Obras / Construção">Em Obras / Construção</option>
                          <option value="Pronto para Morar">Pronto para Morar</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Previsão de Entrega</label>
                        <input type="text" className="form-input" value={formData.companyDeliveryDate} onChange={e => setFormData({...formData, companyDeliveryDate: e.target.value})} placeholder="Ex: Dezembro/2026" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
            <div className="modal-footer-sticky" style={{ justifyContent: editingId ? 'space-between' : 'flex-end', display: 'flex' }}>
              {editingId && (
                <button type="button" className="btn-danger" onClick={() => {
                  if (window.confirm("Tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.")) {
                    setProperties(properties.filter(p => p.id !== editingId));
                    setIsFormModalOpen(false);
                  }
                }} style={{display: 'flex', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}}>
                  <Trash2 size={16} style={{marginRight: 6}}/> Excluir Imóvel
                </button>
              )}
              <div style={{display: 'flex', gap: '12px'}}>
                <button type="button" className="btn-secondary" onClick={() => setIsFormModalOpen(false)}>Cancelar</button>
                <button type="button" className="btn-primary" onClick={handleFormSubmit} disabled={isSaving}>
                  {isSaving ? 'Salvando...' : (editingId ? 'Salvar Alterações' : 'Cadastrar Imóvel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal View (Visualização Completa) */}
      {isViewModalOpen && viewingProperty && (
        <div className="modal-overlay" onClick={() => setIsViewModalOpen(false)}>
          <div className="modal-content-vertical modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-sticky view-header">
              <div className="view-header-content">
                <h3 className="view-title" title={viewingProperty.title}>{viewingProperty.title}</h3>
                <div className="view-badges">
                  <span className={`property-badge-status static-badge ${statusConfig[viewingProperty.status as keyof typeof statusConfig].className}`}>
                    {statusConfig[viewingProperty.status as keyof typeof statusConfig].label}
                  </span>
                  <span className={`tag-finality ${viewingProperty.finality === 'Venda' ? 'tag-venda' : 'tag-aluguel'}`}>{viewingProperty.finality}</span>
                  <span className="view-reference">{viewingProperty.reference}</span>
                </div>
              </div>
              <button className="modal-close" onClick={() => setIsViewModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-scroll-body view-body">
              <div className="view-grid">
                <div className="view-left-col">
                  {/* Galeria de Fotos */}
                  <div className="view-gallery">
                    <div className="main-photo-container">
                      {viewingProperty.images.length > 1 && (
                        <button className="gallery-nav prev" onClick={() => setCurrentPhotoIndex(prev => prev > 0 ? prev - 1 : viewingProperty.images.length - 1)}>
                          <ChevronLeft size={24} />
                        </button>
                      )}
                      <img src={viewingProperty.images[currentPhotoIndex]} alt="Foto principal" className="main-photo" />
                      {viewingProperty.images.length > 1 && (
                        <button className="gallery-nav next" onClick={() => setCurrentPhotoIndex(prev => prev < viewingProperty.images.length - 1 ? prev + 1 : 0)}>
                          <ChevronRight size={24} />
                        </button>
                      )}
                    </div>
                    {viewingProperty.images.length > 1 && (
                      <div className="thumbnail-list">
                        {viewingProperty.images.map((img, idx) => (
                          <div key={idx} className={`thumbnail ${idx === currentPhotoIndex ? 'active' : ''}`} onClick={() => setCurrentPhotoIndex(idx)}>
                            <img src={img} alt="Miniatura" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="view-right-col">
                  {/* Informações Primárias */}
              <div className="view-primary-info">
                <div className="view-price-section">
                  <span className="view-price">{viewingProperty.price}</span>
                  <span className="view-location">
                    <MapPin size={16}/> 
                    {viewingProperty.street ? `${viewingProperty.street}${viewingProperty.number ? `, ${viewingProperty.number}` : ''}${viewingProperty.complement ? ` - ${viewingProperty.complement}` : ''} - ` : ''}
                    {viewingProperty.neighborhood}, {viewingProperty.city} - {viewingProperty.state}
                  </span>
                </div>
                
                <div className="view-specs-grid">
                  {viewingProperty.type !== 'Lote / Terreno' ? (
                    <>
                      <div className="view-spec-item">
                        <Bed size={24} />
                        <div className="spec-texts">
                          <span className="spec-val">{viewingProperty.bedrooms}</span>
                          <span className="spec-lbl">Quartos</span>
                        </div>
                      </div>
                      <div className="view-spec-item">
                        <Bath size={24} />
                        <div className="spec-texts">
                          <span className="spec-val">{viewingProperty.bathrooms}</span>
                          <span className="spec-lbl">Banheiros</span>
                        </div>
                      </div>
                      <div className="view-spec-item">
                        <Car size={24} />
                        <div className="spec-texts">
                          <span className="spec-val">{viewingProperty.garage}</span>
                          <span className="spec-lbl">Vagas</span>
                        </div>
                      </div>
                      <div className="view-spec-item">
                        <Maximize size={24} />
                        <div className="spec-texts">
                          <span className="spec-val">{viewingProperty.area}m²</span>
                          <span className="spec-lbl">Área Útil</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="view-spec-item">
                        <Maximize size={24} />
                        <div className="spec-texts">
                          <span className="spec-val">{viewingProperty.area}m²</span>
                          <span className="spec-lbl">Área Total</span>
                        </div>
                      </div>
                      {viewingProperty.frontDimension && (
                        <div className="view-spec-item">
                          <div className="spec-texts">
                            <span className="spec-val">{viewingProperty.frontDimension}</span>
                            <span className="spec-lbl">Frente</span>
                          </div>
                        </div>
                      )}
                      {viewingProperty.backDimension && (
                        <div className="view-spec-item">
                          <div className="spec-texts">
                            <span className="spec-val">{viewingProperty.backDimension}</span>
                            <span className="spec-lbl">Fundo</span>
                          </div>
                        </div>
                      )}
                      {viewingProperty.topography && (
                        <div className="view-spec-item">
                          <div className="spec-texts">
                            <span className="spec-val">{viewingProperty.topography}</span>
                            <span className="spec-lbl">Topografia</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {viewingProperty.condoFee && (
                    <div className="view-spec-item">
                      <div className="spec-texts">
                        <span className="spec-val">{viewingProperty.condoFee}</span>
                        <span className="spec-lbl">Condomínio</span>
                      </div>
                    </div>
                  )}
                  {viewingProperty.iptu && (
                    <div className="view-spec-item">
                      <div className="spec-texts">
                        <span className="spec-val">{viewingProperty.iptu}</span>
                        <span className="spec-lbl">IPTU</span>
                      </div>
                    </div>
                  )}
                  {viewingProperty.floor && (
                    <div className="view-spec-item">
                      <div className="spec-texts">
                        <span className="spec-val">{viewingProperty.floor}</span>
                        <span className="spec-lbl">Andar</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <hr className="view-divider" />

              {/* Descrição e Comodidades */}
              <div className="view-details-section">
                <div className="view-description">
                  <h4>Descrição do Imóvel</h4>
                  <p>{viewingProperty.description || 'Nenhuma descrição fornecida para este imóvel.'}</p>
                </div>

                <div className="view-amenities">
                  <h4>Comodidades</h4>
                  {viewingProperty.amenities && viewingProperty.amenities.length > 0 ? (
                    <div className="amenities-list">
                      {viewingProperty.amenities.map((amenity, idx) => (
                        <div key={idx} className="amenity-tag">
                          <CheckCircle2 size={14} className="amenity-icon"/> {amenity}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-info">Nenhuma comodidade registrada.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
            <div className="modal-footer-sticky view-footer">
              <button type="button" className="btn-secondary" onClick={() => setIsViewModalOpen(false)}>Fechar</button>
              <button type="button" className="btn-primary" onClick={() => { setIsViewModalOpen(false); handleEdit(viewingProperty.id); }}>
                <Edit size={16} style={{marginRight: 8}}/> Editar este Imóvel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
