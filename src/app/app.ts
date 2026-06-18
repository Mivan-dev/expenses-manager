import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./components/layout/nav/nav";
import { Footer } from "./components/layout/footer/footer";
import { Tarjetas } from "./components/features/tarjetas/tarjetas";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, Tarjetas, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('expenses-manager');

  isNavExpanded = signal<boolean>(true)

  onNavToggle(value: boolean){
    this.isNavExpanded.set(value)
  }
}
