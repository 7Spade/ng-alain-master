// Core models for Organization domain (aligned with memory-bank plans)

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrganizationMemberRole = 'owner' | 'admin' | 'maintainer' | 'member' | 'guest';

export interface OrganizationMember {
  id: string;
  userId: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  role: OrganizationMemberRole;
  status: 'active' | 'invited' | 'suspended';
  joinedAt: string;
}

export interface Team {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  description?: string;
  parentTeamId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  username: string;
  role: OrganizationMemberRole; // inherit org roles for MVP
}

export interface Permission {
  id: string;
  key: string; // e.g. "org.settings.update"
  name: string;
  description?: string;
}

export interface Role {
  id: string;
  name: string; // e.g. "admin"
  description?: string;
  permissionKeys: string[];
}


