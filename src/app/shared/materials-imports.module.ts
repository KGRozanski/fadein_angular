import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';

let modules = [
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatChipsModule,
  MatIconModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatCardModule
]


@NgModule({
  imports: [
    modules
  ],
  exports: [
    modules
  ]
})

export class MaterialsImportsModule { }

