import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy, UrlSegment, UrlSegmentGroup, Route } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CustomReuseStrategy } from '../app.custom-reuse-strategy';

const routes: Routes = [
  {
    path:'index',
    component:IndexComponent,
    data:{title:'首页', module:'index', mode:''}
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
