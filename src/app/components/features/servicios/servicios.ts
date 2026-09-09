import { Component, inject, signal } from '@angular/core';
import { GastosService } from '../../../services/gastos';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEsAR from '@angular/common/locales/es-AR';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash, heroPencil, heroPlus, heroArrowTopRightOnSquare, heroDocumentDuplicate } from '@ng-icons/heroicons/outline';
import { EtiquetaLabels } from '../../../models/servicio.model';

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
  etiquetaLabels = EtiquetaLabels
  toastVisible = signal(false)

  getEmpresa(empresaId: string){
    return this.gastosService.empresa().find(item => item.id === empresaId)
  }

  copiarCredencial(valor: string){
    navigator.clipboard.writeText(valor)
    this.toastVisible.set(true)
    setTimeout(() => this.toastVisible.set(false), 1200)
  }

  abrirUrl(url: string | undefined){
    if(url) window.open(url, '_blank')
  }
}
