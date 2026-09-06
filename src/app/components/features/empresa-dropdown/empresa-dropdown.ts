import { Component, EventEmitter, inject, input, Output, output, signal } from '@angular/core';
import { Empresa } from '../../../models/empresa.model';

@Component({
  selector: 'app-empresa-dropdown',
  imports: [],
  templateUrl: './empresa-dropdown.html',
  styleUrl: './empresa-dropdown.css',
})
export class EmpresaDropdown {

  dropdown = signal<boolean>(false)
  empresas = input<Empresa[]>([])
  empresaSeleccionada = output<string>()
  seleccionada = signal<Empresa | null>(null)

  toggle(){
    this.dropdown.set(!this.dropdown())
  };

  empresaElegida(empresa: Empresa){
    this.seleccionada.set(empresa)
    this.empresaSeleccionada.emit(empresa.id)
    this.dropdown.set(false)
}
}
