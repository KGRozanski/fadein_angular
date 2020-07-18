import { Directive, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { UrlService } from '../services/url.service';
import { UserDataService } from '../services/userdata.service';
import { UploadPhotoService } from '../services/upload-photo.service';
import { LogService } from '../services/log.service';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[appSetImg]',
})
export class SetImageDirective implements OnDestroy {
  private stateSubscription: Subscription;


    constructor(
        private elRef: ElementRef,
        private log: LogService,
        private upload: UploadPhotoService,
        private renderer2: Renderer2,
        private url: UrlService,
        private us: UserDataService
    ) {
        this.stateSubscription = this.us.USER_STATE.subscribe((data) => {
            let URL = this.url.getUrl('getBackground');
            let path = 'url(http://' + URL['url'];

            if(data['backgroundName'] != undefined) {
                this.elRef.nativeElement.setAttribute(
                    'style',
                    'background-image: ' +
                        path +
                        data['username'] +
                        '/' +
                        data['backgroundName'] +
                        ')'
                );
            }


        });

        this.listen();
    }

    listen() {
        this.upload.backgroundImgAddedEventCallback$.subscribe(
            (data) => {
                this.log.log(data, 'object');
                this.changeBg(data);
            }
        );
    }

    changeBg(photoUrl: string) {
        const username = this.us.USER_STATE.subscribe((data) => {
            const url =
                'url(http://' +
                this.url.getUrl('getBackground')['url'] +
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
