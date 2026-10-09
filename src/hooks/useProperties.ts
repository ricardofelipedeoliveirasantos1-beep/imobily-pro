import { useState, useEffect } from 'react';
import { mockProperties } from '../pages/Properties';
import type { Property } from '../pages/Properties';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  const loadProperties = () => {
    const saved = localStorage.getItem('@ImobilyPro:properties');
    if (saved) {
      setProperties(JSON.parse(saved));
    } else {
      setProperties(mockProperties);
    }
  };

  useEffect(() => {
    loadProperties();
    
    // Listen for custom event to sync across components
    const handleStorageChange = () => {
      loadProperties();
    };
    
    window.addEventListener('imobilypro:properties_updated', handleStorageChange);
    // Also listen to normal storage event for cross-tab sync
    window.addEventListener('storage', (e) => {
      if (e.key === '@ImobilyPro:properties') {
        loadProperties();
      }
    });
    
    return () => {
      window.removeEventListener('imobilypro:properties_updated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { properties, reloadProperties: loadProperties };
}
