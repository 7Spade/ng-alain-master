// Core User models

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  timezone: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  email: boolean;
  web: boolean;
  sms?: boolean;
}

export interface PrivacySettings {
  showEmail: boolean;
  showProfile: 'public' | 'private' | 'organization';
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChangeAt?: string;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  compact?: boolean;
}

export interface UserSettings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  security: SecuritySettings;
  appearance: AppearanceSettings;
}

export interface UserStats {
  projectCount: number;
  organizationCount: number;
  activityCount: number;
  lastActivityAt: string;
}


