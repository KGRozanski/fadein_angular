import { NgModule } from '@angular/core';
import 'hammerjs';

import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule
  ]
})

export class MaterialsImportsModule { }
