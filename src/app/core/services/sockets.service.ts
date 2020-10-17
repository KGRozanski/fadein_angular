import {
    Injectable
} from '@angular/core';
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

    public SOCKETurl = `http://${environment.host}:${environment.SOCKET_PORT}/`;
    private socket = null;
    private user = null;
    private socketConnectionFlag = false;

    private joinRoom;


    constructor(
        private us: UserDataService
    ) {
        this.us.USER_STATE.subscribe((user) => {
            if (user.username != undefined && !this.socketConnectionFlag) {
                this.user = user;
                this.joinRoom = {
                    username: this.user.username,
                    room: 1
                };
                this.socketConnectionFlag = true;
                this.SOCKETurl += this.user.username;
                this.joinRoom.room = 1

                console.log(this.SOCKETurl)
                this.socket = io.connect(this.SOCKETurl);
                this.connectSocket();



            }
        });

        setTimeout(() => {
            this.socket.emit('chatMessage', {
                addressee: this.user.username,
                recipient: 'wox',
                msg: 'dzień dobry :)'
            });
        }, 3000);




    }

    connectSocket() {
        this.socket.on('connect', data => {
            console.log(this.socket)
            // either with send()
            // this.socket.send('Hello!');

            // or with emit() and custom event names
            // this.socket.emit('salutations', 'Hello!', {
            //     'mr': 'john'
            // }, Uint8Array.from([1, 2, 3, 4]));
        });

        // handle the event sent with this.socket.send()
        this.socket.on('chatMessage', data => {
            console.log(data);
        });
        // this.socket.emit('joinRoom', this.joinRoom);


        // this.socket.on('roomUsers', ({
        //     room,
        //     users
        // }) => {
        //     console.log(room, users);
        // });
    }
}