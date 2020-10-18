import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsImportsModule } from '../../shared/modules/materials-imports.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CropComponent } from '../../shared/components/crop/crop.component';
import { PhotoViewComponent } from '../../shared/components/photo-view/photo-view.component';
import { RouterModule } from '@angular/router';

import { ImageCropperComponent } from 'ngx-img-cropper';
import { ProfessionsComponent } from './components/professions/professions.component';
import { FilmographyComponent } from './components/filmography/filmography.component';
import { PhotosComponent } from './components/photos/photos.component';
import { SetImageDirective } from 'src/app/core/directives/set-image.directive';
import { ResetFileInputDirective } from 'src/app/core/directives/resetFileInput.directive';


@NgModule({
    imports: [
        CommonModule,
        MaterialsImportsModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    declarations: [
        RegisterComponent,
        ProfileComponent,
        CropComponent,
        ImageCropperComponent,
        PhotoViewComponent,
        ProfessionsComponent,
        FilmographyComponent,
        PhotosComponent,
        SetImageDirective,
        ResetFileInputDirective
    ],
    exports: [
        RegisterComponent,
        ProfileComponent
    ]
})

export class UserModule {}