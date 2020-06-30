import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UrlService {

    table: Array<object>;

    constructor() {
        this.table = [
            {
                "id": 1,
                "name": 'getBackground',
                "type": 'normal',
                "url": environment.host + ':' + environment.API_PORT + '/api/background/',
            }
        ];
    }

    getUrl(url: string) {
        return this.table.find(el => el['name'] === url);
    }
}
