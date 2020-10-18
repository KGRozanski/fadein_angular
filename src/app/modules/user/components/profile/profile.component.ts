import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../../core/interfaces/user.interface';
import { UserDataService } from '../../../../core/services/userdata.service';
import { CropComponent } from '../../../../shared/components/crop/crop.component'
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UploadPhotoService } from 'src/app/core/services/upload-photo.service';
import { LogService } from 'src/app/core/services/log.service';
import { SocketsService } from 'src/app/core/services/sockets.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [
        trigger('toggle', [
            state(
                'true',
                style({
                    height: '430px',
                })
            ),
            state(
                'false',
                style({
                    height: '0',
                })
            ),
            transition('*=>true', animate('200ms')),
            transition('*=>false', animate('300ms')),
        ])
    ],
})
export class ProfileComponent implements OnInit, OnDestroy {

    constructor(
        private us: UserDataService,
        public snackBar: MatSnackBar,
        public upload: UploadPhotoService,
        private log: LogService,
        private ss: SocketsService
    ) {
        this.userSubscription = this.us.USER_STATE.subscribe((data) => {
            this.user = data;
            this.imgData.image = data.avatar;
            this.professions = this.user['professions'];
        });
    }

    // User data object and image object
    public user: User;
    private imgData = { image: null };

    // Professions
    public professions: string[] = [];

    private userSubscription: Subscription;

    public isCropperShown = false;

    @ViewChild(CropComponent) crop;
    @ViewChild('backgroundPhoto') backgroundPhoto: ElementRef;

    ngOnInit() {
        this.log.log(this.user);
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    submitPhoto() {
        this.backgroundPhoto.nativeElement.click();
    }

    reciveImage($event) {
        this.imgData.image = $event;
        this.imgData = this.crop.data;
    }

    toggleCrop(isCanceled) {
        if (isCanceled === true) {
            this.us.USER_STATE.subscribe((data) => {
                this.imgData.image = data.avatar;
            });
        }
        this.isCropperShown = !this.isCropperShown;
    }

    // Photos
    addPhoto($event) {
        this.user.photos.push($event);
    }
}
