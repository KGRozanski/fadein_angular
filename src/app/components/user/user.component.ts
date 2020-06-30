import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    public profile = null;
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.profile = this.route.snapshot.data['profileData'].body;
    }
    photoUrl(phrase) {
        return (
            'http://' +
            window.location.hostname +
            ':3000/api/public_avatar/' +
            phrase
        );
    }
}
