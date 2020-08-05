import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../shared/service/client.service';
import { Client } from '../shared/interface/client.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  public modalRef: BsModalRef;
  public listClients: Client[];
  public clientRemove: Client;

  @ViewChild('confirmationModal', {static: false})
  confirmationModal: ConfirmationModalComponent;

  constructor(
    private clientService: ClientService,
    private bsModalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  private getClients() {
    this.clientService.getAllClients().subscribe(value => {
      this.listClients = value;
    });
  }

  openConfirmationModal() {
    this.modalRef = this.bsModalService.show(this.confirmationModal.templateRef);
  }

  removeHandler(client: Client) {
    this.clientRemove = client;
    this.openConfirmationModal();
  }

  confirmModalHandler(event) {
    this.clientService.deleteClient(this.clientRemove.id);
    this.toastr.success('Removido com sucesso');
    this.modalRef.hide();
    this.getClients();
  }

  confirmModalClosedHandler() {
    this.modalRef.hide();
  }
}
