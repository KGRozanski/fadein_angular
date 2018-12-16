import { Component, ViewEncapsulation, ViewChild, Output, EventEmitter, } from '@angular/core';
import {MatSnackBar} from '@angular/material';  
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { UserDataService } from '../../../../../core/services/userdata.service';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CropComponent {

  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;
  @Output() cancel = new EventEmitter<boolean>();
  @Output() imageUploaded = new EventEmitter<string>();

  data: any;
  cropperSettings: CropperSettings;

  constructor(private us: UserDataService, public snackBar: MatSnackBar) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 300;
    this.data = {};
  }

  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
      
    };
    myReader.readAsDataURL(file);
    setTimeout(function() {
      that.emit();
    }, 500)
    
  }

  emit() {
    this.imageUploaded.emit(this.data.image['msg']);
  }
  
  cancelEmit() {
    this.cropper.reset();
    this.cancel.emit(true);
  }

  saveImg() {
    let user;
    //Fetch user data with userService
    this.us.currentUserData.subscribe((data) => user = data)
    //Update value
    user.avatar = this.data.image;
    //Return object to userService
    this.us.updateUserData(user);
    //Construct file from blob & send it to db
    const imgBlob = new Blob([this.data.image], {type: "image/jpeg"});
    let file: File = new File([imgBlob], 'avatar.jpg', {type: "image/jpeg", lastModified: Date.now()});
    const fd = new FormData();
    fd.append('image', file, 'avatar.jpg');

    let response;

    this.us.putUserAvatar(fd).subscribe({
      next: data => response = data,
      error: err => {
        this.snackBar.open('Error uploading an image!', 'Close', {
          duration: 3000
        });
      },
      complete: () => {
        this.cancelEmit();
        this.snackBar.open(response.body['msg'], 'Close', {
          duration: 3000
        });
      }
    })

  }
}
