# System Patterns

## Architectural
- **Lazy-loaded feature routing** under `src/app/routes/*` with standalone components
- **Standalone ApplicationConfig** providers instead of NgModules
- **Service-driven startup** via `StartupService` for menu/app/user bootstrapping
- **ACL full access by default**, `authSimpleCanActivate` guards for routes
- **@angular/build:application** builder with ES2022 target and bundler resolution
- **Strict TypeScript** configuration with noImplicitOverride, strictInjectionParameters

## UI/UX
- **ng-zorro components** aggregated via `shared-zorro.module.ts`
- **@delon ABC** (ST/SE/SV/PageHeader) aggregated via `shared-delon.module.ts`
- **Page title** via `TitleService`, preloader via `stepPreloader`
- **Component imports** using standalone components with explicit imports
- **Change detection** strategy OnPush for performance

## Internationalization
- **Default zh-CN** language pack across Angular, Zorro, Delon, date-fns
- **I18nPipe** for template translations
- **I18NService** custom service for extended i18n functionality

## Theming
- **Less aggregation** in `src/styles.less`; theme extensions in `src/styles/*`
- **@delon/theme** with theme-default.less
- **Custom theme variables** support for primary colors and branding

## Authentication & Authorization
- **@delon/auth** simple auth with token service
- **ALLOW_ANONYMOUS** context for login endpoints
- **authSimpleInterceptor** for automatic token handling
- **ReuseTabService** for route reuse management

## Mock & Development
- **@delon/mock** with mockInterceptor for development
- **Mock data** in `_mock/` directory with API endpoints
- **Environment-based** mock configuration

## Routing Structure
- **Main routes**: dashboard, widgets, style, delon, extras, pro
- **Special layouts**: data-v (blank), passport (auth), exception (errors)
- **GitHub-style alias routes** `/:owner` and `/:owner/:repo` (planned)
- **Guard integration**: startPageGuard + authSimpleCanActivate

## Code Quality & Tooling
- **ESLint** with TypeScript rules and Angular-specific plugins
- **Stylelint** for Less file linting
- **Prettier** for code formatting
- **Husky** + **lint-staged** for git hooks
- **Source map explorer** for bundle analysis
- **High memory build** with --max_old_space_size=8000
