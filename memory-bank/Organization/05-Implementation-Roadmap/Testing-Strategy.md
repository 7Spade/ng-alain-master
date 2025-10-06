# 🧪 測試策略

## 📋 概述

本文檔詳細描述了 GitHub 組織功能系統的完整測試策略，包括測試類型、測試方法、測試工具、測試流程和質量保證措施。

### 🎯 測試目標
- 確保系統功能的正確性和完整性
- 保證系統性能和穩定性
- 驗證系統安全性和合規性
- 提供高質量的用戶體驗

## 🏗️ 測試架構概覽

### 測試金字塔
```
測試層次結構
├── 單元測試 (Unit Tests)
│   ├── 組件測試
│   ├── 服務測試
│   ├── 工具函數測試
│   └── 管道測試
├── 集成測試 (Integration Tests)
│   ├── 模組集成測試
│   ├── API 集成測試
│   ├── 數據庫集成測試
│   └── 第三方服務集成測試
├── 端到端測試 (E2E Tests)
│   ├── 用戶流程測試
│   ├── 跨瀏覽器測試
│   ├── 性能測試
│   └── 安全測試
└── 非功能性測試
    ├── 性能測試
    ├── 安全測試
    ├── 可用性測試
    └── 兼容性測試
```

## 🔧 測試工具和框架

### 前端測試工具
```typescript
// 測試工具配置
const testConfig = {
  // 單元測試
  unit: {
    framework: 'Jasmine',
    runner: 'Karma',
    coverage: 'Istanbul',
    mocking: 'Jasmine Spies'
  },
  
  // 集成測試
  integration: {
    framework: 'Jasmine',
    runner: 'Karma',
    http: 'Angular Testing Utilities',
    router: 'Angular Router Testing'
  },
  
  // 端到端測試
  e2e: {
    framework: 'Protractor',
    browser: 'Chrome, Firefox, Safari',
    reporting: 'Allure'
  },
  
  // 性能測試
  performance: {
    tool: 'Lighthouse',
    metrics: 'Core Web Vitals',
    monitoring: 'WebPageTest'
  }
};

// 測試環境配置
const testEnvironment = {
  development: {
    mockData: true,
    debugMode: true,
    verboseLogging: true
  },
  staging: {
    mockData: false,
    debugMode: false,
    verboseLogging: false
  },
  production: {
    mockData: false,
    debugMode: false,
    verboseLogging: false
  }
};
```

