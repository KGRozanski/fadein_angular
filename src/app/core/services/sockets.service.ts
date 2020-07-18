import {
    Injectable
} from '@angular/core';
import io from 'socket.io-client';
import {
    UserDataService
} from './userdata.service';
import {
    first
} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SocketsService {
    private socket = io.connect('http://127.0.0.1:3001');
    private user = null;
    private socketConnectionFlag = false;


    constructor(
        private us: UserDataService
    ) {

        this.us.USER_STATE.subscribe((user) => {
            if(user.username != undefined && !this.socketConnectionFlag) {
                this.user = user;
                this.socketConnectionFlag = true;
                this.connectSocket();
            }
        });

        

    }

    connectSocket() {
        this.socket.on('connect', () => {
            // either with send()
            // this.socket.send('Hello!');

            // or with emit() and custom event names
            // this.socket.emit('salutations', 'Hello!', {
            //     'mr': 'john'
            // }, Uint8Array.from([1, 2, 3, 4]));
        });

        // handle the event sent with this.socket.send()
        this.socket.on('message', data => {
            console.log(data);
        });
        this.socket.emit('joinRoom', {
            username: this.user.username,
            room: '1'
        });


        this.socket.on('roomUsers', ({
            room,
            users
        }) => {
            console.log(room, users);
        });
    }
}