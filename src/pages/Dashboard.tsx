import { useState, useEffect, useRef } from 'react';
import { Building2, UserPlus, Handshake, KeyRound, ChevronLeft, ChevronRight, Bed, Bath, Car, Maximize, MapPin, Crown, Tv } from 'lucide-react';
import { MetricCard } from '../components/dashboard/MetricCard';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { mockProperties, statusConfig, type Property } from './Properties';
import './Dashboard.css';

export function Dashboard() {
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProperties = () => {
      const saved = localStorage.getItem('@ImobilyPro:properties');
      let props: Property[] = mockProperties;
      if (saved) {
        props = JSON.parse(saved);
      }
      setAllProperties(props);
      setRecentProperties(props.slice(0, 10));
    };

    loadProperties();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === '@ImobilyPro:properties') {
        loadProperties();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('imobilypro:properties_updated', loadProperties);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('imobilypro:properties_updated', loadProperties);
    };
  }, []);

  const totalAtivos = allProperties.length;

  const totalVendidos = allProperties.filter(item => {
    const s = (item.status || '').toString().trim().toLowerCase();
    return s === 'vendido' || s === 'vendida' || s === 'vendidos' || s === 'sold';
  }).length;

  const totalAlugados = allProperties.filter(item => {
    const s = (item.status || '').toString().trim().toLowerCase();
    return s === 'alugado' || s === 'alugada' || s === 'alugados' || s === 'rented';
  }).length;
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Visão geral da sua operação imobiliária.</h2>
      </div>

      <div className="dashboard-grid metrics-grid">
        <MetricCard 
          title="IMÓVEIS ATIVOS" 
          value={totalAtivos.toString()} 
          icon={<Building2 size={20} />} 
          type="ativos"
        />
        <MetricCard 
          title="LEADS" 
          value="345" 
          trend="-2.1%" 
          trendDirection="down" 
          icon={<UserPlus size={20} />} 
          type="leads"
        />
        <MetricCard 
          title="VENDAS" 
          value={totalVendidos.toString()} 
          icon={<Handshake size={20} />} 
          type="vendas"
        />
        <MetricCard 
          title="ALUGADOS" 
          value={totalAlugados.toString()} 
          icon={<KeyRound size={20} />} 
          type="visitas"
        />
      </div>

      <div className="dashboard-grid charts-grid">
        <Card className="chart-card recent-properties-card">
          <div className="card-header-actions">
            <h3 className="card-title">Imóveis recentes</h3>
            <div className="carousel-controls">
              <button onClick={scrollLeft}><ChevronLeft size={20}/></button>
              <button onClick={scrollRight}><ChevronRight size={20}/></button>
            </div>
          </div>
          
          {recentProperties.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum imóvel adicionado recentemente</p>
              <button className="btn-primary" style={{marginTop: '16px'}} onClick={() => navigate('/properties')}>+ Cadastrar Primeiro Imóvel</button>
            </div>
          ) : (
            <div className="carousel-container" ref={scrollRef}>
              {recentProperties.map(property => (
                <div key={property.id} className="carousel-card property-card dashboard-property-card" onClick={() => navigate('/properties', { state: { viewPropertyId: property.id } })}>
                  <div className="property-image-wrapper">
                    <img src={property.image} alt={property.title} className="property-image" />
                    <span className={`property-badge-status ${statusConfig[property.status as keyof typeof statusConfig]?.className || 'status-available'}`}>
                      {statusConfig[property.status as keyof typeof statusConfig]?.label || 'Disponível'}
                    </span>
                  </div>
                  
                  <div className="dashboard-property-info">
                    <div className="dp-header">
                      <h3 className="dp-title" title={property.title}>{property.title}</h3>
                      <div className="dp-type-row">
                        <span className="dp-type-finality">{property.type} • <span style={{color: property.finality === 'Venda' ? 'var(--color-primary)' : '#A855F7'}}>{property.finality}</span></span>
                        <span className="dp-reference">{property.reference}</span>
                      </div>
                    </div>

                    <div className="dp-divider" />

                    {property.type !== 'Lote / Terreno' ? (
                      <>
                        <div className="dp-section">
                          <div className="dp-specs-grid">
                            <div className="dp-spec" title="Quartos"><Bed size={18} /> <div><span>{property.bedrooms}</span> <small>Quartos</small></div></div>
                            <div className="dp-spec" title="Suítes"><Crown size={18} /> <div><span>{property.suites || 0}</span> <small>Suítes</small></div></div>
                            <div className="dp-spec" title="Banheiros"><Bath size={18} /> <div><span>{property.bathrooms}</span> <small>Banheiros</small></div></div>
                            <div className="dp-spec" title="Salas"><Tv size={18} /> <div><span>{property.livingRooms || 1}</span> <small>Salas</small></div></div>
                            <div className="dp-spec" title="Vagas"><Car size={18} /> <div><span>{property.garage}</span> <small>Vagas</small></div></div>
                            <div className="dp-spec" title="Área"><Maximize size={18} /> <div><span>{property.area}</span> <small>m²</small></div></div>
                          </div>
                        </div>
                        <div className="dp-divider" />
                      </>
                    ) : (
                      <>
                        <div className="dp-section">
                          <div className="dp-specs-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            <div className="dp-spec" title="Área"><Maximize size={18} /> <div><span>{property.area}</span> <small>m² Total</small></div></div>
                            {property.frontDimension && property.backDimension && (
                              <div className="dp-spec" title="Dimensões"><Maximize size={18} /> <div><span>{property.frontDimension}x{property.backDimension}</span> <small>Dimensões</small></div></div>
                            )}
                          </div>
                        </div>
                        <div className="dp-divider" />
                      </>
                    )}

                    {(property.neighborhood || property.city) && (
                      <>
                        <div className="dp-divider" />
                        <div className="dp-section">
                          <div className="dp-location">
                            <MapPin size={16} />
                            <span>{property.street ? `${property.street} — ` : ''}{property.neighborhood}{property.city ? ` — ${property.city}` : ''}{property.state ? `/${property.state}` : ''}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {property.amenities && property.amenities.length > 0 && (
                      <>
                        <div className="dp-divider" />
                        <div className="dp-section">
                          <div className="dp-chips">
                            {property.amenities.slice(0, 5).map((amenity, idx) => (
                              <span key={idx} className="dp-chip">{amenity}</span>
                            ))}
                            {property.amenities.length > 5 && (
                              <span className="dp-chip">+{property.amenities.length - 5}</span>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    <div className="dp-footer">
                      <div className="dp-price">{property.price}</div>
                      {property.condoFee && <div className="dp-condo">Condomínio: {property.condoFee}</div>}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card className="chart-card">
          <h3 className="card-title">Próximos compromissos</h3>
          <div className="chart-placeholder">
            Lista de compromissos
          </div>
        </Card>
      </div>

      <div className="dashboard-grid charts-grid">
        <Card className="chart-card">
          <h3 className="card-title">Desempenho</h3>
          <div className="chart-placeholder">
            Gráfico de desempenho será inserido aqui
          </div>
        </Card>
        <Card className="chart-card">
          <h3 className="card-title">Pipeline / Leads</h3>
          <div className="chart-placeholder">
            Gráfico de leads será inserido aqui
          </div>
        </Card>
      </div>
      
      <div className="dashboard-grid">
        <Card className="full-width-card">
          <h3 className="card-title">Atividades recentes</h3>
          <div className="chart-placeholder">
            Timeline de atividades
          </div>
        </Card>
      </div>
    </div>
  );
}
