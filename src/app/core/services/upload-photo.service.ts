import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDataService } from './userdata.service';
import { LogService } from './log.service';
import { Subject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UploadPhotoService {
    private subscription: Subscription;

    //Image events subjects
    private imgAddedEvent = new Subject<any>(); // Source
            imgAddedEventCallback$ = this.imgAddedEvent.asObservable(); // Stream

    private backgroundImgAddedEvent = new Subject<any>(); // Source
            backgroundImgAddedEventCallback$ = this.backgroundImgAddedEvent.asObservable(); // Stream

    constructor(
        private snackBar: MatSnackBar,
        private us: UserDataService,
        private log: LogService
    ) {}

    addNewPhoto(files, type) {
        const fd = new FormData();

        fd.append('image', files['target']['files'][0]);
        let response: any;
        if (type === 'normal') {
            this.subscription = this.us.putPhoto(fd).subscribe({
                next: (data) => (response = data),
                error: (err) => {
                    this.snackBar.open('Error uploading an image!', 'Close', {
                        duration: 3000,
                    });
                },
                complete: () => {
                    this.log.log(
                        response.body['msg'] +
                            ' - - ' +
                            response.body['imgUrl'],
                        'string'
                    );

                    this.snackBar.open(response.body['msg'], 'Close', {
                        duration: 3000,
                    });

                    this.imgAddedEvent.next(response.body['imgUrl']);
                },
            });
        } else if (type === 'background') {
            this.us.putBackgroundPhoto(fd).subscribe({
                next: (data) => (response = data),
                error: (err) => {
                    this.snackBar.open('Error uploading an image!', 'Close', {
                        duration: 3000,
                    });
                },
                complete: () => {
                    this.log.log(response, 'string');

                    this.snackBar.open(response.body['msg'], 'Close', {
                        duration: 3000,
                    });
                    this.backgroundImgAddedEvent.next(response.body['imgUrl']);
                },
            });
        }
    }
}
