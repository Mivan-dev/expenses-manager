import { Component, inject } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EtiquetaCredencial, EtiquetaLabels } from '../../../models/servicio.model';

@Component({
  selector: 'app-credencial-form',
  imports: [ReactiveFormsModule],
  templateUrl: './credencial-form.html',
  styleUrl: './credencial-form.css',
})
export class CredencialForm {

  constructor(){
  const credenciales = this.gastosService.servicioEditando();
  if (credenciales?.etiqueta1 || credenciales?.etiqueta2){
    this.form.patchValue({
      etiqueta1: credenciales.etiqueta1,
      valor1: credenciales.valor1,
      etiqueta2: credenciales.etiqueta2,
      valor2: credenciales.valor2
    })
  }
}

  etiquetas = Object.values(EtiquetaCredencial)
  etiquetaLabels = EtiquetaLabels
  gastosService = inject(GastosService)
  fb = inject(FormBuilder)

  form = this.fb.group({
    etiqueta1: '',
    valor1: '',
    etiqueta2: '',
    valor2: ''
  })

  onSubmit(){
    const credencialesEditando = this.gastosService.servicioEditando();
    const credencial1Valida = !!this.form.value.etiqueta1 && !!this.form.value.valor1;
    const credencial2Valida = !!this.form.value.etiqueta2 && !!this.form.value.valor2;
    if (this.form.valid){
      if(credencialesEditando && (credencial1Valida || credencial2Valida)){
        const editandoCredenciales = {
          nombre: credencialesEditando.nombre,
          monto: credencialesEditando.monto,
          vencimiento: credencialesEditando.vencimiento,
          empresaId: credencialesEditando.empresaId,
          etiqueta1: this.form.value.etiqueta1 as EtiquetaCredencial || undefined,
          valor1: this.form.value.valor1 || undefined,
          etiqueta2: this.form.value.etiqueta2 as EtiquetaCredencial || undefined,
          valor2: this.form.value.valor2 || undefined,
        }
        this.gastosService.editarServicio(credencialesEditando.id, editandoCredenciales)
      }

      this.gastosService.cerrarModal();
      this.form.reset();
    }
  }

}
