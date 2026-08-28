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
    cuotaActual: ['', Validators.required],
    cuotaTotal: ['', Validators.required],
    monto: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      const nuevaCuota = {
        nombre: this.form.value.nombre!,
        cuotaActual: Number(this.form.value.cuotaActual),
        cuotaBase: Number(this.form.value.cuotaActual),
        cuotaTotal: Number(this.form.value.cuotaTotal),
        monto: Number(this.form.value.monto),
        fechaCarga: new Date().toISOString().split('T')[0]
      };
      if (this.idTarjeta) {
        const dataCompleta = {...nuevaCuota, tarjetaId: this.idTarjeta}
        this.gastosService.agregarCuota(dataCompleta);
      }
      this.gastosService.cerrarModal();
      this.form.reset();
    }
  }
}
