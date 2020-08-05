import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ModalModule.forRoot()
  ],
  exports: [
    ConfirmationModalComponent
  ]
})
export class ConfirmationModalModule { }
