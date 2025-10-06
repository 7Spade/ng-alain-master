#!/usr/bin/env node

/**
 * ng-alain 專案結構樹狀圖生成腳本 
 * 適用於 ng-alain 20.0.2 + Angular 20 + ng-zorro-antd 企業級前端專案
 * 自動生成專案目錄結構報告，用於文件化專案架構
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

// Angular + ng-alain 專案排除模式
const EXCLUDE_PATTERNS: readonly string[] = [
  // Angular CLI 和編譯產出
  'dist',
  '.angular',
  'angular.json.bak',
  
  // Angular 特定排除
  'e2e',
  'cypress',
  
  // IDE 和編輯器配置
  '.vscode',
  '.idea',
  '.idx',
  '.envrc',
  
  // 構建工具和依賴
  'node_modules',
  '.pnp',
  '.pnp.*',
  '.yarn',
  'build',
  
  // 版本控制
  '.git',
  '.husky',
  
  // Angular 測試和覆蓋率
  'coverage',
  '.nyc_output',
  '__tests__',
  'test',
  'tests',
  '*.spec.ts',
  
  // Angular 開發工具
  '.eslintcache',
  '.stylelintcache',
  '.prettiercache',
  
  // TypeScript 編譯產出
  '*.tsbuildinfo',
  'tsconfig.tsbuildinfo',
  
  // 日誌和臨時文件
  '*.log',
  '*.tmp',
  '*.temp',
  '.modified',
  'npm-debug.log',
  'yarn-error.log',
  
  // 系統文件
  '.DS_Store',
  'Thumbs.db',
  'desktop.ini',
  
  // 環境變量文件
  '.env*',
  '.env.local',
  '.env.development.local',
  '.env.test.local',
  '.env.production.local',
  
  // Angular 和 ng-alain 特定檔案
  '*.swp',
  '*.swo',
  '*~',
  
  // Firebase Functions (如果使用)
  '.firebase',
  'firebase-debug.log',
  'firestore-debug.log',
  'functions',
  
  // ng-alain 自動生成文件
  '*.md.map',
  '_cli-tpl',
  
  // 其他開發工具 (移除非 Angular 相關)
  '*.pem',
  '*.key',
  '*.crt',
  '*.p12',
  '*.pfx'
] as const;

// Angular/TypeScript 專案排除的文件擴展名
const EXCLUDE_EXTENSIONS: readonly string[] = [
  // Angular 編譯產出
  '.map',
  '.js.map',
  '.css.map',
  '.scss.map',
  '.less.map',
  '.tsbuildinfo',
  
  // Angular 測試文件
  '.spec.ts',
  '.spec.js',
  
  // 日誌和臨時文件
  '.log',
  '.tmp',
  '.temp',
  '.swp',
  '.swo',
  '~',
  
  // 系統和備份文件
  '.bak',
  '.backup',
  '.orig',
  '.rej',
  
  // 開發工具快取
  '.cache',
  '.lock',
  
  // 證書和密鑰文件 (保留用於生產環境安全)
  '.pem',
  '.key',
  '.crt',
  '.p12',
  '.pfx',
  '.p8',
  '.der'
] as const;

// Angular 特定的重要目錄標識
const ANGULAR_DIRECTORIES: readonly string[] = [
  'src',
  'src/app',
  'src/assets',
  'src/styles',
  'src/environments',
  'libs',  // Angular libraries 目錄
  'projects'  // Angular monorepo projects 目錄
] as const;

// ng-alain 特定目錄標識
const NG_ALAIN_DIRECTORIES: readonly string[] = [
  'src/app/routes',
  'src/app/layout',
  'src/app/core',
  'src/app/shared',
  'src/assets/tmp',
  '_mock',
  'scripts/_ci'
] as const;

/**
 * 檢查路徑是否應該被排除
 */
function shouldExclude(filePath: string, fileName: string): boolean {
  // 檢查排除模式
  for (const pattern of EXCLUDE_PATTERNS) {
    if (pattern.includes('*')) {
      // 處理通配符模式
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      if (regex.test(fileName) || regex.test(filePath)) {
        return true;
      }
    } else {
      // 精確匹配
      if (fileName === pattern || filePath.includes(pattern)) {
        return true;
      }
    }
  }

  // 檢查文件擴展名
  const ext = path.extname(fileName);
  if (EXCLUDE_EXTENSIONS.includes(ext)) {
    return true;
  }

  return false;
}

/**
 * 檢查是否為 Angular 重要目錄
 */
function isAngularDirectory(dirPath: string, dirName: string): boolean {
  const joinedPath = path.join(dirPath, dirName);
  return ANGULAR_DIRECTORIES.some(angularDir => 
    joinedPath.endsWith(angularDir) || joinedPath.includes(`/${angularDir}/`)
  );
}

