import { Injectable } from '@angular/core'; 

let ws = new WebSocket('ws://localhost:3001');


@Injectable({
    providedIn: 'root',
})
export class SocketsService {
    constructor() {

      ws.onopen = function() {
        console.log('open')
    }
    
       ws.onmessage = function(ev) {
        let _data = JSON.parse(ev.data);
    
        console.log(_data);
    }
    }
}
