import { MockRequest } from '@delon/mock';

/**
 * 組織用戶假資料
 */
interface User {
  id: string;
  username: string;
  name?: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  stats?: {
    followers: number;
    following: number;
    repositories: number;
  };
}

// 初始用戶資料
const users: User[] = [
  {
    id: '1',
    username: 'john_doe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: '全端開發工程師，專注於 Angular 和 Node.js 開發',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john_doe',
    location: '台北市',
    website: 'https://johndoe.dev',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true,
    stats: {
      followers: 150,
      following: 89,
      repositories: 23
    }
  },
  {
    id: '2',
    username: 'jane_smith',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    bio: 'UI/UX 設計師，熱愛創造美觀且實用的用戶體驗',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane_smith',
    location: '新北市',
    website: 'https://janesmith.design',
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2024-01-05'),
    isActive: true,
    stats: {
      followers: 89,
      following: 156,
      repositories: 12
    }
  },
  {
    id: '3',
    username: 'mike_wilson',
    name: 'Mike Wilson',
    email: 'mike.wilson@example.com',
    bio: 'DevOps 工程師，專精於雲端架構和自動化部署',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike_wilson',
    location: '高雄市',
    website: 'https://mikewilson.tech',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-12-20'),
    isActive: true,
    stats: {
      followers: 67,
      following: 34,
      repositories: 18
    }
  },
  {
    id: '4',
    username: 'sarah_lee',
    name: 'Sarah Lee',
    email: 'sarah.lee@example.com',
    bio: '產品經理，致力於打造優秀的數位產品',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah_lee',
    location: '台中市',
    website: 'https://sarahlee.pm',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2024-01-10'),
    isActive: true,
    stats: {
      followers: 234,
      following: 78,
      repositories: 5
    }
  },
  {
    id: '5',
    username: 'alex_chen',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    bio: '數據科學家，專注於機器學習和數據分析',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex_chen',
    location: '桃園市',
    website: 'https://alexchen.ai',
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2023-12-15'),
    isActive: true,
    stats: {
      followers: 112,
      following: 45,
      repositories: 31
    }
  }
];

// 關注關係 (userId -> followingIds[])
const followRelations: Record<string, string[]> = {
  '1': ['2', '3'],
  '2': ['1', '4', '5'],
  '3': ['1'],
  '4': ['2', '3'],
  '5': ['1', '4']
};

// 用戶組織關係
const userOrganizations: Record<string, string[]> = {
  '1': ['1', '3'],
  '2': ['2'],
  '3': ['1', '4'],
  '4': ['2', '3'],
  '5': ['1', '5']
};

/**
 * 獲取用戶列表
 */
function getUsers(req: MockRequest): { data: User[]; total: number } {
  const { page = 1, pageSize = 10, username, name } = req.queryString;
  
  let filtered = [...users];
  
  // 按用戶名篩選
  if (username) {
    filtered = filtered.filter(user => user.username.includes(username));
  }
  
  // 按名稱篩選
  if (name) {
    filtered = filtered.filter(user => user.name?.includes(name));
  }
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length
  };
}

/**
 * 根據 ID 獲取用戶
 */
function getUser(req: MockRequest): User | { msg: string } {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return { msg: '用戶不存在' };
  }
  
  return user;
}

/**
 * 創建用戶
 */
