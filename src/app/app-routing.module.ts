import { NgModule } from '@angular/core';
import { Component } from '@angular/core'; 
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';



const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path:  'login', loadChildren:  './pages/login/login.module#LoginPageModule' },
  { path:  'register', loadChildren:  './pages/register/register.module#RegisterPageModule' },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/helper/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./pages/helper/myprofile/myprofile.module').then( m => m.MyprofilePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/helper/notification/notification.module').then( m => m.NotificationPageModule),
    canActivate: [AuthGuardService]
  },
 
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
