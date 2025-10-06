# Project Brief: ng-alain (Angular 20 + ng-zorro + @delon)

## Overview
- **Purpose**: Enterprise admin panel scaffold based on ng-zorro-antd and @delon on Angular 20
- **Entry**: `src/main.ts` with standalone `appConfig` providers and bootstrapApplication
- **Layout**: `LayoutBasicComponent`, `LayoutBlankComponent`, `LayoutPassportComponent`
- **Routing**: Lazy-loaded feature routes under `src/app/routes/*`; GitHub-style alias `/:owner` and `/:owner/:repo` (planned)
- **I18n**: `@delon/theme` I18N service, default zh-CN with custom I18NService
- **Auth**: `@delon/auth` simple auth + interceptor with token management
- **Startup**: `StartupService` loads app/user/menu from `assets/tmp/app-data.json`
- **Mock**: Dev env wires `@delon/mock` via `environment.ts` with mockInterceptor
- **Styles**: Less, theme via `@delon` packages and local `src/styles/*`

## Technical Stack
- **Angular**: 20.3.0 (standalone components, signals, @if/@for control flow)
- **UI Library**: ng-zorro-antd 20.3.1
- **Admin Framework**: @delon/* 20.0.2 (ABC, ACL, Auth, Cache, Chart, Form, Mock, Theme, Util)
- **TypeScript**: 5.9.2 with strict mode and ES2022 target
- **Package Manager**: yarn@4.9.2
- **Build Tool**: @angular/build:application (new application builder)

## Build & Serve
- **Dev**: `npm start` (dev-server with --open, hash routing via env.useHash)
- **Build**: `npm run build` (high memory CLI with --max_old_space_size=8000)
- **Analysis**: `npm run analyze` (source map generation) + `npm run analyze:view`
- **E2E**: Protractor config present (`e2e/`)
- **Lint**: ESLint + Stylelint with cache and fix
- **Test**: Jasmine + Karma with coverage reporting

## Assets & Config
- **Angular builder**: `@angular/build:application`
- **Assets**: `public/`, `src/assets`, `src/favicon.ico`
- **Allowed CommonJS**: ajv, ajv-formats, mockjs, file-saver, extend
- **Proxy**: `proxy.conf.js` for development
- **Environment**: Development and production configurations

## Key Routes & Features
- **Main Routes**: `/dashboard`, `/widgets`, `/style`, `/delon`, `/extras`, `/pro`
- **Special Routes**: `/data-v` (blank layout), `/passport/*` (auth), `/exception/*` (errors)
- **Planned Routes**: `/:owner`, `/:owner/:repo` (GitHub-style alias)
- **Landing**: Root path shows welcome page with login redirect
- **Auth Flow**: Login with hardcoded credentials (admin/123456) for demo

## Development Features
- **Hot Reload**: HMR support with `npm run hmr`
- **Theme Generation**: `npm run color-less` and `npm run theme`
- **Icon Generation**: `ng g ng-alain:plugin icon`
- **Structure Check**: `npm run structure:check` with tree generation
- **Git Hooks**: Husky + lint-staged for pre-commit linting

## Current Status
- ✅ **VAN Analysis Complete**: Full project structure analyzed
- ✅ **Memory Bank Updated**: All technical details documented
- 🔄 **Ready for Implementation**: Users & Orgs feature skeleton
- 📋 **Next Phase**: PLAN mode for feature implementation