/**
 * 檢查是否為 ng-alain 特定目錄
 */
function isNgAlainDirectory(dirPath: string, dirName: string): boolean {
  const joinedPath = path.join(dirPath, dirName);
  return NG_ALAIN_DIRECTORIES.some(alainDir => 
    joinedPath.endsWith(alainDir) || joinedPath.includes(`/${alainDir}/`)
  );
}

/**
 * 獲取文件類型說明 (針對 Angular/TypeScript 文件)
 */
function getFileTypeDescription(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  
  const typeDescriptions: Record<string, string> = {
    '.ts': 'TypeScript',
    '.component.ts': 'Angular 組件',
    '.service.ts': 'Angular 服務',
    '.module.ts': 'Angular 模組',
    '.routing.ts': 'Angular 路由',
    '.guard.ts': 'Angular 守衛',
    '.pipe.ts': 'Angular 管道',
    '.directive.ts': 'Angular 指令',
    '.html': 'HTML 模板',
    '.less': 'Less 樣式',
    '.scss': 'SCSS 樣式',
    '.css': 'CSS 樣式',
    '.json': 'JSON 配置',
    '.md': 'Markdown 文檔',
    '.yml': 'YAML 配置',
    '.yaml': 'YAML 配置',
    '.js': 'JavaScript',
    '.mjs': 'ES 模組',
    '.lock': '依賴鎖定',
    '.map': 'Source Map',
    '.ico': '圖示檔案'
  };
  
  // 檢查特定 Angular 文件命名模式
  if (fileName.includes('.component.')) return 'Angular 組件';
  if (fileName.includes('.service.')) return 'Angular 服務';
  if (fileName.includes('.module.')) return 'Angular 模組';
  if (fileName.includes('.routing.')) return 'Angular 路由';
  if (fileName.includes('.guard.')) return 'Angular 守衛';
  if (fileName.includes('.pipe.')) return 'Angular 管道';
  if (fileName.includes('.directive.')) return 'Angular 指令';
  
  return typeDescriptions[ext] || '檔案';
}

/**
 * 格式化文件大小
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * 格式化修改時間
 */
function formatModTime(stats: fs.Stats): string {
  const now = new Date();
  const modTime = new Date(stats.mtime);
  const diffMs = now.getTime() - modTime.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}週前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}個月前`;
  return `${Math.floor(diffDays / 365)}年前`;
}

/**
 * 生成樹狀結構 - Angular/ng-alain 專用版本
 */
function generateTree(
  dirPath: string, 
  prefix: string = '', 
  isLast: boolean = true, 
  depth: number = 0, 
  maxDepth: number = 8  // 減少深度限制，避免過度複雜
): string {
  if (depth > maxDepth) {
    return '';
  }

  let result = '';
  const items = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter((item: fs.Dirent) => !shouldExclude(path.join(dirPath, item.name), item.name))
    .sort((a: fs.Dirent, b: fs.Dirent) => {
      // Angular 重要目錄優先
      const aIsAngular = isAngularDirectory(dirPath, a.name);
      const bIsAngular = isAngularDirectory(dirPath, b.name);
      if (aIsAngular && !bIsAngular) return -1;
      if (!aIsAngular && bIsAngular) return 1;
      
      // ng-alain 目錄其次
      const aIsNgAlain = isNgAlainDirectory(dirPath, a.name);
      const bIsNgAlain = isNgAlainDirectory(dirPath, b.name);
      if (aIsNgAlain && !bIsNgAlain) return -1;
      if (!aIsNgAlain && bIsNgAlain) return 1;
      
      // 目錄優先，然後按名稱排序
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  items.forEach((item: fs.Dirent, index: number) => {
    const isLastItem = index === items.length - 1;
    const currentPrefix = isLast ? '└── ' : '├── ';
    const nextPrefix = isLast ? '    ' : '│   ';

    // 添加目錄/文件標識符
    let displayName = item.name;
    if (isAngularDirectory(dirPath, item.name)) {
      displayName += ' [Angular]';
    } else if (isNgAlainDirectory(dirPath, item.name)) {
      displayName += ' [ng-alain]';
    }

    result += `${prefix}${currentPrefix}${displayName}`;

    if (item.isDirectory()) {
      result += '/\n';
      const subPath = path.join(dirPath, item.name);
      result += generateTree(subPath, prefix + nextPrefix, isLastItem, depth + 1, maxDepth);
    } else {
      // 添加文件詳細信息
      try {
        const fullPath = path.join(dirPath, item.name);
        const stats = fs.statSync(fullPath);
        const size = formatFileSize(stats.size);
        const modTime = formatModTime(stats);
        const fileType = getFileTypeDescription(item.name);
        result += ` (${size}, ${modTime}, ${fileType})\n`;
      } catch {
        const fileType = getFileTypeDescription(item.name);
        result += ` (${fileType})\n`;
      }
    }
  });

  return result;
}

/**
 * 生成完整的項目結構分析報告 - ng-alain 專用版本
 */
function generateProjectStructure(): void {
  const rootPath = process.cwd();
  
  // 確保輸出目錄存在
  const outputDir = path.join(rootPath, 'docs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tree = generateTree(rootPath);
  const timestamp = new Date().toISOString().split('T')[0];
  const outputPath = path.join(outputDir, `ng-alain-structure-${timestamp}.md`);

  // 讀取 package.json 獲取項目信息
  interface ProjectInfo {
    name?: string;
    version?: string;
    description?: string;
    angularVersion?: string;
    ngAlainVersion?: string;
  }
  
  let projectInfo: ProjectInfo = {};
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf8'));
    projectInfo = {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      angularVersion: packageJson.dependencies?.['@angular/core'] || 'Unknown',
      ngAlainVersion: packageJson.dependencies?.['@delon/abc'] || packageJson.devDependencies?.['ng-alain'] || 'Unknown'
    };
  } catch (error) {
    console.warn('⚠️  無法讀取 package.json:', error);
    projectInfo = {
      name: 'ng-alain',
      version: '20.0.2',
      description: 'ng-zorro-antd admin panel front-end framework',
      angularVersion: '20+',
      ngAlainVersion: '20.0.2'
    };
  }

  const content = `# 📁 ng-alain 專案結構分析報告

