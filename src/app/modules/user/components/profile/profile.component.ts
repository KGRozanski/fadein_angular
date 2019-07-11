import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { UserDataService } from '../../../../core/services/userdata.service';
import { CropComponent } from '../../../../shared/tools/components/crop/crop.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('toggle', [
      state('true', style({
        'height': '420px'
      })),
      state('false', style({
        'height': '0'
      })),
      transition('*=>true', animate('200ms')),
      transition('*=>false', animate('300ms'))
    ])
  ]
})
export class ProfileComponent implements AfterViewInit {

 @ViewChild(CropComponent) crop;

  private user: User;
  private imgData = {
    image: null
  };
  private isCropperShown = false;

  constructor(private us: UserDataService) {
    this.us.currentUserData.subscribe((data) => {
      this.user = data;
      this.imgData.image = data.avatar;
    });
  }

  reciveImage($event) {
    this.imgData.image = $event;
    this.imgData = this.crop.data;
  }

  toggleCrop(isCanceled) {
    if (isCanceled == true) {
      this.us.currentUserData.subscribe((data) => {
        this.user = data;
        this.imgData.image = data.avatar;
      });
    }
    this.isCropperShown = !this.isCropperShown;
  }

  ngAfterViewInit() {}

}
