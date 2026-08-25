import { Component, inject, signal } from '@angular/core';
import { Nav } from '../../components/layout/nav/nav';
import { Footer } from '../../components/layout/footer/footer';
import { Tarjetas } from '../../components/features/tarjetas/tarjetas';
import { CurrencyPipe, NgClass } from '@angular/common';
import { TarjetaForm } from '../../components/features/tarjeta-form/tarjeta-form';
import { CuotaForm } from '../../components/features/cuota-form/cuota-form';
import { ConfirmModal } from '../../components/features/confirm-modal/confirm-modal';
import { ServicioForm } from '../../components/features/servicio-form/servicio-form';
import { Servicios } from '../../components/features/servicios/servicios';
import { ProximosVtos } from '../../components/features/proximos-vtos/proximos-vtos';
import { GastosService } from '../../services/gastos';

@Component({
  selector: 'app-dashboard',
  imports: [Nav, Footer, Tarjetas, NgClass, TarjetaForm, CuotaForm, ConfirmModal, ServicioForm, Servicios, CurrencyPipe, ProximosVtos],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  protected readonly title = signal('expenses-manager');

  constructor(){
    this.gastosService.actualizarCuotas();
  }

  isNavExpanded = signal<boolean>(true)
  gastosService = inject(GastosService)

  onNavToggle(value: boolean){
    this.isNavExpanded.set(value)
  }
}
