import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpmRoutingModule } from './cpm-routing.module';
import { CpmCpComponent } from './cpm-cp/cpm-cp.component';
import { CommonsModule } from '../commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    CpmRoutingModule
  ],
  declarations: [CpmCpComponent]
})
export class CpmModule { }
