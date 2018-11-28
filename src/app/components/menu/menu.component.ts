import { environment } from '../../../environments/environment';
import { Component, AfterViewInit } from '@angular/core';
import { User } from '../../core/models/user.model';
import { UserDataService } from '../../core/services/userdata.service';
import { CookieService } from '../../core/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {

  public version: string = environment.VERSION;
  private signMeIn = true;
  private user: User;

  constructor(private us: UserDataService, private router: Router, private cs: CookieService ) {
    this.us.currentUserData.subscribe((data: User) => this.user = data);
  }

  ngAfterViewInit() {
  }

  reciveState($event){
    this.signMeIn = $event;
  }

  logOut() {
    this.user.username = null;
    this.user.mail = null;
    this.cs.deleteCookie('token');
    this.us.updateUserData(this.user);
    this.router.navigate(['/welcome']);
  }

}
