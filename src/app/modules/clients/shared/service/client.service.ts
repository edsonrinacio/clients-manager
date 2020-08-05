import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interface/client.model';
import { StorageService } from 'src/app/shared/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private storageService: StorageService
  ) {}

  getClientById(id: string): Observable<Client> {
    return this.storageService.getById(id);
  }

  getAllClients(): Observable<Client[]> {
    return this.storageService.get();
  }

  saveClient(client: Client) {
    if (client.id) {
      this.storageService.put(client);
    } else {
      client = {
        ...client,
        id: this.storageService.generateId()
      };
      this.storageService.post(client);
    }
  }

  deleteClient(id: string) {
    this.storageService.delete(id);
  }
}
