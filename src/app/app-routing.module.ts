import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './commons/app-services/auth-guard.service';
import { LoginComponent } from './login/login/login.component';
import { LayoutComponent } from './commons/layout/layout.component';

const adminRoutes: Routes = [
  {
    path:'',
    redirectTo: 'index',
    pathMatch: 'full'
  },{
    path:'index',
    canLoad: [AuthGuard],
    loadChildren : './index/index.module#IndexModule'
  },{ 
    path: 'cpm',
    canLoad: [AuthGuard],
    loadChildren : './cpm/cpm.module#CpmModule'
  },{
    path: 'csh',
    canLoad: [AuthGuard],
    loadChildren : './csh/csh.module#CshModule'
  }
];

const routes:Routes = [
  {
    path:'',
    redirectTo: '/main/index',
    pathMatch:'full'
  },
  {path: 'login', loadChildren : './login/login.module#LoginModule'},
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: adminRoutes
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash:false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}