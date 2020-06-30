import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserDataService } from '../services/userdata.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable()
export class ProfileResolver implements Resolve<any> {
  constructor(private us: UserDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.us.getPublicProfile(id);
  }

}