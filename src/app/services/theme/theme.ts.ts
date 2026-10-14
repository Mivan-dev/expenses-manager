import { effect, Injectable, signal } from '@angular/core';

type Tema = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  tema = signal<Tema>(this.temaInicial());

  constructor() {
    effect(() => {
      const tema = this.tema();
      document.documentElement.classList.toggle('dark', tema === 'dark');
      localStorage.setItem('tema', tema);
    });
  }

  toggle() {
    this.tema.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private temaInicial(): Tema {
    const guardado = localStorage.getItem('tema');
    if (guardado === 'light' || guardado === 'dark') return guardado;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}