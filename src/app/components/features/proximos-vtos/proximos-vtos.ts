import { Component, inject } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { hoyAMedianoche } from '../../../utils/fechas';

@Component({
  selector: 'app-proximos-vtos',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './proximos-vtos.html',
  styleUrl: './proximos-vtos.css',
})
export class ProximosVtos {
  gastosService = inject(GastosService);

  diasFaltantes(fecha: Date): number {
    return Math.round((fecha.getTime() - hoyAMedianoche().getTime()) / 86400000);
  }
}
