import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserDataService } from 'src/app/core/services/userdata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private searchForm: FormGroup;
  public searchResponse: Array<any>;
  public color = 'primary';
  public mode = 'indeterminate';
  public spinner = false;
  public phrase = '';

  constructor(private fb: FormBuilder, private us: UserDataService, private router: Router) {
    this.searchForm = fb.group({
      'phrase': [null,
        [
          Validators.required,
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
        this.phrase = phrase;
        if(phrase !== '') {
          this.us.search('user', phrase).subscribe((res) => {
            this.searchResponse = res.body;
          });
        }
        this.spinner = false;
      })
  }

  onChange($event) {this.searchResponse = [];
    this.spinner = true;
  }

  photoUrl(phrase) {
    return 'http://' + window.location.hostname + ':3000/api/public_avatar/' + phrase;
  }

  navigate(name) {
    const link = 'user/' + name;
    this.router.navigate([link]);
  }


  ngOnInit() {}

}