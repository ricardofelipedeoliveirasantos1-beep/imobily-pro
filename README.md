# Imobilypro

SaaS de gestão imobiliária premium.

## Tecnologias Utilizadas
- **Frontend**: React, TypeScript, Vite
- **Roteamento**: React Router DOM
- **Ícones**: Lucide React
- **Estilização**: Vanilla CSS (Design Tokens, sem frameworks restritivos)
- **Autenticação**: Abstração preparada para Supabase Auth (Mockado atualmente)

## Como executar localmente

1. Clone o repositório ou navegue até o diretório do projeto.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Autenticação

**Aviso:** Atualmente, a autenticação utiliza MOCK (dados locais). O Supabase será integrado em fases posteriores. Para testar o sistema, utilize as credenciais abaixo:

- **Super Admin**
  - E-mail: `admin@imobilypro.local`
  - Senha: `admin123`
- **Corretor Pro**
  - E-mail: `corretor@imobilypro.local`
  - Senha: `corretor123`

### Estrutura
- `src/auth`: Contém o mecanismo de MockAuth e a abstração do serviço (`AuthService`) que futuramente consumirá a API do Supabase.
- `src/auth/guards`: Roteamento seguro que separa Administradores e Corretores, além de rotas exclusivas para convidados (`GuestRoute`).
