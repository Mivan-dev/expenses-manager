import { Component, inject } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-proximos-vtos',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './proximos-vtos.html',
  styleUrl: './proximos-vtos.css',
})
export class ProximosVtos {
  gastosService = inject(GastosService)

  diasFaltantes(fecha: Date): number {
    const hoy = new Date();
    return Math.round((fecha.getTime() - hoy.getTime()) / 86400000);
  }
}
