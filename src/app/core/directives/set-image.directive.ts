import { Directive, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { UserDataService } from '../services/userdata.service';
import { UploadPhotoService } from '../services/upload-photo.service';
import { LogService } from '../services/log.service';
import { Subscription } from 'rxjs';
import { ApiLinksService } from '../services/api-links.service';
import { Req } from '../interfaces/request.interface';

@Directive({
    selector: '[appSetImg]',
})
export class SetImageDirective implements OnDestroy {

    constructor(
        private elRef: ElementRef,
        private log: LogService,
        private upload: UploadPhotoService,
        private renderer2: Renderer2,
        private us: UserDataService,
        private apiLinks: ApiLinksService
        ) {
            this.stateSubscription = this.us.USER_STATE.subscribe((data) => {

                if (data['backgroundName'] !== undefined) {
                    this.elRef.nativeElement.setAttribute(
                        'style',
                        'background-image: url(' +
                        this.apiLinks.getPath({
                            method: 'get',
                            action: 'getBackground',
                            credentials: true,
                            requestData: null
                        } as Req) + '/' + data['username'] + '/' + data['backgroundName']  + ')'
                        );
                    }
            });
            this.listen();
    }

    private stateSubscription: Subscription;

    listen() {
        this.upload.backgroundImgAddedEventCallback$.subscribe(
            (data) => {
                this.log.log(data);
                this.changeBg(data);
            }
        );
    }

    changeBg(photoUrl: string) {
        const username = this.us.USER_STATE.subscribe((data) => {
            const url = ' url(' +
            this.apiLinks.getPath({
                method: 'get',
                action: 'getBackground',
                credentials: true,
                requestData: null
            } as Req) + '/' +
            photoUrl[0] +
            '/' +
            photoUrl[1];
            this.renderer2.setStyle(
                this.elRef.nativeElement,
                'background-image',
                url
            );
        });
    }

    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
    }
}
