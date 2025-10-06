# 🔒 安全架構設計

## 📋 概述

本文檔詳細描述了 GitHub 組織功能系統的完整安全架構設計，包括身份認證、授權控制、數據加密、安全監控和合規性管理。

### 🎯 安全目標
- 實現零信任安全模型
- 提供端到端數據加密
- 確保完整的審計追蹤
- 符合 GDPR 和 SOC 2 合規要求

## 🏗️ 安全架構概覽

### 安全層次結構
```
安全架構體系
├── 身份認證層
│   ├── 多因子認證 (MFA)
│   ├── OAuth 2.0 / OIDC
│   ├── JWT Token 管理
│   └── 會話管理
├── 授權控制層
│   ├── 基於角色的訪問控制 (RBAC)
│   ├── 基於屬性的訪問控制 (ABAC)
│   ├── 細粒度權限控制
│   └── 動態權限管理
├── 數據安全層
│   ├── 傳輸加密 (TLS 1.3)
│   ├── 存儲加密 (AES-256)
│   ├── 數據脫敏
│   └── 備份加密
├── 應用安全層
│   ├── 輸入驗證和清理
│   ├── SQL 注入防護
│   ├── XSS 防護
│   └── CSRF 防護
├── 基礎設施安全層
│   ├── 網絡隔離
│   ├── 防火牆配置
│   ├── 入侵檢測
│   └── 漏洞掃描
└── 監控審計層
    ├── 實時安全監控
    ├── 異常行為檢測
    ├── 安全事件響應
    └── 合規性報告
```

## 🔐 身份認證系統

### 多因子認證 (MFA)
```typescript
// MFA 服務
@Injectable({
  providedIn: 'root'
})
export class MFAService {
  private readonly http = inject(_HttpClient);
  private readonly storage = inject(LocalStorageService);
  
  // 啟用 MFA
  async enableMFA(userId: string): Promise<MFAConfig> {
    const response = await this.http.post<MFAConfig>('/api/mfa/enable', { userId });
    return response;
  }
  
  // 驗證 MFA 代碼
  async verifyMFACode(userId: string, code: string): Promise<boolean> {
    const response = await this.http.post<{ valid: boolean }>('/api/mfa/verify', {
      userId,
      code
    });
    return response.valid;
  }
  
  // 生成備用代碼
  async generateBackupCodes(userId: string): Promise<string[]> {
    const response = await this.http.post<string[]>('/api/mfa/backup-codes', { userId });
    return response;
  }
}

interface MFAConfig {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

// MFA 組件
@Component({
  selector: 'app-mfa-setup',
  template: `
    <div class="mfa-setup">
      <nz-card nzTitle="設置雙因子認證">
        <div class="qr-code">
          <img [src]="mfaConfig.qrCode" alt="MFA QR Code">
        </div>
        <p>請使用身份驗證器應用掃描二維碼</p>
        <nz-input-group nzAddonBefore="驗證碼">
          <input nz-input [(ngModel)]="verificationCode" placeholder="輸入 6 位數字">
        </nz-input-group>
        <button nz-button nzType="primary" (click)="verifyCode()">驗證</button>
      </nz-card>
    </div>
  `
})
export class MFASetupComponent implements OnInit {
  mfaConfig!: MFAConfig;
  verificationCode = '';
  
  private readonly mfaService = inject(MFAService);
  
  async ngOnInit() {
    this.mfaConfig = await this.mfaService.enableMFA(this.userId);
  }
  
  async verifyCode() {
    const isValid = await this.mfaService.verifyMFACode(this.userId, this.verificationCode);
    if (isValid) {
      this.message.success('MFA 設置成功');
    } else {
      this.message.error('驗證碼無效');
    }
  }
}
```

