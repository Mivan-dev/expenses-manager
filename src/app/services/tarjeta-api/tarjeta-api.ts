import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tarjeta } from '../../models/tarjeta.model';

@Injectable({
  providedIn: 'root',
})
export class TarjetaApi {
  httpClient = inject(HttpClient);
  baseURL: string = 'http://localhost:3000';

  getAll(){
    return this.httpClient.get<Tarjeta[]>(this.baseURL+'/tarjeta')
  }

  getOne(id: string){
    return this.httpClient.get<Tarjeta>(this.baseURL+'/tarjeta/'+id)
  }

  create(data: {nombre: string, monto: number, vencimiento: string, empresaId: string}){
    return this.httpClient.post<Tarjeta>(this.baseURL+'/tarjeta', data)
  }

  update(id: string, data: {nombre: string, monto: number, vencimiento: string, empresaId: string}){
    return this.httpClient.patch<Tarjeta>(this.baseURL+'/tarjeta/'+id, data)
  }

  delete(id:string){
    return this.httpClient.delete(this.baseURL+'/tarjeta/'+id)
  }

}
