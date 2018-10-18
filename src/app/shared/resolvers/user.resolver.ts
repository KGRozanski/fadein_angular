import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserDataService } from '../services/userdata.service';
import { User } from '../interfaces/user.interface';


@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private us: UserDataService) {}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.us.user;
  }
}