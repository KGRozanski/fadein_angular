import { environment } from '../../../../../environments/environment';
import { Component } from '@angular/core';
<<<<<<< HEAD:src/app/modules/user/components/menu/menu.component.ts
import { User } from '../../../../core/models/user.model';
import { UserDataService } from '../../../../core/services/userdata.service';
import { CookieService } from '../../../../core/services/cookie.service';
=======
import { User } from '../../core/interfaces/user.interface';
import { UserDataService } from '../../core/services/userdata.service';
>>>>>>> master:src/app/components/menu/menu.component.ts
import { Router } from '@angular/router';
import Cookies from 'js-cookie'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public version: string = environment.VERSION;
  private loginFormVisible = false;
  private user: User;

  constructor(private us: UserDataService, private router: Router) {
    this.us.USER_STATE.subscribe((data: User) => this.user = data);
  }

  logOut() {
    Cookies.remove('token');
    this.us.userSubject.next(<User> {});
    this.router.navigate(['/welcome']);
  }

  loginVisibilityState(value: boolean) {
    this.loginFormVisible = value;
  }
}
