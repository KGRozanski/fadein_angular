import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UrlService {

    constructor() {
        this.URLList = [
            {
                'id': 1,
                'name': 'getBackground',
                'type': 'normal',
                'url': environment.host + ':' + environment.API_PORT + '/api/background/'
            }
        ];
    }

    private URLList: Array<object>;

    getUrl(url: string) {
        return this.URLList.find(el => el['name'] === url);
    }
}
