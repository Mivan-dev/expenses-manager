import { Component, inject } from '@angular/core';
import { GastosService } from '../../../services/gastos';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {

  gastosService = inject(GastosService)
  
  eliminarObjeto(){
    const idTarjeta = this.gastosService.tarjetaSeleccionada();
    const cuota = this.gastosService.cuota()

    if (idTarjeta && cuota) {
      this.gastosService.eliminarCuota(idTarjeta, cuota);
    }
    else{
    this.gastosService.eliminarTarjeta(idTarjeta!)
  }
  this.gastosService.cerrarModal();
  }
}
