import { Component, ViewChild, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { User } from '../../../../core/interfaces/user.interface';
import { UserDataService } from '../../../../core/services/userdata.service';
import { CropComponent } from '../../../../shared/tools/components/crop/crop.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { COMMA,ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { map,startWith } from 'rxjs/operators';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	animations: [
		trigger('toggle', [
			state('true', style({
				'height': '420px'
			})),
			state('false', style({
				'height': '0'
			})),
			transition('*=>true', animate('200ms')),
			transition('*=>false', animate('300ms'))
		])
	]
})
export class ProfileComponent implements OnInit, OnDestroy {
	//User data object and image object
	private user: User;
	private imgData = {image: null};
	private productions = []
	//Mat chip variables
	private visible = true;
	private selectable = true;
	private removable = true;
	private addOnBlur = true;
	private separatorKeysCodes: number[] = [ENTER, COMMA];
	private professionCtrl = new FormControl();
	private filteredprofessions: Observable < string[] > ;
	private professions: string[] = [];
	private allProfessions: string[] = [];
	private allProfestionsForRemoving: string[] = [];
	public selectedProfessions = new Subject<any>();
	public selectedProfessions$ = this.selectedProfessions.asObservable();

	//Production form variables
	private productionForm: FormGroup;
	//Cropper flag
	private isCropperShown = false;
	//Film wrapper flag
	private filmAdderFlag = false;

	@ViewChild('professionInput') professionInput: ElementRef < HTMLInputElement > ;
	@ViewChild('auto') matAutocomplete: MatAutocomplete;
	@ViewChild(CropComponent) crop;
	@ViewChild('filmAdder') filmAdder: ElementRef;

	ngOnInit() {
		//Profession stuff
		this.us.getProfessions().subscribe((profs) => {
			let professions = profs['body'];
			if (professions) {
				//Fill professions array with fetched data
				professions.forEach(element => {
					this.allProfessions.push(element.name);
					this.allProfestionsForRemoving.push(element.name);
				});
				//Remove professions that was previously used
				this.professions.forEach((el) => {
					let indexOfProf = this.allProfessions.indexOf(el);
					this.allProfessions.splice(indexOfProf, 1);
				});
			}
		});
		this.selectedProfessions$.subscribe(data => {
			this.us.updateProfessions(data).subscribe();
		});

	}
	
	ngOnDestroy() {
		this.selectedProfessions.unsubscribe();
	}

	constructor(private us: UserDataService, private fb: FormBuilder, private renderer: Renderer2,) {
		this.us.USER_STATE.subscribe((data) => {
			this.user = data;
			this.imgData.image = data.avatar;
			this.professions = this.user['professions'];
			if(this.professions != undefined) {
				this.clearUsedProfs()
			}
		});
		this.filteredprofessions = this.professionCtrl.valueChanges.pipe(
			startWith(null),
			map((profession: string | null) => profession ? this._filter(profession) : this.allProfessions.slice()));
				//Production form
	 	this.productionForm = fb.group({
			'title': [null,
				[
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(64),
					Validators.pattern('^[a-zA-Z0-9ąęśćłóźżń @.]+$')
				]            

			],
			'date': [null,
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(4),
					Validators.pattern('^[0-9]+$')
				]
			],
			'description': [null,
				[
					Validators.minLength(0),
					Validators.maxLength(1024),
					Validators.pattern('^[a-zA-Z0-9ąęśćłóźżń ,@.]+$')
				]
			]
		})
	}
	reciveImage($event) {
		this.imgData.image = $event;
		this.imgData = this.crop.data;
	}
	toggleCrop(isCanceled) {
		if (isCanceled == true) {
			this.us.USER_STATE.subscribe((data) => {
				this.imgData.image = data.avatar;
			});
		}
		this.isCropperShown = !this.isCropperShown;
	}
	//Mat chips for professions
	clearUsedProfs() {
		this.professions.forEach((el) => {
			let indexOfProf = this.allProfestionsForRemoving.indexOf("aktor");
			this.allProfessions.splice(indexOfProf, 1);
		});
	}
	addProfession(event: MatChipInputEvent): void {
		// Add profession only when MatAutocomplete is not open
		// To make sure this does not conflict with OptionSelected Event
		if (!this.matAutocomplete.isOpen) {
			const input = event.input;
			const value = event.value;
			let findProf = this.allProfessions.find(cur => cur == event.value);
			if(findProf != undefined) {
				//Remove profession from list
				let indexOfProf = this.allProfessions.indexOf(event.value);
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
			let indexOfProf = this.allProfestionsForRemoving.indexOf(profession);
			this.allProfessions.splice(indexOfProf, 0, profession);
			this.selectedProfessions.next(this.professions);
			this.filteredprofessions = this.professionCtrl.valueChanges.pipe(
				startWith(null),
				map((profession: string | null) => profession ? this._filter(profession) : this.allProfessions.slice()));
		}
	}
	addSelectedProfession(event: MatAutocompleteSelectedEvent): void {
		console.log(this.professions)
		this.professions.push(event.option.viewValue);
		this.professionInput.nativeElement.value = '';
		this.professionCtrl.setValue(null);
		let indexOfProf = this.allProfessions.indexOf(event.option.viewValue);
		this.allProfessions.splice(indexOfProf, 1);
		this.selectedProfessions.next(this.professions);
	}
	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allProfessions.filter(profession => profession.toLowerCase().indexOf(filterValue) === 0);
	}
	//Adding production to filmography
	private _productionsReq(newProduction): Promise<any> {
		return this.us.addProduction(newProduction);
	}
	addProduction() {
		if(this.productionForm.controls['title'].errors == null 
		&& this.productionForm.controls['date'].errors == null 
		&& this.productionForm.controls['description'].errors == null
		) {
			const newProduction = {
				title: this.productionForm.get('title').value,
				date: this.productionForm.get('date').value,
				description: this.productionForm.get('description').value
			};
			this._productionsReq(newProduction).then((data) => {
				console.log(data)
			})
			this.user.filmography.push(newProduction);
		}
	}
	filmAdderVisibilityState() {
		let filmWrapper = this.filmAdder.nativeElement;
		if(!this.filmAdderFlag) {
			this.renderer.setStyle(filmWrapper, 'height', '250px');
			this.filmAdderFlag = true;
		} else {
			this.renderer.setStyle(filmWrapper, 'height', '0');
			this.filmAdderFlag = false;
		}
	}
}