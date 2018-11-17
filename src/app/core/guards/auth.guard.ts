import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
      constructor(private router: Router, private cs: CookieService) {}
      tokenCookie = this.cs.getCookie('token');

      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        // check if token is set
        if ( this.tokenCookie !== null) {
            return true;
        } else {
            this.router.navigate(['/welcome']);
            return false;
        }
    }
}
