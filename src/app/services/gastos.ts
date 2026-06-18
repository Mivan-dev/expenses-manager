import { Injectable, signal } from '@angular/core';
import { Tarjeta } from '../models/tarjeta.model';
import { Servicio } from '../models/servicio.model';
import { Cuota } from '../models/cuota.model';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  tarjeta = signal<Tarjeta[]>([])
  servicio = signal<Servicio[]>([])
  
  constructor() {
    
    this.loadData();
    
  }

  private loadData() {
    const tarjetasData = localStorage.getItem('tarjetas');
    const serviciosData = localStorage.getItem('servicios');
    if (tarjetasData) {
      this.tarjeta.set(JSON.parse(tarjetasData));
    }
    if (serviciosData) {
      this.servicio.set(JSON.parse(serviciosData));
    }
  }

  private saveData() {
    localStorage.setItem('tarjetas', JSON.stringify(this.tarjeta()));
    localStorage.setItem('servicios', JSON.stringify(this.servicio()));
  }

  public agregarTarjeta(tarjeta: Tarjeta) {
    const tarjetas = this.tarjeta();
    this.tarjeta.set([...tarjetas, tarjeta]);
    this.saveData();
  }

  public editarTarjeta(tarjeta: Tarjeta) {
    const tarjetas = this.tarjeta();
    const newTarjetas = tarjetas.map(t => t.id === tarjeta.id ? tarjeta: t)
    this.tarjeta.set(newTarjetas)
    this.saveData();
  }

  public eliminarTarjeta(id: string){
    const tarjetas = this.tarjeta();
    const newTarjetas = tarjetas.filter(t => t.id !== id)
    this.tarjeta.set(newTarjetas)
    this.saveData();
  }

  public agregarServicio(servicio: Servicio) {
    const servicios = this.servicio();
    this.servicio.set([...servicios, servicio]);
    this.saveData();
  }

  public editarServicio(servicio: Servicio) {
    const servicios = this.servicio();
    const newServicios = servicios.map(s => s.id === servicio.id ? servicio: s)
    this.servicio.set(newServicios)
    this.saveData();
  }

  public eliminarServicio(id: string){
    const servicios = this.servicio();
    const newServicios = servicios.filter(s => s.id !== id)
    this.servicio.set(newServicios)
    this.saveData();
  }

}



