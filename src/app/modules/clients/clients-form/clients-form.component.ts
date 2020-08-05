import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClientService } from '../shared/service/client.service';
import { Client } from '../shared/interface/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Utils } from './../../../shared/utils/utils';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent implements OnInit {

  public editing: boolean;
  public modalRef: BsModalRef;
  public clientForm: FormGroup;
  public citiesList: any[];

  @ViewChild('confirmationModal', { static: false })
  confirmationModal: ConfirmationModalComponent;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private bsModalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.citiesList = Utils.citiesList();
  }

  ngOnInit(): void {
    this.getParameterRoute();
  }

  private createForm(client?: Client) {
    client = {
      ...client
    };
    if (!client.uf) {
      client.uf = Utils.citiesList()[0].value;
    }
    this.clientForm = this.formBuilder.group({
      id: [client.id],
      nome: [client.nome, Validators.required],
      cpf: [client.cpf, Validators.required],
      cep: [client.cep, Validators.required],
      logradouro: [client.logradouro, Validators.required],
      bairro: [client.bairro, Validators.required],
      localidade: [client.localidade, Validators.required],
      uf: [client.uf, Validators.required],
    });
  }

  private getParameterRoute() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const param = params.get('id');
      if (param === 'novo') {
        this.newClient();
        this.editing = false;
      } else {
        this.editing = true;
        this.getClientById(param);
      }
    });
  }

  private newClient() {
    this.createForm();
  }

  private getClientById(id: string) {
    this.clientService.getClientById(id).subscribe(value => {
      this.createForm(value);
    });
  }

  saveClient() {
    this.clientService.saveClient(this.clientForm.value);
    this.toastr.success('Salvo com sucesso');
    this.router.navigate(['']);
    if (this.editing) {
      this.modalRef.hide();
    }
  }

  openConfirmationModal() {
    if (this.clientForm.valid) {
      if (this.editing) {
        this.modalRef = this.bsModalService.show(this.confirmationModal.templateRef);
      } else {
        this.saveClient();
      }
    } else {
      this.clientForm.markAllAsTouched();
    }
  }

  confirmModalClosedHandler() {
    this.modalRef.hide();
  }

  isInvalidControl(controlName: string) {
    if (this.clientForm.touched) {
      return this.clientForm.controls[controlName].touched && this.clientForm.controls[controlName].invalid;
    }
    return false;
  }
}