### 測試數據管理
```typescript
// 測試數據工廠
export class TestDataFactory {
  // 創建組織測試數據
  static createOrganization(overrides: Partial<Organization> = {}): Organization {
    return {
      id: 'test-org-1',
      name: 'Test Organization',
      slug: 'test-org',
      description: 'Test organization description',
      type: OrganizationType.ENTERPRISE,
      status: OrganizationStatus.ACTIVE,
      settings: this.createOrganizationSettings(),
      statistics: this.createOrganizationStats(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides
    };
  }
  
  // 創建成員測試數據
  static createMember(overrides: Partial<OrganizationMember> = {}): OrganizationMember {
    return {
      id: 'test-member-1',
      organizationId: 'test-org-1',
      userId: 'test-user-1',
      role: OrganizationRole.ADMIN,
      permissions: ['org:manage', 'team:manage'],
      status: MemberStatus.ACTIVE,
      joinedAt: new Date(),
      invitedBy: 'test-user-2',
      ...overrides
    };
  }
  
  // 創建團隊測試數據
  static createTeam(overrides: Partial<Team> = {}): Team {
    return {
      id: 'test-team-1',
      organizationId: 'test-org-1',
      name: 'Test Team',
      slug: 'test-team',
      description: 'Test team description',
      type: TeamType.DEVELOPER,
      visibility: TeamVisibility.PRIVATE,
      members: [this.createTeamMember()],
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides
    };
  }
  
  // 創建項目測試數據
  static createProject(overrides: Partial<Project> = {}): Project {
    return {
      id: 'test-project-1',
      organizationId: 'test-org-1',
      teamId: 'test-team-1',
      name: 'Test Project',
      slug: 'test-project',
      description: 'Test project description',
      type: ProjectType.SOFTWARE,
      visibility: ProjectVisibility.PRIVATE,
      status: ProjectStatus.ACTIVE,
      ownerId: 'test-user-1',
      settings: this.createProjectSettings(),
      statistics: this.createProjectStats(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides
    };
  }
  
  // 創建權限測試數據
  static createPermission(overrides: Partial<Permission> = {}): Permission {
    return {
      id: 'test-permission-1',
      name: 'Test Permission',
      code: 'test:permission',
      description: 'Test permission description',
      resourceType: ResourceType.ORGANIZATION,
      actions: [PermissionAction.READ, PermissionAction.WRITE],
      conditions: [],
      isSystem: false,
      organizationId: 'test-org-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides
    };
  }
  
  // 創建審計日誌測試數據
  static createAuditLog(overrides: Partial<AuditLog> = {}): AuditLog {
    return {
      id: 'test-audit-1',
      userId: 'test-user-1',
      userEmail: 'test@example.com',
      action: AuditAction.CREATE,
      resourceType: ResourceType.ORGANIZATION,
      resourceId: 'test-org-1',
      resourceName: 'Test Organization',
      organizationId: 'test-org-1',
      details: {
        description: 'Test audit log',
        oldValues: {},
        newValues: { name: 'Test Organization' }
      },
      metadata: {
        sessionId: 'test-session-1',
        requestId: 'test-request-1',
        ipAddress: '127.0.0.1',
        userAgent: 'Test Browser'
      },
      severity: AuditSeverity.LOW,
      status: AuditStatus.SUCCESS,
      timestamp: new Date(),
      ...overrides
    };
  }
  
  // 輔助方法
  private static createOrganizationSettings(): OrganizationSettings {
    return {
      allowMemberInvite: true,
      allowPublicAccess: false,
      defaultPermissions: ['org:read'],
      dataRetentionDays: 365,
      complianceSettings: {}
    };
  }
  
  private static createOrganizationStats(): OrganizationStats {
    return {
      totalMembers: 10,
      totalTeams: 3,
      totalProjects: 5,
      activeMembers: 8,
      lastActivity: new Date()
    };
  }
  
  private static createTeamMember(): TeamMember {
    return {
      id: 'test-team-member-1',
      teamId: 'test-team-1',
      userId: 'test-user-1',
      role: TeamRole.LEAD,
      permissions: [TeamPermission.MANAGE],
      joinedAt: new Date()
    };
  }
  
  private static createProjectSettings(): ProjectSettings {
    return {
      allowMemberInvite: true,
      allowPublicAccess: false,
      enableNotifications: true,
      enableTimeTracking: false,
      enableFileSharing: true,
      maxMembers: 50,
      defaultBranch: 'main',
      protectedBranches: ['main', 'develop']
    };
  }
  
  private static createProjectStats(): ProjectStatistics {
    return {
      totalMembers: 5,
      totalTasks: 20,
      completedTasks: 15,
      totalCommits: 100,
      totalIssues: 10,
      openIssues: 3,
      totalPullRequests: 25,
      openPullRequests: 2,
      lastActivity: new Date()
    };
  }
}
```

## 🧪 單元測試策略

