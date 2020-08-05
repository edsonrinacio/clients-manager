import { Component, OnInit, TemplateRef, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  public modalRef: BsModalRef;

  @Input() confirmLabel = 'Confirmar';
  @Input() cancelLabel = 'Cancelar';

  @Output() confirm: EventEmitter<any> = new EventEmitter();
  @Output() closed: EventEmitter<any> = new EventEmitter();

  @ViewChild('template', { static: false })
  templateRef: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {
  }

  confirmHandler(): void {
    this.confirm.emit({
      type: 'confirmation',
      value: true
    });
  }

  hideModal() {
    this.closed.emit();
  }
}
