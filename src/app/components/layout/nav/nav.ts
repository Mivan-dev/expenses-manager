import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCreditCard, heroDocumentCurrencyDollar, heroPlus, heroArrowLeftStartOnRectangle, heroArrowsRightLeft } from '@ng-icons/heroicons/outline';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-nav',
  imports: [NgIconComponent],
  providers: [provideIcons({ heroCreditCard, heroDocumentCurrencyDollar, heroPlus, heroArrowLeftStartOnRectangle, heroArrowsRightLeft })],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  auth = inject(Auth);
  gastosService = inject(GastosService);
  isExpanded = signal<boolean>(true);

  toggle() {
    this.isExpanded.set(!this.isExpanded());
    this.expandedChange.emit(this.isExpanded());
  }

  @Output() expandedChange = new EventEmitter<boolean>();
}
