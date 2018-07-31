import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';

import { CshAccountComponent } from './csh-account/csh-account.component';
import { CustomReuseStrategy } from '../app.custom-reuse-strategy';

const routes: Routes = [
    {
        path:'account/insert',
        component: CshAccountComponent,
        data:{title:'账户管理-新增', module:'account-insert'}
    },{
        path:'account/update',
        component: CshAccountComponent,
        data:{title:'账户管理-修改', module:'account-update'}
    },{
        path:'account/check',
        component: CshAccountComponent,
        data:{title:'账户管理-复核', module:'account-check'}
    },{
        path:'account/close',
        component: CshAccountComponent,
        data:{title:'账户管理-销户', module:'account-close'}
    },{
        path:'account/inquire',
        component: CshAccountComponent,
        data:{title:'账户管理-查询', module:'account-inquire'}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  exports: [RouterModule]
})
export class CshRoutingModule { }
