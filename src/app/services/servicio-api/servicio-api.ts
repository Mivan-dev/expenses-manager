import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EtiquetaCredencial, Servicio } from '../../models/servicio.model';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ServicioApi {
  httpClient = inject(HttpClient);
  baseURL: string = environment.apiUrl;

  getAll() {
    return this.httpClient.get<Servicio[]>(this.baseURL + '/servicio');
  }

  getOne(id: string) {
    return this.httpClient.get<Servicio>(this.baseURL + '/servicio/' + id);
  }

  create(data: { nombre: string; empresaId: string; monto: number; vencimiento: string }) {
    return this.httpClient.post<Servicio>(this.baseURL + '/servicio', data);
  }

  update(
    id: string,
    data: {
      nombre: string;
      empresaId: string;
      monto: number;
      vencimiento: string;
      etiqueta1?: EtiquetaCredencial | null;
      valor1?: string | null;
      etiqueta2?: EtiquetaCredencial | null;
      valor2?: string | null;
    },
  ) {
    return this.httpClient.patch<Servicio>(this.baseURL + '/servicio/' + id, data);
  }

  delete(id: string) {
    return this.httpClient.delete(this.baseURL + '/servicio/' + id);
  }
}
