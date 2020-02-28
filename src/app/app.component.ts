import { Component } from '@angular/core';
import { UserDataService } from './core/services/userdata.service';
import Cookies from 'js-cookie'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Fade In:';

  constructor(private us: UserDataService) {
    if (Cookies.get('token') !== undefined) {
      this.us.makeLogin();
    }
  }


}
