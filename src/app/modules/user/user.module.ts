import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsImportsModule } from '../../shared/forms-imports.module';
import { MaterialsImportsModule } from '../../shared/materials-imports.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CropComponent } from './components/tools/crop/crop.component';

import { ImageCropperComponent } from 'ng2-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsImportsModule,
    MaterialsImportsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    CropComponent,
    ImageCropperComponent
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
  ]
})
export class UserModule { }
