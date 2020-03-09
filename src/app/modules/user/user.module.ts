import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsImportsModule } from '../../shared/forms-imports.module';
import { MaterialsImportsModule } from '../../shared/materials-imports.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CropComponent } from '../../shared/tools/components/crop/crop.component';
import { MenuComponent} from '../user/components/menu/menu.component';
import { RouterModule } from '@angular/router';

import { ImageCropperComponent } from 'ng2-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsImportsModule,
    MaterialsImportsModule,
    RouterModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    ProfileComponent,
    CropComponent,
    ImageCropperComponent
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    MenuComponent
  ]
})
export class UserModule { }
