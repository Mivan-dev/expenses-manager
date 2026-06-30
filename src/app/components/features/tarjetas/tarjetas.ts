import { Component, inject } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEsAR from '@angular/common/locales/es-AR';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash, heroPencil, heroPlus } from '@ng-icons/heroicons/outline';

registerLocaleData(localeEsAR);

@Component({
  selector: 'app-tarjetas',
  imports: [CurrencyPipe, DatePipe, NgIconComponent],
  providers: [provideIcons({ heroTrash, heroPencil, heroPlus })],
  templateUrl: './tarjetas.html',
  styleUrl: './tarjetas.css',
})
export class Tarjetas {
  gastosService = inject(GastosService);
}
