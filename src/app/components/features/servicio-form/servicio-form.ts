import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { GastosService } from '../../../services/gastos';


@Component({
  selector: 'app-servicio-form',
  imports: [ReactiveFormsModule],
  templateUrl: './servicio-form.html',
  styleUrl: './servicio-form.css',
})
export class ServicioForm {
  constructor() {
    const servicio = this.gastosService.servicioEditando();
    if (servicio){
      this.form.patchValue({
        nombre: servicio.nombre,
        monto: String(servicio.monto),
        vencimiento: servicio.vencimiento,
        empresaId: servicio.empresaId
      });
    }
  }

  gastosService = inject(GastosService);
  fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: ['', Validators.required],
    monto: ['', Validators.required],
    vencimiento: ['', Validators.required],
    empresaId: ['', Validators.required]
  })

  onSubmit(){
    const servicioEditando = this.gastosService.servicioEditando();
    if (this.form.valid){
      if(servicioEditando){
        const editandoServicio = {
          nombre: this.form.value.nombre!,
          monto: Number(this.form.value.monto),
          vencimiento: this.form.value.vencimiento!,
          empresaId: this.form.value.empresaId!
        }
        this.gastosService.editarServicio(servicioEditando.id, editandoServicio)
      } else {
        const nuevoServicio = {
          nombre: this.form.value.nombre!,
          monto: Number(this.form.value.monto),
          vencimiento: this.form.value.vencimiento!,
          empresaId: this.form.value.empresaId!
        }
        this.gastosService.agregarServicio(nuevoServicio)
      }

      this.gastosService.cerrarModal();
      this.form.reset();
    }
  }

}
