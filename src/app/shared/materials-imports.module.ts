import { NgModule } from '@angular/core';
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
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule
  ]
})

export class MaterialsImportsModule { }
