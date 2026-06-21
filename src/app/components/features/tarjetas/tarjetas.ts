import { Component, inject } from '@angular/core';
import { GastosService } from '../../../services/gastos';

@Component({
  selector: 'app-tarjetas',
  imports: [],
  templateUrl: './tarjetas.html',
  styleUrl: './tarjetas.css',
})
export class Tarjetas {

  gastosService = inject(GastosService)

}
