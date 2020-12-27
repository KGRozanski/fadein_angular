import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsImportsModule } from './shared/modules/materials-imports.module';
import { SharedImportsModule } from './shared/modules/shared-imports.module';
import { SearchModule } from './modules/search/search.module';
import { CommonModule } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { AuthGuard } from './core/guards/auth.guard';
import { UserModule } from './modules/user/user.module';
import { MenuModule } from './modules/menu/menu.module';
import { UserDataService } from './core/services/userdata.service';
import { RegGuard } from './core/guards/reg.guard';
import { ProfileResolver } from './core/resolvers/profile.resolver';
import { LogService } from './core/services/log.service';
import { UploadPhotoService } from './core/services/upload-photo.service';
import { HelperService } from './core/services/helper.service';
import { HostService } from './core/services/host.service';
import { PathService } from './core/services/path.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        WelcomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, {
            metaReducers
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        BrowserAnimationsModule,
        SharedImportsModule,
        MaterialsImportsModule,
        SearchModule,
        HttpClientModule,
        MenuModule,
        UserModule,
        CommonModule
    ],
    exports: [],
    providers: [
        UserDataService,
        RegGuard,
        AuthGuard,
        ProfileResolver,
        LogService,
        UploadPhotoService,
        HelperService,
        PathService,
        HostService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
