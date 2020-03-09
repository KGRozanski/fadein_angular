import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsImportsModule } from './shared/materials-imports.module';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { AuthGuard } from './core/guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { UserModule } from './modules/user/user.module';
import { UserDataService } from './core/services/userdata.service';
import { RegGuard } from './core/guards/reg.guard';
import { ReactiveFormsModule } from '@angular/forms';

// import { UserResolver } from './shared/resolvers/user.resolver';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    HeaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsImportsModule,
    HttpClientModule,
    UserModule,
    CommonModule
  ],
  exports: [
    ReactiveFormsModule
  ],
  providers: [
    UserDataService,
    RegGuard,
    AuthGuard,
    // UserResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
