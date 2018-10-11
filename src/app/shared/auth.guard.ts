import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserDataService } from '../shared/userdata.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
      constructor(private router: Router, private us: UserDataService) {}
      canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
        // check if token is set
        if (localStorage.getItem('token') != null) {
            return true;
        } else {
            this.router.navigate(['/about']);
            return false;
        }
      }
}
