import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../../../core/services/userdata.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private errorMsg: string = null; //Error msg string to indicate wrong login or pass
    private logForm: FormGroup; //Instance of FormGroup to handle reactive login form
    @Output() visibilityState = new EventEmitter<boolean>();

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
            error: err => this.errorMsg = err['error']['error'],
            complete: () => {
                this.router.navigate(['/']);
                this.us.makeLogin();
                this.visibilityState.emit(false);
            }
        });
    }
}