### 組件測試
```typescript
describe('OrganizationManagementComponent', () => {
  let component: OrganizationManagementComponent;
  let fixture: ComponentFixture<OrganizationManagementComponent>;
  let organizationService: jasmine.SpyObj<OrganizationService>;
  
  beforeEach(async () => {
    const organizationServiceSpy = jasmine.createSpyObj('OrganizationService', [
      'getOrganizations',
      'createOrganization',
      'updateOrganization',
      'deleteOrganization'
    ]);
    
    await TestBed.configureTestingModule({
      imports: [OrganizationManagementComponent],
      providers: [
        { provide: OrganizationService, useValue: organizationServiceSpy }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(OrganizationManagementComponent);
    component = fixture.componentInstance;
    organizationService = TestBed.inject(OrganizationService) as jasmine.SpyObj<OrganizationService>;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load organizations on init', () => {
    const mockOrganizations = [
      TestDataFactory.createOrganization(),
      TestDataFactory.createOrganization({ id: 'test-org-2', name: 'Test Org 2' })
    ];
    
    organizationService.getOrganizations.and.returnValue(of(mockOrganizations));
    
    component.ngOnInit();
    
    expect(organizationService.getOrganizations).toHaveBeenCalled();
    expect(component.organizations).toEqual(mockOrganizations);
  });
  
  it('should create organization successfully', () => {
    const newOrganization = TestDataFactory.createOrganization({ name: 'New Organization' });
    organizationService.createOrganization.and.returnValue(of(newOrganization));
    
    component.createOrganization(newOrganization);
    
    expect(organizationService.createOrganization).toHaveBeenCalledWith(newOrganization);
  });
  
  it('should handle organization creation error', () => {
    const error = new Error('Creation failed');
    organizationService.createOrganization.and.returnValue(throwError(error));
    
    component.createOrganization(TestDataFactory.createOrganization());
    
    expect(component.errorMessage).toBe('Creation failed');
  });
  
  it('should filter organizations by name', () => {
    const organizations = [
      TestDataFactory.createOrganization({ name: 'Alpha Organization' }),
      TestDataFactory.createOrganization({ name: 'Beta Organization' }),
      TestDataFactory.createOrganization({ name: 'Gamma Organization' })
    ];
    
    component.organizations = organizations;
    component.searchForm.name = 'Alpha';
    
    component.search();
    
    expect(component.filteredOrganizations).toEqual([organizations[0]]);
  });
});
```

