import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('pass').value;
        const confirmPassword = AC.get('passconfirm').value;
        if (password !== confirmPassword) {
            AC.get('passconfirm').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}