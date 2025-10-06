import { User } from '../models/user.model';

/**
 * 用戶假資料
 */
export const MOCK_USERS: User[] = [
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