import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserDataService } from 'src/app/core/services/userdata.service';

@Component({
  selector: 'app-filmography',
  templateUrl: './filmography.component.html',
  styleUrls: ['./filmography.component.scss']
})
export class FilmographyComponent implements OnInit {

  private productionForm: FormGroup;

  @ViewChild('filmAdder') filmAdder: ElementRef;
  @Input('filmography') productions = [];
  
  constructor(private fb: FormBuilder, private us: UserDataService, private renderer: Renderer2) {
    //Productions

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

  ngOnInit() {
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
			this.productions.push(newProduction);
		}
	}

}
