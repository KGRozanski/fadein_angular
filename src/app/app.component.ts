import { Component, OnInit } from '@angular/core';
import { UserDataService } from './shared/services/userdata.service';
import { CookieService } from './shared/services/cookie.service';
import { User } from './shared/interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Fade In:';
  myCookie = this.cs.getCookie('token');
  public user: User = {
    username: null,
    mail: null
  };

  constructor(private us: UserDataService, private cs: CookieService) {}

  ngOnInit() {
    if (this.myCookie !== null) {
      this.us.getUserInfo().subscribe((res) => {
        const response = res['body'];
        if (response) {
          this.user.username = response['user']['username'];
          this.user.mail = response['user']['mail'];
          this.us.updateUserData(this.user);
        }
      });
    }
  }
}
