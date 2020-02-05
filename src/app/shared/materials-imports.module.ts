import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import 'hammerjs';

import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule
  ]
})

export class MaterialsImportsModule { }

