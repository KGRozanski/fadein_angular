import { Injectable } from '@angular/core';
import { Req } from '../interfaces/request.interface';
import { LogService } from './log.service';
import { PathService } from './path.service';
@Injectable({
    providedIn: 'root'
})

export class ApiLinksService {

    private get = {};
    private post = {};
    private put = {};
    private delete = {};
    private websocket = {};

    private methods = [
        'get',
        'post',
        'delete',
        'put',
        'websocket'
    ];

    constructor(private ps: PathService, private log: LogService) {

        this.get = {
            getUserProfile:         { endpoint: '/profile' },
            getProfessions:         { endpoint: '/professions' },
            getBackground:          { endpoint: '/background' },
            search:                 { endpoint: '/search' }
        };

        this.post = {
            authenticate:           { endpoint: '/login' },
            registerNewUser:        { endpoint: '/register' },
            updateProfessions:      { endpoint: '/updateProfessions' },
            addProduction:          { endpoint: '/addProduction' }
        };

        this.put = {
            putUserAvatar:          { endpoint: '/uploadAvatar' },
            putPhoto:               { endpoint: '/putPhoto' },
            putBackgroundPhoto:     { endpoint: '/uploadBackground' },
        };
    }

    getPath(req: Req): string {
        let matchedEndPoint: string;

        try {
            matchedEndPoint = this[req.method][req.action];
        } catch (err) {
            this.log.log('There is no matching endpoint : ' + err);
        }

        if (matchedEndPoint === undefined) {
            console.error('ERROR: NO_MATCHING_ENDPOINT in api_links - returned: ' + matchedEndPoint);
            return 'NO_MATCHING_ENDPOINT';
        } else {
            return this.ps.getApiURL() + matchedEndPoint['endpoint'];
        }
    }

}