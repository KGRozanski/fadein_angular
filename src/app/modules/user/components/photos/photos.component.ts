import {
    Component,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { UserDataService } from 'src/app/core/services/userdata.service';
import { User } from 'src/app/core/interfaces/user.interface';
import { UploadPhotoService } from 'src/app/core/services/upload-photo.service';
import { LogService } from 'src/app/core/services/log.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent {

    constructor(
        public us: UserDataService,
        private upload: UploadPhotoService,
        private log: LogService
    ) {}

    public selectedPhoto: string;
    public galleryFlag = false;

    @ViewChild('newPhoto') newPhoto: ElementRef;
    @Input() user: User;
    @Output() photoAddEvent = new EventEmitter<string>();

    addPhoto() {
        this.newPhoto.nativeElement.click();
    }
    /*
     *
     *	New photo
     *
     */
    handleNewPhoto($event) {
        this.upload.addNewPhoto($event, 'normal');

        this.upload.imgAddedEventCallback$.pipe(first()).subscribe((data) => {
            this.emit(data);
        });
    }

    emit(event) {
        this.photoAddEvent.emit(event);
    }

    selectPhoto(url) {
        this.selectedPhoto =
            this.us.APIurl + 'photo/' + this.user.username + '/' + url;
        this.galleryFlag = true;
    }

    photoGalleryClose($event) {
        this.galleryFlag = $event;
    }
}
