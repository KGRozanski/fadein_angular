import {
  Component,
  OnInit,
  OnChanges
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserDataService } from 'src/app/core/services/userdata.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {
  private searchForm: FormGroup;
  public searchResponse: Array<any>;

  constructor(private fb: FormBuilder, private us: UserDataService) {
    this.searchForm = fb.group({
      'phrase': [null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
          Validators.pattern('^[a-zA-Z0-9ąęśćłóźżń@.]+$')
        ]
      ]
    });

    this.searchForm
      .get('phrase').valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe((phrase) => {
        this.us.search('user', phrase).subscribe((res) => {
          this.searchResponse = res.body;
        })
      })
  }


  photoUrl(phrase) {
    return 'http://' + window.location.hostname + ':3000/api/public_avatar/' + phrase;
  }

  ngOnChanges() {
    console.log(this.searchForm.get('phrase').value);
  }

  ngOnInit() {}

}