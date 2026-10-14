import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroSun, heroMoon, heroCreditCard, heroDocumentCurrencyDollar, heroPlus, heroArrowLeftStartOnRectangle, heroArrowsRightLeft } from '@ng-icons/heroicons/outline';
import { Auth } from '../../../services/auth';
import { ThemeService } from '../../../services/theme/theme.ts';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-nav',
  imports: [NgIconComponent, Logo],
  providers: [provideIcons({ heroCreditCard, heroDocumentCurrencyDollar, heroPlus, heroArrowLeftStartOnRectangle, heroArrowsRightLeft, heroSun,
      heroMoon, })],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  auth = inject(Auth);
  theme = inject(ThemeService);
  gastosService = inject(GastosService);
  isExpanded = signal<boolean>(true);

  toggle() {
    this.isExpanded.set(!this.isExpanded());
    this.expandedChange.emit(this.isExpanded());
  }

  @Output() expandedChange = new EventEmitter<boolean>();
}
