import { Component, OnInit } from '@angular/core';
import { UserDataService } from './shared/services/userdata.service';
import { CookieService } from './shared/services/cookie.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Fade In:';
  tokenCookie = this.cs.getCookie('token');
  public user: User;

  constructor(private us: UserDataService, private cs: CookieService) {}

  ngOnInit() {
    if (this.tokenCookie !== null) {
      this.us.makeLogin();
    }
  }
}
