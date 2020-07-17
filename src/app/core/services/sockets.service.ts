import { Injectable } from '@angular/core';
import io from 'socket.io-client';
// let ws = new WebSocket('ws://localhost:3001');

@Injectable({
    providedIn: 'root',
})
export class SocketsService {
    private socket = io.connect('http://127.0.0.1:3000');
            

    constructor() {

        this.socket.emit('joinRoom', { username: 'kgroza', room: '1' });
        

        console.log(this.socket);

        this.socket.on('roomUsers', ({ room, users }) => {
            console.log('siemanko');
        });

        // Message from server
        this.socket.on('message', (message) => {
            console.log(message);
        });
    }
}
