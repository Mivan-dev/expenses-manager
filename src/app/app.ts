import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./components/layout/nav/nav";
import { Footer } from "./components/layout/footer/footer";
import { Tarjetas } from "./components/features/tarjetas/tarjetas";
import { NgClass } from '@angular/common';
import { GastosService } from './services/gastos';
import { TarjetaForm } from "./components/features/tarjeta-form/tarjeta-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, Tarjetas, NgClass, TarjetaForm],
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
