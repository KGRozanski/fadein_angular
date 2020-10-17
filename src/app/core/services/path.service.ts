import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PathService {

    private protocol    = 'http';
    private test_api    = '127.0.0.1';

    constructor() {}

}