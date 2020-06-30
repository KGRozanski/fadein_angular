import { Component } from '@angular/core';
import { UserDataService } from './core/services/userdata.service';
import Cookies from 'js-cookie'
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LogService } from './core/services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Fade In:';
  public loading = false;
  public color = 'primary';
  public mode = 'indeterminate';

  constructor(private us: UserDataService, private router: Router, private log: LogService) {
    if (Cookies.get('token') !== undefined) {
      this.us.makeLogin();
    }

    router.events.subscribe((routerEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd || 
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
        this.loading = false;
      }
  }


}
