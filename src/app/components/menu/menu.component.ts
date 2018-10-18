import { environment } from '../../../environments/environment';
import { Component, AfterViewInit } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { UserDataService } from '../../shared/services/userdata.service';
import { CookieService } from '../../shared/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {

  public version: string = environment.VERSION;
  private signMeIn = true;
  private user: User = {
    mail: null,
    username: null
  }

  constructor(private us: UserDataService, private router: Router, private cs: CookieService ) {
    this.us.currentUserData.subscribe((data) => this.user = data);
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
    this.router.navigate(['/about']);
  }

}
