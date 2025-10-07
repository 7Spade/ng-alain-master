# Tech Context

## Frameworks
- **Angular**: ^20.3.0 (standalone components, signals, @if/@for control flow, strict mode)
- **ng-zorro-antd**: ^20.3.1 (complete UI component library)
- **@delon**: ^20.0.2 (abc, acl, auth, cache, chart, form, mock, theme, util)
- **RxJS**: ~7.8.0 (reactive programming)
- **Zone.js**: ~0.15.0 (change detection)

## Tooling
- **TypeScript**: ~5.9.2 (bundler resolution, ES2022 target/module, strict config)
- **ESLint**: 9 + angular-eslint 20 + TypeScript rules
- **Stylelint**: 16 + clean order + standard config
- **Prettier**: Code formatting with prettier config
- **Jasmine + Karma**: Unit testing with coverage
- **Protractor**: E2E testing framework
- **Yarn**: 4.9.2 (packageManager)
- **Husky**: Git hooks + lint-staged

## Runtime Patterns
- **Standalone Providers**: via `app.config.ts` (`provideRouter`, `provideAlain`, `provideAuth`, widgets, startup)
- **Interceptors**: `authSimpleInterceptor`, `defaultInterceptor`, mock in dev
- **Hash Routing**: toggled by `environment.useHash`
- **Component Architecture**: Standalone components with explicit imports
- **Change Detection**: OnPush strategy for performance
- **Service Injection**: inject() function for dependency injection

## Authentication & Authorization
- **@delon/auth**: Token-based authentication system
- **Simple Auth**: Username/password flow (admin/123456 demo)
- **Route Guards**: `authSimpleCanActivate`, `authSimpleCanActivateChild`
- **Token Management**: DA_SERVICE_TOKEN for user sessions
- **Anonymous Context**: ALLOW_ANONYMOUS for public endpoints
- **Reuse Tab**: Route reuse management

## Environments
- **Development**: mock providers + interceptors enabled, source maps
- **Production**: no mock providers; hash routing; API baseUrl `'./'`
- **API Configuration**: refreshTokenEnabled, refreshTokenType 'auth-refresh'

## Builder & Build
- **@angular/build:application**: New application builder
- **Polyfills**: zone.js for change detection
- **Style Preprocessor**: Less with includePaths `node_modules/`
- **High Memory Build**: --max_old_space_size=8000 for large applications
- **Bundle Analysis**: Source map generation and exploration
- **Asset Management**: public/, src/assets, favicon.ico

## State Management
- **Service-based State**: Component-level state management
- **Cache Service**: @delon/cache for data caching
- **Settings Service**: User preferences and app configuration
- **Startup Service**: App initialization and bootstrap
- **HTTP Client**: @delon/theme _HttpClient wrapper

## Internationalization
- **@delon/theme I18N**: Built-in i18n service
- **Default Language**: zh-CN across Angular, Zorro, Delon, date-fns
- **I18nPipe**: Template translation pipe
- **Custom I18NService**: Extended i18n functionality

## Theme & Styling
- **@delon/theme**: Theme system with default theme
- **Less Integration**: Custom theme variables support
- **Component Themes**: ng-zorro theme integration
- **Responsive Design**: Mobile-first approach
- **Style Aggregation**: src/styles.less with theme extensions

## Mock & Development
- **@delon/mock**: Development API simulation
- **Mock Data**: _mock/ directory with API endpoints
- **Mock Interceptor**: Automatic mock response handling
- **Environment-based**: Mock configuration per environment
- **Implemented Mock APIs**:
  - _organization.ts: 9 endpoints (CRUD, stats, avatar, name check)
  - _org-user.ts: 9 endpoints (CRUD, follow, organizations)

## Implemented Features

### Organization Management (✅ Complete MVP)

**Architecture**:
- Location: `src/app/routes/pro/organization/`
- Pattern: Feature module with standalone components
- Routing: Lazy-loaded routes with role-based guards
- State: Service-based with @delon/theme _HttpClient

**Data Models** (`models/`):
- `organization.model.ts`: Organization, OrganizationSettings, MemberRole enum
- `user.model.ts`: User, UserStats, follow relationships
- `membership.model.ts`: Membership, role management

**Services** (`services/`):
- `organization.service.ts`:
  - getOrganizations(params): List with pagination/search
  - getOrganization(id): Single org details
  - createOrganization(org): Create new org
  - updateOrganization(id, params): Update org
  - deleteOrganization(id): Remove org
  - getOrganizationStats(id): Get stats
  - uploadAvatar(id, file): Avatar upload
  - checkNameAvailability(name): Name validation
  
- `user.service.ts`:
  - User CRUD operations
  - Follow/unfollow functionality
  - User statistics and organizations

- `membership.service.ts`:
  - Member role management
  - Invitation system
  - Member removal and updates

**Guards** (`guards/org-admin.guard.ts`):
- `orgOwnerGuard`: Owner-only access
- `orgAdminGuard`: Admin + Owner access
- `orgMemberGuard`: All members access
- Implementation: Functional guards with inject(), Observable-based

**Components** (`components/`):
1. `organization-list`: Grid layout, search, pagination, empty state
2. `organization-form`: Create/edit with validation
3. `user-profile`: User information display
4. `org-profile`: Organization details page
5. `org-members`: Member management (invite/remove/role change)
6. `org-settings`: Organization configuration
7. `org-invitations`: Invitation management
8. `org-structure`: Organization hierarchy view

**Routes Configuration**:
```typescript
/pro/organization
  ├── /list              (public)
  ├── /create            (public)
  ├── /user/:id          (public)
  └── /:id
      ├── /              (orgMemberGuard)
      ├── /members       (orgAdminGuard)
      ├── /settings      (orgOwnerGuard)
      ├── /invitations   (orgAdminGuard)
      └── /structure     (orgMemberGuard)
```

**Technical Implementation**:
- ✅ Standalone components with explicit imports
- ✅ Native control flow (@if, @for, track)
- ✅ OnPush change detection strategy
- ✅ inject() for dependency injection
- ✅ _HttpClient from @delon/theme
- ✅ ng-zorro-antd components: Card, Avatar, Tag, Pagination, Input, Button
- ✅ Responsive grid layout
- ✅ i18n support with titleI18n in route data
- ✅ Type-safe TypeScript interfaces
