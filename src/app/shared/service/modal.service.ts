import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable()
export class ModalService {

  public modalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService
  ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template);
  }

  hideModal() {
    this.modalRef.hide();
  }
}
