import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MembershipService } from '../services/membership.service';
import { MemberRole } from '../models/organization.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

/**
 * 組織管理員權限守衛
 * 檢查當前用戶是否為組織的管理員或擁有者
 */
export const orgAdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const membershipService = inject(MembershipService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);

  const organizationId = route.paramMap.get('id');
  
  if (!organizationId) {
    notification.error('錯誤', '無效的組織ID');
    router.navigate(['/pro/organization']);
    return of(false);
  }

  return membershipService.getUserRole(organizationId, 'current-user').pipe(
    map(role => {
      const hasPermission = role === MemberRole.OWNER || role === MemberRole.ADMIN;
      
      if (!hasPermission) {
        notification.error('權限不足', '您沒有權限訪問此頁面');
        router.navigate(['/pro/organization']);
      }
      
      return hasPermission;
    }),
    catchError(error => {
      console.error('權限檢查失敗:', error);
      notification.error('錯誤', '無法驗證權限');
      router.navigate(['/pro/organization']);
      return of(false);
    })
  );
};

/**
 * 組織擁有者權限守衛
 * 檢查當前用戶是否為組織的擁有者
 */
export const orgOwnerGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const membershipService = inject(MembershipService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);

  const organizationId = route.paramMap.get('id');
  
  if (!organizationId) {
    notification.error('錯誤', '無效的組織ID');
    router.navigate(['/pro/organization']);
    return of(false);
  }

  return membershipService.getUserRole(organizationId, 'current-user').pipe(
    map(role => {
      const hasPermission = role === MemberRole.OWNER;
      
      if (!hasPermission) {
        notification.error('權限不足', '只有組織擁有者才能訪問此頁面');
        router.navigate(['/pro/organization']);
      }
      
      return hasPermission;
    }),
    catchError(error => {
      console.error('權限檢查失敗:', error);
      notification.error('錯誤', '無法驗證權限');
      router.navigate(['/pro/organization']);
      return of(false);
    })
  );
};

/**
 * 組織成員權限守衛
 * 檢查當前用戶是否為組織的成員
 */
export const orgMemberGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const membershipService = inject(MembershipService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);

  const organizationId = route.paramMap.get('id');
  
  if (!organizationId) {
    notification.error('錯誤', '無效的組織ID');
    router.navigate(['/pro/organization']);
    return of(false);
  }

  return membershipService.getUserRole(organizationId, 'current-user').pipe(
    map(role => {
      const isMember = Object.values(MemberRole).includes(role);
      
      if (!isMember) {
        notification.error('權限不足', '您不是此組織的成員');
        router.navigate(['/pro/organization']);
      }
      
      return isMember;
    }),
    catchError(error => {
      console.error('權限檢查失敗:', error);
      notification.error('錯誤', '無法驗證權限');
      router.navigate(['/pro/organization']);
      return of(false);
    })
  );
};