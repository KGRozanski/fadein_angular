import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { MaterialsImportsModule } from '../modules/materials-imports.module';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { AboutComponent } from './components/about/about.component';

// import { UserResolver } from './shared/resolvers/user.resolver';
import { ProfileComponent } from './components/profile/profile.component';
import { CropComponent } from './components/tools/crop/crop.component';
import { ImageCropperComponent } from 'ng2-img-cropper';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AboutComponent,
    ProfileComponent,
    CropComponent,
    ImageCropperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsImportsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    // UserResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
