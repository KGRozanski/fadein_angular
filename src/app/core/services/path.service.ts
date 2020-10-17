import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../configs/api_config';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PathService {

    constructor() {}

    getApiURL(type?: string): string {
        switch (type) {
            default:
                switch (environment.production) {
                    case true:
                        return API_CONFIG.protocol + '://' + API_CONFIG.production_host + ':' + API_CONFIG.production_port + '/api';
                    default:
                        return API_CONFIG.protocol + '://' + API_CONFIG.test_host + ':' + API_CONFIG.test_port + '/api';
                }
        }
    }

}