### JWT Token 管理
```typescript
// JWT 服務
@Injectable({
  providedIn: 'root'
})
export class JWTService {
  private readonly storage = inject(LocalStorageService);
  
  // 生成 JWT Token
  generateToken(payload: JWTPayload): string {
    const header = {
      alg: 'RS256',
      typ: 'JWT'
    };
    
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    
    const signature = this.sign(`${encodedHeader}.${encodedPayload}`);
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
  
  // 驗證 JWT Token
  verifyToken(token: string): JWTPayload | null {
    try {
      const [header, payload, signature] = token.split('.');
      
      // 驗證簽名
      const expectedSignature = this.sign(`${header}.${payload}`);
      if (signature !== expectedSignature) {
        return null;
      }
      
      // 驗證過期時間
      const decodedPayload = JSON.parse(this.base64UrlDecode(payload));
      if (decodedPayload.exp < Date.now() / 1000) {
        return null;
      }
      
      return decodedPayload;
    } catch (error) {
      return null;
    }
  }
  
  // 刷新 Token
  async refreshToken(refreshToken: string): Promise<string> {
    const response = await this.http.post<{ accessToken: string }>('/api/auth/refresh', {
      refreshToken
    });
    return response.accessToken;
  }
  
  private base64UrlEncode(str: string): string {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
  
  private base64UrlDecode(str: string): string {
    str += '='.repeat((4 - str.length % 4) % 4);
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    return atob(str);
  }
  
  private sign(data: string): string {
    // 使用私鑰簽名
    return this.rsaSign(data);
  }
}

interface JWTPayload {
  sub: string;           // 用戶ID
  org: string;           // 組織ID
  iat: number;           // 發行時間
  exp: number;           // 過期時間
  permissions: string[]; // 權限列表
  roles: string[];       // 角色列表
  mfa: boolean;          // MFA 驗證狀態
}
```

## 🛡️ 授權控制系統

### 基於角色的訪問控制 (RBAC)
```typescript
// RBAC 服務
@Injectable({
  providedIn: 'root'
})
export class RBACService {
  private readonly permissionService = inject(PermissionService);
  private readonly roleService = inject(RoleService);
  
  // 檢查用戶權限
  async checkPermission(
    userId: string,
    permission: string,
    resourceId?: string,
    context?: any
  ): Promise<boolean> {
    // 獲取用戶角色
    const userRoles = await this.getUserRoles(userId);
    
    // 檢查角色權限
    for (const role of userRoles) {
      const hasPermission = await this.checkRolePermission(role, permission, resourceId, context);
      if (hasPermission) {
        return true;
      }
    }
    
    return false;
  }
  
  // 獲取用戶角色
  private async getUserRoles(userId: string): Promise<Role[]> {
    const userRoles = await this.roleService.getUserRoles(userId);
    return userRoles;
  }
  
  // 檢查角色權限
  private async checkRolePermission(
    role: Role,
    permission: string,
    resourceId?: string,
    context?: any
  ): Promise<boolean> {
    // 檢查直接權限
    if (role.permissions.includes(permission)) {
      return true;
    }
    
    // 檢查繼承權限
    if (role.parentRoleId) {
      const parentRole = await this.roleService.getRole(role.parentRoleId);
      return this.checkRolePermission(parentRole, permission, resourceId, context);
    }
    
    return false;
  }
}

// 權限守衛
@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  private readonly rbacService = inject(RBACService);
  private readonly router = inject(Router);
  
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const permission = route.data['permission'];
    const resourceId = route.params['id'];
    
    if (!permission) {
      return true;
    }
    
    const hasPermission = await this.rbacService.checkPermission(
      this.getCurrentUserId(),
      permission,
      resourceId
    );
    
    if (!hasPermission) {
      this.router.navigate(['/exception/403']);
      return false;
    }
    
    return true;
  }
  
  private getCurrentUserId(): string {
    // 從 JWT Token 或存儲中獲取用戶ID
    return this.getCurrentUser().id;
  }
}
```

