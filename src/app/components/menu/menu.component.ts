import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.interface';
import { UserDataService } from '../../shared/userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private signMeIn = true;
  private user: User = {
    mail: null,
    username: null
  }

  constructor(private us: UserDataService, private router: Router ) {}

  ngOnInit() {
    this.us.currentUserData.subscribe((data) => this.user = data);
  }

  reciveState($event){
    this.signMeIn = $event;
  }

  logOut() {
    this.user.username = null;
    this.user.mail = null;

    localStorage.clear();
    this.us.updateUserData(this.user);
    this.router.navigate(['/about']);
  }

}