### 服務測試
```typescript
describe('OrganizationService', () => {
  let service: OrganizationService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganizationService]
    });
    service = TestBed.inject(OrganizationService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get organizations', () => {
    const mockOrganizations = [
      TestDataFactory.createOrganization(),
      TestDataFactory.createOrganization({ id: 'test-org-2' })
    ];
    
    service.getOrganizations().subscribe(organizations => {
      expect(organizations).toEqual(mockOrganizations);
    });
    
    const req = httpMock.expectOne('/api/organizations');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrganizations);
  });
  
  it('should create organization', () => {
    const newOrganization = TestDataFactory.createOrganization({ name: 'New Organization' });
    const createdOrganization = { ...newOrganization, id: 'new-org-id' };
    
    service.createOrganization(newOrganization).subscribe(organization => {
      expect(organization).toEqual(createdOrganization);
    });
    
    const req = httpMock.expectOne('/api/organizations');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newOrganization);
    req.flush(createdOrganization);
  });
  
  it('should update organization', () => {
    const organizationId = 'test-org-1';
    const updates = { name: 'Updated Organization' };
    const updatedOrganization = TestDataFactory.createOrganization(updates);
    
    service.updateOrganization(organizationId, updates).subscribe(organization => {
      expect(organization).toEqual(updatedOrganization);
    });
    
    const req = httpMock.expectOne(`/api/organizations/${organizationId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updates);
    req.flush(updatedOrganization);
  });
  
  it('should delete organization', () => {
    const organizationId = 'test-org-1';
    
    service.deleteOrganization(organizationId).subscribe(() => {
      expect(true).toBe(true);
    });
    
    const req = httpMock.expectOne(`/api/organizations/${organizationId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
  
  it('should handle HTTP errors', () => {
    const errorMessage = 'Server error';
    
    service.getOrganizations().subscribe({
      next: () => fail('should have failed'),
      error: (error) => expect(error.message).toBe(errorMessage)
    });
    
    const req = httpMock.expectOne('/api/organizations');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
```

### 工具函數測試
```typescript
describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-01-01T00:00:00Z');
      const formatted = formatDate(date, 'YYYY-MM-DD');
      expect(formatted).toBe('2023-01-01');
    });
    
    it('should handle invalid date', () => {
      const invalidDate = new Date('invalid');
      const formatted = formatDate(invalidDate, 'YYYY-MM-DD');
      expect(formatted).toBe('Invalid Date');
    });
  });
  
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });
    
    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });
  
  describe('generateSlug', () => {
    it('should generate slug from name', () => {
      const slug = generateSlug('Test Organization Name');
      expect(slug).toBe('test-organization-name');
    });
    
    it('should handle special characters', () => {
      const slug = generateSlug('Test & Organization!');
      expect(slug).toBe('test-organization');
    });
  });
});
```

## 🔗 集成測試策略

### 模組集成測試
```typescript
describe('Organization Module Integration', () => {
  let fixture: ComponentFixture<OrganizationManagementComponent>;
  let component: OrganizationManagementComponent;
  let organizationService: OrganizationService;
  let memberService: MemberService;
  let teamService: TeamService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationModule],
      providers: [
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: MemberService, useClass: MockMemberService },
        { provide: TeamService, useClass: MockTeamService }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(OrganizationManagementComponent);
    component = fixture.componentInstance;
    organizationService = TestBed.inject(OrganizationService);
    memberService = TestBed.inject(MemberService);
    teamService = TestBed.inject(TeamService);
  });
  
  it('should integrate organization, member, and team services', async () => {
    // 創建組織
    const organization = TestDataFactory.createOrganization();
    await organizationService.createOrganization(organization).toPromise();
    
    // 添加成員
    const member = TestDataFactory.createMember({ organizationId: organization.id });
    await memberService.addMember(member).toPromise();
    
    // 創建團隊
    const team = TestDataFactory.createTeam({ organizationId: organization.id });
    await teamService.createTeam(team).toPromise();
    
    // 驗證集成
    const orgDetails = await organizationService.getOrganization(organization.id).toPromise();
    expect(orgDetails.members.length).toBe(1);
    expect(orgDetails.teams.length).toBe(1);
  });
  
  it('should handle cross-module data consistency', async () => {
    const organization = TestDataFactory.createOrganization();
    const member = TestDataFactory.createMember({ organizationId: organization.id });
    
    // 創建組織和成員
    await organizationService.createOrganization(organization).toPromise();
    await memberService.addMember(member).toPromise();
    
    // 刪除組織
    await organizationService.deleteOrganization(organization.id).toPromise();
    
    // 驗證成員也被刪除
    const members = await memberService.getMembers({ organizationId: organization.id }).toPromise();
    expect(members.length).toBe(0);
  });
});
```

### API 集成測試
```typescript
describe('API Integration Tests', () => {
  let httpClient: HttpClient;
  let baseUrl: string;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    baseUrl = environment.api.baseUrl;
  });
  
  it('should handle complete organization workflow', async () => {
    // 1. 創建組織
    const organization = TestDataFactory.createOrganization();
    const orgResponse = await httpClient.post(`${baseUrl}/organizations`, organization).toPromise();
    expect(orgResponse.id).toBeDefined();
    
    // 2. 添加成員
    const member = TestDataFactory.createMember({ organizationId: orgResponse.id });
    const memberResponse = await httpClient.post(`${baseUrl}/organizations/${orgResponse.id}/members`, member).toPromise();
    expect(memberResponse.id).toBeDefined();
    
    // 3. 創建團隊
    const team = TestDataFactory.createTeam({ organizationId: orgResponse.id });
    const teamResponse = await httpClient.post(`${baseUrl}/teams`, team).toPromise();
    expect(teamResponse.id).toBeDefined();
    
    // 4. 創建項目
    const project = TestDataFactory.createProject({ organizationId: orgResponse.id, teamId: teamResponse.id });
    const projectResponse = await httpClient.post(`${baseUrl}/projects`, project).toPromise();
    expect(projectResponse.id).toBeDefined();
    
    // 5. 驗證完整流程
    const finalOrg = await httpClient.get(`${baseUrl}/organizations/${orgResponse.id}`).toPromise();
    expect(finalOrg.members.length).toBe(1);
    expect(finalOrg.teams.length).toBe(1);
    expect(finalOrg.projects.length).toBe(1);
  });
  
  it('should handle error scenarios gracefully', async () => {
    // 測試不存在的組織
    try {
      await httpClient.get(`${baseUrl}/organizations/non-existent`).toPromise();
      fail('Should have thrown an error');
    } catch (error) {
      expect(error.status).toBe(404);
    }
    
    // 測試無效的成員數據
    try {
      const invalidMember = { invalidField: 'invalid' };
      await httpClient.post(`${baseUrl}/organizations/test-org/members`, invalidMember).toPromise();
      fail('Should have thrown an error');
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
});
```

## 🌐 端到端測試策略

### 用戶流程測試
```typescript
describe('Organization Management E2E', () => {
  let page: OrganizationPage;
  
  beforeEach(() => {
    page = new OrganizationPage();
    page.navigateTo();
  });
  
  it('should complete organization creation workflow', async () => {
    // 1. 導航到組織管理頁面
    await page.navigateToOrganizations();
    expect(await page.getPageTitle()).toBe('組織管理');
    
    // 2. 點擊創建組織按鈕
    await page.clickCreateOrganization();
    
    // 3. 填寫組織信息
    await page.fillOrganizationForm({
      name: 'E2E Test Organization',
      description: 'E2E test organization',
      type: 'enterprise'
    });
    
    // 4. 提交表單
    await page.submitForm();
    
    // 5. 驗證組織創建成功
    expect(await page.getSuccessMessage()).toContain('組織創建成功');
    
    // 6. 驗證組織出現在列表中
    expect(await page.isOrganizationInList('E2E Test Organization')).toBe(true);
  });
  
  it('should complete member invitation workflow', async () => {
    // 1. 選擇組織
    await page.selectOrganization('E2E Test Organization');
    
    // 2. 導航到成員管理
    await page.navigateToMembers();
    
    // 3. 點擊邀請成員
    await page.clickInviteMember();
    
    // 4. 填寫成員信息
    await page.fillMemberForm({
      email: 'test@example.com',
      role: 'member',
      message: 'Welcome to our organization!'
    });
    
    // 5. 發送邀請
    await page.sendInvitation();
    
    // 6. 驗證邀請發送成功
    expect(await page.getSuccessMessage()).toContain('邀請發送成功');
  });
  
  it('should complete team creation workflow', async () => {
    // 1. 選擇組織
    await page.selectOrganization('E2E Test Organization');
    
    // 2. 導航到團隊管理
    await page.navigateToTeams();
    
    // 3. 點擊創建團隊
    await page.clickCreateTeam();
    
    // 4. 填寫團隊信息
    await page.fillTeamForm({
      name: 'E2E Test Team',
      description: 'E2E test team',
      type: 'developer'
    });
    
    // 5. 提交表單
    await page.submitForm();
    
    // 6. 驗證團隊創建成功
    expect(await page.getSuccessMessage()).toContain('團隊創建成功');
    
    // 7. 驗證團隊出現在列表中
    expect(await page.isTeamInList('E2E Test Team')).toBe(true);
  });
  
  it('should handle permission validation', async () => {
    // 1. 以普通用戶身份登錄
    await page.loginAsUser('testuser@example.com', 'password');
    
    // 2. 嘗試訪問管理功能
    await page.navigateToOrganizations();
    
    // 3. 驗證創建按鈕不可見
    expect(await page.isCreateButtonVisible()).toBe(false);
    
    // 4. 嘗試直接訪問創建頁面
    await page.navigateToCreateOrganization();
    
    // 5. 驗證被重定向到無權限頁面
    expect(await page.getCurrentUrl()).toContain('/exception/403');
  });
});

// 頁面對象模型
class OrganizationPage {
  async navigateTo(): Promise<void> {
    await browser.get('/');
  }
  
  async navigateToOrganizations(): Promise<void> {
    await element(by.css('[data-testid="organizations-menu"]')).click();
  }
  
  async clickCreateOrganization(): Promise<void> {
    await element(by.css('[data-testid="create-organization-btn"]')).click();
  }
  
  async fillOrganizationForm(data: any): Promise<void> {
    await element(by.css('[data-testid="organization-name"]')).sendKeys(data.name);
    await element(by.css('[data-testid="organization-description"]')).sendKeys(data.description);
    await element(by.css('[data-testid="organization-type"]')).click();
    await element(by.css(`[data-testid="organization-type-${data.type}"]`)).click();
  }
  
  async submitForm(): Promise<void> {
    await element(by.css('[data-testid="submit-btn"]')).click();
  }
  
  async getSuccessMessage(): Promise<string> {
    return await element(by.css('[data-testid="success-message"]')).getText();
  }
  
  async isOrganizationInList(name: string): Promise<boolean> {
    return await element(by.cssContainingText('[data-testid="organization-item"]', name)).isPresent();
  }
  
  async getPageTitle(): Promise<string> {
    return await element(by.css('h1')).getText();
  }
}
```

## 📊 性能測試策略

### 負載測試
```typescript
describe('Performance Tests', () => {
  it('should handle concurrent user load', async () => {
    const concurrentUsers = 100;
    const promises = [];
    
    for (let i = 0; i < concurrentUsers; i++) {
      promises.push(createUserSession(i));
    }
    
    const results = await Promise.all(promises);
    const successRate = results.filter(r => r.success).length / results.length;
    
    expect(successRate).toBeGreaterThan(0.95);
  });
  
  it('should meet response time requirements', async () => {
    const startTime = Date.now();
    
    await browser.get('/organizations');
    await element(by.css('[data-testid="organization-list"]')).isPresent();
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000); // 2秒內載入
  });
  
  it('should handle large data sets', async () => {
    // 創建大量測試數據
    const largeDataSet = Array.from({ length: 1000 }, (_, i) => 
      TestDataFactory.createOrganization({ id: `org-${i}`, name: `Organization ${i}` })
    );
    
    // 測試數據載入性能
    const startTime = Date.now();
    await loadLargeDataSet(largeDataSet);
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000); // 5秒內載入
  });
  
  async function createUserSession(userId: number): Promise<{ success: boolean; responseTime: number }> {
    const startTime = Date.now();
    try {
      await browser.get('/login');
      await element(by.css('[data-testid="email"]')).sendKeys(`user${userId}@example.com`);
      await element(by.css('[data-testid="password"]')).sendKeys('password');
      await element(by.css('[data-testid="login-btn"]')).click();
      await element(by.css('[data-testid="dashboard"]')).isPresent();
      
      return {
        success: true,
        responseTime: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        responseTime: Date.now() - startTime
      };
    }
  }
});
```

## 🔒 安全測試策略

### 安全測試用例
```typescript
describe('Security Tests', () => {
  it('should prevent unauthorized access', async () => {
    // 未登錄用戶嘗試訪問受保護頁面
    await browser.get('/organizations');
    
    // 應該被重定向到登錄頁面
    expect(await browser.getCurrentUrl()).toContain('/login');
  });
  
  it('should validate input sanitization', async () => {
    await loginAsAdmin();
    await navigateToCreateOrganization();
    
    // 嘗試輸入惡意腳本
    const maliciousInput = '<script>alert("XSS")</script>';
    await element(by.css('[data-testid="organization-name"]')).sendKeys(maliciousInput);
    await submitForm();
    
    // 驗證輸入被正確轉義
    const organizationName = await element(by.css('[data-testid="organization-name"]')).getAttribute('value');
    expect(organizationName).not.toContain('<script>');
  });
  
  it('should enforce CSRF protection', async () => {
    await loginAsAdmin();
    
    // 嘗試直接發送 POST 請求
    const response = await browser.executeScript(`
      return fetch('/api/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Org' })
      }).then(r => r.status);
    `);
    
    expect(response).toBe(403); // CSRF 保護應該阻止請求
  });
  
  it('should validate permission boundaries', async () => {
    // 以普通用戶身份登錄
    await loginAsUser('testuser@example.com', 'password');
    
    // 嘗試訪問管理功能
    await browser.get('/organizations/1/settings');
    
    // 應該被重定向到無權限頁面
    expect(await browser.getCurrentUrl()).toContain('/exception/403');
  });
  
  async function loginAsAdmin(): Promise<void> {
    await browser.get('/login');
    await element(by.css('[data-testid="email"]')).sendKeys('admin@example.com');
    await element(by.css('[data-testid="password"]')).sendKeys('adminpassword');
    await element(by.css('[data-testid="login-btn"]')).click();
    await element(by.css('[data-testid="dashboard"]')).isPresent();
  }
  
  async function loginAsUser(email: string, password: string): Promise<void> {
    await browser.get('/login');
    await element(by.css('[data-testid="email"]')).sendKeys(email);
    await element(by.css('[data-testid="password"]')).sendKeys(password);
    await element(by.css('[data-testid="login-btn"]')).click();
    await element(by.css('[data-testid="dashboard"]')).isPresent();
  }
});
```

