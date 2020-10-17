import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../../../core/validators/validators';
import { UserDataService } from '../../../../core/services/userdata.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent  {

  regForm: FormGroup;
  successMsg: string = null;
  errorMsg: string = null;

  constructor(private fb: FormBuilder, private us: UserDataService) {

    this.regForm = this.fb.group({
      'mail': [null,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(32)
        ]
      ],
      'username': [null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16),
          Validators.pattern('^[a-zA-Z0-9ąęśćłóźżń]+$')
        ]
      ],
      'pass': [null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$')
        ]
      ],
      'passconfirm': [null,
        [
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$')]
        ],
      'checkbox': [null, Validators.required]
    },
    {
      validator: PasswordValidation.MatchPassword
    }
    );

  }

  register() {
    const validatedData = [{
      checkbox: this.regForm.get('checkbox').value,
      mail: this.regForm.get('mail').value,
      pass: this.regForm.get('pass').value,
      passconfirm: this.regForm.get('passconfirm').value,
      username: this.regForm.get('username').value
    }];

    this.us.registerNewUser(validatedData).toPromise().then((res) => {
      this.successMsg = res['body']['msg'];

    }).catch((err) => {
      this.errorMsg = err['error']['error'];
    });
  }

}
