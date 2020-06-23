import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from '../app/components/home/home.component';
import { WelcomeComponent } from '../app/components/welcome/welcome.component';
import { ProfileComponent } from '../app/modules/user/components/profile/profile.component';


import { AuthGuard } from './core/guards/auth.guard';
import { RegGuard } from './core/guards/reg.guard';
import { SearchComponent } from './components/search/search.component';
// import { UserResolver } from './shared/resolvers/user.resolver';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [RegGuard]
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    component: SearchComponent
  },
  {
    path: '',
    // component: HomeComponent,
    redirectTo: '/search',
    canActivate: [AuthGuard],
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
