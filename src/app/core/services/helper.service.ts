import { EventEmitter } from '@angular/core';

export class HelperService {
    constructor() {}

    clearFileInputEvent = new EventEmitter<boolean>();
}