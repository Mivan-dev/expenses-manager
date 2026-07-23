import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { GastosService } from '../../../services/gastos';
import {Servicio} from '../../../models/servicio.model';

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
        empresa: servicio.empresa,
        monto: String(servicio.monto),
        vencimiento: servicio.vencimiento,
      });
    }
  }

  gastosService = inject(GastosService);
  fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: ['', Validators.required],
    empresa: ['', Validators.required],
    icono: [''],
    monto: ['', Validators.required],
    vencimiento: ['', Validators.required],
  })

  onSubmit(){
    const servicioEditando = this.gastosService.servicioEditando();
    if (this.form.valid){
      if(servicioEditando){
        const editandoServicio = {
          id: servicioEditando.id,
          nombre: this.form.value.nombre!,
          empresa: this.form.value.empresa!,
          icono: this.form.value.icono ?? '',
          monto: Number(this.form.value.monto),
          vencimiento: this.form.value.vencimiento!,
        }
        this.gastosService.editarServicio(editandoServicio as Servicio)
      } else {
        const nuevoServicio = {
          id: crypto.randomUUID(),
          nombre: this.form.value.nombre!,
          empresa: this.form.value.empresa!,
          icono: this.form.value.icono ?? '',
          monto: Number(this.form.value.monto),
          vencimiento: this.form.value.vencimiento!,
        }
        this.gastosService.agregarServicio(nuevoServicio as Servicio)
      }

      this.gastosService.cerrarModal();
      this.form.reset();
    }
  }

}
