import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LogService {

    constructor() {
        if (environment.production) {
            console.log(
                '%c-- Aplication mode: ' + '%cPRODUKCJA' + '%c --',
                this.cssForModeLog[0],
                this.cssForModeLog[2],
                this.cssForModeLog[0]
            );
        } else {
            console.log(
                '%c-- Aplication mode: ' + '%cTEST' + '%c --',
                this.cssForModeLog[0],
                this.cssForModeLog[1],
                this.cssForModeLog[0]
            );
        }
    }

    private cssForModeLog = [
        'background: #222; color: orange;  font-size: 20px;',
        'background: #222; color: red;  font-size: 20px; font-weight: 900;',
        'background: #222; color: green;  font-size: 20px; font-weight: 900;',
    ];


    log(data: any, type) {
        if (!environment.production) {
            if (typeof data === 'string') {
                console.log(
                    '%c------- LOG SERVICE -------',
                    'color: #ffc92b; font-weight: bold; font-size: 14px;'
                );
                console.log(
                    '%c' + data,
                    'color: #ffdc6d; font-weight: bold; font-size: 14px;'
                );
                console.log(
                    '%c----- LOG SERVICE END -----',
                    'color: #ffc92b; font-weight: bold; font-size: 14px;'
                );
            } else if (typeof data === 'object') {
                console.log(data);
            }
        }
    }
}
