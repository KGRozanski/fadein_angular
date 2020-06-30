import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from '../app/components/home/home.component';
import { WelcomeComponent } from '../app/components/welcome/welcome.component';
import { ProfileComponent } from '../app/modules/user/components/profile/profile.component';


import { AuthGuard } from './core/guards/auth.guard';
import { RegGuard } from './core/guards/reg.guard';
import { SearchComponent } from './components/search/search.component';
import { UserComponent } from './components/user/user.component';
import { ProfileResolver } from './core/resolvers/profile.resolver';
// import { UserResolver } from './shared/resolvers/user.resolver';

const routes: Routes = [
  {
    path: 'user/:id',
    component: UserComponent,
    canActivate: [AuthGuard],
    resolve: {profileData: ProfileResolver},
    pathMatch: 'prefix'
  },
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
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
