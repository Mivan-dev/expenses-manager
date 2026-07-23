import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./components/layout/nav/nav";
import { Footer } from "./components/layout/footer/footer";
import { Tarjetas } from "./components/features/tarjetas/tarjetas";
import { NgClass } from '@angular/common';
import { GastosService } from './services/gastos';
import { TarjetaForm } from "./components/features/tarjeta-form/tarjeta-form";
import { CuotaForm } from "./components/features/cuota-form/cuota-form";
import { ConfirmModal } from './components/features/confirm-modal/confirm-modal';
import { ServicioForm } from './components/features/servicio-form/servicio-form';
import { Servicios } from './components/features/servicios/servicios';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, Tarjetas, NgClass, TarjetaForm, CuotaForm, ConfirmModal, ServicioForm, Servicios],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('expenses-manager');

  isNavExpanded = signal<boolean>(true)
  gastosService = inject(GastosService)

  onNavToggle(value: boolean){
    this.isNavExpanded.set(value)
  }
}
