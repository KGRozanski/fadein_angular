import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { UserDataService } from '../../../../core/services/userdata.service';
import { CropComponent } from '../tools/crop/crop.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {

 @ViewChild(CropComponent) crop;

  private user: User;

  private imgData = '';

  constructor(private us: UserDataService) {
    this.us.currentUserData.subscribe((data) => this.user = data);
  }

  ngAfterViewInit() {
    this.imgData = this.crop.data;
  }

}
