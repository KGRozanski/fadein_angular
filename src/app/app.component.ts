import { Component, OnInit } from '@angular/core';
import { UserDataService } from './shared/userdata.service';
import { User } from './shared/user.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Fade In:';

  public user: User = {
    username: null,
    mail: null
  };

  constructor(private us: UserDataService) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
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
