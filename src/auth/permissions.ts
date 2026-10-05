export const PERMISSIONS = {
  // Properties
  PROPERTIES_READ: 'properties.read',
  PROPERTIES_CREATE: 'properties.create',
  PROPERTIES_UPDATE: 'properties.update',
  PROPERTIES_DELETE: 'properties.delete',
  
  // Leads
  LEADS_READ: 'leads.read',
  LEADS_CREATE: 'leads.create',
  LEADS_UPDATE: 'leads.update',
  
  // Clients
  CLIENTS_READ: 'clients.read',
  CLIENTS_CREATE: 'clients.create',
  
  // Admin
  ADMIN_USERS_READ: 'admin.users.read',
  ADMIN_USERS_UPDATE: 'admin.users.update',
  ADMIN_PLANS_MANAGE: 'admin.plans.manage',
  ADMIN_BILLING_MANAGE: 'admin.billing.manage',
  ADMIN_LOGS_READ: 'admin.logs.read',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  super_admin: [
    PERMISSIONS.ADMIN_USERS_READ,
    PERMISSIONS.ADMIN_USERS_UPDATE,
    PERMISSIONS.ADMIN_PLANS_MANAGE,
    PERMISSIONS.ADMIN_BILLING_MANAGE,
    PERMISSIONS.ADMIN_LOGS_READ,
    PERMISSIONS.PROPERTIES_READ, // Can read everything globally
    PERMISSIONS.LEADS_READ,
  ],
  corretor: [
    PERMISSIONS.PROPERTIES_READ,
    PERMISSIONS.PROPERTIES_CREATE,
    PERMISSIONS.PROPERTIES_UPDATE,
    PERMISSIONS.PROPERTIES_DELETE,
    PERMISSIONS.LEADS_READ,
    PERMISSIONS.LEADS_CREATE,
    PERMISSIONS.LEADS_UPDATE,
    PERMISSIONS.CLIENTS_READ,
    PERMISSIONS.CLIENTS_CREATE,
  ]
};
