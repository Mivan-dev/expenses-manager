import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cuota } from '../../models/cuota.model';

@Injectable({
  providedIn: 'root',
})
export class CuotaApi {

  httpClient = inject(HttpClient);
  baseURL: string = 'http://localhost:3000';

  create(data: {
      nombre: string;
      cuotaActual: number;
      cuotaBase: number;
      cuotaTotal: number;
      monto: number;
      fechaCarga: string;
      tarjetaId: string;
    }){
      return this.httpClient.post<Cuota>(this.baseURL+'/cuota', data)
    };

  update(id: string, data: {
      nombre: string;
      cuotaActual: number;
      cuotaBase: number;
      cuotaTotal: number;
      monto: number;
      fechaCarga: string;
      tarjetaId: string;
    }){
      return this.httpClient.patch<Cuota>(this.baseURL+'/cuota/'+id, data)
    };

  delete(id: string){
    return this.httpClient.delete(this.baseURL+'/cuota/'+id)
  };
}