> 此文件由 ng-alain 專用腳本自動生成，請勿手動編輯  
> 生成日期: ${timestamp}  
> 專案版本: ng-alain ${projectInfo.version || '20.0.2'} + Angular 20

## 📋 專案概覽

- **專案名稱**: ${projectInfo.name || 'ng-alain'}
- **專案版本**: ${projectInfo.version || '20.0.2'}
- **專案描述**: ${projectInfo.description || 'ng-zorro-antd admin panel front-end framework'}
- **Angular 版本**: Angular 20+
- **Framework**: ng-alain + ng-zorro-antd + @delon/*

## 🏗️ Angular + ng-alain 架構說明

### 核心目錄結構
- **src/app/routes/**: ng-alain 路由模組，包含業務頁面
- **src/app/layout/**: ng-alain 布局組件 (basic, blank, passport)
- **src/app/core/**: Angular 核心服務和模組
- **src/app/shared/**: Angular 共用組件和服務
- **src/assets/**: Angular 靜態資源目錄
- **_mock/**: ng-alain Mock 數據服務

### ng-alain 特色功能
- **@delon/abc**: Admin Business Component (ST, SE 等)
- **@delon/acl**: Access Control List 權限控制
- **@delon/auth**: Authentication 身份驗證
- **@delon/cache**: Cache 快取服務
- **@delon/form**: Dynamic Form 動態表單
- **@delon/theme**: Theme 主題系統

## 📊 詳細目錄結構

\`\`\`
${tree}
\`\`\`

## 🎯 Angular 20 + ng-alain 最佳實踐

### 1. 專案結構規範
- ✅ 遵循 ng-alain 目錄命名規範
- ✅ 使用 @delon/* 模組進行功能開發
- ✅ 合理組織 routes 模組化結構

### 2. 代碼組織原則
- ✅ 單一職責原則 (SRP)
- ✅ 依賴注入 (DI) 合理使用
- ✅ 組件重用與模組化設計

### 3. ng-alain 開發規範
- ✅ 使用 ng-zorro-antd 組件庫
- ✅ 遵循 Ant Design 設計規範
- ✅ 充分利用 @delon/* 生態

## 🔄 自動化腳本使用

### 手動生成結構報告
\`\`\`bash
npm run structure:generate
\`\`\`

### Git Hook 自動更新
此文件可配置在 Git pre-commit hook 中自動更新，確保專案結構文檔始終保持最新狀態。

### 腳本特色功能
- 🔍 Angular 與 ng-alain 目錄自動識別
- 📋 檔案類型自動分類
- 📊 詳細的檔案大小與修改時間
- 🎯 ng-alain 專案結構最佳實踐說明

---

*Generated by ng-alain Structure Generator v2.0*
`;

  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`✅ ng-alain 專案結構驗證報告已完成: ${outputPath}`);
  console.log(`📁 輸出目錄: ${outputDir}`);
  console.log(`🔍 Angular 版本: 20+`);
  console.log(`🎯 ng-alain 版本: 20.0.2`);
}

// 如果直接執行此腳本
if (require.main === module) {
  try {
    generateProjectStructure();
  } catch (error) {
    console.error('❌ 生成 ng-alain 專案結構文檔時發生錯誤:', (error as Error).message);
    process.exit(1);
  }
}

// 導出關鍵函數供其他模組使用
export { generateProjectStructure, generateTree, getFileTypeDescription };