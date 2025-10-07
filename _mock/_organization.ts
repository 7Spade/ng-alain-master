import { MockRequest } from '@delon/mock';

/**
 * 組織假資料
 */
interface Organization {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  avatarUrl?: string;
  website?: string;
  location?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  membersCount: number;
  repositoriesCount: number;
  settings?: {
    allowMemberInvitations: boolean;
    requireTwoFactorAuth: boolean;
    defaultMemberRole: string;
    billingEmail?: string;
    notifications?: {
      memberInvitations: boolean;
      memberRemovals: boolean;
      roleChanges: boolean;
    };
  };
}

// 初始組織資料
const organizations: Organization[] = [
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
      defaultMemberRole: 'member',
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
      defaultMemberRole: 'viewer',
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
      defaultMemberRole: 'member',
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
      defaultMemberRole: 'viewer',
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
      defaultMemberRole: 'member',
      billingEmail: 'admin@consulting-firm.com',
      notifications: {
        memberInvitations: false,
        memberRemovals: true,
        roleChanges: true
      }
    }
  }
];

/**
 * 獲取組織列表
 */
function getOrganizations(req: MockRequest): { data: Organization[]; total: number } {
  const { page = 1, pageSize = 10, name, isPublic } = req.queryString;
  
  let filtered = [...organizations];
  
  // 按名稱篩選
  if (name) {
    filtered = filtered.filter(org => 
      org.name.includes(name) || 
      org.displayName?.includes(name)
    );
  }
  
  // 按公開狀態篩選
  if (isPublic !== undefined) {
    filtered = filtered.filter(org => org.isPublic === (isPublic === 'true'));
  }
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length
  };
}

/**
 * 根據 ID 獲取組織
 */
function getOrganization(req: MockRequest): Organization | { msg: string } {
  const { id } = req.params;
  const org = organizations.find(o => o.id === id);
  
  if (!org) {
    return { msg: '組織不存在' };
  }
  
  return org;
}

/**
 * 創建組織
 */
function createOrganization(req: MockRequest): Organization {
  const newOrg: Organization = {
    id: String(organizations.length + 1),
    name: req.body.name,
    displayName: req.body.displayName,
    description: req.body.description,
    avatarUrl: req.body.avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${req.body.name}`,
    website: req.body.website,
    location: req.body.location,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: req.body.isPublic ?? true,
    membersCount: 1,
    repositoriesCount: 0,
    settings: {
      allowMemberInvitations: true,
      requireTwoFactorAuth: false,
      defaultMemberRole: 'member',
      billingEmail: req.body.email,
      notifications: {
        memberInvitations: true,
        memberRemovals: true,
        roleChanges: true
      }
    }
  };
  
  organizations.push(newOrg);
  return newOrg;
}

/**
 * 更新組織
 */
function updateOrganization(req: MockRequest): Organization | { msg: string } {
  const { id } = req.params;
  const index = organizations.findIndex(o => o.id === id);
  
  if (index === -1) {
    return { msg: '組織不存在' };
  }
  
  organizations[index] = {
    ...organizations[index],
    ...req.body,
    id, // 保持 ID 不變
    updatedAt: new Date()
  };
  
  return organizations[index];
}

/**
 * 刪除組織
 */
function deleteOrganization(req: MockRequest): { msg: string } {
  const { id } = req.params;
  const index = organizations.findIndex(o => o.id === id);
  
  if (index === -1) {
    return { msg: '組織不存在' };
  }
  
  organizations.splice(index, 1);
  return { msg: 'ok' };
}

/**
 * 獲取組織統計信息
 */
function getOrganizationStats(req: MockRequest): any {
  const { id } = req.params;
  const org = organizations.find(o => o.id === id);
  
  if (!org) {
    return { msg: '組織不存在' };
  }
  
  return {
    membersCount: org.membersCount,
    repositoriesCount: org.repositoriesCount,
    activeMembers: Math.floor(org.membersCount * 0.8),
    publicRepositories: Math.floor(org.repositoriesCount * 0.6),
    privateRepositories: org.repositoriesCount - Math.floor(org.repositoriesCount * 0.6),
    monthlyContributions: Math.floor(Math.random() * 1000) + 500
  };
}

/**
 * 檢查組織名稱是否可用
 */
function checkNameAvailability(req: MockRequest): { available: boolean } {
  const { name } = req.queryString;
  const exists = organizations.some(org => org.name === name);
  return { available: !exists };
}

/**
 * 獲取組織的公開信息
 */
function getPublicOrganization(req: MockRequest): Organization | { msg: string } {
  const { name } = req.params;
  const org = organizations.find(o => o.name === name && o.isPublic);
  
  if (!org) {
    return { msg: '組織不存在或不公開' };
  }
  
  return org;
}

export const ORGANIZATIONS = {
  'GET /api/organizations': (req: MockRequest) => getOrganizations(req),
  'GET /api/organizations/:id': (req: MockRequest) => getOrganization(req),
  'POST /api/organizations': (req: MockRequest) => createOrganization(req),
  'PUT /api/organizations/:id': (req: MockRequest) => updateOrganization(req),
  'DELETE /api/organizations/:id': (req: MockRequest) => deleteOrganization(req),
  'GET /api/organizations/:id/stats': (req: MockRequest) => getOrganizationStats(req),
  'POST /api/organizations/:id/avatar': () => ({ 
    avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${Date.now()}` 
  }),
  'GET /api/organizations/check-name': (req: MockRequest) => checkNameAvailability(req),
  'GET /api/organizations/public/:name': (req: MockRequest) => getPublicOrganization(req)
};

