import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-photo-view',
    templateUrl: './photo-view.component.html',
    styleUrls: ['./photo-view.component.scss'],
})
export class PhotoViewComponent {
    constructor() {}

    @Input() photoPath: string;
}
