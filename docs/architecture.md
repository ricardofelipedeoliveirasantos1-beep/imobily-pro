# Arquitetura do Imobilypro

O Imobilypro foi projetado para ser modular, escalável e de fácil manutenção, preparado desde o dia 1 para crescimento.

## Estrutura Atual

```text
Imobilypro
│
├── Design System
├── UI Components
├── Layouts
├── Authentication
├── Route Guards
├── Pages
├── Services
├── Hooks
├── Types
├── Mock Data
└── Future Integrations
```

## Fluxo de Autenticação

A arquitetura foi desenhada para facilitar a substituição da camada de autenticação no futuro (especialmente Supabase Auth).

```text
Frontend
    ↓
Auth Abstraction (AuthContext, AuthService)
    ↓
Mock Auth atual (localStorage)
    ↓
Supabase Auth futuro
```

Isso significa que a interface, as páginas protegidas, as verificações de papéis e as rotas continuarão as mesmas quando conectarmos o Supabase, bastando trocar a implementação do `AuthService`.
