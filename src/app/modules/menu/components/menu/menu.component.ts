import { environment } from '../../../../../environments/environment';
import { Component } from '@angular/core';
import { User } from '../../../../core/interfaces/user.interface';
import { UserDataService } from '../../../../core/services/userdata.service';

import { Router } from '@angular/router';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public version: string = environment.VERSION;
  private loginFormVisible = false;
  private user: User;

  constructor(private UDS: UserDataService, private router: Router) {
    this.UDS.USER_STATE.subscribe((data: User) => this.user = data);
  }

  logOut() {
    Cookies.remove('token');
    this.UDS.userSubject.next(<User> {});
    this.router.navigate(['/welcome']);
  }

  loginVisibilityState(value: boolean) {
    this.loginFormVisible = value;
  }
}
