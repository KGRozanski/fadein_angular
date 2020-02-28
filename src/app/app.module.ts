import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsImportsModule } from './shared/materials-imports.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { AuthGuard } from './core/guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { UserModule } from './modules/user/user.module';
import { UserDataService } from './core/services/userdata.service';
import { RegGuard } from './core/guards/reg.guard';
// import { UserResolver } from './shared/resolvers/user.resolver';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    WelcomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsImportsModule,
    HttpClientModule,
    UserModule
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
