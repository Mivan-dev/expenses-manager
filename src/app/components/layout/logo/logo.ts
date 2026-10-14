import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.html',
})
export class Logo {
  mostrarNombre = input(true);
  mostrarLema = input(false);
  tamano = input<'md' | 'lg'>('md');
}