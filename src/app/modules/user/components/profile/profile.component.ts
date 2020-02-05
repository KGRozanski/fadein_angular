import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { UserDataService } from '../../../../core/services/userdata.service';
import { CropComponent } from '../../../../shared/tools/components/crop/crop.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
export class ProfileComponent implements AfterViewInit, OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  professionCtrl = new FormControl();
  filteredprofessions: Observable<string[]>;
  professions: string[] = [];
  allProfessions: string[] = [];

  @ViewChild('professionInput') professionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild(CropComponent) crop;

  private user: User;
  private imgData = {
    image: null
  };
  private isCropperShown = false;

  constructor(private us: UserDataService) {
    this.us.currentUserData.subscribe((data) => {
      this.user = data;
      this.imgData.image = data.avatar;
    });
    this.filteredprofessions = this.professionCtrl.valueChanges.pipe(
      startWith(null),
      map((profession: string | null) => profession ? this._filter(profession) : this.allProfessions.slice()));
  }


  reciveImage($event) {
    this.imgData.image = $event;
    this.imgData = this.crop.data;
  }

  toggleCrop(isCanceled) {
    if (isCanceled == true) {
      this.us.currentUserData.subscribe((data) => {
        this.user = data;
        this.imgData.image = data.avatar;
      });
    }
    this.isCropperShown = !this.isCropperShown;
  }

  add(event: MatChipInputEvent): void {
    // Add profession only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our profession
      if ((value || '').trim()) {
        this.professions.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.professionCtrl.setValue(null);
    }
  }

  remove(profession: string): void {
    const index = this.professions.indexOf(profession);

    if (index >= 0) {
      this.professions.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.professions.push(event.option.viewValue);
    this.professionInput.nativeElement.value = '';
    this.professionCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProfessions.filter(profession => profession.toLowerCase().indexOf(filterValue) === 0);
  }

  ngAfterViewInit() {

  }
  ngOnInit() {
    this.us.getProfessions().subscribe((profs) => {
      let professions = profs['body'];
      if(professions) {
        professions.forEach(element => {
          this.allProfessions.push(element.name);
        });
      }
      
    })
  }

}
