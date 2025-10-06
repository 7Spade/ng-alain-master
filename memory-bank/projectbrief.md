# Project Brief: ng-alain (Angular 20 + ng-zorro + @delon)

## Overview
- Purpose: Admin panel scaffold based on ng-zorro-antd and @delon on Angular 20
- Entry: `src/main.ts` with standalone `appConfig` providers
- Layout: `LayoutBasicComponent`, `LayoutBlankComponent`
- Routing: Lazy-loaded feature routes under `src/app/routes/*`; GitHub-style alias `/:owner` and `/:owner/:repo`
- I18n: `@delon/theme` I18N service, default zh-CN
- Auth: `@delon/auth` simple auth + interceptor
- Startup: `StartupService` loads app/user/menu from `assets/tmp/app-data.json`
- Mock: Dev env wires `@delon/mock` via `environment.ts`
- Styles: Less, theme via `@delon` packages and local `src/styles/*`

## Build & Serve
- Dev: `npm start` (dev-server, hash routing optional via env)
- Build: `npm run build` (high memory CLI)
- E2E: Protractor config present (`e2e/`)
- Lint: ESLint + Stylelint

## Assets & Config
- Angular builder: `@angular/build:application`
- Assets: `public/`, `src/assets`, `src/favicon.ico`
- Allowed CommonJS: ajv, ajv-formats, mockjs, file-saver, extend

## Key Routes
- `/dashboard`, `/widgets`, `/style`, `/delon`, `/extras`, `/pro`
- `/:owner`, `/:owner/:repo` (alias bundle)
- `/data-v` (blank layout)
- `/passport/*`, `/exception/*`
