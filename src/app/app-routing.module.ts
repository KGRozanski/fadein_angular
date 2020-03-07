import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from '../app/components/home/home.component';
import { WelcomeComponent } from '../app/components/welcome/welcome.component';
import { ProfileComponent } from '../app/modules/user/components/profile/profile.component';


import { AuthGuard } from './core/guards/auth.guard';
import { RegGuard } from './core/guards/reg.guard';
// import { UserResolver } from './shared/resolvers/user.resolver';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [RegGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '',
    // component: HomeComponent
    redirectTo: '/profile',
    canActivate: [AuthGuard],
    pathMatch: 'prefix',
    // resolve: { user : AuthGuard },
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
