import { Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { authSimpleCanActivate, authSimpleCanActivateChild } from '@delon/auth';

import { LayoutBasicComponent, LayoutBlankComponent } from '../layout';

export const routes: Routes = [
  // Landing page as home page
  {
    path: '',
    loadChildren: () => import('./landing/routes').then(m => m.routes)
  },
  {
    path: 'dashboard',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      { path: '', redirectTo: 'v1', pathMatch: 'full' },
      {
        path: 'v1',
        loadChildren: () => import('./dashboard/routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'widgets',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      {
        path: '',
        loadChildren: () => import('./widgets/routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'style',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      {
        path: '',
        loadChildren: () => import('./style/routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'delon',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      {
        path: '',
        loadChildren: () => import('./delon/routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'extras',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      {
        path: '',
        loadChildren: () => import('./extras/routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'pro',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      {
        path: '',
        loadChildren: () => import('./pro/routes').then(m => m.routes)
      }
    ]
  },
  // Blak Layout 空白布局
  {
    path: 'data-v',
    component: LayoutBlankComponent,
    children: [{ path: '', loadChildren: () => import('./data-v/routes').then(m => m.routes) }]
  },
  // passport
  { path: '', loadChildren: () => import('./passport/routes').then(m => m.routes) },
  { path: 'exception', loadChildren: () => import('./exception/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'exception/404' }
];
