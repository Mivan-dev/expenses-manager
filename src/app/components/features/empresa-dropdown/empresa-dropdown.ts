import { Component, computed, input, output, signal } from '@angular/core';
import { Empresa } from '../../../models/empresa.model';

@Component({
  selector: 'app-empresa-dropdown',
  imports: [],
  templateUrl: './empresa-dropdown.html',
  styleUrl: './empresa-dropdown.css',
})
export class EmpresaDropdown {
  dropdown = signal<boolean>(false);
  empresas = input<Empresa[]>([]);
  empresaInicialId = input<string | null>(null);
  empresaSeleccionada = output<string>();

  private elegida = signal<Empresa | null>(null);

  seleccionada = computed(
    () =>
      this.elegida() ??
      this.empresas().find((e) => e.id === this.empresaInicialId()) ??
      null,
  );

  toggle() {
    this.dropdown.set(!this.dropdown());
  }

  empresaElegida(empresa: Empresa) {
    this.elegida.set(empresa);
    this.empresaSeleccionada.emit(empresa.id);
    this.dropdown.set(false);
  }
}