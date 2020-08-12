import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserDataService } from '../services/userdata.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileResolver implements Resolve<any> {

  constructor(private us: UserDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.us.getPublicProfile(id);
  }

}
