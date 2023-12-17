import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './AuthService ';

export const autGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const protectedRoutes: string[] = ['/website', '/admin'];

  // Logic để lấy giá trị token từ server sau khi người dùng đăng nhập thành công
  // Ví dụ:
  const authService: AuthService = inject(AuthService);
  authService.getTokenFromServer().subscribe((token: boolean | null) => {
    if (protectedRoutes.includes(state.url)) {
      if (token !== null) {
        return true; // Cho phép truy cập nếu token không null
      } else {
        return router.navigate(['/']); // Chuyển hướng về trang chủ nếu token là null
      }
    }
    return true; // Cho phép truy cập các route không nằm trong protectedRoutes
  });
  return false;
};