## 📋 測試執行策略

### 測試環境配置
```typescript
// 測試環境配置
export const testEnvironments = {
  development: {
    baseUrl: 'http://localhost:4200',
    apiUrl: 'http://localhost:3000',
    database: 'test_db_dev',
    mockServices: true
  },
  staging: {
    baseUrl: 'https://staging.example.com',
    apiUrl: 'https://staging-api.example.com',
    database: 'test_db_staging',
    mockServices: false
  },
  production: {
    baseUrl: 'https://example.com',
    apiUrl: 'https://api.example.com',
    database: 'test_db_prod',
    mockServices: false
  }
};

// 測試數據清理
export class TestDataCleanup {
  static async cleanupOrganizations(): Promise<void> {
    // 清理測試組織數據
    await this.deleteTestData('organizations', { name: { $regex: /^Test|^E2E/ } });
  }
  
  static async cleanupMembers(): Promise<void> {
    // 清理測試成員數據
    await this.deleteTestData('organization_members', { userEmail: { $regex: /@test\.com$/ } });
  }
  
  static async cleanupTeams(): Promise<void> {
    // 清理測試團隊數據
    await this.deleteTestData('teams', { name: { $regex: /^Test|^E2E/ } });
  }
  
  static async cleanupProjects(): Promise<void> {
    // 清理測試項目數據
    await this.deleteTestData('projects', { name: { $regex: /^Test|^E2E/ } });
  }
  
  static async cleanupAll(): Promise<void> {
    await Promise.all([
      this.cleanupOrganizations(),
      this.cleanupMembers(),
      this.cleanupTeams(),
      this.cleanupProjects()
    ]);
  }
  
  private static async deleteTestData(collection: string, filter: any): Promise<void> {
    // 實現數據庫清理邏輯
    console.log(`Cleaning up ${collection} with filter:`, filter);
  }
}
```

