# Tech Context

## Frameworks
- Angular: ^20.3.x (strict mode)
- ng-zorro-antd: ^20.3.1
- @delon: ^20.0.2 (abc, acl, auth, cache, chart, form, mock, theme, util)

## Tooling
- TypeScript: ~5.9.2 (bundler resolution, ES2022 target/module)
- ESLint 9 + angular-eslint 20
- Stylelint 16
- Jasmine + Karma, Protractor e2e
- Yarn 4.9.2 (packageManager)

## Runtime Patterns
- Standalone providers via `app.config.ts` (`provideRouter`, `provideAlain`, `provideAuth`, widgets, startup)
- Interceptors: `authSimpleInterceptor`, `defaultInterceptor`, mock in dev
- Hash routing toggled by `environment.useHash`

## Environments
- Dev: mock providers + interceptors enabled
- Prod: no mock providers; still hash routing; same API baseUrl `'./'`

## Builder
- `@angular/build:application`; polyfills `zone.js`
- Style preprocessor: Less with includePaths `node_modules/`
