import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsImportsModule } from './shared/modules/materials-imports.module';
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
import { SearchComponent } from './components/search/search.component';
import { FilterPipe } from './core/pipes/filter.pipe';
import { UserComponent } from './components/user/user.component';
import { ProfileResolver } from './core/resolvers/profile.resolver';
import { LogService } from './core/services/log.service';
import { UploadPhotoService } from './core/services/upload-photo.service';
import { UrlService } from './core/services/url.service';
import { HelperService } from './core/services/helper.service';
import { PathService } from './core/services/path.service';
import { ApiLinksService } from './core/services/api-links.service';

// import { UserResolver } from './shared/resolvers/user.resolver';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        WelcomeComponent,
        HeaderComponent,
        SearchComponent,
        FilterPipe,
        UserComponent
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
    exports: [ReactiveFormsModule],
    providers: [
        UserDataService,
        RegGuard,
        AuthGuard,
        ProfileResolver,
        LogService,
        UploadPhotoService,
        UrlService,
        HelperService,
        ApiLinksService,
        PathService
        // UserResolver
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
