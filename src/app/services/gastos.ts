import { Injectable, signal } from '@angular/core';
import { Tarjeta } from '../models/tarjeta.model';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  tarjeta = signal<Tarjeta[]>([])
  servicio = signal<Servicio[]>([])
  
  constructor() {
    
    this.loadData();
    //this.saveData();
    
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
    // const index = tarjetas.findIndex(t => t.id === tarjeta.id)
    const newTarjetas = tarjetas.map(t => t.id === tarjeta.id ? tarjeta: t)
    this.tarjeta.set(newTarjetas)
    this.saveData();
  }

  public eliminarTarjeta(tarjeta: Tarjeta){
    const tarjetas = this.tarjeta();
    const newTarjetas = tarjetas.filter(t => t.id === tarjeta.id ? tarjeta: t)
    this.tarjeta.set(newTarjetas)
    this.saveData();
  }
}



