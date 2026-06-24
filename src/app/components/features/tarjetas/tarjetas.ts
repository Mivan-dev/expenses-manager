import { Component, inject } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEsAR from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAR);

@Component({
  selector: 'app-tarjetas',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './tarjetas.html',
  styleUrl: './tarjetas.css',
})
export class Tarjetas {
  gastosService = inject(GastosService);
}
