import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GastosService } from '../../../services/gastos';


@Component({
  selector: 'app-tarjeta-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tarjeta-form.html',
  styleUrl: './tarjeta-form.css',
})
export class TarjetaForm {
  constructor() {
    const tarjeta = this.gastosService.tarjetaEditando();
    if (tarjeta) {
      this.form.patchValue({
        nombre: tarjeta.nombre,
        empresaId: tarjeta.empresaId,
        monto: String(tarjeta.monto),
        vencimiento: tarjeta.vencimiento,
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
  });

  onSubmit() {
    const tarjetaEditando = this.gastosService.tarjetaEditando();
    if (this.form.valid) {
      if (tarjetaEditando) {
        const editandoTarjeta = {
          nombre: this.form.value.nombre!,
          monto: Number(this.form.value.monto),
          vencimiento: this.form.value.vencimiento!,
          empresaId: this.form.value.empresaId!,
        };
        this.gastosService.editarTarjeta(tarjetaEditando.id, editandoTarjeta);
      } else {
        const nuevaTarjeta = {
          nombre: this.form.value.nombre!,
          monto: Number(this.form.value.monto),
          vencimiento: this.form.value.vencimiento!,
          empresaId: this.form.value.empresaId!,
        };
        this.gastosService.agregarTarjeta(nuevaTarjeta);
      }

      this.gastosService.cerrarModal();
      this.form.reset();
    }
  }
}
