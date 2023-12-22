import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './AuthService ';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class autGuardGuard {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this.authService.isLoggedIn !== true) {
      window.alert('vui long dang nhap!');
      this.router.navigate(['']);
    }
    return true;
  }
}