import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadComponent: () => import('./projects-list.page').then(m => m.ProjectsListPage) },
      { path: ':projectSlug', loadComponent: () => import('./project-detail.page').then(m => m.ProjectDetailPage) }
    ]
  }
];


