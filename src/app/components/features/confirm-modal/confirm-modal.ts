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
    else if (tipo === 'confirmarCredencial'){
      const servicio = this.gastosService.servicioEditando()!
      const numCredencial = this.gastosService.credencialSeleccionada()
      if(numCredencial === '1'){
        this.gastosService.editarServicio(idElemento!, {
        nombre: servicio.nombre,
        monto: servicio.monto,
        vencimiento: servicio.vencimiento,
        empresaId: servicio.empresaId,
        etiqueta1: null,
        valor1: null,
        etiqueta2: servicio.etiqueta2,
        valor2: servicio.valor2
      })
      } else {
        this.gastosService.editarServicio(idElemento!, {
        nombre: servicio.nombre,
        monto: servicio.monto,
        vencimiento: servicio.vencimiento,
        empresaId: servicio.empresaId,
        etiqueta1: servicio.etiqueta1,
        valor1: servicio.valor1,
        etiqueta2: null,
        valor2: null
      });
      }
    }
    this.gastosService.cerrarModal();
  }
}
