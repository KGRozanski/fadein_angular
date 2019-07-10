import { environment } from '../../../environments/environment';
import { Component } from '@angular/core';
import { User } from '../../core/models/user.model';
import { UserDataService } from '../../core/services/userdata.service';
import { CookieService } from '../../core/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public version: string = environment.VERSION;
  private loginFormVisible = false;
  private user;

  constructor(private us: UserDataService, private router: Router, private cs: CookieService) {
    this.us.currentUserData.subscribe((data: User) => this.user = data);
  }

  logOut() {
    this.user = new User();
    this.cs.deleteCookie('token');
    this.us.updateUserData(this.user);
    this.router.navigate(['/welcome']);
  }

  reciveState(value: boolean) {
    this.loginFormVisible = value;
  }
}
