import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserDataService } from '../services/userdata.service';
import { User } from '../models/user.model';


@Injectable()
export class UserResolver  {
  constructor(private us: UserDataService) {}

  // resolve(route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot) {
  //   return this.us.user;
  // }

}