import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../../models/empresa.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpresaApi {
  httpClient = inject(HttpClient);
  baseURL: string = environment.apiUrl;

  getAll(){
    return this.httpClient.get<Empresa[]>(this.baseURL+'/empresa')
  }

}
