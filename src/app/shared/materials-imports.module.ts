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

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDividerModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDividerModule
  ]
})

export class MaterialsImportsModule { }