### 基於屬性的訪問控制 (ABAC)
```typescript
// ABAC 服務
@Injectable({
  providedIn: 'root'
})
export class ABACService {
  // 檢查屬性權限
  async checkAttributePermission(
    user: User,
    resource: Resource,
    action: string,
    environment: Environment
  ): Promise<boolean> {
    // 獲取策略規則
    const policies = await this.getPolicies(user, resource, action);
    
    // 評估策略
    for (const policy of policies) {
      if (await this.evaluatePolicy(policy, user, resource, action, environment)) {
        return policy.effect === 'Allow';
      }
    }
    
    return false;
  }
  
  // 評估策略
  private async evaluatePolicy(
    policy: Policy,
    user: User,
    resource: Resource,
    action: string,
    environment: Environment
  ): Promise<boolean> {
    // 檢查條件
    for (const condition of policy.conditions) {
      if (!await this.evaluateCondition(condition, user, resource, action, environment)) {
        return false;
      }
    }
    
    return true;
  }
  
  // 評估條件
  private async evaluateCondition(
    condition: Condition,
    user: User,
    resource: Resource,
    action: string,
    environment: Environment
  ): Promise<boolean> {
    const attributeValue = this.getAttributeValue(condition.attribute, user, resource, environment);
    return this.compareValues(attributeValue, condition.operator, condition.value);
  }
  
  private getAttributeValue(
    attribute: string,
    user: User,
    resource: Resource,
    environment: Environment
  ): any {
    // 解析屬性路徑
    const [source, path] = attribute.split('.');
    
    switch (source) {
      case 'user':
        return this.getNestedValue(user, path);
      case 'resource':
        return this.getNestedValue(resource, path);
      case 'environment':
        return this.getNestedValue(environment, path);
      default:
        return null;
    }
  }
  
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
  
  private compareValues(value: any, operator: string, expected: any): boolean {
    switch (operator) {
      case 'equals':
        return value === expected;
      case 'not_equals':
        return value !== expected;
      case 'in':
        return Array.isArray(expected) && expected.includes(value);
      case 'greater_than':
        return value > expected;
      case 'less_than':
        return value < expected;
      default:
        return false;
    }
  }
}

interface Policy {
  id: string;
  effect: 'Allow' | 'Deny';
  conditions: Condition[];
  resources: string[];
  actions: string[];
  subjects: string[];
}

interface Condition {
  attribute: string;
  operator: string;
  value: any;
}

interface User {
  id: string;
  email: string;
  role: string;
  department: string;
  clearanceLevel: number;
}

interface Resource {
  id: string;
  type: string;
  owner: string;
  classification: string;
  sensitivity: number;
}

interface Environment {
  time: Date;
  location: string;
  network: string;
  device: string;
}
```

## 🔐 數據加密系統

### 傳輸加密
```typescript
// TLS 配置
export const tlsConfig = {
  minVersion: 'TLSv1.3',
  ciphers: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'TLS_AES_128_GCM_SHA256'
  ],
  protocols: ['h2', 'http/1.1'],
  secureProtocol: 'TLS_method',
  secureOptions: [
    'SSL_OP_NO_SSLv2',
    'SSL_OP_NO_SSLv3',
    'SSL_OP_NO_TLSv1',
    'SSL_OP_NO_TLSv1_1'
  ]
};

// HTTPS 中間件
export function httpsMiddleware(req: Request, res: Response, next: NextFunction): void {
  // 強制 HTTPS
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect(301, `https://${req.get('host')}${req.url}`);
  }
  
  // 設置安全頭
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
}
```

### 存儲加密
```typescript
// 加密服務
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyLength = 32;
  private readonly ivLength = 16;
  private readonly tagLength = 16;
  
  // 加密數據
  encrypt(plaintext: string, key: Buffer): EncryptedData {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipher(this.algorithm, key);
    cipher.setAAD(Buffer.from('additional-data'));
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex')
    };
  }
  
  // 解密數據
  decrypt(encryptedData: EncryptedData, key: Buffer): string {
    const decipher = crypto.createDecipher(this.algorithm, key);
    decipher.setAAD(Buffer.from('additional-data'));
    decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
  
  // 生成密鑰
  generateKey(): Buffer {
    return crypto.randomBytes(this.keyLength);
  }
  
  // 密鑰派生
  deriveKey(password: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(password, salt, 100000, this.keyLength, 'sha256');
  }
}

interface EncryptedData {
  encrypted: string;
  iv: string;
  tag: string;
}

// 數據庫加密中間件
@Injectable({
  providedIn: 'root'
})
export class DatabaseEncryptionMiddleware {
  private readonly encryptionService = inject(EncryptionService);
  private readonly keyService = inject(KeyService);
  
  // 加密敏感字段
  async encryptSensitiveFields(data: any): Promise<any> {
    const sensitiveFields = ['email', 'phone', 'ssn', 'creditCard'];
    const encryptedData = { ...data };
    
    for (const field of sensitiveFields) {
      if (data[field]) {
        const key = await this.keyService.getEncryptionKey();
        const encrypted = this.encryptionService.encrypt(data[field], key);
        encryptedData[field] = encrypted;
      }
    }
    
    return encryptedData;
  }
  
