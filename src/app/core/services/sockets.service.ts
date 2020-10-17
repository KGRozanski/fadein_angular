import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import {
    UserDataService
} from './userdata.service';
import {
    environment
} from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SocketsService {

    constructor(private us: UserDataService) {
        // this.us.USER_STATE.subscribe((user) => {
        //     if (user.username !== undefined && !this.socketConnectionFlag) {
        //         this.user = user;
        //         this.joinRoom = {
        //             username: this.user.username,
        //             room: 1
        //         };
        //         this.socketConnectionFlag = true;
        //         this.SOCKETurl += this.user.username;
        //         this.joinRoom.room = 1;

        //         console.log(this.SOCKETurl);
        //         this.socket = io.connect(this.SOCKETurl);
        //         this.connectSocket();
        //     }
        // });

        // setTimeout(() => {
        //     this.socket.emit('chatMessage', {
        //         addressee: this.user.username,
        //         recipient: 'wox',
        //         msg: 'dzień dobry :)'
        //     });
        // }, 3000);
    }
}