import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: ':username', loadComponent: () => import('./user/user.component').then(m => m.UserComponent) }
];


