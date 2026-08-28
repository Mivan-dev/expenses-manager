import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../../models/empresa.model';

@Injectable({
  providedIn: 'root',
})
export class EmpresaApi {
  httpClient = inject(HttpClient);
  baseURL: string = 'http://localhost:3000';

  getAll(){
    return this.httpClient.get<Empresa[]>(this.baseURL+'/empresa')
  }

}
