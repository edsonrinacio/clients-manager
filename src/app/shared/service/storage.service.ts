import { Injectable } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/modules/clients/shared/interface/client.model';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';

export const STORAGE_CLIENTS = 'clients';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private clientsSubject = new BehaviorSubject<Client[]>([]);

  constructor(private httpClient: HttpClient) {
    const clients = this.storageGet(STORAGE_CLIENTS);
    if (!clients) {
      this.httpClient.get<Client[]>(`${environment.basePath}/clientes/`).subscribe(value => {
        this.storageSave(STORAGE_CLIENTS, value);
        this.clientsSubject.next(value);
      });
    } else {
      this.clientsSubject.next(clients);
    }
  }

  storageSave(item, object) {
    localStorage.setItem(item, JSON.stringify(object));
    this.clientsSubject.next(object);
  }

  storageGet(item): any {
    return JSON.parse(localStorage.getItem(item));
  }

  post(object: any) {
    const items: any[] = this.storageGet(STORAGE_CLIENTS);
    items.push(object);
    this.storageSave(STORAGE_CLIENTS, items);
  }

  get(): Observable<any> {
    return this.clientsSubject;
  }

  getById(id: string): any {
    const items: any[] = this.storageGet(STORAGE_CLIENTS);
    const itemFounded = items.find(item => item.id === id);
    return itemFounded ? of(itemFounded) : null;
  }

  put(object: any) {
    const items: any[] = this.storageGet(STORAGE_CLIENTS).map(value => {
      if (value.id === object.id) {
        return object;
      } else {
        return value;
      }
    });
    this.storageSave(STORAGE_CLIENTS, items);
  }

  delete(id: string) {
    const items: any[] = (this.storageGet(STORAGE_CLIENTS) as []).filter((value: any) => value.id !== id);
    this.storageSave(STORAGE_CLIENTS, items);
  }

  generateId(): string {
    return uuid.v4();
  }
}
