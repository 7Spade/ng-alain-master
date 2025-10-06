# System Patterns

## Architectural
- Lazy-loaded feature routing under `src/app/routes/*`
- Standalone `ApplicationConfig` providers instead of NgModules
- Service-driven startup via `StartupService` for menu/app/user bootstrapping
- ACL full access by default, `authSimpleCanActivate` guards for routes

## UI/UX
- ng-zorro components aggregated via `shared-zorro.module.ts`
- @delon ABC (ST/SE/SV/PageHeader) aggregated via `shared-delon.module.ts`
- Page title via `TitleService`, preloader via `stepPreloader`

## Internationalization
- Default zh-CN language pack across Angular, Zorro, Delon, date-fns

## Theming
- Less aggregation in `src/styles.less`; theme extensions in `src/styles/*`

## Routing Additions
- GitHub-style alias routes `/:owner` and `/:owner/:repo` via `routes.ts` + `routes/alias/*`
