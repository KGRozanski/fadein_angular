import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Cookies from 'js-cookie'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
      constructor(private router: Router) {}


      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {


          console.log("token is: " + Cookies.get('token'))


        // check if token is set
        if ( Cookies.get('token') !== undefined) {
            return true;
        } else {
            this.router.navigate(['/welcome']);
            return false;
        }
    }
}
