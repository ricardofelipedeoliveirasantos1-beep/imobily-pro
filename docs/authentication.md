# Autenticação

O sistema de autenticação atual baseia-se num mock simulado localmente para garantir a arquitetura, separação de layouts e roteamento.

## Roles Atuais
- `super_admin`: Administrador global da plataforma SaaS.
- `corretor`: Usuário padrão pagante/trial (Corretor Pro).

## Contas de Teste / Mock
*Nota: As credenciais de desenvolvimento estão disponíveis no ambiente local/mock e NUNCA devem ser usadas em produção.*

**Super Admin**
E-mail: `admin@imobilypro.local`

**Corretor Pro**
E-mail: `corretor@imobilypro.local`

## Componentes da Autenticação
- **AuthProvider**: Provedor de contexto global.
- **AuthContext**: Contém o estado de login, usuário logado, permissões e status.
- **AuthService**: Interface abstrata de login/logout e checagem de regras.
- **MockAuth**: O banco de dados simulado atualmente (no futuro, substituído pelo banco).
- **Route Guards**: Componentes como `AdminRoute` e `ProtectedRoute` que realizam checagem imperativa de acesso.
