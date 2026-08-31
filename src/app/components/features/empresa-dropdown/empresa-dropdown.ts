import { Component, EventEmitter, inject, input, Output, output, signal } from '@angular/core';
import { Empresa } from '../../../models/empresa.model';
import { EmpresaApi } from '../../../services/empresa-api/empresa-api';
import { GastosService } from '../../../services/gastos';

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

  toggle(){
    this.dropdown.set(!this.dropdown())
  };

  empresaElegida(id: string){
      this.empresaSeleccionada.emit(id)
      this.dropdown.set(!this.dropdown())
    }
}
