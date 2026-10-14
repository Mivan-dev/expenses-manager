import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { GastosService } from '../../../services/gastos';
import { EmpresaDropdown } from '../empresa-dropdown/empresa-dropdown';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { montoPositivo } from '../../../utils/validadores';

@Component({
  selector: 'app-servicio-form',
  imports: [ReactiveFormsModule, EmpresaDropdown, NgIconComponent],
  providers: [provideIcons({ heroChevronDown })],
  templateUrl: './servicio-form.html',
  styleUrl: './servicio-form.css',
})
export class ServicioForm {
  constructor() {
    const servicio = this.gastosService.servicioEditando();
    if (servicio) {
      this.form.patchValue({
        nombre: servicio.nombre,
        monto: String(servicio.monto),
        vencimiento: servicio.vencimiento,
        empresaId: servicio.empresaId,
      });
    }
  }

  gastosService = inject(GastosService);
  fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: ['', Validators.required],
    monto: ['', [Validators.required, montoPositivo]],
    vencimiento: ['', Validators.required],
    empresaId: ['', Validators.required],
  });

  campoInvalido(nombre: 'nombre' | 'monto' | 'vencimiento' | 'empresaId') {
    const control = this.form.controls[nombre];
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    const servicioEditando = this.gastosService.servicioEditando();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const datos = {
      nombre: this.form.value.nombre!,
      monto: Number(this.form.value.monto),
      vencimiento: this.form.value.vencimiento!,
      empresaId: this.form.value.empresaId!,
    };
    if (servicioEditando) {
      this.gastosService.editarServicio(servicioEditando.id, datos);
    } else {
      this.gastosService.agregarServicio(datos);
    }
    this.gastosService.cerrarModal();
    this.form.reset();
  }
}
