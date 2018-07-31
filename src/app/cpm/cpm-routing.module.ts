import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { CpmCpComponent } from './cpm-cp/cpm-cp.component';
import { CustomReuseStrategy } from '../app.custom-reuse-strategy';

const routes: Routes = [
  {
    path:'cpmcp/insert',
    component:CpmCpComponent,
    data:{title:'cpm.cpmcp-insert', module:'cpmcp-insert', mode:'insert'}
  },{
    path:'cpmcp/update',
    component:CpmCpComponent,
    data:{title:'cpm.cpmcp-update', module:'cpmcp-update', mode:'update'}
  },{
    path:'cpmcp/check',
    component:CpmCpComponent,
    data:{title:'cpm.cpmcp-check', module:'cpmcp-check', mode:'check'}
  },{
    path:'cpmcp/inquire',
    component:CpmCpComponent,
    data:{title:'cpm.cpmcp-inquire', module:'cpmcp-inquire', mode:'inquire'}
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  exports: [RouterModule]
})
export class CpmRoutingModule { }
