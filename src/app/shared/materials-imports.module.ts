import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import 'hammerjs';

import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatSidenavModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule
  ]
})

export class MaterialsImportsModule { }

