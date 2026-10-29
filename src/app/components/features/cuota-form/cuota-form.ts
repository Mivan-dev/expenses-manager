import { Component, inject } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enteroPositivo, montoPositivo, cuotaActualMenorOIgual } from '../../../utils/validadores';

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

  form = this.fb.group(
    {
      nombre: ['', Validators.required],
      cuotaActual: ['', [Validators.required, enteroPositivo]],
      cuotaTotal: ['', [Validators.required, enteroPositivo]],
      monto: ['', [Validators.required, montoPositivo]],
    },
    { validators: cuotaActualMenorOIgual },
  );

  campoInvalido(nombre: 'nombre' | 'cuotaActual' | 'cuotaTotal' | 'monto') {
    const control = this.form.controls[nombre];
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const nuevaCuota = {
      nombre: this.form.value.nombre!,
      cuotaActual: Number(this.form.value.cuotaActual),
      cuotaBase: Number(this.form.value.cuotaActual),
      cuotaTotal: Number(this.form.value.cuotaTotal),
      monto: Number(this.form.value.monto),
      fechaCarga: new Date().toISOString().split('T')[0],
    };
    if (this.idTarjeta) {
      this.gastosService.agregarCuota({ ...nuevaCuota, tarjetaId: this.idTarjeta });
    }
    this.gastosService.cerrarModal();
    this.form.reset();
  }
}
