import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Servicio } from '../../models/servicio.model';

@Injectable({
  providedIn: 'root',
})
export class ServicioApi {
    httpClient = inject(HttpClient);
  baseURL: string = 'http://localhost:3000';

  getAll(){
    return this.httpClient.get<Servicio[]>(this.baseURL+'/servicio')
  }

  getOne(id: string){
    return this.httpClient.get<Servicio>(this.baseURL+'/servicio/'+id)
  }

  create(data: {nombre: string, empresaId: string, monto: number, vencimiento: string}){
    return this.httpClient.post<Servicio>(this.baseURL+'/servicio', data)
  }

  update(id: string, data: {nombre: string, empresaId: string, monto: number, vencimiento: string}){
    return this.httpClient.patch<Servicio>(this.baseURL+'/servicio/'+id, data)
  }

  delete(id:string){
    return this.httpClient.delete(this.baseURL+'/servicio/'+id)
  }
}
