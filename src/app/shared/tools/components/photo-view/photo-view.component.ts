import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-photo-view',
    templateUrl: './photo-view.component.html',
    styleUrls: ['./photo-view.component.scss'],
})
export class PhotoViewComponent implements OnInit {
    @Input('photoPath') photoPath: string;

    constructor() {}

    ngOnInit() {}
}