  // 解密敏感字段
  async decryptSensitiveFields(data: any): Promise<any> {
    const sensitiveFields = ['email', 'phone', 'ssn', 'creditCard'];
    const decryptedData = { ...data };
    
    for (const field of sensitiveFields) {
      if (data[field] && typeof data[field] === 'object') {
        const key = await this.keyService.getEncryptionKey();
        const decrypted = this.encryptionService.decrypt(data[field], key);
        decryptedData[field] = decrypted;
      }
    }
    
    return decryptedData;
  }
}
```

## 🔍 安全監控系統

### 實時安全監控
```typescript
// 安全監控服務
@Injectable({
  providedIn: 'root'
})
export class SecurityMonitoringService {
  private readonly events: SecurityEvent[] = [];
  private readonly thresholds = {
    failedLogins: 5,
    suspiciousRequests: 10,
    dataAccess: 100
  };
  
  // 監控登錄事件
  monitorLoginEvent(event: LoginEvent): void {
    if (event.success) {
      this.recordSuccessfulLogin(event);
    } else {
      this.recordFailedLogin(event);
    }
  }
  
  // 監控數據訪問
  monitorDataAccess(event: DataAccessEvent): void {
    // 檢查異常數據訪問
    if (this.isSuspiciousDataAccess(event)) {
      this.createSecurityEvent({
        type: SecurityEventType.SUSPICIOUS_DATA_ACCESS,
        severity: AuditSeverity.HIGH,
        title: '可疑數據訪問',
        description: `用戶 ${event.userId} 異常訪問數據`,
        details: event
      });
    }
  }
  
  // 監控權限變更
  monitorPermissionChange(event: PermissionChangeEvent): void {
    this.createSecurityEvent({
      type: SecurityEventType.PRIVILEGE_ESCALATION,
      severity: AuditSeverity.HIGH,
      title: '權限變更',
      description: `用戶 ${event.userId} 的權限被變更`,
      details: event
    });
  }
  
  private isSuspiciousDataAccess(event: DataAccessEvent): boolean {
    // 檢查訪問時間
    const hour = new Date().getHours();
    if (hour < 6 || hour > 22) {
      return true;
    }
    
    // 檢查訪問量
    const recentAccess = this.getRecentDataAccess(event.userId, 3600000); // 1小時
    if (recentAccess.length > this.thresholds.dataAccess) {
      return true;
    }
    
    // 檢查訪問模式
    const accessPattern = this.analyzeAccessPattern(event);
    if (accessPattern.isAnomalous) {
      return true;
    }
    
    return false;
  }
  
  private createSecurityEvent(event: Partial<SecurityEvent>): void {
    const securityEvent: SecurityEvent = {
      id: generateId(),
      type: event.type!,
      severity: event.severity!,
      title: event.title!,
      description: event.description!,
      details: event.details!,
      metadata: event.metadata!,
      status: SecurityEventStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.events.push(securityEvent);
    
    // 發送告警
    this.sendSecurityAlert(securityEvent);
  }
  
  private sendSecurityAlert(event: SecurityEvent): void {
    // 發送到安全運營中心
    console.log('Security alert:', event);
    
    // 發送郵件通知
    this.emailService.sendSecurityAlert(event);
    
    // 發送到 SIEM 系統
    this.siemService.sendEvent(event);
  }
}

interface LoginEvent {
  userId: string;
  ip: string;
  userAgent: string;
  success: boolean;
  timestamp: Date;
}

interface DataAccessEvent {
  userId: string;
  resourceId: string;
  resourceType: string;
  action: string;
  timestamp: Date;
}

interface PermissionChangeEvent {
  userId: string;
  oldPermissions: string[];
  newPermissions: string[];
  changedBy: string;
  timestamp: Date;
}
```

### 異常行為檢測
```typescript
// 異常檢測服務
@Injectable({
  providedIn: 'root'
})
export class AnomalyDetectionService {
  private readonly patterns = new Map<string, BehaviorPattern>();
  
  // 檢測異常行為
  detectAnomaly(userId: string, activity: UserActivity): AnomalyResult {
    const pattern = this.patterns.get(userId);
    
    if (!pattern) {
      // 創建新的行為模式
      this.patterns.set(userId, this.createBehaviorPattern(activity));
      return { isAnomaly: false, confidence: 0 };
    }
    
    // 分析異常
    const anomaly = this.analyzeAnomaly(pattern, activity);
    
    // 更新行為模式
    this.updateBehaviorPattern(pattern, activity);
    
    return anomaly;
  }
  
