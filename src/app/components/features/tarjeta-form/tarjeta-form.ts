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
  gastosService = inject(GastosService)
  fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: ['', Validators.required],
    empresa: ['', Validators.required],
    icono: [''],
    monto: ['', Validators.required],
    vencimiento: ['', Validators.required],
  });

  onSubmit(){
    if (this.form.valid){
      const nuevaTarjeta = {
        id: crypto.randomUUID(),
        //...this.form.value - No se puede usar por que monto es pasado como string no number
        nombre: this.form.value.nombre!,
        empresa: this.form.value.empresa!,
        icono: this.form.value.icono ?? '',
        monto: Number(this.form.value.monto),
        vencimiento: this.form.value.vencimiento!,
        cuotas: []
      }
      this.gastosService.agregarTarjeta(nuevaTarjeta as Tarjeta);
      this.gastosService.cerrarModal();
      this.form.reset()
    }
  }

}
