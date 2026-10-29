import { Component, inject, signal } from '@angular/core';
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
  constructor() {
    const credenciales = this.gastosService.servicioEditando();
    if (credenciales?.etiqueta1 || credenciales?.etiqueta2) {
      this.form.patchValue({
        etiqueta1: credenciales.etiqueta1,
        valor1: credenciales.valor1,
        etiqueta2: credenciales.etiqueta2,
        valor2: credenciales.valor2,
      });
    }
  }

  etiquetas = Object.values(EtiquetaCredencial);
  etiquetaLabels = EtiquetaLabels;
  gastosService = inject(GastosService);
  fb = inject(FormBuilder);

  form = this.fb.group({
    etiqueta1: '',
    valor1: '',
    etiqueta2: '',
    valor2: '',
  });

  error = signal<string | null>(null);

  onSubmit() {
    const servicio = this.gastosService.servicioEditando();
    const etiqueta1 = this.form.value.etiqueta1;
    const etiqueta2 = this.form.value.etiqueta2;
    const valor1 = this.form.value.valor1?.trim();
    const valor2 = this.form.value.valor2?.trim();
    const credencial1Valida = !!etiqueta1 && !!valor1;
    const credencial2Valida = !!etiqueta2 && !!valor2;

    if (!credencial1Valida && !credencial2Valida) {
      this.error.set('Completá al menos una credencial (tipo y número)');
      return;
    }
    this.error.set(null);

    if (servicio) {
      this.gastosService.editarServicio(servicio.id, {
        nombre: servicio.nombre,
        monto: servicio.monto,
        vencimiento: servicio.vencimiento,
        empresaId: servicio.empresaId,
        etiqueta1: credencial1Valida ? (etiqueta1 as EtiquetaCredencial) : null,
        valor1: credencial1Valida ? valor1 : null,
        etiqueta2: credencial2Valida ? (etiqueta2 as EtiquetaCredencial) : null,
        valor2: credencial2Valida ? valor2 : null,
      });
    }

    this.gastosService.cerrarModal();
    this.form.reset();
  }
}