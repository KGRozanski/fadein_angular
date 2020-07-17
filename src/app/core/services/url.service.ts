import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UrlService {

    private URLList: Array<object>;

    constructor() {
        this.URLList = [
            {
                "id": 1,
                "name": 'getBackground',
                "type": 'normal',
                "url": environment.host + ':' + environment.API_PORT + '/api/background/',
            }
        ];
    }

    getUrl(url: string) {
        return this.URLList.find(el => el['name'] === url);
    }
}
