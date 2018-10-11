import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { AboutComponent } from '../app/components/about/about.component';
import { MenuComponent } from '../app/components/menu/menu.component';
import { AuthGuard } from './shared/auth.guard';
import { RegGuard } from './shared/reg.guard';
import { UserResolver } from './shared/user.resolver';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
