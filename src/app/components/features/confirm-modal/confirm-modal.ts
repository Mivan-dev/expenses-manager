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
    const idElemento = this.gastosService.tarjetaSeleccionada();
    const cuota = this.gastosService.cuota()
    const tipo = this.gastosService.modalAbierto()

    if (idElemento && cuota) {
      this.gastosService.eliminarCuota(idElemento, cuota);
    }
    else if(tipo === 'confirmarTarjeta'){
    this.gastosService.eliminarTarjeta(idElemento!)
    } 
    else if (tipo === 'confirmarServicio'){
    this.gastosService.eliminarServicio(idElemento!)
  }
  this.gastosService.cerrarModal();
  }
}