### 測試報告生成
```typescript
// 測試報告配置
export const testReporting = {
  // 覆蓋率報告
  coverage: {
    reporters: ['text', 'html', 'lcov'],
    thresholds: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  },
  
  // 測試結果報告
  results: {
    format: 'junit',
    output: 'test-results.xml'
  },
  
  // 性能測試報告
  performance: {
    format: 'json',
    output: 'performance-results.json',
    metrics: ['responseTime', 'throughput', 'errorRate']
  },
  
  // 安全測試報告
  security: {
    format: 'html',
    output: 'security-report.html',
    includeVulnerabilities: true
  }
};
```

## 📊 成功指標

### 測試覆蓋率指標
- [ ] 單元測試覆蓋率 > 90%
- [ ] 集成測試覆蓋率 > 80%
- [ ] 端到端測試覆蓋率 > 70%
- [ ] 關鍵路徑測試覆蓋率 > 95%

### 測試質量指標
- [ ] 測試執行成功率 > 95%
- [ ] 測試執行時間 < 30 分鐘
- [ ] 測試維護成本 < 20%
- [ ] 測試數據一致性 > 99%

### 性能測試指標
- [ ] 頁面載入時間 < 2 秒
- [ ] API 響應時間 < 500ms
- [ ] 並發用戶支持 > 1000
- [ ] 系統可用性 > 99.9%

### 安全測試指標
- [ ] 安全漏洞數量 = 0
- [ ] 權限驗證覆蓋率 > 95%
- [ ] 輸入驗證覆蓋率 > 90%
- [ ] 安全測試通過率 > 100%

---

**📝 注意**: 測試策略需要與 CI/CD 流程集成，確保自動化測試執行和質量門禁控制。