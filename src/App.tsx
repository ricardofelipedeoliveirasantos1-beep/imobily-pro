import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/guards/ProtectedRoute';
import { AdminRoute } from './auth/guards/AdminRoute';
import { GuestRoute } from './auth/guards/GuestRoute';

import { MainLayout } from './components/layout/MainLayout';
import { AdminLayout } from './components/layout/AdminLayout';

import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/auth/Login';
import { Unauthorized } from './pages/auth/Unauthorized';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <h2 style={{ color: 'var(--text-secondary)' }}>{title} (Em breve)</h2>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' }}>
      <h1>Página não encontrada</h1>
      <p style={{ color: 'var(--text-secondary)' }}>A página que você procura não existe ou foi removida.</p>
      <a href="/" style={{ color: 'var(--color-primary)' }}>Voltar para o início</a>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public / Guest Routes */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<PlaceholderPage title="Cadastro de Corretor" />} />
            <Route path="/forgot-password" element={<PlaceholderPage title="Recuperação de Senha" />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Broker Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/properties" element={<PlaceholderPage title="Imóveis" />} />
              <Route path="/leads" element={<PlaceholderPage title="Leads" />} />
              <Route path="/clients" element={<PlaceholderPage title="Clientes" />} />
              <Route path="/appointments" element={<PlaceholderPage title="Agenda" />} />
              <Route path="/proposals" element={<PlaceholderPage title="Propostas" />} />
              <Route path="/contracts" element={<PlaceholderPage title="Contratos" />} />
              <Route path="/finance" element={<PlaceholderPage title="Financeiro" />} />
              <Route path="/reports" element={<PlaceholderPage title="Relatórios" />} />
              <Route path="/public-site" element={<PlaceholderPage title="Site Público" />} />
              <Route path="/integrations" element={<PlaceholderPage title="Integrações" />} />
              <Route path="/settings" element={<PlaceholderPage title="Configurações" />} />
            </Route>
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/brokers" element={<PlaceholderPage title="Gerenciar Corretores" />} />
              <Route path="/admin/accounts" element={<PlaceholderPage title="Contas" />} />
              <Route path="/admin/billing" element={<PlaceholderPage title="Planos & Assinaturas" />} />
              <Route path="/admin/logs" element={<PlaceholderPage title="Logs do Sistema" />} />
              <Route path="/admin/settings" element={<PlaceholderPage title="Configurações Globais" />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