  private createBehaviorPattern(activity: UserActivity): BehaviorPattern {
    return {
      userId: activity.userId,
      loginTimes: [activity.timestamp.getHours()],
      loginLocations: [activity.location],
      accessPatterns: [activity.resourceType],
      deviceFingerprints: [activity.deviceFingerprint],
      averageSessionDuration: 0,
      totalSessions: 1
    };
  }
  
  private analyzeAnomaly(pattern: BehaviorPattern, activity: UserActivity): AnomalyResult {
    let anomalyScore = 0;
    const factors = [];
    
    // 檢查登錄時間
    const hour = activity.timestamp.getHours();
    const isUnusualTime = !this.isWithinNormalHours(hour, pattern.loginTimes);
    if (isUnusualTime) {
      anomalyScore += 0.3;
      factors.push('unusual_login_time');
    }
    
    // 檢查登錄位置
    const isUnusualLocation = !this.isKnownLocation(activity.location, pattern.loginLocations);
    if (isUnusualLocation) {
      anomalyScore += 0.4;
      factors.push('unusual_location');
    }
    
    // 檢查設備指紋
    const isUnusualDevice = !this.isKnownDevice(activity.deviceFingerprint, pattern.deviceFingerprints);
    if (isUnusualDevice) {
      anomalyScore += 0.3;
      factors.push('unusual_device');
    }
    
    return {
      isAnomaly: anomalyScore > 0.5,
      confidence: anomalyScore,
      factors
    };
  }
  
  private isWithinNormalHours(hour: number, loginTimes: number[]): boolean {
    const avgHour = loginTimes.reduce((a, b) => a + b, 0) / loginTimes.length;
    const variance = loginTimes.reduce((a, b) => a + Math.pow(b - avgHour, 2), 0) / loginTimes.length;
    const stdDev = Math.sqrt(variance);
    
    return Math.abs(hour - avgHour) <= 2 * stdDev;
  }
  
  private isKnownLocation(location: string, knownLocations: string[]): boolean {
    return knownLocations.includes(location);
  }
  
  private isKnownDevice(fingerprint: string, knownDevices: string[]): boolean {
    return knownDevices.includes(fingerprint);
  }
  
  private updateBehaviorPattern(pattern: BehaviorPattern, activity: UserActivity): void {
    // 更新登錄時間
    pattern.loginTimes.push(activity.timestamp.getHours());
    if (pattern.loginTimes.length > 100) {
      pattern.loginTimes = pattern.loginTimes.slice(-100);
    }
    
    // 更新登錄位置
    if (!pattern.loginLocations.includes(activity.location)) {
      pattern.loginLocations.push(activity.location);
    }
    
    // 更新訪問模式
    pattern.accessPatterns.push(activity.resourceType);
    if (pattern.accessPatterns.length > 1000) {
      pattern.accessPatterns = pattern.accessPatterns.slice(-1000);
    }
    
    // 更新設備指紋
    if (!pattern.deviceFingerprints.includes(activity.deviceFingerprint)) {
      pattern.deviceFingerprints.push(activity.deviceFingerprint);
    }
  }
}

interface BehaviorPattern {
  userId: string;
  loginTimes: number[];
  loginLocations: string[];
  accessPatterns: string[];
  deviceFingerprints: string[];
  averageSessionDuration: number;
  totalSessions: number;
}

interface UserActivity {
  userId: string;
  timestamp: Date;
  location: string;
  resourceType: string;
  deviceFingerprint: string;
}

interface AnomalyResult {
  isAnomaly: boolean;
  confidence: number;
  factors: string[];
}
```

## 📊 成功指標

### 安全指標
- [ ] 零安全漏洞
- [ ] 100% 數據加密
- [ ] 實時安全監控
- [ ] 異常檢測準確率 > 95%
- [ ] 安全事件響應時間 < 5 分鐘

### 合規性指標
- [ ] 符合 GDPR 要求
- [ ] 符合 SOC 2 標準
- [ ] 通過安全滲透測試
- [ ] 完整的審計追蹤
- [ ] 數據保護合規

### 性能指標
- [ ] 認證響應時間 < 200ms
- [ ] 權限檢查時間 < 50ms
- [ ] 加密/解密性能 > 1000 ops/sec
- [ ] 安全監控延遲 < 30 秒
- [ ] 系統可用性 > 99.9%

---

**📝 注意**: 安全架構需要與所有其他模組深度集成，確保端到端的安全性和合規性。