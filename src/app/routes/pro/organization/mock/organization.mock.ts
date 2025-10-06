import { Organization } from '../models/organization.model';

/**
 * 組織假資料
 */
export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: '1',
    name: 'tech-company',
    displayName: '科技公司',
    description: '一家專注於人工智能和雲端技術的創新科技公司',
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=tech-company',
    website: 'https://tech-company.com',
    location: '台北市',
    email: 'contact@tech-company.com',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-10'),
    isPublic: true,
    membersCount: 45,
    repositoriesCount: 23,
    settings: {
      allowMemberInvitations: true,
      requireTwoFactorAuth: true,
      defaultMemberRole: 'member' as any,
      billingEmail: 'billing@tech-company.com',
      notifications: {
        memberInvitations: true,
        memberRemovals: true,
        roleChanges: true
      }
    }
  },
  {
    id: '2',
    name: 'design-studio',
    displayName: '設計工作室',
    description: '提供UI/UX設計、品牌設計和網頁開發服務',
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=design-studio',
    website: 'https://design-studio.tw',
    location: '新北市',
    email: 'hello@design-studio.tw',
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-01-05'),
    isPublic: false,
    membersCount: 12,
    repositoriesCount: 8,
    settings: {
      allowMemberInvitations: false,
      requireTwoFactorAuth: false,
      defaultMemberRole: 'viewer' as any,
      billingEmail: 'admin@design-studio.tw',
      notifications: {
        memberInvitations: false,
        memberRemovals: true,
        roleChanges: false
      }
    }
  },
  {
    id: '3',
    name: 'startup-inc',
    displayName: '新創公司',
    description: '致力於區塊鏈和金融科技的新創公司',
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=startup-inc',
    website: 'https://startup-inc.io',
    location: '高雄市',
    email: 'team@startup-inc.io',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-12-28'),
    isPublic: true,
    membersCount: 28,
    repositoriesCount: 15,
    settings: {
      allowMemberInvitations: true,
      requireTwoFactorAuth: false,
      defaultMemberRole: 'member' as any,
      billingEmail: 'finance@startup-inc.io',
      notifications: {
        memberInvitations: true,
        memberRemovals: true,
        roleChanges: true
      }
    }
  },
  {
    id: '4',
    name: 'education-group',
    displayName: '教育集團',
    description: '提供線上教育和培訓服務的教育科技公司',
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=education-group',
    website: 'https://edu-group.tw',
    location: '台中市',
    email: 'info@edu-group.tw',
    createdAt: new Date('2022-11-05'),
    updatedAt: new Date('2024-01-15'),
    isPublic: true,
    membersCount: 67,
    repositoriesCount: 31,
    settings: {
      allowMemberInvitations: true,
      requireTwoFactorAuth: true,
      defaultMemberRole: 'viewer' as any,
      billingEmail: 'billing@edu-group.tw',
      notifications: {
        memberInvitations: true,
        memberRemovals: true,
        roleChanges: true
      }
    }
  },
  {
    id: '5',
    name: 'consulting-firm',
    displayName: '顧問公司',
    description: '專注於企業數位轉型和策略顧問服務',
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=consulting-firm',
    website: 'https://consulting-firm.com',
    location: '桃園市',
    email: 'contact@consulting-firm.com',
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-01-08'),
    isPublic: false,
    membersCount: 19,
    repositoriesCount: 5,
    settings: {
      allowMemberInvitations: false,
      requireTwoFactorAuth: true,
      defaultMemberRole: 'member' as any,
      billingEmail: 'admin@consulting-firm.com',
      notifications: {
        memberInvitations: false,
        memberRemovals: true,
        roleChanges: true
      }
    }
  }
];