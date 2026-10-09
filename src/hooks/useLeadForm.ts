import { useState, useCallback } from 'react';
import type { LeadOrigin, InterestType, LeadStatus } from '../types/lead';

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  origin: LeadOrigin;
  interest_type: InterestType;
  budget_max: string;
  preferred_locations: string[];
  notes: string;
  payment_method: string;
  down_payment: string;
  rental_guarantee: string;
  move_in_forecast: string;
  property_ids: string[];
}

const initialData: LeadFormData = {
  name: '',
  phone: '',
  email: '',
  origin: 'whatsapp',
  interest_type: 'compra',
  budget_max: '',
  preferred_locations: [],
  notes: '',
  payment_method: '',
  down_payment: '',
  rental_guarantee: '',
  move_in_forecast: '',
  property_ids: [],
};

export function useLeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});

  const formatPhone = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (raw.length <= 2) return raw;
    if (raw.length <= 7) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
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

  const handleChange = (field: keyof LeadFormData, value: string) => {
    let formattedValue: any = value;
    if (field === 'phone') formattedValue = formatPhone(value);
    if (field === 'budget_max' || field === 'down_payment') formattedValue = formatCurrency(value);
    
    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const setPropertyIds = (propertyIds: string[], price?: string, neighborhood?: string) => {
    setFormData(prev => {
      const next = { ...prev, property_ids: propertyIds };
      if (price && !prev.budget_max) next.budget_max = price;
      if (neighborhood && !prev.preferred_locations.includes(neighborhood)) {
        next.preferred_locations = [...prev.preferred_locations, neighborhood];
      }
      return next;
    });
  };

  const addLocation = (location: string) => {
    const trimmed = location.trim();
    if (trimmed && !formData.preferred_locations.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        preferred_locations: [...prev.preferred_locations, trimmed]
      }));
    }
  };

  const removeLocation = (location: string) => {
    setFormData((prev) => ({
      ...prev,
      preferred_locations: prev.preferred_locations.filter((loc) => loc !== location)
    }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.phone.trim() || formData.phone.length < 14) newErrors.phone = 'Telefone inválido';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (onSuccess: (data?: any) => void) => {
    if (!validate()) return;
    setIsSubmitting(true);
    
    try {
      // Mock do envio para Supabase
      const payload = {
        ...formData,
        budget_max: formData.budget_max ? Number(formData.budget_max.replace(/\D/g, '')) / 100 : undefined,
        status: 'novo' as LeadStatus,
        created_at: new Date().toISOString(),
        linkedProperties: formData.property_ids
      };
      
      console.log('Enviando para Supabase: leads', payload);
      
      // Simulando delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      onSuccess(payload);
      setFormData(initialData);
    } catch (error) {
      console.error('Erro ao cadastrar lead', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    addLocation,
    removeLocation,
    setPropertyIds,
    submitForm,
  };
}
