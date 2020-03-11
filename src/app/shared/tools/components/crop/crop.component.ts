import {
  Component,
  ViewEncapsulation,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  OnInit
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  UserDataService
} from '../../../../core/services/userdata.service';
import { of } from 'rxjs';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CropComponent implements OnInit {

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  @ViewChild('cropper') cropperCompRef: ElementRef;
  @ViewChild('cropWraper') cropWraper: ElementRef;

  @Output() cancel = new EventEmitter < boolean > ();
  @Output() imageUploaded = new EventEmitter < string > ();

  data: any;
  cropperSettings: CropperSettings;
  private crop = this;

  constructor(private us: UserDataService, public snackBar: MatSnackBar, private renderer: Renderer2, elRef: ElementRef) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 300;
    this.data = {};
    this.renderer.setProperty(this.imgInput, 'type', 'file');
    this.renderer.addClass(this.imgInput, 'custom-input');
  }
  private imgInput = this.renderer.createElement('input');


  ngOnInit() {
    this.renderer.listen(this.imgInput, 'change', ($event) => {
      this.fileChangeListener($event);
    })
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();


    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);

    of(this.cropper.image).subscribe((val) => {
      if(val.image != undefined) {
        this.emit()
      }
    }).unsubscribe();
  }


  emit() {
    this.imageUploaded.emit(this.data.image['msg']);
  }

  closeCropper() {
    this.cropper.reset();
    this.renderer.setProperty(this.imgInput, 'value', '');
    this.cancel.emit(true);
  }

  saveImg() {
    let user;
    //Fetch user data with userService
    this.us.USER_STATE.subscribe((data) => user = data)
    //Update value
    user.avatar = this.data.image;
    user.isAvatarSet = true;
    //Return object to userService
    this.us.userSubject.next(user);
    //Construct file from blob & send it to db
    const imgBlob = new Blob([this.data.image], {
      type: "image/jpeg"
    });
    let file: File = new File([imgBlob], 'avatar.jpg', {
      type: "image/jpeg",
      lastModified: Date.now()
    });
    const fd = new FormData();
    fd.append('image', file, 'avatar.jpg');

    let response: any;

    this.us.putUserAvatar(fd).subscribe({
      next: data => response = data,
      error: err => {
        this.snackBar.open('Error uploading an image!', 'Close', {
          duration: 3000
        });
      },
      complete: () => {
        this.closeCropper();
        this.snackBar.open(response.body['msg'], 'Close', {
          duration: 3000
        });
      }
    })
  }
}