import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { GastosService } from '../../../services/gastos';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  modal = inject(GastosService)
  isExpanded = signal<boolean>(true)

  toggle(){
    this.isExpanded.set(!this.isExpanded())
    this.expandedChange.emit(this.isExpanded()) 
  }

  abrirModal(){
    this.modal.abrirModal("tarjeta")
  }

  @Output() expandedChange = new EventEmitter<boolean>()


}
