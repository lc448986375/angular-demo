import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index.routing.module';
import { IndexComponent } from './index/index.component';
import { CommonsModule } from '../commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    IndexRoutingModule
  ],
  declarations: [ IndexComponent ]
})
export class IndexModule { }
