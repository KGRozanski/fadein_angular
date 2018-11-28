import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../../../core/services/userdata.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    isShown = true;
    errorMsg: string = null;
    logForm: FormGroup;

    @Output() visibilityState = new EventEmitter<boolean>();

    sendState() {
        this.visibilityState.emit(this.isShown);
    }

    constructor(private fb: FormBuilder, private us: UserDataService, private router: Router) {
        this.logForm = fb.group({
            'login': [null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(32),
                    Validators.pattern('^[a-zA-Z0-9ąęśćłóźżń@.]+$')
                ]
            ],
            'pass': [null,
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(32)
                ]
            ]
        });
    }
    ngOnInit() {}

    login() {
        this.errorMsg = null;
        const validatedData = [{
            login: this.logForm.get('login').value,
            pass: this.logForm.get('pass').value
        }];

        this.us.authenticate(validatedData)
        .subscribe({
            next: event => console.log(event),
            error: err => this.errorMsg = err['error']['error'],
            complete: () => {
                this.us.makeLogin();
                this.router.navigate(['']);
                this.sendState();
            }
        });
    }
}
