import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsImportsModule } from 'src/app/shared/modules/materials-imports.module';
import { SharedImportsModule } from '../../shared/modules/shared-imports.module';

import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    MenuComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialsImportsModule,
    SharedImportsModule
  ],
  exports: [
    MenuComponent,
    LoginComponent
  ]
})
export class MenuModule { }
