// Unified Project models (GitHub-style), used by user/org contexts

export type ProjectType = 'construction' | 'infrastructure' | 'manufacturing' | 'renovation' | 'maintenance';
export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
export type ProjectVisibility = 'public' | 'private' | 'organization';

export interface ProjectOwner {
  ownerType: 'user' | 'organization';
  ownerId: string;
  ownerSlug: string;
  ownerName: string;
  avatarUrl?: string;
  htmlUrl: string;
}

export interface ProjectSettings {
  visibility: ProjectVisibility;
  enableNotifications: boolean;
  enableTimeTracking: boolean;
}

export interface ProjectStats {
  memberCount: number;
  taskCount: number;
  progressPercent: number;
  lastActivityAt: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  fullName: string; // "owner/project"
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  owner: ProjectOwner;
  settings: ProjectSettings;
  stats?: ProjectStats;
  createdAt: string;
  updatedAt: string;
}


