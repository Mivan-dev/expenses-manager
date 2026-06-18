import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./components/layout/nav/nav";
import { Footer } from "./components/layout/footer/footer";
import { Tarjetas } from "./components/features/tarjetas/tarjetas";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, Tarjetas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('expenses-manager');
}
