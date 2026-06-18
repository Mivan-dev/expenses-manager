import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  isExpanded = signal<boolean>(true)

  toggle(){
    this.isExpanded.set(!this.isExpanded())
    this.expandedChange.emit(this.isExpanded()) 
  }

  @Output() expandedChange = new EventEmitter<boolean>()


}
