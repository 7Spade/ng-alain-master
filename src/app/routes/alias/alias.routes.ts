import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./owner-router.component').then(m => m.OwnerRouterComponent) },
  { path: ':projectSlug', loadComponent: () => import('./owner-router.component').then(m => m.OwnerRouterComponent) }
];


