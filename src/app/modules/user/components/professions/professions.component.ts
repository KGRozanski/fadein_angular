import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    Input
} from '@angular/core';
import {
    COMMA,
    ENTER
} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import {
    UserDataService
} from '../../../../core/services/userdata.service';
import {
    Observable,
    Subject
} from 'rxjs';
import {
    map,
    startWith
} from 'rxjs/operators';
import {
    MatChipInputEvent
} from '@angular/material/chips';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import {
    MatSnackBar
} from '@angular/material/snack-bar';

@Component({
    selector: 'app-professions',
    templateUrl: './professions.component.html',
    styleUrls: ['./professions.component.scss']
})
export class ProfessionsComponent implements OnInit, OnDestroy {

    constructor(private us: UserDataService, public snackBar: MatSnackBar) {
        this.filteredprofessions = this.professionCtrl.valueChanges.pipe(
            startWith(null),
            map((profession: string | null) => profession ? this._filter(profession) : this.allProfessions.slice())
        );
    }

    @ViewChild('professionInput') professionInput: ElementRef < HTMLInputElement > ;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    @Input() professions: string[] = [];

    // Cropper flag
    // Mat chip variables
    private visible = true;
    public selectable = true;
    public removable = true;
    public addOnBlur = true;
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public professionCtrl = new FormControl();
    public filteredprofessions: Observable < string[] > ;

    private allProfessions: string[] = [];
    private allProfestionsForRemoving: string[] = [];
    public selectedProfessions = new Subject < any > ();
    public selectedProfessions$ = this.selectedProfessions.asObservable();

    ngOnDestroy() {
        this.selectedProfessions.unsubscribe();
    }

    ngOnInit() {
        // Profession stuff
        this.us.getProfessions().subscribe((profs) => {
            const professions = profs['body'];
            if (professions) {
                // Fill professions array with fetched data
                professions.forEach(element => {
                    this.allProfessions.push(element.name);
                    this.allProfestionsForRemoving.push(element.name);
                });
                // Remove professions that was previously used
                this.professions.forEach((el) => {
                    const indexOfProf = this.allProfessions.indexOf(el);
                    this.allProfessions.splice(indexOfProf, 1);
                });
            }
        });

        this.selectedProfessions$.subscribe(data => {
            this.us.updateProfessions(data).subscribe((res) => {
                if (res['body'] !== undefined) {
                    this.snackBar.open(res.body['msg'], 'Close', {
                        duration: 3000
                    });
                }
            });
        });
    }



    // Mat chips for professions
    addProfession(event: MatChipInputEvent): void {
        // Add profession only when MatAutocomplete is not open
        // To make sure this does not conflict with OptionSelected Event
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;
            const findProf = this.allProfessions.find(cur => cur === event.value);

            if (findProf !== undefined) {
                // Remove profession from list
                const indexOfProf = this.allProfessions.indexOf(event.value);
                this.allProfessions.splice(indexOfProf, 1);

                // Add our profession
                if ((value || '').trim()) {
                    this.professions.push(value.trim());
                    this.selectedProfessions.next(this.professions);
                }

                // Reset the input value
                if (input) {
                    input.value = '';
                }
                this.professionCtrl.setValue(null);
            }
        }
    }
    removeProfession(profession: string): void {
        const index = this.professions.indexOf(profession);
        if (index >= 0) {
            this.professions.splice(index, 1);
            const indexOfProf = this.allProfestionsForRemoving.indexOf(profession);
            this.allProfessions.splice(indexOfProf, 0, profession);
            this.selectedProfessions.next(this.professions);
            this.filteredprofessions = this.professionCtrl.valueChanges.pipe(
                startWith(null),
                map((profession: string | null) => profession ? this._filter(profession) : this.allProfessions.slice()));
        }
    }
    addSelectedProfession(event: MatAutocompleteSelectedEvent): void {
        this.professions.push(event.option.viewValue);
        this.professionInput.nativeElement.value = '';
        this.professionCtrl.setValue(null);
        const indexOfProf = this.allProfessions.indexOf(event.option.viewValue);
        this.allProfessions.splice(indexOfProf, 1);
        this.selectedProfessions.next(this.professions);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allProfessions.filter(profession => profession.toLowerCase().indexOf(filterValue) === 0);
    }
}
