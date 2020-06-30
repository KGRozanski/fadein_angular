import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsImportsModule } from '../../shared/modules/materials-imports.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CropComponent } from '../../shared/tools/components/crop/crop.component';
import { MenuComponent} from '../../components/menu/menu.component';
import { PhotoViewComponent } from '../../shared/tools/components/photo-view/photo-view.component';
import { RouterModule } from '@angular/router';

import { ImageCropperComponent } from 'ngx-img-cropper';
import { ProfessionsComponent } from './components/professions/professions.component';
import { FilmographyComponent } from './components/filmography/filmography.component';
import { PhotosComponent } from './components/photos/photos.component';
import { SetImageDirective } from 'src/app/core/directives/set-image.directive';


@NgModule({
  imports: [
    CommonModule,
    MaterialsImportsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    ProfileComponent,
    CropComponent,
    ImageCropperComponent,
    PhotoViewComponent,
    ProfessionsComponent,
    FilmographyComponent,
    PhotosComponent,
    SetImageDirective
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    MenuComponent
  ]
})

export class UserModule { }