function createUser(req: MockRequest): User {
  const newUser: User = {
    id: String(users.length + 1),
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    bio: req.body.bio,
    avatarUrl: req.body.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${req.body.username}`,
    location: req.body.location,
    website: req.body.website,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    stats: {
      followers: 0,
      following: 0,
      repositories: 0
    }
  };
  
  users.push(newUser);
  followRelations[newUser.id] = [];
  userOrganizations[newUser.id] = [];
  
  return newUser;
}

/**
 * 更新用戶
 */
function updateUser(req: MockRequest): User | { msg: string } {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    return { msg: '用戶不存在' };
  }
  
  users[index] = {
    ...users[index],
    ...req.body,
    id, // 保持 ID 不變
    updatedAt: new Date()
  };
  
  return users[index];
}

/**
 * 刪除用戶
 */
function deleteUser(req: MockRequest): { msg: string } {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    return { msg: '用戶不存在' };
  }
  
  users.splice(index, 1);
  delete followRelations[id];
  delete userOrganizations[id];
  
  return { msg: 'ok' };
}

/**
 * 獲取關注者列表
 */
function getFollowers(req: MockRequest): { data: User[]; total: number } {
  const { id } = req.params;
  const { page = 1, pageSize = 20 } = req.queryString;
  
  // 找出所有關注該用戶的用戶
  const followerIds = Object.entries(followRelations)
    .filter(([_, following]) => following.includes(id))
    .map(([userId]) => userId);
  
  const followers = users.filter(u => followerIds.includes(u.id));
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    data: followers.slice(start, end),
    total: followers.length
  };
}

/**
 * 獲取關注列表
 */
function getFollowing(req: MockRequest): { data: User[]; total: number } {
  const { id } = req.params;
  const { page = 1, pageSize = 20 } = req.queryString;
  
  const followingIds = followRelations[id] || [];
  const following = users.filter(u => followingIds.includes(u.id));
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    data: following.slice(start, end),
    total: following.length
  };
}

/**
 * 關注用戶
 */
function followUser(req: MockRequest): { msg: string } {
  const { id } = req.params;
  const currentUserId = '1'; // 模擬當前用戶 ID
  
  if (!followRelations[currentUserId]) {
    followRelations[currentUserId] = [];
  }
  
  if (!followRelations[currentUserId].includes(id)) {
    followRelations[currentUserId].push(id);
  }
  
  return { msg: 'ok' };
}

/**
 * 取消關注用戶
 */
function unfollowUser(req: MockRequest): { msg: string } {
  const { id } = req.params;
  const currentUserId = '1'; // 模擬當前用戶 ID
  
  if (followRelations[currentUserId]) {
    followRelations[currentUserId] = followRelations[currentUserId].filter(uid => uid !== id);
  }
  
  return { msg: 'ok' };
}

/**
 * 檢查是否已關注用戶
 */
function isFollowing(req: MockRequest): boolean {
  const { id } = req.params;
  const currentUserId = '1'; // 模擬當前用戶 ID
  
  return followRelations[currentUserId]?.includes(id) || false;
}

/**
 * 獲取用戶的組織列表
 */
function getUserOrganizations(req: MockRequest): any[] {
  const { id } = req.params;
  const orgIds = userOrganizations[id] || [];
  
  // 這裡簡化處理，實際應該從 ORGANIZATIONS 中獲取完整數據
  return orgIds.map(orgId => ({
    id: orgId,
    name: `org-${orgId}`,
    role: 'member'
  }));
}

export const ORG_USERS = {
  'GET /api/users': (req: MockRequest) => getUsers(req),
  'GET /api/users/:id': (req: MockRequest) => getUser(req),
  'POST /api/users': (req: MockRequest) => createUser(req),
  'PUT /api/users/:id': (req: MockRequest) => updateUser(req),
  'DELETE /api/users/:id': (req: MockRequest) => deleteUser(req),
  'GET /api/users/:id/followers': (req: MockRequest) => getFollowers(req),
  'GET /api/users/:id/following': (req: MockRequest) => getFollowing(req),
  'POST /api/users/:id/follow': (req: MockRequest) => followUser(req),
  'DELETE /api/users/:id/follow': (req: MockRequest) => unfollowUser(req),
  'GET /api/users/:id/follow-status': (req: MockRequest) => isFollowing(req),
  'GET /api/users/:id/organizations': (req: MockRequest) => getUserOrganizations(req),
  'POST /api/users/:id/avatar': () => ({ 
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}` 
  })
};

