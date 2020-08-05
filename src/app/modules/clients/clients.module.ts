import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationModalModule } from './../../shared/confirmation-modal/confirmation-modal.module';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { ModalService } from 'src/app/shared/service/modal.service';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientsListComponent,
    ClientsFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientsRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ConfirmationModalModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot()
  ],
  exports: [
    BsDropdownModule,
    TooltipModule,
    ModalModule
  ],
  providers: [
    ModalService
  ]
})
export class ClientsModule { }
