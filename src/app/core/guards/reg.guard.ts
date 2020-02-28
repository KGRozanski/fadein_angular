import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import Cookies from 'js-cookie'

@Injectable({
  providedIn: 'root'
})
export class RegGuard implements CanActivate {

  constructor(private router: Router) {}


      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        // check if token is set
        if ( Cookies.get('token') == undefined) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
    }
}
