import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/home/home.component';
import { WelcomeComponent } from '../app/components/welcome/welcome.component';
import { ProfileComponent } from '../app/modules/user/components/profile/profile.component';


import { AuthGuard } from './core/guards/auth.guard';
import { RegGuard } from './core/guards/reg.guard';
import { SearchComponent } from './modules/search/search/search.component';
import { ProfileResolver } from './core/resolvers/profile.resolver';

const routes: Routes = [
    // {
    //     path: 'user/:id',
    //     component: UserComponent,
    //     canActivate: [AuthGuard],
    //     resolve: {profileData: ProfileResolver},
    //     pathMatch: 'prefix'
    // },
    {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [RegGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        // component: HomeComponent,
        redirectTo: 'profile',
        canActivate: [AuthGuard],
        pathMatch: 'prefix'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false})],
    exports: [RouterModule]
})

export class AppRoutingModule {}
