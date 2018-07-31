import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CshRoutingModule } from './csh-routing.module';
import { CshAccountComponent } from './csh-account/csh-account.component';

@NgModule({
  imports: [
    CommonModule,
    CshRoutingModule
  ],
  declarations: [CshAccountComponent]
})
export class CshModule { }
