import { Routes } from '@angular/router';
import { orgAdminGuard, orgOwnerGuard, orgMemberGuard } from './guards/org-admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./components/organization-list/organization-list.component').then(m => m.OrganizationListComponent),
    data: { title: '組織列表', titleI18n: 'organization.list' }
  },
  {
    path: 'create',
    loadComponent: () => import('./components/organization-form/organization-form.component').then(m => m.OrganizationFormComponent),
    data: { title: '創建組織', titleI18n: 'organization.create' }
  },
  {
    path: 'user/:id',
    loadComponent: () => import('./components/user-profile/user-profile.component').then(m => m.UserProfileComponent),
    data: { title: '用戶檔案', titleI18n: 'user.profile' }
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/org-profile/org-profile.component').then(m => m.OrgProfileComponent),
        canActivate: [orgMemberGuard],
        data: { title: '組織檔案', titleI18n: 'organization.profile' }
      },
      {
        path: 'members',
        loadComponent: () => import('./components/org-members/org-members.component').then(m => m.OrgMembersComponent),
        canActivate: [orgAdminGuard],
        data: { title: '組織成員', titleI18n: 'organization.members' }
      },
      {
        path: 'settings',
        loadComponent: () => import('./components/org-settings/org-settings.component').then(m => m.OrgSettingsComponent),
        canActivate: [orgOwnerGuard],
        data: { title: '組織設定', titleI18n: 'organization.settings' }
      },
      {
        path: 'invitations',
        loadComponent: () => import('./components/org-invitations/org-invitations.component').then(m => m.OrgInvitationsComponent),
        canActivate: [orgAdminGuard],
        data: { title: '邀請管理', titleI18n: 'organization.invitations' }
      },
      {
        path: 'structure',
        loadComponent: () => import('./components/org-structure/org-structure.component').then(m => m.OrgStructureComponent),
        canActivate: [orgMemberGuard],
        data: { title: '組織架構', titleI18n: 'organization.structure' }
      }
    ]
  }
];