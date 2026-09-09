import { Component, inject } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEsAR from '@angular/common/locales/es-AR';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash, heroPencil, heroPlus, heroArrowTopRightOnSquare, heroDocumentDuplicate } from '@ng-icons/heroicons/outline';

registerLocaleData(localeEsAR);

@Component({
  selector: 'app-servicios',
  imports: [CurrencyPipe, DatePipe, NgIconComponent],
  providers: [provideIcons({ heroTrash, heroPencil, heroPlus, heroArrowTopRightOnSquare, heroDocumentDuplicate})],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios {
  gastosService = inject(GastosService);

  getEmpresa(empresaId: string){
    return this.gastosService.empresa().find(item => item.id === empresaId)
  }

  copiarCredencial(valor: string){
    navigator.clipboard.writeText(valor)
  } 
}
