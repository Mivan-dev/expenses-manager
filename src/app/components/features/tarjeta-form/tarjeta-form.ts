import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GastosService } from '../../../services/gastos';
import { Tarjeta } from '../../../models/tarjeta.model';

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
        empresa: tarjeta.empresa,
        monto: String(tarjeta.monto),
        vencimiento: tarjeta.vencimiento,
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
  });

  onSubmit() {
    const tarjetaEditando = this.gastosService.tarjetaEditando();
    if (this.form.valid) {
      if (tarjetaEditando) {
        const editandoTarjeta = {
          id: tarjetaEditando.id,
          nombre: this.form.value.nombre!,
          empresa: this.form.value.empresa!,
          icono: this.form.value.icono ?? '',
          monto: Number(this.form.value.monto),
          vencimiento: this.form.value.vencimiento!,
          cuotas: tarjetaEditando.cuotas,
        };
        this.gastosService.editarTarjeta(editandoTarjeta as Tarjeta);
      } else {
        const nuevaTarjeta = {
          id: crypto.randomUUID(),
          nombre: this.form.value.nombre!,
          empresa: this.form.value.empresa!,
          icono: this.form.value.icono ?? '',
          monto: Number(this.form.value.monto),
          vencimiento: this.form.value.vencimiento!,
          cuotas: [],
        };
        this.gastosService.agregarTarjeta(nuevaTarjeta as Tarjeta);
      }

      this.gastosService.cerrarModal();
      this.form.reset();
    }
  }
}
