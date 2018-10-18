import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { AboutComponent } from '../app/components/about/about.component';
import { ProfileComponent } from '../app/components/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RegGuard } from './shared/guards/reg.guard';
import { UserResolver } from './shared/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: { user : UserResolver },
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'about',
    canActivate: [RegGuard],
    component: AboutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
