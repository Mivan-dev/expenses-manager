import { Component, inject } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cuota } from '../../../models/cuota.model';

@Component({
  selector: 'app-cuota-form',
  imports: [ReactiveFormsModule],
  templateUrl: './cuota-form.html',
  styleUrl: './cuota-form.css',
})
export class CuotaForm {
  gastosService = inject(GastosService);
  fb = inject(FormBuilder);
  idTarjeta = this.gastosService.tarjetaSeleccionada();

  form = this.fb.group({
    nombre: ['', Validators.required],
    icono: [''],
    cuotaActual: ['', Validators.required],
    cuotaTotal: ['', Validators.required],
    monto: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      const nuevaCuota = {
        id: crypto.randomUUID(),
        nombre: this.form.value.nombre!,
        icono: this.form.value.icono ?? '',
        cuotaActual: Number(this.form.value.cuotaActual),
        cuotaTotal: Number(this.form.value.cuotaTotal),
        monto: Number(this.form.value.monto),
      };
      if (this.idTarjeta) {
        this.gastosService.agregarCuota(
          this.idTarjeta!,
          nuevaCuota as Cuota,
        );
      }
      this.gastosService.cerrarModal();
      this.form.reset();
    }
  }
}
