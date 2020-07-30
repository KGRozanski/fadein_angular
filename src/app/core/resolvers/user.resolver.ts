import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserDataService } from '../services/userdata.service';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(private us: UserDataService) {}

  resolve() {
    return this.us.USER_STATE;
  }

}
